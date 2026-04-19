import connectDB from "@/lib/mongodb";
import Vehicle from "@/models/Vehicle";
import { NextResponse } from "next/server";

// 🔹 GET ALL VEHICLES
export async function GET() {
  try {
    await connectDB();

    const vehicles = await Vehicle.find().sort({ createdAt: -1 });

    return NextResponse.json(vehicles);

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 🔹 CREATE VEHICLE
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const newVehicle = await Vehicle.create({
      ...body,
      price: Number(body.price || 0),
    });

    return NextResponse.json(newVehicle, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}