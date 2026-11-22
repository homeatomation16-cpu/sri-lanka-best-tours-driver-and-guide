"use client";

import CinematicSection from "@/components/cinematic/CinematicSection";

import { editorialImages } from "@/data/editorialImages";
import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const experiences = [
  { id: "mirissa", category: "Beach", image: editorialImages.mirissaCove },
  { id: "ella", category: "Nature", image: editorialImages.tea },
  { id: "sigiriya", category: "Cultural", image: editorialImages.sigiriya },
  { id: "udawalawa", category: "Wildlife", image: editorialImages.wildlife },
] as const;

export default function ExperienceExplorer() {
  const t = useTranslations("excursions");
  const categories = useTranslations("excursionPage.categories");
  const [active, setActive] = useState(0);

  return (
    <CinematicSection className="experience-section home-section-spacing">
      <div className="mx-auto max-w-7xl px-6">
        <div data-rise3d="self" className="experience-heading mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 font-semibold text-orange-700">{t("label")}</p>
            <h2 className="font-playfair text-4xl text-slate-900 sm:text-5xl">{t("title")}</h2>
          </div>
          <div className="max-w-md">
            <p className="leading-relaxed text-slate-600">{t("subtitle")}</p>
            <Link href="/excursions" className="mt-4 inline-flex items-center gap-2 border-b border-teal-800/30 pb-1 font-semibold text-teal-800">
              {t("explore")} <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="experience-rail" data-rise3d role="group" aria-label={t("label")}>
          {experiences.map((experience, index) => (
            <article key={experience.id} className={`experience-panel ${active === index ? "is-active" : ""}`}>
              <button
                type="button"
                className="experience-select"
                data-drift
                aria-pressed={active === index}
                aria-label={categories(experience.category)}
                onPointerEnter={(event) => { if (event.pointerType === "mouse") setActive(index); }}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
              >
                <div className="cine-image-plane" data-drift-layer>
                  <Image src={experience.image} alt="" fill quality={60} sizes="(max-width: 768px) 85vw, 50vw" className="experience-image object-cover" />
                </div>
                <span className="experience-shade" />
                <span className="experience-label font-playfair">{categories(experience.category)}</span>
              </button>
              <Link href={`/excursions/${experience.id}`} className="experience-link" tabIndex={active === index ? 0 : -1} aria-hidden={active !== index}>
                {t("explore")} <ArrowUpRight size={22} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </CinematicSection>
  );
}
