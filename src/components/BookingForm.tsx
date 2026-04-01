"use client";

import { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useTranslations } from "next-intl";
import { Edit2, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";
import { contact } from "@/data/contact";

interface Tour {
  title: string;
  price?: number;
}

interface BookingFormProps {
  tour: Tour;
}

export default function BookingForm({ tour }: BookingFormProps) {
  const t = useTranslations("booking");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    notes: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [showOtpField, setShowOtpField] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);

  // Resend Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // OTP යැවීම සහ Resend කිරීමේ පොදු Function එක
  const handleSendOtp = async () => {
    if (!form.name || !form.email) {
      alert("Please enter your name and email first.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/verify-email", {
        method: "POST",
        body: JSON.stringify({ email: form.email, action: "send" }),
      });
      const data = await res.json();

      if (data.success) {
        setShowOtpField(true);
        setStatus("idle");
        setTimer(60); // තත්පර 60කට පසු Resend කළ හැක
        setOtp(""); // පරණ OTP එක තිබුනේ නම් එය ඉවත් කරයි
      } else {
        throw new Error(data.error || "Failed to send OTP");
      }
    } catch (error: any) {
      setStatus("error");
      alert(error.message || "Something went wrong. Please try again.");
    }
  };

  const handleSubmit = async () => {
    if (!otp || otp.length < 6) {
      alert("Please enter a valid 6-digit verification code.");
      return;
    }

    setStatus("sending");
    try {
      // OTP Verification
      const verifyRes = await fetch("/api/verify-email", {
        method: "POST",
        body: JSON.stringify({ email: form.email, otp, action: "verify" }),
      });
      const verifyData = await verifyRes.json();

      if (!verifyData.success) {
        alert(verifyData.error || "Invalid or Expired OTP.");
        setStatus("idle");
        return;
      }

      // Booking Submission
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, itemName: tour.title, bookingType: "Tour" }),
      });

      const data = await res.json();
      if (!data.success) throw new Error();

      // Final WhatsApp Redirection
      const message = `Booking Request (Verified ✅)\n\nTour: ${tour.title}\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nDate: ${form.date} ${form.time}\nNotes: ${form.notes}`;
      
      // 'whatsappme' variable එක නිවැරදිව භාවිතා කිරීම
      window.open(`${contact.whatsappme}?text=${encodeURIComponent(message)}`, "_blank");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const inputClass = "w-full bg-white/[0.07] border border-stone-700 text-white px-4 py-3 text-sm outline-none focus:border-orange-500 rounded-md transition-all";
  const labelClass = "block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2";

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden sticky top-8 shadow-2xl">
      <div className="bg-orange-700 p-7 text-white">
        <h3 className="text-xl font-bold font-serif">{tour.title}</h3>
        <p className="text-xs opacity-80 uppercase tracking-tighter mt-1">{t("reserveYour")}</p>
      </div>

      <div className="p-8 space-y-5">
        {!showOtpField ? (
          // STEP 1: Details Entry
          <>
            <div>
              <label className={labelClass}>{t("fullName")} *</label>
              <input className={inputClass} value={form.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="Your Name" />
            </div>
            <div>
              <label className={labelClass}>{t("email")} *</label>
              <input className={inputClass} type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="yourname@email.com" />
            </div>
            <div>
              <label className={labelClass}>{t("whatsapp")}</label>
              <PhoneInput defaultCountry="LK" value={form.phone} onChange={(v) => handleChange("phone", v || "")} className="phone-input-dark text-white" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input className={`${inputClass} scheme-dark`} type="date" value={form.date} onChange={(e) => handleChange("date", e.target.value)} />
              <input className={`${inputClass} scheme-dark`} type="time" value={form.time} onChange={(e) => handleChange("time", e.target.value)} />
            </div>
            <button
              onClick={handleSendOtp}
              disabled={status === "sending"}
              className="w-full py-4 bg-orange-700 hover:bg-orange-600 text-white rounded-md font-bold uppercase text-xs tracking-widest transition-all disabled:opacity-50"
            >
              {status === "sending" ? "Sending OTP..." : "Get Verification Code"}
            </button>
          </>
        ) : (
          // STEP 2: OTP Verification
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-lg flex items-start gap-3">
              <AlertCircle className="text-orange-500 shrink-0" size={18} />
              <div className="flex-1">
                <p className="text-xs text-stone-300">Code sent to <span className="text-white font-bold">{form.email}</span></p>
                <button 
                  onClick={() => { setShowOtpField(false); setOtp(""); setStatus("idle"); }} 
                  className="text-[10px] text-orange-500 font-bold uppercase mt-1 flex items-center gap-1 hover:underline"
                >
                  <Edit2 size={10} /> Edit Details
                </button>
              </div>
            </div>

            <div>
              <label className={labelClass}>Verification Code</label>
              <input 
                className={`${inputClass} text-center text-2xl tracking-[8px] font-bold border-orange-500/50`} 
                maxLength={6} 
                placeholder="••••••"
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} 
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={status === "sending" || status === "sent"}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md font-bold uppercase text-xs tracking-widest transition-all disabled:opacity-50"
            >
              {status === "sending" ? "Verifying..." : status === "sent" ? "Verified! ✅" : "Confirm Booking"}
            </button>

            <div className="text-center">
              {timer > 0 ? (
                <p className="text-[10px] text-stone-500">Resend code available in <span className="text-orange-500 font-bold">{timer}s</span></p>
              ) : (
                <button 
                  onClick={handleSendOtp} 
                  className="text-[10px] text-orange-500 font-bold uppercase flex items-center gap-1 mx-auto hover:text-orange-400 transition-colors"
                >
                  <RefreshCw size={12} className={status === "sending" ? "animate-spin" : ""} /> Resend New OTP
                </button>
              )}
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className="pt-4 border-t border-white/5 flex flex-wrap justify-center gap-4 text-[10px] text-stone-500 uppercase font-bold tracking-tighter">
          <span className="flex items-center gap-1"><CheckCircle size={10} /> No Prepayment</span>
          <span className="flex items-center gap-1"><CheckCircle size={10} /> Fast Response</span>
        </div>
      </div>
    </div>
  );
}