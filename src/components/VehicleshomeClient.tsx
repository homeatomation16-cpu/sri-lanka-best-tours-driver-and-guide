"use client";

import Image from "next/image";
import Link from "next/link";
import { Users, Fuel, Settings, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

// 1. Props සඳහා Interface එක (TypeScript Error එක විසඳීමට)
interface VehiclesHomeProps {
  vehicles: any[];
  locale: string;
}

const languageDrivers = [
  "English Speaking",
  "French Speaking",
  "German Speaking",
  "Hindi Speaking",
  "Spanish Speaking",
  "Italian Speaking",
  "Arabic Speaking",
  "Russian Speaking",
];

export default function VehiclesHomeClient({ vehicles, locale }: VehiclesHomeProps) {
  const t = useTranslations("vehicles");
  const [currentLang, setCurrentLang] = useState(0);
  const [fade, setFade] = useState(true);

  // භාෂා මාරු වෙන ඇනිමේෂන් එක
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentLang((prev) => (prev === languageDrivers.length - 1 ? 0 : prev + 1));
        setFade(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-linear-to-b from-white to-orange-50/30 relative overflow-hidden">
      {/* Background Soft Orbs - Designs without Hero Images */}
      <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* --- HEADER SECTION --- */}
        <div className="text-center mb-16">
          <p className="text-orange-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
            {t("whatsNew")}
          </p>
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-zinc-900 mb-8 leading-tight">
            {t("heading")}
          </h2>
          
          {/* Animated Language Line */}
          <div className="flex items-center justify-center flex-wrap gap-2 text-xl md:text-2xl font-medium text-zinc-800 mb-8 min-h-10">
            <span className="opacity-70">We have</span>
            <span className={`transition-all duration-500 font-bold text-orange-600 border-b-2 border-orange-200 px-2 min-w-45 ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
              {languageDrivers[currentLang]}
            </span>
            <span className="opacity-70">Drivers</span>
          </div>

          <p className="max-w-4xl mx-auto text-zinc-500 text-lg leading-relaxed italic font-serif">
            "{t("desc")}"
          </p>
          
          <div className="mt-10 h-1.5 w-20 bg-orange-500 mx-auto rounded-full" />
        </div>

        {/* --- VEHICLES GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {vehicles.map((v: any) => {
            // භාෂාව අනුව නම සහ විස්තර තෝරාගැනීම
            const data = v.translations?.[locale] || v.translations?.["en"] || v;
            
            return (
              <Link 
                key={v.vehicleId} 
                href={`/${locale}/vehicles/${v.vehicleId}`} 
                className="group bg-white rounded-[40px] shadow-xl hover:shadow-2xl transition-all duration-500 border border-zinc-100 overflow-hidden flex flex-col h-full"
              >
                {/* Vehicle Image Container */}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image 
                    src={v.image || "/placeholder.jpg"} 
                    alt={data.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    sizes="(max-width: 768px) 100vw, 33vw" 
                  />
                  <div className="absolute top-6 left-6 bg-orange-600 text-white px-4 py-2 rounded-2xl font-bold shadow-lg text-sm tracking-tight">
                    {v.price}/day
                  </div>
                  <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-orange-600 uppercase tracking-widest shadow-sm">
                    {v.type}
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="p-8 flex flex-col flex-1">
                  <h4 className="text-2xl font-bold text-zinc-900 mb-4 group-hover:text-orange-600 transition-colors">
                    {data.name}
                  </h4>
                  
                  {/* Stats Stripe */}
                  <div className="flex justify-between items-center py-5 border-y border-zinc-50">
                    <div className="flex items-center gap-2 text-zinc-500 text-[11px] font-bold uppercase tracking-tight">
                      <Users size={14} className="text-orange-500"/> {v.passengers} pax
                    </div>
                    <div className="flex items-center gap-2 text-zinc-500 text-[11px] font-bold uppercase tracking-tight">
                      <Settings size={14} className="text-orange-500"/> {v.transmission}
                    </div>
                    <div className="flex items-center gap-2 text-zinc-500 text-[11px] font-bold uppercase tracking-tight">
                      <Fuel size={14} className="text-orange-500"/> {v.fuel}
                    </div>
                  </div>

                  {/* CTA Area */}
                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-zinc-300 text-[9px] font-black uppercase tracking-[0.2em]">
                      Sri Lanka Best Tours
                    </span>
                    <span className="text-orange-600 font-bold text-sm flex items-center gap-1 group-hover:gap-3 transition-all">
                      {t("viewDetails")} <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* --- VIEW ALL CTA --- */}
        <div className="text-center mt-20">
          <Link 
            href={`/${locale}/vehicles`} 
            className="inline-flex items-center gap-3 px-10 py-5 bg-zinc-900 text-white rounded-3xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-orange-600 transition-all shadow-2xl shadow-zinc-900/20 active:scale-95"
          >
            {t("viewAll")} <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}