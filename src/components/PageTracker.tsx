"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

/** Sends one anonymous page-view per navigation. Random browser id, no cookies, no IP stored. */
export default function PageTracker() {
  const pathname = usePathname();
  const locale = useLocale();

  useEffect(() => {
    if (!pathname || /^\/([a-z]{2}\/)?(admin|login)/.test(pathname)) return;
    let visitor = "";
    try {
      visitor = localStorage.getItem("vid") || "";
      if (!visitor) { visitor = Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem("vid", visitor); }
    } catch {}
    const body = JSON.stringify({ path: pathname, locale, visitor, referrer: document.referrer });
    if (navigator.sendBeacon) navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
    else fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true }).catch(() => {});
  }, [pathname, locale]);

  return null;
}
