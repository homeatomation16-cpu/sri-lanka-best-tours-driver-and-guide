// src/app/[locale]/page.tsx
import HeroVideo from "../../components/HeroVideo";
import Destinations from "../../components/Destinations";
import SeasonalTours from "../../components/SeasonalTours";
import OneDayTours from "../../components/OneDayTours";
import SpecialOffer from "../../components/SpecialOffer";
import TailorMade from "../../components/TailorMade";
import WhyUs from "../../components/WhyUs";
import Testimonials from "../../components/Testimonials";
import Gallery from "../../components/Gallery";
import VehiclesSection from "../../components/Vehicle";
import Tours from "../../components/Tours";

export default function HomePage() {
  return (
    <div className="relative bg-white">
      {/* HERO */}
      <div className="relative">
        <HeroVideo />
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-white/90 via-white/40 to-transparent shadow-xl" />
      </div>

      {/* SECTIONS */}
      <Tours />
      <SeasonalTours />
      <OneDayTours />
      <VehiclesSection />
      <WhyUs />
      <Destinations />
      <Testimonials />
      <SpecialOffer />
      <TailorMade />
      <Gallery />
    </div>
  );
}
