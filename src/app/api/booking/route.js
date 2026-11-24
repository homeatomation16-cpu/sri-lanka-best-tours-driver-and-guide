import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Vehicle from "@/models/Vehicle";
import EmailOtp from "@/models/EmailOtp";
import { NextResponse } from "next/server";
import { requireAdmin, esc } from "@/lib/adminAuth";
import { clientIp, isEmail, rateLimited, sha256 } from "@/lib/customerAuth";
import { emailLayout, emailLocale, emailText, notifyAdmins, sendEmail, SITE_URL } from "@/lib/email";
import { formatUsd, MAX_TRAVELLERS, PRICED_TOUR_IDS, serverQuote } from "@/lib/tourPricing";

// 🔹 CREATE BOOKING
export async function POST(req) {
  try {
    if (await rateLimited(`booking:${clientIp(req)}`, 10, 3600000)) {
      return NextResponse.json({ error: "Too many requests, please try again later" }, { status: 429 });
    }
    const body = await req.json();

    const { name, email, phone, date, time, notes, bookingType, vehicleId, message, people, pricePerPerson, additionalPersonPrice, totalPrice, country, endDate, adults, children, childrenAges, pickupLocation, vehicle, tourId, quotedTotal } = body;
    const ages = Array.isArray(childrenAges) ? childrenAges.map(Number).filter((age) => Number.isInteger(age) && age >= 0 && age <= 17).slice(0, 10) : [];

    // ✅ VALIDATION
    const requestedPeople = Number(people);

    if (typeof name !== "string" || !name.trim() || name.length > 120 || !isEmail(email) || !Number.isInteger(requestedPeople) || requestedPeople < 1) {
      // the minimum per tour (1 with a price table, else 2) is enforced by the booking form
      return NextResponse.json({ error: "Name, email, and at least 1 person are required" }, { status: 400 });
    }

    // 🚗 VEHICLE: the vehicle and its seats come from the database, never from the browser
    let itemName = typeof body.itemName === "string" ? body.itemName.slice(0, 200) : undefined;
    if (bookingType === "Vehicle") {
      await connectDB();
      const car = typeof vehicleId === "string" ? await Vehicle.findOne({ vehicleId, status: "active" }).select("name passengers").lean() : null;
      if (!car) return NextResponse.json({ error: "invalidVehicle" }, { status: 400 });
      if (car.passengers > 0 && requestedPeople > car.passengers) {
        return NextResponse.json({ error: "tooManyPassengers", max: car.passengers }, { status: 400 });
      }
      itemName = car.name;
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

    // ✅ E-MAIL VERIFIED ON THE SERVER: /api/verify-email returns a proof after a correct code.
    // It is checked only now, after validation and pricing, so a rejected request does not use it up.
    const proof = typeof body.emailProof === "string" ? body.emailProof : "";
    if (!proof) {
      return NextResponse.json({ error: "emailNotVerified" }, { status: 403 });
    }

    await connectDB();

    // ✅ SAVE: using the proof and creating the booking happen in one transaction, so a proof books
    // exactly once (a simultaneous second request finds it gone) and is kept if the save fails.
    const NOT_VERIFIED = new Error("emailNotVerified");
    let booking;
    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
        const used = await EmailOtp.findOneAndDelete(
          { _id: sha256(email.trim().toLowerCase()), proofHash: sha256(proof), purpose: "booking", expiresAt: { $gt: new Date() } },
          { session },
        );
        if (!used) throw NOT_VERIFIED;
        [booking] = await Booking.create([{
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
          locale: emailLocale(body.locale),
        }], { session });
      });
    } catch (error) {
      if (error === NOT_VERIFIED) return NextResponse.json({ error: "emailNotVerified" }, { status: 403 });
      throw error;
    } finally {
      await session.endSession();
    }

    // ✉️ E-MAILS: the booking is already saved, so a mail failure never fails the request (and a retry
    // cannot book twice: the proof is used up). A failed admin notification is noted in the booking history.
    const rows = [
        ["Reference", String(booking._id)],
        ["Status", "Pending – request, not yet confirmed"],
        ["Type", bookingType || "-"],
        ["Item", itemName || "-"],
        ["Name", name],
        ["Email", email],
        ["Phone", phone || "-"],
        ["Date", `${date || "-"}${endDate ? ` – ${endDate}` : ""}${time ? ` ${time}` : ""}`],
        ["People", `${requestedPeople}${adults !== undefined ? ` (adults ${adults ?? "-"}, children ${children ?? 0}${ages.length ? `, ages ${ages.join(", ")}` : ""})` : ""}`],
        ["Country", country || "-"],
        ["Pickup", pickupLocation || "-"],
        ["Vehicle", price.vehicle || "-"],
        ["Group total", price.totalPriceCents ? `${formatUsd(price.totalPriceCents)} USD (server price, table v${price.pricingVersion})` : price.totalPrice ? `${formatUsd(Math.round(price.totalPrice * 100))} USD (estimate)` : price.priceSource === "customQuote" ? "Custom quote needed (more than 10 travellers)" : "-"],
        ["Message", message || notes || "-"],
        ["Submitted", booking.createdAt ? new Date(booking.createdAt).toISOString() : new Date().toISOString()],
      ];
    const adminNotified = await notifyAdmins({
      replyTo: email,
      subject: `New ${bookingType === "Vehicle" ? "vehicle" : "tour"} booking request - ${itemName || "Tour"}`,
      html: `<h2>New booking request</h2><table cellpadding="4">${rows.map(([label, value]) => `<tr><td><b>${esc(label)}</b></td><td>${esc(value)}</td></tr>`).join("")}</table>`,
    });
    if (!adminNotified) {
      await Booking.updateOne({ _id: booking._id }, { $push: { history: { action: "Admin notification e-mail failed", at: new Date() } } }).catch(() => {});
    }

    // Customer acknowledgement: a request, not a confirmed reservation
    try {
    const t = await emailText(booking.locale);
    await sendEmail({
      to: email,
      subject: t("bookingSubject"),
      html: await emailLayout(
        t("bookingSubject"),
        `<p>${esc(t("hello", { name }))}</p>
        <p>${esc(t("bookingBody", { item: itemName || "-" }))}</p>
        <table role="presentation" style="margin:16px 0;border-collapse:collapse;font-size:14px"><tr><td style="padding:4px 16px 4px 0;color:#64748b">${esc(t("reference"))}</td><td><strong>${esc(String(booking._id).slice(-8).toUpperCase())}</strong></td></tr><tr><td style="padding:4px 16px 4px 0;color:#64748b">${esc(t("travellers"))}</td><td><strong>${esc(requestedPeople)}</strong></td></tr>${price.vehicle ? `<tr><td style="padding:4px 16px 4px 0;color:#64748b">${esc(t("vehicle"))}</td><td><strong>${esc(price.vehicle)}</strong></td></tr>` : ""}${price.totalPriceCents ? `<tr><td style="padding:4px 16px 4px 0;color:#64748b">${esc(t("groupTotal"))}</td><td><strong>${formatUsd(price.totalPriceCents)}</strong></td></tr> USD` : ""}</table>`,
        { label: t("viewBookings"), url: `${SITE_URL}/account` },
        booking.locale,
      ),
    });
    } catch (mailError) {
      console.error("Customer booking e-mail failed:", mailError?.message || mailError);
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
