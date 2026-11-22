import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

/**
 * Illustrated Sri Lanka map (public/images/sri-lanka-map.webp, 1024×1536).
 * Each place label printed on the map is a link to its destination page.
 * x / y = centre of the label in pixels on the 1024×1536 image.
 */
const PLACES: { id: string; x: number; y: number }[] = [
  { id: "jaffna", x: 385, y: 212 },
  { id: "anuradhapura", x: 395, y: 532 },
  { id: "trincomalee", x: 708, y: 525 },
  { id: "kalpitiya", x: 172, y: 618 },
  { id: "habarana", x: 565, y: 600 },
  { id: "wilpattu", x: 312, y: 667 },
  { id: "sigiriya", x: 498, y: 706 },
  { id: "passikudah", x: 812, y: 718 },
  { id: "polonnaruwa", x: 668, y: 743 },
  { id: "dambulla", x: 458, y: 785 },
  { id: "negombo", x: 243, y: 829 },
  { id: "kandy", x: 528, y: 912 },
  { id: "arugam-bay", x: 905, y: 980 },
  { id: "nuwara-eliya", x: 600, y: 1010 },
  { id: "colombo", x: 250, y: 1030 },
  { id: "ella", x: 650, y: 1102 },
  { id: "hatton", x: 424, y: 1140 },
  { id: "yala", x: 742, y: 1238 },
  { id: "udawalawe", x: 538, y: 1250 },
  { id: "galle", x: 270, y: 1324 },
  { id: "tangalle", x: 663, y: 1351 },
  { id: "unawatuna", x: 360, y: 1359 },
  { id: "mirissa", x: 458, y: 1367 },
];

async function destinationNames(locale: string): Promise<Record<string, string>> {
  try {
    const mod = await import(`@/data/destinations/${locale}`);
    return Object.fromEntries(mod.TOURS.map((d: { id: string; title: string }) => [d.id, d.title]));
  } catch {
    return {};
  }
}

export default async function SriLankaMap({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "home.map" });
  const names = await destinationNames(locale);
  const places = PLACES.filter((place) => names[place.id]);

  return (
    <section className="home-section-spacing bg-[#f9f7f2]" aria-labelledby="sri-lanka-map-title">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="mb-3 font-semibold text-teal-800">{t("label")}</p>
          <h2 id="sri-lanka-map-title" className="font-playfair text-4xl leading-tight text-slate-900 sm:text-5xl">{t("heading")}</h2>
          <p className="mt-4 max-w-md leading-relaxed text-slate-600">{t("sub")}</p>
          {/* Same places as a plain list: readable for screen readers and easy to tap on small screens */}
          <ul className="mt-8 flex flex-wrap gap-2">
            {places.map((place) => (
              <li key={place.id}>
                <Link href={`/destinations/${place.id}`} className="inline-block rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 transition-colors hover:border-amber-400 hover:text-slate-950">
                  {names[place.id]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <Image
            src="/images/sri-lanka-map.webp"
            alt={t("alt")}
            width={1024}
            height={1536}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="sri-lanka-map-fade h-auto w-full"
          />
          {places.map((place) => (
            <Link
              key={place.id}
              href={`/destinations/${place.id}`}
              title={names[place.id]}
              aria-hidden="true"
              tabIndex={-1}
              className="absolute h-[3.4%] w-[17%] -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors hover:bg-amber-300/30 hover:ring-2 hover:ring-amber-400"
              style={{ left: `${(place.x / 1024) * 100}%`, top: `${(place.y / 1536) * 100}%` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
