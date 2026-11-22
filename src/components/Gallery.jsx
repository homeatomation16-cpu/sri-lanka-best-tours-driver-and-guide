"use client";

/**
 * GALLERY — masonry photo grid with a lightbox.
 *
 * Photos come from Admin → Website Content → Gallery (passed in as `items`);
 * if nothing was saved there, the built-in tour photos are used.
 * The homepage shows the first MAX_PHOTOS; "See more" shows the rest. Click a photo to open the lightbox:
 * ← / → or the arrow buttons move between photos, Esc or the backdrop closes it.
 */
import CinematicSection from "@/components/cinematic/CinematicSection";
import DecoShapes from "@/components/home/DecoShapes";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { TOUR_GALLERIES } from "../data/gallery";

const MAX_PHOTOS = 8; // shown before "See more"

export default function Gallery({ items, heading }) {
  const t = useTranslations("gallery");
  const th = useTranslations("home.gallery");
  const all = Array.isArray(items) ? items : Object.values(TOUR_GALLERIES).flat();
  const [expanded, setExpanded] = useState(false);
  const images = expanded ? all : all.slice(0, MAX_PHOTOS);

  const [open, setOpen] = useState(-1); // index of the photo in the lightbox, -1 = closed
  const closeRef = useRef(null);
  const lastFocus = useRef(null);

  const show = (i) => { lastFocus.current = document.activeElement; setOpen(i); };
  const close = useCallback(() => { setOpen(-1); lastFocus.current?.focus?.(); }, []);
  const step = useCallback((d) => setOpen((i) => (i + d + images.length) % images.length), [images.length]);

  // Keyboard + scroll lock while the lightbox is open.
  useEffect(() => {
    if (open < 0) return;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(document.dir === "rtl" ? -1 : 1);
      if (e.key === "ArrowLeft") step(document.dir === "rtl" ? 1 : -1);
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = overflow; window.removeEventListener("keydown", onKey); };
  }, [open, close, step]);

  if (images.length === 0) return null;
  const current = open >= 0 ? images[open] : null;

  return (
    <CinematicSection key={images.map((image) => image.src).join(",")} className="gallery-section home-section-spacing relative isolate overflow-hidden text-white">
      <DecoShapes tone="dark" />
      <div className="mx-auto max-w-7xl px-6">
        <div data-rise3d="self" className="mb-10 text-center">
          <p className="mb-3 text-amber-300">{heading?.label || t("label")}</p>
          <h2 className="font-playfair text-4xl lg:text-5xl">{heading?.title || t("heading")}</h2>
        </div>

        {/* Masonry: CSS columns keep each photo's natural shape */}
        <div className="masonry" data-rise3d>
          {images.map((item, i) => (
            <figure key={item.src + i} className="masonry-item lift-card">
              <button type="button" className="masonry-button group" onClick={() => show(i)} aria-label={`${th("open")}: ${item.caption || item.alt || i + 1}`}>
                <span className={`masonry-photo ${["ratio-tall", "ratio-wide", "ratio-square"][i % 3]}`}>
                  <span className="reveal-img">
                    <Image src={item.src} alt={item.alt || ""} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" quality={60} className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </span>
                  <span className="masonry-shade" />
                  <span className="masonry-zoom"><Expand size={18} aria-hidden="true" /></span>
                  {item.caption && <span className="masonry-caption">{item.caption}</span>}
                </span>
              </button>
            </figure>
          ))}
        </div>

        {all.length > MAX_PHOTOS && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-slate-900"
            >
              {expanded ? th("less") : `${th("more")} (${all.length - MAX_PHOTOS})`}
              <ChevronDown size={18} aria-hidden="true" className={expanded ? "rotate-180 transition" : "transition"} />
            </button>
          </div>
        )}
      </div>

      {/* Portal: the section uses perspective/transforms, which would trap a fixed overlay */}
      {current && createPortal(
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={current.alt || current.caption || th("open")} onClick={close}>
          <button ref={closeRef} type="button" className="lightbox-btn lightbox-close" onClick={close} aria-label={th("close")}><X size={22} /></button>
          {images.length > 1 && (
            <>
              <button type="button" className="lightbox-btn lightbox-prev" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label={th("prev")}><ChevronLeft size={26} /></button>
              <button type="button" className="lightbox-btn lightbox-next" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label={th("next")}><ChevronRight size={26} /></button>
            </>
          )}
          <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-photo">
              <Image key={current.src} src={current.src} alt={current.alt || ""} fill sizes="90vw" quality={80} className="object-contain" />
            </div>
            <figcaption className="lightbox-caption">
              <span>{current.caption}</span>
              <span className="text-white/60">{th("counter", { current: open + 1, total: images.length })}</span>
            </figcaption>
          </figure>
        </div>,
        document.body,
      )}
    </CinematicSection>
  );
}
