import CinematicSection from "@/components/cinematic/CinematicSection";
// src/components/WhyUs.tsx

import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Star, MapPin, Sliders, Car, BadgeCheck, Zap } from "lucide-react";

export default async function WhyUs() {
  const t = await getTranslations("whyUs");

  const features = [
    { title: t("features.agent.title"), description: t("features.agent.desc"), icon: Star },
    { title: t("features.places.title"), description: t("features.places.desc"), icon: MapPin },
    { title: t("features.tailor.title"), description: t("features.tailor.desc"), icon: Sliders },
    { title: t("features.transport.title"), description: t("features.transport.desc"), icon: Car },
    { title: t("features.price.title"), description: t("features.price.desc"), icon: BadgeCheck },
    { title: t("features.booking.title"), description: t("features.booking.desc"), icon: Zap },
  ];

  return (
    <CinematicSection className="why-us-section home-section-spacing relative isolate overflow-hidden px-6 text-white">
      {/* nightfall after the Descent sunset: afterglow at the top, then indigo */}
      <div className="why-us-scenery why-us-dusk pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="why-us-glow absolute inset-0" data-parallax="0.06" />
      </div>
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.3fr] lg:gap-14">
        <div data-rise3d="self" className="why-us-story rounded-3xl p-6 sm:p-8">
          <p className="mb-4 font-semibold text-amber-300">{t("label")}</p>
          <h2 className="font-playfair text-4xl leading-tight sm:text-5xl">{t("heading")}</h2>
          <div data-drift className="why-us-photo relative mt-7 h-64 overflow-hidden rounded-3xl sm:h-72 lg:h-80">
            <div className="cine-image-plane" data-drift-layer>
              <Image src="/images/editorial/ella-rock.jpg" alt="" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4" data-rise3d>
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="why-us-feature rounded-2xl border border-white/15 bg-[#092e29]/85 p-3.5 sm:p-5 backdrop-blur-sm min-w-0">
                <Icon className="mb-2 h-5 w-5 sm:mb-3 sm:h-6 sm:w-6 text-amber-300" aria-hidden="true" />
                <h3 className="mb-1 text-sm leading-snug sm:mb-2 sm:text-lg font-semibold">{item.title}</h3>
                <p className="text-xs leading-relaxed text-white/80 sm:text-sm max-sm:line-clamp-3">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </CinematicSection>
  );
}
