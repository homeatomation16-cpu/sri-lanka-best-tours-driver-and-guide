"use client";

import Image from "next/image";
import Link from "next/link";
import { Users, ChevronRight, Fuel, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

// 1. Props සඳහා Interface එක (TypeScript Error එක විසඳීමට මෙය ඉතා වැදගත්)
interface VehiclesPageClientProps {
  vehicles: any[]; // MongoDB එකෙන් එන වාහන ලැයිස්තුව
  locale: string;
}

export default function VehiclesPageClient({ vehicles, locale }: VehiclesPageClientProps) {
  const t = useTranslations("vehicles");

  const languageDrivers = [
    "English Speaking",
    "French Speaking",
    "German Speaking",
    "Hindi Speaking",
    "Spanish Speaking",
    "Italian Speaking",
    "Arabic Speaking",
    "Russian Speaking",
  ];

  const [currentLang, setCurrentLang] = useState(0);
  const [fadeState, setFadeState] = useState<"in" | "out">("in");

  // Language Animation Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState("out");
      setTimeout(() => {
        setCurrentLang((prev) =>
          prev === languageDrivers.length - 1 ? 0 : prev + 1
        );
        setFadeState("in");
      }, 350);
    }, 2800);
    return () => clearInterval(interval);
  }, [languageDrivers.length]);

  // MongoDB දත්ත වර්ග (Type) අනුව Group කිරීම
  const cars = vehicles.filter((v) => v.type === "Car");
  const vans = vehicles.filter((v) => v.type === "Van");
  const buses = vehicles.filter((v) => v.type === "Bus");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');
        .vl-serif { font-family: 'Cormorant Garamond', serif; }
        .vl-sans  { font-family: 'Outfit', sans-serif; }

        @keyframes vl-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .vl-hero-text { animation: vl-fade-up 0.7s cubic-bezier(.22,1,.36,1) 0.1s both; }
        .vl-hero-sub  { animation: vl-fade-up 0.7s cubic-bezier(.22,1,.36,1) 0.25s both; }

        .vl-lang-in  { opacity: 1; transform: translateY(0);   transition: opacity 0.35s ease, transform 0.35s ease; }
        .vl-lang-out { opacity: 0; transform: translateY(-6px); transition: opacity 0.35s ease, transform 0.35s ease; }

        .vl-card {
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.07);
          transition: transform 0.45s cubic-bezier(.22,1,.36,1), box-shadow 0.45s cubic-bezier(.22,1,.36,1);
        }
        .vl-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 48px rgba(181,84,26,0.10), 0 4px 12px rgba(0,0,0,0.06);
        }
        .vl-card:hover .vl-card-img { transform: scale(1.06); }
        .vl-card-img { transition: transform 1s cubic-bezier(.22,1,.36,1); }

        .vl-price-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(12px);
          padding: 8px 16px;
          border-radius: 100px;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #B5541A;
          border: 1px solid rgba(255,255,255,0.8);
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
        }
        .vl-type-badge {
          position: absolute;
          bottom: 16px;
          left: 16px;
          background: rgba(26,23,20,0.85);
          backdrop-filter: blur(8px);
          padding: 5px 14px;
          border-radius: 100px;
          font-family: 'Outfit', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.9);
        }
        .vl-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 14px 20px;
          border-radius: 12px;
          background: #1A1714;
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          transition: background 0.25s ease;
        }
        .vl-card:hover .vl-btn { background: #B5541A; }
      `}</style>

      <div className="vl-sans min-h-screen" style={{ background: "#FAFAF8" }}>
        {/* ── HERO SECTION ── */}
        <section className="relative overflow-hidden" style={{ height: "min(60vh, 520px)", minHeight: "360px" }}>
          <Image
            src="/vehicles.jpg"
            alt="Our Fleet"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to bottom, rgba(10,8,6,0.05) 0%, rgba(10,8,6,0.62) 60%, rgba(10,8,6,0.82) 100%)"
          }} />

          <div className="absolute inset-0 flex flex-col items-center justify-end pb-14 px-6 text-center">
            <h1 className="vl-serif vl-hero-text text-white mb-4" style={{
              fontSize: "clamp(38px, 7vw, 82px)",
              fontWeight: 300,
              lineHeight: 0.92,
            }}>
              Our <em style={{ fontStyle: "italic", fontWeight: 600, color: "#F4A96B" }}>Vehicles</em>
            </h1>

            <div className="vl-hero-sub" style={{ height: "36px", display: "flex", alignItems: "center" }}>
              <p className="vl-sans" style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", letterSpacing: "0.04em" }}>
                {t("desc")}&nbsp;
                <span
                  className={fadeState === "in" ? "vl-lang-in" : "vl-lang-out"}
                  style={{
                    display: "inline-block",
                    color: "#F4A96B",
                    fontWeight: 600,
                    fontSize: "13px",
                  }}
                >
                  {languageDrivers[currentLang]}
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* ── INTRO SECTION ── */}
        <section className="text-center px-6 py-14 max-w-2xl mx-auto">
          <div className="w-10 h-0.5 bg-[#B5541A] mx-auto mb-6" />
          <p className="vl-serif" style={{
            fontSize: "clamp(17px, 2.5vw, 22px)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "#4A4540",
            lineHeight: 1.65,
          }}>
            "Modern, comfortable, and meticulously maintained — travel across Sri Lanka
            with our professional multilingual chauffeurs."
          </p>
        </section>

        {/* ── VEHICLE GROUPS ── */}
        <main className="max-w-7xl mx-auto px-6 pb-28 space-y-20">
          {cars.length > 0 && (
            <VehicleGroup label="Cars" items={cars} t={t} locale={locale} />
          )}

          {vans.length > 0 && (
            <VehicleGroup label="Vans" items={vans} t={t} locale={locale} />
          )}

          {buses.length > 0 && (
            <VehicleGroup label="Buses" items={buses} t={t} locale={locale} />
          )}
        </main>
      </div>
    </>
  );
}

// ── Helper Component: Vehicle Group ──
function VehicleGroup({ label, items, t, locale }: any) {
  return (
    <div>
      <div className="flex items-center gap-5 mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-[#B5541A]">
        {label}
        <div className="flex-1 h-px bg-black/5" />
        <span className="text-zinc-300 font-medium">{items.length} Units</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((v: any) => (
          <VehicleCard key={v.vehicleId} v={v} t={t} locale={locale} />
        ))}
      </div>
    </div>
  );
}

// ── Helper Component: Vehicle Card ──
function VehicleCard({ v, t, locale }: any) {
  // භාෂාව අනුව දත්ත ලබා ගැනීම (Translations Map එකෙන්)
  const data = v.translations?.[locale] || v.translations?.["en"] || v;

  return (
    <Link href={`/${locale}/vehicles/${v.vehicleId}`} className="vl-card block">
      <div className="relative overflow-hidden" style={{ height: "240px" }}>
        <Image
          src={v.image || "/placeholder.jpg"}
          alt={data.name}
          fill
          className="vl-card-img object-cover"
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, transparent 40%, rgba(10,8,6,0.55) 100%)"
        }} />

        <div className="vl-price-badge">
          {v.price}
          <span style={{ fontSize: "9px", fontWeight: 400, color: "#bbb", marginLeft: "3px" }}>/ day</span>
        </div>

        <div className="vl-type-badge">{v.type}</div>
      </div>

      <div style={{ padding: "24px 24px 20px" }}>
        <h2 className="vl-serif mb-3" style={{
          fontSize: "clamp(22px, 3vw, 28px)",
          fontWeight: 600,
          color: "#1A1714",
          lineHeight: 1.1,
        }}>
          {data.name}
        </h2>

        {/* Stats row */}
        <div className="flex items-center gap-4 mb-6 text-zinc-500 text-[11px] font-medium border-y border-black/5 py-4">
          <div className="flex items-center gap-1.5">
            <Users size={13} className="text-[#B5541A]" /> {v.passengers} seats
          </div>
          <div className="flex items-center gap-1.5 border-l border-black/5 pl-4">
            <Settings size={13} className="text-[#B5541A]" /> {v.transmission}
          </div>
          <div className="flex items-center gap-1.5 border-l border-black/5 pl-4">
            <Fuel size={13} className="text-[#B5541A]" /> {v.fuel}
          </div>
        </div>

        {/* CTA Button */}
        <div className="vl-btn">
          {t("viewDetails")}
          <ChevronRight size={14} strokeWidth={2.5} />
        </div>
      </div>
    </Link>
  );
}