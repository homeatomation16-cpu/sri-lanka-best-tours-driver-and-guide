import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { FAQ_DOC, FAQ_GROUPS } from "@/data/legal";
import { LegalShell, legalSlug } from "@/components/site/LegalPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, FAQ_DOC.path, FAQ_DOC.title, FAQ_DOC.summary);
}

// FAQPage structured data: lets search engines show these answers directly
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_GROUPS.flatMap((group) =>
    group.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  ),
};

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <LegalShell doc={FAQ_DOC} locale={locale} toc={FAQ_GROUPS.map((g) => g.heading)} jsonLd={faqJsonLd}>
      <div className="space-y-8">
        {FAQ_GROUPS.map((group) => (
          <section key={group.heading} id={legalSlug(group.heading)} className="scroll-mt-28">
            <h2 className="mb-3 font-playfair text-xl text-slate-900 sm:text-2xl">{group.heading}</h2>
            <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              {group.items.map((item) => (
                <details key={item.q} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3.5 font-semibold text-slate-900 hover:bg-slate-50 sm:px-6 sm:py-4 [&::-webkit-details-marker]:hidden">
                    <span className="text-[15px] sm:text-base">{item.q}</span>
                    <ChevronDown size={18} aria-hidden="true" className="shrink-0 text-amber-600 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="px-4 pb-4 text-[15px] leading-relaxed text-slate-700 sm:px-6">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </LegalShell>
  );
}
