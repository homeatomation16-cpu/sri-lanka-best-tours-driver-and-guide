// src/components/Footer.tsx
// Site footer laid out like the live site: logo, text and map | link columns, popular tours, destinations | contact and social.
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { FaTripadvisor } from "react-icons/fa";
import { Link } from "@/i18n/navigation";
import { getSiteSettings } from "@/lib/siteSettings";
import { getActiveTours } from "@/lib/tourData";
import { TOURS as EN_DESTINATIONS } from "@/data/destinations/en";

// The towns from the live site (not single attractions such as a temple or a church)
const TOWNS = new Set([
  "anuradhapura", "arugam-bay", "bentota", "colombo", "dambulla", "ella", "galle", "habarana", "hatton", "hikkaduwa",
  "jaffna", "kalpitiya", "kandy", "kitulgala", "mirissa", "negombo", "nuwara-eliya", "passikudah", "polonnaruwa",
  "sigiriya", "sinharaja", "tangalle", "trincomalee", "udawalawe", "unawatuna", "weligama", "wellawaya", "wilpattu", "yala",
]);

async function loadDestinationNames(locale: string): Promise<Map<string, string>> {
  try {
    const mod = await import(`@/data/destinations/${locale}`);
    return new Map((mod.TOURS as { id: string; title: string }[]).map((d) => [d.id, d.title]));
  } catch {
    return new Map();
  }
}

const heading = "mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 sm:mb-4 sm:text-sm";
const linkClass = "inline-block py-1 transition-colors hover:text-white sm:py-1.5";

export default async function Footer() {
  const locale = await getLocale();
  const contact = await getSiteSettings();
  const [t, tAccount, tNav, tContact, names] = await Promise.all([
    getTranslations("footer"),
    getTranslations("account"),
    getTranslations("nav"),
    getTranslations("contact"),
    loadDestinationNames(locale),
  ]);

  // Popular tours: the in-database / live tours, shortest first (safe if the database is unreachable)
  let tours: { id: string; title: string }[] = [];
  try {
    tours = (await getActiveTours(locale))
      .filter((tour: any) => tour.category === "down-south-tours" || tour.category === "east-coast-tours")
      .filter((tour: any) => !String(tour.tourId).endsWith("-hotels"))
      .slice(0, 6)
      .map((tour: any) => ({ id: tour.tourId, title: (tour.translations?.[locale] || tour.translations?.en)?.title || tour.tourId }));
  } catch {
    tours = [];
  }

  const destinations = (EN_DESTINATIONS as { id: string; title: string }[])
    .filter((d) => TOWNS.has(d.id))
    .map((d) => ({ id: d.id, title: names.get(d.id) || d.title }))
    .sort((a, b) => a.title.localeCompare(b.title, locale));

  const quickLinks = [
    { label: tNav("tours"), href: "/tours" },
    { label: tNav("destinations"), href: "/destinations" },
    { label: tNav("excursions"), href: "/excursions" },
    { label: tNav("tailorMade"), href: "/tailor-made-tours" },
    { label: tNav("about"), href: "/about" },
    { label: tNav("contact"), href: "/contact" },
  ];

  const socials = [
    { Icon: FaFacebookF, link: contact.social.facebook, label: "Facebook" },
    { Icon: FaInstagram, link: contact.social.instagram, label: "Instagram" },
    { Icon: FaYoutube, link: contact.social.youtube, label: "YouTube" },
    { Icon: FaTripadvisor, link: contact.social.tripadvisor, label: "Tripadvisor" },
    { Icon: FaXTwitter, link: contact.social.twitter, label: "X" },
    { Icon: FaLinkedinIn, link: contact.social.linkedin, label: "LinkedIn" },
  ].filter((s) => s.link);

  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`;

  return (
    <footer className="relative overflow-hidden bg-[#0b2a22] text-white/75">
      <div className="pointer-events-none absolute -end-32 -top-32 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-6 py-10 sm:gap-12 sm:py-16 lg:grid-cols-12 lg:gap-10">
        {/* BRAND + MAP */}
        <div className="lg:col-span-3">
          <Link href="/" className="flex items-center gap-3" aria-label={t("brand")}>
            <Image src="/logo.png" alt="" width={48} height={48} className="h-12 w-12 rounded-full border-2 border-[#0f2a4a] bg-white object-contain p-0.5" />
            <span className="font-semibold leading-tight text-white">{t("brand")}</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">{t("desc")}</p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
            <iframe src={contact.map} title={`${tContact("findUs")} – ${t("brand")}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block h-32 w-full border-0 grayscale-35 sm:h-44" />
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white/5 px-4 py-3 text-sm text-amber-400 transition-colors hover:bg-white/10 hover:text-white">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden />
              {tContact("openMaps")}
              <ExternalLink className="ms-auto h-3.5 w-3.5 shrink-0" aria-hidden />
            </a>
          </div>
        </div>

        {/* LINK COLUMNS */}
        <div className="grid grid-cols-2 content-start gap-x-5 gap-y-7 text-sm sm:grid-cols-3 sm:gap-10 sm:text-base lg:col-span-6">
          <div>
            <h3 className={heading}>{t("quickLinks")}</h3>
            <ul className="space-y-0.5">
              {quickLinks.map((l) => (
                <li key={l.href}><Link href={l.href} className={linkClass}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
          {tours.length > 0 && (
            <div className="sm:col-span-2">
              <h3 className={heading}>{t("popularTours")}</h3>
              <ul className="space-y-0.5">
                {tours.map((tour) => (
                  <li key={tour.id}><Link href={`/tours/${tour.id}`} className={linkClass}>{tour.title}</Link></li>
                ))}
              </ul>
            </div>
          )}
          <div className="col-span-2 sm:col-span-3">
            <h3 className={heading}>{t("destinations")}</h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-0.5 sm:grid-cols-4">
              {destinations.map((d) => (
                <li key={d.id}><Link href={`/destinations/${d.id}`} className={linkClass}>{d.title}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        {/* CONTACT + SOCIAL */}
        <div className="lg:col-span-3">
          <h3 className={heading}>{t("contact")}</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden />
              <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="hover:text-white">{contact.address}</a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden />
              <a href={`tel:${contact.phone}`} className="hover:text-white">{contact.phone}</a>
            </li>
            <li className="flex gap-3">
              <FaWhatsapp className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden />
              <a href={contact.whatsappme} target="_blank" rel="noopener noreferrer" className="hover:text-white">{contact.whatsapp}</a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden />
              <a href={`mailto:${contact.email}`} className="break-all hover:text-white">{contact.email}</a>
            </li>
          </ul>
          <div className="mt-8">
            <p className="mb-3 text-sm font-medium text-white">{t("followUs")}</p>
            <ul className="flex flex-wrap gap-2">
              {socials.map(({ Icon, link, label }) => (
                <li key={label}>
                  <a href={link} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-amber-500 hover:bg-amber-500 hover:text-[#0b2a22]">
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {t("copyright")}</p>
          <Link href="/account" className="hover:text-white">{tAccount("myAccount")}</Link>
        </div>
      </div>
    </footer>
  );
}
