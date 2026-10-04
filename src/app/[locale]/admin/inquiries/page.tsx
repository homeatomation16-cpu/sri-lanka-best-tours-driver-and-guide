import connectDB from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import { unstable_noStore as noStore } from "next/cache";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import InquiriesClient from "./InquiriesClient";

export default async function InquiriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/${locale}/login`);

  noStore();
  await connectDB();
  const raw: any[] = await Inquiry.find().sort({ createdAt: -1 }).lean();

  const items = raw.map((i) => ({
    _id: i._id.toString(),
    type: i.type,
    name: i.name || "",
    email: i.email || "",
    phone: i.phone || "",
    message: i.message || "",
    data: i.data ? JSON.parse(JSON.stringify(i.data)) : null,
    status: i.status || "new",
    internalNotes: i.internalNotes || "",
    createdAt: new Date(i.createdAt).toISOString(),
  }));

  return <InquiriesClient items={items} />;
}
