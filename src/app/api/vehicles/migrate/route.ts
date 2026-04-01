import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Vehicle from "@/models/Vehicle";

// භාෂා 14ම මෙතැනට Import කරන්න (Path එක නිවැරදි දැයි බලන්න)
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

const allLangs: any = { en, si, ru, fr, de, it, es, ja, zh, ar, hi, ko, pt, ta };

export async function GET() {
  try {
    await connectDB();

    // 1. ඉංග්‍රීසි ලිස්ට් එක පදනම කරගෙන වැඩේ පටන් ගමු
    for (const vehicleBase of en) {
      const vehicleId = vehicleBase.id;
      const translations: any = {};

      // 2. භාෂා 14 හරහා ගොස් වාහන දත්ත ටික එකතු කරගන්න
      Object.keys(allLangs).forEach((lang) => {
        const langData = allLangs[lang];
        const match = langData.find((v: any) => v.id === vehicleId);

        if (match) {
          translations[lang] = {
            name: match.name || "",
            overview: match.overview || "",
            features: match.features || [],
            paymentPolicy: match.paymentPolicy || [],
          };
        }
      });

      // 3. Database එකට Update හෝ Insert (Upsert) කිරීම
      await Vehicle.findOneAndUpdate(
        { vehicleId: vehicleId } as any,
        {
          vehicleId: vehicleId,
          name: vehicleBase.name, // Base name
          type: vehicleBase.type,
          price: vehicleBase.price,
          passengers: vehicleBase.passengers,
          fuel: vehicleBase.fuel,
          transmission: vehicleBase.transmission,
          image: vehicleBase.image,
          gallery: vehicleBase.gallery || [],
          driver: vehicleBase.driver || {},
          translations: translations, // මෙතැනට භාෂා 14ම දත්ත වැටේ
          status: "active"
        },
        { upsert: true, returnDocument: 'after', strict: false }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: `Success! ${en.length} vehicles imported in 14 languages.` 
    });

  } catch (error: any) {
    console.error("Vehicle Migration Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}