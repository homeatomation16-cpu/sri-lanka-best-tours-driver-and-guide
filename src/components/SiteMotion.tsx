"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";

/**
 * Site-wide landscape backdrop.
 *  - Vertical drift (-45px → 45px over the page) is a CSS scroll-driven animation (.world-landscape in
 *    globals.css): it runs off the main thread, with no scroll listener or per-frame JavaScript.
 *  - Desktop mouse drift (±18px): a short requestAnimationFrame ease that only runs while the backdrop is
 *    catching up with the pointer, then stops. Touch devices never start it.
 */
export default function SiteMotion({ children }: { children: ReactNode }) {
  const landscape = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = landscape.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let target = 0;
    let x = 0;
    let frame = 0;

    const step = () => {
      x += (target - x) * 0.08;
      if (Math.abs(target - x) < 0.05) x = target;
      el.style.translate = `${x.toFixed(2)}px 0`;
      frame = x === target ? 0 : requestAnimationFrame(step);
    };
    const moveTo = (value: number) => {
      target = value;
      if (!frame) frame = requestAnimationFrame(step);
    };
    const move = (event: PointerEvent) => {
      if (document.hidden || reduced.matches || !finePointer.matches || event.pointerType !== "mouse") return;
      moveTo((event.clientX / window.innerWidth - 0.5) * 36);
    };
    const reset = () => moveTo(0);
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      target = x = 0;
      el.style.translate = "0px 0";
    };
    const onVisibility = () => { if (document.hidden) stop(); };
    const onPreference = () => { if (reduced.matches || !finePointer.matches) stop(); };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", reset);
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", onPreference);
    finePointer.addEventListener("change", onPreference);
    document.documentElement.addEventListener("pointerleave", reset);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", reset);
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", onPreference);
      finePointer.removeEventListener("change", onPreference);
      document.documentElement.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <div className="site-world">
      <div className="world-backdrop" aria-hidden="true">
        <div ref={landscape} className="world-landscape">
          <Image src="/images/editorial/highlands.webp" alt="" fill quality={75} sizes="100vw" className="object-cover" />
        </div>
        <div className="world-atmosphere" />
      </div>
      {children}
    </div>
  );
}
