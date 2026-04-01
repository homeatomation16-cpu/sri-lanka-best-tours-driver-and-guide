import connectDB from "@/lib/mongodb";
import Vehicle from "@/models/Vehicle";
import VehiclesPageClient from "@/components/VehiclesPageClient";

export default async function VehiclesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  await connectDB();
  // Database එකෙන් වාහන සියල්ල ලබා ගැනීම
  const rawVehicles = await Vehicle.find({ status: "active" }).lean();
  
  // Serialization Fix (ObjectId ප්‍රශ්නය විසඳීමට)
  const vehicles = JSON.parse(JSON.stringify(rawVehicles));

  return <VehiclesPageClient vehicles={vehicles} locale={locale} />;
}