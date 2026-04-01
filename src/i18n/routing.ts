// src/i18n/routing.ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ar', 'fr', 'de', 'es', 'it', 'hi', 'zh', 'ru', 'ja', 'si', 'pt', 'ko', 'ta'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});
export type Locale = (typeof routing.locales)[number];

export const LOCALE_NAMES: Record<Locale, string> = {
  en: '🇬🇧 English',
  ar: '🇦🇪 العربية',
  fr: '🇫🇷 Français',
  de: '🇩🇪 Deutsch',
  es: '🇪🇸 Español',
  it: '🇮🇹 Italiano',
  hi: '🇮🇳 हिन्दी',
  zh: '🇨🇳 中文',
  ru: '🇷🇺 Русский',
  ja: '🇯🇵 日本語',
  pt: '🇵🇹 Portugês',
  ko: '🇰🇷 한국어',
  ta: '🇮🇳 தமிழ்',
  si: '🇱🇰 සිංහල',
};

// RTL locales — used in layout for dir="rtl"
export const RTL_LOCALES: Locale[] = ['ar'];
export const isRTL = (locale: Locale) => RTL_LOCALES.includes(locale);
