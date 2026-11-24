// Customer (website visitor) accounts: password hashing, the signed session cookie and simple rate limiting.
// Uses only Node's crypto. The session cookie is httpOnly and signed with NEXTAUTH_SECRET.
import crypto from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import connectDB from "@/lib/mongodb";
import Customer from "@/models/Customer";
import RateLimit from "@/models/RateLimit";

const scrypt = promisify(crypto.scrypt) as (password: string, salt: string, keylen: number) => Promise<Buffer>;

export const SESSION_COOKIE = "sl_customer";
const SESSION_DAYS = 30;

function secret() {
  const value = process.env.NEXTAUTH_SECRET;
  if (!value) throw new Error("NEXTAUTH_SECRET is not set");
  return value;
}

// ── passwords ──
export async function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const key = await scrypt(password, salt, 64);
  return `scrypt$${salt}$${key.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string | undefined) {
  // Hash something even when there is no account, so the response time doesn't reveal which e-mails exist.
  const [, salt, hex] = (stored || "scrypt$00000000000000000000000000000000$00").split("$");
  const key = await scrypt(password, salt, 64);
  const expected = Buffer.from(hex, "hex");
  return Boolean(stored) && expected.length === key.length && crypto.timingSafeEqual(expected, key);
}

/** At least 8 characters with a letter and a number (same rule as the live site). */
export function isStrongPassword(password: unknown): password is string {
  return typeof password === "string" && password.length >= 8 && password.length <= 200 && /[a-zA-Z]/.test(password) && /\d/.test(password);
}

export function isEmail(value: unknown): value is string {
  return typeof value === "string" && value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// ── one-time tokens (e-mail verification, password reset): only the hash is stored ──
export function newToken() {
  const token = crypto.randomBytes(32).toString("base64url");
  return { token, hash: sha256(token) };
}
export const sha256 = (value: string) => crypto.createHash("sha256").update(value).digest("hex");

// ── session cookie: base64url(payload).signature ──
type Session = { sub: string; tv: number; exp: number };

function sign(data: string) {
  return crypto.createHmac("sha256", secret()).update(data).digest("base64url");
}

export async function startSession(customerId: string, tokenVersion: number) {
  const payload: Session = { sub: customerId, tv: tokenVersion, exp: Date.now() + SESSION_DAYS * 86400000 };
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  (await cookies()).set(SESSION_COOKIE, `${data}.${sign(data)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 86400,
  });
}

export async function endSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

function readSession(value: string | undefined): Session | null {
  if (!value) return null;
  const [data, signature] = value.split(".");
  if (!data || !signature) return null;
  const expected = Buffer.from(sign(data));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !crypto.timingSafeEqual(expected, given)) return null;
  try {
    const session = JSON.parse(Buffer.from(data, "base64url").toString()) as Session;
    return session.exp > Date.now() ? session : null;
  } catch {
    return null;
  }
}

/** The signed-in customer (without secrets), or null. */
export async function getCurrentCustomer() {
  const session = readSession((await cookies()).get(SESSION_COOKIE)?.value);
  if (!session || !/^[a-f0-9]{24}$/.test(session.sub)) return null;
  await connectDB();
  const customer = await Customer.findById(session.sub).lean();
  if (!customer || customer.tokenVersion !== session.tv) return null;
  return { id: String(customer._id), name: customer.name, email: customer.email, emailVerified: customer.emailVerified, createdAt: customer.createdAt };
}

// ── rate limiting: shared by all server instances through MongoDB (fixed windows) ──
// If the database cannot be reached, a per-instance memory count is used so requests are still limited.
const hits = new Map<string, number[]>();
function memoryRateLimited(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (now - v[v.length - 1] > windowMs) hits.delete(k);
  return recent.length > limit;
}

export async function rateLimited(key: string, limit: number, windowMs: number) {
  const window = Math.floor(Date.now() / windowMs);
  try {
    await connectDB();
    const doc = await RateLimit.findOneAndUpdate(
      { _id: `${sha256(key)}:${window}` },
      { $inc: { count: 1 }, $setOnInsert: { expiresAt: new Date((window + 1) * windowMs) } },
      { upsert: true, new: true, lean: true },
    );
    return doc.count > limit;
  } catch (error) {
    console.error("Rate limit store unavailable, using memory:", error);
    return memoryRateLimited(key, limit, windowMs);
  }
}

export function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "local";
}
