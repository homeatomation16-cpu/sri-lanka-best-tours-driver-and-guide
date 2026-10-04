import nodemailer from "nodemailer";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { NextResponse } from "next/server";
import { MINIMUM_TOUR_PEOPLE } from "@/utils/tourPricing";
import { requireAdmin, esc } from "@/lib/adminAuth";

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

    const { name, email, phone, date, time, notes, itemName, bookingType, message, people, pricePerPerson, additionalPersonPrice, totalPrice } = body;

    // ✅ VALIDATION
    const requestedPeople = Number(people);

    if (!name || !email || !Number.isInteger(requestedPeople) || requestedPeople < MINIMUM_TOUR_PEOPLE) {
      return NextResponse.json({ error: `Name, email, and at least ${MINIMUM_TOUR_PEOPLE} people are required` }, { status: 400 });
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
      people: requestedPeople,
      pricePerPerson: Number(pricePerPerson) || undefined,
      additionalPersonPrice: Number(additionalPersonPrice) || undefined,
      totalPrice: Number(totalPrice) || undefined,
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
        subject: `New Booking - ${String(itemName || "Tour").replace(/[\r\n]/g, " ")}`,
        html: `
          <h2>New Booking</h2>
          <p><b>Name:</b> ${esc(name)}</p>
          <p><b>Email:</b> ${esc(email)}</p>
          <p><b>Phone:</b> ${esc(phone || "-")}</p>
          <p><b>Date:</b> ${esc(date || "-")}</p>
          <p><b>Item:</b> ${esc(itemName || "-")}</p>
          <p><b>People:</b> ${esc(people)}</p>
          <p><b>Price per person:</b> $${esc(pricePerPerson || "-")}</p>
          <p><b>Total price:</b> $${esc(totalPrice || "-")}</p>
          <p><b>Message:</b> ${esc(message || notes || "-")}</p>
        `,
      });

      // 📩 CUSTOMER CONFIRMATION EMAIL (🔥 NEW)
      await transporter.sendMail({
        from: `"Sri Lanka Tours" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Booking Received ✅",
        html: `
          <h2>Hello ${esc(name)},</h2>
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

    return NextResponse.json({ success: true, id: booking._id }, { status: 201 });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// 🔹 GET BOOKINGS
export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    await connectDB();

    const bookings = await Booking.find().sort({ createdAt: -1 });

    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
