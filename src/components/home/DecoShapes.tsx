/**
 * Soft decorative background shapes for a section. Each shape has its own
 * depth, so ScrollEffects moves them at different speeds (parallax) while the
 * page scrolls up and down. Purely decorative: hidden from screen readers,
 * never clickable. Place as the first child of a `relative isolate` section.
 *
 *   tone: "light" for cream/white sections, "dark" for dark sections.
 */
export default function DecoShapes({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <div className={`deco-shapes deco-${tone}`} aria-hidden="true">
      <span className="deco-blob deco-a" data-depth="0.12" />
      <span className="deco-ring deco-b" data-depth="0.28" />
      <span className="deco-blob deco-c" data-depth="0.2" />
      <span className="deco-dot deco-d" data-depth="0.4" />
    </div>
  );
}
