import type { ComponentPropsWithoutRef } from "react";

type Props = Omit<ComponentPropsWithoutRef<"h2">, "children"> & { children: string };

// Identical, visible, accessible word markup on the server and first client render.
// GSAP only animates these spans after the containing section has hydrated.
export default function CinematicHeading({ children, ...props }: Props) {
  return (
    <h2 {...props} data-split>
      {children.split(/(\s+)/).map((word, index) => word.trim() ? (
        <span key={index} className="cine-word"><span>{word}</span></span>
      ) : word)}
    </h2>
  );
}
