import CinematicSection from "@/components/cinematic/CinematicSection";
import DecoShapes from "@/components/home/DecoShapes";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight, Landmark, Mountain, PawPrint, UtensilsCrossed, Waves, type LucideIcon } from "lucide-react";

/**
 * EXPERIENCES — five icon cards (Safari, Surfing, Hiking, Culture, Food).
 * Text lives in messages → home.experiences.items.<key>.
 * Each card links to the excursions page; change `href` per card if you add
 * dedicated pages later.
 */
const CARDS: { key: "safari" | "surfing" | "hiking" | "culture" | "food"; Icon: LucideIcon; href: string }[] = [
  { key: "safari", Icon: PawPrint, href: "/excursions" },
  { key: "surfing", Icon: Waves, href: "/excursions" },
  { key: "hiking", Icon: Mountain, href: "/excursions" },
  { key: "culture", Icon: Landmark, href: "/excursions" },
  { key: "food", Icon: UtensilsCrossed, href: "/excursions" },
];

export default async function ExperienceIcons({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "home.experiences" });

  return (
    <CinematicSection className="activity-section home-section-spacing relative isolate overflow-hidden">
      <DecoShapes tone="light" />
      <div className="mx-auto max-w-7xl px-6">
        <div data-rise3d="self" className="mb-10 max-w-2xl">
          <p className="mb-3 font-semibold text-orange-700">{t("label")}</p>
          <h2 className="font-playfair text-4xl leading-tight text-slate-900 sm:text-5xl">{t("heading")}</h2>
          <p className="mt-4 leading-relaxed text-slate-600">{t("sub")}</p>
        </div>

        <div className="activity-grid" data-rise3d>
          {CARDS.map(({ key, Icon, href }) => (
            <Link key={key} href={href} className="activity-card lift-card group">
              <span className="activity-icon"><Icon size={26} strokeWidth={1.6} aria-hidden="true" /></span>
              <h3 className="font-playfair text-2xl text-slate-900">{t(`items.${key}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{t(`items.${key}.desc`)}</p>
              <span className="activity-more">
                {t("explore")} <ArrowUpRight size={16} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </CinematicSection>
  );
}
