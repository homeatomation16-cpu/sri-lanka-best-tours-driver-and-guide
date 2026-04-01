// src/components/BookingBox.tsx
"use client";

import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useTranslations } from "next-intl";

export default function BookingBox({ vehicle }: { vehicle?: any }) {
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

  const handleChange = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email) {
      alert("Please fill in your name and email.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          itemName: vehicle?.name || "Vehicle Booking",
          bookingType: "Vehicle",
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error();

      const message = `Booking Request\n\nVehicle: ${vehicle?.name || "Vehicle"}\nName: ${form.name}\nPhone: ${form.phone || "Not provided"}\nDate: ${form.date || "Not specified"}\nTime: ${form.time || "Not specified"}\nNotes: ${form.notes || "None"}`;
      window.open(`https://wa.me/94769300334?text=${encodeURIComponent(message)}`, "_blank");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition";

  return (
    <div className="mt-6 space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">
          {t("fullName")} <span className="text-orange-500">*</span>
        </label>
        <input className={inputClass} placeholder={t("namePlaceholder")} value={form.name}
          onChange={(e) => handleChange("name", e.target.value)} />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">
          {t("email")} <span className="text-orange-500">*</span>
        </label>
        <input className={inputClass} type="email" placeholder={t("emailPlaceholder")} value={form.email}
          onChange={(e) => handleChange("email", e.target.value)} />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">
          {t("whatsapp")}
        </label>
        <div className="border border-gray-200 rounded-xl px-3 py-2 focus-within:border-orange-400 transition">
          <PhoneInput
            defaultCountry="LK"
            value={form.phone}
            onChange={(value) => handleChange("phone", value || "")}
            className="text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">
            {t("date")}
          </label>
          <input className={inputClass} type="date" value={form.date}
            onChange={(e) => handleChange("date", e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">
            {t("time")}
          </label>
          <input className={inputClass} type="time" value={form.time}
            onChange={(e) => handleChange("time", e.target.value)} />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">
          {t("notes")}
        </label>
        <textarea
          className={`${inputClass} resize-none min-h-24`}
          placeholder={t("notesPlaceholder")}
          value={form.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={status === "sending" || status === "sent"}
        className={`w-full py-4 rounded-xl font-semibold text-white text-sm tracking-wider uppercase transition-all
          ${status === "sent" ? "bg-emerald-600" : "bg-orange-600 hover:bg-orange-700"}
          disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        {status === "idle" && t("bookTour")}
        {status === "sending" && t("sending")}
        {status === "sent" && t("sent")}
        {status === "error" && t("error")}
      </button>

      {status === "sent" && (
        <p className="text-center text-xs text-emerald-600">{t("whatsappOpened")}</p>
      )}

      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10px] text-gray-400 pt-2">
        <span>{t("noPayment")}</span>
        <span>·</span>
        <span>{t("freeCancellation")}</span>
        <span>·</span>
        <span>{t("fastResponse")}</span>
      </div>
    </div>
  );
}