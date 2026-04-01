"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Mail, ChevronRight, RefreshCw, Edit2,
  Check, X, Calendar, Ticket, Train, Plane, Phone,
} from "lucide-react";
import { contact } from "@/data/contact";

// ── initial form ──
const initialForm = {
  travelStyle: "",
  vehicleType: "Car",
  transportMethod: "",
  holidayType: [] as string[],
  accommodation: "3 Star",
  mealPlan: "",
  additionalServices: { trainTickets: false, entranceTickets: false, airportTransfer: false },
  additionalRequirements: "",
  adults: 1,
  children: 0,
  startDate: "",
  endDate: "",
  name: "",
  email: "",
  whatsapp: "+94",
};

const holidayOptions = [
  { name: "Nature, Wildlife & Safari", icon: "🦁" },
  { name: "Cultural & Heritage", icon: "🏛️" },
  { name: "Beach Relaxing", icon: "🏖️" },
  { name: "Trekking & Climbing", icon: "⛰️" },
  { name: "Activity and Game", icon: "🎯" },
  { name: "Boat trips & Island visits", icon: "⛵" },
  { name: "Train Rides", icon: "🚂" },
  { name: "Factory Visits", icon: "🏭" },
  { name: "Water Sports", icon: "🏄" },
  { name: "Snorkelling & Diving", icon: "🤿" },
  { name: "Whales and Dolphins", icon: "🐋" },
];

const mealPlans = ["Room only", "Bed & Breakfast", "Half Board", "Full Board", "All Inclusive"];
const travelStyles = [
  { label: "Relaxed", icon: "🌴", desc: "Easy pace" },
  { label: "Moderate", icon: "🚶", desc: "Balanced" },
  { label: "Active", icon: "🏃", desc: "On the go" },
  { label: "Luxury", icon: "💎", desc: "Premium" },
];

export default function TailorMadePage() {
  const t = useTranslations("tailorMade");

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [loading, setLoading] = useState(false);
  const [estimatedDays, setEstimatedDays] = useState(0);

  // OTP state
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(0);
  const [otpError, setOtpError] = useState("");
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer countdown
  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer((p) => p - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  // Duration calculation
  useEffect(() => {
    if (form.startDate && form.endDate) {
      const diff =
        Math.ceil(
          (new Date(form.endDate).getTime() - new Date(form.startDate).getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1;
      setEstimatedDays(diff > 0 ? diff : 0);
    } else {
      setEstimatedDays(0);
    }
  }, [form.startDate, form.endDate]);

  const setField = (field: string, value: unknown) => {
    setForm((s) => ({ ...s, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: null }));
  };

  const toggleHoliday = (name: string) => {
    setForm((s) => {
      const set = new Set(s.holidayType);
      set.has(name) ? set.delete(name) : set.add(name);
      return { ...s, holidayType: Array.from(set) };
    });
  };

  const handleServiceToggle = (key: string) => {
    setForm((s) => ({
      ...s,
      additionalServices: {
        ...s.additionalServices,
        [key]: !(s.additionalServices as Record<string, boolean>)[key],
      },
    }));
  };

  // ── Validation ──
  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.travelStyle) e.travelStyle = "Please select how you want to travel.";
    if (!form.transportMethod) e.transportMethod = "Choose a transportation method.";
    if (!form.holidayType.length) e.holidayType = "Choose at least one holiday type.";
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Valid email required.";
    if (!form.whatsapp || form.whatsapp.length < 7)
      e.whatsapp = "Valid phone number required.";
    if (!form.startDate) e.startDate = "Start date required.";
    if (!form.endDate) e.endDate = "End date required.";
    if (
      form.startDate &&
      form.endDate &&
      new Date(form.startDate) > new Date(form.endDate)
    )
      e.date = "End date must be after start date.";
    if (form.adults < 1) e.adults = "At least 1 adult required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Step 1: Send OTP ──
  const handleStartVerification = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, action: "send" }),
      });
      const data = await res.json();
      if (data.success) {
        setOtp(["", "", "", "", "", ""]);
        setOtpError("");
        setShowOtpModal(true);
        setTimer(60);
        setTimeout(() => otpRefs.current[0]?.focus(), 200);
      } else {
        alert("Could not send verification code. Please check your email.");
      }
    } catch {
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Resend OTP ──
  const handleResend = async () => {
    if (timer > 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, action: "send" }),
      });
      const data = await res.json();
      if (data.success) {
        setOtp(["", "", "", "", "", ""]);
        setOtpError("");
        setTimer(60);
        setTimeout(() => otpRefs.current[0]?.focus(), 100);
      }
    } catch {
      alert("Failed to resend. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── OTP digit input handler ──
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    setOtpError("");
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      otpRefs.current[5]?.focus();
    }
    e.preventDefault();
  };

  // ── Step 2: Verify OTP + Submit ──
  const handleVerifyAndSubmit = async () => {
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      setOtpError("Please enter all 6 digits.");
      return;
    }

    setLoading(true);
    try {
      // 1. Verify OTP
      const vRes = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, otp: otpValue, action: "verify" }),
      });
      const vData = await vRes.json();

      if (!vData.success) {
        setOtpError(vData.message || "Invalid or expired code.");
        setLoading(false);
        return;
      }

      // 2. Submit form data
      const res = await fetch("/api/tailor-made", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, estimatedDays }),
      });
      const data = await res.json();

      if (data.success) {
        setShowOtpModal(false);
        setShowSuccess(true);

        const message =
          `🌴 Tailor Made Tour Request (Verified ✅)\n\nName: ${form.name}\nEmail: ${form.email}\nWhatsApp: ${form.whatsapp}\n\nTravel Style: ${form.travelStyle}\nVehicle: ${form.vehicleType}\nTransport: ${form.transportMethod}\nHoliday Types: ${form.holidayType.join(", ")}\n\nAdults: ${form.adults} | Children: ${form.children}\nFrom: ${form.startDate} → To: ${form.endDate}\nDuration: ${estimatedDays} days\n\nAccommodation: ${form.accommodation}\nMeal Plan: ${form.mealPlan || "Not specified"}\n\nNotes: ${form.additionalRequirements || "None"}`.trim();

        window.open(
          `${contact.whatsappme}?text=${encodeURIComponent(message)}`,
          "_blank"
        );

        setTimeout(() => {
          setShowSuccess(false);
          setForm(initialForm);
          setOtp(["", "", "", "", "", ""]);
        }, 3000);
      }
    } catch {
      alert("Error submitting request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Progress ──
  const progress = (() => {
    const fields = ["travelStyle", "transportMethod", "holidayType", "startDate", "endDate", "name", "email", "whatsapp"];
    let filled = 0;
    fields.forEach((f) => {
      if (f === "holidayType") {
        if ((form as unknown as Record<string, unknown[]>)[f]?.length > 0) filled++;
      } else if (
        (form as Record<string, unknown>)[f] &&
        (form as Record<string, unknown>)[f] !== "+94"
      )
        filled++;
    });
    return (filled / fields.length) * 100;
  })();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');
        .tm-serif { font-family: 'Cormorant Garamond', serif; }
        .tm-sans  { font-family: 'Outfit', sans-serif; }

        @keyframes tm-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .tm-a1 { animation: tm-up 0.65s cubic-bezier(.22,1,.36,1) 0.08s both; }
        .tm-a2 { animation: tm-up 0.65s cubic-bezier(.22,1,.36,1) 0.2s both; }
        .tm-a3 { animation: tm-up 0.65s cubic-bezier(.22,1,.36,1) 0.32s both; }

        .tm-input {
          width: 100%; padding: 12px 16px; border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.1); background: #fff;
          font-family: 'Outfit', sans-serif; font-size: 13px; color: #1A1714;
          transition: border-color 0.2s ease, box-shadow 0.2s ease; outline: none;
        }
        .tm-input:focus { border-color: #B5541A; box-shadow: 0 0 0 3px rgba(181,84,26,0.08); }
        .tm-input.error { border-color: #ef4444; }

        .tm-style-card {
          padding: 16px 10px; border-radius: 14px; border: 1.5px solid rgba(0,0,0,0.08);
          background: #fff; cursor: pointer; text-align: center; transition: all 0.25s ease;
        }
        .tm-style-card:hover { border-color: rgba(181,84,26,0.3); transform: translateY(-2px); }
        .tm-style-card.active { border-color: #B5541A; background: #FEF2E8; transform: translateY(-2px); box-shadow: 0 4px 16px rgba(181,84,26,0.12); }

        .tm-chip {
          display: flex; align-items: center; gap: 8px; padding: 10px 14px;
          border-radius: 12px; border: 1px solid rgba(0,0,0,0.08); background: #fff;
          cursor: pointer; transition: all 0.2s ease; font-family: 'Outfit', sans-serif;
          font-size: 12px; font-weight: 500; color: #4A4540;
        }
        .tm-chip:hover { border-color: rgba(181,84,26,0.25); background: #FFFCF8; }
        .tm-chip.active { border-color: #B5541A; background: #FEF2E8; color: #B5541A; font-weight: 600; }
        .tm-chip .check-dot {
          width: 16px; height: 16px; border-radius: 50%;
          border: 1.5px solid rgba(0,0,0,0.15); display: flex;
          align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.2s ease;
        }
        .tm-chip.active .check-dot { background: #B5541A; border-color: #B5541A; }

        .tm-service {
          display: flex; align-items: center; gap: 10px; padding: 14px 16px;
          border-radius: 12px; border: 1px solid rgba(0,0,0,0.08); background: #fff;
          cursor: pointer; transition: all 0.2s ease; font-family: 'Outfit', sans-serif;
          font-size: 12px; font-weight: 500; color: #4A4540;
        }
        .tm-service:hover { border-color: rgba(181,84,26,0.2); }
        .tm-service.active { border-color: #B5541A; background: #FEF2E8; color: #B5541A; font-weight: 600; }
        .tm-service .toggle-box {
          width: 18px; height: 18px; border-radius: 5px; border: 1.5px solid rgba(0,0,0,0.15);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.2s ease;
        }
        .tm-service.active .toggle-box { background: #B5541A; border-color: #B5541A; }

        .tm-section-label { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
        .tm-section-label .num {
          width: 28px; height: 28px; border-radius: 50%; background: #1A1714; color: #fff;
          font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 700;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .tm-section-label .title {
          font-family: 'Outfit', sans-serif; font-size: 10px; font-weight: 700;
          letter-spacing: 0.25em; text-transform: uppercase; color: #B5541A;
        }
        .tm-section-label::after { content: ''; flex: 1; height: 0.5px; background: rgba(0,0,0,0.1); }

        .tm-submit {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 16px 36px; border-radius: 14px; background: #1A1714; color: #fff;
          font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase; border: none; cursor: pointer;
          transition: background 0.25s ease, transform 0.2s ease;
        }
        .tm-submit:hover:not(:disabled) { background: #B5541A; transform: translateY(-1px); }
        .tm-submit:disabled { opacity: 0.5; cursor: not-allowed; }

        .PhoneInput { display: flex; align-items: center; gap: 8px; }
        .PhoneInputInput { flex: 1; border: none; outline: none; font-family: 'Outfit', sans-serif; font-size: 13px; background: transparent; color: #1A1714; }
        .PhoneInputCountrySelect { background: transparent; border: none; outline: none; cursor: pointer; }

        .tm-progress-track { height: 3px; background: rgba(0,0,0,0.08); border-radius: 100px; overflow: hidden; }
        .tm-progress-fill { height: 100%; background: #B5541A; border-radius: 100px; transition: width 0.5s cubic-bezier(.22,1,.36,1); }

        .tm-error { font-family: 'Outfit', sans-serif; font-size: 11px; color: #ef4444; margin-top: 5px; display: flex; align-items: center; gap: 4px; }

        .tm-stepper { display: flex; align-items: center; border: 1px solid rgba(0,0,0,0.1); border-radius: 12px; overflow: hidden; background: #fff; }
        .tm-stepper button { width: 44px; height: 46px; border: none; background: transparent; font-size: 18px; font-weight: 300; color: #B5541A; cursor: pointer; transition: background 0.15s ease; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .tm-stepper button:hover { background: #FEF2E8; }
        .tm-stepper .val { flex: 1; text-align: center; font-family: 'Outfit', sans-serif; font-size: 16px; font-weight: 600; color: #1A1714; }

        /* OTP input boxes */
        .otp-digit {
          width: 52px; height: 60px; border-radius: 14px; border: 1.5px solid rgba(0,0,0,0.1);
          background: #fff; text-align: center; font-family: 'Outfit', sans-serif;
          font-size: 26px; font-weight: 700; color: #1A1714; outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          caret-color: #B5541A;
        }
        .otp-digit:focus { border-color: #B5541A; box-shadow: 0 0 0 3px rgba(181,84,26,0.1); }
        .otp-digit.filled { border-color: #B5541A; background: #FEF2E8; }
        .otp-digit.otp-err { border-color: #ef4444; background: #fff5f5; animation: otp-shake 0.35s ease; }

        @keyframes otp-shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-5px); }
          60%      { transform: translateX(5px); }
        }

        .tm-label {
          font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase; color: #888;
          display: block; margin-bottom: 10px;
        }
      `}</style>

      <div className="tm-sans min-h-screen" style={{ background: "#FAFAF8" }}>

        {/* ── HERO ── */}
        <section className="relative overflow-hidden" style={{ height: "min(55vh, 480px)", minHeight: "320px" }}>
          <Image src="/cover.jpg" alt="Tailor Made Tours" fill priority className="object-cover object-center" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,8,6,0.05) 0%, rgba(10,8,6,0.60) 55%, rgba(10,8,6,0.82) 100%)" }} />
          <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 pb-14 max-w-7xl mx-auto w-full">
            <div className="tm-a1 mb-4" style={{ display: "inline-flex" }}>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "9px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#F4A96B", background: "rgba(181,84,26,0.2)", border: "1px solid rgba(181,84,26,0.4)", backdropFilter: "blur(8px)", padding: "5px 16px", borderRadius: "100px" }}>
                {t("label")} · Sri Lanka
              </span>
            </div>
            <h1 className="tm-serif tm-a2 text-white" style={{ fontSize: "clamp(40px, 8vw, 92px)", fontWeight: 300, lineHeight: 0.9, letterSpacing: "-0.01em" }}>
              {t("heading")}<br />
              <em style={{ fontStyle: "italic", fontWeight: 600, color: "#F4A96B" }}>Journey</em>
            </h1>
            <p className="tm-a3 mt-4" style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", letterSpacing: "0.04em" }}>
              {t("desc")}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0" style={{ height: "90px", background: "linear-gradient(to bottom, transparent, #FAFAF8)" }} />
        </section>

        {/* ── PROGRESS BAR ── */}
        <div style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.06)", padding: "14px 24px", position: "sticky", top: 0, zIndex: 30 }}>
          <div className="max-w-7xl mx-auto">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#B5541A" }}>Form Progress</span>
              <span style={{ fontSize: "10px", fontWeight: 600, color: progress === 100 ? "#22c55e" : "#bbb" }}>
                {Math.round(progress)}% {progress === 100 ? "— Ready ✓" : "complete"}
              </span>
            </div>
            <div className="tm-progress-track">
              <div className="tm-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        {/* ── MAIN LAYOUT ── */}
        <main className="max-w-7xl mx-auto px-4 md:px-12 py-12 pb-24">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

            {/* ── FORM ── */}
            <section className="flex-1 min-w-0">
              <form onSubmit={handleStartVerification} noValidate className="space-y-10">

                {/* Section 1 */}
                <div style={{ background: "#fff", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.07)", padding: "32px" }}>
                  <div className="tm-section-label"><div className="num">1</div><span className="title">Travel Preferences</span></div>
                  <div className="mb-6">
                    <label className="tm-label">How do you want to travel? *</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {travelStyles.map(({ label, icon, desc }) => (
                        <button key={label} type="button" onClick={() => setField("travelStyle", label)}
                          className={`tm-style-card${form.travelStyle === label ? " active" : ""}`}>
                          <div style={{ fontSize: "24px", marginBottom: "6px" }}>{icon}</div>
                          <div style={{ fontSize: "12px", fontWeight: 700, color: form.travelStyle === label ? "#B5541A" : "#1A1714" }}>{label}</div>
                          <div style={{ fontSize: "10px", color: "#aaa", marginTop: "2px" }}>{desc}</div>
                        </button>
                      ))}
                    </div>
                    {errors.travelStyle && <p className="tm-error"><X size={11} /> {errors.travelStyle}</p>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="tm-label">Vehicle Type</label>
                      <select value={form.vehicleType} onChange={(e) => setField("vehicleType", e.target.value)} className="tm-input">
                        <option value="Car">Car</option>
                        <option value="Van">Van</option>
                        <option value="Bus">Bus</option>
                      </select>
                    </div>
                    <div>
                      <label className="tm-label">Transportation Method *</label>
                      <select value={form.transportMethod} onChange={(e) => setField("transportMethod", e.target.value)}
                        className={`tm-input${errors.transportMethod ? " error" : ""}`}>
                        <option value="">Select...</option>
                        <option value="Private Driver">Private Driver</option>
                        <option value="Self Drive">Self Drive</option>
                        <option value="Public Transport">Public Transport</option>
                        <option value="Combination">Combination</option>
                      </select>
                      {errors.transportMethod && <p className="tm-error"><X size={11} /> {errors.transportMethod}</p>}
                    </div>
                  </div>
                </div>

                {/* Section 2 */}
                <div style={{ background: "#fff", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.07)", padding: "32px" }}>
                  <div className="tm-section-label"><div className="num">2</div><span className="title">Holiday Activities</span></div>
                  <label className="tm-label">What interests you? *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
                    {holidayOptions.map((opt) => {
                      const isActive = form.holidayType.includes(opt.name);
                      return (
                        <button key={opt.name} type="button" onClick={() => toggleHoliday(opt.name)}
                          className={`tm-chip${isActive ? " active" : ""}`}>
                          <div className="check-dot">{isActive && <Check size={9} strokeWidth={3} color="#fff" />}</div>
                          <span style={{ fontSize: "16px", flexShrink: 0 }}>{opt.icon}</span>
                          <span style={{ textAlign: "left" }}>{opt.name}</span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.holidayType && <p className="tm-error mt-3"><X size={11} /> {errors.holidayType}</p>}
                  {form.holidayType.length > 0 && (
                    <p style={{ fontSize: "11px", color: "#22c55e", fontWeight: 600, marginTop: "10px" }}>✓ {form.holidayType.length} selected</p>
                  )}
                </div>

                {/* Section 3 */}
                <div style={{ background: "#fff", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.07)", padding: "32px" }}>
                  <div className="tm-section-label"><div className="num">3</div><span className="title">Accommodation & Dining</span></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="tm-label">Accommodation</label>
                      <select value={form.accommodation} onChange={(e) => setField("accommodation", e.target.value)} className="tm-input">
                        <option value="3 Star">⭐⭐⭐ 3 Star</option>
                        <option value="4 Star">⭐⭐⭐⭐ 4 Star</option>
                        <option value="5 Star">⭐⭐⭐⭐⭐ 5 Star</option>
                        <option value="I'll Arrange My Own">I'll Arrange My Own</option>
                      </select>
                    </div>
                    <div>
                      <label className="tm-label">Meal Plan</label>
                      <select value={form.mealPlan} onChange={(e) => setField("mealPlan", e.target.value)} className="tm-input">
                        <option value="">Optional...</option>
                        {mealPlans.map((p) => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>
                  <label className="tm-label">Additional Services</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    {[
                      { key: "trainTickets", label: "Train Tickets", icon: <Train size={14} /> },
                      { key: "entranceTickets", label: "Entrance Tickets", icon: <Ticket size={14} /> },
                      { key: "airportTransfer", label: "Airport Transfer", icon: <Plane size={14} /> },
                    ].map(({ key, label, icon }) => {
                      const isActive = (form.additionalServices as Record<string, boolean>)[key];
                      return (
                        <button key={key} type="button" onClick={() => handleServiceToggle(key)}
                          className={`tm-service${isActive ? " active" : ""}`}>
                          <div className="toggle-box">{isActive && <Check size={10} strokeWidth={3} color="#fff" />}</div>
                          <span style={{ color: "#B5541A", flexShrink: 0 }}>{icon}</span>
                          <span>{label}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div>
                    <label className="tm-label">Special Requests</label>
                    <textarea rows={4} value={form.additionalRequirements}
                      onChange={(e) => setField("additionalRequirements", e.target.value)}
                      className="tm-input" style={{ resize: "none" }}
                      placeholder="Dietary restrictions, accessibility needs, special occasions..." />
                  </div>
                </div>

                {/* Section 4 */}
                <div style={{ background: "#fff", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.07)", padding: "32px" }}>
                  <div className="tm-section-label"><div className="num">4</div><span className="title">Trip Details</span></div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="tm-label">Adults *</label>
                      <div className="tm-stepper">
                        <button type="button" onClick={() => setField("adults", Math.max(1, form.adults - 1))}>−</button>
                        <span className="val">{form.adults}</span>
                        <button type="button" onClick={() => setField("adults", Math.min(20, form.adults + 1))}>+</button>
                      </div>
                    </div>
                    <div>
                      <label className="tm-label">Children</label>
                      <div className="tm-stepper">
                        <button type="button" onClick={() => setField("children", Math.max(0, form.children - 1))}>−</button>
                        <span className="val">{form.children}</span>
                        <button type="button" onClick={() => setField("children", Math.min(10, form.children + 1))}>+</button>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="tm-label">Start Date *</label>
                      <input type="date" value={form.startDate}
                        onChange={(e) => setField("startDate", e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className={`tm-input${errors.startDate ? " error" : ""}`} />
                      {errors.startDate && <p className="tm-error"><X size={11} /> {errors.startDate}</p>}
                    </div>
                    <div>
                      <label className="tm-label">End Date *</label>
                      <input type="date" value={form.endDate}
                        onChange={(e) => setField("endDate", e.target.value)}
                        min={form.startDate || new Date().toISOString().split("T")[0]}
                        className={`tm-input${errors.endDate ? " error" : ""}`} />
                      {errors.endDate && <p className="tm-error"><X size={11} /> {errors.endDate}</p>}
                    </div>
                  </div>
                  {estimatedDays > 0 && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                      style={{ marginTop: "16px", padding: "14px 20px", borderRadius: "12px", background: "#F0F9FF", border: "1px solid rgba(59,130,246,0.15)", display: "flex", alignItems: "center", gap: "10px" }}>
                      <Calendar size={15} style={{ color: "#3b82f6", flexShrink: 0 }} />
                      <span style={{ fontSize: "12px", fontWeight: 600, color: "#1d4ed8" }}>
                        Trip duration: {estimatedDays} day{estimatedDays !== 1 ? "s" : ""}
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Section 5 */}
                <div style={{ background: "#fff", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.07)", padding: "32px" }}>
                  <div className="tm-section-label"><div className="num">5</div><span className="title">Contact Information</span></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="tm-label">Full Name *</label>
                      <input type="text" value={form.name} onChange={(e) => setField("name", e.target.value)}
                        placeholder="Your full name" className={`tm-input${errors.name ? " error" : ""}`} />
                      {errors.name && <p className="tm-error"><X size={11} /> {errors.name}</p>}
                    </div>
                    <div>
                      <label className="tm-label">Email Address *</label>
                      <input type="email" value={form.email} onChange={(e) => setField("email", e.target.value)}
                        placeholder="your@email.com" className={`tm-input${errors.email ? " error" : ""}`} />
                      {errors.email && <p className="tm-error"><X size={11} /> {errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="tm-label">WhatsApp Number *</label>
                    <div className={`tm-input${errors.whatsapp ? " error" : ""}`} style={{ padding: "10px 16px" }}>
                      <PhoneInput defaultCountry="LK" value={form.whatsapp}
                        onChange={(value) => setField("whatsapp", value || "")} />
                    </div>
                    {errors.whatsapp && <p className="tm-error"><X size={11} /> {errors.whatsapp}</p>}
                  </div>
                </div>

                {/* Submit */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <button type="submit" disabled={loading} className="tm-submit">
                      {loading ? "Sending code..." : "Send My Request"}
                      <ChevronRight size={15} strokeWidth={2.5} />
                    </button>
                    <button type="button"
                      onClick={() => { setForm(initialForm); setErrors({}); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      style={{ padding: "16px 24px", borderRadius: "14px", background: "transparent", border: "1px solid rgba(0,0,0,0.1)", fontFamily: "'Outfit', sans-serif", fontSize: "12px", fontWeight: 600, color: "#888", cursor: "pointer" }}>
                      Reset
                    </button>
                  </div>
                  <div style={{ display: "flex", gap: "16px" }}>
                    {["🔒 No payment now", "✓ Free cancel", "⚡ Fast reply"].map((b, i) => (
                      <span key={i} style={{ fontSize: "10px", color: "#bbb", fontWeight: 600 }}>{b}</span>
                    ))}
                  </div>
                </div>
              </form>
            </section>

            {/* ── SIDEBAR ── */}
            <aside style={{ width: "100%", maxWidth: "340px", flexShrink: 0 }}>
              <div style={{ background: "#fff", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.07)", padding: "28px", position: "sticky", top: "72px" }}>
                <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#B5541A", marginBottom: "20px" }}>
                  Contact Us
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
                  {[
                    { icon: <Phone size={13} />, label: "Phone", value: "(+94) 702 062 697", href: "tel:+94702062697" },
                    { icon: <Mail size={13} />, label: "Email", value: "info@srilankatoursdriver.com", href: "mailto:info@srilankatoursdriver.com" },
                  ].map((c, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "#FEF2E8", display: "flex", alignItems: "center", justifyContent: "center", color: "#B5541A", flexShrink: 0 }}>{c.icon}</div>
                      <div>
                        <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#bbb" }}>{c.label}</div>
                        <a href={c.href} style={{ fontSize: "12px", fontWeight: 600, color: "#B5541A", textDecoration: "none" }}>{c.value}</a>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: "20px", marginBottom: "20px" }}>
                  <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#888", marginBottom: "14px" }}>Why Choose Us</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {["Licensed & experienced guides", "Fully customizable itineraries", "Best price guaranteed", "24/7 customer support", "Flexible payment options"].map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#FEF2E8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Check size={10} strokeWidth={3} style={{ color: "#B5541A" }} />
                        </div>
                        <span style={{ fontSize: "12px", color: "#4A4540" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: "20px" }}>
                  <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#888", marginBottom: "12px" }}>Follow Us</div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {[
                      { icon: <FaFacebook size={15} />, color: "#1877F2" },
                      { icon: <FaInstagram size={15} />, color: "#E4405F" },
                      { icon: <FaWhatsapp size={15} />, color: "#25D366" },
                      { icon: <FaYoutube size={15} />, color: "#FF0000" },
                    ].map((s, i) => (
                      <a key={i} href="#" style={{ width: "38px", height: "38px", borderRadius: "10px", background: "#F5F0EA", display: "flex", alignItems: "center", justifyContent: "center", color: s.color, textDecoration: "none", transition: "background 0.2s ease" }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#FEF2E8")}
                        onMouseLeave={e => (e.currentTarget.style.background = "#F5F0EA")}>
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>

      {/* ── OTP MODAL ── */}
      <AnimatePresence>
        {showOtpModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(10,8,6,0.60)", backdropFilter: "blur(8px)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 12 }}
              transition={{ type: "spring", damping: 22, stiffness: 300 }}
              style={{ background: "#fff", borderRadius: "24px", padding: "44px 36px", maxWidth: "400px", width: "100%", boxShadow: "0 32px 80px rgba(0,0,0,0.18)" }}
            >
              {/* Icon */}
              <div style={{ width: "60px", height: "60px", borderRadius: "18px", background: "#FEF2E8", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <Mail size={26} style={{ color: "#B5541A" }} strokeWidth={1.8} />
              </div>

              {/* Heading */}
              <div className="tm-serif" style={{ fontSize: "32px", fontWeight: 600, color: "#1A1714", textAlign: "center", marginBottom: "8px" }}>
                Check Your Email
              </div>
              <p style={{ fontSize: "13px", color: "#888", textAlign: "center", lineHeight: 1.6, marginBottom: "28px" }}>
                We sent a 6-digit code to<br />
                <strong style={{ color: "#1A1714" }}>{form.email}</strong>
              </p>

              {/* OTP boxes */}
              <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "8px" }}
                onPaste={handleOtpPaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { otpRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className={`otp-digit${digit ? " filled" : ""}${otpError ? " otp-err" : ""}`}
                  />
                ))}
              </div>

              {/* OTP error */}
              {otpError && (
                <p style={{ fontSize: "12px", color: "#ef4444", textAlign: "center", marginBottom: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                  <X size={12} /> {otpError}
                </p>
              )}

              {/* Verify button */}
              <button
                onClick={handleVerifyAndSubmit}
                disabled={loading || otp.join("").length < 6}
                className="tm-submit"
                style={{ width: "100%", marginTop: "16px", justifyContent: "center" }}
              >
                {loading ? "Verifying..." : "Confirm & Send Request"}
                <ChevronRight size={15} />
              </button>

              {/* Resend + Change email */}
              <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                {timer > 0 ? (
                  <span style={{ fontSize: "11px", color: "#bbb", fontWeight: 500 }}>
                    Resend code in <strong style={{ color: "#B5541A" }}>{timer}s</strong>
                  </span>
                ) : (
                  <button
                    onClick={handleResend}
                    disabled={loading}
                    style={{ fontSize: "11px", fontWeight: 700, color: "#B5541A", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}>
                    <RefreshCw size={12} /> Resend Code
                  </button>
                )}
                <button
                  onClick={() => setShowOtpModal(false)}
                  style={{ fontSize: "11px", fontWeight: 600, color: "#aaa", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}>
                  <Edit2 size={12} /> Change Email
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SUCCESS MODAL ── */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(10,8,6,0.55)", backdropFilter: "blur(6px)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              style={{ background: "#fff", borderRadius: "24px", padding: "48px 36px", maxWidth: "360px", width: "100%", textAlign: "center", boxShadow: "0 24px 64px rgba(0,0,0,0.15)" }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
              <div className="tm-serif" style={{ fontSize: "32px", fontWeight: 600, color: "#1A1714", marginBottom: "8px" }}>Request Sent!</div>
              <p style={{ fontSize: "13px", color: "#888", lineHeight: 1.6, marginBottom: "24px" }}>
                Thank you — opening WhatsApp so you can connect with us directly.
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <FaWhatsapp size={20} style={{ color: "#25D366" }} />
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#22c55e" }}>Opening WhatsApp...</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}