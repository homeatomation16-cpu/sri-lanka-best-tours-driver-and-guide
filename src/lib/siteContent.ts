import connectDB from "@/lib/mongodb";
import SiteContent from "@/models/SiteContent";
import { unstable_noStore as noStore } from "next/cache";

export type SiteKey = "hero" | "gallery" | "tailorMade";

/** Read one editable section. Returns null if the admin has never saved it (website then uses its built-in defaults). */
export async function getSiteContent(key: SiteKey): Promise<any | null> {
  try {
    noStore();
    await connectDB();
    const doc: any = await SiteContent.findOne({ key }).lean();
    return doc?.data ?? null;
  } catch (e) {
    console.error("getSiteContent failed:", key, e);
    return null;
  }
}
