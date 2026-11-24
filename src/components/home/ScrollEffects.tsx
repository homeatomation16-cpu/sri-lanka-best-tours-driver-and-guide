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
    let settle: ReturnType<typeof setTimeout> | undefined;
    let layersDirty = true;
    let topVisible = false;
    let geometryDirty = true;
    let maxScroll = 0;
    const geometry = new WeakMap<HTMLElement, { top: number; height: number }>();

    // Performance: only layers near the viewport are measured each frame (an IntersectionObserver keeps that
    // set, 200px margin as before), instead of querying and measuring every layer on the page per frame.
    const visible = new Set<HTMLElement>();
    const watched = new WeakSet<HTMLElement>();
    const hostLayers = new WeakMap<HTMLElement, { layer: HTMLElement; depth: number }[]>();
    const near = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const host = e.target as HTMLElement;
        if (e.isIntersecting) {
          visible.add(host);
          geometry.set(host, { top: e.boundingClientRect.top + window.scrollY, height: e.boundingClientRect.height });
        } else visible.delete(host);
      });
      onScroll();
    }, { rootMargin: "200px 0px" });
    const watchLayers = () => {
      if (reduced || !layersDirty) return;
      layersDirty = false;
      document.querySelectorAll<HTMLElement>(".cinematic-root [data-depth]").forEach((layer) => {
        const target = layer.parentElement ?? layer;
        hostLayers.set(target, Array.from(target.querySelectorAll<HTMLElement>(":scope > [data-depth]"),
          (child) => ({ layer: child, depth: Number(child.dataset.depth) })));
        if (watched.has(target)) return;
        watched.add(target);
        near.observe(target);
      });
    };

    const update = () => {
      frame = 0;
      watchLayers();
      const vh = window.innerHeight;
      const scrollY = window.scrollY;
      if (geometryDirty) {
        maxScroll = document.documentElement.scrollHeight - vh;
        visible.forEach((host) => {
          const box = host.getBoundingClientRect();
          geometry.set(host, { top: box.top + scrollY, height: box.height });
        });
        geometryDirty = false;
      }
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      // Read all geometry first, then write (no interleaved layout).
      const layers: { layer: HTMLElement; depth: number; offset: number }[] = [];
      visible.forEach((host) => {
        if (!host.isConnected) { visible.delete(host); near.unobserve(host); return; }
        const box = geometry.get(host);
        if (!box) return;
        const offset = box.top - scrollY + box.height / 2 - vh / 2;
        hostLayers.get(host)?.forEach((layer) => layers.push({ ...layer, offset }));
      });
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      const nextTop = scrollY > vh * 1.2;
      if (nextTop !== topVisible) { topVisible = nextTop; setShowTop(nextTop); }
      // Each [data-depth] layer moves by (distance from viewport centre × depth).
      layers.forEach(({ layer, depth, offset }) => {
        layer.style.translate = `0 ${(-offset * depth).toFixed(1)}px`;
      });
    };

    // revealPassed() measures every reveal element; it only matters after a fast jump, so it runs once
    // scrolling settles instead of on every frame. Streamed-in layers are picked up at the same time.
    const onSettle = () => {
      if (!reduced) revealPassed();
    };
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
      clearTimeout(settle);
      settle = setTimeout(onSettle, 120);
    }
    const invalidateGeometry = () => { geometryDirty = true; onScroll(); };
    // Observe layout boxes, not animated style attributes. Transforms never
    // invalidate these stable document coordinates on ordinary scroll frames.
    const root = document.querySelector(".cinematic-root") ?? document.body;
    const observed = new WeakSet<Element>();
    const sizes = new ResizeObserver(invalidateGeometry);
    const observeSizes = () => {
      [document.body, ...root.querySelectorAll("section")].forEach((el) => {
        if (!observed.has(el)) { observed.add(el); sizes.observe(el); }
      });
    };
    observeSizes();
    onScroll();
    const mutations = new MutationObserver((records) => {
      const changed = records.some((record) => [...record.addedNodes, ...record.removedNodes].some((node) =>
        node instanceof HTMLElement && (node.matches("[data-depth]") || node.querySelector("[data-depth]"))));
      if (changed) layersDirty = true;
      observeSizes();
      invalidateGeometry();
    });
    mutations.observe(root, { childList: true, subtree: true });
    // Page transitions can translate an ancestor without resizing its layout box.
    // Track only those ancestors, never the cinematic descendants' per-frame styles.
    const ancestors = new MutationObserver(invalidateGeometry);
    for (let parent = root.parentElement; parent && parent !== document.body; parent = parent.parentElement) {
      ancestors.observe(parent, { attributes: true, attributeFilter: ["style", "class"] });
    }
    document.addEventListener("load", invalidateGeometry, true);
    document.fonts.addEventListener("loadingdone", invalidateGeometry);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", invalidateGeometry);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(settle);
      near.disconnect();
      mutations.disconnect();
      ancestors.disconnect();
      sizes.disconnect();
      document.removeEventListener("load", invalidateGeometry, true);
      document.fonts.removeEventListener("loadingdone", invalidateGeometry);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", invalidateGeometry);
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
