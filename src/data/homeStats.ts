/**
 * Homepage number counters ("In numbers" section).
 *
 * Same figures as the About page (src/app/[locale]/about/page.tsx) — keep the
 * two in sync. Labels come from messages → stats.<key> (shared with About).
 *
 *   value   → number the counter counts up to, or a string shown as-is
 *             (e.g. "24/7"). null = hidden on the live site ("—" in dev).
 *   suffix  → shown after a counted number, e.g. "+" or "%"
 */
export type HomeStat = {
  key: "experience" | "travelers" | "support" | "certified";
  value: number | string | null;
  suffix: string;
};

export const HOME_STATS: HomeStat[] = [
  { key: "experience", value: 10, suffix: "+" },
  { key: "travelers", value: 5000, suffix: "+" },
  { key: "support", value: "24/7", suffix: "" },
  { key: "certified", value: 100, suffix: "%" },
];
