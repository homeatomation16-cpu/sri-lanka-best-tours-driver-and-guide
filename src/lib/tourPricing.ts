// Server side of the round-tour group pricing (Admin → Tour pricing).
// Source of truth: SiteContent document { key: "tourPricing" }. It is created once from the bundled tour
// files (src/data/tours/en.ts) and never overwritten by deploys or restarts; after that only the admin table changes it.
import { unstable_cache } from "next/cache";
import connectDB from "@/lib/mongodb";
import SiteContent from "@/models/SiteContent";
import { TOURS as FILE_TOURS } from "@/data/tours/en";
import { PRICED_TOURS, PRICED_TOUR_IDS, quote, toGroupPrices, validateTable, type PriceTable } from "@/lib/tourPricingCore";

export * from "@/lib/tourPricingCore";
export const PRICING_TAG = "tour-pricing";
const KEY = "tourPricing";

export type PricingChange = { tourId: string; travellers: number; from: number; to: number };
export type PricingDoc = {
  version: number;
  currency: "USD";
  prices: PriceTable;
  updatedAt: string;
  updatedBy: string;
  history: { version: number; at: string; by: string; changes: PricingChange[] }[];
};

/** Initial table from the bundled tour files (the price list supplied by the business). */
export function seedTable(): PriceTable {
  const table: PriceTable = {};
  for (const { tourId } of PRICED_TOURS) {
    const file = (FILE_TOURS as any[]).find((t) => t.id === tourId);
    table[tourId] = [...(file?.groupPrices ?? [])]
      .sort((a: any, b: any) => a.persons - b.persons)
      .map((row: any) => Math.round(Number(row.price) * 100));
  }
  const errors = validateTable(table);
  if (errors.length) throw new Error(`Bundled tour prices are incomplete: ${errors.join("; ")}`);
  return table;
}

/**
 * Reads the pricing document. Until an admin saves for the first time there is no document and the
 * bundled price list is used (version 0); nothing is written to the database just by reading.
 */
export async function loadPricing(): Promise<PricingDoc> {
  await connectDB();
  const doc: any = await SiteContent.findOne({ key: KEY }).lean();
  if (!doc) return { version: 0, currency: "USD", prices: seedTable(), updatedAt: new Date(0).toISOString(), updatedBy: "initial price list", history: [] };
  const data = doc.data as PricingDoc;
  const errors = validateTable(data?.prices);
  if (errors.length) throw new Error(`Stored tour prices are invalid: ${errors.join("; ")}`);
  return data;
}

/** Cached for page rendering; cleared when an admin saves. */
export const getPricing = unstable_cache(loadPricing, ["tour-pricing"], { tags: [PRICING_TAG], revalidate: 3600 });

/** Authoritative quote for a booking: always read fresh from the database, never from the cache. */
export async function serverQuote(tourId: string, travellers: number) {
  const pricing = await loadPricing();
  return { ...quote(pricing.prices, tourId, travellers), pricingVersion: pricing.version };
}

/** Puts the managed prices on a tour object (from the database or the files) for the 10 round tours. */
export function withPricing<T extends { tourId?: string } | null | undefined>(tour: T, pricing: PricingDoc): T {
  if (!tour?.tourId || !PRICED_TOUR_IDS.has(tour.tourId)) return tour;
  const cents = pricing.prices[tour.tourId];
  return { ...tour, groupPrices: toGroupPrices(cents), price: cents[0] / 100, currency: "USD", maxPeople: cents.length, pricingVersion: pricing.version };
}
