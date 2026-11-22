import { routing } from "@/i18n/routing";
import type { Metadata } from "next";

export const siteUrl = "https://www.srilankabesttourdriverandguide.com";
export const siteName = "Sri Lanka Best Tours Driver & Guide";
export const socialImage = "/hero/sigiriya-poster.webp";

const socialLocales: Record<string, string> = {
  en: "en_US", ar: "ar_AR", fr: "fr_FR", de: "de_DE", es: "es_ES", it: "it_IT",
  hi: "hi_IN", zh: "zh_CN", ru: "ru_RU", ja: "ja_JP", si: "si_LK", pt: "pt_PT", ko: "ko_KR", ta: "ta_LK",
};

export function localizedUrl(locale: string, path = "") {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${siteUrl}${prefix}${path}`;
}

export function pageAlternates(locale: string, path = "") {
  return {
    canonical: localizedUrl(locale, path),
    languages: {
      ...Object.fromEntries(routing.locales.map((language) => [language, localizedUrl(language, path)])),
      "x-default": localizedUrl(routing.defaultLocale, path),
    },
  };
}

/** Use existing translated page copy for search and both social preview formats. */
export function pageMetadata(locale: string, path: string, title: string, text: string, image = socialImage): Metadata {
  const brandedTitle = title === siteName || title.endsWith(` | ${siteName}`) ? title : `${title} | ${siteName}`;
  const description = metaDescription(text);
  return {
    title: brandedTitle,
    description,
    alternates: pageAlternates(locale, path),
    openGraph: {
      type: "website", siteName, title: brandedTitle, description,
      url: localizedUrl(locale, path), locale: socialLocales[locale],
      alternateLocale: routing.locales.filter((language) => language !== locale).map((language) => socialLocales[language]),
      images: [{ url: image, alt: title, ...(image === socialImage ? { width: 1280, height: 720 } : {}) }],
    },
    twitter: { card: "summary_large_image", title: brandedTitle, description, images: [image] },
  };
}

export function metaDescription(text: string, limit = 160) {
  const plain = text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (plain.length <= limit) return plain;
  const shortened = plain.slice(0, limit - 1);
  const space = shortened.lastIndexOf(" ");
  return `${space > limit * 0.6 ? shortened.slice(0, space) : shortened}…`;
}

/** JSON-LD may contain editable text; never let it terminate the script element. */
export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function breadcrumbJsonLd(locale: string, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem", position: index + 1, name: item.name, item: localizedUrl(locale, item.path),
    })),
  };
}
