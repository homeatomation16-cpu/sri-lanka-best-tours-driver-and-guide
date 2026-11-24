// src/app/[locale]/page.tsx
import type { Metadata, ResolvingMetadata } from "next";
import { pageMetadata, siteName } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import HeroVideo from "@/components/HeroVideo";
import ExperienceExplorer from "@/components/ExperienceExplorer";
import SeasonalTours from "@/components/SeasonalTours";
import OneDayTours from "@/components/OneDayTours";
import SpecialOffer from "@/components/SpecialOffer";
import TailorMade from "@/components/TailorMade";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import TourCollections from "@/components/home/TourCollections";
import Tours from "@/components/Tours";
import PhotoCredits from "@/components/PhotoCredits";
import CinematicScroll from "@/components/cinematic/CinematicScroll";
import { CloudBridge, AscentScene, DescentScene } from "@/components/cinematic/CinematicScenes";
import ExperienceIcons from "@/components/home/ExperienceIcons";
import TopDestinations from "@/components/home/TopDestinations";
import SriLankaMap from "@/components/home/SriLankaMap";
import StatsCounters from "@/components/home/StatsCounters";
import ContactSection from "@/components/home/ContactSection";
import { getSiteContent } from "@/lib/siteContent";
import { pick } from "@/lib/autoTranslate";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }, parent: ResolvingMetadata): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  const inherited = await parent;
  return pageMetadata(locale, "", inherited.title?.absolute || siteName, inherited.description || t("subtitle"), undefined, { brand: false });
}

// Re-render daily so the seasonal packages follow the current month.
export const revalidate = 86400;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Hero + gallery are editable in Admin → Website Content (text auto-translated).
  const [heroData, galleryData] = await Promise.all([getSiteContent("hero"), getSiteContent("gallery")]);

  const heroSlides = (heroData?.items || [])
    .filter((i: any) => i.enabled !== false && i.src)
    .map((i: any) => ({ type: i.type, src: i.src, poster: i.poster, title: pick(i.title, locale), subtitle: pick(i.subtitle, locale) }));

  const galleryItems = galleryData
    ? (galleryData.items || [])
        .filter((i: any) => i.enabled !== false && i.src)
        .map((i: any) => ({ src: i.src, alt: pick(i.alt, locale), caption: pick(i.caption, locale) }))
    : undefined;
  const galleryHeading = galleryData?.heading
    ? { label: pick(galleryData.heading.label, locale), title: pick(galleryData.heading.title, locale) }
    : undefined;

  return (
    <CinematicScroll>
    <div className="relative bg-white">
      {/* HERO - Loads instantly, never blocked by database */}
      <div className="relative">
        <HeroVideo slides={heroSlides.length ? heroSlides : undefined} />

      </div>

      <CloudBridge />
      <AscentScene />
        <SeasonalTours locale={locale} />

      <ExperienceExplorer />

      {/* NEW: activity icon cards + top destinations grid */}
      <ExperienceIcons locale={locale} />
      <TopDestinations locale={locale} />
      <SriLankaMap locale={locale} />

      {/* Database sections render on the server (the page is static and revalidated daily), so their content is in the HTML */}
        <Tours locale={locale} />


      <TailorMade />
        <OneDayTours locale={locale} />
        <TourCollections locale={locale} />

      {/* NEW: animated number counters (figures in src/data/homeStats.ts) */}
      <StatsCounters />

      {/* STATIC SECTIONS - Usually don't need Suspense unless they hit external APIs */}
      <DescentScene />
      <WhyUs />
      <Testimonials />
      <SpecialOffer />
      <Gallery items={galleryItems} heading={galleryHeading} />
      {/* NEW: enquiry form (posts to /api/contact) */}
      <ContactSection />
      <PhotoCredits />
    </div>
    </CinematicScroll>
  );
}
