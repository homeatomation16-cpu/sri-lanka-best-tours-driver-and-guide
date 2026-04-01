import connectDB from "@/lib/mongodb";
import Vehicle from "@/models/Vehicle";
import VehiclesHomeClient from "./VehicleshomeClient";

export default async function VehiclesSection({ locale }: { locale: string }) {
  await connectDB();
  const rawVehicles = await Vehicle.find({ status: "active" }).limit(6).lean();
  const vehicles = JSON.parse(JSON.stringify(rawVehicles));

  return <VehiclesHomeClient vehicles={vehicles} locale={locale} />;
}