"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/navigation";
import { type Locale } from "@/navigation";

// ✅ MUST match navigation.ts locales
const LOCALE_NAMES: Record<
  Locale,
  { flag: string; name: string }
> = {
  en: { flag: "🇬🇧", name: "English" },
  ar: { flag: "🇦🇪", name: "العربية" },
  de: { flag: "🇩🇪", name: "Deutsch" },
  es: { flag: "🇪🇸", name: "Español" },
  fr: { flag: "🇫🇷", name: "Français" },
  it: { flag: "🇮🇹", name: "Italiano" },
  hi: { flag: "🇮🇳", name: "हिन्दी" },
  zh: { flag: "🇨🇳", name: "中文" },
  ru: { flag: "🇷🇺", name: "Русский" },
  ja: { flag: "🇯🇵", name: "日本語" },
  pt: { flag: "🇵🇹", name: "Português" },
  ko: { flag: "🇰🇷", name: "한국어" },
  ta: { flag: "🇮🇳", name: "தமிழ்" },
  si: { flag: "🇱🇰", name: "සිංහල" },
};

export default function LanguageFloatingButton() {
  const [open, setOpen] = useState(false);

  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname() || "/"; // ✅ IMPORTANT fallback

  const handleLanguageChange = (newLocale: Locale) => {
    setOpen(false);

    if (newLocale === locale) return;

    // ✅ FINAL FIX (works in Next 16 + next-intl)
    router.replace(
      { pathname },
      { locale: newLocale }
    );
  };

  const current = LOCALE_NAMES[locale] ?? {
    flag: "🌍",
    name: "Language",
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-amber-500 hover:bg-amber-600 text-white shadow-2xl flex items-center justify-center text-2xl transition-transform hover:scale-110 active:scale-95"
        aria-label="Change language"
      >
        {current.flag}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute bottom-16 right-0 w-56 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <div className="py-2">
            {(Object.entries(LOCALE_NAMES) as [
              Locale,
              { flag: string; name: string }
            ][]).map(([code, item]) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code)}
                className={`flex w-full items-center gap-3 px-5 py-3 text-sm transition-colors text-left ${
                  locale === code
                    ? "text-amber-400 bg-white/5 font-semibold"
                    : "text-white/80 hover:bg-white/10"
                }`}
              >
                <span className="text-base">{item.flag}</span>
                <span>{item.name}</span>

                {locale === code && (
                  <span className="ml-auto text-xs">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}