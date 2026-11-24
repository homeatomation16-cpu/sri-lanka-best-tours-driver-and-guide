import JsonLd from "@/components/seo/JsonLd";
import { sectionBreadcrumb, pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import connectDB from "@/lib/mongodb";
import Vehicle from "@/models/Vehicle";
import VehiclesPageClient from "@/components/VehiclesPageClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "vehicles" });
  return pageMetadata(locale, "/vehicles", t("heading"), `${t("heading")}. ${t("desc")} ${t("rentalInSL")}`, "/vehicalcover.jpg");
}

export default async function VehiclesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  await connectDB();
  // Database එකෙන් වාහන සියල්ල ලබා ගැනීම
  const rawVehicles = await Vehicle.find({ status: "active" }).lean();
  
  // Serialization Fix (ObjectId ප්‍රශ්නය විසඳීමට)
  const vehicles = JSON.parse(JSON.stringify(rawVehicles));

  return (
    <>
      <JsonLd data={sectionBreadcrumb(locale, (await getTranslations({ locale, namespace: "nav" }))("home"), (await getTranslations({ locale, namespace: "nav" }))("vehicles"), "/vehicles")} />
      <VehiclesPageClient vehicles={vehicles} locale={locale} />
    </>
  );
}
