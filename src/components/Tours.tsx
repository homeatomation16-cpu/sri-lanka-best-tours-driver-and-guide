// src/components/Tours.tsx
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import connectDB from "@/lib/mongodb";
import Tour from "@/models/Tour";

export default async function Tours({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "tours" });

  await connectDB();
  // නිශ්චිත ID මගින් දත්ත සෙවීම
  const downSouthTours = await Tour.find({
    tourId: { $in: ["05-days-down-south", "08-days-down-south", "10-days-down-south"] }
  }).lean();

  return (
    <section className="py-20 bg-linear-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header - (කලින් තිබුණු විදිහමයි) */}
        <div className="text-center gap-0.5 mb-14">
          <h1 className="text-amber-900 font-thea text-4xl py-2">{t("sectionLabel")}</h1>
          <h1 className="font-poppins text-5xl py-4">{t("heading")}</h1>
          <h2 className="font-bold text-4xl text-orange-500 py-5">{t("season")}</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">{t("seasonDesc")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {downSouthTours.map((tour: any) => {
            const data = tour.translations?.[locale] || tour.translations?.["en"];
            return (
              <Link
                key={tour.tourId}
                href={`/${locale}/tours/${tour.tourId}`}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
              >
                <div className="relative h-60 w-full overflow-hidden">
                  <Image src={tour.image} alt={data?.title} fill className="object-cover group-hover:scale-110 transition duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute top-4 left-4 bg-orange-500 text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md">
                    {t("from")} ${tour.price}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition">{data?.title}</h3>
                  <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                    <span>{tour.duration} {tour.duration > 1 ? t("days") : t("day")}</span>
                    <span>{t("maxPeople", { count: tour.maxPeople || 10 })}</span>
                  </div>
                  <div className="mt-6">
                    <span className="inline-block bg-orange-100 text-orange-600 text-sm px-4 py-2 rounded-full font-medium group-hover:bg-orange-500 group-hover:text-white transition">
                      {t("viewDetails")}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}