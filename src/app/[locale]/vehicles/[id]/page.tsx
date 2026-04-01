import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
  Users, Gauge, Fuel, Star,
  Languages, Check,
} from "lucide-react";
import Image from "next/image";

// Database Imports
import connectDB from "@/lib/mongodb";
import Vehicle from "@/models/Vehicle";

// Components
import Carousel from "@/components/Carousel";
import VehicleSlider from "@/components/VehicleSlider";
import BookingBox from "@/components/BookingBox";

// 1. Static Params (Build වීමේදී සියලු වාහන පිටු සෑදීමට DB එක පාවිච්චි කරයි)
export async function generateStaticParams() {
  await connectDB();
  const vehicles = await Vehicle.find({ status: "active" }).select("vehicleId").lean();
  const locales = ["en", "si", "ar", "zh", "ru", "fr", "de", "es", "it", "ja", "ko", "pt", "ta", "hi"];
  
  return locales.flatMap((locale) => 
    vehicles.map((v: any) => ({
      locale,
      id: v.vehicleId,
    }))
  );
}

export default async function VehiclePage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const t = await getTranslations("vehicles");

  // 2. Database එකට Connect වී දත්ත ලබා ගැනීම
  await connectDB();
  const vehicleRaw = await Vehicle.findOne({ vehicleId: id }).lean();

  if (!vehicleRaw) return notFound();

  // Serialization Fix (Next.js සඳහා දත්ත පිරිසිදු කිරීම)
  const vPlain = JSON.parse(JSON.stringify(vehicleRaw));

  // 3. භාෂාවට අදාළ දත්ත තෝරාගැනීම (Translations Logic)
  const translation = vPlain.translations?.[locale] || vPlain.translations?.["en"] || {};
  
  // දත්ත එකතු කිරීම (Merge properties)
  const v = {
    ...vPlain,
    name: translation.name || vPlain.name,
    overview: translation.overview || vPlain.overview,
    features: translation.features || vPlain.features || [],
    paymentPolicy: translation.paymentPolicy || vPlain.paymentPolicy || [],
  };

  const safeGallery = (v.gallery || []).filter(
    (img: any): img is string => typeof img === "string" && img.trim() !== ""
  );

  const specs = [
    { icon: Users,  label: t("passengers"),   value: `${v.passengers} Seats` },
    { icon: Gauge,  label: t("transmission"), value: v.transmission },
    { icon: Fuel,   label: t("fuel"),         value: v.fuel         },
    { icon: Star,   label: t("rating"),       value: "4.9 ★"       },
  ];

  const nameParts  = v.name.includes(" ") ? v.name.split(" ") : null;
  const namePrefix = nameParts ? nameParts.slice(0, -1).join(" ") : null;
  const nameSuffix = nameParts ? nameParts[nameParts.length - 1] : v.name;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');
        .vd-serif { font-family: 'Cormorant Garamond', serif; }
        .vd-sans  { font-family: 'Outfit', sans-serif; }
        .vd-anim { animation: vd-up 0.65s cubic-bezier(.22,1,.36,1) both; }
        @keyframes vd-up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="vd-sans min-h-screen bg-[#FAFAF8]">
        {/* HERO SECTION */}
        <section className="relative h-105 md:h-125 overflow-hidden flex items-end">
          <Image src="/vehicalcover.jpg" alt={v.name} fill priority className="object-cover" />
          <div className="absolute inset-0 z-10 bg-linear-to-b from-black/5 via-black/25 to-[#1a1714]/95" />
          <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 pb-12">
            <div className="vd-anim mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B5541A]/20 border border-[#B5541A]/40 backdrop-blur-md">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#F4A96B]">{v.type}</span>
            </div>
            <h1 className="vd-serif vd-anim text-white leading-[0.9] tracking-tighter" style={{ fontSize: "clamp(48px, 8vw, 92px)" }}>
              {namePrefix && <span className="block font-light opacity-90">{namePrefix}</span>}
              <em className="not-italic font-semibold text-orange-200">{nameSuffix}</em>
            </h1>
          </div>
        </section>

        {/* CONTENT SECTION */}
        <main className="relative z-30 max-w-7xl mx-auto px-6 md:px-12 -mt-16 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">
            <div className="space-y-12">
              <div className="vd-anim overflow-hidden shadow-2xl rounded-2xl bg-white aspect-video max-h-110 border border-white/60">
                <VehicleSlider images={safeGallery} />
              </div>

              {v.overview && (
                <section className="vd-anim">
                  <SectionLabel label={t("overview")} />
                  <div className="bg-white p-8 border-l-4 border-[#B5541A] rounded-r-2xl shadow-sm">
                    <p className="vd-serif italic text-xl md:text-2xl text-gray-700 leading-relaxed">{v.overview}</p>
                  </div>
                </section>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 vd-anim">
                {specs.map((s, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-black/5 text-center shadow-sm">
                    <s.icon size={18} className="text-[#B5541A] mx-auto mb-3" />
                    <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">{s.label}</div>
                    <div className="vd-serif text-xl font-bold">{s.value}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 vd-anim">
                {v.driver && (
                  <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <Languages size={16} className="text-[#B5541A]" />
                      <h3 className="text-[#B5541A] uppercase text-[10px] font-bold tracking-widest">{t("driverTitle")}</h3>
                    </div>
                    <p className="text-sm italic text-gray-500 mb-6">{t("experience")}: {v.driver.experience}</p>
                    <div className="flex flex-wrap gap-2">
                      {v.driver.languages?.map((l: string, idx: number) => (
                        <span key={idx} className="px-3 py-1 bg-gray-50 text-[9px] font-bold rounded-full border border-black/5 text-gray-500">{l}</span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm">
                  <h3 className="text-[#B5541A] uppercase text-[10px] font-bold tracking-widest mb-6">{t("included")}</h3>
                  <ul className="space-y-3">
                    {v.paymentPolicy?.map((p: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-xs text-gray-600">
                        <Check size={14} className="text-green-500 shrink-0 mt-0.5" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <aside className="sticky top-6 vd-anim">
              <div className="bg-white p-10 rounded-3xl shadow-2xl border border-black/5 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#B5541A]" />
                <span className="text-gray-300 text-[10px] uppercase tracking-widest font-bold block mb-4">{t("startsFrom")}</span>
                <div className="flex items-baseline justify-center gap-1 mb-10">
                  <span className="vd-serif text-3xl text-[#B5541A] font-bold">$</span>
                  <span className="vd-serif text-8xl font-bold italic tracking-tighter text-gray-900 leading-none">
                    {v.price.replace("$", "")}
                  </span>
                </div>
                {/* BookingBox වෙත DB එකෙන් ගත් දත්ත පාස් කිරීම */}
                <BookingBox vehicle={v} />
                <p className="mt-8 text-[9px] text-gray-400 italic uppercase tracking-tighter">{t("disclaimer")}</p>
              </div>
            </aside>
          </div>
        </main>

        <div className="bg-white border-t border-black/5 py-16">
          <div className="max-w-full mx-auto px-6 md:px-12">
            <Carousel />
          </div>
        </div>
      </div>
    </>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-6 mb-8 overflow-hidden">
      <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#B5541A] whitespace-nowrap">{label}</span>
      <div className="flex-1 h-[0.5px] bg-black/5" />
    </div>
  );
}