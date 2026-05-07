// src/app/[locale]/destinations/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { DESTINATIONS } from "@/data/destinations";
import PackagePrice from "@/components/PackagePrice";
import { Metadata } from "next";

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

// ─── SEO Metadata Generator ───────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id, locale } = await params;
  
  // Static data එකෙන් මුලින්ම පින්තූරය වැනි දේ ලබා ගනිමු
  const destination = DESTINATIONS.find((item) => item.id === id);
  if (!destination) return {};

  // අදාළ locale එකෙන් විස්තර ලබා ගනිමු
  const localeData = await tryLoadLocale(locale, id);
  const title = localeData?.title || destination.title;
  const description = localeData?.description || destination.description;

  return {
    title: `${title} | Sri Lanka Travel Guide`,
    description: description.substring(0, 160), // පළමු අකුරු 160 පමණක්
    openGraph: {
      images: [destination.image],
    },
  };
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
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params; // Next.js 15 Promise Fix
  const locale = await getLocale();

  const t = await getTranslations("destinations");
  const td = await getTranslations("destinationPage");

  const destination = DESTINATIONS.find(
    (item) => item.id?.trim().toLowerCase() === id?.trim().toLowerCase()
  );

  if (!destination) return notFound();

  const localeData =
    (await tryLoadLocale(locale, id)) ??
    (locale !== "en" ? await tryLoadLocale("en", id) : null);

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
          // 🌟 Optimized sizes for performance
          sizes="(max-width: 1200px) 100vw, 1920px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-stone-900/85 via-stone-900/20 to-stone-900/10" />

        <div className="absolute top-8 left-8 z-10">
          <nav className="flex items-center gap-2 text-xs font-medium">
            <Link href="/" className="text-white/60 hover:text-white transition-colors">Home</Link>
            <span className="text-white/30">/</span>
            <Link href="/destinations" className="text-white/60 hover:text-white transition-colors">{t("label")}</Link>
            <span className="text-white/30">/</span>
            <span className="text-white/90">{translatedTitle}</span>
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-14 pb-10">
          {translatedCategory && (
            <p className="text-amber-400 text-xs font-bold uppercase tracking-[0.25em] mb-3">{translatedCategory}</p>
          )}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            {translatedTitle}
          </h1>
          {translatedLocation && (
            <p className="mt-3 text-white/70 text-sm flex items-center gap-2 font-medium">
              <span>📍</span>{translatedLocation}
            </p>
          )}
        </div>
      </div>

      {/* ── BODY ─────────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="flex items-center gap-3 py-10">
          <div className="h-px w-12 bg-amber-400" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <div className="h-px flex-1 bg-stone-100" />
        </div>

        <div className="grid md:grid-cols-[1fr_300px] gap-12 lg:gap-16 pb-20">
          {/* Left Column */}
          <div>
            <p className="text-stone-600 text-base md:text-lg leading-[1.9] font-light">
              {translatedDesc}
            </p>
            {translatedTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8">
                {translatedTags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-full bg-stone-100 text-stone-500 text-xs font-medium border border-stone-200">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="flex flex-wrap gap-4 mt-10">
              <Link href="/tailor-made-tours" className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-white font-semibold text-sm shadow-lg hover:-translate-y-0.5 transition-all duration-200" style={{ background: "linear-gradient(135deg,#f59e0b,#ea580c)" }}>
                {td("planTourHere")} →
              </Link>
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-4">
            <div className="rounded-2xl bg-amber-50 border border-amber-100 p-6">
              <p className="text-amber-800 text-xs font-bold uppercase tracking-widest mb-4">{td("planYourVisit")}</p>
              <div className="space-y-3 text-sm text-stone-600">
                {translatedLocation && <p>📍 {translatedLocation}</p>}
                {translatedOpenHours && <p>🕐 {translatedOpenHours}</p>}
                {translatedEntryFee && <p>🎟️ {translatedEntryFee}</p>}
                {translatedBestTime && <p>🌤️ {td("bestTime")}: {translatedBestTime}</p>}
              </div>
            </div>
            <div className="rounded-2xl bg-stone-900 p-6 text-center text-white">
              <p className="text-xs opacity-70 mb-1">{td("needHelp")}</p>
              <a href="tel:+94702062697" className="block mt-4 px-5 py-2.5 rounded-full bg-amber-500 text-stone-900 font-bold text-xs tracking-tight">
                📞 CALL SPECIALIST
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── RELATED SECTION ── */}
      {relatedDestinations.length > 0 && (
        <div className="border-t border-stone-100 bg-stone-50 py-16">
          <div className="max-w-5xl mx-auto px-6 md:px-10">
             <h2 className="font-serif text-2xl font-bold text-stone-900 mb-8">{td("moreDestinations")}</h2>
             <div className="grid sm:grid-cols-3 gap-5">
                {await Promise.all(relatedDestinations.map(async (rel) => {
                   const relLocaleData = await tryLoadLocale(locale, rel.id);
                   return (
                    <Link key={rel.id} href={`/destinations/${rel.id}`} className="group bg-white rounded-2xl overflow-hidden border shadow-sm">
                      <div className="relative h-40 overflow-hidden">
                        <Image src={rel.image} alt={rel.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      </div>
                      <div className="p-4">
                        <p className="font-serif font-bold text-stone-800 text-sm">{relLocaleData?.title || rel.title}</p>
                        <p className="text-stone-400 text-xs mt-1">📍 {relLocaleData?.location || rel.location}</p>
                      </div>
                    </Link>
                   )
                }))}
             </div>
          </div>
        </div>
      )}
      <PackagePrice />
    </div>
  );
}