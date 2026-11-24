// Server-side e-mail verification for bookings, rate limits and their failure modes.
// Runs only against a separate test database: TEST_MONGODB_URI must name a database ending in "_test".
// E-mail goes to a fake SMTP host and transporter.sendMail is replaced by a recorder, so nothing is sent.
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
    // Site settings use Next's unstable_cache, which needs a running Next server; the defaults are enough for e-mails.
    if (specifier === '@/lib/siteSettings') {
      const defaults = new URL('../src/lib/siteSettingsDefaults.ts', import.meta.url).href;
      const stub = `export * from ${JSON.stringify(defaults)}; import { DEFAULT_SETTINGS } from ${JSON.stringify(defaults)};`
        + ' export const getSiteSettings = async () => DEFAULT_SETTINGS;';
      return { url: `data:text/javascript,${encodeURIComponent(stub)}`, shortCircuit: true };
    }
    if (specifier.startsWith('@/')) {
      const base = new URL(`../src/${specifier.slice(2)}`, import.meta.url);
      const file = ['.ts', '.js', '.tsx', ''].map((ext) => new URL(base.href + ext)).find((u) => fs.existsSync(u) && fs.statSync(u).isFile());
      if (file) return nextResolve(file.href, context);
    }
    // Next's entry points (next/server, next/headers) need their file extension under plain Node
    if (/^next\/[a-z-]+$/.test(specifier)) return nextResolve(`${specifier}.js`, context);
    return nextResolve(specifier, context);
  },
  // The models use `import mongoose, { Schema, models } from "mongoose"`, which Next's bundler allows
  // but plain Node does not (mongoose is CommonJS); read the names from the default export instead.
  load(url, context, nextLoad) {
    // messages/*.json are imported without an import attribute (fine for Next's bundler, not for plain Node)
    if (url.startsWith('file:') && url.includes('/src/messages/') && url.endsWith('.json')) {
      return { format: 'module', source: `export default ${fs.readFileSync(new URL(url), 'utf8')};`, shortCircuit: true };
    }
    const result = nextLoad(url, context);
    if (!url.includes('/src/models/') || !result.source) return result;
    const source = String(result.source).replace(
      /import mongoose, \{([^}]+)\} from "mongoose";/,
      'import mongoose from "mongoose";\nconst {$1} = mongoose;',
    );
    return { ...result, source };
  },
});

let booking, verifyEmail, rateLimited, mongoose, EmailOtp, Booking, RateLimit, Vehicle, mail;
const sent = []; // every message the code tried to send
let failFor = () => false; // (message) => true makes that delivery fail

// Fake mail settings, set before src/lib/email.ts is loaded
Object.assign(process.env, {
  SMTP_HOST: 'smtp.invalid', SMTP_PORT: '465', SMTP_USER: 'info@business.test', SMTP_PASS: 'not-a-real-password',
  ADMIN_EMAIL: 'Info@Business.test', ADMIN_NOTIFICATION_EMAILS: ' owner@gmail.test, info@business.test,not-an-address,owner@GMAIL.test ',
});
async function loadMail() {
  if (mail) return mail;
  mail = await import('../src/lib/email.ts');
  mail.transporter.sendMail = async (message) => {
    sent.push(message);
    if (failFor(message)) throw Object.assign(new Error('simulated SMTP failure'), { code: 'EAUTH' });
    return { messageId: 'test' };
  };
  return mail;
}
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
  await loadMail();
  ({ POST: booking } = await import('../src/app/api/booking/route.js'));
  ({ POST: verifyEmail } = await import('../src/app/api/verify-email/route.ts'));
  ({ rateLimited } = await import('../src/lib/customerAuth.ts'));
  mongoose = (await import('mongoose')).default;
  EmailOtp = (await import('../src/models/EmailOtp.ts')).default;
  Booking = (await import('../src/models/Booking.ts')).default;
  RateLimit = (await import('../src/models/RateLimit.ts')).default;
  Vehicle = (await import('../src/models/Vehicle.ts')).default;
  await (await import('../src/lib/mongodb.ts')).default();
  assert.ok(mongoose.connection.db.databaseName.endsWith('_test'), 'refusing to run outside a _test database');
  await Promise.all([EmailOtp.deleteMany({}), Booking.deleteMany({ itemName: 'QA tour' }), RateLimit.deleteMany({}), Vehicle.deleteMany({ vehicleId: /^qa-/ })]);
  await Vehicle.create({ vehicleId: 'qa-van', name: 'QA Van', passengers: 4, status: 'active' });
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

const vehicleOrder = (email, extra) => ({ name: 'QA Test', email, bookingType: 'Vehicle', vehicleId: 'qa-van', date: '2027-01-10', time: '08:00', ...extra });

test('vehicle booking: seats are checked on the server and a rejected request keeps the proof', { skip }, async () => {
  const email = 'vehicle@example.test';
  assert.equal((await call(booking, '/api/booking', vehicleOrder(email, { people: 2 }))).status, 403, 'no proof');
  const proof = await proofFor(email);
  const rejected = [
    { people: 0 }, { people: -1 }, { people: 2.5 }, { people: 'two' }, {},
    { people: 5 }, // QA Van has 4 seats
    { people: 5, passengers: 9, capacity: 9 }, // a capacity sent by the browser is ignored
    { people: 2, vehicleId: 'no-such-vehicle' }, { people: 2, vehicleId: { $ne: '' } }, { people: 2, vehicleId: undefined },
  ];
  for (const extra of rejected) {
    const res = await call(booking, '/api/booking', vehicleOrder(email, { emailProof: proof, ...extra }));
    assert.equal(res.status, 400, JSON.stringify(extra));
  }
  assert.equal((await (await call(booking, '/api/booking', vehicleOrder(email, { emailProof: proof, people: 5 }))).json()).error, 'tooManyPassengers');
  assert.ok(await EmailOtp.exists({ _id: sha(email), proofHash: sha(proof) }), 'validation failures did not use the proof');
  const ok = await call(booking, '/api/booking', vehicleOrder(email, { emailProof: proof, people: 4, itemName: 'Forged name' }));
  assert.equal(ok.status, 201);
  const saved = await Booking.findOne({ email, bookingType: 'Vehicle' }).lean();
  assert.equal(saved.people, 4);
  assert.equal(saved.itemName, 'QA Van', 'the vehicle name comes from the database');
  await Booking.deleteMany({ email });
});

test('booking e-mails: every admin gets a separate notification, the customer gets a request acknowledgement', { skip }, async () => {
  const email = 'notify@example.test';
  const proof = await proofFor(email);
  sent.length = 0;
  assert.equal((await call(booking, '/api/booking', vehicleOrder(email, { emailProof: proof, people: 2 }))).status, 201);
  const admin = sent.filter((m) => m.subject.startsWith('New vehicle booking'));
  assert.deepEqual(admin.map((m) => m.to).sort(), ['info@business.test', 'owner@gmail.test']);
  for (const m of admin) {
    assert.equal(m.replyTo, email);
    assert.ok(m.from.includes('info@business.test'));
    assert.ok(m.html.includes('QA Van') && m.html.includes('Pending'));
  }
  const customer = sent.filter((m) => m.to === email);
  assert.equal(customer.length, 1);
  assert.ok(!customer[0].html.includes('owner@gmail.test'));
  assert.match(customer[0].html, /not yet a confirmed reservation/);
  await Booking.deleteMany({ email });
});

test('booking is saved even when every e-mail fails, the failure is recorded and a retry cannot book twice', { skip }, async () => {
  const email = 'mailfail@example.test';
  const proof = await proofFor(email);
  failFor = () => true;
  const originalError = console.error;
  console.error = () => {};
  try {
    const res = await call(booking, '/api/booking', vehicleOrder(email, { emailProof: proof, people: 1 }));
    assert.equal(res.status, 201);
  } finally {
    failFor = () => false;
    console.error = originalError;
  }
  const saved = await Booking.findOne({ email }).lean();
  assert.ok(saved.history.some((h) => /notification e-mail failed/.test(h.action)));
  const retry = await call(booking, '/api/booking', vehicleOrder(email, { emailProof: proof, people: 1 }));
  assert.equal(retry.status, 403);
  assert.equal(await Booking.countDocuments({ email }), 1);
  await Booking.deleteMany({ email });
});

test('the verification code goes only to the customer, never to admins', { skip }, async () => {
  sent.length = 0;
  const res = await call(verifyEmail, '/api/verify-email', { email: 'otp-privacy@example.test', action: 'send' });
  assert.equal((await res.json()).success, true);
  assert.deepEqual(sent.map((m) => m.to), ['otp-privacy@example.test']);
});

// These two need no database
test('admin recipients: ADMIN_EMAIL + ADMIN_NOTIFICATION_EMAILS, valid and de-duplicated', async () => {
  const { adminRecipients } = await loadMail();
  const originalError = console.error;
  console.error = () => {};
  try {
    assert.deepEqual(adminRecipients(), ['info@business.test', 'owner@gmail.test']);
    assert.deepEqual(adminRecipients({ SMTP_USER: 'info@business.test' }), ['info@business.test']);
    assert.deepEqual(
      adminRecipients({ ADMIN_EMAIL: 'a@x.test', ADMIN_NOTIFICATION_EMAILS: 'b@x.test,,a@x.test, "evil"@x.test\r\nBcc: c@x.test' }),
      ['a@x.test', 'b@x.test'],
    );
  } finally {
    console.error = originalError;
  }
});

test('sendEmail: refuses bad recipients, strips header line breaks, reports SMTP and partial failures', async () => {
  const { sendEmail, notifyAdmins } = await loadMail();
  const originalError = console.error;
  console.error = () => {};
  try {
    sent.length = 0;
    assert.equal(await sendEmail({ to: 'not-an-address', subject: 's', html: 'h' }), false);
    assert.equal(await sendEmail({ to: 'a@x.test\r\nBcc: b@x.test', subject: 's', html: 'h' }), false);
    assert.equal(sent.length, 0);
    assert.equal(await sendEmail({ to: 'a@x.test', subject: 'line\r\nBcc: b@x.test', html: 'h', replyTo: 'bad reply' }), true);
    assert.equal(/[\r\n]/.test(sent[0].subject), false);
    assert.equal(sent[0].replyTo, undefined);
    failFor = (m) => m.to === 'owner@gmail.test'; // one admin address fails
    assert.equal(await notifyAdmins({ subject: 'partial', html: 'h' }), true);
    failFor = () => true; // SMTP down: nothing is reported as sent
    assert.equal(await notifyAdmins({ subject: 'none', html: 'h' }), false);
    assert.equal(await sendEmail({ to: 'a@x.test', subject: 's', html: 'h' }), false);
  } finally {
    failFor = () => false;
    console.error = originalError;
  }
});

test('customer e-mails use a known site language, English otherwise; Arabic is right-to-left', async () => {
  const { emailLocale, emailText, emailLayout } = await loadMail();
  assert.equal(emailLocale('ar'), 'ar');
  for (const bad of ['xx', '../en', 'EN', '', null, { toString: () => 'de' }]) assert.equal(emailLocale(bad), 'en');
  assert.equal((await emailText('de'))('bookingSubject'), 'Buchungsanfrage erhalten');
  assert.equal((await emailText('not-a-locale'))('bookingSubject'), 'Booking request received');
  assert.equal((await emailText('fr'))('hello', { name: 'Ana' }), 'Bonjour Ana,');
  const ar = await emailLayout('عنوان', '<p>x</p>', undefined, 'ar');
  assert.match(ar, /<html lang="ar" dir="rtl">/);
  assert.match(await emailLayout('Title', '<p>x</p>', undefined, 'zz'), /<html lang="en" dir="ltr">/);
});

test('booking e-mail is in the booking language, escapes the customer name and keeps the reference', { skip }, async () => {
  const email = 'arabic@example.test';
  const proof = await proofFor(email);
  sent.length = 0;
  const res = await call(booking, '/api/booking', vehicleOrder(email, { emailProof: proof, people: 2, locale: 'ar', name: '<img src=x onerror=alert(1)>' }));
  assert.equal(res.status, 201);
  const saved = await Booking.findOne({ email }).lean();
  assert.equal(saved.locale, 'ar');
  const customer = sent.find((m) => m.to === email);
  assert.equal(customer.subject, 'تم استلام طلب الحجز');
  assert.match(customer.html, /dir="rtl"/);
  assert.ok(!customer.html.includes('<img src=x'), 'the name is escaped');
  assert.ok(customer.html.includes(String(saved._id).slice(-8).toUpperCase()));
  const admin = sent.find((m) => m.to === 'owner@gmail.test');
  assert.match(admin.subject, /^New vehicle booking/, 'admin notifications stay in English');
  await Booking.deleteMany({ email });
});

test('verification code e-mail follows the page language; unknown languages fall back to English', { skip }, async () => {
  sent.length = 0;
  await call(verifyEmail, '/api/verify-email', { email: 'otp-ja@example.test', action: 'send', locale: 'ja' });
  await call(verifyEmail, '/api/verify-email', { email: 'otp-xx@example.test', action: 'send', locale: '<script>' });
  assert.equal(sent.find((m) => m.to === 'otp-ja@example.test').subject, '確認コードのお知らせ');
  const fallback = sent.find((m) => m.to === 'otp-xx@example.test');
  assert.equal(fallback.subject, 'Your verification code');
  assert.match(fallback.html, /lang="en"/);
});
