import CinematicHeading from "@/components/cinematic/CinematicHeading";
import CinematicSection from "@/components/cinematic/CinematicSection";
import { editorialImages } from "@/data/editorialImages";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { getSiteContent } from "@/lib/siteContent";
import { pick } from "@/lib/autoTranslate";

export default async function TailorMade() {
  // translations namespace එක tailorMade ලෙස ගනිමු
  const t = await getTranslations("tailorMade");

  // Tags ටික translations වලින් ලබා ගැනීමට (JSON එකේ arrays ලෙස තිබිය යුතුය)
  // උදා: "tags": ["14 Days Average", "100% Private", "Fully Guided"]
  const defaultTags = t.raw("tags") || ["14 Days Average", "100% Private", "Fully Guided"];

  // Text/photo saved in Admin → Website Content (auto-translated). Falls back to the translation files.
  const locale = await getLocale();
  const c = await getSiteContent("tailorMade");
  const txt = (field: string, fallback: string) => pick(c?.[field], locale) || fallback;
  const tags: string[] = c?.tags?.length ? c.tags.map((x: any) => pick(x, locale)).filter(Boolean) : defaultTags;
  const image: string = c?.image || editorialImages.landscape;
  const label = txt("label", t("label"));
  const heading = txt("heading", t("heading"));
  const desc = txt("desc", t("desc"));
  const subtext1 = txt("subtext1", t("subtext1") || "Discover Sri Lanka your way — journeys designed entirely around you.");
  const subtext2 = txt("subtext2", t("subtext2") || "Romantic honeymoon, family adventure, or exclusive luxury escape — our specialists craft seamless itineraries with premium access.");
  const buttonPrimary = txt("buttonPrimary", t("buttonPrimary") || "Design My Journey");
  const buttonSecondary = txt("buttonSecondary", t("buttonSecondary") || "Talk to a specialist →");

  return (
    <CinematicSection className="bespoke-section home-section-spacing relative isolate overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="bespoke-composition">
          <div className="bespoke-card-back bespoke-card-back-far" aria-hidden="true" data-card-depth="0.3" />
          <div className="bespoke-card-back bespoke-card-back-near" aria-hidden="true" data-card-depth="0.6" />
          <div className="bespoke-main-photo" data-card-depth="1" data-drift data-drift-speed="0.65">
            <div className="cine-image-plane" data-drift-layer>
              <Image src={image} alt={heading} fill sizes="(max-width: 1024px) 90vw, 45vw" className="object-cover" />
            </div>
          </div>
          <div className="bespoke-detail-photo" data-card-depth="-1.8" data-drift data-drift-speed="-0.35">
            <div className="cine-image-plane" data-drift-layer>
              <Image src={editorialImages.dambulla} alt="" fill sizes="(max-width: 640px) 45vw, 22vw" className="object-cover" />
            </div>
          </div>
          <div className="bespoke-photo-caption">
            {tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </div>
        <div data-scroll-copy className="bespoke-copy">
          <p className="mb-4 font-semibold text-orange-700">{label}</p>
          <CinematicHeading className="font-playfair text-4xl leading-tight text-slate-900 sm:text-5xl">{heading}</CinematicHeading>
          <p className="mt-4 text-xl font-medium leading-relaxed text-teal-800">{desc}</p>
          <p className="mt-5 leading-relaxed text-slate-600">{subtext1}</p>
          <p className="mt-4 leading-relaxed text-slate-600">{subtext2}</p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link href="/tailor-made-tours" className="home-section-link">
              {buttonPrimary} <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
            <Link href="/contact" className="border-b border-teal-800/30 pb-1 font-medium text-teal-800 transition-colors hover:text-orange-700">{buttonSecondary}</Link>
          </div>
        </div>
      </div>
    </CinematicSection>
  );
}
