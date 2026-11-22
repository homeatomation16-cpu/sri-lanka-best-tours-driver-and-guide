import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { getActiveTours } from "@/lib/tourData";

// The live site's homepage tour themes: Honeymoon (tall staggered cards), then Family and Adventure (card grid).

type Card = { id: string; title: string; image: string; price: number; duration: number; route: string[] };

const textOf = (tour: any, locale: string) => tour.translations?.[locale] || tour.translations?.en || {};

function toCard(tour: any, locale: string): Card {
  const data = textOf(tour, locale);
  return {
    id: tour.tourId,
    title: data.title || tour.tourId,
    image: tour.image || "/logo.png",
    price: Number(tour.price) || 0,
    duration: Number(tour.duration) || 0,
    route: [...new Set<string>(data.route ?? [])],
  };
}

function SectionHeading({ title, sub, link, href }: { title: string; sub: string; link: string; href: string }) {
  return (
    <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <h2 className="font-playfair text-3xl leading-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">{title}</h2>
        <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{sub}</p>
      </div>
      <Link href={href} className="group inline-flex shrink-0 items-center gap-2 self-start border-b border-emerald-900/40 pb-0.5 text-sm font-semibold text-emerald-900 transition-colors hover:border-amber-500 hover:text-amber-700 md:self-auto">
        {link} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" aria-hidden />
      </Link>
    </div>
  );
}

export default async function TourCollections({ locale }: { locale: string }) {
  const [t, tHome] = await Promise.all([
    getTranslations({ locale, namespace: "tours" }),
    getTranslations({ locale, namespace: "home.collections" }),
  ]);
  const tours = await getActiveTours(locale);
  const pick = (slug: string) => tours.filter((tour: any) => tour.category === slug);
  const name = (list: any[]) => textOf(list[0], locale).categoryName as string;
  const priceText = (card: Card) => (card.price > 0 ? `${t("from")} $${card.price}` : t("priceOnRequest"));

  const honeymoon = pick("honeymoon-tours").slice(0, 3).map((tour) => toCard(tour, locale));
  const grids = [
    { slug: "family-tours", sub: tHome("familySub"), bg: "bg-[#faf7f0]", list: pick("family-tours") },
    { slug: "adventure-tours", sub: tHome("adventureSub"), bg: "bg-[#f3ecdf]", list: pick("adventure-tours") },
  ].filter((g) => g.list.length);

  // Staggered composition of the live site: left low, middle high, right a little bigger
  const offsets = ["mt-10 sm:mt-16 lg:mt-24", "mt-0", "mt-5 sm:mt-8 lg:mt-12"];
  const heights = ["aspect-[3/6.4] lg:aspect-[3/4.4]", "aspect-[3/5.8] lg:aspect-[3/4]", "aspect-[3/6.6] lg:aspect-[3/4.6]"];

  return (
    <>
      {honeymoon.length > 0 && (
        <section className="relative isolate overflow-hidden bg-[#faf7f0] py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeading
              title={name(pick("honeymoon-tours"))}
              sub={tHome("honeymoonSub")}
              link={tHome("explore", { name: name(pick("honeymoon-tours")) })}
              href="/tours?category=honeymoon-tours"
            />
            <div className="relative grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.12fr)] items-start gap-2 sm:gap-4 lg:gap-10 lg:pb-12">
              {honeymoon.map((card, index) => (
                <div key={card.id} className={offsets[index % 3]}>
                  <article className="group relative h-full overflow-hidden rounded-[2rem] shadow-xl transition-transform duration-500 hover:-translate-y-1 max-lg:rounded-2xl">
                    <div className={`relative overflow-hidden bg-emerald-900 ${heights[index % 3]}`}>
                      <Image src={card.image} alt={card.title} fill sizes="(min-width: 1024px) 33vw, 34vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-emerald-950/90 via-emerald-950/20 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-6 text-white max-lg:p-2">
                        {card.duration > 0 && <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 max-lg:text-[8px] max-lg:tracking-wide">{t("daysCount", { count: card.duration })}</p>}
                        <h3 className="mt-2 font-playfair text-2xl leading-tight [text-shadow:0_1px_8px_rgb(4_23_15/0.6)] max-lg:mt-1 max-lg:text-[clamp(0.65rem,2.6vw,1rem)]">
                          <Link href={`/tours/${card.id}`} className="after:absolute after:inset-0 focus:outline-none">{card.title}</Link>
                        </h3>
                        <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/20 pt-4 max-lg:mt-2 max-lg:pt-2">
                          <p className="text-sm text-white/80 max-lg:text-[9px]">{priceText(card)}</p>
                          <ArrowRight className="h-4 w-4 text-amber-400 max-lg:hidden rtl:rotate-180" aria-hidden />
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {grids.map((g) => {
        const cards = g.list.map((tour: any) => toCard(tour, locale));
        const title = name(g.list);
        return (
          <section key={g.slug} className={`relative isolate overflow-hidden py-14 sm:py-16 lg:py-20 ${g.bg}`}>
            <div className="mx-auto max-w-7xl px-6">
              <SectionHeading title={title} sub={g.sub} link={tHome("explore", { name: title })} href={`/tours?category=${g.slug}`} />
              <div className="flex flex-wrap justify-center gap-6">
                {cards.map((card) => (
                  <div key={card.id} className="w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]">
                    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_-12px_rgb(15_23_42/0.2)] transition-transform duration-500 hover:-translate-y-1">
                      <div className="relative aspect-4/3 overflow-hidden bg-emerald-900">
                        <Image src={card.image} alt={card.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="font-playfair text-xl leading-snug text-slate-900">
                          <Link href={`/tours/${card.id}`} className="after:absolute after:inset-0 focus:outline-none">{card.title}</Link>
                        </h3>
                        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-500">
                          {[card.duration > 0 ? t("daysCount", { count: card.duration }) : "", card.route.join(", ")].filter(Boolean).join(" · ")}
                        </p>
                        <div className="mt-auto flex items-end justify-between gap-3 border-t border-stone-100 pt-4">
                          <p className="text-sm font-medium text-emerald-800">{priceText(card)}</p>
                          <ArrowRight className="h-4 w-4 text-amber-600 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" aria-hidden />
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
