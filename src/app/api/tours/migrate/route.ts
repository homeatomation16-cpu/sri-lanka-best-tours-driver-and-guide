import { requireAdmin } from "@/lib/adminAuth";
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
  const denied = await requireAdmin();
  if (denied) return denied;

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
            shortDescription: match.shortDescription || "",
            overview: match.overview || "",
            categoryName: match.category?.name || "",
            route: match.route || [],
            itinerary: match.itinerary || [],
            included: match.included || [],
            excluded: match.excluded || [],
            vehicleInfo: match.vehicleInfo || [],
          };
        }
      });

      // 3. Database එකට Update හෝ Insert (Upsert) කිරීම
      // Prices follow the live site's group price table, so the old per-person overrides are cleared.
      await Tour.findOneAndUpdate(
        { tourId: tourId },
        {
          $set: {
            tourId: tourId,
            price: tourBase.price,
            groupPrices: tourBase.groupPrices,
            currency: tourBase.currency,
            category: tourBase.category?.slug,
            image: tourBase.image,
            gallery: tourBase.gallery,
            stops: tourBase.stops,
            duration: tourBase.duration,
            maxPeople: tourBase.maxPeople,
            tourType: tourBase.tourType,
            translations: translations,
            status: "active",
          },
          $unset: { pricePerPerson: "", additionalPersonPrice: "" },
        },
        { upsert: true, returnDocument: 'after', strict: false }
      );
    }

    // 4. Tours that are not in the list any more are hidden (not deleted), so the site matches the live one.
    const hidden = await Tour.updateMany(
      { tourId: { $nin: en.map((tour) => tour.id) }, status: "active" },
      { $set: { status: "inactive" } }
    );

    return NextResponse.json({
      success: true,
      message: `Success! ${en.length} tours imported in 14 languages. ${hidden.modifiedCount} old tours hidden.`
    });

  } catch (error: any) {
    console.error("Migration Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}