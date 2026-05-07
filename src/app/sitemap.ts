import { MetadataRoute } from 'next';
import connectDB from "@/lib/mongodb";
import Tour from "@/models/Tour";
import Vehicle from "@/models/Vehicle";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.srilankabesttourdriverandguide.com";
  
  try {
    await connectDB();

    // 1. Tours URLs ලබා ගැනීම
    const tours = await Tour.find({ status: "active" }).select("tourId updatedAt").lean();
    const tourUrls = tours.flatMap((t: any) => [
      { url: `${baseUrl}/en/tours/${t.tourId}`, lastModified: t.updatedAt || new Date() },
      { url: `${baseUrl}/si/tours/${t.tourId}`, lastModified: t.updatedAt || new Date() },
    ]);

    // 2. Vehicles URLs ලබා ගැනීම
    const vehicles = await Vehicle.find({ status: "active" }).select("vehicleId updatedAt").lean();
    const vehicleUrls = vehicles.flatMap((v: any) => [
      { url: `${baseUrl}/en/vehicles/${v.vehicleId}`, lastModified: v.updatedAt || new Date() },
      { url: `${baseUrl}/si/vehicles/${v.vehicleId}`, lastModified: v.updatedAt || new Date() },
    ]);

    // 3. Static & Major Section Pages
    const pages = [
      "", 
      "/tours", 
      "/vehicles", 
      "/destinations", 
      "/excursions", 
      "/contact", 
      "/tailor-made-tours"
    ];

    const staticPages = pages.flatMap((page) => [
      { url: `${baseUrl}/en${page}`, lastModified: new Date() },
      { url: `${baseUrl}/si${page}`, lastModified: new Date() },
    ]);

    // සියල්ල එකතු කර ආපසු ලබා දීම
    return [...staticPages, ...tourUrls, ...vehicleUrls];
    
  } catch (error) {
    console.error("Sitemap generation error:", error);
    // Error එකක් වුණොත් අවම වශයෙන් ප්‍රධාන පිටු ටික පෙන්වීම
    return [
      { url: `${baseUrl}/en`, lastModified: new Date() },
      { url: `${baseUrl}/si`, lastModified: new Date() },
    ];
  }
}