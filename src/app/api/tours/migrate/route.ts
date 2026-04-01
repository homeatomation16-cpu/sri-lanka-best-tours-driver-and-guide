import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Tour from "@/models/Tour";

// භාෂා 14ම මෙතැනට Import කරන්න
import { TOURS as en } from "@/data/tours/en";
import { TOURS as si } from "@/data/tours/si";
import { TOURS as ru } from "@/data/tours/ru";
import { TOURS as fr } from "@/data/tours/fr";
import { TOURS as de } from "@/data/tours/de";
import { TOURS as it } from "@/data/tours/it";
import { TOURS as es } from "@/data/tours/es";
import { TOURS as ja } from "@/data/tours/ja";
import { TOURS as zh } from "@/data/tours/zh";
import { TOURS as ar } from "@/data/tours/ar";
import { TOURS as hi } from "@/data/tours/hi";
import { TOURS as ko } from "@/data/tours/ko";
import { TOURS as pt } from "@/data/tours/pt";
import { TOURS as ta } from "@/data/tours/ta";

const allLangs: any = { en, si, ru, fr, de, it, es, ja, zh, ar, hi, ko, pt, ta };

export async function GET() {
  try {
    await connectDB();

    // 1. ඉංග්‍රීසි ලිස්ට් එක පදනම කරගෙන වැඩේ පටන් ගමු
    for (const tourBase of en) {
      const tourId = tourBase.id;
      const translations: any = {};

      // 2. භාෂා 14 හරහා ගොස් දත්ත ටික එකතු කරගන්න
      Object.keys(allLangs).forEach((lang) => {
        const langData = allLangs[lang];
        const match = langData.find((t: any) => t.id === tourId);

        if (match) {
          translations[lang] = {
            title: match.title || "",
            overview: match.overview || "",
            itinerary: match.itinerary || [],
            included: match.included || [],
            excluded: match.excluded || [],
            vehicleInfo: match.vehicleInfo || [],
          };
        }
      });

      // 3. Database එකට Update හෝ Insert (Upsert) කිරීම
      await Tour.findOneAndUpdate(
        { tourId: tourId },
        {
          tourId: tourId,
          price: tourBase.price,
          image: tourBase.image,
          duration: tourBase.duration,
          tourType: tourBase.tourType,
          translations: translations,
          status: "active"
        },
        { upsert: true, returnDocument: 'after', strict: false }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: `Success! ${en.length} tours imported in 14 languages.` 
    });

  } catch (error: any) {
    console.error("Migration Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}