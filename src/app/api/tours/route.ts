import connectDB from "@/lib/mongodb";
import Tour from "@/models/Tour";
import { NextResponse } from "next/server";
import { isAdmin, requireAdmin } from "@/lib/adminAuth";

// GET: public sees active tours only, admin sees everything
export async function GET() {
  try {
    await connectDB();
    const admin = await isAdmin();
    const tours = await Tour.find(admin ? {} : { status: "active" }).sort({ createdAt: -1 }).lean();
    return NextResponse.json(tours);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// CREATE (admin only)
export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    await connectDB();
    const body = await req.json();

    const tourId = String(body.tourId || "").trim().toLowerCase().replace(/\s+/g, "-");
    if (!tourId) return NextResponse.json({ error: "Tour ID is required" }, { status: 400 });
    if (!body.price || Number(body.price) <= 0) {
      return NextResponse.json({ error: "Price must be greater than 0" }, { status: 400 });
    }
    if (await Tour.exists({ tourId })) {
      return NextResponse.json({ error: `Tour ID "${tourId}" already exists` }, { status: 409 });
    }

    const price = Number(body.price);
    const newTour = await Tour.create({
      tourId,
      price,
      pricePerPerson: Number(body.pricePerPerson || price),
      additionalPersonPrice: Number(body.additionalPersonPrice || body.pricePerPerson || price),
      minimumPeople: Number(body.minimumPeople) || 2,
      maxPeople: Number(body.maxPeople) || undefined,
      minAge: Number(body.minAge) || undefined,
      duration: Number(body.duration) || 1,
      image: body.image || "",
      gallery: Array.isArray(body.gallery) ? body.gallery.filter(Boolean) : [],
      tourType: body.tourType || "",
      featured: !!body.featured,
      translations: body.translations || {},
      status: body.status === "inactive" ? "inactive" : "active",
    });

    return NextResponse.json(newTour, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
