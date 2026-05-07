// next.config.js
const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin(
  "./src/i18n/request.ts"
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Network Warning එක විසඳීමට
  allowedDevOrigins: ['192.168.56.1'],

  images: {
    // 2. Image Quality Warning එක විසඳීමට 60 එකතු කරන්න
    qualities: [60, 75, 90, 100], 

    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);