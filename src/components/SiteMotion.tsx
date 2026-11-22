"use client";

import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform, useVelocity, type MotionStyle } from "framer-motion";

function subscribeReducedMotion(notify: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
}

const getReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function SiteMotion({ children }: { children: ReactNode }) {
  // Match the server on the first hydration pass, then apply the real preference.
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);
  const { scrollY, scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const velocity = useSpring(scrollVelocity, { stiffness: 90, damping: 30 });
  const pointer = useMotionValue(0);
  const smoothPointer = useSpring(pointer, { stiffness: 65, damping: 24 });
  const drift = useTransform(velocity, [-2000, 2000], ["8px", "-8px"]);
  const pitch = useTransform(velocity, [-2000, 2000], ["1.8deg", "-1.8deg"]);
  const yaw = useTransform(smoothPointer, [-1, 1], ["-1.4deg", "1.4deg"]);
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

  const style = {
    "--world-drift": reducedMotion ? "0px" : drift,
    "--world-pitch": reducedMotion ? "0deg" : pitch,
    "--world-yaw": reducedMotion ? "0deg" : yaw,
  } as MotionStyle;

  return (
    <motion.div className="site-world" style={style}>
      <div className="world-backdrop" aria-hidden="true">
        <motion.div className="world-landscape" style={{ x: reducedMotion ? 0 : backgroundX, y: reducedMotion ? 0 : backgroundY }}>
          <Image src="/images/editorial/highlands.webp" alt="" fill quality={60} sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="world-atmosphere" />
      </div>
      {children}
    </motion.div>
  );
}
