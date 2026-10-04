import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import { requireAdmin } from "@/lib/adminAuth";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, context: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await context.params;
  if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const body = await req.json();
  const set: Record<string, any> = {};
  if (["new", "contacted", "closed"].includes(body.status)) set.status = body.status;
  if (typeof body.internalNotes === "string") set.internalNotes = body.internalNotes;

  await connectDB();
  const updated = await Inquiry.findByIdAndUpdate(id, { $set: set }, { returnDocument: "after" }).lean();
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, context: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await context.params;
  await connectDB();
  await Inquiry.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
