// src/components/Footer.tsx
"use client";

import { useTranslations } from "next-intl";
import { FiMapPin, FiArrowUp, FiMail } from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTripadvisor,
  FaWhatsapp,
  FaCcVisa,
  FaCcMastercard,
} from "react-icons/fa";

import Image from "next/image";
import { contact } from "@/data/contact";

export default function Footer() {
  const t = useTranslations("footer");

  const quickLinks = [
    { label: t("gallery"), href: "/gallery" },
    { label: t("about"), href: "/about" },
    { label: t("tours"), href: "/tours" },
    { label: t("contact"), href: "/contact" },
  ];

  const socials = [
    {
      Icon: FaFacebookF,
      link: contact.social.facebook,
    },
    {
      Icon: FaInstagram,
      link: contact.social.instagram,
    },
    {
      Icon: FaYoutube,
      link: contact.social.youtube,
    },
    {
      Icon: FaTripadvisor,
      link: contact.social.tripadvisor,
    },
  ];

  return (
    <footer className="bg-black text-white pt-20 pb-12 px-6 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,#fb923c,transparent_40%)]" />

      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_80%,#f59e0b,transparent_40%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid gap-12 lg:grid-cols-4 mb-16">
          {/* BRAND */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-5">
              <Image
                src="/logo.png"
                alt="Logo"
                width={60}
                height={60}
              />

              <h3 className="text-2xl font-bold bg-linear-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                {t("brand")}
              </h3>
            </div>

            <p className="text-gray-400 mb-6 max-w-xl">
              {t("desc")}
            </p>

            <div className="flex gap-3 mb-6 text-gray-400">
              <FiMapPin className="text-orange-400 mt-1" />

              <span>{contact.address}</span>
            </div>

            {/* SOCIAL LINKS */}
            <div className="flex gap-4">
              {socials.map(({ Icon, link }, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-orange-500 hover:scale-110 transition duration-300 shadow-lg hover:shadow-orange-500/30"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-orange-400 font-semibold mb-5">
              {t("quickLinks")}
            </h4>

            <ul className="space-y-3 text-gray-400">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="hover:text-orange-400 transition"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h4 className="text-orange-400 font-semibold mb-5">
              {t("newsletter")}
            </h4>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(t("subscribed"));
              }}
              className="space-y-3"
            >
              <div className="flex items-center bg-white/10 border border-white/20 rounded-xl overflow-hidden">
                <FiMail className="ml-3 text-gray-400" />

                <input
                  type="email"
                  required
                  placeholder={t("emailPlaceholder")}
                  className="w-full px-3 py-3 bg-transparent outline-none text-white placeholder-gray-400"
                />
              </div>

              <button className="w-full bg-linear-to-r from-orange-500 to-amber-500 py-3 rounded-xl font-semibold hover:opacity-90 transition">
                {t("subscribe")}
              </button>
            </form>

            <div className="flex gap-4 mt-6 text-2xl text-gray-400">
              <FaCcVisa />
              <FaCcMastercard />
            </div>
          </div>
        </div>

        {/* GOOGLE MAP */}
        <div className="mb-14 rounded-3xl overflow-hidden border border-white/10 shadow-2xl hover:shadow-orange-500/30 transition">
          <iframe
            title="Sri Lanka Tours Driver Location"
            src={contact.map}
            className="w-full h-80 grayscale hover:grayscale-0 transition duration-500"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} {t("copyright")}
        </div>
      </div>

      {/* BACK TO TOP */}
      <button
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        className="fixed bottom-6 right-6 bg-linear-to-r from-orange-500 to-amber-500 p-4 rounded-full shadow-xl hover:shadow-orange-500/40 hover:scale-110 transition z-50"
      >
        <FiArrowUp />
      </button>

      {/* WHATSAPP FLOAT */}
      <a
        href={contact.whatsappme}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 bg-green-500 w-14 h-14 flex items-center justify-center rounded-full shadow-2xl hover:shadow-green-400/50 hover:scale-110 transition z-50"
      >
        <FaWhatsapp className="text-2xl text-white" />
      </a>
    </footer>
  );
}