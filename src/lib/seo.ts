import { routing } from "@/i18n/routing";
import type { Metadata } from "next";

/** Canonical origin (www, https, no trailing slash). Override with NEXT_PUBLIC_SITE_URL for previews. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.srilankabesttourdriverandguide.com").replace(/\/+$/, "");
export const siteName = "Sri Lanka Best Tours Driver & Guide";
/** Brand used in page titles when the full name would push them past ~60 characters. */
export const shortSiteName = "Sri Lanka Best Tours";
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

/**
 * English search descriptions (140–160 chars) for pages whose on-page intro is too short to make a good snippet.
 * Written only from what those pages already show. Other languages keep their translated page copy.
 */
const EN_DESCRIPTIONS: Record<string, string> = {
  "/tours": "Private Sri Lanka round tours with your own chauffeur-guide: day-by-day itineraries, prices and routes that can be tailored to your travel dates and interests.",
  "/destinations": "The best places to visit in Sri Lanka – heritage sites, temples, beaches, cities and hill country – with the best time to go, opening hours and getting there.",
  "/excursions": "Sri Lanka excursions and day trips with a private driver: Colombo, Kandy, the airport and more, with duration, pickup time and what each trip includes.",
  "/vehicles": "Our Sri Lanka tour vehicle fleet for rent – cars, vans and air-conditioned coaches – each with an experienced multilingual driver for transfers and round tours.",
  "/contact": "Planning a trip to Sri Lanka? Tell us your dates and ideas and we'll plan the route, the stays and your private driver-guide. Call, WhatsApp or e-mail us.",
  "/tailor-made-tours": "Tailor-made Sri Lanka tours: personalise every detail of your trip and our local experts will craft a unique itinerary with your own private driver-guide.",
  "/faq": "Quick answers about booking a private driver-guide in Sri Lanka: how booking works, prices, vehicles, itineraries and travelling around the island.",
};

/** Use existing translated page copy for search and both social preview formats. */
export function pageMetadata(locale: string, path: string, title: string, text: string, image = socialImage, options: { brand?: boolean } = {}): Metadata {
  // Keep titles within ~60 characters (Google truncates longer ones): full brand if it fits,
  // else the short brand, else the page's own keyword-rich title alone.
  const brandedTitle =
    options.brand === false || title === siteName || title.endsWith(` | ${siteName}`)
      ? title
      : [`${title} | ${siteName}`, `${title} | ${shortSiteName}`].find((t) => t.length <= 60) ?? title;
  const description = metaDescription(locale === routing.defaultLocale && EN_DESCRIPTIONS[path] ? EN_DESCRIPTIONS[path] : text);
  return {
    // absolute: the root layout's title template must not append the brand a second time
    title: { absolute: brandedTitle },
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

/** Two-level breadcrumb (Home › Section) for listing pages. */
export function sectionBreadcrumb(locale: string, homeName: string, name: string, path: string) {
  return breadcrumbJsonLd(locale, [{ name: homeName, path: "" }, { name, path }]);
}

/** Absolute URL for an image path that may already be absolute. */
export const absoluteUrl = (src: string) => new URL(src, siteUrl).href;
