import CinematicHeading from "@/components/cinematic/CinematicHeading";
import CinematicSection from "@/components/cinematic/CinematicSection";
import { editorialImages, homeTourImages } from "@/data/editorialImages";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Clock, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { getActiveTours } from "@/lib/tourData";
import { getSeason } from "@/utils/season";

export default async function SeasonalTours({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "seasonal" });
  const tCommon = await getTranslations({ locale, namespace: "tours" });

  // Show the packages for the current season in Sri Lanka (same months as the tours page)
  const { isEastCoastSeason } = getSeason();
  const region = isEastCoastSeason ? "east-coast" : "down-south";
  const seasonLabel = `(${isEastCoastSeason ? tCommon("seasonEast") : tCommon("seasonSouth")})`;

  const wanted = [`05-days-${region}`, `08-days-${region}`, `10-days-${region}`];
  const eastCoastTours = (await getActiveTours(locale)).filter((tour: any) => wanted.includes(tour.tourId));

  return (
    <CinematicSection key={locale + eastCoastTours.map((tour) => tour.tourId).join(",")} className="seasonal-section home-section-spacing relative isolate overflow-hidden">
      <div className="seasonal-scenery pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0" data-parallax="0.06">
        <Image src={editorialImages.pasikudahAerial} alt="" fill sizes="100vw" className="object-cover" />
        </div>
      </div>
      <div className="relative mx-auto max-w-7xl px-6">
        <div data-rise3d="self" className="seasonal-heading mb-10 flex flex-col justify-between gap-6 rounded-3xl p-6 sm:p-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 font-semibold text-teal-800">{t("label")}</p>
            <CinematicHeading className="font-playfair text-4xl leading-tight text-slate-900 sm:text-5xl">{t("heading")}</CinematicHeading>
            <p className="mt-3 font-semibold text-teal-800">{seasonLabel}</p>
            <p className="mt-4 max-w-xl leading-relaxed text-slate-600">{t("description")}</p>
          </div>
          <Link href="/tours" className="home-section-link shrink-0 self-start lg:self-auto">
            {tCommon("viewAll")} <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="seasonal-tour-grid" data-rise3d>
          {eastCoastTours.map((tour: any) => {
            const data = tour.translations?.[locale] || tour.translations?.en;
            return (
              <div key={tour.tourId} className="seasonal-card-frame">
                <Link href={`/tours/${tour.tourId}`} data-drift className="seasonal-photo-card group relative flex h-full flex-col justify-end overflow-hidden rounded-[30px] bg-slate-900 p-6 text-white sm:p-7">
                  <div className="cine-image-plane" data-drift-layer>
                    <Image src={homeTourImages[tour.tourId] || tour.image} alt={data?.title || "Sri Lanka tour"} fill quality={60} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="travel-card-image object-cover" />
                  </div>
                  <div className="seasonal-card-shade absolute inset-0" />
                  <div className="relative">
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/15 px-3 py-2 text-sm font-medium backdrop-blur-sm"><Clock size={16} aria-hidden="true" />{tour.duration} {tour.duration > 1 ? tCommon("days") : tCommon("day")}</span>
                    <h3 className="font-playfair text-3xl leading-tight">{data?.title}</h3>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm text-white/90"><Users size={16} aria-hidden="true" />{tCommon("maxPeople", { count: tour.maxPeople || 10 })}</span>
                    <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-t border-white/30 pt-5">
                      <div><p className="text-xs text-white/80">{tCommon("from")}</p><p className="mt-1 text-2xl font-semibold">{tour.price > 0 ? `$${tour.price}` : tCommon("priceOnRequest")}</p></div>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-amber-200">{tCommon("viewDetails")}</span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </CinematicSection>
  );
}
