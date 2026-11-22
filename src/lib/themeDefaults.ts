// Theme settings edited in Admin → Theme: colour preset, custom colours and light/dark mode.
// Safe for client and server. Stored in SiteContent under key "theme".

export type ThemeMode = "visitor" | "light" | "dark";
export type ThemeColors = {
  primary: string; // dark brand colour (header bars, dark buttons)
  accent: string; // gold / highlight colour
  bg: string; // light page background
  darkBg: string; // dark mode page background
  darkSurface: string; // dark mode cards
  darkText: string; // dark mode text
  darkMuted: string; // dark mode secondary text
  darkBorder: string; // dark mode borders
};
export type ThemeSettings = { mode: ThemeMode; preset: string; colors: ThemeColors };

export const COLOR_FIELDS: { key: keyof ThemeColors; label: string; group: "Brand" | "Dark mode" }[] = [
  { key: "primary", label: "Primary (dark green)", group: "Brand" },
  { key: "accent", label: "Accent (gold)", group: "Brand" },
  { key: "bg", label: "Page background", group: "Brand" },
  { key: "darkBg", label: "Background", group: "Dark mode" },
  { key: "darkSurface", label: "Cards", group: "Dark mode" },
  { key: "darkText", label: "Text", group: "Dark mode" },
  { key: "darkMuted", label: "Secondary text", group: "Dark mode" },
  { key: "darkBorder", label: "Borders", group: "Dark mode" },
];

const c = (primary: string, accent: string, bg: string, darkBg: string, darkSurface: string, darkText: string, darkMuted: string, darkBorder: string): ThemeColors =>
  ({ primary, accent, bg, darkBg, darkSurface, darkText, darkMuted, darkBorder });

export const PRESETS: { id: string; name: string; colors: ThemeColors }[] = [
  { id: "default", name: "Default (green & gold)", colors: c("#0b2a22", "#d4a853", "#faf7f2", "#0b1411", "#13201b", "#ece7da", "#a3b2a9", "#26372f") },
  { id: "ocean", name: "Ocean", colors: c("#0b3954", "#f2a541", "#f4f9fb", "#07141c", "#0e212d", "#e3eef4", "#8fa9b8", "#1d3846") },
  { id: "sunset", name: "Sunset", colors: c("#7a2e1f", "#f28f3b", "#fdf6ef", "#160d09", "#24150f", "#f5e8df", "#b39a8e", "#3a261d") },
  { id: "forest", name: "Forest", colors: c("#1b4332", "#d4a373", "#f3f6f1", "#0a120d", "#132019", "#e4ece6", "#9bb0a2", "#22362a") },
  { id: "midnight", name: "Midnight", colors: c("#1e1b4b", "#f59e0b", "#f5f5fa", "#0b0b17", "#151528", "#e6e6f2", "#a0a1b8", "#2a2a44") },
  { id: "tea-country", name: "Tea Country", colors: c("#2f4a1f", "#d9a441", "#f7f8ef", "#0c120a", "#151f11", "#e8eedf", "#a3b294", "#27351f") },
  { id: "cinnamon", name: "Cinnamon & Spice", colors: c("#5c2a14", "#e0a526", "#fbf5ee", "#140b06", "#22140c", "#f4e9df", "#b8a08f", "#3a2617") },
  { id: "lagoon", name: "Lagoon", colors: c("#064e5a", "#ff7a59", "#f2faf9", "#061416", "#0c2226", "#e0f2f0", "#8fb3b2", "#1b3a3e") },
  { id: "royal-maroon", name: "Royal Maroon", colors: c("#5a1a2b", "#c9a227", "#fbf7f2", "#130a0d", "#211217", "#f3e8ea", "#b39ea4", "#3b2229") },
  { id: "sand-sea", name: "Sand & Sea", colors: c("#12355b", "#d4a259", "#fbf8f1", "#081019", "#0f1c29", "#e7edf2", "#97a8b6", "#1e3043") },
];

export const DEFAULT_THEME: ThemeSettings = { mode: "visitor", preset: "default", colors: PRESETS[0].colors };

export const THEME_COOKIE = "site_theme";

/** Runs in <head> before paint when visitors may choose: saved choice, else the device setting. */
export const THEME_INIT_SCRIPT = `(function(){try{var m=document.cookie.match(/(?:^|; )${THEME_COOKIE}=(light|dark)/);var t=m?m[1]:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.setAttribute("data-theme",t)}catch(e){}})();`;

const HEX = /^#[0-9a-f]{6}$/i;

export function normalizeTheme(input: any): ThemeSettings {
  const mode: ThemeMode = ["visitor", "light", "dark"].includes(input?.mode) ? input.mode : DEFAULT_THEME.mode;
  const preset = typeof input?.preset === "string" && (input.preset === "custom" || PRESETS.some((p) => p.id === input.preset)) ? input.preset : "default";
  const base = PRESETS.find((p) => p.id === preset)?.colors ?? DEFAULT_THEME.colors;
  const colors = Object.fromEntries(
    (Object.keys(base) as (keyof ThemeColors)[]).map((k) => {
      const v = input?.colors?.[k];
      return [k, typeof v === "string" && HEX.test(v) ? v.toLowerCase() : base[k]];
    }),
  ) as ThemeColors;
  return { mode, preset, colors };
}

/** True when the brand colours differ from the original design (then the remapping rules in theme.css switch on). */
export const isCustomBrand = (t: ThemeSettings) =>
  (["primary", "accent", "bg"] as const).some((k) => t.colors[k] !== DEFAULT_THEME.colors[k]);

/** CSS variables for <style id="site-theme">. Values are validated hex colours only. */
export function themeToCss(t: ThemeSettings) {
  const k = t.colors;
  return `:root{--t-primary:${k.primary};--t-accent:${k.accent};--t-bg:${k.bg};--t-dark-bg:${k.darkBg};--t-dark-surface:${k.darkSurface};--t-dark-text:${k.darkText};--t-dark-muted:${k.darkMuted};--t-dark-border:${k.darkBorder}}`;
}
