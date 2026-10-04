import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Tour from "@/models/Tour";
import { requireAdmin } from "@/lib/adminAuth";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, context: Ctx) {
  try {
    await connectDB();
    const { id } = await context.params;
    if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    const tour = await Tour.findById(id).lean();
    if (!tour) return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    return NextResponse.json(tour);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// UPDATE (admin only) - partial updates are supported (e.g. only { status })
export async function PUT(req: Request, context: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    await connectDB();
    const { id } = await context.params;
    if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    const body = await req.json();
    const set: Record<string, any> = {};

    const num = (v: any) => (v === "" || v === null || v === undefined ? undefined : Number(v));

    if (body.price !== undefined) set.price = num(body.price);
    if (body.pricePerPerson !== undefined) set.pricePerPerson = num(body.pricePerPerson) ?? num(body.price);
    if (body.additionalPersonPrice !== undefined) {
      set.additionalPersonPrice = num(body.additionalPersonPrice) ?? num(body.pricePerPerson) ?? num(body.price);
    }
    if (body.minimumPeople !== undefined) set.minimumPeople = num(body.minimumPeople) ?? 2;
    if (body.maxPeople !== undefined) set.maxPeople = num(body.maxPeople);
    if (body.minAge !== undefined) set.minAge = num(body.minAge);
    if (body.duration !== undefined) set.duration = num(body.duration);
    if (body.image !== undefined) set.image = body.image;
    if (Array.isArray(body.gallery)) set.gallery = body.gallery.filter(Boolean);
    if (body.tourType !== undefined) set.tourType = body.tourType;
    if (body.featured !== undefined) set.featured = !!body.featured;
    if (body.translations !== undefined) set.translations = body.translations;
    if (body.status === "active" || body.status === "inactive") set.status = body.status;

    const updatedTour = await Tour.findByIdAndUpdate(id, { $set: set }, { returnDocument: "after" });
    if (!updatedTour) return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    return NextResponse.json(updatedTour);
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
    const deleted = await Tour.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
