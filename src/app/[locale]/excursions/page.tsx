import JsonLd from "@/components/seo/JsonLd";
import { sectionBreadcrumb, pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { EXCURSIONS } from "@/data/excursions";
import { EXCURSION_DETAILS } from "@/data/excursionDetails";
import { ListingHero, CategoryChips, ListingCards } from "@/components/site/ListingPage";

type LocalExcursion = { id: string; title?: string; subtitle?: string; category?: string; description?: string };

async function loadLocalized(locale: string): Promise<LocalExcursion[]> {
  try {
    const mod = await import(`@/data/excursions/${locale}`);
    return mod.EXCURSIONS ?? [];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "excursions" });
  return pageMetadata(locale, "/excursions", t("label"), t("subtitle"), "/excursions-cover.jpg");
}

// Live-site layout: hero, category chips (?category=), cards sorted A–Z.
export default async function ExcursionsPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ category?: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { category } = await searchParams;
  const [t, localized] = await Promise.all([getTranslations({ locale, namespace: "excursions" }), loadLocalized(locale)]);

  const items = EXCURSIONS.map((e) => {
    const local = localized.find((x) => x.id === e.id);
    // Short text: the live site's opening paragraph in English, the translated description elsewhere
    const english = EXCURSION_DETAILS[e.id]?.description.split("\n")[0];
    return {
      key: e.category,
      categoryName: local?.category || e.category,
      href: `/excursions/${e.id}`,
      image: e.image,
      title: local?.title || e.title,
      text: (locale === "en" && english) || local?.description || e.description,
      place: local?.subtitle || e.subtitle,
    };
  });

  const categories = [...new Map(items.map((i) => [i.key, i.categoryName])).entries()].sort((a, b) => a[1].localeCompare(b[1], locale));
  const active = categories.some(([key]) => key === category) ? category : undefined;
  const visible = items
    .filter((i) => !active || i.key === active)
    .sort((a, b) => a.title.localeCompare(b.title, locale))
    .map((i) => ({ ...i, category: i.categoryName }));

  return (
    <div className="min-h-screen bg-[#f9f7f2]">
      <JsonLd data={sectionBreadcrumb(locale, (await getTranslations({ locale, namespace: "nav" }))("home"), (await getTranslations({ locale, namespace: "nav" }))("excursions"), "/excursions")} />
      <ListingHero image="/excursions-cover.jpg" eyebrow={t("label")} title={t("title")} subtitle={t("subtitle")} />
      <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <CategoryChips basePath="/excursions" allLabel={t("allCategories")} categories={categories} active={active} />
        <div className="mt-6">
          <ListingCards items={visible} />
        </div>
      </section>
    </div>
  );
}
