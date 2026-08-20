import connectDB from "@/lib/mongodb";
import Tour from "@/models/Tour";
import { NextResponse } from "next/server";

// GET ALL TOURS
export async function GET() {
  try {
    await connectDB();
    const tours = await Tour.find().sort({ createdAt: -1 });
    return NextResponse.json(tours);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// CREATE TOUR
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const newTour = await Tour.create({
      ...body,
      price: Number(body.price),
      pricePerPerson: Number(body.pricePerPerson ?? body.price),
      additionalPersonPrice: Number(body.additionalPersonPrice ?? body.pricePerPerson ?? body.price),
      minimumPeople: 2,
      duration: Number(body.duration),
    });

    return NextResponse.json(newTour, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}