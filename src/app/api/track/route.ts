import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PageView from "@/models/PageView";

export const runtime = "nodejs";

const BOT = /bot|crawl|spider|slurp|bing|facebookexternalhit|preview|monitor|lighthouse|headless/i;

/** Public, privacy-friendly page view counter (no IP address is stored). */
export async function POST(req: Request) {
  try {
    const ua = req.headers.get("user-agent") || "";
    if (BOT.test(ua)) return NextResponse.json({ ok: true, skipped: "bot" });

    const b = await req.json().catch(() => ({}));
    const path = String(b.path || "").slice(0, 200);
    if (!path.startsWith("/") || /^\/([a-z]{2}\/)?(admin|login)/.test(path)) return NextResponse.json({ ok: true, skipped: true });

    let ref = "";
    try {
      const u = new URL(String(b.referrer || ""));
      ref = u.hostname.replace(/^www\./, "");
    } catch {}

    const device = /ipad|tablet/i.test(ua) ? "tablet" : /mobi|android|iphone/i.test(ua) ? "mobile" : "desktop";
    const country = req.headers.get("x-vercel-ip-country") || req.headers.get("cf-ipcountry") || "";

    await connectDB();
    await PageView.create({
      path,
      locale: String(b.locale || "").slice(0, 5),
      visitor: String(b.visitor || "").slice(0, 40),
      referrer: ref,
      device,
      country,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 }); // never break the website because of analytics
  }
}
