"use client";

import CinematicSection from "@/components/cinematic/CinematicSection";
// src/components/SpecialOffer.tsx

import { Check, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function SpecialOffer() {
  const t = useTranslations("specialOffer");

  const included = ["Private A/C Luxury Vehicle", "Personal English-Speaking Chauffeur", "4★ & 5★ Hotels with Breakfast", "All Fuel, Tolls & Parking"];

  const bonuses = ["Free Tourist SIM Card", "Daily Premium Water Bottles", "Scenic Train Experience"];

  return (
    <CinematicSection className="offer-section py-12 sm:py-16 px-6 bg-[#fff3db]">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="text-center mb-6">
          <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-2">{t("label")}</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">{t("heading")}</h2>
        </div>

        <div data-rise3d="self" className="relative bg-white border border-amber-200/70 shadow-sm rounded-[28px] pt-12 sm:pt-20 pb-6 sm:pb-8 px-5 sm:px-6 lg:px-12 lg:pt-16 lg:pb-10 overflow-hidden">
          {/* Glow */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-orange-300/20 blur-[120px] rounded-full pointer-events-none" />

          {/* Badge */}
          <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2">
            <span className="bg-linear-to-r from-red-500 to-orange-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold shadow-xl text-xs sm:text-sm md:text-base whitespace-nowrap">
              🔥 Limited Offer — 30% OFF
            </span>
          </div>

          <div className="mt-2 sm:mt-6">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-2 sm:mb-3 text-gray-900 text-center lg:text-left">10-Day Luxury Sri Lanka Tour</h2>
            <p className="text-gray-600 mb-4 sm:mb-6 max-w-2xl text-sm sm:text-base leading-relaxed text-center lg:text-left">
              A handcrafted journey through Sri Lanka&apos;s most beautiful destinations with private chauffeur, premium hotels and unforgettable experiences.
            </p>

            <div className="grid lg:grid-cols-2 gap-4 sm:gap-8">
              {/* Included */}
              <div>
                <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-gray-900">Included</h3>
                {included.map((item, idx) => (
                  <div key={idx} className="flex gap-2.5 mb-1.5 sm:mb-2 items-center text-sm sm:text-base">
                    <Check className="text-green-500 w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              {/* Bonuses + Price */}
              <div>
                <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-gray-900">Complimentary Bonuses</h3>
                {bonuses.map((bonus, idx) => (
                  <div key={idx} className="flex gap-2.5 mb-1.5 sm:mb-2 items-center text-sm sm:text-base">
                    <Star className="text-amber-500 w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <span className="text-gray-700">{bonus}</span>
                  </div>
                ))}

                <div className="mt-4 sm:mt-6 text-center lg:text-left">
                  <p className="text-gray-500">Exclusive Price</p>
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-600">$700</p>
                  <p className="text-gray-500 text-sm sm:text-base mb-3 sm:mb-4">For 2 Travelers</p>
                  <Link
                    href="/contact"
                    className="inline-block bg-linear-to-r from-orange-500 to-amber-500 text-white px-7 py-2.5 sm:px-8 sm:py-3 rounded-full font-semibold shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
                  >
                    Reserve This Offer
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CinematicSection>
  );
}
