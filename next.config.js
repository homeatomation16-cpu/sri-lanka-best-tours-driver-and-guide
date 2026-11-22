// next.config.js
const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    // Crawlers must be able to see noindex; authentication remains the access control.
    const privateSection = ":section(admin|login|account|booking)";
    return [
      `/${privateSection}/:path*`,
      `/:locale/${privateSection}/:path*`,
      "/api/:path*",
    ].map((source) => ({ source, headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }));
  },
  images: {
    qualities: [60, 75],
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
