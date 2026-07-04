"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const SLIDE_DURATION = 8000;

// Shared Cloudinary transformation strings — kept as constants so all three
// slides stay in sync if you tune quality/width later.
const VIDEO_TRANSFORM = "w_1920,c_limit,q_auto:good,f_auto,vc_auto";
const POSTER_TRANSFORM = "so_auto,f_auto,q_auto,w_1920";

const SLIDES = [
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
    title: "Elipents in Sri Lanka", // TODO: confirm/adjust title
    subtitle: "Discover the island's natural wonders",
  },
  {
    src: `https://res.cloudinary.com/dj5mylqf1/video/upload/${VIDEO_TRANSFORM}/v1783184040/211328_gj1fd0.mov`,
    poster: `https://res.cloudinary.com/dj5mylqf1/video/upload/${POSTER_TRANSFORM}/v1783184040/211328_gj1fd0.jpg`,
    title: "Scenic Sri Lanka", // TODO: confirm/adjust title
    subtitle: "Discover the island's hidden beauty",
  },
];

export default function HeroVideo() {
  const t = useTranslations("hero");
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [inView, setInView] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);

  // Intersection Observer to stop video when not visible (saves CPU)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (videoRef.current) {
          entry.isIntersecting ? videoRef.current.play() : videoRef.current.pause();
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Optimized Scroll Listener (only runs if in view)
  useEffect(() => {
    if (!inView) return;
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true }); // Passive for performance
    return () => window.removeEventListener("scroll", onScroll);
  }, [inView]);

  // Slide & Progress Logic
  useEffect(() => {
    if (!inView) return; // Don't cycle slides if user isn't looking

    let start = performance.now();
    const animate = (time: number) => {
      const p = Math.min((time - start) / SLIDE_DURATION, 1);
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCurrent((c) => (c + 1) % SLIDES.length);
        setProgress(0);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [current, inView]);

  const slide = SLIDES[current];

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-black">
      <video
        ref={videoRef}
        key={slide.src}
        autoPlay
        muted
        playsInline
        loop={false}
        poster={slide.poster} // Cloudinary-generated poster — critical for LCP
        preload="metadata" // Keep as metadata: poster handles LCP, no need to eagerly buffer the payload
        fetchPriority={current === 0 ? "high" : "auto"} // LCP fix: only prioritize the first slide
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          // Use transform3d for hardware acceleration
          transform: `scale(1.1) translate3d(0, ${scrollY * 0.15}px, 0)`,
          willChange: "transform", // Hints browser to optimize
        }}
      >
        <source src={slide.src} type="video/mp4" />
      </video>

      {/* Overlay & Content */}
      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/70" />

      <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-20 text-white max-w-4xl">
        <h1 className="text-5xl md:text-8xl font-bold leading-tight">{slide.title}</h1>
        <p className="mt-4 text-lg md:text-xl opacity-90">{slide.subtitle}</p>

        <Link
          href="/tours"
          aria-label={t("cta")} // Accessibility fix
          className="mt-8 px-8 py-4 rounded-full bg-linear-to-r from-orange-600 to-amber-500 font-bold transition-transform hover:scale-105 inline-block w-fit"
        >
          {t("cta")}
        </Link>

        {/* GPU Accelerated Progress Bar */}
        <div className="mt-10 w-32 h-1 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-linear-to-r from-orange-500 to-yellow-400 origin-left" style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>
    </section>
  );
}
