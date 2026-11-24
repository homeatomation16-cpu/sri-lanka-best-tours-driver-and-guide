import JsonLd from "@/components/seo/JsonLd";
import { sectionBreadcrumb, pageMetadata } from "@/lib/seo";
// src/app/[locale]/destinations/page.tsx
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TOURS as EN_DESTINATIONS } from "@/data/destinations/en";
import { ListingHero, CategoryChips, ListingCards } from "@/components/site/ListingPage";

type LocalDestination = { id?: string; title?: string; description?: string; location?: string };

/** Titles/descriptions in the visitor's language (src/data/destinations/<locale>.ts). */
async function loadLocalized(locale: string): Promise<LocalDestination[]> {
  try {
    const mod = await import(`@/data/destinations/${locale}`);
    const raw = mod.TOURS ?? mod.default ?? [];
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "destinations" });
  return pageMetadata(locale, "/destinations", t("heading"), (await getTranslations({ locale, namespace: "destinationPage" }))("subtitle"), "/cover.jpg");
}

// Live-site layout: hero, category chips (?category=), destination cards.
export default async function DestinationsPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ category?: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { category } = await searchParams;
  const [t, tPage, tEx, localized] = await Promise.all([
    getTranslations({ locale, namespace: "destinations" }),
    getTranslations({ locale, namespace: "destinationPage" }),
    getTranslations({ locale, namespace: "excursions" }),
    loadLocalized(locale),
  ]);
  const tCat = (key: string) => (tPage.has(`categories.${key}`) ? tPage(`categories.${key}`) : key);

  const items = (EN_DESTINATIONS as any[]).map((d) => {
    const local = localized.find((x) => x?.id === d.id);
    return {
      key: d.category as string,
      href: `/destinations/${d.id}`,
      image: d.image,
      title: local?.title || d.title,
      category: tCat(d.category),
      text: local?.description || d.description,
      place: local?.location || d.location,
    };
  });

  const categories = [...new Map(items.map((i) => [i.key, i.category])).entries()];
  const active = categories.some(([key]) => key === category) ? category : undefined;
  const visible = items.filter((i) => !active || i.key === active);

  return (
    <div className="min-h-screen bg-[#f9f7f2]">
      <JsonLd data={sectionBreadcrumb(locale, (await getTranslations({ locale, namespace: "nav" }))("home"), (await getTranslations({ locale, namespace: "nav" }))("destinations"), "/destinations")} />
      <ListingHero image="/cover.jpg" eyebrow={t("label")} title={t("heading")} subtitle={tPage("subtitle")} />
      <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <CategoryChips basePath="/destinations" allLabel={tEx("allCategories")} categories={categories} active={active} />
        <p className="mb-6 text-sm text-slate-500" aria-live="polite">{visible.length} / {items.length}</p>
        <ListingCards items={visible} />
      </section>
    </div>
  );
}
