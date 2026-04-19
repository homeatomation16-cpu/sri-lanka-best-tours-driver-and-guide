import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Vehicle, { IVehicle } from "@/models/Vehicle";

// 🔹 GET SINGLE
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    }

    return NextResponse.json(vehicle);

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 🔹 UPDATE
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;
    const body = await req.json();

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      id,
      {
        $set: {
          vehicleId: body.vehicleId,
          name: body.name,
          type: body.type,
          price: Number(body.price || 0),
          passengers: body.passengers,
          fuel: body.fuel,
          transmission: body.transmission,
          image: body.image,
          gallery: body.gallery || [],
          driver: body.driver || {},
          translations: body.translations || {},
          status: (body.status || "active") as IVehicle["status"], // 🔥 FIX
        },
      },
      { returnDocument: "after" }
    );

    if (!updatedVehicle) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    }

    return NextResponse.json(updatedVehicle);

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 🔹 DELETE
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const deleted = await Vehicle.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}