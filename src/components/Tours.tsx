import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import connectDB from "@/lib/mongodb";
import Tour from "@/models/Tour";

export default async function ToursSection({ locale }: { locale: string }) {
  // 'tours' namespace එකෙන් පරිවර්තන ලබා ගැනීම
  const t = await getTranslations({ locale, namespace: "tours" });

  await connectDB();

  // නිශ්චිත ID මගින් Down South Tours පමණක් සෙවීම
  const downSouthTours = await Tour.find({
    tourId: { 
      $in: ["05-days-down-south", "08-days-down-south", "10-days-down-south"] 
    }
  }).lean();

  return (
    <section className="py-20 bg-linear-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-14">
          <p className="text-orange-500 font-bold uppercase tracking-widest text-sm mb-3">
            {t("sectionLabel")}
          </p>
          <h2 className="font-poppins text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
            {t("heading")}
          </h2>
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold text-orange-500 mb-4">
               {t("season")}
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t("seasonDesc")}
            </p>
            <div className="mt-6 h-1.5 w-20 bg-orange-500 rounded-full" />
          </div>
        </div>

        {/* Tours Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {downSouthTours.map((tour: any) => {
            // අදාළ භාෂාවට අදාළ දත්ත ලබා ගැනීම (Fallback to English)
            const data = tour.translations?.[locale] || tour.translations?.["en"];
            
            return (
              <Link
                key={tour.tourId}
                href={`/${locale}/tours/${tour.tourId}`}
                className="group bg-white rounded-4xl shadow-xl shadow-zinc-200/50 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-zinc-100"
              >
                {/* Image Container */}
                <div className="relative h-72 w-full overflow-hidden">
                  <Image 
                    src={tour.image} 
                    alt={data?.title || "Tour Image"} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                    sizes="(max-width: 768px) 100vw, 33vw" 
                  />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg">
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-tighter mb-0.5">
                      {t("from")}
                    </p>
                    <p className="text-xl font-black text-orange-600 leading-none">
                      ${tour.price}
                    </p>
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-8 flex flex-col grow">
                  <h3 className="text-2xl font-bold text-zinc-900 group-hover:text-orange-600 transition-colors line-clamp-2 mb-4">
                    {data?.title}
                  </h3>
                  
                  <div className="flex justify-between items-center mt-auto pt-6 border-t border-zinc-50">
                    <div className="flex flex-col">
                       <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">{t("duration")}</span>
                       <span className="text-sm font-bold text-zinc-700">
                          {tour.duration} {tour.duration > 1 ? t("days") : t("day")}
                       </span>
                    </div>
                    <div className="flex flex-col text-right">
                       <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">Availability</span>
                       <span className="text-sm font-bold text-zinc-700">
                          {t("maxPeople", { count: tour.maxPeople || 10 })}
                       </span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <button className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold text-sm group-hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-zinc-900/10 group-hover:shadow-orange-500/20">
                      {t("viewDetails")}
                    </button>
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