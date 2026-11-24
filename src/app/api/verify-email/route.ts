// Booking e-mail verification: sends a 6-digit code and checks it.
// Codes are stored hashed in MongoDB (shared by every server instance), expire after 5 minutes,
// allow 5 guesses each, and are deleted once used. Mail goes through the shared transport in lib/email.
import crypto from "node:crypto";
import connectDB from "@/lib/mongodb";
import EmailOtp from "@/models/EmailOtp";
import { emailLocale, emailText, sendEmail } from "@/lib/email";
import { isRTL } from "@/i18n/routing";
import { esc } from "@/lib/adminAuth";
import { clientIp, isEmail, rateLimited, sha256 } from "@/lib/customerAuth";

const CODE_TTL_MS = 5 * 60 * 1000;
const MAX_GUESSES = 5;
const PROOF_TTL_MS = 30 * 60 * 1000; // time to finish the booking after a correct code

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { otp: userOtp, action } = body;
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!isEmail(email) || !action) {
      return Response.json({ success: false, message: "Missing fields" }, { status: 400 });
    }
    // Limits: codes sent per address and per visitor, and guesses per address.
    const ip = clientIp(request);
    const limited = action === "send"
      ? (await rateLimited(`otp-send:${ip}`, 5, 900000)) || (await rateLimited(`otp-send:${email}`, 3, 900000))
      : await rateLimited(`otp-verify:${email}`, 8, 900000);
    if (limited) {
      return Response.json({ success: false, message: "Too many attempts. Please wait a few minutes." }, { status: 429 });
    }

    await connectDB();
    const id = sha256(email);

    // ── SEND OTP ──
    if (action === "send") {
      const otp = crypto.randomInt(100000, 1000000).toString();
      await EmailOtp.findOneAndUpdate(
        { _id: id },
        { $set: { codeHash: sha256(otp), attempts: 0, expiresAt: new Date(Date.now() + CODE_TTL_MS) }, $unset: { proofHash: 1, purpose: 1 } },
        { upsert: true },
      );

      const lang = emailLocale(body.locale);
      const t = await emailText(lang);
      const sent = await sendEmail({
        to: email,
        subject: t("otpSubject"),
        html: `
          <!DOCTYPE html>
          <html lang="${lang}" dir="${isRTL(lang) ? "rtl" : "ltr"}">
          <head>
            <meta charset="UTF-8" />
            <style>
              body { margin: 0; padding: 0; background: #FAFAF8; font-family: 'Helvetica Neue', Arial, sans-serif; }
              .wrap { max-width: 520px; margin: 40px auto; background: #fff; border-radius: 20px; overflow: hidden; border: 1px solid rgba(0,0,0,0.07); }
              .header { background: #1A1714; padding: 36px 40px; text-align: center; }
              .header h1 { margin: 0; color: #F4A96B; font-size: 15px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; }
              .body { padding: 40px; text-align: center; }
              .otp-box { display: inline-block; background: #FEF2E8; border-radius: 16px; padding: 24px 48px; margin: 24px 0; border: 1px solid rgba(181,84,26,0.15); }
              .otp { font-size: 48px; font-weight: 800; color: #B5541A; letter-spacing: 0.15em; line-height: 1; }
              .label { font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #bbb; margin-bottom: 8px; }
              p { color: #4A4540; font-size: 14px; line-height: 1.6; margin: 0 0 12px; }
              .note { font-size: 12px; color: #bbb; margin-top: 24px; }
              .footer { background: #F5F0EA; padding: 20px 40px; text-align: center; }
              .footer p { color: #aaa; font-size: 11px; margin: 0; }
            </style>
          </head>
          <body>
            <div class="wrap">
              <div class="header">
                <h1>Sri Lanka Best Tours Driver &amp; Guide</h1>
              </div>
              <div class="body">
                <p>${esc(t("otpIntro"))}</p>
                <div class="otp-box">
                  <div class="label">${esc(t("otpLabel"))}</div>
                  <div class="otp">${otp}</div>
                </div>
                <p>${esc(t("otpValid"))}</p>
                <p class="note">${esc(t("otpIgnore"))}</p>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} Sri Lanka Best Tours Driver &amp; Guide · info@srilankabesttourdriverandguide.com</p>
              </div>
            </div>
          </body>
          </html>
        `,
      });
      if (!sent) {
        await EmailOtp.deleteOne({ _id: id });
        return Response.json({ success: false, message: "Server error" }, { status: 500 });
      }
      return Response.json({ success: true, message: "OTP sent" });
    }

    // ── VERIFY OTP ──
    if (action === "verify") {
      if (!userOtp) {
        return Response.json({ success: false, message: "OTP required" }, { status: 400 });
      }

      const record = await EmailOtp.findById(id).lean();
      if (!record || !record.codeHash) {
        return Response.json({ success: false, message: "No OTP found. Please request a new code." }, { status: 400 });
      }
      if (Date.now() > new Date(record.expiresAt).getTime() || record.attempts >= MAX_GUESSES) {
        await EmailOtp.deleteOne({ _id: id });
        return Response.json({ success: false, message: "OTP expired. Please request a new code." }, { status: 400 });
      }

      const given = Buffer.from(sha256(String(userOtp).trim()));
      if (!crypto.timingSafeEqual(given, Buffer.from(record.codeHash))) {
        await EmailOtp.updateOne({ _id: id }, { $inc: { attempts: 1 } });
        return Response.json({ success: false, message: "Invalid OTP." }, { status: 400 });
      }

      // Correct: the code is used up and replaced by a proof that only /api/booking accepts, once,
      // for this e-mail address. The filter on codeHash makes a second, simultaneous verify fail.
      const proof = crypto.randomBytes(32).toString("base64url");
      const swapped = await EmailOtp.updateOne(
        { _id: id, codeHash: record.codeHash },
        { $set: { proofHash: sha256(proof), purpose: "booking", expiresAt: new Date(Date.now() + PROOF_TTL_MS) }, $unset: { codeHash: 1, attempts: 1 } },
      );
      if (swapped.modifiedCount !== 1) {
        return Response.json({ success: false, message: "No OTP found. Please request a new code." }, { status: 400 });
      }
      return Response.json({ success: true, message: "Email verified", proof });
    }

    return Response.json({ success: false, message: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("verify-email error:", error);
    return Response.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
