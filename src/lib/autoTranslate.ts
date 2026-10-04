import { translate } from "@vitalets/google-translate-api";

/** Same 14 locales as src/i18n/routing.ts (English is the source). */
export const LOCALES = ["en", "ar", "fr", "de", "es", "it", "hi", "zh", "ru", "ja", "si", "pt", "ko", "ta"] as const;
export type LocaleCode = (typeof LOCALES)[number];
export type Localized = Partial<Record<LocaleCode, string>>;

const GOOGLE_CODE: Record<string, string> = { zh: "zh-CN" };

/** Translate one English string into all other locales. Never throws: a failed language keeps its old text, else English. */
export async function translateAll(en: string, previous?: Localized): Promise<Localized> {
  const text = (en || "").trim();
  const out: Localized = { en: text };
  if (!text) return out;

  const others = LOCALES.filter((l) => l !== "en");
  for (let i = 0; i < others.length; i += 4) {
    await Promise.all(
      others.slice(i, i + 4).map(async (l) => {
        try {
          const r = await translate(text, { to: GOOGLE_CODE[l] || l });
          out[l] = r.text;
        } catch {
          out[l] = previous?.[l] || text;
        }
      })
    );
  }
  return out;
}

/** Only call Google again when the English text really changed. */
export async function translateIfChanged(en: string, previous?: Localized): Promise<Localized> {
  const text = (en || "").trim();
  if (previous && previous.en === text && LOCALES.every((l) => previous[l])) return previous;
  return translateAll(text, previous);
}

/** Pick the right language for the website, fall back to English. */
export function pick(value: Localized | string | undefined | null, locale: string): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[locale as LocaleCode] || value.en || "";
}
