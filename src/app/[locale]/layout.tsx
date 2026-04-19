// src/app/[locale]/layout.tsx
import {
  Poppins,
  Playfair_Display,
  Noto_Sans_Sinhala,
  Libre_Baskerville,
} from "next/font/google";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { GoogleTagManager } from '@next/third-parties/google';

import "../globals.css";
import PageTransition from "../../components/PageTransition";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import TrustBar from "../../components/TrustBar";
import LanguageFloatingButton from "@/components/LanguageFloatingButton";
import FloatingCurrency from "@/components/FloatingCurrency";

/* ── Fonts ── */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const sinhala = Noto_Sans_Sinhala({
  subsets: ["sinhala"],
  weight: ["400", "500", "600"],
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
});

/* ── Static params for locales ── */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/* ── SEO Metadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

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
  };

  const descriptions: Record<string, string> = {
    en: "Hire a private driver in Sri Lanka. Affordable tours, airport transfers, and custom itineraries for UK & European travelers.",
    fr: "Louez un chauffeur privé au Sri Lanka. Circuits abordables et transferts aéroport.",
    de: "Mieten Sie einen privaten Fahrer in Sri Lanka. Touren und Transfers.",
    es: "Alquile un conductor privado en Sri Lanka. Tours y traslados.",
    it: "Noleggia un autista privato in Sri Lanka. Tour e trasferimenti.",
    hi: "Sri Lanka में निजी ड्राइवर किराए पर लें।",
    zh: "在斯里兰卡雇佣私人司机。",
    ru: "Нанять частного водителя в Шри-Ланке.",
    ja: "スリランカで専属ドライバーを雇う。",
    si: "ශ්‍රී ලංකාවේ පුද්ගලික රියදුරෙකු කුලියට ගන්න.",
  };

  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    keywords: [
      "Sri Lanka private driver",
      "hire driver Sri Lanka",
      "Sri Lanka tour packages",
      "chauffeur Sri Lanka",
      "Sri Lanka airport transfer",
    ],
    metadataBase: new URL("https://www.srilankabesttourdriverandguide.com"),
    verification: {
      google: "google62a812899a7c013c",
    },
    alternates: {
      canonical: `https://www.srilankabesttourdriverandguide.com/${locale}`,
      languages: {
        en: "https://www.srilankabesttourdriverandguide.com/en",
        fr: "https://www.srilankabesttourdriverandguide.com/fr",
        de: "https://www.srilankabesttourdriverandguide.com/de",
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      url: `https://www.srilankabesttourdriverandguide.com/${locale}`,
      siteName: "Sri Lanka Tour Driver",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
        },
      ],
      locale,
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/* ── Layout ── */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir="ltr"
      className={`${poppins.variable} ${playfair.variable} ${sinhala.variable} ${libre.variable} ${thea.variable}`}
    >
      <body className="antialiased bg-white text-black font-sans">
        
        {/* ✅ Google Tag Manager injected optimally */}
        <GoogleTagManager gtmId="GTM-WZFP43TS" />

        {/* ✅ JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "Sri Lanka Best Tour Driver and Guide",
              url: "https://www.srilankabesttourdriverandguide.com",
              telephone: "+94704685300", 
              areaServed: "Sri Lanka",
              serviceType: "Private Tours & Driver Hire",
            }),
          }}
        />

        <NextIntlClientProvider messages={messages}>
          <header className="bg-white sticky top-0 z-50 shadow-md">
            <Navbar />
          </header>

          <PageTransition>{children}</PageTransition>

          <TrustBar />
          <Footer />
          <LanguageFloatingButton />
          <FloatingCurrency />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}