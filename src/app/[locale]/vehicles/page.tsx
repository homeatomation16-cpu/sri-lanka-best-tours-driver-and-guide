"use client";

import Image from "next/image";
import Link from "next/link";
import { Users, ChevronRight, Fuel, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { vehicles } from "@/data/vehicles/en";

export default function VehiclesPage() {
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

  // Group vehicles by type for display
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
        @keyframes vl-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .vl-hero-text { animation: vl-fade-up 0.7s cubic-bezier(.22,1,.36,1) 0.1s both; }
        .vl-hero-sub  { animation: vl-fade-up 0.7s cubic-bezier(.22,1,.36,1) 0.25s both; }
        .vl-hero-badge{ animation: vl-fade-up 0.6s cubic-bezier(.22,1,.36,1) 0.4s both; }
        .vl-grid-anim { animation: vl-fade-up 0.65s cubic-bezier(.22,1,.36,1) 0.1s both; }

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

        .vl-tag {
          display: inline-block;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 100px;
          background: #FEF2E8;
          color: #B5541A;
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
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: background 0.25s ease, transform 0.2s ease;
        }
        .vl-card:hover .vl-btn {
          background: #B5541A;
        }

        .vl-section-label {
          font-family: 'Outfit', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #B5541A;
        }

        .vl-divider {
          width: 40px;
          height: 2px;
          background: #B5541A;
          border-radius: 2px;
          margin: 0 auto;
        }

        .vl-type-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Outfit', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 8px 20px;
          border-radius: 100px;
          border: 1px solid rgba(0,0,0,0.1);
          color: #1A1714;
          background: #FAFAF8;
        }
        .vl-type-pill.active {
          background: #1A1714;
          color: #fff;
          border-color: #1A1714;
        }

        .vl-stat-strip {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Outfit', sans-serif;
          font-size: 11px;
          font-weight: 500;
          color: #888;
        }

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
      `}</style>

      <div className="vl-sans min-h-screen" style={{ background: "#FAFAF8" }}>

        {/* ── HERO ── */}
        <section className="relative overflow-hidden" style={{ height: "min(60vh, 520px)", minHeight: "360px" }}>
          <Image
            src="/vehicles.jpg"
            alt="Our Fleet"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Soft overlay — not pitch black */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to bottom, rgba(10,8,6,0.05) 0%, rgba(10,8,6,0.62) 60%, rgba(10,8,6,0.82) 100%)"
          }} />

          <div className="absolute inset-0 flex flex-col items-center justify-end pb-14 px-6 text-center">
            <div className="vl-hero-badge mb-5" style={{
              display: "inline-block",
              padding: "6px 18px",
              borderRadius: "100px",
              background: "rgba(181,84,26,0.22)",
              border: "1px solid rgba(181,84,26,0.45)",
              backdropFilter: "blur(8px)",
            }}>
              <span className="vl-section-label" style={{ color: "#F4A96B" }}>
                {t("heading")}
              </span>
            </div>

            <h1 className="vl-serif vl-hero-text text-white mb-4" style={{
              fontSize: "clamp(38px, 7vw, 82px)",
              fontWeight: 300,
              lineHeight: 0.92,
              letterSpacing: "-0.01em",
            }}>
              Our <em style={{ fontStyle: "italic", fontWeight: 600, color: "#F4A96B" }}>Fleet</em>
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

          {/* Soft bottom fade to page bg */}
          <div className="absolute bottom-0 left-0 right-0" style={{
            height: "80px",
            background: "linear-gradient(to bottom, transparent, #FAFAF8)",
          }} />
        </section>

        {/* ── INTRO ── */}
        <section className="text-center px-6 py-14 max-w-2xl mx-auto">
          <div className="vl-divider mb-6" />
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

        {/* ── STATS STRIP ── */}
        <section className="py-8 px-6 mb-6">
          <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4">
            {[
              { num: "7+", label: "Vehicle Types" },
              { num: "9", label: "Driver Languages" },
              { num: "10+", label: "Years Experience" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="vl-serif" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 600, color: "#1A1714", lineHeight: 1 }}>
                  {s.num}
                </div>
                <div className="vl-section-label mt-2" style={{ color: "#999" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── VEHICLE GROUPS ── */}
        <main className="max-w-7xl mx-auto px-6 pb-28 space-y-20">

          {/* Cars */}
          {cars.length > 0 && (
            <VehicleGroup label="Cars" type="Car" vehicles={cars} t={t} />
          )}

          {/* Vans */}
          {vans.length > 0 && (
            <VehicleGroup label="Vans" type="Van" vehicles={vans} t={t} />
          )}

          {/* Buses */}
          {buses.length > 0 && (
            <VehicleGroup label="Buses" type="Bus" vehicles={buses} t={t} />
          )}

        </main>
      </div>
    </>
  );
}

// ── Vehicle Group ──
function VehicleGroup({
  label,
  vehicles: items,
  t,
}: {
  label: string;
  type: string;
  vehicles: ReturnType<typeof import("@/data/vehicles/en").vehicles.filter>;
  t: ReturnType<typeof import("next-intl").useTranslations>;
}) {
  return (
    <div>
      {/* Group header */}
      <div className="flex items-center gap-5 mb-8">
        <div style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#B5541A",
          whiteSpace: "nowrap",
        }}>
          {label}
        </div>
        <div style={{ flex: 1, height: "0.5px", background: "rgba(0,0,0,0.1)" }} />
        <div style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "10px",
          fontWeight: 600,
          color: "#bbb",
          letterSpacing: "0.12em",
        }}>
          {items.length} {items.length === 1 ? "vehicle" : "vehicles"}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((v) => (
          <VehicleCard key={v.id} v={v} t={t} />
        ))}
      </div>
    </div>
  );
}

// ── Vehicle Card ──
function VehicleCard({
  v,
  t,
}: {
  v: (typeof import("@/data/vehicles/en").vehicles)[number];
  t: ReturnType<typeof import("next-intl").useTranslations>;
}) {
  const src = v.image?.trim() ? v.image : "/placeholder.jpg";

  return (
    <Link href={`/vehicles/${v.id}`} className="vl-card block">
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: "240px" }}>
        <Image
          src={src}
          alt={v.name}
          fill
          className="vl-card-img object-cover"
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, transparent 40%, rgba(10,8,6,0.55) 100%)"
        }} />

        {v.price && (
          <div className="vl-price-badge">
            {v.price}
            <span style={{ fontSize: "9px", fontWeight: 400, color: "#bbb", marginLeft: "3px" }}>/ day</span>
          </div>
        )}

        <div className="vl-type-badge">{v.type}</div>
      </div>

      {/* Content */}
      <div style={{ padding: "24px 24px 20px" }}>
        {/* Name */}
        <h2 className="vl-serif mb-3" style={{
          fontSize: "clamp(22px, 3vw, 28px)",
          fontWeight: 600,
          color: "#1A1714",
          lineHeight: 1.1,
        }}>
          {v.name}
        </h2>

        {/* Stats row */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
          <div className="vl-stat-strip">
            <Users size={13} strokeWidth={2} style={{ color: "#B5541A" }} />
            <span>{v.passengers} seats</span>
          </div>
          <div style={{ width: "1px", height: "14px", background: "rgba(0,0,0,0.1)" }} />
          <div className="vl-stat-strip">
            <Settings size={13} strokeWidth={2} style={{ color: "#B5541A" }} />
            <span>{v.transmission}</span>
          </div>
          <div style={{ width: "1px", height: "14px", background: "rgba(0,0,0,0.1)" }} />
          <div className="vl-stat-strip">
            <Fuel size={13} strokeWidth={2} style={{ color: "#B5541A" }} />
            <span>{v.fuel}</span>
          </div>
        </div>

        {/* Features */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
          {v.features?.slice(0, 3).map((f: string, i: number) => (
            <span key={i} className="vl-tag">{f}</span>
          ))}
        </div>

        {/* CTA */}
        <div className="vl-btn">
          {t("viewDetails")}
          <ChevronRight size={14} strokeWidth={2.5} />
        </div>
      </div>
    </Link>
  );
}