// src/app/[locale]/destinations/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { DESTINATIONS } from "@/data/destinations";
import PackagePrice from "@/components/PackagePrice";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DestinationData {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  location: string;
  image: string;
  bestTime?: string;
  openHours?: string;
  entryFee?: string;
}

// ─── Locale data loader ───────────────────────────────────────────────────────

const tryLoadLocale = async (
  locale: string,
  destId: string
): Promise<DestinationData | null> => {
  try {
    const mod = await import(`@/data/destinations/${locale}`);
    const raw = mod.TOURS ?? mod.default ?? [];
    const arr: DestinationData[] = Array.isArray(raw) ? raw : [raw];
    return arr.find((d) => d?.id === destId) ?? null;
  } catch {
    return null;
  }
};

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return DESTINATIONS.map((item) => ({ id: item.id }));
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function DestinationPage({
  params,
}: {
  params: { id: string; locale: string };
}) {
  const { id } = await (params as any);
  const locale = await getLocale();

  const t = await getTranslations("destinations");
  const td = await getTranslations("destinationPage");

  // Find static destination record (image, id, etc.)
  const destination = DESTINATIONS.find(
    (item) => item.id?.trim().toLowerCase() === id?.trim().toLowerCase()
  );

  if (!destination) return notFound();

  // Load translated content — fallback chain: locale → en → static data
  const localeData =
    (await tryLoadLocale(locale, id)) ??
    (locale !== "en" ? await tryLoadLocale("en", id) : null);

  // Helper: prefer locale file field, fallback to static DESTINATIONS field
  const field = <K extends keyof DestinationData>(key: K): string => {
    const fromLocale = localeData?.[key];
    if (fromLocale) return String(fromLocale);
    return String((destination as any)[key] ?? "");
  };

  const translatedTitle = field("title");
  const translatedDesc = field("description");
  const translatedLocation = field("location");
  const translatedBestTime = field("bestTime");
  const translatedOpenHours = field("openHours");
  const translatedEntryFee = field("entryFee");
  const translatedTags: string[] = localeData?.tags ?? (destination as any).tags ?? [];

  // Category translation via next-intl (with fallback)
  let translatedCategory = field("category");
  try {
    const catKey = `categories.${destination.category}` as any;
    translatedCategory = td(catKey) || translatedCategory;
  } catch {}

  const relatedDestinations = DESTINATIONS.filter(
    (item) => item.id !== destination.id
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div className="relative h-[60vh] min-h-105 overflow-hidden">
        <Image
          src={destination.image}
          alt={translatedTitle}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-stone-900/85 via-stone-900/20 to-stone-900/10" />

        {/* Breadcrumb */}
        <div className="absolute top-8 left-8 z-10">
          <nav className="flex items-center gap-2 text-xs font-medium">
            <Link
              href="/"
              className="text-white/60 hover:text-white transition-colors"
            >
              Home
            </Link>
            <span className="text-white/30">/</span>
            <Link
              href="/destinations"
              className="text-white/60 hover:text-white transition-colors"
            >
              {t("label")}
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-white/90">{translatedTitle}</span>
          </nav>
        </div>

        {/* Title block */}
        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-14 pb-10">
          {translatedCategory && (
            <p className="text-amber-400 text-xs font-bold uppercase tracking-[0.25em] mb-3">
              {translatedCategory}
            </p>
          )}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            {translatedTitle}
          </h1>
          {translatedLocation && (
            <p className="mt-3 text-white/70 text-sm flex items-center gap-2 font-medium">
              <span>📍</span>
              {translatedLocation}
            </p>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white/15 to-transparent pointer-events-none" />
      </div>

      {/* ── BODY ─────────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 md:px-10">

        {/* Divider */}
        <div className="flex items-center gap-3 py-10">
          <div className="h-px w-12 bg-amber-400" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <div className="h-px flex-1 bg-stone-100" />
        </div>

        <div className="grid md:grid-cols-[1fr_300px] gap-12 lg:gap-16 pb-20">

          {/* Left — Description */}
          <div>
            <p className="text-stone-600 text-base md:text-lg leading-[1.9] font-light">
              {translatedDesc}
            </p>

            {/* Tags */}
            {translatedTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8">
                {translatedTags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full bg-stone-100 text-stone-500 text-xs font-medium border border-stone-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                href="/tailor-made-tours"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-white font-semibold text-sm shadow-lg shadow-amber-200 hover:-translate-y-0.5 hover:shadow-amber-300 transition-all duration-200"
                style={{ background: "linear-gradient(135deg,#f59e0b,#ea580c)" }}
              >
                {td("planTourHere")}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link
                href="/destinations"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-stone-500 hover:text-stone-800 font-medium text-sm border border-stone-200 hover:border-stone-300 bg-white transition-all duration-200"
              >
                ← {t("label")}
              </Link>
            </div>
          </div>

          {/* Right — Visit info sidebar */}
          <div className="space-y-4">

            {/* Plan your visit card */}
            <div className="rounded-2xl bg-amber-50 border border-amber-100 p-6">
              <p className="text-amber-800 text-xs font-bold uppercase tracking-widest mb-4">
                {td("planYourVisit")}
              </p>
              <div className="space-y-3 text-sm text-stone-600">
                {translatedLocation && (
                  <div className="flex items-start gap-2.5">
                    <span className="shrink-0 mt-0.5">📍</span>
                    <span>{translatedLocation}</span>
                  </div>
                )}
                {translatedOpenHours && (
                  <div className="flex items-start gap-2.5">
                    <span className="shrink-0 mt-0.5">🕐</span>
                    <span>{translatedOpenHours}</span>
                  </div>
                )}
                {translatedEntryFee && (
                  <div className="flex items-start gap-2.5">
                    <span className="shrink-0 mt-0.5">🎟️</span>
                    <span>{translatedEntryFee}</span>
                  </div>
                )}
                {translatedBestTime && (
                  <div className="flex items-start gap-2.5">
                    <span className="shrink-0 mt-0.5">🌤️</span>
                    <span>
                      {td("bestTime")}: {translatedBestTime}
                    </span>
                  </div>
                )}
                {!translatedLocation &&
                  !translatedOpenHours &&
                  !translatedEntryFee && (
                    <p className="text-amber-700/60 text-xs italic">
                      {td("contactUs")}
                    </p>
                  )}
              </div>
            </div>

            {/* Call CTA card */}
            <div className="rounded-2xl bg-stone-900 p-6 text-center">
              <p className="text-white/70 text-xs mb-1">{td("needHelp")}</p>
              <p className="text-white font-semibold text-sm mb-4">
                {td("speakToSpecialist")}
              </p>
              <a
                href="tel:+94702062697"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold text-xs transition-colors"
              >
                📞 +94 702062697
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── RELATED DESTINATIONS ─────────────────────────────────────────── */}
      {relatedDestinations.length > 0 && (
        <div className="border-t border-stone-100 bg-stone-50 py-16">
          <div className="max-w-5xl mx-auto px-6 md:px-10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                {td("moreDestinations")}
              </h2>
              <Link
                href="/destinations"
                className="text-amber-600 hover:text-amber-700 text-sm font-semibold transition-colors"
              >
                {td("viewAll")} →
              </Link>
            </div>

            <div className="grid sm:grid-cols-3 gap-5">
              {await Promise.all(
                relatedDestinations.map(async (rel) => {
                  // Load translated title for related card
                  const relLocaleData = await tryLoadLocale(locale, rel.id);
                  const relTitle = relLocaleData?.title || rel.title;
                  const relLocation =
                    relLocaleData?.location || (rel as any).location || "";

                  return (
                    <Link
                      key={rel.id}
                      href={`/destinations/${rel.id}`}
                      className="group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={rel.image}
                          alt={relTitle}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                      </div>
                      <div className="px-4 py-3.5">
                        <p className="font-serif font-bold text-stone-800 text-sm group-hover:text-amber-700 transition-colors">
                          {relTitle}
                        </p>
                        {relLocation && (
                          <p className="text-stone-400 text-xs mt-0.5">
                            📍 {relLocation}
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      <PackagePrice />
    </div>
  );
}