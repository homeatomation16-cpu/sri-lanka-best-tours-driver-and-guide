import nodemailer from "nodemailer";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { NextResponse } from "next/server";

// 🔹 MAIL TRANSPORT
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// 🔹 CREATE BOOKING
export async function POST(req) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      date,
      time,
      notes,
      itemName,
      bookingType,
      message,
    } = body;

    // ✅ VALIDATION
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email required" },
        { status: 400 }
      );
    }

    await connectDB();

    // ✅ SAVE DB FIRST
    const booking = await Booking.create({
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

    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;

    // 🔥 EMAIL TRY BLOCK (important)
    try {
      // 📩 ADMIN EMAIL
      await transporter.sendMail({
        from: `"Tours Booking" <${process.env.SMTP_USER}>`,
        to: adminEmail,
        replyTo: email,
        subject: `New Booking - ${itemName || "Tour"}`,
        html: `
          <h2>New Booking</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone || "-"}</p>
          <p><b>Date:</b> ${date || "-"}</p>
          <p><b>Item:</b> ${itemName || "-"}</p>
          <p><b>Message:</b> ${message || notes || "-"}</p>
        `,
      });

      // 📩 CUSTOMER CONFIRMATION EMAIL (🔥 NEW)
      await transporter.sendMail({
        from: `"Sri Lanka Tours" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Booking Received ✅",
        html: `
          <h2>Hello ${name},</h2>
          <p>Your booking request has been received.</p>
          <p>We will contact you soon.</p>
          <br/>
          <p>Thank you!</p>
        `,
      });

    } catch (mailError) {
      console.error("Email failed:", mailError);
      // ❗ email fail උනාට booking save වෙනවා
    }

    return NextResponse.json(
      { success: true, id: booking._id },
      { status: 201 }
    );

  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

// 🔹 GET BOOKINGS
export async function GET() {
  try {
    await connectDB();

    const bookings = await Booking.find()
      .sort({ createdAt: -1 });

    return NextResponse.json(bookings);

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch" },
      { status: 500 }
    );
  }
}