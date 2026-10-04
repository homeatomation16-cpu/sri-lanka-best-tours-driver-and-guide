import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PageView from "@/models/PageView";
import Booking from "@/models/Booking";
import Inquiry from "@/models/Inquiry";
import { requireAdmin } from "@/lib/adminAuth";

export const runtime = "nodejs";

/** GET ?days=30 */
export async function GET(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const days = Math.min(365, Math.max(1, Number(new URL(req.url).searchParams.get("days")) || 30));
  const now = new Date();
  const from = new Date(now.getTime() - days * 86400000);
  const prevFrom = new Date(from.getTime() - days * 86400000);

  try {
    await connectDB();
    const match = { createdAt: { $gte: from } };
    const top = (field: string, n = 8) => [
      { $match: { ...match, [field]: { $nin: ["", null] } } },
      { $group: { _id: `$${field}`, views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: n },
    ];

    const [cur, prev, daily, pages, devices, locales, referrers, countries, tours, live, bookings, inquiries] = await Promise.all([
      PageView.aggregate([{ $match: match }, { $group: { _id: null, views: { $sum: 1 }, visitors: { $addToSet: "$visitor" } } }]),
      PageView.aggregate([{ $match: { createdAt: { $gte: prevFrom, $lt: from } } }, { $group: { _id: null, views: { $sum: 1 }, visitors: { $addToSet: "$visitor" } } }]),
      PageView.aggregate([
        { $match: match },
        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, views: { $sum: 1 }, visitors: { $addToSet: "$visitor" } } },
        { $project: { views: 1, visitors: { $size: "$visitors" } } },
        { $sort: { _id: 1 } },
      ]),
      PageView.aggregate([
        { $match: match },
        { $group: { _id: "$path", views: { $sum: 1 } } },
        { $sort: { views: -1 } },
        { $limit: 10 },
      ]),
      PageView.aggregate(top("device")),
      PageView.aggregate(top("locale", 14)),
      PageView.aggregate(top("referrer")),
      PageView.aggregate(top("country")),
      PageView.aggregate([
        { $match: { ...match, path: { $regex: "^/([a-z]{2}/)?tours/[^/]+$" } } },
        { $addFields: { tour: { $arrayElemAt: [{ $split: ["$path", "/tours/"] }, 1] } } },
        { $group: { _id: "$tour", views: { $sum: 1 } } },
        { $sort: { views: -1 } },
        { $limit: 8 },
      ]),
      PageView.distinct("visitor", { createdAt: { $gte: new Date(now.getTime() - 30 * 60000) } }),
      Booking.countDocuments(match),
      Inquiry.countDocuments(match),
    ]);

    // fill days with no traffic so the chart has no gaps
    const map = new Map(daily.map((d: any) => [d._id, d]));
    const series = Array.from({ length: days }, (_, i) => {
      const d = new Date(from.getTime() + (i + 1) * 86400000).toISOString().slice(0, 10);
      const row: any = map.get(d);
      return { date: d, views: row?.views || 0, visitors: row?.visitors || 0 };
    });

    const views = cur[0]?.views || 0;
    const visitors = cur[0]?.visitors?.length || 0;
    return NextResponse.json({
      days,
      views,
      visitors,
      prevViews: prev[0]?.views || 0,
      prevVisitors: prev[0]?.visitors?.length || 0,
      liveNow: live.length,
      bookings,
      inquiries,
      conversion: visitors ? Math.round(((bookings + inquiries) / visitors) * 1000) / 10 : 0,
      series,
      pages, devices, locales, referrers, countries, tours,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
