"use client";

import { useEffect, useRef } from "react";

/**
 * Christmas preset: a fluffy silver tinsel garland draped in swags under the
 * navbar, with twinkling fairy lights hanging along it. Canvas, click-through.
 */

const SWAG = 180; // px between hanging points
const SAG = 16; // how far each swag dips
const HEIGHT = 52;
const BULBS = ["#ff3b4e", "#ffd447", "#3ddc84", "#4fc3ff", "#ff8a3d"];

type Strand = { path: Path2D; baseShade: number; thresholds: number[]; sinPhase: number; cosPhase: number };
type Bulb = { x: number; y: number; color: string; phase: number; ball: boolean; body: Path2D; centre: Path2D; gradient: CanvasGradient | null };

export default function ChristmasGarland() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let dpr = 1;
    let strands: Strand[] = [];
    let bulbs: Bulb[] = [];
    let raf = 0;
    let lastDraw = -Infinity;
    // Performance: the tinsel at rest (no sparkle) is drawn once into this offscreen canvas; each frame
    // copies it and re-strokes only the strands that are mid-sparkle (~15%), instead of all ~1,800.
    const base = document.createElement("canvas");
    const baseCtx = base.getContext("2d")!;
    const GREEN_SHADES = Array.from({ length: 6 }, (_, g) => `hsl(${140 - g * 4} ${55 + g * 4}% ${20 + g * 9}%)`); // deep pine to bright, glinting green
    const SILVER_SHADES = Array.from({ length: 10 }, (_, g) => `hsl(210 12% ${60 + g * 4.4}%)`);
    const shades = [...GREEN_SHADES, ...SILVER_SHADES];

    /** Strokes strands batched by shade (one path per shade keeps it cheap). */
    const strokePaths = (target: CanvasRenderingContext2D, paths: Map<number, Path2D>) => {
      target.lineWidth = 1;
      // green first, then silver, as before
      shades.forEach((colour, index) => {
        const path = paths.get(index);
        if (!path) return;
        target.strokeStyle = colour;
        target.stroke(path);
      });
    };

    // centre line of the garland: a row of hanging swags
    const curveY = (x: number) => {
      const t = (((x % SWAG) + SWAG) % SWAG) / SWAG;
      return 8 + Math.sin(Math.PI * t) * SAG;
    };

    const build = () => {
      const nextDpr = Math.min(window.devicePixelRatio || 1, 2);
      const nextWidth = canvas.clientWidth;
      if (strands.length && nextDpr === dpr && nextWidth === w) return false;
      dpr = nextDpr;
      w = nextWidth;
      canvas.width = w * dpr;
      canvas.height = HEIGHT * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // thousands of thin foil strands sticking out in every direction = fluffy tinsel
      strands = [];
      const restingPaths = new Map<number, Path2D>();
      for (let x = -10; x < w + 10; x += 0.7) {
        const cy = curveY(x);
        for (let k = 0; k < 3; k++) {
          const ang = Math.random() * Math.PI * 2;
          const green = k === 0 || Math.random() < 0.25; // pine needles mixed into the silver
          const y = cy + (Math.random() - 0.5) * 3;
          const len = 4 + Math.random() * 7;
          const shade = Math.random();
          // Shade bucket = floor(shade·4 + glint·2) (green) or floor(shade·8 + glint·3) (silver); it moves up
          // once glint covers the gap to the next whole number. glint = sin¹², so solve for sin once here.
          const [scale, gain, top] = green ? [4, 2, 5] : [8, 3, 9];
          const now = shade * scale;
          const thresholds: number[] = [];
          for (let bucket = Math.floor(now) + 1; bucket <= Math.min(top, now + gain); bucket++) {
            thresholds.push(((bucket - now) / gain) ** (1 / 12));
          }
          const path = new Path2D();
          path.moveTo(x, y);
          path.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len * 0.75);
          const baseShade = (green ? 0 : GREEN_SHADES.length) + Math.floor(now);
          let resting = restingPaths.get(baseShade);
          if (!resting) restingPaths.set(baseShade, (resting = new Path2D()));
          resting.addPath(path);
          const phase = Math.random() * Math.PI * 2;
          strands.push({
            path, baseShade, thresholds, sinPhase: Math.sin(phase), cosPhase: Math.cos(phase),
          });
        }
      }

      bulbs = [];
      let i = 0;
      for (let x = SWAG / 4; x < w; x += SWAG / 4, i++) {
        // alternate: glowing fairy light, shiny ball ornament
        const y = curveY(x) + 9, ball = i % 2 === 1;
        const color = BULBS[i % BULBS.length];
        const body = new Path2D(), centre = new Path2D();
        let gradient: CanvasGradient | null = null;
        if (ball) {
          body.arc(x, y + 6.5, 6.5, 0, Math.PI * 2);
          gradient = ctx.createRadialGradient(x - 2, y + 4, 0.5, x, y + 6.5, 6.5);
          gradient.addColorStop(0, "#ffffff");
          gradient.addColorStop(0.25, color);
          gradient.addColorStop(1, "rgba(0,0,0,0.55)");
        } else {
          body.ellipse(x, y + 4, 3.6, 5, 0, 0, Math.PI * 2);
          centre.arc(x, y + 3, 1.3, 0, Math.PI * 2);
        }
        bulbs.push({ x, y, color, phase: Math.random() * Math.PI * 2, ball, body, centre, gradient });
      }

      base.width = canvas.width;
      base.height = canvas.height;
      baseCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      strokePaths(baseCtx, restingPaths);
      return true;
    };

    const draw = (now: number) => {
      if (!still) raf = requestAnimationFrame(draw);
      // ~30 fps: the sparkles and lights cycle over seconds, so every other frame looks the same
      if (now - lastDraw < 30) return;
      lastDraw = now;
      const time = now / 1000;
      ctx.clearRect(0, 0, w, HEIGHT);

      // tinsel: resting strands from the cached layer, sparkling ones redrawn on top in their brighter shade
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(base, 0, 0);
      ctx.restore();
      if (!still) {
        const t = time * 2.2;
        const sinTime = Math.sin(t), cosTime = Math.cos(t);
        const paths = new Map<number, Path2D>();
        for (const s of strands) {
          const sine = sinTime * s.cosPhase + cosTime * s.sinPhase;
          if (!s.thresholds.length || sine < s.thresholds[0]) continue;
          let shade = s.baseShade;
          for (const threshold of s.thresholds) { if (sine < threshold) break; shade++; }
          let path = paths.get(shade);
          if (!path) paths.set(shade, (path = new Path2D()));
          path.addPath(s.path);
        }
        strokePaths(ctx, paths);
      }

      // fairy lights and shiny ball ornaments, all twinkling out of step
      for (const b of bulbs) {
        const on = still ? 1 : 0.5 + 0.5 * Math.sin(time * 2.4 + b.phase);
        ctx.fillStyle = "#3a4a44"; // little cap
        ctx.fillRect(b.x - 2, b.y - 2.5, 4, 3);
        ctx.save();
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 6 + on * 14;
        if (b.ball) {
          const r = 6.5;
          const cy = b.y + r;
          ctx.fillStyle = b.color;
          ctx.fill(b.body);
          ctx.shadowBlur = 0;
          ctx.fillStyle = b.gradient!;
          ctx.fill(b.body);
          // star-shaped glint flashing on the ball
          const flash = still ? 0 : Math.max(0, Math.sin(time * 1.7 + b.phase * 3)) ** 8;
          if (flash > 0.05) {
            const fx = b.x - 2, fy = cy - 2.5, L = 3 + flash * 6;
            ctx.globalAlpha = flash;
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.moveTo(fx - L, fy); ctx.lineTo(fx + L, fy);
            ctx.moveTo(fx, fy - L); ctx.lineTo(fx, fy + L);
            ctx.stroke();
          }
        } else {
          ctx.globalAlpha = 0.55 + on * 0.45;
          ctx.fillStyle = b.color;
          ctx.fill(b.body);
          ctx.globalAlpha = on;
          ctx.fillStyle = "#ffffff"; // hot centre
          ctx.fill(b.centre);
        }
        ctx.restore();
      }
    };

    let started = false;
    let startupFrame = requestAnimationFrame(() => {
      startupFrame = requestAnimationFrame(() => {
        started = true;
        build();
        if (!document.hidden) raf = requestAnimationFrame(draw);
      });
    });
    const onResize = () => {
      if (!started) return;
      if (build() && still) draw(performance.now());
    };
    // stop redrawing while the tab is in the background
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (started && !document.hidden) raf = requestAnimationFrame(draw);
    };
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(startupFrame);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: "absolute",
        left: 0,
        top: "calc(100% - 10px)",
        width: "100%",
        height: HEIGHT,
        pointerEvents: "none",
        filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.25))",
      }}
    />
  );
}
