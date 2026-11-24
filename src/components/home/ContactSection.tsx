"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, Mail, MessageCircle, Phone, Send } from "lucide-react";
import CinematicSection from "@/components/cinematic/CinematicSection";
import DecoShapes from "@/components/home/DecoShapes";
import { useContact } from "@/components/ContactProvider";

/**
 * CONTACT / BOOKING — enquiry form with client-side validation.
 * Sends to the existing /api/contact route (saved in Admin → Inquiries and
 * e-mailed), so no new backend is needed.
 */
type Fields = { name: string; email: string; phone: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function ContactSection() {
  const contact = useContact();
  const t = useTranslations("home.contactForm");
  const tc = useTranslations("contact");
  const [form, setForm] = useState<Fields>({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const validate = (f: Fields): Errors => {
    const e: Errors = {};
    if (!f.name.trim()) e.name = t("errName");
    if (!f.email.trim()) e.email = t("errEmail");
    else if (!EMAIL.test(f.email.trim())) e.email = t("errEmailInvalid");
    if (f.message.trim().length < 10) e.message = t("errMessage");
    return e;
  };

  const update = (key: keyof Fields) => (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...form, [key]: ev.target.value };
    setForm(next);
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: validate(next)[key] })); // clear as they fix it
  };

  const submit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const found = validate(form);
    setErrors(found);
    const firstBad = Object.keys(found)[0];
    if (firstBad) { ev.currentTarget.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus(); return; }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, name: form.name.trim(), email: form.email.trim() }),
      });
      const data = await res.json();
      if (!data.success) throw new Error("failed");
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("failed");
    }
  };

  const field = (key: keyof Fields) => ({
    id: `home-${key}`,
    name: key,
    value: form[key],
    onChange: update(key),
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `home-${key}-error` : undefined,
    className: `contact-input ${errors[key] ? "has-error" : ""}`,
  });

  return (
    <CinematicSection id="contact" className="contact-home py-12 sm:py-16 relative isolate overflow-hidden text-white">
      <DecoShapes tone="dark" />
      <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:gap-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <div data-rise3d="self" className="min-w-0">
          <p className="mb-3 font-semibold text-amber-300">{t("label")}</p>
          <h2 className="font-playfair text-3xl leading-tight sm:text-4xl">{t("heading")}</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75 sm:mt-4 sm:text-base">{t("sub")}</p>
          <ul className="mt-4 space-y-2 text-sm text-white/85 sm:mt-6 sm:space-y-3 sm:text-base">
            <li><a href={contact.whatsappme} target="_blank" rel="noopener noreferrer" className="contact-line"><MessageCircle size={20} aria-hidden="true" />WhatsApp {contact.whatsapp || contact.phone}</a></li>
            <li><a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="contact-line"><Phone size={20} aria-hidden="true" />{contact.phone}</a></li>
            <li><a href={`mailto:${contact.email}`} className="contact-line"><Mail size={20} aria-hidden="true" className="shrink-0" /><span className="min-w-0 break-all">{contact.email}</span></a></li>
          </ul>
        </div>

        <form onSubmit={submit} noValidate className="contact-card min-w-0" data-reveal="right">
          {status === "sent" ? (
            <div className="flex min-h-80 flex-col items-center justify-center text-center" role="status">
              <CheckCircle2 size={48} className="mb-4 text-emerald-300" aria-hidden="true" />
              <p className="max-w-sm text-lg">{t("success")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="min-w-0">
                <label htmlFor="home-name" className="contact-label">{tc("name")} *</label>
                <input type="text" autoComplete="name" placeholder={tc("namePlaceholder")} {...field("name")} />
                {errors.name && <p id="home-name-error" className="contact-error">{errors.name}</p>}
              </div>
              <div className="min-w-0">
                <label htmlFor="home-email" className="contact-label">{tc("email")} *</label>
                <input type="email" autoComplete="email" placeholder={tc("emailPlaceholder")} {...field("email")} />
                {errors.email && <p id="home-email-error" className="contact-error">{errors.email}</p>}
              </div>
              <div className="col-span-2">
                <label htmlFor="home-phone" className="contact-label">{t("phone")}</label>
                <input type="tel" autoComplete="tel" placeholder={t("phonePlaceholder")} {...field("phone")} />
              </div>
              <div className="col-span-2">
                <label htmlFor="home-message" className="contact-label">{t("message")} *</label>
                <textarea rows={3} placeholder={t("messagePlaceholder")} {...field("message")} />
                {errors.message && <p id="home-message-error" className="contact-error">{errors.message}</p>}
              </div>
              <div className="col-span-2 flex flex-wrap items-center gap-4">
                <button type="submit" className="contact-submit max-sm:w-full max-sm:justify-center" disabled={status === "sending"}>
                  <Send size={18} aria-hidden="true" />
                  {status === "sending" ? t("sending") : tc("submit")}
                </button>
                {status === "failed" && <p className="contact-error" role="alert">{t("failed")}</p>}
              </div>
            </div>
          )}
        </form>
      </div>
    </CinematicSection>
  );
}
