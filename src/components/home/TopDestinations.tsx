import CinematicSection from "@/components/cinematic/CinematicSection";
import DecoShapes from "@/components/home/DecoShapes";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { DESTINATIONS } from "@/data/destinations";

/**
 * TOP DESTINATIONS — image cards (photo, name, short description, Read more).
 * Uses the same destination data as /destinations, in the visitor's language
 * (src/data/destinations/<locale>.ts), so names and text are translated.
 * To change which places appear, edit FEATURED_IDS.
 */
const FEATURED_IDS = [
  "yala-national-park",
  "galle-face-green",
  "gangaramaya-temple",
  "colombo-city",
  "kelaniya-raja-maha-viharaya",
  "old-parliament-building",
];

type LocalDestination = { id?: string; title?: string; description?: string; location?: string };

async function loadLocalized(locale: string): Promise<LocalDestination[]> {
  try {
    const mod = await import(`@/data/destinations/${locale}`);
    const raw = mod.TOURS ?? mod.default ?? [];
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

/** First sentence, trimmed to ~120 characters for the card. */
function short(text = "") {
  const first = text.split(/(?<=[.!?。])\s/)[0] ?? text;
  return first.length > 120 ? `${first.slice(0, 117).trimEnd()}…` : first;
}

export default async function TopDestinations({ locale }: { locale: string }) {
  const [t, tHome, tPage, localized] = await Promise.all([
    getTranslations({ locale, namespace: "destinations" }),
    getTranslations({ locale, namespace: "home" }),
    getTranslations({ locale, namespace: "destinationPage" }),
    loadLocalized(locale),
  ]);

  const cards = FEATURED_IDS.map((id) => {
    const base = DESTINATIONS.find((d) => d.id === id);
    if (!base) return null;
    const local = localized.find((d) => d?.id === id);
    return {
      id,
      image: base.image,
      title: local?.title || base.title,
      location: local?.location || base.location,
      text: short(local?.description || base.description),
    };
  }).filter(Boolean) as { id: string; image: string; title: string; location: string; text: string }[];

  return (
    <CinematicSection className="destinations-home home-section-spacing relative isolate overflow-hidden">
      <DecoShapes tone="light" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div data-rise3d="self" className="max-w-2xl">
            <p className="mb-3 font-semibold text-orange-700">{t("label")}</p>
            <h2 className="font-playfair text-4xl leading-tight text-slate-900 sm:text-5xl">{t("heading")}</h2>
          </div>
          <Link href="/destinations" className="home-section-link shrink-0 self-start" data-reveal="right">
            {tPage("moreDestinations")} <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>

        <div className="dest-grid" data-rise3d>
          {cards.map((d) => (
            <article key={d.id} className="dest-card lift-card">
              <div className="dest-photo">
                <div className="reveal-img">
                  <Image src={d.image} alt={d.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" quality={65} className="object-cover" />
                </div>
                <span className="dest-shade" />
                <span className="dest-place"><MapPin size={14} aria-hidden="true" />{d.location}</span>
              </div>
              <div className="dest-body">
                <h3 className="font-playfair text-2xl text-slate-900">{d.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{d.text}</p>
                <Link href={`/destinations/${d.id}`} className="dest-more">
                  {tHome("readMore")} <ArrowUpRight size={16} aria-hidden="true" />
                  <span className="sr-only">: {d.title}</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </CinematicSection>
  );
}
