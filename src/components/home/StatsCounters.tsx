import { useTranslations } from "next-intl";
import { Award, ShieldCheck, Star } from "lucide-react";
import CinematicSection from "@/components/cinematic/CinematicSection";
import DecoShapes from "@/components/home/DecoShapes";

/**
 * TRUST STATS — the three business facts confirmed by the owner. They are plain server-rendered text
 * (no counting animation), so the real values are in the HTML for visitors, crawlers and screen readers.
 * Do not add figures here without evidence (review counts, traveller numbers, memberships).
 */
export default function StatsCounters() {
  const t = useTranslations("home.stats");

  return (
    <CinematicSection className="stats-section home-section-spacing relative isolate overflow-hidden">
      <DecoShapes tone="light" />
      <div className="mx-auto max-w-7xl px-6">
        <div data-rise3d="self" className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-3 font-semibold text-orange-700">{t("label")}</p>
          <h2 className="font-playfair text-4xl leading-tight text-slate-900 sm:text-5xl">{t("heading")}</h2>
        </div>
        <ul className="stats-grid" data-rise3d>
          <li className="stat-card lift-card">
            <Award aria-hidden className="mx-auto mb-3 h-7 w-7 text-[#b86525]" />
            <p className="stat-number font-playfair">{t("experienceValue")}</p>
            <p className="stat-label">{t("experienceLabel")}</p>
          </li>
          <li className="stat-card lift-card">
            <ShieldCheck aria-hidden className="mx-auto mb-3 h-7 w-7 text-[#b86525]" />
            <p className="stat-number stat-number--text font-playfair">{t("certifiedValue")}</p>
            <p className="stat-label">{t("certifiedLabel")}</p>
          </li>
          <li className="stat-card lift-card">
            <span role="img" aria-label={t("ratingAria")} className="mb-3 flex justify-center gap-0.5">
              {[0, 1, 2, 3, 4].map((i) => <Star key={i} aria-hidden className="h-5 w-5 fill-amber-400 text-amber-400" />)}
            </span>
            <p className="stat-number font-playfair" aria-hidden>4.9/5</p>
            <p className="stat-label">{t("ratingLabel")}</p>
          </li>
        </ul>
      </div>
    </CinematicSection>
  );
}
