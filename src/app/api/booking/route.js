// src/app/api/booking/route.js

import nodemailer from "nodemailer";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { NextResponse } from "next/server";

// ── Transporter (env variables use කරනවා) ──
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ── POST: Create booking + send email ──
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, date, time, notes, itemName, bookingType, message } = body;

    // Basic validation
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required." },
        { status: 400 }
      );
    }

    // 1. Save to DB
    await connectDB();
    const newBooking = await Booking.create({
      name,
      email,
      phone,
      date,
      time,
      itemName,
      bookingType,
      message: message || notes,
      status: "pending",
    });

    // 2. Send email notification
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;

    await transporter.sendMail({
      from: `"Sri Lanka Best Tours" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      replyTo: email,
      subject: `🌴 New Booking: ${bookingType ?? "Tour"} — ${itemName ?? ""}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="UTF-8" /></head>
        <body style="margin:0;padding:0;background:#FAFAF8;font-family:'Helvetica Neue',Arial,sans-serif;">
          <div style="max-width:520px;margin:40px auto;background:#fff;border-radius:20px;overflow:hidden;border:1px solid rgba(0,0,0,0.07);">

            <!-- Header -->
            <div style="background:#1A1714;padding:32px 40px;">
              <h1 style="margin:0;color:#F4A96B;font-size:13px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">
                Sri Lanka Tours Driver
              </h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.5);font-size:12px;letter-spacing:0.1em;text-transform:uppercase;">
                New Booking Alert
              </p>
            </div>

            <!-- Body -->
            <div style="padding:36px 40px;">
              <table style="width:100%;border-collapse:collapse;">
                ${[
                  ["Customer",    name],
                  ["Email",       `<a href="mailto:${email}" style="color:#B5541A;">${email}</a>`],
                  ["Phone",       phone || "—"],
                  ["Booking Type",bookingType || "—"],
                  ["Tour / Vehicle", itemName || "—"],
                  ["Travel Date", date || "—"],
                  ["Pickup Time", time || "—"],
                ].map(([label, value]) => `
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid rgba(0,0,0,0.06);font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#bbb;width:38%;">
                      ${label}
                    </td>
                    <td style="padding:10px 0;border-bottom:1px solid rgba(0,0,0,0.06);font-size:13px;color:#1A1714;">
                      ${value}
                    </td>
                  </tr>
                `).join("")}
              </table>

              ${(message || notes) ? `
              <div style="margin-top:24px;padding:16px 20px;background:#FEF2E8;border-radius:12px;border-left:3px solid #B5541A;">
                <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#B5541A;">Notes</p>
                <p style="margin:0;font-size:13px;color:#4A4540;line-height:1.6;font-style:italic;">
                  "${message || notes}"
                </p>
              </div>` : ""}

              <div style="margin-top:28px;">
                <a href="mailto:${email}?subject=Re: Your Booking — ${itemName ?? ""}"
                  style="display:inline-block;padding:13px 28px;background:#1A1714;color:#fff;border-radius:12px;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;">
                  Reply to Customer →
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background:#F5F0EA;padding:20px 40px;text-align:center;">
              <p style="margin:0;color:#aaa;font-size:11px;">
                © ${new Date().getFullYear()} Sri Lanka Tours Driver · Booking ID: ${newBooking._id}
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true, id: newBooking._id }, { status: 201 });

  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { success: false, error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}

// ── GET: Admin dashboard data fetch ──
export async function GET() {
  try {
    await connectDB();
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("GET bookings error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}