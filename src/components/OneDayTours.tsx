import CinematicHeading from "@/components/cinematic/CinematicHeading";
import CinematicSection from "@/components/cinematic/CinematicSection";
import { editorialImages } from "@/data/editorialImages";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Users, Clock, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { getActiveTours } from "@/lib/tourData";

export default async function OneDayTours({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "tours" });

  const oneDayTours = (await getActiveTours(locale)).filter((tour: any) => tour.duration === 1).slice(0, 6);

  return (
    <CinematicSection key={locale + oneDayTours.map((tour) => tour.tourId).join(",")} className="day-tours-section home-section-spacing relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div data-rise3d="self" className="mb-8 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 font-semibold text-orange-700">{t("luxuryDayTrips")}</p>
            <CinematicHeading className="font-playfair text-4xl leading-tight text-slate-900 sm:text-5xl">{t("oneDayPackages")}</CinematicHeading>
            <p className="mt-5 max-w-xl leading-relaxed text-slate-600">{t("oneDayDesc")}</p>
          </div>
          <Link href="/tours" className="home-section-link shrink-0 self-start">
            {t("viewAll")} <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className={`day-tour-grid day-tour-grid--${oneDayTours.length}`}>
          {oneDayTours.map((tour: any, index: number) => {
            const data = tour.translations?.[locale] || tour.translations?.en;
            const title = `${tour.tourId} ${data?.title || ""}`.toLowerCase();
            const image = title.includes("galle") ? editorialImages.galle
              : title.includes("kandy") ? editorialImages.kandy
              : title.includes("sigiriya") ? editorialImages.sigiriyaPidurangala
              : title.includes("udawalaw") ? editorialImages.udawalawe
              : editorialImages.wildlife;
            return (
              <div key={tour.tourId} className="day-tour-frame" data-scroll-float={index % 2 === 0 ? "1" : "-1"}>
                <Link href={`/tours/${tour.tourId}`} data-drift className="travel-card day-tour-card relative flex h-full min-h-96 flex-col justify-end overflow-hidden rounded-2xl bg-slate-900 p-7 text-white">
                <div className="cine-image-plane" data-drift-layer>
                  <Image src={image} alt={data?.title || "Sri Lanka day tour"} fill quality={60} sizes={oneDayTours.length === 5 && index === 0 ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 66vw" : "(max-width: 640px) 100vw, 50vw"} className="travel-card-image object-cover" />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/45 to-transparent" />
                <p className="absolute start-6 top-6 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900">{tour.price > 0 ? `${t("from")} $${tour.price}` : t("priceOnRequest")}</p>
                <div className="relative">
                  <div className="mb-4 flex flex-wrap gap-4 text-sm text-white/85">
                    <span className="inline-flex items-center gap-2"><Clock size={16} aria-hidden="true" />1 {t("day")}</span>
                    <span className="inline-flex items-center gap-2"><Users size={16} aria-hidden="true" />{t("upToGuests", { count: tour.maxPeople || 10 })}</span>
                  </div>
                  <h3 className="text-2xl font-semibold leading-snug">{data?.title}</h3>
                  <span className="mt-4 sm:mt-6 inline-flex items-center gap-3 font-semibold text-amber-300">{t("exploreTour")} <ArrowRight size={18} aria-hidden="true" /></span>
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
