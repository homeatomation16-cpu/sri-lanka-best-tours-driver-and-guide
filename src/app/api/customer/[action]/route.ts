// Customer account API: /api/customer/<action>
//   POST register | login | logout | forgot-password | reset-password | verify-email | resend-verification
//   GET  me
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Customer from "@/models/Customer";
import { esc } from "@/lib/adminAuth";
import { emailLayout, sendEmail, SITE_URL } from "@/lib/email";
import {
  clientIp, endSession, getCurrentCustomer, hashPassword, isEmail, isStrongPassword,
  newToken, rateLimited, sha256, startSession, verifyPassword,
} from "@/lib/customerAuth";

const json = (body: object, status = 200) => NextResponse.json(body, { status });
const LOCALES = ["en", "si", "ru", "fr", "de", "it", "es", "ja", "zh", "ar", "hi", "ko", "pt", "ta"];
const localePath = (locale: unknown) => (typeof locale === "string" && LOCALES.includes(locale) && locale !== "en" ? `/${locale}` : "");

async function sendVerification(customer: { _id: unknown; name: string; email: string }, locale: unknown) {
  const { token, hash } = newToken();
  await Customer.updateOne({ _id: customer._id }, { verifyTokenHash: hash, verifyExpires: new Date(Date.now() + 48 * 3600000) });
  const url = `${SITE_URL}${localePath(locale)}/account/verify-email?token=${token}`;
  await sendEmail({
    to: customer.email,
    subject: "Confirm your e-mail address",
    html: await emailLayout(
      `Welcome, ${customer.name}!`,
      `<p>Thank you for creating an account. Please confirm your e-mail address so we can show your bookings in your account.</p><p style="color:#64748b;font-size:13px">This link is valid for 48 hours. If you didn't create an account, you can ignore this e-mail.</p>`,
      { label: "Confirm my e-mail", url },
    ),
  });
}

export async function GET(_req: Request, { params }: { params: Promise<{ action: string }> }) {
  const { action } = await params;
  if (action !== "me") return json({ error: "Not found" }, 404);
  const customer = await getCurrentCustomer();
  return json({ customer });
}

export async function POST(req: Request, { params }: { params: Promise<{ action: string }> }) {
  const { action } = await params;
  const ip = clientIp(req);
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    /* empty body is fine for logout */
  }
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  try {
    if (action === "logout") {
      await endSession();
      return json({ ok: true });
    }

    await connectDB();

    if (action === "register") {
      if (rateLimited(`register:${ip}`, 5, 3600000)) return json({ error: "rateLimited" }, 429);
      const name = typeof body.name === "string" ? body.name.trim().slice(0, 120) : "";
      if (!name || !isEmail(email) || !isStrongPassword(body.password)) return json({ error: "checkFields" }, 400);
      if (await Customer.exists({ email })) return json({ error: "emailTaken" }, 409);
      const customer = await Customer.create({ name, email, passwordHash: await hashPassword(body.password) });
      await startSession(String(customer._id), customer.tokenVersion);
      await sendVerification(customer, body.locale);
      return json({ ok: true }, 201);
    }

    if (action === "login") {
      if (rateLimited(`login:${ip}`, 20, 900000) || rateLimited(`login:${email}`, 8, 900000)) return json({ error: "locked" }, 429);
      const customer = isEmail(email) ? await Customer.findOne({ email }).select("+passwordHash") : null;
      const ok = await verifyPassword(String(body.password ?? ""), customer?.passwordHash);
      if (!customer || !ok) return json({ error: "invalidCredentials" }, 401);
      customer.lastLoginAt = new Date();
      await customer.save();
      await startSession(String(customer._id), customer.tokenVersion);
      return json({ ok: true });
    }

    if (action === "google") {
      // Google Identity Services ID token. Google's tokeninfo endpoint checks the signature and expiry;
      // we check that it was issued for this site's client ID and that Google verified the e-mail.
      if (rateLimited(`google:${ip}`, 20, 900000)) return json({ error: "rateLimited" }, 429);
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      if (!clientId || typeof body.credential !== "string" || body.credential.length > 4096) return json({ error: "googleFailed" }, 400);
      const res = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(body.credential)}`, { cache: "no-store" });
      const info = res.ok ? await res.json() : null;
      const valid =
        info &&
        info.aud === clientId &&
        ["accounts.google.com", "https://accounts.google.com"].includes(info.iss) &&
        (info.email_verified === true || info.email_verified === "true") &&
        isEmail(info.email) &&
        typeof info.sub === "string";
      if (!valid) return json({ error: "googleFailed" }, 401);

      const googleEmail = String(info.email).toLowerCase();
      let customer = await Customer.findOne({ googleId: info.sub }).select("+googleId");
      if (!customer) {
        customer = await Customer.findOne({ email: googleEmail }).select("+googleId");
        if (customer?.googleId && customer.googleId !== info.sub) return json({ error: "googleConflict" }, 409);
        if (customer) {
          // Google has proven the address, so an existing password account can be linked
          customer.googleId = info.sub;
          customer.emailVerified = true;
        } else {
          customer = new Customer({ name: String(info.name || googleEmail.split("@")[0]).slice(0, 120), email: googleEmail, googleId: info.sub, emailVerified: true });
        }
      }
      customer.lastLoginAt = new Date();
      await customer.save();
      await startSession(String(customer._id), customer.tokenVersion);
      return json({ ok: true });
    }

    if (action === "forgot-password") {
      if (rateLimited(`forgot:${ip}`, 5, 3600000)) return json({ error: "rateLimited" }, 429);
      // Same answer whether or not the account exists
      const customer = isEmail(email) ? await Customer.findOne({ email }) : null;
      if (customer) {
        const { token, hash } = newToken();
        await Customer.updateOne({ _id: customer._id }, { resetTokenHash: hash, resetExpires: new Date(Date.now() + 3600000) });
        const url = `${SITE_URL}${localePath(body.locale)}/account/reset-password?token=${token}`;
        await sendEmail({
          to: customer.email,
          subject: "Reset your password",
          html: await emailLayout(
            "Reset your password",
            `<p>Hello ${esc(customer.name)},</p><p>We received a request to reset the password for your account. Click the button below to choose a new password.</p><p style="color:#64748b;font-size:13px">This link is valid for 1 hour. If you didn't ask for it, you can ignore this e-mail – your password stays the same.</p>`,
            { label: "Set a new password", url },
          ),
        });
      }
      return json({ ok: true });
    }

    if (action === "reset-password") {
      if (rateLimited(`reset:${ip}`, 10, 3600000)) return json({ error: "rateLimited" }, 429);
      if (typeof body.token !== "string" || !isStrongPassword(body.password)) return json({ error: "checkFields" }, 400);
      const customer = await Customer.findOne({ resetTokenHash: sha256(body.token), resetExpires: { $gt: new Date() } });
      if (!customer) return json({ error: "resetInvalid" }, 400);
      await Customer.updateOne(
        { _id: customer._id },
        { passwordHash: await hashPassword(body.password), $inc: { tokenVersion: 1 }, $unset: { resetTokenHash: "", resetExpires: "" }, emailVerified: true }
      );
      return json({ ok: true });
    }

    if (action === "verify-email") {
      if (typeof body.token !== "string") return json({ error: "resetInvalid" }, 400);
      const customer = await Customer.findOneAndUpdate(
        { verifyTokenHash: sha256(body.token), verifyExpires: { $gt: new Date() } },
        { emailVerified: true, $unset: { verifyTokenHash: "", verifyExpires: "" } }
      );
      return customer ? json({ ok: true }) : json({ error: "resetInvalid" }, 400);
    }

    if (action === "resend-verification") {
      const current = await getCurrentCustomer();
      if (!current) return json({ error: "unauthorized" }, 401);
      if (current.emailVerified) return json({ ok: true });
      if (rateLimited(`verify:${current.id}`, 3, 3600000)) return json({ error: "rateLimited" }, 429);
      await sendVerification({ _id: current.id, name: current.name, email: current.email }, body.locale);
      return json({ ok: true });
    }

    return json({ error: "Not found" }, 404);
  } catch (error) {
    console.error("Customer API error:", error);
    return json({ error: "errorGeneric" }, 500);
  }
}
