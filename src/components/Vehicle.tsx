// src/components/Vehicle.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Users, Fuel, Settings, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { vehicles } from "@/data/vehicles/en"; // හෝ getLocaleWithFallback භාවිතා කර locale අනුව ලබා ගන්න

const languageDrivers = [
  "English Speaking",
  "French Speaking",
  "German Speaking",
  "Hindi Speaking",
  "Spanish Speaking",
  "Italian Speaking",
];

export default function VehiclesSection( { locale }: { locale: string } ) {
  const t = useTranslations("vehicles");
  const featured = vehicles.slice(0, 6);
  const [currentLang, setCurrentLang] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLang((prev) => (prev === languageDrivers.length - 1 ? 0 : prev + 1));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-linear-to-b from-white to-orange-50 relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-amber-900 font-thea text-2xl sm:text-3xl py-2">{t("whatsNew")}</h2>
          <h3 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-5xl py-4">{t("heading")}</h3>
          <p className="max-w-3xl font-semibold text-base sm:text-lg lg:text-xl mx-auto text-gray-600 leading-relaxed mt-6">
            {t("desc")}
            <span
              translate="no"
              className="text-orange-500 font-semibold mx-2 inline-block min-w-40 transition-all duration-500"
            >
              {languageDrivers[currentLang]}
            </span>
          </p>
          <div className="mt-6 h-1 w-24 bg-orange-500 mx-auto rounded-full" />
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {featured.map((v) => (
            <Link
              key={v.id}
              href={`/vehicles/${v.id}`}
              className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-52 sm:h-60 lg:h-64 w-full overflow-hidden">
                <Image
                  src={v.image || "/placeholder.jpg"}
                  alt={v.name || "Vehicle"}
                  fill
                  sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition duration-700"
                />
                {v.price && (
                  <div className="absolute top-4 left-4 bg-orange-500 text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md">
                    {v.price}/day
                  </div>
                )}
                <div className="absolute bottom-4 left-4 bg-white/90 text-orange-600 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  {v.type || "Vehicle"}
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <h4 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-orange-600 transition">
                  {v.name}
                </h4>
                <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                  {v.passengers && (
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-orange-500" />
                      {v.passengers} pax
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Settings className="w-4 h-4 text-orange-500" />
                    {v.transmission || t("auto")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Fuel className="w-4 h-4 text-orange-500" />
                    {v.fuel || t("petrol")}
                  </span>
                </div>
                <div className="mt-6">
                  <span className="inline-block bg-orange-100 text-orange-600 text-sm px-4 py-2 rounded-full font-medium group-hover:bg-orange-500 group-hover:text-white transition">
                    {t("viewDetails")}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14 lg:mt-16">
          <Link
            href="/vehicles"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-orange-500 text-white font-semibold rounded-full shadow-lg hover:bg-orange-600 transition"
          >
            {t("viewAll")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
