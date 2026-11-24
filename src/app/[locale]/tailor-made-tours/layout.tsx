import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { pageMetadata, sectionBreadcrumb } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tailorMade" });
  return pageMetadata(locale, "/tailor-made-tours", t("label"), t("desc"), "/tailor-made-sri-lanka.jpg");
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const nav = await getTranslations({ locale, namespace: "nav" });
  return (
    <>
      <JsonLd data={sectionBreadcrumb(locale, nav("home"), nav("tailorMade"), "/tailor-made-tours")} />
      {children}
    </>
  );
}
