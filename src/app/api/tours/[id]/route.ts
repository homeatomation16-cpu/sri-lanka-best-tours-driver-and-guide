import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Tour from "@/models/Tour";

// 🔹 GET SINGLE TOUR
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params; // 🔥 FIX (IMPORTANT)

    const tour = await Tour.findById(id);

    if (!tour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }

    return NextResponse.json(tour);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 🔹 UPDATE TOUR (PRICE + ALL LANGUAGES)
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params; // 🔥 FIX

    const body = await req.json();

    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: {
          price: Number(body.price),
          duration: Number(body.duration),
          image: body.image,
          tourType: body.tourType,
          translations: body.translations,
        },
      },
      { returnDocument: "after" } // 🔥 mongoose fix
    );

    if (!updatedTour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTour);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 🔹 DELETE TOUR
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params; // 🔥 FIX

    const deletedTour = await Tour.findByIdAndDelete(id);

    if (!deletedTour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}