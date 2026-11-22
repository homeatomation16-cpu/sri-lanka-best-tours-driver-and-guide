import { cache } from "react";
import connectDB from "@/lib/mongodb";
import Tour from "@/models/Tour";
import { getPricing, withPricing } from "@/lib/tourPricing";

// Tours come from MongoDB, with the bundled live-site tour files (src/data/tours/<locale>.ts) filling the gaps:
// - a tour that is only in the files (not imported yet) is shown from the files;
// - a database tour that was never updated by /api/tours/migrate (no category) is replaced by the file version.
// Once the migrate import has run, every tour comes from the database, so admin edits win.

const LOCALES = ["en", "si", "ru", "fr", "de", "it", "es", "ja", "zh", "ar", "hi", "ko", "pt", "ta"];

async function loadFileTours(locale: string): Promise<any[]> {
  const lang = LOCALES.includes(locale) ? locale : "en";
  const mod = await import(`@/data/tours/${lang}`);
  return mod.TOURS;
}

/** Shapes a file tour like a database document (translation stored under the requested locale and "en"). */
function fromFile(tour: any, locale: string) {
  const translation = {
    title: tour.title,
    shortDescription: tour.shortDescription,
    overview: tour.overview,
    categoryName: tour.category?.name ?? "",
    route: tour.route,
    itinerary: tour.itinerary,
    included: tour.included,
    excluded: tour.excluded,
    vehicleInfo: tour.vehicleInfo,
  };
  return {
    _id: tour.id,
    tourId: tour.id,
    price: tour.price,
    groupPrices: tour.groupPrices,
    currency: tour.currency,
    category: tour.category?.slug,
    image: tour.image,
    gallery: tour.gallery,
    stops: tour.stops,
    duration: tour.duration,
    maxPeople: tour.maxPeople,
    tourType: tour.tourType,
    status: "active",
    translations: { [locale]: translation, en: translation },
  };
}

const isImported = (doc: any) => Boolean(doc?.category);

/**
 * All active tours for the listing pages, in the live site's order.
 * Memoised per request: the footer and several homepage sections all ask for the same list.
 */
export const getActiveTours = cache(async (locale: string) => {
  await connectDB();
  // Only this locale's and the English (fallback) translations are read here; skipping the other
  // languages' texts and itineraries keeps the query a fraction of the full multilingual documents.
  const otherLanguages = Object.fromEntries(
    LOCALES.filter((l) => l !== locale && l !== "en").map((l) => [`translations.${l}`, 0]),
  );
  const [docs, files, pricing] = await Promise.all([Tour.find({}, otherLanguages).lean(), loadFileTours(locale), getPricing()]);
  const byId = new Map<string, any>(docs.map((doc: any) => [doc.tourId, doc]));
  const fileIds = new Set(files.map((tour) => tour.id));

  const tours = files
    .map((file) => {
      const doc = byId.get(file.id);
      if (isImported(doc)) return doc.status === "active" ? doc : null;
      return fromFile(file, locale);
    })
    .filter(Boolean);

  // Database-only tours stay visible until the import hides them (old IDs not on the live site are skipped).
  const extra = docs.filter((doc: any) => doc.status === "active" && !fileIds.has(doc.tourId) && isImported(doc));

  // The 10 round tours always show the prices from Admin → Tour pricing
  return [...tours, ...extra].map((tour: any) => withPricing(tour, pricing));
});

/** One tour for the detail page, or null. */
export const getTourById = cache(async (id: string, locale: string) => {
  await connectDB();
  const [doc, pricing]: [any, Awaited<ReturnType<typeof getPricing>>] = await Promise.all([Tour.findOne({ tourId: id }).lean(), getPricing()]);
  if (isImported(doc)) return withPricing(doc, pricing);
  const file = (await loadFileTours(locale)).find((tour) => tour.id === id);
  if (file) return withPricing(fromFile(file, locale), pricing);
  return withPricing(doc, pricing);
});
