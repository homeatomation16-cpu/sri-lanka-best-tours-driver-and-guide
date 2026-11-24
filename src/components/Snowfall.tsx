"use client";

import { useEffect, useRef } from "react";

/**
 * Site-wide falling snow: six-armed crystal snowflakes (like a frosty
 * winter backdrop) plus tiny glittering specks. Drawn on one fixed canvas
 * that ignores clicks, pauses when the tab is hidden and is skipped for
 * visitors who prefer reduced motion.
 */

type Flake = {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  phase: number;
  rot: number;
  spin: number;
  alpha: number;
  sprite: HTMLCanvasElement | null; // null = small round speck
};

/** Draws one detailed six-armed snow crystal onto an offscreen canvas. */
function makeCrystal(px: number, variant: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = c.height = px;
  const g = c.getContext("2d")!;
  const r = px / 2 - 2;
  g.translate(px / 2, px / 2);
  g.strokeStyle = "#ffffff";
  g.lineCap = "round";
  g.shadowColor = "rgba(190, 225, 255, 0.9)";
  g.shadowBlur = px * 0.06;

  for (let arm = 0; arm < 6; arm++) {
    g.save();
    g.rotate((arm * Math.PI) / 3);

    // main spine
    g.lineWidth = Math.max(1, px * 0.035);
    g.beginPath();
    g.moveTo(0, 0);
    g.lineTo(0, -r);
    g.stroke();

    // branches: positions/length differ per variant for variety
    g.lineWidth = Math.max(0.8, px * 0.022);
    const branches = variant === 0 ? [0.35, 0.6, 0.8] : variant === 1 ? [0.45, 0.72] : [0.3, 0.5, 0.68, 0.85];
    branches.forEach((t, i) => {
      const len = r * (variant === 1 ? 0.38 : 0.3) * (1 - t * 0.55) * (i === 0 ? 1.15 : 1);
      for (const s of [-1, 1]) {
        g.beginPath();
        g.moveTo(0, -r * t);
        g.lineTo(s * len * 0.87, -r * t - len * 0.5);
        g.stroke();
      }
    });

    // small diamond tip
    g.beginPath();
    g.moveTo(0, -r * 0.9);
    g.lineTo(r * 0.05, -r * 0.95);
    g.lineTo(0, -r);
    g.lineTo(-r * 0.05, -r * 0.95);
    g.closePath();
    g.stroke();
    g.restore();
  }

  // hexagonal centre
  g.lineWidth = Math.max(0.8, px * 0.02);
  g.beginPath();
  for (let k = 0; k < 6; k++) {
    const a = (k * Math.PI) / 3;
    const hx = Math.sin(a) * r * 0.14;
    const hy = -Math.cos(a) * r * 0.14;
    if (k === 0) g.moveTo(hx, hy);
    else g.lineTo(hx, hy);
  }
  g.closePath();
  g.stroke();
  return c;
}

export default function Snowfall() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sprites = [0, 1, 2].map((v) => makeCrystal(96, v));
    let w = 0;
    let h = 0;
    let flakes: Flake[] = [];
    let raf = 0;
    let last = performance.now();

    /* ---- snow that settles on cards, buttons and headings ---- */
    const SURFACES =
      '.travel-card, .vl-card, .stat-card, .seasonal-photo-card, [class*="rounded-2xl"][class*="shadow"], [class*="rounded-3xl"][class*="shadow"], [class*="rounded-xl"][class*="shadow"], main a[class*="rounded-full"], main button[class*="rounded-full"]';
    const CELL = 4; // px per pile column
    type Surface = { el: Element; left: number; top: number; width: number; pile: Float32Array; max: number; radius: number; drips: number[]; stars: Star[]; rl: number; rw: number };
    type Star = { t: number; size: number; rot: number; sprite: number; twinkle: number; sink: number };
    const piles = new WeakMap<Element, Float32Array>();
    const dripsOf = new WeakMap<Element, number[]>();
    const starsOf = new WeakMap<Element, Star[]>();
    let surfaces: Surface[] = [];
    let rectsDirty = true;
    let frame = 0;
    const markDirty = () => (rectsDirty = true);

    const refreshSurfaces = () => {
      rectsDirty = false;
      const next: Surface[] = [];
      document.querySelectorAll(SURFACES).forEach((el) => {
        if (el.closest("header, [aria-hidden=true]")) return;
        const r = el.getBoundingClientRect();
        // the same card often matches twice (wrapper + visible box): keep the inner, visible one
        for (const inner of el.querySelectorAll(SURFACES)) {
          const ir = inner.getBoundingClientRect();
          if (Math.abs(ir.top - r.top) < 40 && ir.width > r.width * 0.8) return;
        }
        if (r.width < 40 || r.height < 12 || r.bottom < 0 || r.top > h || r.top < 4) return;
        // snow only rests on the flat-ish part of the top, not down the steep rounded sides (pill buttons)
        const radius = Math.min(parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0, r.width / 2, r.height / 2, 40);
        const inset = radius * 0.6;
        const sl = r.left + inset;
        const sw = r.width - inset * 2;
        if (sw < 24) return;
        const cols = Math.ceil(sw / CELL) + 1;
        const text = /^H\d$/.test(el.tagName);
        const max = text ? 8 : el.tagName === "BUTTON" || el.tagName === "A" ? 6 : 18;
        let pile = piles.get(el);
        if (!pile || pile.length !== cols) {
          const old = pile;
          pile = new Float32Array(cols);
          if (old) pile.set(old.subarray(0, Math.min(old.length, cols)));
          else prefill(pile, max);
          piles.set(el, pile);
        }
        let drips = dripsOf.get(el);
        if (!drips) {
          // little lumps of snow hanging over the front edge
          drips = Array.from({ length: Math.max(2, Math.round(r.width / 70)) }, () => 0.12 + Math.random() * 0.76);
          dripsOf.set(el, drips);
        }
        let stars = starsOf.get(el);
        if (!stars) {
          // little snow crystals resting in the drift
          stars = Array.from({ length: Math.max(2, Math.round(r.width / 38)) }, () => ({
            t: 0.06 + Math.random() * 0.88,
            size: 4 + Math.random() * 6,
            rot: Math.random() * Math.PI,
            sprite: Math.floor(Math.random() * 3),
            twinkle: Math.random() * Math.PI * 2,
            sink: 0.15 + Math.random() * 0.5,
          }));
          starsOf.set(el, stars);
        }
        next.push({ el, left: sl, top: r.top, width: sw, rl: r.left, rw: r.width, pile, max, radius, drips, stars });
      });
      // inner elements first so snow lands on the topmost visible thing
      surfaces = next.reverse();
    };

    /** Snow that has already settled before the visitor arrives: soft, lumpy clumps like snow on pine branches. */
    const prefill = (pile: Float32Array, max: number) => {
      const n = pile.length;
      const a = Math.random() * 6, b = Math.random() * 6, c = Math.random() * 6;
      for (let i = 0; i < n; i++) {
        // a few broad soft drifts with gentle ripples, like snow resting on a branch
        const lump =
          0.72 + 0.2 * Math.sin(i * 0.08 + a) + 0.08 * Math.sin(i * 0.27 + b) + 0.04 * Math.sin(i * 0.8 + c);
        const t = i / (n - 1);
        const taper = Math.pow(Math.sin(Math.PI * t), 0.35); // rounded ends, no hard cut-off
        pile[i] = Math.max(0, max * lump * taper);
      }
    };

    const addSnow = (s: Surface, x: number, amount: number) => {
      const c = Math.round((x - s.left) / CELL);
      for (let d = -3; d <= 3; d++) {
        const i = c + d;
        if (i < 0 || i >= s.pile.length) continue;
        // taper near rounded corners
        const edge = Math.min(i, s.pile.length - 1 - i) * CELL;
        const cap = s.max * Math.min(1, edge / 14 + 0.15);
        s.pile[i] = Math.min(cap, s.pile[i] + amount * (1 - Math.abs(d) / 4));
      }
    };

    /** y of the element's top edge at x, following its rounded corners */
    const edgeY = (s: Surface, x: number) => {
      const r = s.radius;
      const dx = x < s.rl + r ? s.rl + r - x : x > s.rl + s.rw - r ? x - (s.rl + s.rw - r) : 0;
      return s.top + r - Math.sqrt(Math.max(0, r * r - dx * dx));
    };

    const drawPile = (s: Surface) => {
      const p = s.pile;
      const n = p.length;
      let peak = 0;
      for (let i = 0; i < n; i++) peak = Math.max(peak, p[i]);
      if (peak < 0.5) return;
      const xAt = (i: number) => Math.min(s.left + i * CELL, s.left + s.width);
      const hAt = (i: number) => {
        let sum = 0, wsum = 0;
        for (let d = -2; d <= 2; d++) {
          const k = Math.min(n - 1, Math.max(0, i + d));
          const wgt = 3 - Math.abs(d);
          sum += p[k] * wgt;
          wsum += wgt;
        }
        return sum / wsum;
      };

      ctx.save();
      const grad = ctx.createLinearGradient(0, s.top - peak, 0, s.top + 4);
      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(0.6, "#f4f9ff");
      grad.addColorStop(1, "#cfe0f2");
      ctx.fillStyle = grad;
      ctx.shadowColor = "rgba(40, 80, 130, 0.35)";
      ctx.shadowBlur = 5;
      ctx.shadowOffsetY = 2;

      // mound: smooth curve over the top, then back along the card edge (sinking 3px onto it)
      ctx.beginPath();
      ctx.moveTo(xAt(0), edgeY(s, xAt(0)) + 2);
      let px = xAt(0), py = edgeY(s, px) - hAt(0);
      ctx.lineTo(px, py);
      for (let i = 2; i < n; i += 2) {
        const x = xAt(i), y = edgeY(s, x) - hAt(i);
        ctx.quadraticCurveTo(px, py, (px + x) / 2, (py + y) / 2);
        px = x;
        py = y;
      }
      ctx.lineTo(xAt(n - 1), edgeY(s, xAt(n - 1)) + 2);
      for (let i = n - 1; i >= 0; i -= 2) {
        const x = xAt(i);
        ctx.lineTo(x, edgeY(s, x) + 3);
      }
      ctx.closePath();
      ctx.fill();

      // soft overhanging lumps on the front edge
      ctx.shadowBlur = 3;
      for (const t of s.drips) {
        const i = Math.round(t * (n - 1));
        const hh = hAt(i);
        if (hh < 3) continue;
        const x = xAt(i);
        const y = edgeY(s, x);
        const rr = Math.min(7, 2 + hh * 0.3);
        ctx.beginPath();
        ctx.ellipse(x, y + rr * 0.55, rr * 1.6, rr, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // snow-star crystals sitting in the drift, softly twinkling
      const time = performance.now() / 1000;
      for (const st of s.stars) {
        const i = Math.round(st.t * (n - 1));
        const hh = hAt(i);
        if (hh < 4) continue;
        const x = xAt(i);
        const y = edgeY(s, x) - hh * (1 - st.sink);
        ctx.save();
        ctx.globalAlpha = 0.75 + 0.25 * Math.sin(time * 1.6 + st.twinkle);
        ctx.translate(x, y);
        ctx.rotate(st.rot);
        ctx.drawImage(sprites[st.sprite], -st.size, -st.size, st.size * 2, st.size * 2);
        ctx.restore();
      }
    };

    const spawn = (anywhere: boolean): Flake => {
      const crystal = Math.random() < 0.4;
      const size = crystal ? 10 + Math.random() * 22 : 1.2 + Math.random() * 2.3;
      return {
        x: Math.random() * w,
        y: anywhere ? Math.random() * h : -size * 2,
        size,
        speed: crystal ? 18 + size * 1.4 + Math.random() * 15 : 25 + Math.random() * 35,
        drift: 10 + Math.random() * 25,
        phase: Math.random() * Math.PI * 2,
        rot: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.6,
        alpha: crystal ? 0.55 + Math.random() * 0.4 : 0.5 + Math.random() * 0.5,
        sprite: crystal ? sprites[Math.floor(Math.random() * sprites.length)] : null,
      };
    };

    const resize = () => {
      rectsDirty = true;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(220, (w * h) / 7000));
      flakes = Array.from({ length: count }, () => spawn(true));
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, w, h);
      if (rectsDirty || ++frame % 20 === 0) refreshSurfaces();

      // settled snow
      ctx.globalAlpha = 0.95;
      ctx.fillStyle = "#ffffff";
      for (const s of surfaces) {
        drawPile(s);
        for (let i = 0; i < s.pile.length; i++) if (s.pile[i] > s.max * 0.7) s.pile[i] = Math.max(s.max * 0.7, s.pile[i] - dt * 0.03); // very slow melt
      }

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        f.phase += dt * 0.8;
        f.y += f.speed * dt;
        f.x += Math.sin(f.phase) * f.drift * dt;
        f.rot += f.spin * dt;
        const prevY = f.y - f.speed * dt;
        let landed = false;
        for (const sf of surfaces) {
          if (f.x < sf.left || f.x > sf.left + sf.width) continue;
          const c = Math.round((f.x - sf.left) / CELL);
          const surfaceY = edgeY(sf, f.x) - (sf.pile[c] ?? 0);
          if (prevY < surfaceY && f.y >= surfaceY) {
            if (Math.random() < 0.7) {
              addSnow(sf, f.x, f.sprite ? 1.2 : 0.45);
              landed = true;
            }
            break;
          }
        }
        if (landed) {
          flakes[i] = spawn(false);
          continue;
        }
        if (f.y - f.size > h || f.x < -50 || f.x > w + 50) {
          flakes[i] = spawn(false);
          continue;
        }
        ctx.globalAlpha = f.alpha;
        if (f.sprite) {
          ctx.save();
          ctx.translate(f.x, f.y);
          ctx.rotate(f.rot);
          ctx.drawImage(f.sprite, -f.size, -f.size, f.size * 2, f.size * 2);
          ctx.restore();
        } else {
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", markDirty, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", markDirty);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 60,
        filter: "drop-shadow(0 0 1.5px rgba(70, 130, 190, 0.55))",
      }}
    />
  );
}
