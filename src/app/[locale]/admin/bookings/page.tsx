import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { unstable_noStore as noStore } from "next/cache";
import AdminDashboardClient from "./AdminDashboardClient";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function BookingsPage({ params }: Props) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/${locale}/login`);

  noStore();
  await connectDB();

  const raw = await Booking.find().sort({ createdAt: -1 }).lean();

  const bookings = raw.map((b: any) => ({
    _id: b._id.toString(),
    name: b.name ?? "",
    email: b.email ?? "",
    phone: b.phone ?? "",
    date: b.date ?? "",
    time: b.time ?? "",
    people: b.people ?? 0,
    itemName: b.itemName ?? "",
    bookingType: b.bookingType ?? "",
    message: b.message ?? "",
    internalNotes: b.internalNotes ?? "",
    totalPrice: b.totalPrice ?? 0,
    pricePerPerson: b.pricePerPerson ?? 0,
    paymentStatus: b.paymentStatus ?? "unpaid",
    amountPaid: b.amountPaid ?? 0,
    assignedDriver: b.assignedDriver ?? "",
    status: b.status ?? "pending",
    history: (b.history ?? []).map((h: any) => ({ action: h.action, at: new Date(h.at).toISOString() })),
    createdAt: b.createdAt ? new Date(b.createdAt).toISOString() : "",
  }));

  return <AdminDashboardClient bookings={bookings} />;
}
