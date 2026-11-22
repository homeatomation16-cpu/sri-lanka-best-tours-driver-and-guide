import { routing } from "@/i18n/routing";

export const siteUrl = "https://www.srilankabesttourdriverandguide.com";

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
