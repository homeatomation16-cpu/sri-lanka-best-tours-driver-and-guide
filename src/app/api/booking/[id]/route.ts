import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { esc, requireAdmin } from "@/lib/adminAuth";
import { emailLayout, notifyAdmins, sendEmail, SITE_URL } from "@/lib/email";

// What the customer is told when the team changes a booking (pending needs no e-mail).
const CUSTOMER_MESSAGES: Record<string, { subject: string; text: string }> = {
  confirmed: { subject: "Your booking is confirmed", text: "Good news – your booking has been confirmed by our team. We will contact you with the final details." },
  cancelled: { subject: "Your booking has been cancelled", text: "Your booking has been cancelled. If this is unexpected or you would like to rebook, please reply to this e-mail or message us on WhatsApp." },
  completed: { subject: "Thank you for travelling with us", text: "Your trip is marked as completed. Thank you for travelling with us – we hope to see you again." },
  paid: { subject: "Payment received", text: "We have received your payment for this booking. Thank you!" },
};

type Ctx = { params: Promise<{ id: string }> };

const STATUSES = ["pending", "confirmed", "cancelled", "completed"];
const PAYMENTS = ["unpaid", "deposit", "paid"];

// UPDATE status / payment / notes / driver (admin only)
export async function PATCH(req: Request, context: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    await connectDB();
    const { id } = await context.params;
    if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    const body = await req.json();
    const set: Record<string, any> = {};
    const log: string[] = [];

    if (body.status !== undefined) {
      if (!STATUSES.includes(body.status)) return NextResponse.json({ error: "Invalid status" }, { status: 400 });
      set.status = body.status;
      log.push(`Status changed to ${body.status}`);
    }
    if (body.paymentStatus !== undefined) {
      if (!PAYMENTS.includes(body.paymentStatus)) return NextResponse.json({ error: "Invalid payment status" }, { status: 400 });
      set.paymentStatus = body.paymentStatus;
      log.push(`Payment marked ${body.paymentStatus}`);
    }
    if (body.amountPaid !== undefined) set.amountPaid = Number(body.amountPaid) || 0;
    if (typeof body.internalNotes === "string") set.internalNotes = body.internalNotes;
    if (typeof body.assignedDriver === "string") {
      set.assignedDriver = body.assignedDriver;
      log.push(`Driver set to ${body.assignedDriver || "none"}`);
    }

    const update: any = { $set: set };
    if (log.length) update.$push = { history: { $each: log.map((action) => ({ action, at: new Date() })) } };

    const before: any = await Booking.findByIdAndUpdate(id, update, { returnDocument: "before" }).lean();
    if (!before) return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    const updated: any = await Booking.findById(id).lean();

    // E-mail the customer and the team only when the status / payment really changed (no repeats on re-save)
    const changes = [
      set.status && set.status !== before.status ? set.status : null,
      set.paymentStatus === "paid" && before.paymentStatus !== "paid" ? "paid" : null,
    ].filter((key): key is string => Boolean(key && CUSTOMER_MESSAGES[key]));
    for (const key of changes) try {
      const { subject, text } = CUSTOMER_MESSAGES[key];
      const ref = String(updated._id).slice(-8).toUpperCase();
      await sendEmail({
        to: updated.email,
        subject: `${subject} (${ref})`,
        html: await emailLayout(subject, `<p>Hello ${esc(updated.name)},</p><p>${esc(text)}</p><p><strong>${esc(updated.itemName || "Booking")}</strong> · reference ${esc(ref)}${updated.date ? ` · ${esc(updated.date)}` : ""}</p>`, { label: "View my bookings", url: `${SITE_URL}/account` }),
      });
      await notifyAdmins({
        replyTo: updated.email,
        subject: `Booking ${key === "paid" ? "paid" : key} - ${updated.itemName || "Booking"} (${ref})`,
        html: `<p>Booking <b>${esc(String(updated._id))}</b> (${esc(updated.name)}, ${esc(updated.email)}) is now <b>${esc(key)}</b>.</p>`,
      });
    } catch (mailError: any) {
      console.error("Status e-mail failed:", mailError?.message || mailError); // the change itself is saved
    }
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_req: Request, context: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    await connectDB();
    const { id } = await context.params;
    const deleted = await Booking.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
