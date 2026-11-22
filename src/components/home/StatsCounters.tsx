"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import CinematicSection from "@/components/cinematic/CinematicSection";
import DecoShapes from "@/components/home/DecoShapes";
import { HOME_STATS } from "@/data/homeStats";

/**
 * STATS — number counters that count up when the section becomes visible
 * (IntersectionObserver), and reset when it leaves through the bottom so they
 * count again next time. The numbers come from src/data/homeStats.ts.
 */
const DURATION = 1800; // ms for a full count

export default function StatsCounters() {
  const t = useTranslations("home.stats");
  const tStats = useTranslations("stats"); // same labels as the About page
  const isDev = process.env.NODE_ENV !== "production";
  const stats = HOME_STATS.filter((s) => s.value !== null || isDev);
  if (stats.length === 0) return null;

  return (
    <CinematicSection className="stats-section home-section-spacing relative isolate overflow-hidden">
      <DecoShapes tone="light" />
      <div className="mx-auto max-w-7xl px-6">
        <div data-rise3d="self" className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-3 font-semibold text-orange-700">{t("label")}</p>
          <h2 className="font-playfair text-4xl leading-tight text-slate-900 sm:text-5xl">{t("heading")}</h2>
        </div>
        <div className="stats-grid" data-rise3d>
          {stats.map((s) => (
            <div key={s.key} className="stat-card lift-card">
              <p className="stat-number font-playfair">
                {s.value === null ? "—" : typeof s.value === "number" ? <CountUp to={s.value} /> : s.value}
                {typeof s.value === "number" && <span className="stat-suffix">{s.suffix}</span>}
              </p>
              <p className="stat-label">{tStats(s.key)}</p>
            </div>
          ))}
        </div>
        {isDev && HOME_STATS.some((s) => s.value === null) && (
          <p className="mt-6 text-center text-xs text-slate-400">
            Dev note: add the real figures in src/data/homeStats.ts — empty counters are hidden on the live site.
          </p>
        )}
      </div>
    </CinematicSection>
  );
}

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frame = 0;
    const run = () => {
      if (reduced) { setValue(to); return; } // no counting animation, just the number
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / DURATION);
        const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
        setValue(Math.round(to * eased));
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) run();
      else if (entry.boundingClientRect.top > 0) { cancelAnimationFrame(frame); setValue(0); } // scrolled back up
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(frame); };
  }, [to]);

  return <span ref={ref}>{value.toLocaleString()}</span>;
}
