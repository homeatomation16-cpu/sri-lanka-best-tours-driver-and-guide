import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SiteContent from "@/models/SiteContent";
import { requireAdmin } from "@/lib/adminAuth";
import { DEFAULTS } from "@/lib/siteContentDefaults";
import { normalizeSection } from "@/lib/siteContentNormalize";
import { revalidatePath } from "next/cache";
import { routing } from "@/i18n/routing";

export const runtime = "nodejs";
export const maxDuration = 60; // auto-translation of many items can take a while

const KEYS = ["hero", "gallery", "tailorMade"];

/** GET /api/admin/content?key=hero  ->  { data, isDefault } */
export async function GET(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const key = new URL(req.url).searchParams.get("key") || "";
  if (!KEYS.includes(key)) return NextResponse.json({ error: "Unknown section" }, { status: 400 });

  try {
    await connectDB();
    const doc: any = await SiteContent.findOne({ key }).lean();
    if (doc?.data) return NextResponse.json({ data: doc.data, isDefault: false, updatedAt: doc.updatedAt });
    return NextResponse.json({ data: DEFAULTS[key], isDefault: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/** PUT { key, data }  -> saves, translating every changed English text into all 14 languages */
export async function PUT(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const { key, data } = await req.json();
    if (!KEYS.includes(key)) return NextResponse.json({ error: "Unknown section" }, { status: 400 });

    await connectDB();
    const existing: any = await SiteContent.findOne({ key }).lean();
    const normalized = await normalizeSection(key, data, existing?.data);

    const saved: any = await SiteContent.findOneAndUpdate({ key }, { key, data: normalized }, { upsert: true, new: true }).lean();

    // make the home page pick the change up immediately
    for (const l of routing.locales) revalidatePath(`/${l}`);
    revalidatePath("/");

    return NextResponse.json({ data: saved.data, isDefault: false });
  } catch (e: any) {
    console.error("content save failed:", e);
    return NextResponse.json({ error: e.message || "Save failed" }, { status: 500 });
  }
}

/** DELETE ?key=hero -> forget the saved version and go back to the built-in content */
export async function DELETE(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const key = new URL(req.url).searchParams.get("key") || "";
  if (!KEYS.includes(key)) return NextResponse.json({ error: "Unknown section" }, { status: 400 });
  await connectDB();
  await SiteContent.deleteOne({ key });
  for (const l of routing.locales) revalidatePath(`/${l}`);
  return NextResponse.json({ ok: true });
}
