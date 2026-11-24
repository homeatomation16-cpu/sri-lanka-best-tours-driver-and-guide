"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, CheckCircle2, Clock, Loader2, Mail, MapPin, MessageCircle, Phone, Send, ShieldCheck, Star, Zap } from "lucide-react";
import { useContact } from "@/components/ContactProvider";

type FormState = { name: string; email: string; message: string };

const field =
  "w-full rounded-xl border border-[#e8ddd0] bg-[#fdfbf7] px-4 py-3.5 text-sm text-[#1a1209] placeholder:text-[#a89880] transition focus:border-[#d4a853] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#d4a853]/15";

export default function ContactPage() {
  const contact = useContact();
  const t = useTranslations("contact");
  const locale = useLocale();
  const p = useTranslations("contact.page");
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, locale }) });
      const data = await res.json();
      if (!data.success) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.brand + " " + contact.address)}`;

  const INFO = [
    { icon: Phone, label: p("callUs"), value: contact.phone, href: `tel:${contact.phone}`, cta: p("callNow"), tone: "from-amber-400 to-orange-500" },
    { icon: MessageCircle, label: "WhatsApp", value: contact.whatsapp || contact.phone, href: contact.whatsappme, cta: p("startChat"), tone: "from-emerald-400 to-green-600" },
    { icon: Mail, label: p("emailLabel"), value: contact.email, href: `mailto:${contact.email}`, cta: p("writeToUs"), tone: "from-sky-400 to-blue-600" },
    { icon: MapPin, label: p("visitUs"), value: contact.address, href: mapsLink, cta: p("openMaps"), tone: "from-rose-400 to-pink-600" },
  ];

  const PROMISES = [
    { icon: Zap, text: p("p1") },
    { icon: ShieldCheck, text: p("p2") },
    { icon: Star, text: p("p3") },
  ];

  return (
    <div className="bg-[#faf7f2]">
      {/* HERO */}
      <section className="relative h-[62vh] min-h-110 overflow-hidden">
        <Image src="/contact-cover.jpg" alt="Sri Lanka landscape – contact Sri Lanka Best Tours Driver & Guide" fill priority sizes="100vw" className="object-cover scale-105" />
        <div className="absolute inset-0 bg-linear-to-b from-[#0b2a22]/70 via-[#0b2a22]/55 to-[#0b2a22]/95" />
        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 pb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d4a853]/40 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#f5d58a] backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> {p("online")}
          </span>
          <h1 className="font-serif text-4xl font-bold leading-tight text-white md:text-6xl">{t("title")}</h1>
          <p className="mt-4 max-w-xl text-base text-white/75 md:text-lg">
            {p("heroText")}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={contact.whatsappme} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#1ebe5b]">
              <MessageCircle size={18} /> {p("whatsappUs")}
            </a>
            <a href={`tel:${contact.phone}`} className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-[#0b2a22]">
              <Phone size={18} /> {contact.phone}
            </a>
          </div>
        </div>
      </section>

      {/* INFO CARDS (overlap the hero) */}
      <section className="relative z-20 -mt-20 px-4 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INFO.map(({ icon: Icon, label, value, href, cta, tone }) => (
            <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
              className="group min-w-0 rounded-2xl border border-[#ece6da] bg-white p-6 shadow-xl shadow-[#0b2a22]/5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <span className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${tone} text-white shadow-md`}>
                <Icon size={22} />
              </span>
              <p className="text-xs font-bold uppercase tracking-widest text-[#a89880]">{label}</p>
              <p className="mt-1 wrap-break-word text-sm font-semibold text-[#1a1209]">{value}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#a07830] transition group-hover:gap-2">
                {cta} <ArrowUpRight size={14} />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* FORM + SIDE */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.25fr_1fr]">
          <div className="rounded-3xl border border-[#ece6da] bg-white p-6 shadow-sm md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d4a853]">{p("sendMessage")}</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-[#1a1209]">{p("planJourney")}</h2>
            <p className="mt-2 text-sm text-[#7a6a55]">{p("formIntro")}</p>

            {status === "sent" ? (
              <div className="mt-10 flex flex-col items-center rounded-2xl bg-emerald-50 px-6 py-12 text-center">
                <CheckCircle2 className="mb-3 text-emerald-500" size={48} />
                <h3 className="text-xl font-bold text-[#1a1209]">{p("sent")}</h3>
                <p className="mt-1 text-sm text-[#5c4e3d]">{p("sentText")}</p>
                <button onClick={() => { setForm({ name: "", email: "", message: "" }); setStatus("idle"); }} className="mt-6 text-sm font-bold text-[#a07830] hover:underline">
                  {p("sendAnother")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4" data-no-reveal>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input name="name" value={form.name} onChange={handleChange} placeholder={t("namePlaceholder")} className={field} required />
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder={t("emailPlaceholder")} className={field} required />
                </div>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder={t("notesPlaceholder")} className={`${field} resize-none`} rows={6} />
                {status === "error" && <p className="text-sm font-medium text-red-600">{p("error")}</p>}
                <button disabled={status === "sending"} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0b2a22] py-4 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#123d32] disabled:opacity-70">
                  {status === "sending" ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  {t("submit")}
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div className="relative overflow-hidden rounded-3xl bg-[#0b2a22] p-6 text-white sm:p-8">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#d4a853]/20 blur-2xl" />
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f5d58a]">{p("whyWrite")}</p>
              <ul className="mt-5 space-y-4">
                {PROMISES.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-sm text-white/85">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#f5d58a]"><Icon size={18} /></span>
                    {text}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5 text-sm text-white/70">
                <Clock size={18} className="text-[#f5d58a]" />
                {contact.businessHours || p("hours")}
              </div>
            </div>

            <div className="flex-1 overflow-hidden rounded-3xl border border-[#ece6da] bg-white shadow-sm">
              <iframe
                title={`${contact.brand} location`}
                src={contact.map}
                className="h-72 w-full lg:h-full lg:min-h-72"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
