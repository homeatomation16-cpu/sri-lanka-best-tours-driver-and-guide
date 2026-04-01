// src/components/WhyUs.tsx
"use client";

import { useTranslations } from "next-intl";
import { Star, MapPin, Sliders, Car, BadgeCheck, Zap } from "lucide-react";

export default function WhyUs() {
  const t = useTranslations("whyUs");

  const features = [
    { title: t("features.agent.title"), description: t("features.agent.desc"), icon: Star },
    { title: t("features.places.title"), description: t("features.places.desc"), icon: MapPin },
    { title: t("features.tailor.title"), description: t("features.tailor.desc"), icon: Sliders },
    { title: t("features.transport.title"), description: t("features.transport.desc"), icon: Car },
    { title: t("features.price.title"), description: t("features.price.desc"), icon: BadgeCheck },
    { title: t("features.booking.title"), description: t("features.booking.desc"), icon: Zap },
  ];

  return (
    <section className="py-28 lg:py-36 px-6 bg-linear-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <p className="text-orange-600 text-xl mb-4 tracking-wide">{t("label")}</p>
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900">{t("heading")}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group rounded-[28px] p-10 bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg transition hover:-translate-y-3 hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)]"
              >
                <div className="w-16 h-16 mb-8 rounded-2xl bg-linear-to-br from-orange-500 to-amber-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
