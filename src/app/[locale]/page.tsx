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

  return (
    <div className="relative bg-white">
      {/* HERO - Loads instantly, never blocked by database */}
      <div className="relative">
        <HeroVideo />
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
      <Gallery />
    </div>
  );
}