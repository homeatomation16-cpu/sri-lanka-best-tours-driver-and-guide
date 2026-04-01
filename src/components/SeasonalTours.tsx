// src/components/SeasonalTours.tsx
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import connectDB from "@/lib/mongodb";
import Tour from "@/models/Tour";

export default async function SeasonalTours({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "seasonal" });
  const tTours = await getTranslations({ locale, namespace: "tours" });

  await connectDB();
  const eastCoastTours = await Tour.find({
    tourId: { $in: ["05-days-east-coast", "08-days-east-coast", "10-days-east-coast"] }
  }).lean();

  return (
    <section className="py-20 bg-linear-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header කොටස කලින් තිබුණු විදිහම පාවිච්චි කරන්න */}
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {eastCoastTours.map((tour: any) => {
            const data = tour.translations?.[locale] || tour.translations?.["en"];
            return (
              <Link
                key={tour.tourId}
                href={`/${locale}/tours/${tour.tourId}`}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
              >
                {/* Image and content logic same as above */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition">{data?.title}</h3>
                  {/* ... */}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}