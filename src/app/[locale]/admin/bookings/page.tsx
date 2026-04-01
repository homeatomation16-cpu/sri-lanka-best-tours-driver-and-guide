import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { unstable_noStore as noStore } from "next/cache";
import AdminDashboardClient from "./AdminDashboardClient"; // මේක bookings ෆෝල්ඩරයට copy කරගන්න හෝ path එක නිවැරදි කරන්න
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function BookingsPage({ params }: Props) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect(`/${locale}/login`); 
  }

  noStore();
  await connectDB();

  // {} අයින් කරලා find() පමණක් පාවිච්චි කරන්න (TypeScript Error එක වැලැක්වීමට)
  const raw = await Booking.find().sort({ createdAt: -1 }).lean();

  const bookings = raw.map((b: any) => ({
    _id: b._id.toString(),
    name: b.name ?? "",
    email: b.email ?? "",
    phone: b.phone ?? "",
    date: b.date ?? "",
    time: b.time ?? "", 
    itemName: b.itemName ?? "",
    bookingType: b.bookingType ?? "",
    message: b.message ?? "",
    notes: b.notes ?? "",
    status: b.status ?? "pending",
    createdAt: b.createdAt ? new Date(b.createdAt).toISOString() : "",
  }));

  return <AdminDashboardClient bookings={bookings} />;
}