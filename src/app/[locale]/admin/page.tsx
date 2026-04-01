import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Tour from "@/models/Tour";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { Users, Map, Clock, ArrowRight } from "lucide-react";

export default async function AdminDashboard({ params }: any) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/${locale}/login`);

  await connectDB();
  
  // දත්ත සාරාංශය ලබා ගැනීම
  const [totalBookings, pendingBookings, totalTours] = await Promise.all([
    Booking.countDocuments(),
    Booking.countDocuments({ status: "pending" }),
    Tour.countDocuments()
  ]);

  // අන්තිමට ආපු බුකින් 5 විතරක් ගමු
  const recentBookings = await Booking.find().sort({ createdAt: -1 }).limit(5).lean();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-serif font-bold text-white mb-8">Welcome, Admin!</h1>
      
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
          <Users className="text-orange-500 mb-4" size={32} />
          <p className="text-zinc-500 text-xs uppercase font-bold">Total Bookings</p>
          <h2 className="text-4xl font-bold text-white">{totalBookings}</h2>
        </div>
        
        <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
          <Clock className="text-amber-500 mb-4" size={32} />
          <p className="text-zinc-500 text-xs uppercase font-bold">Pending Requests</p>
          <h2 className="text-4xl font-bold text-white">{pendingBookings}</h2>
        </div>

        <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
          <Map className="text-blue-500 mb-4" size={32} />
          <p className="text-zinc-500 text-xs uppercase font-bold">Active Tours</p>
          <h2 className="text-4xl font-bold text-white">{totalTours}</h2>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
          <h3 className="text-lg font-bold text-amber-50">Recent Bookings</h3>
          <Link href={`/${locale}/admin/bookings`} className="text-orange-500 text-sm flex items-center gap-1 hover:underline">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="p-6">
          {recentBookings.map((b: any) => (
            <div key={b._id} className="flex justify-between items-center py-3 border-b border-zinc-800 last:border-0">
              <div>
                <p className="font-bold text-zinc-200">{b.name}</p>
                <p className="text-xs text-zinc-500">{b.itemName || "Inquiry"}</p>
              </div>
              <span className={`text-[10px] px-3 py-1 rounded-full uppercase font-bold ${b.status === 'pending' ? 'bg-orange-500/10 text-orange-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                {b.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}