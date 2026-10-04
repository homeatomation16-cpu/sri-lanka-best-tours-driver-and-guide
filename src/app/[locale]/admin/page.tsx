import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Tour from "@/models/Tour";
import Vehicle from "@/models/Vehicle";
import Inquiry from "@/models/Inquiry";
import { unstable_noStore as noStore } from "next/cache";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { Users, Map, Car, DollarSign, Clock, ArrowRight, MessageSquare, CalendarDays, AlertCircle } from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

const statusStyle = (s: string) =>
  s === "confirmed" ? "text-emerald-400" : s === "completed" ? "text-sky-400" : s === "cancelled" ? "text-red-400" : "text-orange-400";

export default async function AdminDashboard({ params }: Props) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/${locale}/login`);

  noStore();
  await connectDB();

  const [totalTours, activeTours, totalVehicles, newInquiries, allBookings] = await Promise.all([
    Tour.countDocuments(),
    Tour.countDocuments({ status: "active" }),
    Vehicle.countDocuments(),
    Inquiry.countDocuments({ status: "new" }),
    Booking.find().sort({ createdAt: -1 }).lean(),
  ]);

  const bookings: any[] = allBookings as any[];
  const total = bookings.length;
  const pending = bookings.filter((b) => b.status === "pending");
  const confirmed = bookings.filter((b) => b.status === "confirmed" || b.status === "completed");
  const revenue = confirmed.reduce((s, b) => s + (b.totalPrice || 0), 0);
  const collected = bookings.filter((b) => b.status !== "cancelled").reduce((s, b) => s + (b.amountPaid || 0), 0);
  const conversion = total ? Math.round((confirmed.length / total) * 100) : 0;

  // last 6 months bookings
  const now = new Date();
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return { key: `${d.getFullYear()}-${d.getMonth()}`, label: d.toLocaleString("en", { month: "short" }), count: 0, revenue: 0 };
  });
  bookings.forEach((b) => {
    const d = new Date(b.createdAt);
    const m = months.find((x) => x.key === `${d.getFullYear()}-${d.getMonth()}`);
    if (m) { m.count++; if (b.status === "confirmed" || b.status === "completed") m.revenue += b.totalPrice || 0; }
  });
  const maxCount = Math.max(1, ...months.map((m) => m.count));

  // top tours
  const tally: Record<string, number> = {};
  bookings.forEach((b) => { if (b.itemName) tally[b.itemName] = (tally[b.itemName] || 0) + 1; });
  const topTours = Object.entries(tally).sort((a, b) => b[1] - a[1]).slice(0, 5);

  // upcoming confirmed trips (travel date is stored as text e.g. 2026-10-12)
  const todayStr = now.toISOString().slice(0, 10);
  const upcoming = bookings
    .filter((b) => b.status === "confirmed" && /^\d{4}-\d{2}-\d{2}/.test(b.date || "") && b.date.slice(0, 10) >= todayStr)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);

  const recent = bookings.slice(0, 6);

  return (
    <div className="p-4 md:p-8 bg-[#09090b] min-h-screen text-zinc-200">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8 mt-10 md:mt-0">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white">Dashboard</h1>
          <p className="text-zinc-500 text-sm">{now.toLocaleDateString("en", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Link href={`/${locale}/admin/tours`} className="bg-orange-600 hover:bg-orange-500 px-5 py-2.5 rounded-xl font-bold text-sm">+ Add / Edit Tours</Link>
          <Link href={`/${locale}/admin/vehicles`} className="bg-zinc-800 hover:bg-zinc-700 px-5 py-2.5 rounded-xl text-sm font-semibold">Vehicles</Link>
        </div>
      </div>

      {(pending.length > 0 || newInquiries > 0) && (
        <div className="mb-8 flex flex-wrap gap-3">
          {pending.length > 0 && (
            <Link href={`/${locale}/admin/bookings`} className="flex items-center gap-3 bg-orange-500/10 border border-orange-500/30 text-orange-300 px-5 py-3 rounded-2xl text-sm font-semibold">
              <AlertCircle size={18} /> {pending.length} booking{pending.length > 1 ? "s" : ""} waiting for your reply <ArrowRight size={14} />
            </Link>
          )}
          {newInquiries > 0 && (
            <Link href={`/${locale}/admin/inquiries`} className="flex items-center gap-3 bg-sky-500/10 border border-sky-500/30 text-sky-300 px-5 py-3 rounded-2xl text-sm font-semibold">
              <MessageSquare size={18} /> {newInquiries} new inquir{newInquiries > 1 ? "ies" : "y"} <ArrowRight size={14} />
            </Link>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <Card title="Bookings" value={total} icon={<Users size={18} />} />
        <Card title="Pending" value={pending.length} icon={<Clock size={18} />} />
        <Card title="Revenue (confirmed)" value={`$${revenue.toLocaleString()}`} icon={<DollarSign size={18} />} />
        <Card title="Collected" value={`$${collected.toLocaleString()}`} icon={<DollarSign size={18} />} />
        <Card title="Live tours" value={`${activeTours}/${totalTours}`} icon={<Map size={18} />} />
        <Card title="Vehicles" value={totalVehicles} icon={<Car size={18} />} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-zinc-900 rounded-3xl border border-zinc-800 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-white">Bookings – last 6 months</h3>
            <span className="text-xs text-zinc-500">Conversion rate <b className="text-emerald-400 text-sm">{conversion}%</b></span>
          </div>
          <div className="flex items-end gap-4 h-48">
            {months.map((m) => (
              <div key={m.key} className="flex-1 flex flex-col items-center justify-end h-full gap-2">
                <span className="text-xs font-bold text-zinc-300">{m.count}</span>
                <div className="w-full rounded-t-xl bg-gradient-to-t from-orange-700 to-orange-400" style={{ height: `${Math.max(4, (m.count / maxCount) * 100)}%` }} title={`$${m.revenue} confirmed`} />
                <span className="text-[11px] text-zinc-500 uppercase font-bold">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top tours */}
        <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6">
          <h3 className="font-bold text-white mb-5">Most requested</h3>
          {topTours.length === 0 ? <p className="text-zinc-500 text-sm">No data yet</p> : (
            <ul className="space-y-4">
              {topTours.map(([name, n]) => (
                <li key={name}>
                  <div className="flex justify-between text-sm mb-1.5"><span className="truncate pr-3 text-zinc-300">{name}</span><span className="font-bold text-orange-400">{n}</span></div>
                  <div className="h-1.5 bg-zinc-800 rounded-full"><div className="h-full bg-orange-500 rounded-full" style={{ width: `${(n / topTours[0][1]) * 100}%` }} /></div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden">
          <div className="p-6 border-b border-zinc-800 flex justify-between">
            <h3 className="font-bold text-white flex items-center gap-2"><CalendarDays size={18} className="text-orange-500" /> Upcoming trips</h3>
          </div>
          <div className="p-6">
            {upcoming.length === 0 ? <p className="text-zinc-500 text-sm">No confirmed upcoming trips</p> : upcoming.map((b) => (
              <div key={b._id.toString()} className="flex justify-between py-3 border-b border-zinc-800 last:border-0">
                <div><p className="text-white font-bold text-sm">{b.name}</p><p className="text-xs text-zinc-500">{b.itemName} · {b.people} pax{b.assignedDriver ? ` · ${b.assignedDriver}` : ""}</p></div>
                <span className="text-xs font-bold text-orange-400 whitespace-nowrap">{b.date.slice(0, 10)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden">
          <div className="p-6 border-b border-zinc-800 flex justify-between">
            <h3 className="font-bold text-white">Recent bookings</h3>
            <Link href={`/${locale}/admin/bookings`} className="text-orange-500 flex items-center gap-1 text-sm">View all <ArrowRight size={14} /></Link>
          </div>
          <div className="p-6">
            {recent.length === 0 ? <p className="text-zinc-500 text-sm">No bookings yet</p> : recent.map((b) => (
              <div key={b._id.toString()} className="flex justify-between py-3 border-b border-zinc-800 last:border-0">
                <div><p className="text-white font-bold text-sm">{b.name}</p><p className="text-xs text-zinc-500">{b.itemName}</p></div>
                <div className="text-right"><span className={`text-xs font-bold uppercase ${statusStyle(b.status)}`}>{b.status}</span>{b.totalPrice ? <p className="text-xs text-zinc-500">${b.totalPrice}</p> : null}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, icon }: { title: string; value: React.ReactNode; icon: React.ReactNode }) {
  return (
    <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800">
      <div className="mb-3 text-orange-500">{icon}</div>
      <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">{title}</p>
      <h2 className="text-2xl font-bold text-white mt-1">{value}</h2>
    </div>
  );
}
