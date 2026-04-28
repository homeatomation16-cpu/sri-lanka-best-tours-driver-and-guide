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

/* ── 1. Fonts Optimization ── */
// Performance වැඩි කිරීමට අවශ්‍යම Weights පමණක් තෝරාගෙන ඇත
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

/* ── Static params ── */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/* ── 2. SEO & Metadata Optimization ── */
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
    en: "Hire a private driver in Sri Lanka. Affordable tours, airport transfers, and custom itineraries.",
    si: "ශ්‍රී ලංකාවේ පුද්ගලික රියදුරෙකු සහ මඟ පෙන්වන්නෙකු කුලියට ගන්න. සාධාරණ මිල ගණන් සහ විශිෂ්ට සේවාව.",
    // අනෙක් භාෂාවන් මෙහි ඇතුළත් කරන්න...
  };

  const siteUrl = "https://www.srilankabesttourdriverandguide.com";

  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
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
        'x-default': `${siteUrl}/en`, // SEO සඳහා අත්‍යවශ්‍යයි
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      url: `${siteUrl}/${locale}`,
      siteName: "Sri Lanka Best Tour Driver",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
      locale,
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

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
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={`${poppins.variable} ${playfair.variable} ${sinhala.variable} ${libre.variable} ${thea.variable}`}
    >
      <body className="antialiased bg-white text-black font-sans">
        
        {/* ✅ Google Tag Manager */}
        <GoogleTagManager gtmId="GTM-WZFP43TS" />

        {/* ✅ Structured Data (JSON-LD) - SEO සඳහා */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "Sri Lanka Best Tour Driver and Guide",
              url: "https://www.srilankabesttourdriverandguide.com",
              image: "https://www.srilankabesttourdriverandguide.com/logo.png",
              areaServed: "Sri Lanka",
              serviceType: "Private Tours & Chauffeur Service",
              priceRange: "$$",
            }),
          }}
        />

        <NextIntlClientProvider messages={messages}>
          <header className="bg-white sticky top-0 z-50 shadow-md">
            <Navbar />
          </header>

          <main>
            <PageTransition>{children}</PageTransition>
          </main>

          <TrustBar />
          <Footer />
          <LanguageFloatingButton />
          <FloatingCurrency />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}