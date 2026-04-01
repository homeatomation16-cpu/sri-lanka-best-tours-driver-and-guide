import connectDB from "@/lib/mongodb";
import Tour from "@/models/Tour";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const tours = await Tour.find().sort({ createdAt: -1 });
  return NextResponse.json(tours);
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newTour = await Tour.create(body);
    return NextResponse.json(newTour, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}