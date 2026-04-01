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

/* ── Metadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Sri Lanka Tours Driver | Luxury & Adventure Tours",
    fr: "Sri Lanka Tours Driver | Circuits de Luxe et d'Aventure",
    de: "Sri Lanka Tours Driver | Luxus- und Abenteuerreisen",
    es: "Sri Lanka Tours Driver | Tours de Lujo y Aventura",
    it: "Sri Lanka Tours Driver | Tour di Lusso e Avventura",
    hi: "Sri Lanka Tours Driver | लक्जरी और रोमांच टूर",
    zh: "Sri Lanka Tours Driver | 奢华与冒险之旅",
    ru: "Sri Lanka Tours Driver | Туры класса люкс и приключений",
    ja: "Sri Lanka Tours Driver | ラグジュアリー＆アドベンチャーツアー",
    si: "Sri Lanka Tours Driver | සුඛෝපභෝගී සහ සංචාර",
  };

  return {
    title: titles[locale] ?? titles.en,
    description:
      "Luxury private tours across Sri Lanka with professional guides and chauffeurs.",
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

  /* Validate locale */
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  /* Load translation messages */
  const messages = await getMessages();

  const dir = "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${poppins.variable} ${playfair.variable} ${sinhala.variable} ${libre.variable} ${thea.variable}`}
    >
      <body className="antialiased bg-white text-black font-sans">
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