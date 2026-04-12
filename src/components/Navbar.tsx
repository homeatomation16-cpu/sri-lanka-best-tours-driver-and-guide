// src/components/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { contact } from "@/data/contact";

export default function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScroll = window.scrollY;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 40);
      setHidden(currentScroll > lastScroll && currentScroll > 120);
      lastScroll = currentScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menu = [
    { name: t("home"), link: "/" },
    { name: t("tours"), link: "/tours" },
    { name: t("destinations"), link: "/destinations" },
    { name: t("excursions"), link: "/excursions" },
    { name: t("vehicles"), link: "/vehicles" },
    { name: t("tailorMade"), link: "/tailor-made-tours" },
    { name: t("contact"), link: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: hidden ? -120 : 0 }}
      transition={{ duration: 0.35 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Sri Lanka Tours"
            width={80}
            height={80}
            priority
            className="rounded-full border bg-white border-amber-400/40"
          />
          <div className="leading-tight">
            <p className="text-amber-400 font-semibold text-sm tracking-wide">
              Sri Lanka Best Tours
            </p>
            <p className="text-amber-400 font-semibold text-sm tracking-wide">
              Driver & Guide
            </p>
            <p className="text-[10px] text-white/70 uppercase tracking-widest">
              Luxury Experience
            </p>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          {menu.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className="text-white text-sm hover:text-amber-400 transition-colors"
            >
              {item.name}
            </Link>
          ))}

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* WhatsApp */}
          <a
            href="${contact.whatsapp}"
            className="bg-emerald-600 text-black px-6 py-2 rounded-full flex items-center gap-2 text-sm font-semibold"
          >
            {t("whatsapp")} <Phone size={16} />
          </a>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10"
          >
            <div className="flex flex-col items-center gap-8 py-10 text-lg">
              {menu.map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  onClick={() => setMobileOpen(false)}
                  className="text-white/90 hover:text-amber-400 transition"
                >
                  {item.name}
                </Link>
              ))}

              {/* Language Switcher in mobile */}
              <LanguageSwitcher />

              <a
                href="tel:+94702062697"
                className="bg-linear-to-r from-amber-500 to-yellow-300 text-black px-8 py-3 rounded-full font-semibold"
              >
                Call Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
