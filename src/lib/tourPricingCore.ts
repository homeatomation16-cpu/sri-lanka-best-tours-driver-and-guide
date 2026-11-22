// Round-tour group pricing: pure rules shared by the browser, the server and the tests (no imports on purpose).
// Each price is the TOTAL for the whole group in USD, stored as integer cents. Never multiply it by the travellers.

export const PRICING_CURRENCY = "USD";
export const MAX_TRAVELLERS = 10;
/** Largest single cell allowed in the admin table ($100,000), to catch typing mistakes. */
export const MAX_PRICE_CENTS = 10_000_000;

/** The 10 round tours (without hotels) that use the group price table, in table order. */
export const PRICED_TOURS: { tourId: string; name: string }[] = [
  { tourId: "05-days-down-south", name: "Down South 5 Days" },
  { tourId: "05-days-east-coast", name: "East Coast 5 Days" },
  { tourId: "08-days-down-south", name: "Down South 8 Days" },
  { tourId: "08-days-east-coast", name: "East Coast 8 Days" },
  { tourId: "10-days-down-south", name: "Down South 10 Days" },
  { tourId: "10-days-east-coast", name: "East Coast 10 Days" },
  { tourId: "12-days-down-south", name: "Down South 12 Days" },
  { tourId: "12-days-east-coast", name: "East Coast 12 Days" },
  { tourId: "14-days-down-south", name: "Down South 14 Days" },
  { tourId: "14-days-east-coast", name: "East Coast 14 Days" },
];
export const PRICED_TOUR_IDS: ReadonlySet<string> = new Set(PRICED_TOURS.map((t) => t.tourId));

export type Vehicle = "Sedan Car" | "KDH Flatroof" | "KDH Highroof";
/** tourId → 10 group totals in cents (index 0 = 1 traveller). */
export type PriceTable = Record<string, number[]>;

export function isValidTravellers(n: unknown): n is number {
  return typeof n === "number" && Number.isInteger(n) && n >= 1 && n <= MAX_TRAVELLERS;
}

/** 1–3 Sedan Car, 4–6 KDH Flatroof, 7–10 KDH Highroof. */
export function vehicleFor(travellers: number): Vehicle {
  if (!isValidTravellers(travellers)) throw new RangeError("Travellers must be a whole number from 1 to 10");
  return travellers <= 3 ? "Sedan Car" : travellers <= 6 ? "KDH Flatroof" : "KDH Highroof";
}

export function isValidCents(v: unknown): v is number {
  return typeof v === "number" && Number.isSafeInteger(v) && v > 0 && v <= MAX_PRICE_CENTS;
}

/**
 * Parses what an admin typed ("450", "$1,020.50") into cents. Returns null for anything else
 * (empty, negative, more than 2 decimals, letters, zero).
 */
export function parseUsdInput(input: string): number | null {
  const s = String(input).trim().replace(/^\$/, "").replace(/,/g, "");
  if (!/^\d{1,6}(\.\d{1,2})?$/.test(s)) return null;
  const [whole, frac = ""] = s.split(".");
  const cents = Number(whole) * 100 + Number(frac.padEnd(2, "0"));
  return isValidCents(cents) ? cents : null;
}

/** "$1,020.00" */
export function formatUsd(cents: number): string {
  return `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export type Quote = {
  tourId: string;
  travellers: number;
  vehicle: Vehicle;
  totalCents: number;
  /** Display only (rounded to the cent); the total stays exact. */
  perPersonCents: number;
  currency: "USD";
};

/** Exact group total for one tour and traveller count. Throws on an unknown tour, bad count or missing price. */
export function quote(table: PriceTable, tourId: string, travellers: number): Quote {
  if (!PRICED_TOUR_IDS.has(tourId)) throw new RangeError("Unknown package");
  if (!isValidTravellers(travellers)) throw new RangeError("Travellers must be a whole number from 1 to 10");
  const totalCents = table[tourId]?.[travellers - 1];
  if (!isValidCents(totalCents)) throw new RangeError("Price missing for this group size");
  return {
    tourId,
    travellers,
    vehicle: vehicleFor(travellers),
    totalCents,
    perPersonCents: Math.round(totalCents / travellers),
    currency: "USD",
  };
}

/** Checks a whole table: every priced tour present with exactly 10 valid prices, nothing else. Returns error messages. */
export function validateTable(table: unknown): string[] {
  const errors: string[] = [];
  if (!table || typeof table !== "object" || Array.isArray(table)) return ["Price table must be an object"];
  const t = table as Record<string, unknown>;
  for (const key of Object.keys(t)) if (!PRICED_TOUR_IDS.has(key)) errors.push(`Unknown package: ${key}`);
  for (const { tourId, name } of PRICED_TOURS) {
    const row = t[tourId];
    if (!Array.isArray(row) || row.length !== MAX_TRAVELLERS) {
      errors.push(`${name}: needs exactly ${MAX_TRAVELLERS} prices`);
      continue;
    }
    row.forEach((v, i) => {
      if (!isValidCents(v)) errors.push(`${name}, ${i + 1} traveller${i ? "s" : ""}: invalid price`);
    });
  }
  return errors;
}

/** Price rows in the shape the tour pages and booking form already use (dollars). */
export function toGroupPrices(cents: number[]) {
  return cents.map((c, i) => ({ persons: i + 1, price: c / 100, vehicle: vehicleFor(i + 1) }));
}
