"use client";
import { useState } from "react";
import Image from "next/image";

export default function VehicleGallery({ images }) {
  const [active, setActive] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div>
      {/* Main Large Image */}
      <div className="relative h-96 rounded-xl overflow-hidden bg-gray-100">
        <Image
          src={images[active]}
          alt="Selected vehicle image"
          fill
          // 🌟 Main Image එක Desktop වලදී grid එකෙන් 2/3ක් විතර ගන්න නිසා:
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
          className="object-cover transition-opacity duration-500"
          priority // පළමු පින්තූරය ඉක්මනින් පෙන්වීමට
        />
      </div>

      {/* Thumbnails List */}
      <div className="flex gap-3 mt-4 overflow-x-auto pb-2 custom-scrollbar">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            // Accessibility සඳහා button එකක් පාවිච්චි කිරීම වඩාත් සුදුසුයි
            className={`relative shrink-0 w-24 h-20 cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
              active === i ? "border-orange-500 scale-95" : "border-transparent opacity-70 hover:opacity-100"
            }`}
            aria-label={`View image ${i + 1}`}
          >
            <Image 
              src={img} 
              alt={`Vehicle thumbnail ${i + 1}`} 
              fill 
              // 🌟 Thumbnail එක ගොඩක් කුඩා නිසා කුඩා සයිස් එකක් ලබා දීම:
              sizes="96px" 
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}