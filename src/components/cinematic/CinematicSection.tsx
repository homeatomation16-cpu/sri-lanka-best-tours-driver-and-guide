"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerRevealSection } from "@/components/home/reveal";

const AMP = { desktop: 1, tablet: 0.6, mobile: 0.35 };

function pair(value: string | undefined, amplitude: number) {
  if (!value) return null;
  return value.split(",").map((part) => {
    const match = part.trim().match(/^(-?[\d.]+)(.*)$/);
    return match ? `${parseFloat(match[1]) * amplitude}${match[2]}` : part.trim();
  });
}

// ScrollTrigger.refresh() re-measures EVERY trigger on the page (and re-reads
// computed styles for each invalidateOnRefresh tween), so all sections share a
// single debounced refresh instead of each requesting its own while the page
// streams in, images load and fonts swap.
let refreshTimer: ReturnType<typeof setTimeout> | undefined;
function scheduleRefresh() {
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => {
    refreshTimer = undefined;
    ScrollTrigger.refresh();
  }, 150);
}

type VarRanges = Record<string, [from: number, to: number, unit: string]>;

/**
 * Tweens CSS custom properties through a plain object and writes them with
 * setProperty. Tweening "--name" on the element directly makes GSAP read it
 * back with getComputedStyle every time the tween starts or is invalidated on
 * refresh, which forces a full-page style recalculation per tween.
 * Returns a cleanup that removes the properties again (as mm.revert() would).
 */
function varTween(
  el: HTMLElement,
  ranges: VarRanges,
  add: (target: Record<string, number>, from: gsap.TweenVars, to: gsap.TweenVars) => unknown,
  vars: gsap.TweenVars,
) {
  const names = Object.keys(ranges);
  const state: Record<string, number> = {};
  const from: Record<string, number> = {};
  const to: Record<string, number> = {};
  names.forEach((name) => {
    state[name] = from[name] = ranges[name][0];
    to[name] = ranges[name][1];
  });
  const apply = () => names.forEach((name) => el.style.setProperty(name, `${state[name]}${ranges[name][2]}`));
  apply();
  add(state, from, { ...to, ...vars, onUpdate: apply });
  return () => names.forEach((name) => el.style.removeProperty(name));
}

/**
 * This boundary sits INSIDE each resolved Suspense section. Its effect runs
 * after that section commits, without inspecting other streaming boundaries.
 * Keep Suspense outside this component so its targets hydrate together.
 */
export default function CinematicSection({ children, ...props }: ComponentPropsWithoutRef<"section">) {
  const root = useRef<HTMLElement>(null);

  // Reveal-on-scroll: register only after this section has hydrated.
  useEffect(() => (root.current ? registerRevealSection(root.current) : undefined), []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    let disposed = false;
    const refresh = () => {
      if (!disposed) scheduleRefresh();
    };

    mm.add({
      desktop: "(min-width: 1025px) and (prefers-reduced-motion: no-preference)",
      tablet: "(min-width: 600px) and (max-width: 1024px) and (prefers-reduced-motion: no-preference)",
      mobile: "(max-width: 599px) and (prefers-reduced-motion: no-preference)",
    }, (context) => {
      const cond = context.conditions as Record<keyof typeof AMP, boolean>;
      const amp = cond.desktop ? AMP.desktop : cond.tablet ? AMP.tablet : AMP.mobile;
      const clearVars: (() => void)[] = [];

      const isScene = el.matches("[data-scene]");
      const stickyScene = el.matches(".cine-scene") && !cond.mobile;
      const camera = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: stickyScene ? "top 80px" : "top bottom",
          end: stickyScene ? "bottom bottom" : "bottom top",
          scrub: cond.mobile ? 0.25 : 0.55,
          invalidateOnRefresh: true,
        },
      });
      camera.set({}, {}, 1);

      if (isScene) {
        const scene = el;
        scene.querySelectorAll<HTMLElement>("[data-layer]").forEach((layer) => {
          const [s, e] = (layer.dataset.at || "0,1").split(",").map(Number);
          const from: gsap.TweenVars = {};
          const to: gsap.TweenVars = { duration: e - s, force3D: true };
          const y = pair(layer.dataset.y, amp), x = pair(layer.dataset.x, amp);
          const sc = layer.dataset.scale?.split(",").map(Number);
          const rx = pair(layer.dataset.rx, amp), op = layer.dataset.opacity?.split(",").map(Number);
          if (y) { from.y = y[0]; to.y = y[1]; }
          if (x) { from.x = x[0]; to.x = x[1]; }
          if (sc) { from.scale = 1 + (sc[0] - 1) * amp; to.scale = 1 + (sc[1] - 1) * amp; }
          if (rx) { from.rotateX = rx[0]; to.rotateX = rx[1]; }
          if (op) { from.opacity = op[0]; to.opacity = op[1]; }
          camera.fromTo(layer, from, to, s);
        });

        // Copy and foreground arrive on the same scene clock. Text remains
        // readable at both ends, including during abrupt scroll reversal.
        const copy = scene.querySelector<HTMLElement>("[data-copy]");
        if (copy) {
          camera.fromTo(copy.querySelectorAll("[data-cue='before']"),
            { y: 8 * amp }, { y: 0, duration: 0.25 }, 0);
          camera.fromTo(copy.querySelectorAll("[data-split]"),
            { y: 8 * amp }, { y: 0, duration: 0.35 }, 0);
          camera.fromTo(copy.querySelectorAll("[data-cue='after']"),
            { y: 10 * amp }, { y: 0, stagger: 0.02, duration: 0.25 }, 0.1);
        }
      } else {
        clearVars.push(varTween(el, { "--camera-y": [8 * amp, -8 * amp, "px"] },
          (target, from, to) => camera.fromTo(target, from, to, 0), { duration: 1 }));
      }

      // Entry animation for [data-rise3d] grids/text now lives in
      // components/home/ScrollEffects.tsx (IntersectionObserver reveal).

      // Layered float: after the entry rise, cards keep moving at their own
      // depth for the whole pass (alternating near/far), and text blocks
      // move gently the opposite way — so copy and cards read as separate layers.
      // Phones (<600px) skip the continuous card float: scrubbing --float-y on every card each
      // scroll frame forced a style recalculation of ~55 elements per frame. Entry reveals,
      // camera, parallax and photo drift still run on phones; tablet/desktop are unchanged.
      const FLOAT_DEPTHS = [1, 0.55, 1.35, 0.8];
      if (!cond.mobile) gsap.utils.toArray<HTMLElement>("[data-rise3d]", el).forEach((grid) => {
        const self = grid.dataset.rise3d === "self";
        const items = self ? [grid] : (Array.from(grid.children) as HTMLElement[]);
        items.forEach((item, i) => {
          const d = (self ? -0.5 : FLOAT_DEPTHS[i % FLOAT_DEPTHS.length]) * 30 * amp;
          clearVars.push(varTween(item, { "--float-y": [d, -d, "px"] }, (target, from, to) => gsap.fromTo(target, from, to), {
            ease: "none",
            scrollTrigger: {
              trigger: self ? item : grid,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          }));
        });
      });

      // Alternate card directions throughout scrolling, without hover transforms.
      if (!cond.mobile) el.querySelectorAll<HTMLElement>("[data-scroll-float]").forEach((card) => {
        const distance = Number(card.dataset.scrollFloat) * 36 * amp;
        gsap.fromTo(card, { y: distance }, {
          y: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: card.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.55,
            invalidateOnRefresh: true,
          },
        });
      });

      // Each stacked card moves at its own depth on the section's scroll clock.
      el.querySelectorAll<HTMLElement>("[data-card-depth]").forEach((card) => {
        const depth = Number(card.dataset.cardDepth) * amp;
        clearVars.push(varTween(card, {
          "--card-y": [50 * depth, -50 * depth, "px"],
          "--card-rx": [7 * depth, -5 * depth, "deg"],
          "--card-ry": [-4 * depth, 4 * depth, "deg"],
        }, (target, from, to) => camera.fromTo(target, from, to, 0), { duration: 1 }));
      });

      // Copy has its own gentler path, independent of the photo stack.
      el.querySelectorAll<HTMLElement>("[data-scroll-copy]").forEach((copy) => {
        camera.fromTo(copy, { y: -20 * amp }, {
          y: 20 * amp, duration: 1,
        }, 0);
      });

      // Photos inside cards drift slower than their frame: a window into depth.
      gsap.utils.toArray<HTMLElement>("[data-drift]", el).forEach((frame) => {
        const plane = frame.querySelector<HTMLElement>("[data-drift-layer]");
        if (!plane) return;
        const depth = Number(frame.dataset.driftSpeed ?? 1) * amp;
        clearVars.push(varTween(plane, { "--py": [-4 * depth, 4 * depth, "%"] },
          (target, from, to) => camera.fromTo(target, from, to, 0), { duration: 1 }));
      });

      // Backgrounds and photo planes share one clock, with different depths.
      el.querySelectorAll<HTMLElement>("[data-parallax]").forEach((layer) => {
        const speed = Number(layer.dataset.parallax || "0.06") * amp;
        clearVars.push(varTween(layer, { "--px": [-speed * 100, speed * 100, "%"] },
          (target, from, to) => camera.fromTo(target, from, to, 0), { duration: 1 }));
      });

      el.querySelectorAll<HTMLElement>("[data-split]").forEach((heading) => {
        if (heading.closest("[data-scene]")) return;
        gsap.from(heading.querySelectorAll(".cine-word > span"), {
          yPercent: 35, duration: 0.8, ease: "power2.out", stagger: 0.025,
          scrollTrigger: { trigger: heading, start: "top 90%", toggleActions: "play none none reverse" },
        });
      });
      refresh();
      return () => clearVars.forEach((clear) => clear());
    }, root);

    // A later streamed section or loaded image can change trigger positions.
    let height = el.offsetHeight;
    const observer = new ResizeObserver(() => {
      if (el.offsetHeight === height) return;
      height = el.offsetHeight;
      refresh();
    });
    observer.observe(el);
    document.fonts.ready.then(refresh).catch(() => {});
    refresh();

    return () => {
      disposed = true;
      observer.disconnect();
      // Reverts this section's inline styles, timelines and ScrollTriggers.
      mm.revert();
    };
    // Client hover/slideshow state preserves these DOM nodes. Data-driven grids
    // key the section by their item IDs so changed target sets get a fresh scope.
  }, []);

  return <section ref={root} {...props}>{children}</section>;
}
