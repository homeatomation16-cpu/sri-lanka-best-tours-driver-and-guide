// Server-side e-mail verification for bookings, rate limits and their failure modes.
// Runs only against a separate test database: TEST_MONGODB_URI must name a database ending in "_test".
// E-mail is not configured in this process, so sendEmail() returns false and nothing is sent.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import fs from 'node:fs';
import crypto from 'node:crypto';

const uri = process.env.TEST_MONGODB_URI || '';
const dbName = uri.match(/\/([^/?]+)(\?|$)/)?.[1] || '';
const skip = !dbName.endsWith('_test') && 'set TEST_MONGODB_URI to a database whose name ends in _test';

registerHooks({
  resolve(specifier, context, nextResolve) {
    // The routes under test only use esc() from adminAuth; its NextAuth import does not load under plain Node.
    if (specifier === '@/lib/adminAuth') {
      const stub = 'export const esc = (v) => String(v ?? "").replace(/[&<>"\']/g, (c) => `&#${c.charCodeAt(0)};`);'
        + ' export const requireAdmin = async () => new Response(null, { status: 401 });';
      return { url: `data:text/javascript,${encodeURIComponent(stub)}`, shortCircuit: true };
    }
    if (specifier.startsWith('@/')) {
      const base = new URL(`../src/${specifier.slice(2)}`, import.meta.url);
      const file = ['.ts', '.js', '.tsx'].map((ext) => new URL(base.href + ext)).find((u) => fs.existsSync(u));
      if (file) return nextResolve(file.href, context);
    }
    // Next's entry points (next/server, next/headers) need their file extension under plain Node
    if (/^next\/[a-z-]+$/.test(specifier)) return nextResolve(`${specifier}.js`, context);
    return nextResolve(specifier, context);
  },
  // The models use `import mongoose, { Schema, models } from "mongoose"`, which Next's bundler allows
  // but plain Node does not (mongoose is CommonJS); read the names from the default export instead.
  load(url, context, nextLoad) {
    const result = nextLoad(url, context);
    if (!url.includes('/src/models/') || !result.source) return result;
    const source = String(result.source).replace(
      /import mongoose, \{([^}]+)\} from "mongoose";/,
      'import mongoose from "mongoose";\nconst {$1} = mongoose;',
    );
    return { ...result, source };
  },
});

let booking, verifyEmail, rateLimited, mongoose, EmailOtp, Booking, RateLimit;
const sha = (v) => crypto.createHash('sha256').update(v).digest('hex');
let ip = 0;
const call = (handler, path, body) =>
  handler(new Request(`http://test.local${path}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-real-ip': `10.0.${Math.floor(++ip / 250)}.${ip % 250}` },
    body: JSON.stringify(body),
  }));
const order = (email, extra = {}) => ({ name: 'QA Test', email, people: 2, itemName: 'QA tour', bookingType: 'Tour', ...extra });

// Seeds a pending code in the test database and exchanges it for a proof through the real verify route.
async function proofFor(email) {
  await EmailOtp.updateOne(
    { _id: sha(email.toLowerCase()) },
    { $set: { codeHash: sha('123456'), attempts: 0, expiresAt: new Date(Date.now() + 60000) }, $unset: { proofHash: 1, purpose: 1 } },
    { upsert: true },
  );
  const res = await call(verifyEmail, '/api/verify-email', { email, action: 'verify', otp: '123456' });
  return (await res.json()).proof;
}

before(async () => {
  if (skip) return;
  process.env.MONGODB_URI = uri;
  for (const name of ['SMTP_USER', 'SMTP_PASS', 'EMAIL_USER', 'EMAIL_PASS']) delete process.env[name];
  ({ POST: booking } = await import('../src/app/api/booking/route.js'));
  ({ POST: verifyEmail } = await import('../src/app/api/verify-email/route.ts'));
  ({ rateLimited } = await import('../src/lib/customerAuth.ts'));
  mongoose = (await import('mongoose')).default;
  EmailOtp = (await import('../src/models/EmailOtp.ts')).default;
  Booking = (await import('../src/models/Booking.ts')).default;
  RateLimit = (await import('../src/models/RateLimit.ts')).default;
  await (await import('../src/lib/mongodb.ts')).default();
  assert.ok(mongoose.connection.db.databaseName.endsWith('_test'), 'refusing to run outside a _test database');
  await Promise.all([EmailOtp.deleteMany({}), Booking.deleteMany({ itemName: 'QA tour' }), RateLimit.deleteMany({})]);
  await Promise.all([EmailOtp.init(), RateLimit.init(), Booking.init()]);
});
after(async () => { if (!skip) await mongoose.disconnect(); });

test('a correct code returns a proof; only hashes are stored', { skip }, async () => {
  const proof = await proofFor('store@example.test');
  assert.match(proof, /^[\w-]{40,}$/);
  const doc = await EmailOtp.findById(sha('store@example.test')).lean();
  assert.equal(doc.proofHash, sha(proof));
  assert.equal(doc.codeHash, undefined);
  assert.ok(!JSON.stringify(doc).includes(proof));
});

test('booking without verification is refused and saves nothing', { skip }, async () => {
  const res = await call(booking, '/api/booking', order('none@example.test'));
  assert.equal(res.status, 403);
  assert.equal(await Booking.countDocuments({ email: 'none@example.test' }), 0);
});

test('an invalid proof is refused', { skip }, async () => {
  await proofFor('invalid@example.test');
  const res = await call(booking, '/api/booking', order('invalid@example.test', { emailProof: 'not-the-proof' }));
  assert.equal(res.status, 403);
});

test('an expired proof is refused even before MongoDB removes it', { skip }, async () => {
  const proof = await proofFor('expired@example.test');
  await EmailOtp.updateOne({ _id: sha('expired@example.test') }, { expiresAt: new Date(Date.now() - 1000) });
  const res = await call(booking, '/api/booking', order('expired@example.test', { emailProof: proof }));
  assert.equal(res.status, 403);
});

test('a proof cannot book for another e-mail address', { skip }, async () => {
  const proof = await proofFor('owner@example.test');
  const res = await call(booking, '/api/booking', order('someone-else@example.test', { emailProof: proof }));
  assert.equal(res.status, 403);
  assert.ok(await EmailOtp.exists({ _id: sha('owner@example.test') }), "the owner's proof is untouched");
});

test('a validation failure does not use up a valid proof', { skip }, async () => {
  const proof = await proofFor('keep@example.test');
  const bad = await call(booking, '/api/booking', order('keep@example.test', { emailProof: proof, people: 0 }));
  assert.equal(bad.status, 400);
  const good = await call(booking, '/api/booking', order('keep@example.test', { emailProof: proof }));
  assert.equal(good.status, 201);
});

test('a verified booking is saved (e-mail case ignored) and the proof cannot be reused', { skip }, async () => {
  const proof = await proofFor('Verified@Example.test');
  const first = await call(booking, '/api/booking', order('Verified@Example.test', { emailProof: proof }));
  assert.equal(first.status, 201);
  assert.equal(await Booking.countDocuments({ email: 'Verified@Example.test', itemName: 'QA tour' }), 1);
  const again = await call(booking, '/api/booking', order('Verified@Example.test', { emailProof: proof }));
  assert.equal(again.status, 403);
});

test('simultaneous submissions with one proof create exactly one booking', { skip }, async () => {
  const proof = await proofFor('race@example.test');
  const results = await Promise.all(Array.from({ length: 5 }, () => call(booking, '/api/booking', order('race@example.test', { emailProof: proof }))));
  assert.deepEqual(results.map((r) => r.status).sort(), [201, 403, 403, 403, 403]);
  assert.equal(await Booking.countDocuments({ email: 'race@example.test' }), 1);
});

test('simultaneous verifies with one code issue at most one proof', { skip }, async () => {
  const email = 'verify-race@example.test';
  await EmailOtp.updateOne({ _id: sha(email) }, { $set: { codeHash: sha('654321'), attempts: 0, expiresAt: new Date(Date.now() + 60000) } }, { upsert: true });
  const bodies = await Promise.all(Array.from({ length: 4 }, () => call(verifyEmail, '/api/verify-email', { email, action: 'verify', otp: '654321' }).then((r) => r.json())));
  assert.equal(bodies.filter((b) => b.success).length, 1);
});

test('after 5 wrong guesses even the right code stops working', { skip }, async () => {
  const email = 'guess@example.test';
  await EmailOtp.updateOne({ _id: sha(email) }, { $set: { codeHash: sha('111111'), attempts: 0, expiresAt: new Date(Date.now() + 60000) } }, { upsert: true });
  for (let i = 0; i < 5; i++) await call(verifyEmail, '/api/verify-email', { email, action: 'verify', otp: '000000' });
  const right = await (await call(verifyEmail, '/api/verify-email', { email, action: 'verify', otp: '111111' })).json();
  assert.equal(right.success, false);
});

test('if saving the booking fails, the proof is kept so the customer can retry', { skip }, async () => {
  const proof = await proofFor('dbfail@example.test');
  const original = Booking.create;
  const originalError = console.error;
  Booking.create = async () => { throw new Error('simulated database failure'); };
  console.error = () => {};
  try {
    const res = await call(booking, '/api/booking', order('dbfail@example.test', { emailProof: proof }));
    assert.equal(res.status, 500);
  } finally {
    Booking.create = original;
    console.error = originalError;
  }
  assert.ok(await EmailOtp.exists({ _id: sha('dbfail@example.test'), proofHash: sha(proof) }), 'the transaction rolled back');
  const retry = await call(booking, '/api/booking', order('dbfail@example.test', { emailProof: proof }));
  assert.equal(retry.status, 201);
});

test('rate limit: concurrent requests are counted exactly and the window expires', { skip }, async () => {
  const key = `concurrency-${Date.now()}`;
  const limited = await Promise.all(Array.from({ length: 20 }, () => rateLimited(key, 5, 60000)));
  assert.equal(limited.filter((x) => !x).length, 5);
  const doc = await RateLimit.findOne({ _id: new RegExp(`^${sha(key)}:`) }).lean();
  assert.equal(doc.count, 20);
  assert.ok(doc.expiresAt > new Date() && doc.expiresAt <= new Date(Date.now() + 60000));
  const ttl = (await RateLimit.collection.indexes()).find((i) => i.key.expiresAt === 1);
  assert.equal(ttl.expireAfterSeconds, 0);
});

test('rate limit refuses requests when its store is unavailable', { skip }, async () => {
  const original = RateLimit.findOneAndUpdate;
  const originalError = console.error;
  RateLimit.findOneAndUpdate = () => Promise.reject(new Error('simulated outage'));
  console.error = () => {};
  try {
    assert.equal(await rateLimited('outage', 100, 60000), true);
  } finally {
    RateLimit.findOneAndUpdate = original;
    console.error = originalError;
  }
});
