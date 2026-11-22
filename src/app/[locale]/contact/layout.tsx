import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return pageMetadata(locale, "/contact", t("title"), t("page.heroText"), "/contact-cover.jpg");
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
