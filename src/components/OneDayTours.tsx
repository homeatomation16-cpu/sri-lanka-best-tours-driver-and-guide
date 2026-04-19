import Image from "next/image";
import Link from "next/link";
import { Users, Clock, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import connectDB from "@/lib/mongodb";
import Tour from "@/models/Tour";

export default async function OneDayTours({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "tours" });

  await connectDB();
  const oneDayTours = await Tour.find({ duration: 1, status: "active" }).lean();

  return (
    <section className="py-24 bg-linear-to-b from-white to-orange-50/30">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- HEADER SECTION --- */}
        <div className="text-center mb-20">
          <p className="text-orange-600 text-xs sm:text-sm font-bold tracking-[0.3em] uppercase mb-4">
            {t("luxuryDayTrips")}
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-6 leading-tight">
            {t("oneDayPackages")}
          </h2>
          <p className="text-gray-500 max-w-3xl mx-auto text-lg leading-relaxed font-light">
            {t("oneDayDesc")}
          </p>
          <div className="mt-10 h-1 w-20 bg-orange-500 mx-auto rounded-full" />
        </div>

        {/* --- TOURS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {oneDayTours.map((tour: any) => {
            const data = tour.translations?.[locale] || tour.translations?.["en"];
            
            return (
              <div key={tour.tourId} className="group relative rounded-[40px] overflow-hidden bg-white shadow-xl shadow-orange-900/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-orange-100/50">
                
                {/* Image Area */}
                <div className="relative h-72 overflow-hidden">
                  <Image 
                    src={tour.image} 
                    alt={data?.title} 
                    fill 
                    quality={60} // ✅ Added to shrink image payload
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    sizes="(max-width:768px) 100vw, 33vw" 
                  />
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white/20">
                    <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest block leading-none mb-1">{t("from")}</span>
                    <span className="text-xl font-black text-gray-900 leading-none">${tour.price}</span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                    {data?.title}
                  </h3>
                  
                  <div className="flex items-center gap-6 text-gray-500 text-sm mb-8">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span className="font-medium">1 {t("day")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-orange-500" />
                      <span className="font-medium">{t("upToGuests", { count: tour.maxPeople || 10 })}</span>
                    </div>
                  </div>

                  <Link href={`/${locale}/tours/${tour.tourId}`}>
                    {/* ✅ Changed button to div to prevent HTML/Accessibility errors */}
                    <div className="w-full py-4 rounded-2xl font-bold text-sm uppercase tracking-widest text-white bg-zinc-900 transition-all hover:bg-orange-600 shadow-lg shadow-zinc-900/20 flex items-center justify-center gap-2">
                      {t("exploreTour")} <ArrowRight size={16} />
                    </div>
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