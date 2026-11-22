import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tailorMade" });
  return pageMetadata(locale, "/tailor-made-tours", t("label"), t("desc"), "/tailor-made-sri-lanka.jpg");
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
