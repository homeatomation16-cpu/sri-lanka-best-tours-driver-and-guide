"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube, FaTripadvisor } from "react-icons/fa";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Mail, ChevronRight, RefreshCw, Edit2,
  Check, X, Calendar, Phone, Users, MapPin
} from "lucide-react";
import { contact } from "@/data/contact";

// ─── Data Definitions ───
const holidayOptions = [
  { id: "nature", icon: "🦁" },
  { id: "culture", icon: "🏛️" },
  { id: "beach", icon: "🏖️" },
  { id: "trekking", icon: "⛰️" },
  { id: "activity", icon: "🎯" },
  { id: "boat", icon: "⛵" },
  { id: "train", icon: "🚂" },
  { id: "factory", icon: "🏭" },
  { id: "watersports", icon: "🏄" },
  { id: "diving", icon: "🤿" },
  { id: "whales", icon: "🐋" },
];

const travelStyles = [
  { id: "relaxed", icon: "🌴", sub: "Slow & leisurely" },
  { id: "moderate", icon: "🚶", sub: "Balanced pace" },
  { id: "active", icon: "🏃", sub: "High energy" },
  { id: "luxury", icon: "💎", sub: "Ultimate comfort" },
];

const initialForm = {
  travelStyle: "",
  holidayType: [] as string[],
  adults: 2,
  children: 0,
  startDate: "",
  endDate: "",
  name: "",
  email: "",
  whatsapp: "",
  additionalRequirements: "",
};

export default function TailorMadePage() {
  const t = useTranslations("tailorMade");
  
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [estimatedDays, setEstimatedDays] = useState(0);
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  // OTP States
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(0);
  const [otpError, setOtpError] = useState("");
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer logic
  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer((p) => p - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  // Duration calculation
  useEffect(() => {
    if (form.startDate && form.endDate) {
      const diff = Math.ceil((new Date(form.endDate).getTime() - new Date(form.startDate).getTime()) / 86400000) + 1;
      setEstimatedDays(diff > 0 ? diff : 0);
    } else setEstimatedDays(0);
  }, [form.startDate, form.endDate]);

  const setField = (field: string, value: any) => {
    setForm((s) => ({ ...s, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: null }));
  };

  const toggleHoliday = (id: string) => {
    setForm((s) => {
      const set = new Set(s.holidayType);
      set.has(id) ? set.delete(id) : set.add(id);
      return { ...s, holidayType: Array.from(set) };
    });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.travelStyle) e.travelStyle = "Required";
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Invalid Email";
    if (!form.whatsapp || form.whatsapp.length < 7) e.whatsapp = "Required";
    if (!form.startDate) e.startDate = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleStartVerification = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) { window.scrollTo({ top: 400, behavior: "smooth" }); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, action: "send" }),
      });
      const data = await res.json();
      if (data.success) {
        setShowOtpModal(true);
        setTimer(60);
      }
    } catch { alert("Error sending code."); } finally { setLoading(false); }
  };

  const handleVerifyAndSubmit = async () => {
    const otpValue = otp.join("");
    if (otpValue.length < 6) return;
    setLoading(true);
    try {
      const vRes = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, otp: otpValue, action: "verify" }),
      });
      const vData = await vRes.json();
      if (!vData.success) { setOtpError("Invalid code"); setLoading(false); return; }

      const res = await fetch("/api/tailor-made", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, estimatedDays }),
      });

      if ((await res.json()).success) {
        setShowOtpModal(false);
        setShowSuccess(true);
        const holidayNames = form.holidayType.map(id => t(`activities.${id}`)).join(", ");
        const message = `🌴 *Tailor Made Request* ✅\n\n*Name:* ${form.name}\n*Style:* ${t(`styles.${form.travelStyle}`)}\n*Days:* ${estimatedDays}\n*Guests:* ${form.adults} Adults\n*Interests:* ${holidayNames}`;
        window.open(`${contact.whatsappme}?text=${encodeURIComponent(message)}`, "_blank");
      }
    } catch { alert("Error."); } finally { setLoading(false); }
  };

  const progress = (() => {
    const fields = ["travelStyle", "startDate", "endDate", "name", "email", "whatsapp"];
    let filled = 0;
    fields.forEach((f) => { if ((form as any)[f]) filled++; });
    return (filled / fields.length) * 100;
  })();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap');
        
        :root {
          --ink: #0f0d0b; --sand: #f5f0e8; --cream: #fdfbf7;
          --gold: #c9952a; --rust: #b54318; --line: rgba(15,13,11,0.1);
          --serif: 'Playfair Display', serif; --sans: 'DM Sans', sans-serif;
        }

        .tm-root { font-family: var(--sans); background: var(--cream); color: var(--ink); }
        
        .tm-hero { 
          position: relative; height: 65vh; min-height: 500px; 
          display: flex; align-items: flex-end; background: #0f0d0b; overflow: hidden; 
        }
        .tm-hero-bg { 
          position: absolute; inset: 0; 
          background: linear-gradient(160deg, #1a0e06 0%, #3d1a06 40%, #5c2e12 100%); 
        }
        .tm-hero-texture {
          position: absolute; inset: 0; opacity: 0.05;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='1' fill='%23fff'/%3E%3C/svg%3E");
        }
        .tm-hero-inner { position: relative; z-index: 2; max-width: 1200px; margin: 0 auto; padding: 0 48px 64px; width: 100%; }
        .tm-hero-title { 
          font-family: var(--serif); font-size: clamp(52px, 8vw, 100px); 
          font-weight: 900; color: #fff; line-height: 0.9; letter-spacing: -2px; 
        }
        .tm-hero-title em { font-style: italic; color: #f0d99a; }

        .tm-progress-bar { position: sticky; top: 0; z-index: 40; background: var(--ink); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .tm-progress-inner { max-width: 1200px; margin: 0 auto; padding: 0 48px; display: flex; align-items: center; gap: 20px; height: 4px; }
        .tm-progress-fill { height: 100%; background: linear-gradient(90deg, var(--gold), var(--rust)); transition: width 0.6s ease; }

        .tm-card { background: #fff; border: 1px solid var(--line); padding: 48px; margin-bottom: 24px; position: relative; border-radius: 4px; }
        .tm-card-accent { position: absolute; top: 0; left: 48px; right: 48px; height: 2px; background: linear-gradient(90deg, var(--gold), transparent); }

        .tm-step-title { font-size: 10px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; color: #7a7168; margin-bottom: 32px; display: flex; align-items: center; gap: 15px; }
        .tm-step-title::after { content: ''; flex: 1; height: 1px; background: var(--line); }
        .tm-step-num { font-family: var(--serif); font-style: italic; color: var(--gold); font-size: 14px; }

        .tm-style-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        .tm-style-card { 
          border: 1px solid var(--line); padding: 28px 16px; text-align: center; 
          cursor: pointer; transition: 0.3s; background: #fff; border-radius: 4px;
        }
        .tm-style-card:hover { border-color: var(--gold); transform: translateY(-2px); box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        .tm-style-card.active { border-color: var(--gold); background: #faf6ee; }
        
        .tm-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .tm-chip { 
          display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; 
          border: 1px solid var(--line); cursor: pointer; font-size: 13px; transition: 0.2s;
          border-radius: 2px; background: #fff; color: #7a7168;
        }
        .tm-chip.active { border-color: var(--gold); background: #faf6ee; color: var(--ink); font-weight: 600; }

        .tm-input { 
          width: 100%; padding: 14px 18px; border: 1px solid var(--line); 
          font-family: var(--sans); font-size: 14px; outline: none; border-radius: 2px;
          transition: 0.2s;
        }
        .tm-input:focus { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(201,149,42,0.08); }

        .tm-submit { 
          width: 100%; padding: 22px; background: var(--ink); color: #fff; 
          border: none; font-weight: 700; letter-spacing: 0.3em; cursor: pointer;
          text-transform: uppercase; font-size: 11px; transition: 0.3s; border-radius: 2px;
        }
        .tm-submit:hover:not(:disabled) { background: var(--rust); }
        .tm-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        .tm-sidebar-card { border: 1px solid var(--line); background: #fff; margin-bottom: 16px; border-radius: 4px; overflow: hidden; }
        .tm-sidebar-header { background: var(--ink); color: rgba(255,255,255,0.5); padding: 18px 24px; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; font-weight: 700; }
        .tm-sidebar-body { padding: 24px; }
        
        .tm-summary-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--line); font-size: 13px; }
        .tm-summary-row:last-child { border-bottom: none; }
        .tm-summary-key { color: #7a7168; }
        .tm-summary-val { font-weight: 700; color: var(--ink); }

        .otp-digit {
          width: 45px; height: 55px; border: 1px solid var(--line); text-align: center;
          font-size: 24px; font-weight: 700; margin: 0 4px; border-radius: 4px; outline: none;
        }
        .otp-digit:focus { border-color: var(--gold); background: #faf6ee; }

        @media (max-width: 900px) {
          .tm-style-grid { grid-template-columns: repeat(2, 1fr); }
          .main-grid { grid-template-columns: 1fr !important; }
          .tm-hero-inner { padding: 0 24px 48px; }
          .tm-card { padding: 28px; }
        }
      `}</style>

      <div className="tm-root">
        {/* HERO SECTION */}
        <header className="tm-hero">
          <div className="tm-hero-bg" />
          <div className="tm-hero-texture" />
          <div className="tm-hero-inner">
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{ width: "40px", height: "1px", background: "var(--gold)" }} />
              <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)" }}>Sri Lanka · Private Tours</span>
            </div>
            <h1 className="tm-hero-title">{t("heading")} <br /> <em>Journey</em></h1>
            <p style={{ color: "rgba(255,255,255,0.55)", marginTop: "24px", maxWidth: "480px", fontSize: "15px", lineHeight: "1.7", fontWeight: 300 }}>{t("desc")}</p>
          </div>
        </header>

        {/* PROGRESS BAR */}
        <div className="tm-progress-bar">
          <div className="tm-progress-inner">
            <div className="tm-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 48px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "48px" }} className="main-grid">
            
            {/* FORM SIDE */}
            <form onSubmit={handleStartVerification}>
              {/* Step 1 */}
              <div className="tm-card">
                <div className="tm-card-accent" />
                <h3 className="tm-step-title"><span className="tm-step-num">01.</span> {t("stepStyle")}</h3>
                <div className="tm-style-grid">
                  {travelStyles.map(s => (
                    <div key={s.id} className={`tm-style-card ${form.travelStyle === s.id ? "active" : ""}`} onClick={() => setField("travelStyle", s.id)}>
                      <span style={{ fontSize: "28px", display: "block", marginBottom: "10px" }}>{s.icon}</span>
                      <div style={{ fontWeight: "700", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em" }}>{t(`styles.${s.id}`)}</div>
                      <div style={{ fontSize: "11px", color: "#7a7168", marginTop: "4px" }}>{s.sub}</div>
                    </div>
                  ))}
                </div>
                {errors.travelStyle && (
                  <p style={{ color: "var(--rust)", fontSize: "12px", marginTop: "10px" }}>* Please select a style</p>
                )}
              </div>

              {/* Step 2 */}
              <div className="tm-card">
                <div className="tm-card-accent" />
                <h3 className="tm-step-title"><span className="tm-step-num">02.</span> {t("stepActivities")}</h3>
                <div className="tm-chips">
                  {holidayOptions.map(opt => (
                    <div key={opt.id} className={`tm-chip ${form.holidayType.includes(opt.id) ? "active" : ""}`} onClick={() => toggleHoliday(opt.id)}>
                      <span>{opt.icon}</span> {t(`activities.${opt.id}`)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 3 */}
              <div className="tm-card">
                <div className="tm-card-accent" />
                <h3 className="tm-step-title"><span className="tm-step-num">03.</span> {t("stepDetails")}</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "32px" }}>
                  <div className="tm-field">
                    <label style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7a7168", display: "block", marginBottom: "8px" }}>{t("startDate")}</label>
                    <input type="date" className="tm-input" onChange={e => setField("startDate", e.target.value)} />
                  </div>
                  <div className="tm-field">
                    <label style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7a7168", display: "block", marginBottom: "8px" }}>{t("endDate")}</label>
                    <input type="date" className="tm-input" onChange={e => setField("endDate", e.target.value)} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: "40px", borderTop: "1px solid var(--line)", paddingTop: "28px" }}>
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: 600, color: "#7a7168", marginBottom: "10px" }}>Adults</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                      <button type="button" onClick={() => setField("adults", Math.max(1, form.adults - 1))} style={{ width: "36px", height: "36px", border: "1px solid var(--line)", background: "#fff", cursor: "pointer" }}>−</button>
                      <span style={{ fontSize: "20px", fontWeight: 700, fontFamily: "var(--serif)" }}>{form.adults}</span>
                      <button type="button" onClick={() => setField("adults", form.adults + 1)} style={{ width: "36px", height: "36px", border: "1px solid var(--line)", background: "#fff", cursor: "pointer" }}>+</button>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: 600, color: "#7a7168", marginBottom: "10px" }}>Children</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                      <button type="button" onClick={() => setField("children", Math.max(0, form.children - 1))} style={{ width: "36px", height: "36px", border: "1px solid var(--line)", background: "#fff", cursor: "pointer" }}>−</button>
                      <span style={{ fontSize: "20px", fontWeight: 700, fontFamily: "var(--serif)" }}>{form.children}</span>
                      <button type="button" onClick={() => setField("children", form.children + 1)} style={{ width: "36px", height: "36px", border: "1px solid var(--line)", background: "#fff", cursor: "pointer" }}>+</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="tm-card">
                <div className="tm-card-accent" />
                <h3 className="tm-step-title"><span className="tm-step-num">04.</span> {t("stepContact")}</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                  <input type="text" placeholder={t("phName")} className="tm-input" onChange={e => setField("name", e.target.value)} />
                  <input type="email" placeholder={t("phEmail")} className="tm-input" onChange={e => setField("email", e.target.value)} />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <PhoneInput defaultCountry="LK" value={form.whatsapp} onChange={v => setField("whatsapp", v)} className="tm-input" />
                </div>
                <textarea rows={3} placeholder="Special Requests / Notes" className="tm-input" style={{ resize: "none" }} onChange={e => setField("additionalRequirements", e.target.value)} />
              </div>

              <button type="submit" disabled={loading} className="tm-submit">
                <span>{loading ? t("btnSending") : "Send My Tailor-Made Request →"}</span>
              </button>
            </form>

            {/* SIDEBAR */}
            <aside>
              <div className="tm-sidebar-card">
                <div className="tm-sidebar-header">Journey Summary</div>
                <div className="tm-sidebar-body">
                  <div className="tm-summary-row">
                    <span className="tm-summary-key">Travel Style</span>
                    <span className="tm-summary-val">{form.travelStyle ? t(`styles.${form.travelStyle}`) : "—"}</span>
                  </div>
                  <div className="tm-summary-row">
                    <span className="tm-summary-key">Duration</span>
                    <span className="tm-summary-val">
                      {estimatedDays > 0 ? <span style={{ background: "linear-gradient(135deg, var(--gold), var(--rust))", color: "#fff", padding: "4px 10px", borderRadius: "2px", fontSize: "11px" }}>{estimatedDays} Days</span> : "—"}
                    </span>
                  </div>
                  <div className="tm-summary-row">
                    <span className="tm-summary-key">Group Size</span>
                    <span className="tm-summary-val">{form.adults} Adults {form.children > 0 && `, ${form.children} Children`}</span>
                  </div>
                </div>
              </div>

              <div className="tm-sidebar-card">
                <div className="tm-sidebar-header">Contact Us</div>
                <div className="tm-sidebar-body">
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "15px" }}>
                    <div style={{ width: "36px", height: "36px", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>📞</div>
                    <div>
                      <div style={{ fontSize: "9px", color: "#aaa", fontWeight: 700, textTransform: "uppercase" }}>Phone</div>
                      <a href={`tel:${contact.phone}`} style={{ fontSize: "13px", fontWeight: 600, color: "var(--ink)", textDecoration: "none" }}>{contact.phone}</a>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "36px", height: "36px", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>✉️</div>
                    <div style={{ overflow: "hidden" }}>
                      <div style={{ fontSize: "9px", color: "#aaa", fontWeight: 700, textTransform: "uppercase" }}>Email</div>
                      <a href={`mailto:${contact.email}`} style={{ fontSize: "11px", fontWeight: 600, color: "var(--ink)", textDecoration: "none", wordBreak: "break-all" }}>{contact.email}</a>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>

        {/* OTP MODAL */}
        <AnimatePresence>
          {showOtpModal && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(5px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                style={{ background: "#fff", padding: "50px 40px", maxWidth: "420px", width: "100%", textAlign: "center", borderRadius: "4px" }}>
                <Mail size={40} style={{ color: "var(--gold)", marginBottom: "20px" }} />
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "32px", fontWeight: 700, marginBottom: "10px" }}>Verify Your Email</h2>
                <p style={{ fontSize: "14px", color: "#7a7168", marginBottom: "32px" }}>Verification code sent to <b>{form.email}</b></p>
                <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "10px" }}>
                  {otp.map((digit, i) => (
                    <input key={i} maxLength={1} value={digit} ref={el => { otpRefs.current[i] = el; }}
                      onChange={e => {
                        const n = [...otp]; n[i] = e.target.value; setOtp(n);
                        if (e.target.value && i < 5) otpRefs.current[i+1]?.focus();
                      }}
                      onKeyDown={e => { if (e.key === 'Backspace' && !otp[i] && i > 0) otpRefs.current[i-1]?.focus(); }}
                      className="otp-digit" />
                  ))}
                </div>
                <button onClick={handleVerifyAndSubmit} disabled={loading} className="tm-submit" style={{ marginTop: "20px" }}>
                  {loading ? "Verifying..." : "Confirm & Send"}
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* SUCCESS MESSAGE */}
        <AnimatePresence>
          {showSuccess && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", zIndex: 110, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                 style={{ background: "#fff", padding: "60px 40px", maxWidth: "400px", width: "100%", textAlign: "center", borderRadius: "4px" }}>
                  <div style={{ fontSize: "60px", marginBottom: "20px" }}>🏝️</div>
                  <h2 style={{ fontFamily: "var(--serif)", fontSize: "36px", fontWeight: 700, marginBottom: "15px" }}>Request Sent!</h2>
                  <p style={{ fontSize: "15px", color: "#7a7168", lineHeight: "1.6" }}>Connecting you with our travel specialists...</p>
                  <div style={{ marginTop: "30px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", color: "#25D366", fontWeight: 700 }}>
                    <FaWhatsapp size={24} /> <span>Opening WhatsApp...</span>
                  </div>
               </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}