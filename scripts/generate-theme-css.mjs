// Generates src/app/theme.css: dark-mode and brand-preset rules for the colours used in the components.
// Run again after adding new hard-coded colours:  node scripts/generate-theme-css.mjs
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, "$1")), "..");
const SRC = path.join(root, "src");
const OUT = path.join(SRC, "app", "theme.css");

// Scope: dark mode on the public site only (the admin panel has its own dark style).
const D = 'html[data-theme="dark"] body:not(:has(.admin-root))';
const P = 'html[data-brand="custom"] body:not(:has(.admin-root))';

/* ── collect classes ── */
const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(tsx|jsx|ts|js)$/.test(e.name)) files.push(p);
  }
})(SRC);
const RE = /(?<![\w-])((?:hover|focus|group-hover):)?(bg|text|border|from|via|to)-\[#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\](?:\/(\d{1,3}))?/g;
const found = new Map();
for (const f of files) {
  if (f.includes(`${path.sep}admin${path.sep}`)) continue;
  for (const m of fs.readFileSync(f, "utf8").matchAll(RE)) found.set(m[0], { variant: m[1] || "", prop: m[2], hex: m[3], alpha: m[4] });
}

/* ── colour helpers ── */
const full = (h) => (h.length === 3 ? h.split("").map((x) => x + x).join("") : h).toLowerCase();
const rgb = (h) => [0, 2, 4].map((i) => parseInt(full(h).slice(i, i + 2), 16) / 255);
const lum = (h) => { const [r, g, b] = rgb(h).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
function hsl(h) {
  const [r, g, b] = rgb(h); const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2;
  if (mx === mn) return [0, 0, l];
  const d = mx - mn, s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
  let hue = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [hue * 60, s, l];
}
const esc = (s) => s.replace(/([\[\]#:/.!%])/g, "\\$1");
const withAlpha = (v, a) => (a ? `color-mix(in srgb, ${v} ${a}%, transparent)` : v);
const PROP = { bg: "background-color", text: "color", border: "border-color", from: "--tw-gradient-from", via: "--tw-gradient-via", to: "--tw-gradient-to" };
const sel = (cls, variant) => `.${esc(cls)}${variant === "hover:" ? ":hover" : variant === "focus:" ? ":focus" : variant === "group-hover:" ? "" : ""}`;
const groupSel = (cls, variant) => (variant === "group-hover:" ? `.group:hover .${esc(cls)}` : sel(cls, variant));

const dark = [], brand = [];
for (const [cls, { variant, prop, hex, alpha }] of found) {
  const L = lum(hex), [hue, s] = hsl(hex), s1 = groupSel(cls, variant), decl = PROP[prop];
  // dark mode: light surfaces → dark, dark text → light, light borders → dark
  let dv = null;
  if (prop === "bg" && L > 0.6) dv = L > 0.9 ? "var(--t-dark-surface)" : "var(--t-dark-bg)";
  else if (prop === "bg" && L > 0.35 && s < 0.5) dv = "var(--t-dark-surface)";
  else if (prop === "text" && L < 0.06) dv = "var(--t-dark-text)";
  else if (prop === "text" && L < 0.25 && s < 0.45) dv = "var(--t-dark-muted)";
  else if (prop === "border" && L > 0.5) dv = "var(--t-dark-border)";
  if (dv) dark.push(`${D} ${s1}{${decl}:${withAlpha(dv, alpha)}}`);
  // brand presets: deep coloured tones → primary, golds/oranges → accent, warm creams → page background
  let bv = null;
  if (L < 0.06 && s > 0.3) bv = "var(--t-primary)";
  else if (hue >= 15 && hue <= 50 && s > 0.4 && L > 0.08 && L < 0.6) bv = "var(--t-accent)";
  else if (prop === "bg" && L > 0.85 && L < 0.97 && hue >= 20 && hue <= 60) bv = "var(--t-bg)";
  if (bv) brand.push(`${P} ${s1}{${decl}:${withAlpha(bv, alpha)}}`);
}

/* ── Tailwind palettes ── */
const twTheme = fs.readFileSync(path.join(root, "node_modules/tailwindcss/theme.css"), "utf8");
const tw = Object.fromEntries([...twTheme.matchAll(/--color-([a-z]+)-(\d+):\s*([^;]+);/g)].map((m) => [`${m[1]}-${m[2]}`, m[3].trim()]));
// Per-class rules (not variable swaps): light greys used as text on dark photos must stay light.
const pal = [];
const H = (c) => [`${D} .${esc(c)}`, `${D} .${esc("hover:" + c)}:hover`].join(",");
for (const name of ["gray", "slate", "zinc", "stone", "neutral"]) {
  pal.push(`${H(`bg-${name}-50`)},${H(`bg-${name}-100`)}{background-color:var(--t-dark-surface)}`);
  pal.push(`${H(`bg-${name}-200`)}{background-color:var(--t-dark-border)}`);
  pal.push(`${D} :is(.border-${name}-100,.border-${name}-200,.border-${name}-300,.divide-${name}-100>*,.divide-${name}-200>*){border-color:var(--t-dark-border)}`);
  pal.push(`${D} :is(.text-${name}-500,.text-${name}-600,.text-${name}-700){color:var(--t-dark-muted)}`);
  pal.push(`${D} :is(.text-${name}-800,.text-${name}-900,.text-${name}-950){color:var(--t-dark-text)}`);
}
for (const name of ["red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "pink", "rose"]) {
  if (!tw[`${name}-500`]) continue;
  pal.push(`${H(`bg-${name}-50`)},${H(`bg-${name}-100`)}{background-color:color-mix(in oklab,var(--t-dark-surface) 82%,${tw[`${name}-500`]})}`);
  pal.push(`${D} :is(.border-${name}-100,.border-${name}-200){border-color:color-mix(in oklab,var(--t-dark-border) 60%,${tw[`${name}-500`]})}`);
  pal.push(`${D} :is(.text-${name}-700,.text-${name}-800,.text-${name}-900){color:${tw[`${name}-300`]}}`);
}
const accentVars = ["amber-400", "amber-500", "amber-600", "orange-400", "orange-500", "orange-600", "yellow-500"].map((v) => `--color-${v}:var(--t-accent)`);

const css = `/* GENERATED by scripts/generate-theme-css.mjs – do not edit by hand. */
/* Colour values come from <style id="site-theme"> (Admin → Theme). */
:root{--t-primary:#0b2a22;--t-accent:#d4a853;--t-bg:#faf7f2;--t-dark-bg:#0b1411;--t-dark-surface:#13201b;--t-dark-text:#ece7da;--t-dark-muted:#a3b2a9;--t-dark-border:#26372f}

/* ── Dark mode ── */
html[data-theme="dark"]:not(:has(.admin-root)){color-scheme:dark}
${D}{background-color:var(--t-dark-bg)!important;color:var(--t-dark-text)}
${D} .bg-white{background-color:var(--t-dark-surface)}
${D} .text-black{color:var(--t-dark-text)}
${D} .border,${D} .border-b,${D} .border-t{border-color:var(--t-dark-border)}
${D} :is(.bg-white\\/70,.bg-white\\/80,.bg-white\\/90,.bg-white\\/95){background-color:color-mix(in srgb,var(--t-dark-surface) 90%,transparent)}
${D} :is(input,textarea,select){color-scheme:dark}
${pal.join("\n")}
${dark.join("\n")}

/* ── Brand presets (only when the colours differ from the original design) ── */
${P}{${accentVars.join(";")}}
${brand.join("\n")}
`;
fs.writeFileSync(OUT, css);
console.log(`theme.css: ${found.size} classes, ${dark.length} dark rules, ${brand.length} brand rules`);
