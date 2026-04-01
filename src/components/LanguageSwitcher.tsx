"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "@/navigation";
import { useLocale } from "next-intl";
import { ChevronDown } from "lucide-react";
import { locales, type Locale } from "@/navigation";

// ✅ FULLY MATCHED with Locale type
const LOCALE_NAMES: Record<
  Locale,
  { flag: string; name: string }
> = {
  en: { flag: "🇬🇧", name: "English" },
  ar: { flag: "🇦🇪", name: "العربية" },
  de: { flag: "🇩🇪", name: "Deutsch" },
  es: { flag: "🇪🇸", name: "Español" },
  fr: { flag: "🇫🇷", name: "Français" },
  pt: { flag: "🇵🇹", name: "Português" },
  ko: { flag: "🇰🇷", name: "한국어" },
  ta: { flag: "🇮🇳", name: "தமிழ்" },

  it: { flag: "🇮🇹", name: "Italiano" },
  hi: { flag: "🇮🇳", name: "हिन्दी" },
  zh: { flag: "🇨🇳", name: "中文" },
  ru: { flag: "🇷🇺", name: "Русский" },
  ja: { flag: "🇯🇵", name: "日本語" },
  si: { flag: "🇱🇰", name: "සිංහල" },
};

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close dropdown
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const switchLocale = (newLocale: Locale) => {
    setOpen(false);

    if (newLocale === locale) return;

    // ✅ THIS is correct (no manual URL)
    router.replace(pathname, { locale: newLocale });
  };

  const current = LOCALE_NAMES[locale] ?? {
    flag: "🌐",
    name: "Language",
  };

  return (
    <div ref={ref} className="relative">
      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-white text-sm hover:text-amber-400 transition px-2 py-1 rounded-lg hover:bg-white/10"
      >
        <span>{current.flag}</span>
        <span className="hidden lg:inline text-xs">{current.name}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
          {locales.map((code) => {
            const item = LOCALE_NAMES[code];

            return (
              <button
                key={code}
                onClick={() => switchLocale(code)}
                className={`w-full text-left px-4 py-3 text-sm flex items-center gap-2 transition-colors ${
                  locale === code
                    ? "text-amber-400 bg-white/5"
                    : "text-white/80 hover:bg-white/10"
                }`}
              >
                <span className="text-base">{item.flag}</span>
                <span>{item.name}</span>

                {locale === code && (
                  <span className="ml-auto text-amber-400 text-xs">✓</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}