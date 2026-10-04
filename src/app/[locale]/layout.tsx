// src/app/[locale]/layout.tsx

import type { Metadata } from "next";

import { Poppins, Playfair_Display, Noto_Sans_Sinhala, Libre_Baskerville } from "next/font/google";

import localFont from "next/font/local";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";

import { GoogleTagManager } from "@next/third-parties/google";

import "../globals.css";

import PageTransition from "../../components/PageTransition";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import TrustBar from "../../components/TrustBar";
import LanguageFloatingButton from "@/components/LanguageFloatingButton";
import FloatingCurrency from "@/components/FloatingCurrency";
import PageTracker from "@/components/PageTracker";

/* =========================================================
   1. SITE CONFIG
========================================================= */

const siteUrl = "https://www.srilankabesttourdriverandguide.com";

const siteName = "Sri Lanka Best Tour Driver and Guide";

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
});

const libre = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre",
  display: "swap",
});

const thea = localFont({
  src: "../../fonts/TheaAmelia-eZM86.otf",
  variable: "--font-thea",
  display: "swap",
});

/* =========================================================
   3. STATIC LOCALES
========================================================= */

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

const languageAlternates: Record<string, string> = {
  en: `${siteUrl}/en`,
  fr: `${siteUrl}/fr`,
  de: `${siteUrl}/de`,
  es: `${siteUrl}/es`,
  it: `${siteUrl}/it`,
  hi: `${siteUrl}/hi`,
  zh: `${siteUrl}/zh`,
  ru: `${siteUrl}/ru`,
  ja: `${siteUrl}/ja`,
  si: `${siteUrl}/si`,
  ar: `${siteUrl}/ar`,
  pt: `${siteUrl}/pt`,
  nl: `${siteUrl}/nl`,
  sv: `${siteUrl}/sv`,
};

/* =========================================================
   7. SEO METADATA
========================================================= */

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const currentLocale = routing.locales.includes(locale as (typeof routing.locales)[number]) ? locale : defaultLocale;

  const title = titles[currentLocale] ?? titles[defaultLocale];

  const description = descriptions[currentLocale] ?? descriptions[defaultLocale];

  const canonicalUrl = `${siteUrl}/${currentLocale}`;

  return {
    /* =====================================================
       BASIC SEO
    ===================================================== */

    metadataBase: new URL(siteUrl),

    title,

    description,

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

    alternates: {
      canonical: canonicalUrl,

      languages: {
        en: languageAlternates.en,
        fr: languageAlternates.fr,
        de: languageAlternates.de,
        es: languageAlternates.es,
        it: languageAlternates.it,
        hi: languageAlternates.hi,
        zh: languageAlternates.zh,
        ru: languageAlternates.ru,
        ja: languageAlternates.ja,
        si: languageAlternates.si,
        ar: languageAlternates.ar,
        pt: languageAlternates.pt,
        nl: languageAlternates.nl,
        sv: languageAlternates.sv,
        th: languageAlternates.th,
        vi: languageAlternates.vi,
        ta: languageAlternates.ta,
        te: languageAlternates.te,
        bn: languageAlternates.bn,
        ur: languageAlternates.ur,

        "x-default": languageAlternates.en,
      },
    },

    /* =====================================================
       OPEN GRAPH
    ===================================================== */

    openGraph: {
      type: "website",

      locale: currentLocale,

      url: canonicalUrl,

      siteName,

      title,

      description,

      images: [
        {
          url: `${siteUrl}/og-image.jpg`,

          width: 1200,

          height: 630,

          alt: siteName,
        },
      ],
    },

    /* =====================================================
       TWITTER / X
    ===================================================== */

    twitter: {
      card: "summary_large_image",

      title,

      description,

      images: [`${siteUrl}/og-image.jpg`],
    },

    /* =====================================================
       ROBOTS
    ===================================================== */

    robots: {
      index: true,

      follow: true,

      googleBot: {
        index: true,

        follow: true,

        "max-video-preview": -1,

        "max-image-preview": "large",

        "max-snippet": -1,
      },
    },

    /* =====================================================
       ICONS
    ===================================================== */

    icons: {
      icon: [
        {
          url: "/favicon.ico",
        },
        {
          url: "/icon.png",
          type: "image/png",
        },
      ],

      apple: [
        {
          url: "/apple-touch-icon.png",
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

  /* =======================================================
     LOAD TRANSLATIONS
  ======================================================= */

  const messages = await getMessages();

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

    image: `${siteUrl}/og-image.jpg`,

    description: descriptions[locale] ?? descriptions[defaultLocale],

    areaServed: {
      "@type": "Country",

      name: "Sri Lanka",
    },

    serviceType: ["Private Tours", "Private Driver Hire", "Chauffeur Service", "Airport Transfers", "Airport Taxi", "Tour Guide", "Custom Itineraries"],

    priceRange: "$$",

    inLanguage: locale,

    sameAs: [
      // Add your real social media URLs here
      // "https://www.facebook.com/...",
      // "https://www.instagram.com/...",
      // "https://www.youtube.com/...",
    ],
  };

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <html
      lang={locale}
      dir={direction}
      className={`
        ${poppins.variable}
        ${playfair.variable}
        ${sinhala.variable}
        ${libre.variable}
        ${thea.variable}
      `}
    >
      <head>
        {/* =================================================
            JSON-LD STRUCTURED DATA
        ================================================= */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
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

        {/* =================================================
            INTERNATIONALIZATION
        ================================================= */}

        <NextIntlClientProvider messages={messages}>
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
          </header>

          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <main>
            <PageTransition>{children}</PageTransition>
          </main>

          {/* =================================================
              TRUST BAR
          ================================================= */}

          <TrustBar />

          {/* =================================================
              FOOTER
          ================================================= */}

          <Footer />

          {/* =================================================
              FLOATING LANGUAGE
          ================================================= */}

          <LanguageFloatingButton />

          {/* =================================================
              FLOATING CURRENCY
          ================================================= */}

          <FloatingCurrency />

          {/* anonymous visitor analytics (see Admin → Analytics) */}
          <PageTracker />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
