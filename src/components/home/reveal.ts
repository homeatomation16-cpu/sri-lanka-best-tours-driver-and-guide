/**
 * Reveal-on-scroll registry (used by ScrollEffects + CinematicSection).
 *
 * Each CinematicSection calls registerRevealSection() from its effect, i.e.
 * only AFTER React has hydrated that section. Adding classes earlier (while
 * streamed HTML is still waiting to hydrate) causes hydration mismatches.
 *
 * Which elements reveal:
 *   [data-reveal]                 → any element; value "up" | "left" | "right" | "zoom"
 *   [data-rise3d="self"]          → text blocks; alternate left / right
 *   [data-rise3d] > *             → cards in a grid; up, staggered
 */
const TARGETS = '[data-reveal], [data-rise3d="self"], [data-rise3d]:not([data-rise3d="self"]) > *';
const STAGGER_LIMIT = 6; // a long row never waits more than 6 × 120 ms

let io: IntersectionObserver | null = null;
const sections = new Set<HTMLElement>(); // every hydrated section on the page
let textSide = 0; // alternates text blocks between left and right

function prepare(el: HTMLElement) {
  if (!io) return;
  if (el.closest(".hero-section, [data-scene]")) return; // hero & scenes stay untouched
  // Already set up (e.g. the observer restarted): just observe it again.
  if (el.classList.contains("reveal")) { io.observe(el); return; }

  let dir = el.dataset.reveal || "up";
  if (!el.dataset.reveal && el.dataset.rise3d === "self") dir = textSide++ % 2 ? "right" : "left";

  const grid = el.parentElement?.matches("[data-rise3d]:not([data-rise3d='self'])") ? el.parentElement : null;
  const index = grid ? Array.prototype.indexOf.call(grid.children, el) % STAGGER_LIMIT : 0;

  el.style.setProperty("--reveal-i", String(index));
  el.dataset.revealDir = dir;
  el.classList.add("reveal");
  io.observe(el);
}

function scan(section: HTMLElement) {
  if (section.matches(".hero-section, [data-scene]")) return;
  section.querySelectorAll<HTMLElement>(TARGETS).forEach(prepare);
}

/** Called by each section once it has hydrated. */
export function registerRevealSection(section: HTMLElement) {
  sections.add(section);
  scan(section); // no-op until the observer has started
  return () => { sections.delete(section); };
}

/**
 * A fast jump (anchor link, Home/End key) can move an element from below the
 * viewport to above it without it ever intersecting, so the observer never
 * fires. Called from the scroll loop: anything hidden that is now above the
 * viewport is shown, and anything shown that is now below it is reset so it
 * plays again on the way down (e.g. after "back to top").
 */
export function revealPassed() {
  if (!io) return;
  const vh = window.innerHeight;
  const positions = Array.from(document.querySelectorAll<HTMLElement>(".reveal"), (el) => {
    const box = el.getBoundingClientRect();
    return { el, above: box.bottom < 0, below: box.top > vh };
  });
  // Read every position before changing classes; transforms can affect layout.
  positions.forEach(({ el, above, below }) => {
    if (above) el.classList.add("is-in");
    else if (below) el.classList.remove("is-in");
  });
}

/** Called once by ScrollEffects. Returns a cleanup function. */
export function startReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) el.classList.add("is-in");
        // Leaving through the BOTTOM = user scrolled back up → play it in reverse.
        else if (entry.boundingClientRect.top > 0) el.classList.remove("is-in");
        // Leaving through the top (scrolled past) keeps it visible.
        else el.classList.add("is-in");
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );
  // (Re)start: observe everything already registered. In development React
  // runs effects twice, so this must also pick up already-prepared elements.
  sections.forEach(scan);

  return () => {
    io?.disconnect();
    io = null;
  };
}
