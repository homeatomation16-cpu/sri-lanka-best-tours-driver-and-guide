import Sidebar from "@/components/admin/Sidebar";
import { ToastProvider } from "@/components/admin/Toast";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Inquiry from "@/models/Inquiry";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const session = await getServerSession(authOptions);
  if (!session) redirect(`/${locale}/login`);

  let newInquiries = 0;
  let pendingBookings = 0;
  try {
    await connectDB();
    [newInquiries, pendingBookings] = await Promise.all([
      Inquiry.countDocuments({ status: "new" }),
      Booking.countDocuments({ status: "pending" }),
    ]);
  } catch {}

  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-[#09090b]">
        <Sidebar locale={locale} newInquiries={newInquiries} pendingBookings={pendingBookings} />
        <div className="flex-1 min-w-0 overflow-y-auto pt-24 md:pt-24">{children}</div>
      </div>
    </ToastProvider>
  );
}
