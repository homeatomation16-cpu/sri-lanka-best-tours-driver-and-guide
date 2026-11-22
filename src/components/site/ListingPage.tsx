import Image from "next/image";
import { MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";

// Shared look of the live site's listing pages (excursions, destinations): photo hero, category chips, cards.

export function ListingHero({ image, eyebrow, title, subtitle }: { image: string; eyebrow: string; title: string; subtitle?: string }) {
  return (
    <section className="relative flex min-h-[48vh] items-end overflow-hidden bg-slate-950 text-white">
      <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-80" />
      <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/30 to-slate-950/40" />
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-12 pt-36">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">{eyebrow}</p>
        <h1 className="font-playfair text-4xl leading-tight sm:text-6xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-white/85">{subtitle}</p>}
      </div>
    </section>
  );
}

const chipClass = (active: boolean) =>
  `whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
    active ? "border-emerald-900 bg-emerald-900 text-white" : "border-amber-300 bg-white text-emerald-950 hover:border-emerald-900"
  }`;

export function CategoryChips({ basePath, allLabel, categories, active }: { basePath: "/excursions" | "/destinations"; allLabel: string; categories: [string, string][]; active?: string }) {
  if (categories.length < 2) return null;
  return (
    <nav aria-label={allLabel} className="-mx-6 mb-4 flex gap-2 overflow-x-auto px-6 pb-2 sm:flex-wrap">
      <Link href={basePath} scroll={false} aria-current={!active ? "page" : undefined} className={chipClass(!active)}>
        {allLabel}
      </Link>
      {categories.map(([key, name]) => (
        <Link key={key} href={{ pathname: basePath, query: { category: key } }} scroll={false} aria-current={active === key ? "page" : undefined} className={chipClass(active === key)}>
          {name}
        </Link>
      ))}
    </nav>
  );
}

export type ListingCardItem = { href: string; image: string; title: string; category?: string; text?: string; place?: string };

export function ListingCards({ items }: { items: ListingCardItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <article key={item.href} className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_10px_30px_-12px_rgb(15_23_42/0.18)]">
          <div className="relative aspect-16/10 overflow-hidden">
            <Image src={item.image} alt={item.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" priority={index < 3} className="object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="flex flex-1 flex-col p-6">
            {item.category && (
              <p className="mb-3">
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">{item.category}</span>
              </p>
            )}
            <h2 className="text-xl font-semibold leading-snug text-slate-900">
              <Link href={item.href} className="after:absolute after:inset-0">{item.title}</Link>
            </h2>
            {item.text && <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{item.text}</p>}
            {item.place && (
              <p className="mt-auto flex items-center gap-1 pt-5 text-sm text-slate-500">
                <MapPin className="h-4 w-4 text-amber-600" aria-hidden /> {item.place}
              </p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
