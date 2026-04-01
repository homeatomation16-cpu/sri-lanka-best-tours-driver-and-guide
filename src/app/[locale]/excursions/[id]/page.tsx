import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { EXCURSIONS } from "@/data/excursions";
import PackagePrice from "@/components/PackagePrice";
import BookingForm from "@/components/BookingForm";
import { contact } from "@/data/contact";
import { PhoneCallIcon } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ExcursionData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  image: string;
  duration?: string;
  pickupTime?: string;
  includes?: string[];
}

// ─── Locale data loader ───────────────────────────────────────────────────────

const tryLoadLocale = async (
  locale: string,
  excId: string
): Promise<ExcursionData | null> => {
  try {
    const mod = await import(`@/data/excursions/${locale}`);
    const raw = mod.EXCURSIONS ?? mod.default ?? [];
    const arr: ExcursionData[] = Array.isArray(raw) ? raw : [raw];
    return arr.find((e) => e?.id === excId) ?? null;
  } catch {
    return null;
  }
};

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return EXCURSIONS.map((item) => ({ id: item.id }));
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ExcursionPage({
  params,
}: {
  params: { id: string; locale: string };
}) {
  const { id } = await (params as any);
  const locale = await getLocale();

  const t  = await getTranslations("excursions");
  const te = await getTranslations("excursionPage");
  const tb = await getTranslations("booking");

  // Static record (image, id)
  const excursion = EXCURSIONS.find(
    (item) => item.id?.trim().toLowerCase() === id?.trim().toLowerCase()
  );
  if (!excursion) return notFound();

  // Translated content — fallback chain: locale → en → static
  const localeData =
    (await tryLoadLocale(locale, id)) ??
    (locale !== "en" ? await tryLoadLocale("en", id) : null);

  const field = <K extends keyof ExcursionData>(key: K): string => {
    const v = localeData?.[key];
    if (v) return String(v);
    return String((excursion as any)[key] ?? "");
  };

  const translatedTitle      = field("title");
  const translatedSubtitle   = field("subtitle");
  const translatedDesc       = field("description");
  const translatedDuration   = field("duration");
  const translatedPickupTime = field("pickupTime");
  const translatedIncludes: string[] =
    localeData?.includes ?? (excursion as any).includes ?? [];

  let translatedCategory = field("category");
  try {
    translatedCategory = te(`categories.${excursion.category}` as any) || translatedCategory;
  } catch {}

  const relatedExcursions = EXCURSIONS.filter((e) => e.id !== excursion.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#faf7f2]">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div className="relative h-[60vh] min-h-105 overflow-hidden">
        <Image
          src={excursion.image}
          alt={translatedTitle}
          fill priority sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#1a1209]/90 via-[#1a1209]/25 to-[#1a1209]/10" />

        {/* Breadcrumb */}
        <div className="absolute top-8 left-8 z-10">
          <nav className="flex items-center gap-2 text-xs font-medium">
            <Link href="/" className="text-white/60 hover:text-white transition-colors">Home</Link>
            <span className="text-white/30">/</span>
            <Link href="/excursions" className="text-white/60 hover:text-white transition-colors">
              {t("label")}
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-white/90">{translatedTitle}</span>
          </nav>
        </div>

        {/* Title block */}
        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-14 pb-10">
          {translatedCategory && (
            <p className="text-[#d4a853] text-xs font-bold uppercase tracking-[0.25em] mb-3">
              {translatedCategory}
            </p>
          )}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            {translatedTitle}
          </h1>
          {translatedSubtitle && (
            <p className="mt-3 text-white/70 text-sm flex items-center gap-2 font-medium">
              <span>🗺️</span> {translatedSubtitle}
            </p>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-[#faf7f2]/20 to-transparent pointer-events-none" />
      </div>

      {/* ── BODY ─────────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 md:px-10">

        {/* Divider */}
        <div className="flex items-center gap-3 py-10">
          <div className="h-px w-12 bg-[#d4a853]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#d4a853]" />
          <div className="h-px flex-1 bg-[#e8ddd0]" />
        </div>

        <div className="grid md:grid-cols-[1fr_320px] gap-12 lg:gap-16 pb-20">

          {/* ── Left col ─────────────────────────────────────────────────── */}
          <div>
            <p className="text-[#5c4e3d] text-base md:text-lg leading-[1.9] font-light">
              {translatedDesc}
            </p>

            {/* Includes */}
            {translatedIncludes.length > 0 && (
              <div className="mt-8">
                <p className="text-[#1a1209] text-xs font-bold uppercase tracking-widest mb-4">
                  {te("whatsIncluded")}
                </p>
                <ul className="space-y-2">
                  {translatedIncludes.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-[#5c4e3d]">
                      <span className="text-[#d4a853] text-base">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                href="/tailor-made-tours"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-white font-semibold text-sm bg-[#1a1209] shadow-lg shadow-[#d4a853]/20 hover:-translate-y-0.5 hover:shadow-[#d4a853]/40 transition-all duration-200"
              >
                {te("planCustomTour")}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/excursions"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[#5c4e3d] hover:text-[#1a1209] font-medium text-sm border border-[#e8ddd0] hover:border-[#d4a853] bg-white transition-all duration-200"
              >
                ← {t("label")}
              </Link>
            </div>

            {/* Package Price table */}
            <div className="mt-12">
              <div className="mb-4 flex items-center gap-4">
                <h3 className="font-serif text-xl font-bold text-[#1a1209]">
                  {tb("reserveYour")}
                </h3>
                <div className="h-px flex-1 bg-[#d4a853]/30" />
              </div>
              <div className="overflow-x-auto rounded-2xl border border-[#e8ddd0] bg-white shadow-sm">
                <PackagePrice />
              </div>
            </div>
          </div>

          {/* ── Right col ────────────────────────────────────────────────── */}
          <div className="space-y-4">

            {/* Info card */}
            <div className="rounded-2xl bg-[#fdf6e3] border border-[#e8ddd0] p-6">
              <p className="text-[#a07830] text-xs font-bold uppercase tracking-widest mb-4">
                {te("excursionInfo")}
              </p>
              <div className="space-y-3 text-sm text-[#5c4e3d]">
                {translatedSubtitle && (
                  <div className="flex items-start gap-2.5">
                    <span className="shrink-0 mt-0.5">🗺️</span>
                    <span>{translatedSubtitle}</span>
                  </div>
                )}
                {translatedDuration && (
                  <div className="flex items-start gap-2.5">
                    <span className="shrink-0 mt-0.5">⏱️</span>
                    <span>{translatedDuration}</span>
                  </div>
                )}
                {translatedPickupTime && (
                  <div className="flex items-start gap-2.5">
                    <span className="shrink-0 mt-0.5">🕐</span>
                    <span>{te("pickupTime")}: {translatedPickupTime}</span>
                  </div>
                )}
                {!translatedDuration && !translatedPickupTime && (
                  <p className="text-[#a07830]/60 text-xs italic">{te("contactUs")}</p>
                )}
              </div>
            </div>

            {/* Call CTA */}
            <div className="rounded-2xl bg-[#1a1209] p-6 text-center">
              <p className="text-white/70 text-xs mb-1">{te("needHelp")}</p>
              <p className="text-white font-semibold text-sm mb-4">{te("speakToSpecialist")}</p>
              <a
                href="${contact.phone}"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#d4a853] hover:bg-[#c49843] text-[#1a1209] font-bold text-xs transition-colors"
              >
                <PhoneCallIcon className="w-4 h-4" />{contact.phone}
              </a>
            </div>

            {/* Booking Form */}
            <BookingForm tour={{ title: translatedTitle }} />
          </div>
        </div>
      </div>

      {/* ── RELATED EXCURSIONS ────────────────────────────────────────────── */}
      {relatedExcursions.length > 0 && (
        <div className="border-t border-[#e8ddd0] bg-white py-16">
          <div className="max-w-5xl mx-auto px-6 md:px-10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl font-bold text-[#1a1209]">
                {te("moreExcursions")}
              </h2>
              <Link href="/excursions" className="text-[#d4a853] hover:text-[#c49843] text-sm font-semibold transition-colors">
                {te("viewAll")} →
              </Link>
            </div>

            <div className="grid sm:grid-cols-3 gap-5">
              {await Promise.all(
                relatedExcursions.map(async (rel) => {
                  const relLocaleData = await tryLoadLocale(locale, rel.id);
                  const relTitle    = relLocaleData?.title    || rel.title;
                  const relSubtitle = relLocaleData?.subtitle || (rel as any).subtitle || "";

                  return (
                    <Link
                      key={rel.id}
                      href={`/excursions/${rel.id}`}
                      className="group bg-white rounded-2xl overflow-hidden border border-[#e8ddd0] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={rel.image} alt={relTitle} fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                      </div>
                      <div className="px-4 py-3.5">
                        <p className="font-serif font-bold text-[#1a1209] text-sm group-hover:text-[#d4a853] transition-colors">
                          {relTitle}
                        </p>
                        {relSubtitle && (
                          <p className="text-[#a89880] text-xs mt-0.5">🗺️ {relSubtitle}</p>
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
    </div>
  );
}