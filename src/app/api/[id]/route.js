import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { NextResponse } from "next/server";

// 1. PATCH: Booking එකක Status එක (Pending/Confirmed/Cancelled) Update කිරීමට
export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const { status } = await req.json();

    await connectDB();
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, updatedBooking });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 2. DELETE: Booking එකක් සම්පූර්ණයෙන්ම ඉවත් කිරීමට
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await connectDB();
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Booking deleted" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}