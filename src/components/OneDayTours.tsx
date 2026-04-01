// src/components/OneDayTours.tsx
import Image from "next/image";
import Link from "next/link";
import { Users } from "lucide-react";
import { getTranslations } from "next-intl/server";
import connectDB from "@/lib/mongodb";
import Tour from "@/models/Tour";

export default async function OneDayTours({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "tours" });

  await connectDB();
  // දින 1 ඒවා විතරක් filter කිරීම
  const oneDayTours = await Tour.find({ duration: 1, status: "active" }).lean();

  return (
    <section className="py-16 sm:py-20 lg:py-32 px-5 sm:px-8 bg-linear-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <p className="text-orange-600 text-sm sm:text-base tracking-wider uppercase mb-3">{t("luxuryDayTrips")}</p>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">{t("oneDayPackages")}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {oneDayTours.map((tour: any) => {
            const data = tour.translations?.[locale] || tour.translations?.["en"];
            return (
              <div key={tour.tourId} className="group relative rounded-3xl overflow-hidden bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl">
                <div className="relative h-60 sm:h-64 overflow-hidden">
                  <Image src={tour.image} alt={data?.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
                  <div className="absolute bottom-4 right-4 bg-white px-4 py-1.5 rounded-full text-sm font-semibold shadow">
                    {t("from")} ${tour.price}
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">{data?.title}</h3>
                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-6">
                    <Users className="w-4 h-4 text-orange-500" />
                    {t("upToGuests", { count: tour.maxPeople || 20 })}
                  </div>
                  <Link href={`/${locale}/tours/${tour.tourId}`}>
                    <button className="w-full py-3 rounded-full text-sm sm:text-base font-semibold text-white bg-linear-to-r from-orange-600 to-amber-500 transition hover:scale-[1.03]">
                      {t("exploreTour")}
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}