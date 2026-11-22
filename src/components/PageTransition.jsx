"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        // Keep server-rendered content visible; animate subsequent navigation only.
        initial={reducedMotion ? false : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
        transition={{
          duration: reducedMotion ? 0 : 0.6,
          ease: [0.22, 1, 0.36, 1], // Apple-like easing
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
