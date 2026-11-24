"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

const SLIDE_DURATION = 8000;

// Shared Cloudinary transformation strings — kept as constants so all three
// slides stay in sync if you tune quality/width later.
const VIDEO_TRANSFORM = "w_1920,c_limit,q_auto:good,f_auto,vc_auto";
// Phones get a narrower encode (still sharp on a ~400px-wide, 2–3x screen) to save mobile data.
const MOBILE_VIDEO_TRANSFORM = "w_1080,c_limit,q_auto:good,f_auto,vc_auto";
const POSTER_TRANSFORM = "so_auto,f_auto,q_auto,w_1920";

const DEFAULT_SLIDES = [
  {
    src: `https://res.cloudinary.com/dj5mylqf1/video/upload/${VIDEO_TRANSFORM}/v1783181658/286459_large_idzt2a.mp4`,
    poster: `https://res.cloudinary.com/dj5mylqf1/video/upload/${POSTER_TRANSFORM}/v1783181658/286459_large_idzt2a.jpg`,
    title: "Mirissa Beach",
    subtitle: "Golden sunsets & whale watching paradise",
  },
  {
    src: `https://res.cloudinary.com/dj5mylqf1/video/upload/${VIDEO_TRANSFORM}/v1783182985/191283-889685028_medium_rwgv8o.mp4`,
    poster: `https://res.cloudinary.com/dj5mylqf1/video/upload/${POSTER_TRANSFORM}/v1783182985/191283-889685028_medium_rwgv8o.jpg`,
    title: "Sigiriya Rock Fortress",
    subtitle: "Ancient wonder of Sri Lanka",
  },
  {
    src: `https://res.cloudinary.com/dj5mylqf1/video/upload/${VIDEO_TRANSFORM}/v1778170579/ella_kez34u.mp4`,
    poster: `https://res.cloudinary.com/dj5mylqf1/video/upload/${POSTER_TRANSFORM}/v1778170579/ella_kez34u.jpg`,
    title: "Ella Scenic Train",
    subtitle: "World's most beautiful train ride",
  },
  {
    src: `https://res.cloudinary.com/dj5mylqf1/video/upload/${VIDEO_TRANSFORM}/v1783185896/Ocean_Beach_Waves._Free_Stock_Video_-_Pixabay_p1hnsn.mp4`,
    poster: `https://res.cloudinary.com/dj5mylqf1/video/upload/${POSTER_TRANSFORM}/v1783185896/Ocean_Beach_Waves._Free_Stock_Video_-_Pixabay_p1hnsn.jpg`,
    title: "Coastal Waves", // TODO: confirm/adjust title
    subtitle: "Endless ocean views along the shoreline",
  },
  {
    src: `https://res.cloudinary.com/dj5mylqf1/video/upload/${VIDEO_TRANSFORM}/v1783185801/Sri_Lanka_Ceylon_18_Bends._Free_Stock_Video_-_Pixabay_wftxyr.mp4`,
    poster: `https://res.cloudinary.com/dj5mylqf1/video/upload/${POSTER_TRANSFORM}/v1783185801/Sri_Lanka_Ceylon_18_Bends._Free_Stock_Video_-_Pixabay_wftxyr.jpg`,
    title: "The Eighteen Bends", // TODO: confirm/adjust title
    subtitle: "Winding mountain roads through tea country",
  },
  {
    src: `https://res.cloudinary.com/dj5mylqf1/video/upload/${VIDEO_TRANSFORM}/v1783185656/Tower_Landmark_Sunrise._Free_Stock_Video_-_Pixabay_x7bisu.mp4`,
    poster: `https://res.cloudinary.com/dj5mylqf1/video/upload/${POSTER_TRANSFORM}/v1783185656/Tower_Landmark_Sunrise._Free_Stock_Video_-_Pixabay_x7bisu.jpg`,
    title: "Sunrise Over the City", // TODO: confirm/adjust title
    subtitle: "Iconic landmarks lit by first light",
  },
  {
    src: `https://res.cloudinary.com/dj5mylqf1/video/upload/${VIDEO_TRANSFORM}/v1783185415/Sri_Lanka_Videos__Download_66_Free_4K_HD_Stock_Footage_Clips_-_Pixabay_rhnxs3.mp4`,
    poster: `https://res.cloudinary.com/dj5mylqf1/video/upload/${POSTER_TRANSFORM}/v1783185415/Sri_Lanka_Videos__Download_66_Free_4K_HD_Stock_Footage_Clips_-_Pixabay_rhnxs3.jpg`,
    title: "Island Highlights", // TODO: confirm/adjust title
    subtitle: "A glimpse of Sri Lanka's natural beauty",
  },
  {
    src: `https://res.cloudinary.com/dj5mylqf1/video/upload/${VIDEO_TRANSFORM}/v1783185215/Bridge_Old_Bridge_River._Free_Stock_Video_-_Pixabay_kswiko.mp4`,
    poster: `https://res.cloudinary.com/dj5mylqf1/video/upload/${POSTER_TRANSFORM}/v1783185215/Bridge_Old_Bridge_River._Free_Stock_Video_-_Pixabay_kswiko.jpg`,
    title: "Historic River Bridge", // TODO: confirm/adjust title
    subtitle: "Timeless crossings over Sri Lanka's rivers",
  },
  {
    src: `https://res.cloudinary.com/dj5mylqf1/video/upload/${VIDEO_TRANSFORM}/v1783184326/242272_m0xkut.mov`,
    poster: `https://res.cloudinary.com/dj5mylqf1/video/upload/${POSTER_TRANSFORM}/v1783184326/242272_m0xkut.jpg`,
    title: "Elephants in Sri Lanka", // TODO: confirm/adjust title
    subtitle: "Discover the island's natural wonders",
  },
  {
    src: `https://res.cloudinary.com/dj5mylqf1/video/upload/${VIDEO_TRANSFORM}/v1783184040/211328_gj1fd0.mov`,
    poster: `https://res.cloudinary.com/dj5mylqf1/video/upload/${POSTER_TRANSFORM}/v1783184040/211328_gj1fd0.jpg`,
    title: "Scenic Sri Lanka", // TODO: confirm/adjust title
    subtitle: "Discover the island's hidden beauty",
  },
];

export type HeroSlideInput = {
  type?: "video" | "image";
  src: string;
  poster?: string;
  title: string;
  subtitle: string;
};

type Slide = { type: "video" | "image"; src: string; poster?: string; title: string; subtitle: string };

/** Slides saved from the admin panel -> optimised Cloudinary URLs (same transforms as the built-in slides). */
function toSlide(s: HeroSlideInput): Slide {
  const type = s.type === "image" ? "image" : "video";
  let src = s.src;
  let poster = s.poster;
  if (type === "video" && /\/video\/upload\/v\d+\//.test(src)) {
    poster = poster || src.replace(/\/video\/upload\/(v\d+\/)/, `/video/upload/${POSTER_TRANSFORM}/$1`).replace(/\.(mp4|mov|webm|m4v)(\?.*)?$/i, ".jpg");
    src = src.replace(/\/video\/upload\/(v\d+\/)/, `/video/upload/${VIDEO_TRANSFORM}/$1`);
  }
  return { type, src, poster, title: s.title, subtitle: s.subtitle };
}

export default function HeroVideo({ slides }: { slides?: HeroSlideInput[] }) {
  const t = useTranslations("hero");
  const SLIDES: Slide[] = slides && slides.length ? slides.map(toSlide) : DEFAULT_SLIDES.map((d) => ({ ...d, type: "video" as const }));
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  // null until the preference is read after hydration, so the slide timer never starts before React can advance it.
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);
  const [inView, setInView] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView && !paused && !reducedMotion) {
      void video.play().catch(() => { /* The poster remains visible if autoplay is blocked. */ });
    } else {
      video.pause();
    }
  }, [current, inView, paused, reducedMotion]);

  // Slide & Progress Logic: the active step fills with a CSS animation (runs on the compositor, no per-frame
  // JavaScript) and the slide advances when it ends. Pausing freezes the fill; resuming restarts the slide's timer.
  const running = inView && !paused && reducedMotion === false && SLIDES.length > 1;
  const [run, setRun] = useState(0);
  const [wasRunning, setWasRunning] = useState(running);
  if (running !== wasRunning) {
    setWasRunning(running);
    if (running) setRun((r) => r + 1);
  }

  const slide = SLIDES[current % SLIDES.length];

  return (
    <section ref={sectionRef} className="hero-section relative flex flex-col overflow-hidden bg-slate-950 text-white" aria-label={t("brand")}>
      {slide.type === "image" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.title}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.02)", willChange: "transform" }}
        />
      ) : (
        <video
          ref={videoRef}
          key={slide.src}
          autoPlay={!paused && !reducedMotion}
          muted
          playsInline
          loop
          aria-hidden="true"
          poster={slide.poster} // Cloudinary-generated poster — critical for LCP
          preload="metadata"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            // Use transform3d for hardware acceleration
            transform: "scale(1.02)",
            willChange: "transform", // Hints browser to optimize
          }}
        >
          <source src={slide.src.replace(VIDEO_TRANSFORM, MOBILE_VIDEO_TRANSFORM)} media="(max-width: 767px)" />
          <source src={slide.src} />
        </video>
      )}

      <div className="absolute inset-0 bg-linear-to-r from-slate-950/75 via-slate-950/30 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />

      <div className="hero-copy relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pb-12 pt-40 sm:px-10 lg:px-16">
        <h1 className="hero-display max-w-4xl font-playfair text-4xl leading-[1.08] sm:text-6xl lg:text-7xl">{t("brand")}</h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl">{t("subtitle")}</p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Link href="/tours" className="rounded-full bg-amber-400 px-7 py-4 font-semibold text-slate-950 transition-colors hover:bg-amber-300">{t("cta")}</Link>
          <Link href="/contact" className="rounded-full border border-white/60 bg-white/10 px-7 py-4 font-semibold backdrop-blur-sm transition-colors hover:bg-white/20">{t("ctaContact")}</Link>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-wrap items-end justify-between gap-6 px-6 pb-24 sm:px-10 lg:px-16">
        <div className="max-w-xl">
          <p className="text-xl font-semibold sm:text-2xl">{slide.title}</p>
          <p className="mt-2 text-sm text-white/80 sm:text-base">{slide.subtitle}</p>
          <div className="hero-slide-selector mt-5 flex gap-2" role="group" aria-label={t("brand")}>
            {SLIDES.map((item, index) => (
              <button key={`${item.src}-${index}`} type="button" aria-label={item.title} aria-current={current === index ? "true" : undefined} onClick={() => setCurrent(index)} className="hero-slide-step">
                {current === index && reducedMotion === false ? (
                  <span
                    key={run}
                    className={running ? "is-running" : "is-running is-paused"}
                    style={{ animationDuration: `${SLIDE_DURATION}ms` }}
                    onAnimationEnd={() => setCurrent((c) => (c + 1) % SLIDES.length)}
                  />
                ) : (
                  <span />
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button type="button" aria-label={t("previousSlide")} onClick={() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length)} className="hero-control"><ChevronLeft size={20} /></button>
          <button type="button" aria-label={paused ? t("playSlideshow") : t("pauseSlideshow")} aria-pressed={paused} onClick={() => setPaused((value) => !value)} className="hero-control">{paused ? <Play size={18} /> : <Pause size={18} />}</button>
          <button type="button" aria-label={t("nextSlide")} onClick={() => setCurrent((c) => (c + 1) % SLIDES.length)} className="hero-control"><ChevronRight size={20} /></button>
        </div>
      </div>
      <div className="hero-edge-fade" aria-hidden="true" />
    </section>
  );
}
