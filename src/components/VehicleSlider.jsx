"use client";

import { useState } from "react";
import Image from "next/image";

export default function VehicleSlider({ images = [] }) {
  // ✅ Hook ALWAYS top-level
  const [i, setI] = useState(0);

  // ✅ 1. මුලින්ම images array එක ඇතුලේ තියෙන empty strings හෝ null දේවල් ඉවත් කරනවා (Filter)
  const validImages = images?.filter((img) => img && img.trim() !== "") || [];

  // ✅ 2. වලංගු පින්තූර නැතිනම් පමණක් placeholder එක පාවිච්චි කරනවා
  const safeImages = validImages.length > 0 ? validImages : ["/placeholder.jpg"];

  // ✅ Next/Prev logic - දැන් safeImages.length එක නිවැරදියි
  const next = () =>
    setI((prev) => (prev + 1) % safeImages.length);

  const prev = () =>
    setI((prev) => (prev - 1 + safeImages.length) % safeImages.length);

  return (
    <div className="relative">

      {/* MAIN IMAGE */}
      <div className="relative h-105 rounded-xl overflow-hidden bg-gray-100">
        <Image
          src={safeImages[i]}
          alt="vehicle"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* ARROWS */}
      {safeImages.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-2 rounded shadow hover:bg-white transition"
          >
            ◀
          </button>

          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-2 rounded shadow hover:bg-white transition"
          >
            ▶
          </button>
        </>
      )}

      {/* THUMBNAILS */}
      {safeImages.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
          {safeImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setI(idx)}
              className={`
                relative shrink-0 w-24 h-20 cursor-pointer rounded overflow-hidden border-2
                ${i === idx ? "border-orange-500 ring-2 ring-orange-500/20" : "border-transparent"}
              `}
            >
              <Image
                src={img}
                alt={`thumb-${idx}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

    </div>
  );
}