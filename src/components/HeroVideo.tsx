// src/components/HeroVideo.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import Link from "next/link";
import { useTranslations } from "next-intl";

const SLIDE_DURATION = 8000;

const SLIDES = [
  { src: "/hero/mirissa.mp4", title: "Mirissa Beach", subtitle: "Golden sunsets & whale watching paradise" },
  { src: "/hero/sigiriya.mp4", title: "Sigiriya Rock Fortress", subtitle: "Ancient wonder of Sri Lanka" },
  { src: "/hero/ella.mp4", title: "Ella Scenic Train", subtitle: "World's most beautiful train ride" },
];

export default function HeroVideo() {
  const t = useTranslations("hero");
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [loading, setLoading] = useState(true);
  const [inView, setInView] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);

  const slide = SLIDES[current];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let start = performance.now();
    const animate = (t: number) => {
      const p = Math.min((t - start) / SLIDE_DURATION, 1);
      setProgress(p);
      if (p < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    timeoutRef.current = setTimeout(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
      setProgress(0);
      setLoading(true);
    }, SLIDE_DURATION);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current]);

  return (
    <section ref={sectionRef} style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <video
        key={current}
        autoPlay
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setLoading(false)}
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", transform: `scale(1.1) translateY(${scrollY * 0.15}px)`,
        }}
      >
        <source src={slide.src} type="video/mp4" />
      </video>

      {loading && inView && <Loader />}

      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.3), rgba(0,0,0,0.7))" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle, transparent 45%, rgba(0,0,0,0.65))" }} />

      <div style={{
        position: "relative", zIndex: 10, height: "100%", display: "flex",
        flexDirection: "column", justifyContent: "center",
        padding: "clamp(24px,6vw,80px)", color: "#fff", maxWidth: "900px",
      }}>
        <h1 style={{ fontSize: "clamp(3.5rem,8vw,5.5rem)", fontWeight: 700, lineHeight: 1.05 }}>
          {slide.title}
        </h1>
        <p style={{ marginTop: 16, fontSize: "1.2rem", opacity: 0.85 }}>{slide.subtitle}</p>
        <Link href="/tours" style={{
          marginTop: 24, padding: "14px 26px", borderRadius: 999,
          background: "linear-gradient(135deg,#ea580c,#f59e0b)",
          color: "#fff", border: "none", display: "inline-block", width: "fit-content",
        }}>
          {t("cta")}
        </Link>
        <div style={{ marginTop: 40, width: 120, height: 4, background: "rgba(255,255,255,0.25)", borderRadius: 999 }}>
          <div style={{ width: `${progress * 100}%`, height: "100%", background: "linear-gradient(90deg,#ea580c,#fbbf24)" }} />
        </div>
      </div>
    </section>
  );
}
