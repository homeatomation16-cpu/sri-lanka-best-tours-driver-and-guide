import { getTranslations } from "next-intl/server";
import { 
  FaFacebook, FaInstagram, FaYoutube, FaTripadvisor, 
  FaWhatsapp, FaPhone, FaEnvelope 
} from "react-icons/fa";

// Contact data import
import type { SiteSettings } from "@/lib/siteSettingsDefaults";


export default async function TrustBar({ contact }: { contact: SiteSettings }) {
  const [t, tPage] = await Promise.all([
    getTranslations("trustBar"),
    getTranslations("contact.page"),
  ]);

  const socialLinks = [
    { href: contact.social.facebook, icon: FaFacebook, label: "Facebook", hoverBg: "hover:bg-blue-600", iconColor: "text-blue-600 group-hover:text-white" },
    { href: contact.social.instagram, icon: FaInstagram, label: "Instagram", hoverBg: "hover:bg-pink-500", iconColor: "text-pink-500 group-hover:text-white" },
    { href: contact.social.youtube, icon: FaYoutube, label: "YouTube", hoverBg: "hover:bg-red-600", iconColor: "text-red-600 group-hover:text-white" },
    { href: contact.social.tripadvisor, icon: FaTripadvisor, label: "TripAdvisor", hoverBg: "hover:bg-green-600", iconColor: "text-green-500 group-hover:text-white" },
  ];

  const contactItems = [
    { 
      href: `tel:${contact.phone}`, 
      icon: FaPhone, 
      label: contact.phone, 
      subLabel: t("callUs"), 
      external: false 
    },
    { 
      href: `mailto:${contact.email}`, 
      icon: FaEnvelope, 
      label: contact.email, 
      subLabel: t("emailUs"), 
      external: false 
    },
    { 
      href: contact.whatsappme, 
      icon: FaWhatsapp, 
      label: tPage("whatsappUs"),
      subLabel: t("whatsappDesc"), 
      external: true 
    },
  ];

  return (
    <>
      {/* SECTION 1 — Trust & Social */}
      <section className="relative bg-white overflow-hidden">
        <div className="h-1.5 w-full bg-linear-to-r from-orange-400 via-pink-500 to-amber-400" />

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-8 mb-8">
            <div className="flex-1 h-px bg-zinc-100" />
            <span className="text-zinc-600 text-2xl font-serif italic">Connect with us</span>
            <div className="flex-1 h-px bg-zinc-100" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {socialLinks.map(({ href, icon: Icon, label, hoverBg, iconColor }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-3 px-6 py-4 rounded-2xl border border-zinc-100 bg-white shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-transparent hover:text-white ${hoverBg}`}
              >
                <Icon className={`text-2xl transition-colors duration-300 ${iconColor}`} />
                <span className="text-sm font-bold text-zinc-700 transition-colors duration-300 group-hover:text-white">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — Contact CTA */}
      <section
        id="contact"
        className="relative py-10 px-5 sm:py-14 sm:px-6 bg-linear-to-br from-orange-600 via-amber-600 to-yellow-500 text-white overflow-hidden"
      >
        <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-[100px]" />

        <div className="relative max-w-6xl mx-auto text-center">
          <p className="text-[10px] font-black tracking-[0.4em] uppercase opacity-80 mb-3">
            {t("available247")}
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-3 sm:mb-4 leading-[0.95] tracking-tighter">
            {t("planDream")}
          </h2>
          <p className="opacity-90 mb-5 sm:mb-8 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium">
            {t("planDesc")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
            {contactItems.map(({ href, icon: Icon, label, subLabel, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group bg-white/10 backdrop-blur-2xl border border-white/20 px-4 py-3 sm:p-5 md:p-6 rounded-2xl sm:rounded-[28px] flex flex-row sm:flex-col items-center gap-3 sm:gap-2 text-left sm:text-center hover:bg-white hover:text-zinc-900 transition-all duration-500 shadow-2xl hover:-translate-y-3 w-full overflow-hidden min-w-0"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 shrink-0">
                  <Icon size={20} className="sm:size-[26px]" />
                </div>
                
                <div className="min-w-0 flex-1 sm:w-full sm:flex-none sm:px-2 flex flex-col items-start sm:items-center justify-center sm:min-h-15">
                  <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold tracking-tight break-all sm:text-center leading-tight">
                    {label}
                  </span>
                  <span className="mt-0.5 text-[9px] sm:hidden font-black uppercase tracking-widest opacity-70">{subLabel}</span>
                </div>

                <span className="max-sm:hidden text-[10px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-40">
                  {subLabel}
                </span>
              </a>
            ))}
          </div>

          <p className="mt-5 sm:mt-8 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] opacity-60">
            {t("tagline")}
          </p>
        </div>
      </section>
    </>
  );
}
