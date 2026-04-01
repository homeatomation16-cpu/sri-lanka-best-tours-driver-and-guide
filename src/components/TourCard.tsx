// src/components/TourCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function TourCard({ tour }: { tour: any }) {
  const t = useTranslations("tours");

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <div className="relative h-60">
        <Image src={tour.image} alt={tour.title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
        <p className="text-gray-500 mb-4">{tour.duration} {t("days")}</p>
        <p className="font-bold text-orange-600 mb-4">{t("from")} ${tour.price}</p>
        <Link href={`/tours/${tour.id}`} className="inline-block px-6 py-2 bg-orange-600 text-white rounded-full">
          {t("viewDetails")}
        </Link>
      </div>
    </div>
  );
}