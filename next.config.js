// next.config.js
const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // don't advertise the framework in every response
  poweredByHeader: false,

  async headers() {
    // Crawlers must be able to see noindex; authentication remains the access control.
    const privateSection = ":section(admin|login|account|booking)";
    const noindex = [
      `/${privateSection}/:path*`,
      `/:locale/${privateSection}/:path*`,
      "/api/:path*",
    ].map((source) => ({ source, headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }));

    // Safe security headers for every response (no CSP: GTM, Google sign-in and map embeds would need a tuned policy).
    const security = {
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
      ],
    };

    // Long-lived caching for files in /public that never change name.
    const staticAssets = {
      source: "/:dir(fonts|hero|destinations|excursions|tours|gallery|images|maps)/:path*",
      headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
    };

    return [security, staticAssets, ...noindex];
  },

  // 301/308 redirects for URLs that were removed or renamed. Add old paths here when a page moves, e.g.
  // { source: "/old-tour-name", destination: "/tours/new-tour-id", permanent: true },
  // TODO: add old URLs reported as 404 in Google Search Console → Pages → "Not found (404)".
  async redirects() {
    return [];
  },

  images: {
    // serve AVIF first, then WebP, to browsers that accept them (same pixels, smaller files)
    formats: ["image/avif", "image/webp"],
    qualities: [60, 65, 75, 80],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
