"use client";

/**
 * Site-wide scroll animation for text and cards: headings, paragraphs, buttons and cards slide in when they
 * reach the screen – up from below while scrolling down, down from above while scrolling up – and reset when
 * they leave, so it plays again each time. Elements inside the cinematic scenes (which animate themselves),
 * the navbar, the admin panel and anything marked data-no-reveal are left alone. Nothing is hidden until this
 * script runs, and it is off for visitors who prefer reduced motion.
 */
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const TARGETS = [
  "main h1", "main h2", "main h3", "main p", "main article", "main li", "main a.rounded-full", "main button.rounded-full",
  "main .rounded-2xl", "main .rounded-3xl", "main [data-anim]", "main figure",
  "footer h3", "footer li", "footer p",
].join(",");

const SKIP = "[data-no-reveal], .hero-section, .cine-scene, [data-rise3d], [data-reveal], nav, header[role=banner], .lightbox, [role=dialog], #account-panel, .admin-root";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.includes("/admin")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    root.classList.add("sr-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add("sr-in");
          } else {
            // Left the screen: get ready to come in again from the side it is now on
            el.classList.remove("sr-in");
            el.classList.toggle("sr-from-top", entry.boundingClientRect.top < 0);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    const seen = new WeakSet<Element>();
    // Streamed (Suspense) HTML lands in the DOM before React hydrates it; touching its class/style
    // then causes a hydration mismatch. React tags every node it owns with a __reactFiber$ key.
    const isHydrated = (el: Element) => Object.keys(el).some((k) => k.startsWith("__reactFiber$"));
    let retry: ReturnType<typeof setTimeout> | undefined;
    const scan = () => {
      const added: HTMLElement[] = [];
      let pending = false;
      document.querySelectorAll<HTMLElement>(TARGETS).forEach((el) => {
        if (seen.has(el) || el.closest(SKIP)) return;
        if (!isHydrated(el)) { pending = true; return; }
        // Only the outermost match animates (a card moves as one piece, not every line inside it)
        const parent = el.parentElement?.closest(TARGETS);
        if (parent && !parent.closest(SKIP) && seen.has(parent)) return;
        seen.add(el);
        added.push(el);
      });
      // Measure everything before changing any classes, so the browser lays out once instead of once per element.
      const onScreen = added.map((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      });
      added.forEach((el) => el.classList.add("sr-item"));
      added.forEach((el, i) => {
        // Items in the same row arrive one after another
        const siblings = el.parentElement ? Array.from(el.parentElement.children).filter((c) => c.classList.contains("sr-item")) : [];
        el.style.setProperty("--sr-delay", `${Math.min(siblings.indexOf(el), 5) * 70}ms`);
        if (onScreen[i]) el.classList.add("sr-in");
        observer.observe(el);
      });
      // Hydration itself does not mutate the DOM, so check again shortly for nodes that were skipped
      clearTimeout(retry);
      if (pending) retry = setTimeout(scan, 250);
    };

    scan();
    // Content that streams in later (Suspense sections) or opens on click
    const mutations = new MutationObserver(() => scan());
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(retry);
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  return null;
}
