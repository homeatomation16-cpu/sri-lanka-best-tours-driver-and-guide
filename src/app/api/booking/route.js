import nodemailer from "nodemailer";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { NextResponse } from "next/server";
import { requireAdmin, esc } from "@/lib/adminAuth";
import { emailLayout, sendEmail, SITE_URL } from "@/lib/email";

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

    const { name, email, phone, date, time, notes, itemName, bookingType, message, people, pricePerPerson, additionalPersonPrice, totalPrice, country, endDate, adults, children, childrenAges, pickupLocation, vehicle } = body;
    const ages = Array.isArray(childrenAges) ? childrenAges.map(Number).filter((age) => Number.isInteger(age) && age >= 0 && age <= 17).slice(0, 10) : [];

    // ✅ VALIDATION
    const requestedPeople = Number(people);

    if (!name || !email || !Number.isInteger(requestedPeople) || requestedPeople < 1) {
      // the minimum per tour (1 with a price table, else 2) is enforced by the booking form
      return NextResponse.json({ error: "Name, email, and at least 1 person are required" }, { status: 400 });
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
      adults: Number.isInteger(Number(adults)) ? Number(adults) : undefined,
      children: Number.isInteger(Number(children)) ? Number(children) : undefined,
      childrenAges: ages,
      country,
      endDate,
      pickupLocation,
      vehicle,
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
          <p><b>Date:</b> ${esc(date || "-")}${endDate ? ` – ${esc(endDate)}` : ""}</p>
          <p><b>Country:</b> ${esc(country || "-")}</p>
          <p><b>Adults / Children:</b> ${esc(adults ?? "-")} / ${esc(children ?? 0)}${ages.length ? ` (ages ${esc(ages.join(", "))})` : ""}</p>
          <p><b>Vehicle:</b> ${esc(vehicle || "-")}</p>
          <p><b>Pickup:</b> ${esc(pickupLocation || "-")}</p>
          <p><b>Item:</b> ${esc(itemName || "-")}</p>
          <p><b>People:</b> ${esc(people)}</p>
          <p><b>Price per person:</b> $${esc(pricePerPerson || "-")}</p>
          <p><b>Total price:</b> $${esc(totalPrice || "-")}</p>
          <p><b>Message:</b> ${esc(message || notes || "-")}</p>
        `,
      });

      // 📩 CUSTOMER CONFIRMATION EMAIL (🔥 NEW)
      await sendEmail({
        to: email,
        subject: "Booking Received ✅",
        html: await emailLayout(
          "Booking request received",
          `<p>Hello ${esc(name)},</p>
          <p>Thank you – we have received your booking request${itemName ? ` for <strong>${esc(itemName)}</strong>` : ""}. We will check availability and contact you soon by e-mail or WhatsApp.</p>`,
          { label: "View my bookings", url: `${SITE_URL}/account` },
        ),
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
