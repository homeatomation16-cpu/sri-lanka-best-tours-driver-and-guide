"use client";

import { useState } from "react";
import Image from "next/image";

export default function VehicleSlider({ images = [] }) {
  const [i, setI] = useState(0);

  // 1. Filter valid images
  const validImages = images?.filter((img) => img && img.trim() !== "") || [];
  const safeImages = validImages.length > 0 ? validImages : ["/placeholder.jpg"];

  // Slider navigation
  const next = () => setI((prev) => (prev + 1) % safeImages.length);
  const prev = () => setI((prev) => (prev - 1 + safeImages.length) % safeImages.length);

  return (
    <div className="relative">

      {/* MAIN IMAGE */}
      <div className="relative h-105 rounded-xl overflow-hidden bg-gray-100">
        <Image
          src={safeImages[i]}
          alt="vehicle display"
          fill
          priority
          // 🌟 Warning Fix: Main image එක desktop එකේදී grid එකෙන් 66% ක් ගන්නා නිසා
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
          className="object-cover transition-opacity duration-500"
        />
      </div>

      {/* ARROWS */}
      {safeImages.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-2 rounded shadow hover:bg-white transition z-10"
          >
            ◀
          </button>

          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-2 rounded shadow hover:bg-white transition z-10"
          >
            ▶
          </button>
        </>
      )}

      {/* THUMBNAILS */}
      {safeImages.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto pb-2 custom-scrollbar">
          {safeImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Go to image ${idx + 1}`}
              className={`
                relative shrink-0 w-24 h-20 cursor-pointer rounded overflow-hidden border-2 transition-all
                ${i === idx ? "border-orange-500 ring-2 ring-orange-500/20 scale-95" : "border-transparent opacity-70 hover:opacity-100"}
              `}
            >
              <Image
                src={img}
                alt={`thumbnail ${idx}`}
                fill
                // 🌟 Warning Fix: Thumbnails කුඩා නිසා:
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

    </div>
  );
}