import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Tour from "@/models/Tour";
import Vehicle from "@/models/Vehicle";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import Link from "next/link";
import {
  Users, Map, Car, DollarSign,
  Clock, ArrowRight
} from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function AdminDashboard({ params }: Props) {
  const { locale } = await params;

  const session = await getServerSession(authOptions);
  if (!session) redirect(`/${locale}/login`);

  await connectDB();

  // 🔥 ALL DATA LOAD (FAST)
  const [
    totalBookings,
    pendingBookings,
    confirmedBookings,
    totalTours,
    totalVehicles,
    recentRaw,
    revenueData
  ] = await Promise.all([
    Booking.countDocuments(),
    Booking.countDocuments({ status: "pending" }),
    Booking.countDocuments({ status: "confirmed" }),
    Tour.countDocuments(),
    Vehicle.countDocuments(),

    Booking.find().sort({ createdAt: -1 }).limit(5).lean(),

    Booking.aggregate([
      { $match: { status: "confirmed" } },
      { $group: { _id: null, total: { $sum: "$price" } } }
    ])
  ]);

  // 🔹 Revenue
  const totalRevenue = revenueData[0]?.total || 0;

  // 🔹 Conversion Rate
  const conversionRate = totalBookings
    ? Math.round((confirmedBookings / totalBookings) * 100)
    : 0;

  // 🔹 Clean bookings
  const recentBookings = recentRaw.map((b: any) => ({
    _id: b._id.toString(),
    name: b.name || "",
    itemName: b.itemName || "",
    status: b.status || "pending",
  }));

  const statusStyle = (status: string) => {
    if (status === "confirmed") return "text-emerald-400";
    if (status === "cancelled") return "text-red-400";
    return "text-orange-400";
  };

  return (
    <div className="p-8 bg-[#09090b] min-h-screen text-zinc-200">

      {/* HEADER */}
      <h1 className="text-3xl font-serif font-bold text-white mb-10">
        Admin Dashboard
      </h1>

      {/* 🔥 STATS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12">

        <Card title="Bookings" value={totalBookings} icon={<Users />} />
        <Card title="Pending" value={pendingBookings} icon={<Clock />} />
        <Card title="Confirmed" value={confirmedBookings} icon={<Users />} />
        <Card title="Tours" value={totalTours} icon={<Map />} />
        <Card title="Vehicles" value={totalVehicles} icon={<Car />} />
        <Card title="Revenue" value={`$${totalRevenue}`} icon={<DollarSign />} />

      </div>

      {/* 🔥 CONVERSION */}
      <div className="mb-10">
        <p className="text-zinc-500 text-sm">Conversion Rate</p>
        <h2 className="text-4xl text-green-500 font-bold">
          {conversionRate}%
        </h2>
      </div>

      {/* 🔥 QUICK ACTIONS */}
      <div className="flex gap-4 mb-12 flex-wrap">

        <Link href={`/${locale}/admin/tours`}
          className="bg-orange-600 px-6 py-3 rounded-xl font-bold">
          Manage Tours
        </Link>

        <Link href={`/${locale}/admin/vehicles`}
          className="bg-zinc-800 px-6 py-3 rounded-xl">
          Manage Vehicles
        </Link>

        <Link href={`/${locale}/admin/bookings`}
          className="bg-zinc-800 px-6 py-3 rounded-xl">
          View Bookings
        </Link>

      </div>

      {/* 🔥 RECENT BOOKINGS */}
      <div className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden">

        <div className="p-6 border-b border-zinc-800 flex justify-between">
          <h3 className="font-bold text-white">Recent Bookings</h3>

          <Link href={`/${locale}/admin/bookings`}
            className="text-orange-500 flex items-center gap-1 text-sm">
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div className="p-6">
          {recentBookings.length === 0 ? (
            <p className="text-zinc-500">No bookings yet</p>
          ) : (
            recentBookings.map(b => (
              <div key={b._id}
                className="flex justify-between py-3 border-b border-zinc-800">

                <div>
                  <p className="text-white font-bold">{b.name}</p>
                  <p className="text-xs text-zinc-500">{b.itemName}</p>
                </div>

                <span className={`text-xs font-bold ${statusStyle(b.status)}`}>
                  {b.status}
                </span>

              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
}

// 🔹 CARD COMPONENT
function Card({ title, value, icon }: any) {
  return (
    <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800">
      <div className="flex justify-between mb-3 text-orange-500">
        {icon}
      </div>
      <p className="text-xs text-zinc-500 uppercase">{title}</p>
      <h2 className="text-2xl font-bold text-white">{value}</h2>
    </div>
  );
}