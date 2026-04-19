import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Vehicle, { IVehicle } from "@/models/Vehicle";
import { AnyBulkWriteOperation } from "mongoose";

// 🔹 languages import
import { vehicles as en } from "@/data/vehicles/en";
import { vehicles as si } from "@/data/vehicles/si";
import { vehicles as ru } from "@/data/vehicles/ru";
import { vehicles as fr } from "@/data/vehicles/fr";
import { vehicles as de } from "@/data/vehicles/de";
import { vehicles as it } from "@/data/vehicles/it";
import { vehicles as es } from "@/data/vehicles/es";
import { vehicles as ja } from "@/data/vehicles/ja";
import { vehicles as zh } from "@/data/vehicles/zh";
import { vehicles as ar } from "@/data/vehicles/ar";
import { vehicles as hi } from "@/data/vehicles/hi";
import { vehicles as ko } from "@/data/vehicles/ko";
import { vehicles as pt } from "@/data/vehicles/pt";
import { vehicles as ta } from "@/data/vehicles/ta";

// 🔹 all languages map
const allLangs: Record<string, any[]> = {
  en, si, ru, fr, de, it, es, ja, zh, ar, hi, ko, pt, ta
};

export async function GET() {
  try {
    await connectDB();

    // 🔥 BULK OPERATIONS (TYPE SAFE)
    const operations: AnyBulkWriteOperation<IVehicle>[] = en.map((vehicleBase: any) => {
      const vehicleId = vehicleBase.id;

      // ✅ FIX PRICE (remove $)
      const price = parseFloat(
        (vehicleBase.price || "0").replace("$", "")
      );

      const translations: Record<string, any> = {};

      // 🔹 collect translations
      Object.keys(allLangs).forEach((lang) => {
        const match = allLangs[lang].find((v: any) => v.id === vehicleId);

        if (match) {
          translations[lang] = {
            name: match.name || "",
            overview: match.overview || "",
            features: match.features || [],
            paymentPolicy: match.paymentPolicy || [],
          };
        }
      });

      return {
        updateOne: {
          filter: { vehicleId },
          update: {
            $set: {
              vehicleId,
              name: vehicleBase.name,
              type: vehicleBase.type,
              price, // ✅ number
              passengers: vehicleBase.passengers || 0,
              fuel: vehicleBase.fuel || "",
              transmission: vehicleBase.transmission || "",
              image: vehicleBase.image || "",
              gallery: vehicleBase.gallery || [],
              driver: vehicleBase.driver || {},
              translations,
              status: "active" as IVehicle["status"], // ✅ TS FIX
            },
          },
          upsert: true,
        },
      };
    });

    // 🔥 FAST INSERT
    const result = await Vehicle.bulkWrite(operations);

    return NextResponse.json({
      success: true,
      message: `✅ ${en.length} vehicles imported successfully`,
      result,
    });

  } catch (error: any) {
    console.error("Vehicle Migration Error:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}