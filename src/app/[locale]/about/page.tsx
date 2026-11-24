import JsonLd from "@/components/seo/JsonLd";
import { sectionBreadcrumb, pageMetadata } from "@/lib/seo";
// About us, laid out like the live site: photo hero, story with checklist, stat tiles, six reasons.
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight, Award, CheckCircle2, Heart, Shield, Star, Users } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ListingHero } from "@/components/site/ListingPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return pageMetadata(locale, "/about", t("label"), t("desc1"), "/aboutcover.jpg");
}

const REASONS = [
  { key: "licensed", icon: Shield },
  { key: "rated", icon: Star },
  { key: "private", icon: Users },
  { key: "passionate", icon: Heart },
  { key: "pata", icon: Award },
  { key: "transparent", icon: CheckCircle2 },
] as const;

const STATS = [
  { value: "10+", key: "experience" },
  { value: "5000+", key: "travelers" },
  { value: "24/7", key: "support" },
  { value: "100%", key: "certified" },
] as const;

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <div className="bg-white">
      <JsonLd data={sectionBreadcrumb(locale, (await getTranslations({ locale, namespace: "nav" }))("home"), (await getTranslations({ locale, namespace: "nav" }))("about"), "/about")} />
      <ListingHero image="/aboutcover.jpg" eyebrow={t("label")} title={t("title")} subtitle={t("desc1")} />

      {/* STORY */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="relative aspect-4/5 overflow-hidden rounded-[2.5rem] shadow-xl">
              <Image src="/aboutcover.jpg" alt={t("title")} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-white/90 p-6 shadow-lg backdrop-blur sm:inset-x-8 sm:bottom-8">
              <p className="font-playfair text-xl italic text-emerald-800">{t("heading")}</p>
              <p className="text-2xl font-semibold uppercase tracking-tight text-amber-600 sm:text-3xl">{t("headingHighlight")}</p>
            </div>
          </div>

          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-0.5 w-10 bg-amber-500" aria-hidden />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600">{t("label")}</span>
            </div>
            <h2 className="mb-8 font-playfair text-4xl leading-[1.1] text-slate-900 lg:text-5xl">
              {t("heading")} <span className="text-emerald-700 underline decoration-amber-400 decoration-2 underline-offset-8">{t("headingHighlight")}</span> {t("headingEnd")}
            </h2>
            <div className="mb-10 space-y-5 text-lg leading-relaxed text-slate-600">
              <p>{t("desc1")}</p>
              <p>{t("desc2")}</p>
            </div>
            <ul className="mb-12 grid gap-4 sm:grid-cols-2">
              {(["item1", "item2", "item3", "item4"] as const).map((k) => (
                <li key={k} className="flex items-center gap-3">
                  <span className="rounded-full bg-emerald-50 p-1">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden />
                  </span>
                  <span className="text-sm font-semibold text-slate-800">{t(`checklist.${k}`)}</span>
                </li>
              ))}
            </ul>
            <Link href="/contact" className="group inline-flex items-center gap-3 rounded-full bg-emerald-900 px-9 py-4 font-semibold text-white shadow-lg transition-colors hover:bg-amber-500 hover:text-emerald-950">
              {t("cta")}
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" />
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="pb-16 sm:pb-24">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-6 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.key} className="flex min-w-0 flex-col-reverse rounded-4xl border border-amber-100 bg-amber-50/60 px-3 py-6 text-center sm:p-10">
              <dt className="mt-2 text-[0.72rem] font-bold uppercase tracking-[0.08em] text-amber-700 sm:tracking-[0.2em]">{t(`stats.${s.key}`)}</dt>
              <dd className="font-playfair text-3xl text-slate-900 sm:text-5xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* REASONS */}
      <section className="bg-[#f5efe3] py-16 sm:py-24">
        <ul className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 lg:grid-cols-3">
          {REASONS.map(({ key, icon: Icon }) => (
            <li key={key} className="group rounded-[2.5rem] bg-white p-7 shadow-sm sm:p-9 transition-shadow hover:shadow-xl">
              <span className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 transition-colors group-hover:bg-emerald-800">
                <Icon className="h-7 w-7 text-emerald-600 transition-colors group-hover:text-amber-400" aria-hidden />
              </span>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">{t(`reasons.${key}.title`)}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{t(`reasons.${key}.desc`)}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
