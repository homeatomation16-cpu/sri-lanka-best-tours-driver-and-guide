import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  await connectDB();
  const items = await Inquiry.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(items);
}
