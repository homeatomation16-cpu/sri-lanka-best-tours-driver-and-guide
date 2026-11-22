"use client";

/**
 * Homepage scroll effects (everything BELOW the hero).
 *
 *  1. Reveal  — IntersectionObserver. Elements fade in and slide up (or in
 *     from the left/right) when they enter the viewport while scrolling
 *     down, and slide back down when they leave through the bottom while
 *     scrolling up. Cards in the same grid are staggered (120 ms each) and
 *     their photos zoom 1.1 → 1.
 *  2. Parallax — one requestAnimationFrame loop moves decorative shapes
 *     ([data-depth]) at different speeds as the page scrolls.
 *  3. Scroll progress bar + "back to top" button.
 *
 * The hero (.hero-section) and the cinematic scenes ([data-scene]) are
 * skipped, so the hero looks and behaves exactly as before. With
 * prefers-reduced-motion everything is shown immediately and nothing moves.
 *
 * Which elements reveal is documented in ./reveal.ts.
 */

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { revealPassed, startReveal } from "./reveal";

export default function ScrollEffects() {
  const t = useTranslations("home");
  const barRef = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);

  /* ---------- 1. Reveal on scroll (IntersectionObserver) ---------- */
  // Each CinematicSection registers itself once hydrated (see ./reveal.ts),
  // so sections that stream in later are picked up automatically.
  useEffect(() => startReveal(), []);

  /* ---------- 2. Parallax layers + 3. progress bar / back-to-top ---------- */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const max = document.documentElement.scrollHeight - vh;
      const progress = max > 0 ? window.scrollY / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      setShowTop(window.scrollY > vh * 1.2);

      if (reduced) return;
      revealPassed();
      // Each [data-depth] layer moves by (distance from viewport centre × depth).
      document.querySelectorAll<HTMLElement>(".cinematic-root [data-depth]").forEach((layer) => {
        const box = (layer.parentElement ?? layer).getBoundingClientRect();
        if (box.bottom < -200 || box.top > vh + 200) return; // off-screen: skip work
        const offset = box.top + box.height / 2 - vh / 2;
        layer.style.setProperty("--deco-y", `${(-offset * Number(layer.dataset.depth)).toFixed(1)}px`);
      });
    };

    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const toTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <>
      <div className="scroll-progress" aria-hidden="true"><div ref={barRef} className="scroll-progress-bar" /></div>
      <button
        type="button"
        onClick={toTop}
        className={`back-to-top ${showTop ? "is-visible" : ""}`}
        aria-label={t("backToTop")}
        tabIndex={showTop ? 0 : -1}
      >
        <ArrowUp size={20} aria-hidden="true" />
      </button>
    </>
  );
}
