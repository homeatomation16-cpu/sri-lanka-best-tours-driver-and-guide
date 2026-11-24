import type { MetadataRoute } from "next";
import { siteName } from "@/lib/seo";

// Basic web app manifest (served at /manifest.webmanifest and linked automatically).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: "SL Best Tours",
    description: "Private driver-guided tours, airport transfers and chauffeur service across Sri Lanka.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0b2a22",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
