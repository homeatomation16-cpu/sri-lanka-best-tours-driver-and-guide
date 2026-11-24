import CinematicHeading from "@/components/cinematic/CinematicHeading";
import CinematicSection from "@/components/cinematic/CinematicSection";
import { homeTourImages } from "@/data/editorialImages";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ArrowUpRight, CalendarCheck, Check, Clock, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { getActiveTours } from "@/lib/tourData";
import { getSeason } from "@/utils/season";

export default async function ToursSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "tours" });
  const tHome = await getTranslations({ locale, namespace: "home" });

  // From November to June the Seasonal section above already shows these three Down South tours,
  // so this section shows their "with hotels" versions instead of repeating the same cards.
  const suffix = getSeason().isEastCoastSeason ? "" : "-hotels";
  const wanted = ["05-days-down-south", "08-days-down-south", "10-days-down-south"].map((id) => id + suffix);
  const downSouthTours = (await getActiveTours(locale)).filter((tour: any) => wanted.includes(tour.tourId));

  return (
    <CinematicSection key={locale + downSouthTours.map((tour) => tour.tourId).join(",")} className="featured-tours-section py-10 sm:py-14 relative isolate overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div data-rise3d="self" className="mb-8 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="mb-3 text-base font-semibold text-orange-700">{t("sectionLabel")}</p>
            <CinematicHeading className="font-playfair text-4xl leading-tight text-slate-900 sm:text-5xl">{t("heading")}</CinematicHeading>
          </div>
          <div>
            <p className="mb-3 font-semibold text-orange-700">{t("season")}</p>
            <p className="max-w-xl leading-relaxed text-slate-600">{t("seasonDesc")}</p>
          </div>
        </div>

        <div className="package-story-grid" data-rise3d>
          {downSouthTours.map((tour: any) => {
            const data = tour.translations?.[locale] || tour.translations?.en;
            // Highlights: the first three itinerary stops, without the "Day 1 -" prefix.
            const highlights: string[] = (data?.itinerary ?? [])
              .map((day: any) => String(day?.title ?? "").replace(/^\s*(day|tag|día|jour|giorno|dia|день)?\s*[\d\s,–-]+[-–:]\s*/i, "").trim())
              .filter(Boolean)
              .slice(0, 3);
            return (
              <div key={tour.tourId} className="package-story-frame">
                <Link href={`/tours/${tour.tourId}`} className="package-story-card group" data-drift>
                  <div className="cine-image-plane" data-drift-layer>
                    <Image src={homeTourImages[tour.tourId] || tour.image} alt={data?.title || "Sri Lanka tour"} fill quality={60} sizes="(max-width: 768px) 100vw, 55vw" className="travel-card-image object-cover" />
                  </div>
                  <div className="package-story-shade" />
                  <span className="package-duration"><Clock size={15} aria-hidden="true" />{tour.duration} {tour.duration > 1 ? t("days") : t("day")}</span>
                  <div className="package-story-copy">
                    <h3 className="font-playfair text-3xl leading-tight sm:text-4xl">{data?.title}</h3>
                    <p className="mt-3 inline-flex items-center gap-2 text-sm text-white/85"><Users size={16} aria-hidden="true" />{t("maxPeople", { count: tour.maxPeople || 10 })}</p>
                    {highlights.length > 0 && (
                      <ul className="package-highlights" aria-label={tHome("highlights")}>
                        {highlights.map((h) => <li key={h}><Check size={14} aria-hidden="true" />{h}</li>)}
                      </ul>
                    )}
                    <div className="mt-5 flex items-end justify-between gap-5 border-t border-white/30 pt-4">
                      <div><p className="text-xs text-white/80">{t("from")}</p><p className="mt-1 text-2xl font-semibold text-amber-200">{tour.price > 0 ? `$${tour.price}` : t("priceOnRequest")}</p></div>
                      <span className="package-story-action"><span className="text-sm font-medium">{t("viewDetails")}</span><ArrowUpRight size={24} aria-hidden="true" /></span>
                    </div>
                  </div>
                </Link>
                {/* Separate link (not nested in the card link): straight to the booking form */}
                <Link href={`/tours/${tour.tourId}#book`} className="package-book">
                  <CalendarCheck size={16} aria-hidden="true" />{tHome("bookNow")}
                </Link>
              </div>
            );
          })}
        </div>
        {/* extra room on phones: the last floating tour card would otherwise cover the top of the button */}
        <div className="mt-16 flex justify-center sm:mt-8">
          <Link href="/tours" className="home-section-link">
            {t("viewAll")} <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </CinematicSection>
  );
}
