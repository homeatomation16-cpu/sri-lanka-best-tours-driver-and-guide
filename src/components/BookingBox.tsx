// src/components/BookingBox.tsx
"use client";

import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useLocale, useTranslations } from "next-intl";
import { useContact } from "@/components/ContactProvider";

/**
 * Vehicle (and general) booking request. Same e-mail check as the tour form: step 1 sends a 6-digit
 * code, step 2 exchanges it for a proof (/api/verify-email) that /api/booking checks and uses up.
 */
export default function BookingBox({ vehicle }: { vehicle?: any }) {
  const t = useTranslations("booking");
  const locale = useLocale();
  const contact = useContact();
  const maxPassengers = Number(vehicle?.passengers) > 0 ? Number(vehicle.passengers) : 50;
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", time: "", notes: "", people: "" });
  const [step, setStep] = useState<"details" | "code">("details");
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleChange = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));
  const people = Number(form.people);

  const sendCode = async () => {
    if (!form.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) || !Number.isInteger(people) || people < 1 || people > maxPassengers) {
      setMessage(t("missingFields"));
      return;
    }
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/verify-email", { method: "POST", body: JSON.stringify({ email: form.email.trim(), action: "send", locale }) });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setStep("code");
      setOtp("");
      setStatus("idle");
    } catch (error: any) {
      setStatus("error");
      setMessage(error?.message || t("error"));
    }
  };

  const confirm = async () => {
    if (!/^\d{6}$/.test(otp)) {
      setMessage(t("invalidCode"));
      return;
    }
    setStatus("sending");
    setMessage("");
    try {
      const verify = await (await fetch("/api/verify-email", {
        method: "POST",
        body: JSON.stringify({ email: form.email.trim(), otp, action: "verify" }),
      })).json();
      if (!verify.success) {
        setStatus("idle");
        setMessage(t("invalidCode"));
        return;
      }

      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          email: form.email.trim(),
          people,
          // the server looks up the vehicle and its seats; general requests (/booking) have no vehicle
          vehicleId: vehicle?.vehicleId,
          itemName: vehicle ? undefined : "Booking request",
          bookingType: vehicle ? "Vehicle" : "Request",
          emailProof: verify.proof,
          locale,
        }),
      });
      const data = await res.json();
      if (res.status === 403) {
        // the proof expired or was already used: start the e-mail check again
        setStep("details");
        setStatus("idle");
        setMessage(t("verifyAgain"));
        return;
      }
      if (res.status === 400) {
        setStep("details");
        setStatus("idle");
        setMessage(t("missingFields"));
        return;
      }
      if (!data.success) throw new Error();

      setStatus("sent");
      const text = `Booking Request (Verified ✅)\n\nVehicle: ${vehicle?.name || "Vehicle"}\nName: ${form.name}\nPassengers: ${people}\nPhone: ${form.phone || "Not provided"}\nDate: ${form.date || "Not specified"}\nTime: ${form.time || "Not specified"}\nNotes: ${form.notes || "None"}`;
      if (contact.whatsappme) window.open(`${contact.whatsappme}?text=${encodeURIComponent(text)}`, "_blank");
    } catch {
      setStatus("error");
      setMessage(t("error"));
    }
  };

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition";
  const labelClass = "block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1";
  const buttonClass = `w-full py-4 rounded-xl font-semibold text-white text-sm tracking-wider uppercase transition-all disabled:opacity-60 disabled:cursor-not-allowed ${status === "sent" ? "bg-emerald-600" : "bg-orange-600 hover:bg-orange-700"}`;

  return (
    <div className="mt-6 space-y-4">
      {step === "details" ? (
        <>
          <div>
            <label htmlFor="bb-name" className={labelClass}>
              {t("fullName")} <span className="text-orange-500">*</span>
            </label>
            <input id="bb-name" className={inputClass} placeholder={t("namePlaceholder")} value={form.name} required
              onChange={(e) => handleChange("name", e.target.value)} />
          </div>

          <div>
            <label htmlFor="bb-email" className={labelClass}>
              {t("email")} <span className="text-orange-500">*</span>
            </label>
            <input id="bb-email" className={inputClass} type="email" placeholder={t("emailPlaceholder")} value={form.email} required
              onChange={(e) => handleChange("email", e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="bb-people" className={labelClass}>
                {t("passengers")} <span className="text-orange-500">*</span>
              </label>
              <select id="bb-people" className={inputClass} value={form.people} required onChange={(e) => handleChange("people", e.target.value)}>
                <option value="">{t("select")}</option>
                {Array.from({ length: maxPassengers }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>{t("whatsapp")}</label>
              <div className="border border-gray-200 rounded-xl px-3 py-2 focus-within:border-orange-400 transition">
                <PhoneInput defaultCountry="LK" value={form.phone} onChange={(value) => handleChange("phone", value || "")} className="text-sm" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="bb-date" className={labelClass}>{t("date")}</label>
              <input id="bb-date" className={inputClass} type="date" value={form.date}
                onChange={(e) => handleChange("date", e.target.value)} />
            </div>
            <div>
              <label htmlFor="bb-time" className={labelClass}>{t("time")}</label>
              <input id="bb-time" className={inputClass} type="time" value={form.time}
                onChange={(e) => handleChange("time", e.target.value)} />
            </div>
          </div>

          <div>
            <label htmlFor="bb-notes" className={labelClass}>{t("notes")}</label>
            <textarea id="bb-notes" className={`${inputClass} resize-none min-h-24`} placeholder={t("notesPlaceholder")} value={form.notes}
              onChange={(e) => handleChange("notes", e.target.value)} />
          </div>

          <button type="button" onClick={sendCode} disabled={status === "sending"} className={buttonClass}>
            {status === "sending" ? t("sending") : t("getCode")}
          </button>
        </>
      ) : (
        <>
          <p className="text-sm text-gray-600">{t("codeSent", { email: form.email.trim() })}</p>
          <div>
            <label htmlFor="bb-code" className={labelClass}>{t("code")}</label>
            <input id="bb-code" className={`${inputClass} text-center text-2xl tracking-[8px] font-bold`} inputMode="numeric" autoComplete="one-time-code"
              maxLength={6} value={otp} disabled={status === "sent"} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} />
          </div>
          <button type="button" onClick={confirm} disabled={status === "sending" || status === "sent"} className={buttonClass}>
            {status === "sending" ? t("sending") : status === "sent" ? t("sent") : t("confirm")}
          </button>
          {status !== "sent" && (
            <div className="flex justify-between text-xs font-semibold text-orange-700">
              <button type="button" className="min-h-11 px-1 hover:underline" onClick={() => { setStep("details"); setMessage(""); }}>{t("editDetails")}</button>
              <button type="button" className="min-h-11 px-1 hover:underline" onClick={sendCode} disabled={status === "sending"}>{t("resend")}</button>
            </div>
          )}
        </>
      )}

      {message && <p role="alert" className="text-center text-sm text-red-600">{message}</p>}
      {status === "sent" && <p role="status" className="text-center text-xs text-emerald-600">{t("whatsappOpened")}</p>}

      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10px] text-gray-500 pt-2">
        <span>{t("noPayment")}</span>
        <span>·</span>
        <span>{t("freeCancellation")}</span>
        <span>·</span>
        <span>{t("fastResponse")}</span>
      </div>
    </div>
  );
}
