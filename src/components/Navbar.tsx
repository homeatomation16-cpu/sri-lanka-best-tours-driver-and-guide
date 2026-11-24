// src/components/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import AccountMenu from "@/components/account/AccountMenu";
import { Link, usePathname } from "@/i18n/navigation";
import Image from "next/image";
import { m, AnimatePresence, LazyMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";

const loadMotionFeatures = () => import("@/lib/motionFeatures").then((mod) => mod.default);
import { useContact } from "@/components/ContactProvider";

const BRAND_NAME = "Sri Lanka Best Tours Driver & Guide";

export default function Navbar() {
  const contact = useContact();
  const t = useTranslations("nav");
  const tHome = useTranslations("home");
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menu = [
    { name: t("home"), link: "/" },
    { name: t("tours"), link: "/tours" },
    { name: t("destinations"), link: "/destinations" },
    { name: t("excursions"), link: "/excursions" },
    { name: t("tailorMade"), link: "/tailor-made-tours" },
    { name: t("about"), link: "/about" },
    { name: t("contact"), link: "/contact" },
  ];

  const isActive = (link: string) => (link === "/" ? pathname === "/" : pathname.startsWith(link));

  // Transparent over the hero; solid white once the page scrolls (or the mobile menu is open).
  const solid = scrolled || mobileOpen;
  const textColor = solid ? "text-slate-800" : "text-white";

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "bg-white shadow-md" : "bg-linear-to-b from-black/40 to-transparent"
      }`}
    >
      <div className="flex h-16 w-full items-center gap-2 px-3 sm:gap-3 sm:px-6 lg:px-8 xl:h-20 2xl:px-10">
        {/* LOGO */}
        <Link href="/" aria-label={`${BRAND_NAME} – ${t("home")}`} className="flex min-w-0 shrink items-center gap-2 sm:gap-2.5">
          <Image
            src="/logo.png"
            alt=""
            width={48}
            height={48}
            priority
            className="h-9 w-9 shrink-0 rounded-full border-2 border-[#0f2a4a] bg-white object-contain p-0.5 shadow-sm sm:h-12 sm:w-12"
          />
          {/* Wordmark: stacked on phones ("SRI LANKA / BEST TOURS / DRIVER & GUIDE"), two lines from sm up */}
          <span aria-hidden className="flex min-w-0 flex-col whitespace-nowrap font-bold uppercase leading-[1.1]" style={{ fontFamily: '"Poppins", sans-serif' }}>
            <span className={`text-[0.8rem] tracking-[0.06em] sm:text-lg 2xl:text-xl ${solid ? "text-[#0f2a4a]" : "text-white"}`}>
              Sri Lanka <br className="sm:hidden" />Best Tours
            </span>{" "}
            <span className={`mt-0.5 text-[0.6rem] tracking-[0.14em] sm:mt-1 sm:text-[0.72rem] sm:tracking-[0.22em] 2xl:text-[0.8rem] ${solid ? "text-teal-600" : "text-[#48d4b0]"}`}>Driver &amp; Guide</span>
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden min-w-0 flex-1 items-center justify-center xl:flex 2xl:gap-0.5">
          {menu.map((item) => {
            const active = isActive(item.link);
            return (
              <li key={item.link}>
                <Link
                  href={item.link}
                  aria-current={active ? "page" : undefined}
                  className={`relative flex min-h-11 items-center whitespace-nowrap rounded-full px-1.5 text-[0.78rem] font-medium transition-colors 2xl:px-2.5 2xl:text-[0.88rem] ${
                    solid ? "text-slate-700 hover:text-slate-950" : "text-white/90 hover:text-white"
                  } ${active ? "after:absolute after:inset-x-2 after:bottom-0.5 after:h-0.5 after:rounded-full after:bg-amber-500 2xl:after:inset-x-3" : ""}`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* RIGHT SIDE ACTIONS */}
        <div className="ms-auto flex shrink-0 items-center gap-0 sm:gap-1 2xl:gap-2">
          {/* LanguageSwitcher has white text built in; darken it on the white bar */}
          <div data-lang-wrap className={solid ? "[&>div>button]:text-slate-800! [&>div>button:hover]:bg-slate-100! dark:[&>div>button]:text-stone-100! dark:[&>div>button:hover]:bg-white/10!" : ""}>
            <LanguageSwitcher />
          </div>

          <a
            href={`tel:${contact.phone}`}
            aria-label={contact.phone}
            className={`hidden h-11 w-11 items-center justify-center rounded-full transition-colors lg:inline-flex ${textColor} ${solid ? "hover:bg-slate-100" : "hover:bg-white/10"}`}
          >
            <Phone size={16} />
          </a>

          <ThemeToggle className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors ${textColor} ${solid ? "hover:bg-slate-100" : "hover:bg-white/10"}`} />

          <AccountMenu className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors ${textColor} ${solid ? "hover:bg-slate-100" : "hover:bg-white/10"}`} />

          <Link
            href="/booking"
            className="hidden items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-sm font-medium text-slate-950 shadow-[0_8px_24px_-10px_rgb(201_154_59/0.8)] transition-all duration-300 hover:bg-amber-400 sm:inline-flex"
          >
            {tHome("bookNow")}
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full xl:hidden ${textColor}`}
            aria-label={mobileOpen ? t("closeNavigation") : t("openNavigation")}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <LazyMotion features={loadMotionFeatures}>
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            id="mobile-navigation"
            className="max-h-[80svh] overflow-y-auto border-t border-slate-200 bg-white xl:hidden"
          >
            <div className="flex flex-col items-center gap-6 py-8 text-lg">
              {menu.map((item) => (
                <Link
                  key={item.link}
                  href={item.link}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive(item.link) ? "page" : undefined}
                  className={`transition-colors hover:text-amber-600 ${isActive(item.link) ? "font-semibold text-amber-600" : "text-slate-700"}`}
                >
                  {item.name}
                </Link>
              ))}

              <Link
                href="/booking"
                onClick={() => setMobileOpen(false)}
                className="rounded-full bg-amber-500 px-8 py-3 font-semibold text-slate-950 hover:bg-amber-400"
              >
                {tHome("bookNow")}
              </Link>

              <a href={contact.whatsappme} target="_blank" rel="noopener noreferrer" className="font-medium text-emerald-600">
                {t("whatsapp")}
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
      </LazyMotion>
    </nav>
  );
}
