// Admin → Tour pricing: read and save the group price table (USD cents) for the 10 round tours.
import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import SiteContent from "@/models/SiteContent";
import { requireAdmin } from "@/lib/adminAuth";
import { loadPricing, PRICED_TOURS, PRICING_TAG, validateTable, type PriceTable, type PricingChange } from "@/lib/tourPricing";

export const dynamic = "force-dynamic";
const HISTORY_LIMIT = 50;

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const pricing = await loadPricing();
    return NextResponse.json({ pricing, tours: PRICED_TOURS });
  } catch (error) {
    console.error("Pricing load failed:", error);
    return NextResponse.json({ error: "Could not load prices" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const version = body?.version;
  if (!Number.isInteger(version) || version < 0) return NextResponse.json({ error: "Missing table version" }, { status: 400 });

  // Only the known packages are read from the request (no other keys can reach the database)
  const prices: PriceTable = {};
  for (const { tourId } of PRICED_TOURS) prices[tourId] = Array.isArray(body?.prices?.[tourId]) ? [...body.prices[tourId]] : [];
  const extra = Object.keys(body?.prices ?? {}).filter((k) => !prices[k]);
  const errors = [...validateTable(prices), ...extra.map((k) => `Unknown package: ${k}`)];
  if (errors.length) return NextResponse.json({ error: "Invalid prices", details: errors }, { status: 400 });

  try {
    const current = await loadPricing();
    const changes: PricingChange[] = [];
    for (const { tourId } of PRICED_TOURS) {
      prices[tourId].forEach((to, i) => {
        const from = current.prices[tourId][i];
        if (from !== to) changes.push({ tourId, travellers: i + 1, from, to });
      });
    }
    if (!changes.length) return NextResponse.json({ pricing: current, changed: 0 });

    const session = await getServerSession(authOptions);
    const by = session?.user?.email || session?.user?.name || "admin";
    const at = new Date().toISOString();

    // Optimistic lock: only saves when nobody else saved since this admin loaded the table
    await connectDB();
    const entry = { version: version + 1, at, by, changes };
    let updated: any;
    if (version === 0) {
      // First save creates the document; if another admin created it meanwhile, nothing is overwritten
      const data = { version: 1, currency: "USD", prices, updatedAt: at, updatedBy: by, history: [entry] };
      const res = await SiteContent.updateOne({ key: "tourPricing" }, { $setOnInsert: { key: "tourPricing", data } }, { upsert: true }).catch((e: any) => {
        if (e?.code === 11000) return { upsertedCount: 0 };
        throw e;
      });
      updated = res.upsertedCount === 1 ? { data } : null;
    } else {
      updated = await SiteContent.findOneAndUpdate(
        { key: "tourPricing", "data.version": version },
        {
          $set: { "data.prices": prices, "data.version": version + 1, "data.updatedAt": at, "data.updatedBy": by, "data.currency": "USD" },
          $push: { "data.history": { $each: [entry], $position: 0, $slice: HISTORY_LIMIT } },
        },
        { returnDocument: "after" },
      ).lean();
    }
    if (!updated) {
      return NextResponse.json({ error: "conflict", message: "Someone else saved the prices after you opened this page. Reload to see their changes." }, { status: 409 });
    }

    revalidateTag(PRICING_TAG, "max");
    revalidatePath("/", "layout");
    return NextResponse.json({ pricing: updated.data, changed: changes.length });
  } catch (error) {
    console.error("Pricing save failed:", error);
    return NextResponse.json({ error: "Saving failed" }, { status: 500 });
  }
}
