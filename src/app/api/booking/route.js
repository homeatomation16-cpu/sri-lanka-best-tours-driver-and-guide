import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { NextResponse } from "next/server";
import { requireAdmin, esc } from "@/lib/adminAuth";
import { clientIp, isEmail, rateLimited } from "@/lib/customerAuth";
import { ADMIN_EMAIL, emailLayout, sendEmail, SITE_URL } from "@/lib/email";
import { formatUsd, MAX_TRAVELLERS, PRICED_TOUR_IDS, serverQuote } from "@/lib/tourPricing";

// 🔹 CREATE BOOKING
export async function POST(req) {
  try {
    if (await rateLimited(`booking:${clientIp(req)}`, 10, 3600000)) {
      return NextResponse.json({ error: "Too many requests, please try again later" }, { status: 429 });
    }
    const body = await req.json();

    const { name, email, phone, date, time, notes, itemName, bookingType, message, people, pricePerPerson, additionalPersonPrice, totalPrice, country, endDate, adults, children, childrenAges, pickupLocation, vehicle, tourId, quotedTotal } = body;
    const ages = Array.isArray(childrenAges) ? childrenAges.map(Number).filter((age) => Number.isInteger(age) && age >= 0 && age <= 17).slice(0, 10) : [];

    // ✅ VALIDATION
    const requestedPeople = Number(people);

    if (typeof name !== "string" || !name.trim() || name.length > 120 || !isEmail(email) || !Number.isInteger(requestedPeople) || requestedPeople < 1) {
      // the minimum per tour (1 with a price table, else 2) is enforced by the booking form
      return NextResponse.json({ error: "Name, email, and at least 1 person are required" }, { status: 400 });
    }

    // 💲 PRICE
    // The 10 round tours (Admin → Tour pricing): the server works out the group total itself from tourId + people.
    // Prices sent by the browser are never stored for these tours; quotedTotal is only compared, so a price
    // that changed while the customer was booking is reported back (409) instead of being confirmed silently.
    let price;
    const managed = typeof tourId === "string" && PRICED_TOUR_IDS.has(tourId);
    if (managed && requestedPeople <= MAX_TRAVELLERS) {
      const q = await serverQuote(tourId, requestedPeople);
      if (quotedTotal !== undefined && quotedTotal !== null && Math.round(Number(quotedTotal) * 100) !== q.totalCents) {
        return NextResponse.json({ error: "priceChanged", quote: { totalCents: q.totalCents, vehicle: q.vehicle, travellers: q.travellers } }, { status: 409 });
      }
      price = {
        tourId,
        totalPrice: q.totalCents / 100,
        totalPriceCents: q.totalCents,
        pricePerPerson: q.perPersonCents / 100,
        additionalPersonPrice: undefined,
        vehicle: q.vehicle,
        currency: "USD",
        pricingVersion: q.pricingVersion,
        priceSource: "server",
      };
    } else if (managed) {
      // Groups over 10: no price in the table, the team sends a custom quote
      price = { tourId, currency: "USD", priceSource: "customQuote" };
    } else {
      // Other products (excursions, tours without a price table) keep their existing estimate fields
      price = {
        tourId: typeof tourId === "string" ? tourId.slice(0, 100) : undefined,
        pricePerPerson: Number(pricePerPerson) || undefined,
        additionalPersonPrice: Number(additionalPersonPrice) || undefined,
        totalPrice: Number(totalPrice) || undefined,
        vehicle,
        currency: "USD",
        priceSource: "estimate",
      };
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
      ...price,
      message: message || notes,
      status: "pending",
    });

    // 🔥 EMAIL TRY BLOCK (important)
    try {
      // 📩 ADMIN EMAIL
      await sendEmail({
        to: ADMIN_EMAIL,
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
          <p><b>Vehicle:</b> ${esc(price.vehicle || "-")}</p>
          <p><b>Pickup:</b> ${esc(pickupLocation || "-")}</p>
          <p><b>Item:</b> ${esc(itemName || "-")}</p>
          <p><b>People:</b> ${esc(people)}</p>
          <p><b>Group total:</b> ${price.totalPriceCents ? `${formatUsd(price.totalPriceCents)} USD (server price, table v${esc(price.pricingVersion)})` : price.totalPrice ? `${esc(formatUsd(Math.round(price.totalPrice * 100)))} USD (estimate)` : price.priceSource === "customQuote" ? "Custom quote needed (more than 10 travellers)" : "-"}</p>
          <p><b>Per person (approx.):</b> ${price.pricePerPerson ? esc(formatUsd(Math.round(price.pricePerPerson * 100))) : "-"}</p>
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
          <p>Thank you – we have received your booking request${itemName ? ` for <strong>${esc(itemName)}</strong>` : ""}. We will check availability and contact you soon by e-mail or WhatsApp.</p>${price.totalPriceCents ? `<table role="presentation" style="margin:16px 0;border-collapse:collapse;font-size:14px"><tr><td style="padding:4px 16px 4px 0;color:#64748b">Travellers</td><td><strong>${esc(requestedPeople)}</strong></td></tr><tr><td style="padding:4px 16px 4px 0;color:#64748b">Vehicle</td><td><strong>${esc(price.vehicle)}</strong></td></tr><tr><td style="padding:4px 16px 4px 0;color:#64748b">Group total</td><td><strong>${formatUsd(price.totalPriceCents)} USD</strong></td></tr></table>` : ""}`,
          { label: "View my bookings", url: `${SITE_URL}/account` },
        ),
      });
    } catch (mailError) {
      console.error("Email failed:", mailError);
      // ❗ email fail උනාට booking save වෙනවා
    }

    return NextResponse.json(
      { success: true, id: booking._id, booking: { totalPrice: booking.totalPrice, vehicle: booking.vehicle, people: booking.people, currency: booking.currency } },
      { status: 201 },
    );
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
