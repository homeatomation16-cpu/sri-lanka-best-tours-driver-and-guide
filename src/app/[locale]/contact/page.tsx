"use client";

import { useState } from "react";
import {
  MapPin,
  MessageCircle,
  Mail,
  Clock,
  ArrowUpRight,
  Phone,
  Send,
} from "lucide-react";

import { useTranslations } from "next-intl";
import { contact } from "@/data/contact";
import Image from "next/image";

/* TYPES */
type FormState = {
  name: string;
  email: string;
  message: string;
};

export default function ContactPage() {
  const t = useTranslations("contact");

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!data.success) throw new Error();

      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    }
  };

  /* INFO DATA */
  const INFO = [
    {
      icon: MapPin,
      label: "Address",
      value: contact.address,
      href: contact.map,
      cta: "View on Map",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: contact.phone,
      href: `https://wa.me/${contact.whatsapp}`,
      cta: "Start Chat",
    },
    {
      icon: Mail,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      cta: "Send Message",
      isEmail: true,
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: "Open 24 Hours\n7 Days a Week",
    },
  ];

  return (
    <main className="bg-white">
      {/* 🔥 HERO BANNER */}
      <div className="relative w-full h-75 md:h-100 lg:h-125">
        <Image
          src="/contact-cover.jpg"
          alt="Cover"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
            {t("title")}
          </h1>

          <p className="text-gray-200 text-sm md:text-lg mb-6 max-w-xl">
            Contact us anytime via phone, WhatsApp or email
          </p>

          <div className="flex gap-3 flex-wrap justify-center">
            <a
              href={`tel:${contact.phone}`}
              className="px-5 py-3 bg-orange-500 text-white rounded-full flex items-center gap-2 hover:bg-orange-600 transition"
            >
              <Phone size={16} /> Call Now
            </a>

            <a
              href={`https://wa.me/${contact.whatsapp}`}
              className="px-5 py-3 border border-white text-white rounded-full flex items-center gap-2 bg-green-500 hover:bg-white hover:text-black transition"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* INFO CARDS */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {INFO.map(({ icon: Icon, label, value, href, cta, isEmail }) => (
            <div key={label} className="border p-5 rounded-xl">
              <Icon className="mb-3 text-orange-500" />

              <p className="text-xs text-gray-400 mb-1">{label}</p>

              {isEmail ? (
                <a
                  href={href}
                  className="text-sm text-gray-800 wrap-break-word block mb-3"
                >
                  {value}
                </a>
              ) : (
                <p className="text-sm whitespace-pre-line wrap-break-word mb-3">
                  {value}
                </p>
              )}

              {href && cta && (
                <a
                  href={href}
                  target="_blank"
                  className="text-orange-500 text-xs flex items-center gap-1"
                >
                  {cta} <ArrowUpRight size={12} />
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* MAP */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden border">
           <iframe
            title="Sri Lanka Tours Driver Location"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d266.4847488090501!2d79.98684840696005!3d6.7734220317821565!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae24f89fa74f12f%3A0xcd470ca323b64cd8!2sSri%20lanka%20Best%20Tours%20Driver%20and%20Guide!5e1!3m2!1sen!2slk!4v1773387915647!5m2!1sen!2slk"
            className="w-full h-80 grayscale hover:grayscale-0 transition duration-500"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="px-6 pb-24">
        <div className="max-w-2xl mx-auto border p-6 rounded-xl">
          {submitted ? (
            <div className="text-center">
              <Send className="mx-auto mb-3 text-green-500" />
              <h3 className="text-lg font-semibold">Message Sent!</h3>
              <p className="text-gray-500 text-sm">
                We'll contact you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={t("namePlaceholder")}
                className="w-full border p-3 rounded"
                required
              />

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder={t("emailPlaceholder")}
                className="w-full border p-3 rounded"
                required
              />

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder={t("notesPlaceholder")}
                className="w-full border p-3 rounded"
                rows={5}
              />

              <button className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600 transition">
                {t("submit")}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}