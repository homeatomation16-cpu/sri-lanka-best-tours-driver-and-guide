import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";

// 🔹 UPDATE STATUS
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params; // 🔥 important
    const { status } = await req.json();

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { returnDocument: "after" }
    );

    if (!updatedBooking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBooking);

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 🔹 DELETE BOOKING
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const deleted = await Booking.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}