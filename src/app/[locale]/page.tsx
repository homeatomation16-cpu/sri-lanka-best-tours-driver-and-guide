// src/app/[locale]/page.tsx
import { Suspense } from "react";
import HeroVideo from "@/components/HeroVideo";
import Destinations from "@/components/Destinations";
import SeasonalTours from "@/components/SeasonalTours";
import OneDayTours from "@/components/OneDayTours";
import SpecialOffer from "@/components/SpecialOffer";
import TailorMade from "@/components/TailorMade";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import VehiclesSection from "@/components/VehiclesSection";
import Tours from "@/components/Tours";
import { getSiteContent } from "@/lib/siteContent";
import { pick } from "@/lib/autoTranslate";

// A sleek loading skeleton to show while MongoDB fetches data
function SectionLoader() {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center bg-zinc-50/50">
      <div className="w-10 h-10 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
      <p className="mt-4 text-sm font-medium text-zinc-400 uppercase tracking-widest animate-pulse">
        Loading Experiences...
      </p>
    </div>
  );
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

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
    <div className="relative bg-white">
      {/* HERO - Loads instantly, never blocked by database */}
      <div className="relative">
        <HeroVideo slides={heroSlides.length ? heroSlides : undefined} />
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-white/90 via-white/40 to-transparent shadow-xl" />
      </div>

      {/* DB-HEAVY SECTIONS - Wrapped in Suspense to prevent server blocking */}
      <Suspense fallback={<SectionLoader />}>
        <Tours locale={locale} />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <SeasonalTours locale={locale} />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <OneDayTours locale={locale} />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <VehiclesSection locale={locale} />
      </Suspense>

      {/* STATIC SECTIONS - Usually don't need Suspense unless they hit external APIs */}
      <WhyUs />
      <Destinations />
      <Testimonials />
      <SpecialOffer />
      <TailorMade />
      <Gallery items={galleryItems} heading={galleryHeading} />
    </div>
  );
}