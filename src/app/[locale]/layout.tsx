// src/app/[locale]/layout.tsx

import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { pageMetadata, siteUrl, siteName, serializeJsonLd } from "@/lib/seo";

import { Poppins, Playfair_Display, Noto_Sans_Sinhala, Libre_Baskerville, Cormorant_Garamond, Outfit } from "next/font/google";

import localFont from "next/font/local";

import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

import "../globals.css";
import "../theme.css";
import { getTheme, isCustomBrand, themeToCss, THEME_INIT_SCRIPT } from "@/lib/theme";
import { ThemeModeProvider } from "@/components/ThemeToggle";

import SiteMotion from "@/components/SiteMotion";
import ScrollReveal from "@/components/ScrollReveal";
import { ContactProvider } from "@/components/ContactProvider";
import { getSiteSettings } from "@/lib/siteSettings";
import PageTransition from "../../components/PageTransition";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import TrustBar from "../../components/TrustBar";
import LanguageFloatingButton from "@/components/LanguageFloatingButton";
import FloatingCurrency from "@/components/FloatingCurrency";
import PageTracker from "@/components/PageTracker";
import Snowfall from "@/components/Snowfall";
import ChristmasGarland from "@/components/ChristmasGarland";
import WhatsAppButton from "@/components/WhatsAppButton";

/* =========================================================
   1. SITE CONFIG
========================================================= */

const defaultLocale = "en";

/* =========================================================
   2. FONTS
========================================================= */

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const sinhala = Noto_Sans_Sinhala({
  subsets: ["sinhala"],
  weight: ["400", "700"],
  variable: "--font-sinhala",
  display: "swap",
  preload: false,
});

const libre = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre",
  display: "swap",
  preload: false,
});

// Used by the currency converter and the vehicle pages. Self-hosted instead of a render-blocking
// Google Fonts @import; preload off so they only download where they are used.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
  preload: false,
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
  preload: false,
});

const thea = localFont({
  src: "../../fonts/TheaAmelia-eZM86.otf",
  variable: "--font-thea",
  display: "swap",
  preload: false,
});

/* =========================================================
   3. STATIC LOCALES
========================================================= */

// Pages are now rendered once and cached (instead of on every visit). Admin saves refresh them
// immediately; this is only a safety net so nothing can stay stale for more than an hour.
export const revalidate = 3600;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }));
}

/* =========================================================
   4. SEO TITLES
========================================================= */

const titles: Record<string, string> = {
  en: "Sri Lanka Private Driver Hire | Tours & Chauffeur Service",

  fr: "Chauffeur Privé Sri Lanka | Circuits et Services",

  de: "Privater Fahrer Sri Lanka | Touren & Chauffeurservice",

  es: "Conductor Privado Sri Lanka | Tours y Servicios",

  it: "Autista Privato Sri Lanka | Tour e Servizi",

  hi: "Sri Lanka Private Driver | टूर और सेवा",

  zh: "斯里兰卡私人司机 | 旅游服务",

  ru: "Частный водитель Шри-Ланка | Туры",

  ja: "スリランカ専属ドライバー | ツアー",

  si: "ශ්‍රී ලංකාවේ පුද්ගලික රියදුරු සේවාව",

  ar: "سائق خاص في سريلانكا | الجولات والخدمات",

  pt: "Motorista Privado no Sri Lanka | Passeios e Serviços",

  nl: "Privéchauffeur Sri Lanka | Tours & Chauffeursdienst",

  sv: "Privat Chaufför Sri Lanka | Turer & Tjänster",

  pl: "Prywatny Kierowca Sri Lanka | Wycieczki i Usługi",

  tr: "Sri Lanka Özel Sürücü | Turlar ve Hizmetler",

  ko: "스리랑카 개인 운전사 | 투어 및 서비스",

  th: "คนขับส่วนตัวในศรีลังกา | ทัวร์และบริการ",

  vi: "Tài xế riêng tại Sri Lanka | Tour & Dịch vụ",

  ta: "ஸ்ரீலங்காவில் தனிப்பட்ட டிரைவர் | சுற்றுலா மற்றும் சேவைகள்",

  te: "శ్రీలంక ప్రైవేట్ డ్రైవర్ | టూర్లు మరియు సేవలు",

  bn: "শ্রীলঙ্কা প্রাইভেট ড্রাইভার | ট্যুর এবং পরিষেবা",

  ur: "سری لنکا پرائیویٹ ڈرائیور | ٹورز اور خدمات",
};

/* =========================================================
   5. SEO DESCRIPTIONS
========================================================= */

const descriptions: Record<string, string> = {
  en: "Hire a private driver in Sri Lanka for your holiday. Airport transfers, private tours, chauffeur services, custom itineraries and experienced local guides.",

  fr: "Louez un chauffeur privé au Sri Lanka pour vos vacances. Transferts aéroport, circuits privés, chauffeur et itinéraires personnalisés.",

  de: "Privaten Fahrer in Sri Lanka buchen. Flughafentransfers, private Rundreisen, Chauffeurservice und individuelle Reiseplanung.",

  es: "Contrata un conductor privado en Sri Lanka. Traslados al aeropuerto, tours privados, servicio de chófer e itinerarios personalizados.",

  it: "Noleggia un autista privato in Sri Lanka. Trasferimenti aeroportuali, tour privati, servizio chauffeur e itinerari personalizzati.",

  hi: "श्रीलंका में निजी ड्राइवर किराए पर लें। एयरपोर्ट ट्रांसफर, निजी टूर, ड्राइवर सेवा और कस्टम यात्रा कार्यक्रम।",

  zh: "在斯里兰卡预订私人司机服务。提供机场接送、私人旅游、包车服务以及定制旅行行程。",

  ru: "Закажите частного водителя на Шри-Ланке. Трансферы из аэропорта, индивидуальные туры, услуги водителя и персональные маршруты.",

  ja: "スリランカで専属ドライバーを予約。空港送迎、プライベートツアー、チャーターサービス、オーダーメイドの旅程をご提供します。",

  si: "ශ්‍රී ලංකාවේ පුද්ගලික රියදුරෙකු සහ සංචාරක මාර්ගෝපදේශකයෙකු වෙන්කරවා ගන්න. ගුවන් තොටුපළ මාරු කිරීම්, පෞද්ගලික සංචාර, chauffeur සේවා සහ ඔබට අවශ්‍ය පරිදි සකස් කළ සංචාරක සැලසුම්.",

  ar: "استأجر سائقًا خاصًا في سريلانكا لعطلتك. خدمات النقل من المطار، الجولات الخاصة، خدمات السائق، وخطط الرحلات المخصصة.",

  pt: "Contrate um motorista privado no Sri Lanka para suas férias. Traslados de aeroporto, passeios privados, serviços de motorista e roteiros personalizados.",
  nl: "Huur een privéchauffeur in Sri Lanka voor uw vakantie. Luchtvaartvervoer, privétochten, chauffeurservice en aangepaste reisplanning.",
  sv: "Hyr en privat chaufför i Sri Lanka för din semester. Flygplatsöverföringar, privata turer, chaufförservice och anpassade resor.",
};

/* =========================================================
   6. LANGUAGE / HREFLANG
========================================================= */

/* =========================================================
   7. SEO METADATA
========================================================= */

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const currentLocale = routing.locales.includes(locale as (typeof routing.locales)[number]) ? locale : defaultLocale;

  const title = titles[currentLocale] ?? titles[defaultLocale];

  const description = descriptions[currentLocale] ?? (await getTranslations({ locale: currentLocale, namespace: "hero" }))("subtitle");
  // The home title already carries the keywords; appending the 36-char brand would push it far past 60 chars.
  const seo = pageMetadata(currentLocale, "", title, description, undefined, { brand: false });


  return {
    /* =====================================================
       BASIC SEO
    ===================================================== */

    metadataBase: new URL(siteUrl),

    // Pages that set a plain string title get "<title> | <brand>"; pageMetadata() titles are absolute.
    title: { default: title, template: `%s | ${siteName}` },

    description: seo.description,

    applicationName: siteName,

    generator: "Next.js",

    keywords: [
      "Sri Lanka private driver",
      "Sri Lanka tour driver",
      "Sri Lanka chauffeur",
      "Sri Lanka private tours",
      "Sri Lanka tour guide",
      "Sri Lanka driver hire",
      "Sri Lanka airport transfer",
      "Sri Lanka chauffeur service",
      "Sri Lanka travel",
      "Sri Lanka tourism",
      "private driver Sri Lanka",
      "custom Sri Lanka tours",
    ],

    authors: [
      {
        name: siteName,
        url: siteUrl,
      },
    ],

    creator: siteName,

    publisher: siteName,

    category: "Travel",

    /* =====================================================
       GOOGLE / BING VERIFICATION
    ===================================================== */

    verification: {
      google: "Mp5heLBCC-1-Jr-x22-aBPz78-Cb7zGmYZD_sUVpIyg",

      other: {
        "msvalidate.01": "14021899B4839700C9FBF5D6A218785A",
      },
    },

    /* =====================================================
       CANONICAL + HREFLANG
    ===================================================== */

    /* =====================================================
       OPEN GRAPH
    ===================================================== */

    openGraph: seo.openGraph,

    twitter: seo.twitter,

    /* =====================================================
       ROBOTS
    ===================================================== */

    robots: {
      googleBot: {
        "max-video-preview": -1,

        "max-image-preview": "large",

        "max-snippet": -1,
      },
    },

    /* =====================================================
       ICONS
    ===================================================== */

    // Small copies of the logo for browser tabs / home screens (the 512px logo.png is 333 KB).
    icons: {
      icon: [
        {
          url: "/favicon.ico",
          sizes: "48x48",
        },
        {
          url: "/icons/icon-192.png",
          type: "image/png",
          sizes: "192x192",
        },
      ],

      apple: [
        {
          url: "/icons/apple-touch-icon.png",
          sizes: "180x180",
        },
      ],
    },

    /* =====================================================
       OTHER
    ===================================================== */

    other: {
      "geo.region": "LK",

      "geo.placename": "Sri Lanka",

      "content-language": currentLocale,
    },
  };
}

/* Browser UI colour (mobile address bar), matching the site's light and dark backgrounds. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#060d1b" },
  ],
};

/* =========================================================
   8. LOCALE LAYOUT
========================================================= */

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;

  params: Promise<{
    locale: string;
  }>;
}) {
  const { locale } = await params;

  /* =======================================================
     VALIDATE LOCALE
  ======================================================= */

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // lets next-intl render this locale statically instead of reading request headers
  setRequestLocale(locale);

  /* =======================================================
     LOAD TRANSLATIONS
  ======================================================= */

  const messages = await getMessages();
  // Contact details from Admin → Site settings, shared with every client component
  const siteSettings = await getSiteSettings();
  const theme = await getTheme();
  const nav = await getTranslations({ locale, namespace: "nav" });

  /* =======================================================
     RTL SUPPORT
  ======================================================= */

  const direction = locale === "ar" ? "rtl" : "ltr";

  /* =======================================================
     JSON-LD STRUCTURED DATA
  ======================================================= */

  const structuredData = {
    "@context": "https://schema.org",

    "@type": "TravelAgency",

    "@id": `${siteUrl}/#travel-agency`,

    name: siteName,

    url: siteUrl,

    logo: `${siteUrl}/logo.png`,

    image: `${siteUrl}/hero/sigiriya-poster.webp`,

    description: descriptions[locale] ?? descriptions[defaultLocale],

    areaServed: {
      "@type": "Country",

      name: "Sri Lanka",
    },

    // Contact details exactly as shown on the site (Admin → Site settings)
    ...(siteSettings.phone ? { telephone: siteSettings.phone } : {}),
    ...(siteSettings.email ? { email: siteSettings.email } : {}),
    ...(siteSettings.address
      ? { address: { "@type": "PostalAddress", streetAddress: siteSettings.address, addressCountry: "LK" } }
      : {}),
    ...(() => {
      const sameAs = Object.values(siteSettings.social ?? {}).filter((url) => typeof url === "string" && /^https?:\/\//.test(url));
      return sameAs.length ? { sameAs } : {};
    })(),
  };

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      dir={direction}
      data-theme={theme.mode === "visitor" ? undefined : theme.mode}
      data-brand={isCustomBrand(theme) ? "custom" : undefined}
      data-season={theme.preset === "christmas" ? "christmas" : undefined}
      suppressHydrationWarning
      className={`
        ${poppins.variable}
        ${playfair.variable}
        ${sinhala.variable}
        ${libre.variable}
        ${thea.variable}
        ${cormorant.variable}
        ${outfit.variable}
      `}
    >
      <head>
        <style id="site-theme" dangerouslySetInnerHTML={{ __html: themeToCss(theme) }} />
        {theme.mode === "visitor" && <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />}
        {/* =================================================
            JSON-LD STRUCTURED DATA
        ================================================= */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd({
              "@context": "https://schema.org",
              "@graph": [structuredData, {
                "@type": "WebSite", "@id": `${siteUrl}/#website`, name: siteName,
                url: siteUrl, inLanguage: routing.locales, publisher: { "@id": `${siteUrl}/#travel-agency` },
              }],
            }),
          }}
        />
      </head>

      <body
        className="
          antialiased
          bg-white
          text-black
          font-sans
        "
      >
        {/* =================================================
            GOOGLE TAG MANAGER
        ================================================= */}

        <GoogleTagManager gtmId="GTM-WZFP43TS" />
        <GoogleAnalytics gaId="G-62T0D6J38X" />

        {/* =================================================
            INTERNATIONALIZATION
        ================================================= */}

        <NextIntlClientProvider messages={messages}>
        <ContactProvider value={siteSettings}>
        <ThemeModeProvider value={theme.mode}>
          {/* =================================================
              NAVBAR
          ================================================= */}

          <header
            className="
              bg-white
              sticky
              top-0
              z-50
              shadow-md
            "
          >
            <Navbar />
            <ScrollReveal />
            {theme.preset === "christmas" && <ChristmasGarland />}
          </header>

          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <a className="skip-link" href="#main-content">{nav("skipToContent")}</a>
          <SiteMotion>
          <main id="main-content" tabIndex={-1}>
            <PageTransition>{children}</PageTransition>
          </main>

          {/* =================================================
              TRUST BAR
          ================================================= */}

          <TrustBar contact={siteSettings} />

          {/* =================================================
              FOOTER
          ================================================= */}

          {/* The footer reads the tour list from the database; streaming it lets the page above render without waiting. */}
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
          </SiteMotion>

          {/* =================================================
              FLOATING LANGUAGE
          ================================================= */}

          <LanguageFloatingButton />

          {/* =================================================
              FLOATING CURRENCY
          ================================================= */}

          <FloatingCurrency />

          {/* floating WhatsApp chat */}
          <WhatsAppButton contact={siteSettings} />

          {/* anonymous visitor analytics (see Admin → Analytics) */}
          <PageTracker />

          {/* falling snowflakes over the whole site */}
          {theme.preset === "christmas" && <Snowfall />}
        </ThemeModeProvider>
        </ContactProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
