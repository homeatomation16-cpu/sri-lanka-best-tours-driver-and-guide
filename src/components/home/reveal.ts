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
let additiveSupported: boolean | undefined;

type RevealMotion = {
  animation: Animation;
  from: [number, number];
  to: [number, number];
  shown: boolean;
  reversingStart: boolean;
  factor: number;
};
const motions = new Map<HTMLElement, RevealMotion>();
const EASING = "cubic-bezier(0.2, 0.7, 0.2, 1)";

function hiddenOffset(el: HTMLElement): [number, number] {
  const side = window.innerWidth <= 640 ? 32 : 64;
  switch (el.dataset.revealDir) {
    case "left": return [-side, 0];
    case "right": return [side, 0];
    case "zoom": return [0, 24];
    default: return [0, 56];
  }
}

function translateAnimation(el: HTMLElement, from: number[], to: number[], duration: number, delay = 0) {
  return el.animate([
    { translate: `${from[0]}px ${from[1]}px` },
    { translate: `${to[0]}px ${to[1]}px` },
  ], { duration, delay, easing: EASING, fill: "both", composite: "add" });
}

/** Add the timed offset to the live scroll translate, without touching hover transforms. */
function prepareMotion(el: HTMLElement) {
  if (motions.has(el) || !el.classList.contains("reveal-waapi-ready")) return;
  const shown = el.classList.contains("is-in");
  const offset: [number, number] = shown ? [0, 0] : hiddenOffset(el);
  const animation = translateAnimation(el, offset, offset, 0);
  animation.finish();
  motions.set(el, { animation, from: offset, to: offset, shown, reversingStart: shown, factor: 1 });
  el.classList.add("reveal-composited");
}

function setRevealed(el: HTMLElement, shown: boolean, retarget = false, entering = false) {
  // Offscreen hidden items need only their static CSS state. Allocate an
  // animation when the state first changes, rather than for every card at hydration.
  if (entering && el.classList.contains("is-in") !== shown) prepareMotion(el);
  const motion = motions.get(el);
  if (motion && (motion.shown !== shown || retarget)) {
    // Sample animation timing, not layout or computed styles. Match CSS transition
    // reversal shortening, including a reversal during the entry stagger delay.
    const progress = motion.animation.effect?.getComputedTiming().progress ?? 0;
    const from: [number, number] = [
      motion.from[0] + (motion.to[0] - motion.from[0]) * progress,
      motion.from[1] + (motion.to[1] - motion.from[1]) * progress,
    ];
    const reversing = !retarget && motion.animation.playState !== "finished" && shown === motion.reversingStart;
    const factor = reversing ? Math.min(1, Math.abs(progress * motion.factor + 1 - motion.factor)) : 1;
    const to: [number, number] = shown ? [0, 0] : hiddenOffset(el);
    motion.animation.cancel();
    const delay = shown ? Number(el.style.getPropertyValue("--reveal-i")) * 120 : 0;
    const animation = translateAnimation(el, from, to, 900 * factor, delay);
    motions.set(el, { animation, from, to, shown, reversingStart: motion.shown, factor });
  }
  el.classList.toggle("is-in", shown);
}

function prepare(el: HTMLElement) {
  if (!io) return;
  if (el.closest(".hero-section, [data-scene]")) return; // hero & scenes stay untouched
  // Set the mode BEFORE .reveal changes the hidden offsets. Supported browsers
  // must never enter the CSS custom-property transition path, even offscreen.
  additiveSupported ??= typeof el.animate === "function" && typeof CSS !== "undefined"
    && typeof CSS.supports === "function" && CSS.supports("animation-composition", "add");
  if (additiveSupported) el.classList.add("reveal-waapi-ready");
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
  return () => {
    sections.delete(section);
    section.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
      io?.unobserve(el);
      motions.get(el)?.animation.cancel();
      motions.delete(el);
      el.classList.remove("reveal-composited");
    });
  };
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
    if (above) setRevealed(el, true);
    else if (below) setRevealed(el, false);
  });
}

/** Called once by ScrollEffects. Returns a cleanup function. */
export function startReveal() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const clearMotion = () => {
    motions.forEach(({ animation }, el) => {
      animation.cancel();
      el.classList.remove("reveal-composited");
    });
    motions.clear();
  };
  const connect = () => {
    io?.disconnect();
    io = null;
    clearMotion();
    if (reduced.matches) {
      sections.forEach((section) => section.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in")));
      return;
    }
    io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) setRevealed(el, true, false, true);
          // Leaving through the BOTTOM = user scrolled back up → play it in reverse.
          else if (entry.boundingClientRect.top > 0) setRevealed(el, false);
          // Leaving through the top (scrolled past) keeps it visible.
          else setRevealed(el, true);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    // (Re)start: observe everything already registered, including after Strict Mode cleanup.
    sections.forEach(scan);
  };
  const resize = () => {
    motions.forEach((motion, el) => {
      if (motion.shown) return;
      const offset = hiddenOffset(el);
      if (offset[0] !== motion.to[0] || offset[1] !== motion.to[1]) setRevealed(el, false, true);
    });
  };
  connect();
  reduced.addEventListener("change", connect);
  window.addEventListener("resize", resize);

  return () => {
    io?.disconnect();
    io = null;
    clearMotion();
    reduced.removeEventListener("change", connect);
    window.removeEventListener("resize", resize);
  };
}
