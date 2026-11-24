"use client";

import { useEffect, useRef, useState } from "react";

/** Reserve the map's existing space, but create its browsing context only nearby. */
export default function DeferredMap({ src, title, className, allowFullScreen = false }: {
  src: string;
  title: string;
  className: string;
  allowFullScreen?: boolean;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setReady(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      setReady(true);
    }, { rootMargin: "400px 0px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={host} className={className}>
      {ready && <iframe src={src} title={title} loading="eager" referrerPolicy="no-referrer-when-downgrade" allowFullScreen={allowFullScreen} className="block h-full w-full border-0" />}
    </div>
  );
}
