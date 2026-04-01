// src/app/api/verify-email/route.js
// OTP Send + Verify — Nodemailer SMTP

import nodemailer from "nodemailer";

// ── In-memory OTP store (production වල Redis use කරන්න) ──
// Map<email, { otp: string, expiresAt: number }>
const otpStore = new Map();

// ── Nodemailer transporter ──
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,       // e.g. smtp.gmail.com
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,                      // 465 port = SSL
  auth: {
    user: process.env.SMTP_USER,     // your email
    pass: process.env.SMTP_PASS,     // app password
  },
});

// ── 6-digit OTP generate ──
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, otp: userOtp, action } = body;

    if (!email || !action) {
      return Response.json({ success: false, message: "Missing fields" }, { status: 400 });
    }

    // ── SEND OTP ──
    if (action === "send") {
      const otp = generateOtp();
      const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

      otpStore.set(email.toLowerCase(), { otp, expiresAt });

      await transporter.sendMail({
        from: `"Sri Lanka Tours Driver" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Your Verification Code — Sri Lanka Tours",
        html: `
          <!DOCTYPE html>
          <html>
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
                <h1>Sri Lanka Tours Driver</h1>
              </div>
              <div class="body">
                <p>Thank you for your tailor-made tour request.<br/>Please use the code below to verify your email address.</p>
                <div class="otp-box">
                  <div class="label">Verification Code</div>
                  <div class="otp">${otp}</div>
                </div>
                <p>This code is valid for <strong>5 minutes</strong>.</p>
                <p class="note">If you did not request this, please ignore this email.</p>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} Sri Lanka Tours Driver · info@srilankatoursdriver.com</p>
              </div>
            </div>
          </body>
          </html>
        `,
      });

      return Response.json({ success: true, message: "OTP sent" });
    }

    // ── VERIFY OTP ──
    if (action === "verify") {
      if (!userOtp) {
        return Response.json({ success: false, message: "OTP required" }, { status: 400 });
      }

      const record = otpStore.get(email.toLowerCase());

      if (!record) {
        return Response.json({ success: false, message: "No OTP found. Please request a new code." }, { status: 400 });
      }

      if (Date.now() > record.expiresAt) {
        otpStore.delete(email.toLowerCase());
        return Response.json({ success: false, message: "OTP expired. Please request a new code." }, { status: 400 });
      }

      if (record.otp !== userOtp.trim()) {
        return Response.json({ success: false, message: "Invalid OTP." }, { status: 400 });
      }

      // OTP correct — delete from store (single use)
      otpStore.delete(email.toLowerCase());

      return Response.json({ success: true, message: "Email verified" });
    }

    return Response.json({ success: false, message: "Invalid action" }, { status: 400 });

  } catch (error) {
    console.error("verify-email error:", error);
    return Response.json({ success: false, message: "Server error" }, { status: 500 });
  }
}