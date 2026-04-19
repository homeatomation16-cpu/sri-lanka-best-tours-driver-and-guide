import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import connectDB from "@/lib/mongodb";
import Tour from "@/models/Tour";

export default async function SeasonalTours({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "seasonal" });
  const tCommon = await getTranslations({ locale, namespace: "tours" });

  await connectDB();

  const eastCoastTours = await Tour.find({
    tourId: { 
      $in: ["05-days-east-coast", "08-days-east-coast", "10-days-east-coast"] 
    }
  }).lean();

  return (
    <section className="py-24 bg-linear-to-b from-white to-orange-50/50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- UPDATED HEADER SECTION --- */}
        <div className="text-center mb-20">
          <p className="text-orange-500 font-bold uppercase tracking-[0.25em] text-xs mb-4">
            {t("label") || "Exclusive Selection"}
          </p>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-stone-900 mb-4">
            {t("heading")}
          </h2>
          <h3 className="text-2xl font-bold text-amber-700 mb-6 italic">
            {t("season")}
          </h3>
          <p className="text-stone-500 max-w-3xl mx-auto leading-relaxed text-lg">
            {t("description")}
          </p>
          <div className="mt-10 h-1 w-24 bg-orange-500 mx-auto rounded-full" />
        </div>

        {/* Tours Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {eastCoastTours.map((tour: any) => {
            const data = tour.translations?.[locale] || tour.translations?.["en"];
            
            return (
              <Link
                key={tour.tourId}
                href={`/${locale}/tours/${tour.tourId}`}
                className="group bg-white rounded-[40px] shadow-xl shadow-stone-200/40 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-stone-100"
              >
                {/* Image Section */}
                <div className="relative h-72 w-full overflow-hidden">
                  <Image 
                    src={tour.image} 
                    alt={data?.title || "Tour"} 
                    fill 
                    quality={60} // ✅ Added to shrink image payload
                    className="object-cover group-hover:scale-105 transition-transform duration-1000" 
                    sizes="(max-width: 768px) 100vw, 33vw" 
                  />
                  <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-xl">
                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest leading-none mb-1">
                      {tCommon("from")}
                    </p>
                    <p className="text-2xl font-black text-orange-600 leading-none">
                      ${tour.price}
                    </p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-10 flex flex-col grow">
                  <h3 className="text-2xl font-serif font-bold text-stone-900 group-hover:text-orange-600 transition-colors mb-6 leading-snug">
                    {data?.title}
                  </h3>
                  
                  <div className="flex justify-between items-center mt-auto pt-8 border-t border-stone-50">
                    <div className="space-y-1">
                       {/* ✅ Changed text-stone-300 to text-stone-500 for Color Contrast */}
                       <span className="block text-[10px] uppercase font-black text-stone-500 tracking-[0.15em]">
                         {tCommon("duration")}
                       </span>
                       <span className="text-sm font-bold text-stone-600">
                          {tour.duration} {tour.duration > 1 ? tCommon("days") : tCommon("day")}
                       </span>
                    </div>
                    <div className="text-right space-y-1">
                       {/* ✅ Changed text-stone-300 to text-stone-500 for Color Contrast */}
                       <span className="block text-[10px] uppercase font-black text-stone-500 tracking-[0.15em]">
                         Capacity
                       </span>
                       <span className="text-sm font-bold text-stone-600">
                          {tCommon("maxPeople", { count: tour.maxPeople || 10 })}
                       </span>
                    </div>
                  </div>

                  <div className="mt-10">
                    <span className="flex items-center justify-center w-full py-5 bg-stone-50 text-stone-900 rounded-2xl font-bold text-xs uppercase tracking-widest group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                      {tCommon("viewDetails")}
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