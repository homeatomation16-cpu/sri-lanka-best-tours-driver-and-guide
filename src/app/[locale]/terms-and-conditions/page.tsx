import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { TERMS } from "@/data/legal";
import { LegalDocPage } from "@/components/site/LegalPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, TERMS.path, TERMS.title, TERMS.summary);
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <LegalDocPage doc={TERMS} locale={locale} />;
}
