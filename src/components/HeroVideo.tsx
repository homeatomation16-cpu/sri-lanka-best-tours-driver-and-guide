// src/components/HeroVideo.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const SLIDE_DURATION = 8000;

const SLIDES = [
  { 
    src: "/hero/mirissa.", 
    poster: "/hero/mirissa-poster.webp", 
    title: "Mirissa Beach", 
    subtitle: "Golden sunsets & whale watching paradise" 
  },
  { 
    src: "/hero/sigiriya.mp4", 
    poster: "/hero/sigiriya-poster.webp", 
    title: "Sigiriya Rock Fortress", 
    subtitle: "Ancient wonder of Sri Lanka" 
  },
  { 
    src: "/hero/ella.mp4", 
    poster: "/hero/ella-poster.webp", 
    title: "Ella Scenic Train", 
    subtitle: "World's most beautiful train ride" 
  },
];

export default function HeroVideo() {
  const t = useTranslations("hero");
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [inView, setInView] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);

  // Intersection Observer to stop video when not visible (saves CPU)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (videoRef.current) {
          entry.isIntersecting ? videoRef.current.play() : videoRef.current.pause();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Optimized Scroll Listener (only runs if in view)
  useEffect(() => {
    if (!inView) return;
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true }); // Passive for performance
    return () => window.removeEventListener("scroll", onScroll);
  }, [inView]);

  // Slide & Progress Logic
  useEffect(() => {
    if (!inView) return; // Don't cycle slides if user isn't looking

    let start = performance.now();
    const animate = (time: number) => {
      const p = Math.min((time - start) / SLIDE_DURATION, 1);
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCurrent((c) => (c + 1) % SLIDES.length);
        setProgress(0);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [current, inView]);

  const slide = SLIDES[current];

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-black">
      <video
        ref={videoRef}
        key={slide.src}
        autoPlay
        muted
        playsInline
        loop={false}
        poster={slide.poster} // Critical for LCP
        preload="metadata" // Don't force download the whole thing at once
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          // Use transform3d for hardware acceleration
          transform: `scale(1.1) translate3d(0, ${scrollY * 0.15}px, 0)`,
          willChange: "transform", // Hints browser to optimize
        }}
      >
        <source src={slide.src} type="video/mp4" />
      </video>

      {/* Overlay & Content */}
      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/70" />
      
      <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-20 text-white max-w-4xl">
        <h1 className="text-5xl md:text-8xl font-bold leading-tight">
          {slide.title}
        </h1>
        <p className="mt-4 text-lg md:text-xl opacity-90">{slide.subtitle}</p>
        
        <Link 
            href="/tours" 
            aria-label={t("cta")} // Accessibility fix
            className="mt-8 px-8 py-4 rounded-full bg-linear-to-r from-orange-600 to-amber-500 font-bold transition-transform hover:scale-105 inline-block w-fit"
        >
          {t("cta")}
        </Link>

        {/* Progress Bar */}
        <div className="mt-10 w-32 h-1 bg-white/20 rounded-full">
          <div 
            className="h-full bg-linear-to-r from-orange-500 to-yellow-400 transition-all duration-100 ease-linear"
            style={{ width: `${progress * 100}%` }} 
          />
        </div>
      </div>
    </section>
  );
}