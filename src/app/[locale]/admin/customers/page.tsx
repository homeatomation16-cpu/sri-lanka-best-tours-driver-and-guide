import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Inquiry from "@/models/Inquiry";
import { unstable_noStore as noStore } from "next/cache";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CustomersClient from "./CustomersClient";

export default async function CustomersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/${locale}/login`);

  noStore();
  await connectDB();
  const [bookings, inquiries]: any[] = await Promise.all([
    Booking.find().sort({ createdAt: -1 }).lean(),
    Inquiry.find().sort({ createdAt: -1 }).lean(),
  ]);

  const map = new Map<string, any>();
  const touch = (email: string, name: string, phone: string, when: Date) => {
    const key = (email || "").trim().toLowerCase();
    if (!key) return null;
    if (!map.has(key)) map.set(key, { email: key, name, phone: phone || "", bookings: [], inquiries: 0, firstSeen: when, lastSeen: when });
    const c = map.get(key);
    if (!c.phone && phone) c.phone = phone;
    if (when < c.firstSeen) c.firstSeen = when;
    if (when > c.lastSeen) { c.lastSeen = when; if (name) c.name = name; }
    return c;
  };

  bookings.forEach((b: any) => {
    const c = touch(b.email, b.name, b.phone, new Date(b.createdAt));
    c?.bookings.push({ id: b._id.toString(), item: b.itemName || "", date: b.date || "", status: b.status, total: b.totalPrice || 0, paid: b.amountPaid || 0, people: b.people || 0 });
  });
  inquiries.forEach((i: any) => {
    const c = touch(i.email, i.name, i.phone, new Date(i.createdAt));
    if (c) c.inquiries++;
  });

  const customers = Array.from(map.values()).map((c) => {
    const valid = c.bookings.filter((b: any) => b.status === "confirmed" || b.status === "completed");
    return {
      ...c,
      firstSeen: c.firstSeen.toISOString(),
      lastSeen: c.lastSeen.toISOString(),
      spent: valid.reduce((s: number, b: any) => s + b.total, 0),
      tripCount: valid.length,
    };
  }).sort((a, b) => +new Date(b.lastSeen) - +new Date(a.lastSeen));

  return <CustomersClient customers={customers} />;
}
