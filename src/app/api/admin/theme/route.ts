// Admin → Theme: colour preset, custom colours and light/dark mode.
import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import connectDB from "@/lib/mongodb";
import SiteContent from "@/models/SiteContent";
import { requireAdmin } from "@/lib/adminAuth";
import { DEFAULT_THEME, normalizeTheme, THEME_TAG } from "@/lib/theme";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  await connectDB();
  const doc = await SiteContent.findOne({ key: "theme" }).lean();
  return NextResponse.json({ theme: doc?.data ? normalizeTheme(doc.data) : DEFAULT_THEME });
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
  const theme = normalizeTheme(body);
  await connectDB();
  await SiteContent.updateOne({ key: "theme" }, { $set: { data: theme } }, { upsert: true });
  revalidateTag(THEME_TAG, "max");
  revalidatePath("/", "layout");
  return NextResponse.json({ theme });
}
