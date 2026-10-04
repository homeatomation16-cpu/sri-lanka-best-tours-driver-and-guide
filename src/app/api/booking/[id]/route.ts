import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { requireAdmin } from "@/lib/adminAuth";

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

    const updated = await Booking.findByIdAndUpdate(id, update, { returnDocument: "after" }).lean();
    if (!updated) return NextResponse.json({ error: "Booking not found" }, { status: 404 });
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
