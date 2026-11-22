import { pageMetadata } from "@/lib/seo";
import { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { editorialImages } from "@/data/editorialImages";
import { getSeason } from "@/utils/season";
import { getActiveTours } from "@/lib/tourData";

// 🌟 1. Tours ප්‍රධාන පිටුව සඳහා SEO (Dynamic Metadata)
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tours" });
  return pageMetadata(locale, "/tours", t("allTours"), t("pageSubtitle"), "/images/editorial/coast.webp");
}

type TourCardData = {
  id: string;
  title: string;
  image: string;
  price: number;
  duration: number;
  stops: string[];
  shortDescription: string;
  category: string;
};

// Tour length filter, same choices as the live site
const LENGTHS = ["5", "8", "10", "12", "14", "1", "other"] as const;
const STANDARD_LENGTHS = [1, 5, 8, 10, 12, 14];

function matchesLength(tour: TourCardData, length?: string) {
  if (!length) return true;
  if (length === "other") return !STANDARD_LENGTHS.includes(tour.duration);
  return tour.duration === Number(length);
}

// Category order on the live site: the two seasonal regions first, day tours last, the rest A–Z.
function categoryOrder([slug, name]: [string, string]) {
  if (slug === "down-south-tours") return "0";
  if (slug === "east-coast-tours") return "1";
  if (slug === "day-tours") return "3";
  return `2${name}`;
}

// 🚀 2. Main Component
export default async function ToursPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; days?: string }>;
}) {
  const { locale } = await params;
  const { category: selected, days } = await searchParams;
  const length = LENGTHS.includes(days as (typeof LENGTHS)[number]) ? days : undefined;
  const t = await getTranslations({ locale, namespace: "tours" });

  // Database එකෙන් සියලුම active tours ලබා ගැනීම (shortest first, like the live site)
  const toursRaw = await getActiveTours(locale);

  const categoryNames = new Map<string, string>();
  const tours: TourCardData[] = toursRaw.map((tour: any) => {
    // අදාළ භාෂාවට අදාළ දත්ත තෝරා ගැනීම (Fallback to English)
    const data = tour.translations?.[locale] || tour.translations?.en || {};
    const category = tour.category || "other";
    if (data.categoryName) categoryNames.set(category, data.categoryName);
    return {
      id: tour.tourId,
      title: data.title || tour.tourId,
      image: tour.image || editorialImages.coast,
      price: Number(tour.price) || 0,
      duration: Number(tour.duration) || 0,
      stops: [...new Set<string>(data.route ?? [])],
      shortDescription: data.shortDescription || "",
      category,
    };
  });
  const categories = [...categoryNames].sort((a, b) => categoryOrder(a).localeCompare(categoryOrder(b)));

  // In season now / day tours & more / off season (same months as the homepage)
  const season = getSeason();
  const seasonLabel = (slug: string) => (slug === "down-south-tours" ? t("seasonSouth") : t("seasonEast"));
  const visible = tours.filter((tour) => (!selected || tour.category === selected) && matchesLength(tour, length));
  const groups = selected
    ? [{ key: "filtered", eyebrow: "", title: categoryNames.get(selected) ?? "", months: "", items: visible }]
    : [
        { key: "season", eyebrow: t("inSeason"), title: categoryNames.get(season.inSeason) ?? "", months: seasonLabel(season.inSeason), items: visible.filter((tour) => tour.category === season.inSeason) },
        { key: "more", eyebrow: "", title: t("dayToursMore"), months: "", items: visible.filter((tour) => tour.category !== season.inSeason && tour.category !== season.offSeason) },
        { key: "off", eyebrow: t("offSeason"), title: categoryNames.get(season.offSeason) ?? "", months: seasonLabel(season.offSeason), items: visible.filter((tour) => tour.category === season.offSeason) },
      ];

  // Filter links keep the other filter's value
  const filterHref = (next: { category?: string; days?: string }) => {
    const query: Record<string, string> = {};
    const category = "category" in next ? next.category : selected;
    const daysValue = "days" in next ? next.days : length;
    if (category) query.category = category;
    if (daysValue) query.days = daysValue;
    return { pathname: "/tours" as const, query };
  };

  const chipClass = (active: boolean) =>
    `whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
      active ? "border-amber-500 bg-amber-500 text-slate-950" : "border-slate-200 bg-white text-slate-700 hover:border-amber-400 hover:text-slate-950"
    }`;

  return (
    <div className="min-h-screen bg-[#f9f7f2]">
      {/* ── Hero Section ── */}
      <section className="relative flex min-h-[55vh] items-end overflow-hidden bg-slate-950 text-white">
        <Image src={editorialImages.coast} alt="" fill priority sizes="100vw" className="object-cover opacity-80" />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/30 to-slate-950/40" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-14 pt-36">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Sri Lanka</p>
          <h1 className="font-playfair text-4xl leading-tight sm:text-6xl">{t("heading")}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">{t("pageSubtitle")}</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <h2 className="font-playfair text-3xl text-slate-900">{t("exploreTours")}</h2>
          <p className="mt-2 text-slate-600">{t("exploreDesc")}</p>
        </div>

        {/* ── Filters: category + tour length ── */}
        <nav aria-label={t("allTours")} className="-mx-6 mb-3 flex gap-2 overflow-x-auto px-6 pb-2 sm:flex-wrap">
          <Link href={filterHref({ category: undefined })} scroll={false} aria-current={!selected ? "page" : undefined} className={chipClass(!selected)}>
            {t("allTours")}
          </Link>
          {categories.map(([slug, name]) => (
            <Link key={slug} href={filterHref({ category: slug })} scroll={false} aria-current={selected === slug ? "page" : undefined} className={chipClass(selected === slug)}>
              {name}
            </Link>
          ))}
        </nav>
        <nav aria-label={t("duration")} className="-mx-6 mb-12 flex gap-2 overflow-x-auto px-6 pb-2 sm:flex-wrap">
          <Link href={filterHref({ days: undefined })} scroll={false} aria-current={!length ? "page" : undefined} className={chipClass(!length)}>
            {t("anyLength")}
          </Link>
          {LENGTHS.map((value) => (
            <Link key={value} href={filterHref({ days: value })} scroll={false} aria-current={length === value ? "page" : undefined} className={chipClass(length === value)}>
              {value === "1" ? t("oneDay") : value === "other" ? t("otherLength") : t("daysCount", { count: Number(value) })}
            </Link>
          ))}
        </nav>

        {/* ── Tours grid ── */}
        {groups
          .filter((group) => group.items.length)
          .map((group) => (
            <section key={group.key} className="mb-16">
              <div className="mb-6">
                {group.eyebrow && <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-amber-600">{group.eyebrow}</p>}
                {group.title && <h2 className="font-playfair text-3xl text-slate-900">{group.title}</h2>}
                {group.months && <p className="mt-1 text-sm font-medium text-teal-700">{group.months}</p>}
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((tour, index) => (
                  <article
                    key={tour.id}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_-18px_rgb(15_23_42/0.35)] transition-transform duration-500 hover:-translate-y-1"
                  >
                    <div className="relative aspect-16/10 overflow-hidden sm:aspect-4/3">
                      <Image
                        src={tour.image}
                        alt={tour.title}
                        fill
                        quality={60}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        // 🌟 3. LCP Fix: පළමු පින්තූරයට පමණක් priority ලබා දීම
                        priority={group === groups[0] && index === 0}
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-playfair text-xl leading-snug text-slate-900">
                        {/* Stretched link: the whole card opens the tour */}
                        <Link href={`/tours/${tour.id}`} className="after:absolute after:inset-0 focus:outline-none">
                          {tour.title}
                        </Link>
                      </h3>

                      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-500">
                        {[`${tour.duration} ${tour.duration === 1 ? t("day") : t("days")}`, tour.stops.join(", ")].filter(Boolean).join(" · ")}
                      </p>

                      {!tour.stops.length && tour.shortDescription && (
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">{tour.shortDescription}</p>
                      )}

                      <div className="mt-auto flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
                        {tour.price ? (
                          <p className="text-sm text-slate-500">
                            {t("from")} <span className="text-lg font-semibold text-amber-600">${tour.price.toLocaleString("en-US")}</span>
                          </p>
                        ) : (
                          <p className="text-sm font-medium text-teal-700">{t("priceOnRequest")}</p>
                        )}
                        <span
                          aria-hidden="true"
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-amber-500/60 text-amber-600 transition-colors group-hover:bg-amber-500 group-hover:text-slate-950"
                        >
                          <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}

        {/* ── Tailor-made call to action ── */}
        <section className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-[#102d35] p-6 text-white sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="font-playfair text-3xl">{t("cantFind")}</h2>
            <p className="mt-2 text-white/80">{t("cantFindDesc")}</p>
          </div>
          <Link href="/tailor-made-tours" className="shrink-0 rounded-full bg-amber-500 px-6 py-3 font-semibold text-slate-950 transition-colors hover:bg-amber-400">
            {t("planTailor")}
          </Link>
        </section>
      </div>
    </div>
  );
}
