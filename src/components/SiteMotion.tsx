"use client";

import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";

function subscribeReducedMotion(notify: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
}

const getReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function SiteMotion({ children }: { children: ReactNode }) {
  // Match the server on the first hydration pass, then apply the real preference.
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);
  const { scrollYProgress } = useScroll();
  const pointer = useMotionValue(0);
  const smoothPointer = useSpring(pointer, { stiffness: 65, damping: 24 });
  const backgroundX = useTransform(smoothPointer, [-1, 1], ["-18px", "18px"]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-45px", "45px"]);

  useEffect(() => {
    if (reducedMotion) return;
    const preference = window.matchMedia("(hover: hover) and (pointer: fine)");
    const move = (event: PointerEvent) => {
      if (preference.matches && event.pointerType === "mouse") {
        pointer.set((event.clientX / window.innerWidth - 0.5) * 2);
      }
    };
    const reset = () => pointer.set(0);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", reset);
    document.documentElement.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", reset);
      document.documentElement.removeEventListener("pointerleave", reset);
      reset();
    };
  }, [pointer, reducedMotion]);

  return (
    <div className="site-world">
      <div className="world-backdrop" aria-hidden="true">
        <motion.div className="world-landscape" style={{ x: reducedMotion ? 0 : backgroundX, y: reducedMotion ? 0 : backgroundY }}>
          <Image src="/images/editorial/highlands.webp" alt="" fill quality={75} sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="world-atmosphere" />
      </div>
      {children}
    </div>
  );
}
