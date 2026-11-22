// Admin → Site settings: contact details and social links used across the website and in e-mails.
import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import connectDB from "@/lib/mongodb";
import SiteContent from "@/models/SiteContent";
import { requireAdmin } from "@/lib/adminAuth";
import { DEFAULT_SETTINGS, normalizeSettings } from "@/lib/siteSettingsDefaults";
import { SETTINGS_TAG } from "@/lib/siteSettings";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  await connectDB();
  const doc = await SiteContent.findOne({ key: "settings" }).lean();
  return NextResponse.json({ settings: doc?.data ? normalizeSettings(doc.data) : DEFAULT_SETTINGS, defaults: DEFAULT_SETTINGS });
}

export async function PUT(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const settings = normalizeSettings(body);
  await connectDB();
  await SiteContent.updateOne({ key: "settings" }, { $set: { data: settings } }, { upsert: true });
  revalidateTag(SETTINGS_TAG, "max");
  revalidatePath("/", "layout");
  return NextResponse.json({ settings });
}
