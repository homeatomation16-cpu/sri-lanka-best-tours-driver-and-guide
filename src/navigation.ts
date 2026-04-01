import { createNavigation } from "next-intl/navigation";

export const locales = [
  "en",
  "ar",
  "de",
  "es",
  "fr", // ✅ FIX HERE (remove space)
  "it",
  "hi",
  "zh",
  "ru",
  "ja",
  "si",
  "ta",
  "ko",
  "pt",
] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localePrefix = "always";

export const {
  Link,
  redirect,
  usePathname,
  useRouter
} = createNavigation({
  locales,
  defaultLocale,
  localePrefix
});