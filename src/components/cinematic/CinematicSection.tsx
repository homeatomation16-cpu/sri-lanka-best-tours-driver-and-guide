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
    let refreshFrame = 0;
    const refresh = () => {
      if (disposed) return;
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    mm.add({
      desktop: "(min-width: 1025px) and (prefers-reduced-motion: no-preference)",
      tablet: "(min-width: 600px) and (max-width: 1024px) and (prefers-reduced-motion: no-preference)",
      mobile: "(max-width: 599px) and (prefers-reduced-motion: no-preference)",
    }, (context) => {
      const cond = context.conditions as Record<keyof typeof AMP, boolean>;
      const amp = cond.desktop ? AMP.desktop : cond.tablet ? AMP.tablet : AMP.mobile;

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
        camera.fromTo(el, { "--camera-y": `${8 * amp}px` }, {
          "--camera-y": `${-8 * amp}px`, duration: 1,
        }, 0);
      }

      // Entry animation for [data-rise3d] grids/text now lives in
      // components/home/ScrollEffects.tsx (IntersectionObserver reveal).

      // Layered float: after the entry rise, cards keep moving at their own
      // depth for the whole pass (alternating near/far), and text blocks
      // move gently the opposite way — so copy and cards read as separate layers.
      const FLOAT_DEPTHS = [1, 0.55, 1.35, 0.8];
      gsap.utils.toArray<HTMLElement>("[data-rise3d]", el).forEach((grid) => {
        const self = grid.dataset.rise3d === "self";
        const items = self ? [grid] : (Array.from(grid.children) as HTMLElement[]);
        items.forEach((item, i) => {
          const d = (self ? -0.5 : FLOAT_DEPTHS[i % FLOAT_DEPTHS.length]) * 30 * amp;
          gsap.fromTo(item, { "--float-y": `${d}px` }, {
            "--float-y": `${-d}px`,
            ease: "none",
            scrollTrigger: {
              trigger: self ? item : grid,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });
        });
      });

      // Alternate card directions throughout scrolling, without hover transforms.
      el.querySelectorAll<HTMLElement>("[data-scroll-float]").forEach((card) => {
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
        camera.fromTo(card, {
          "--card-y": `${50 * depth}px`,
          "--card-rx": `${7 * depth}deg`,
          "--card-ry": `${-4 * depth}deg`,
        }, {
          "--card-y": `${-50 * depth}px`,
          "--card-rx": `${-5 * depth}deg`,
          "--card-ry": `${4 * depth}deg`,
          duration: 1,
        }, 0);
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
        camera.fromTo(plane, { "--py": `${-4 * depth}%` }, {
          "--py": `${4 * depth}%`, duration: 1,
        }, 0);
      });

      // Backgrounds and photo planes share one clock, with different depths.
      el.querySelectorAll<HTMLElement>("[data-parallax]").forEach((layer) => {
        const speed = Number(layer.dataset.parallax || "0.06") * amp;
        camera.fromTo(layer, { "--px": `${-speed * 100}%` }, {
          "--px": `${speed * 100}%`, duration: 1,
        }, 0);
      });

      el.querySelectorAll<HTMLElement>("[data-split]").forEach((heading) => {
        if (heading.closest("[data-scene]")) return;
        gsap.from(heading.querySelectorAll(".cine-word > span"), {
          yPercent: 35, duration: 0.8, ease: "power2.out", stagger: 0.025,
          scrollTrigger: { trigger: heading, start: "top 90%", toggleActions: "play none none reverse" },
        });
      });
      refresh();
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
      cancelAnimationFrame(refreshFrame);
      // Reverts this section's inline styles, timelines and ScrollTriggers.
      mm.revert();
    };
    // Client hover/slideshow state preserves these DOM nodes. Data-driven grids
    // key the section by their item IDs so changed target sets get a fresh scope.
  }, []);

  return <section ref={root} {...props}>{children}</section>;
}
