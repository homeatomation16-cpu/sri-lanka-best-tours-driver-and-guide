import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { esc, requireAdmin } from "@/lib/adminAuth";
import { emailLayout, emailText, notifyAdmins, sendEmail, SITE_URL } from "@/lib/email";

// Changes the customer is told about (texts: messages/<locale>.json → emails.<key>Subject / <key>Body).
// "pending" needs no e-mail.
const CUSTOMER_EVENTS = ["confirmed", "cancelled", "completed", "paid"] as const;
type CustomerEvent = (typeof CUSTOMER_EVENTS)[number];

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
    ].filter((key): key is CustomerEvent => CUSTOMER_EVENTS.includes(key as CustomerEvent));
    for (const key of changes) try {
      const t = await emailText(updated.locale);
      const subject = t(`${key}Subject`);
      const ref = String(updated._id).slice(-8).toUpperCase();
      await sendEmail({
        to: updated.email,
        subject: `${subject} (${ref})`,
        html: await emailLayout(subject, `<p>${esc(t("hello", { name: updated.name }))}</p><p>${esc(t(`${key}Body`))}</p><p><strong>${esc(updated.itemName || "-")}</strong> · ${esc(t("reference"))} ${esc(ref)}${updated.date ? ` · ${esc(updated.date)}` : ""}</p>`, { label: t("viewBookings"), url: `${SITE_URL}/account` }, updated.locale),
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
