import type { ReactNode } from "react";
import ScrollEffects from "@/components/home/ScrollEffects";

// The page shell never mutates descendants across streaming boundaries.
// ScrollEffects adds the reveal animations, parallax shapes, progress bar
// and back-to-top button for everything below the hero.
export default function CinematicScroll({ children }: { children: ReactNode }) {
  return (
    <div className="cinematic-root">
      {children}
      <ScrollEffects />
    </div>
  );
}
