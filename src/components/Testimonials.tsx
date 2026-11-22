"use client";

import CinematicSection from "@/components/cinematic/CinematicSection";
// src/components/Testimonials.tsx

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import DecoShapes from "@/components/home/DecoShapes";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const ts = useTranslations("home.slider");
  const sliderRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const reviews = [
    { name: "Vairavelu R", text: "Perfectly organized tour. Smooth experience and very professional team.", img: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Bhairavi V", text: "Amazing driver and great communication. Highly recommended!", img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Melania M", text: "Fantastic service and unforgettable memories in Sri Lanka.", img: "https://randomuser.me/api/portraits/women/68.jpg" },
    { name: "Daniel K", text: "Luxury level comfort and very caring staff.", img: "https://randomuser.me/api/portraits/men/75.jpg" },
  ];

  /** Scroll the slider so review `i` is the first visible card. */
  const goTo = useCallback((i: number) => {
    const el = sliderRef.current;
    const card = el?.children[(i + reviews.length) % reviews.length] as HTMLElement | undefined;
    if (!el || !card) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: card.offsetLeft, behavior: reduced ? "auto" : "smooth" });
  }, [reviews.length]);

  // Track which card is in front (for the dots).
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    const onScroll = () => {
      const cards = Array.from(el.children) as HTMLElement[];
      const left = el.scrollLeft;
      let best = 0;
      cards.forEach((c, i) => { if (Math.abs(c.offsetLeft - left) < Math.abs(cards[best].offsetLeft - left)) best = i; });
      setActive(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Autoplay every 5 s; pauses while hovered or focused, off for reduced motion.
  useEffect(() => {
    const el = sliderRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (el.matches(":hover, :focus-within") || document.hidden) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
      goTo(atEnd ? 0 : active + 1);
    }, 5000);
    return () => clearInterval(id);
  }, [active, goTo]);

  return (
    <CinematicSection className="testimonials-section home-section-spacing relative isolate overflow-hidden bg-[#edf4ef]">
      <DecoShapes tone="light" />
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div data-rise3d="self" className="text-center mb-8">
          <p className="text-orange-500 tracking-widest mb-4 uppercase text-sm font-semibold">{t("label")}</p>
          <h2 className="font-playfair text-4xl lg:text-5xl">{t("heading")}</h2>
        </div>

        {/* Trust Bar */}
        <div data-rise3d="self" className="bg-transparent border-y border-emerald-900/15 py-8 flex flex-col lg:flex-row justify-between items-center gap-8 mb-10">
          <TrustBlock label="Google Reviews" score="4.9" total="1,200+" />
          <TrustBlock label="TripAdvisor" score="5.0" total="800+" />
          <TrustBlock label="Happy Travelers" score="98%" total="Satisfaction" />
        </div>

        {/* Slider: scroll-snap track + arrows + dots */}
        {/* dir="ltr": the reviews are in English and scroll maths stays simple in RTL locales */}
        <div className="review-slider" data-reveal="up" dir="ltr">
          <div ref={sliderRef} className="review-track scrollbar-hide" tabIndex={0} role="region" aria-roledescription="carousel" aria-label={t("heading")}>
            {reviews.map((r, i) => (
              <div key={i} className="review-card lift-card" role="group" aria-roledescription="slide" aria-label={`${i + 1} / ${reviews.length}`}>
                <Stars />
                <p className="my-6 text-gray-700 leading-relaxed">&quot;{r.text}&quot;</p>
                <div className="flex items-center gap-4 mt-6">
                  <Image src={r.img} alt={r.name} width={50} height={50} className="rounded-full" />
                  <div>
                    <p className="font-semibold">{r.name}</p>
                    <p className="text-sm text-green-600">✔ Verified Traveler</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="review-controls">
            <button type="button" className="review-arrow" onClick={() => goTo(active - 1)} aria-label={ts("prev")}><ChevronLeft size={20} /></button>
            <div className="review-dots">
              {reviews.map((_, i) => (
                <button key={i} type="button" className={`review-dot ${i === active ? "is-active" : ""}`} onClick={() => goTo(i)} aria-label={ts("goTo", { n: i + 1 })} aria-current={i === active ? "true" : undefined} />
              ))}
            </div>
            <button type="button" className="review-arrow" onClick={() => goTo(active + 1)} aria-label={ts("next")}><ChevronRight size={20} /></button>
          </div>
        </div>
      </div>
    </CinematicSection>
  );
}

function Stars() {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

function TrustBlock({ label, score, total }: { label: string; score: string; total: string }) {
  return (
    <div className="text-center">
      <p className="text-gray-500 mb-2">{label}</p>
      <Stars />
      <p className="text-3xl font-bold mt-2">{score}</p>
      <p className="text-gray-400 text-sm">{total}</p>
    </div>
  );
}
