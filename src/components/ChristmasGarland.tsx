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

type Strand = { x: number; y: number; len: number; ang: number; shade: number; tw: number; green: boolean };

export default function ChristmasGarland() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let strands: Strand[] = [];
    let bulbs: { x: number; y: number; color: string; phase: number; ball: boolean }[] = [];
    let raf = 0;

    // centre line of the garland: a row of hanging swags
    const curveY = (x: number) => {
      const t = (((x % SWAG) + SWAG) % SWAG) / SWAG;
      return 8 + Math.sin(Math.PI * t) * SAG;
    };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      canvas.width = w * dpr;
      canvas.height = HEIGHT * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // thousands of thin foil strands sticking out in every direction = fluffy tinsel
      strands = [];
      for (let x = -10; x < w + 10; x += 0.7) {
        const cy = curveY(x);
        for (let k = 0; k < 3; k++) {
          const ang = Math.random() * Math.PI * 2;
          const green = k === 0 || Math.random() < 0.25; // pine needles mixed into the silver
          strands.push({
            green,
            x,
            y: cy + (Math.random() - 0.5) * 3,
            len: 4 + Math.random() * 7,
            ang,
            shade: Math.random(),
            tw: Math.random() * Math.PI * 2,
          });
        }
      }

      bulbs = [];
      let i = 0;
      for (let x = SWAG / 4; x < w; x += SWAG / 4, i++) {
        // alternate: glowing fairy light, shiny ball ornament
        bulbs.push({ x, y: curveY(x) + 9, color: BULBS[i % BULBS.length], phase: Math.random() * Math.PI * 2, ball: i % 2 === 1 });
      }
    };

    const draw = (now: number) => {
      const time = now / 1000;
      ctx.clearRect(0, 0, w, HEIGHT);

      // tinsel
      // strands are batched into a few shades so this stays cheap
      ctx.lineWidth = 1;
      const silver: Path2D[] = Array.from({ length: 10 }, () => new Path2D());
      const green: Path2D[] = Array.from({ length: 6 }, () => new Path2D());
      for (const s of strands) {
        const glint = still ? 0 : Math.max(0, Math.sin(time * 2.2 + s.tw)) ** 12; // brief sparkles
        const path = s.green
          ? green[Math.min(5, Math.floor(s.shade * 4 + glint * 2))]
          : silver[Math.min(9, Math.floor(s.shade * 8 + glint * 3))];
        path.moveTo(s.x, s.y);
        path.lineTo(s.x + Math.cos(s.ang) * s.len, s.y + Math.sin(s.ang) * s.len * 0.75);
      }
      green.forEach((path, g) => {
        ctx.strokeStyle = `hsl(${140 - g * 4} ${55 + g * 4}% ${20 + g * 9}%)`; // deep pine to bright, glinting green
        ctx.stroke(path);
      });
      silver.forEach((path, g) => {
        ctx.strokeStyle = `hsl(210 12% ${60 + g * 4.4}%)`;
        ctx.stroke(path);
      });

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
          const g = ctx.createRadialGradient(b.x - 2, cy - 2.5, 0.5, b.x, cy, r);
          g.addColorStop(0, "#ffffff");
          g.addColorStop(0.25, b.color);
          g.addColorStop(1, "rgba(0,0,0,0.55)");
          ctx.fillStyle = b.color;
          ctx.beginPath();
          ctx.arc(b.x, cy, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.fillStyle = g;
          ctx.fill();
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
          ctx.beginPath();
          ctx.ellipse(b.x, b.y + 4, 3.6, 5, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = on;
          ctx.fillStyle = "#ffffff"; // hot centre
          ctx.beginPath();
          ctx.arc(b.x, b.y + 3, 1.3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      if (!still) raf = requestAnimationFrame(draw);
    };

    build();
    raf = requestAnimationFrame(draw);
    const onResize = () => {
      build();
      if (still) draw(performance.now());
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
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
