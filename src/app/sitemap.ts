import type { MetadataRoute } from "next";
import connectDB from "@/lib/mongodb";
import Tour from "@/models/Tour";
import Vehicle from "@/models/Vehicle";
import { DESTINATIONS } from "@/data/destinations";
import { EXCURSIONS } from "@/data/excursions";
import { routing } from "@/i18n/routing";
import { localizedUrl, pageAlternates } from "@/lib/seo";

export const revalidate = 3600;

function entries(path: string, updatedAt?: Date): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: localizedUrl(locale, path),
    ...(updatedAt ? { lastModified: updatedAt } : {}),
    alternates: { languages: pageAlternates(locale, path).languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/about", "/tours", "/vehicles", "/destinations", "/excursions", "/contact", "/tailor-made-tours"];
  const urls = [
    ...pages.flatMap((path) => entries(path)),
    ...DESTINATIONS.flatMap((item) => entries(`/destinations/${item.id}`)),
    ...EXCURSIONS.flatMap((item) => entries(`/excursions/${item.id}`)),
  ];

  try {
    await connectDB();
    const results = await Promise.allSettled([
      Tour.find({ status: "active" }).select("tourId updatedAt").lean(),
      Vehicle.find({ status: "active" }).select("vehicleId updatedAt").lean(),
    ]);
    const [tours, vehicles] = results;
    if (tours.status === "fulfilled") {
      for (const tour of tours.value) urls.push(...entries(`/tours/${encodeURIComponent(tour.tourId)}`, tour.updatedAt));
    }
    if (vehicles.status === "fulfilled") {
      for (const vehicle of vehicles.value) urls.push(...entries(`/vehicles/${encodeURIComponent(vehicle.vehicleId)}`, vehicle.updatedAt));
    }
    for (const result of results) {
      if (result.status === "rejected") console.error("Sitemap database query failed");
    }
  } catch {
    console.error("Sitemap database unavailable, serving public static pages");
  }

  return urls;
}
