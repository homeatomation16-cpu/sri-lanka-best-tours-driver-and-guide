// src/components/Destinations.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Destinations() {
  const t = useTranslations("destinations");
  const tPage = useTranslations("destinationPage");
  const [selected, setSelected] = useState<any>(null);

  const destinations = [
    {
      name: "Sigiriya",
      image: "https://woinupcbvkriufpyhwtm.supabase.co/storage/v1/object/public/images/sigiriya.png",
      short: "Ancient Rock Fortress",
      story: "Sigiriya is one of Sri Lanka's most iconic landmarks. Rising dramatically from the plains, this ancient rock fortress once housed a royal palace. Visitors climb through lion-shaped gateways, fresco-lined walls, and breathtaking viewpoints. At sunrise and sunset, the golden light transforms the rock into a magical sight.",
    },
    {
      name: "Kandy",
      image: "https://woinupcbvkriufpyhwtm.supabase.co/storage/v1/object/public/images/kandy.jpg",
      short: "Cultural Capital",
      story: "Kandy is the cultural heart of Sri Lanka. Home to the Temple of the Tooth Relic, sacred traditions, and scenic lake views, the city blends spirituality and beauty. Traditional dance shows and misty mountains make every visit memorable.",
    },
    {
      name: "Ella",
      image: "https://woinupcbvkriufpyhwtm.supabase.co/storage/v1/object/public/images/Ella.png",
      short: "Hill Country Beauty",
      story: "Ella is a paradise in the hill country. Tea plantations, waterfalls, and cool weather attract travelers worldwide. From Nine Arch Bridge to Little Adam's Peak, every corner feels like a postcard.",
    },
  ];

  return (
    <section className="home-section-spacing px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 font-semibold text-orange-700">{t("label")}</p>
            <h2 className="font-playfair text-4xl leading-tight text-slate-900 sm:text-5xl">{t("heading")}</h2>
          </div>
          <Link href="/destinations" className="home-section-link shrink-0 self-start">
            {tPage("moreDestinations")} <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {destinations.map((d, i) => (
            <div key={i} className={`group relative min-h-80 overflow-hidden rounded-2xl bg-slate-900 ${i === 0 ? "md:row-span-2 md:min-h-160" : ""}`}>
              <Image
                src={d.image}
                alt={d.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-110 transition duration-700"
                unoptimized
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 p-8 text-white">
                <h3 className="text-3xl font-bold">{d.name}</h3>
                <p className="text-white/80">{d.short}</p>
                <button
                  onClick={() => setSelected(d)}
                  className="mt-4 px-5 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full hover:bg-white hover:text-black transition"
                >
                  {t("explore")} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <div
            role="dialog" aria-modal="true" aria-label={selected.name}
            className="bg-white max-w-2xl max-h-[90svh] overflow-y-auto mx-4 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-72">
              <Image src={selected.image} alt={selected.name} fill className="object-cover" unoptimized />
            </div>
            <div className="p-8">
              <h3 className="text-3xl font-bold mb-4">{selected.name}</h3>
              <p className="text-gray-600 leading-relaxed">{selected.story}</p>
              <button
                onClick={() => setSelected(null)}
                className="mt-6 px-6 py-2 bg-black text-white rounded-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
