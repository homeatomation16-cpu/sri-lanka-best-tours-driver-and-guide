import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const privatePaths = ["/admin", "/login", "/booking"];
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", ...privatePaths, ...routing.locales.flatMap((locale) => privatePaths.map((path) => `/${locale}${path}`))],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
