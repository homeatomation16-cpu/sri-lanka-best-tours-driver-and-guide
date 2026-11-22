// Shared layout for the Privacy, Terms, Cookie and FAQ pages: hero, "last updated", contents and a contact box.
import type { ReactNode } from "react";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { ListingHero } from "@/components/site/ListingPage";
import { getSiteSettings } from "@/lib/siteSettings";
import type { LegalDoc, LegalSection } from "@/data/legal";
import { breadcrumbJsonLd, serializeJsonLd } from "@/lib/seo";

const slug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export async function LegalShell({
  doc,
  locale,
  toc,
  children,
  jsonLd,
}: {
  doc: Pick<LegalDoc, "path" | "eyebrow" | "title" | "summary" | "updated">;
  locale: string;
  toc: string[];
  children: ReactNode;
  jsonLd?: object;
}) {
  const contact = await getSiteSettings();
  const crumbs = breadcrumbJsonLd(locale, [{ name: "Home", path: "" }, { name: doc.title, path: doc.path }]);

  return (
    <div className="bg-[#faf7f2]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd ? [crumbs, jsonLd] : crumbs) }} />
      <ListingHero image="/aboutcover.jpg" eyebrow={doc.eyebrow} title={doc.title} subtitle={doc.summary} />

      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-6 sm:py-14 lg:grid-cols-[240px_1fr] lg:gap-12">
        {/* contents — a sticky list on desktop, a compact box on phones */}
        <nav aria-label="On this page" className="h-fit rounded-2xl border border-slate-200 bg-white p-4 text-sm lg:sticky lg:top-28">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-slate-500">On this page</p>
          <ol className="grid gap-1.5 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {toc.map((heading) => (
              <li key={heading}>
                <a href={`#${slug(heading)}`} className="text-slate-700 underline-offset-4 hover:text-amber-700 hover:underline">{heading}</a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="min-w-0">
          <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-slate-500">Last updated: {doc.updated}</p>
          {children}

          <aside className="mt-10 rounded-2xl bg-slate-900 p-5 text-white sm:p-7">
            <p className="font-playfair text-xl sm:text-2xl">Questions about this page?</p>
            <p className="mt-1 text-sm text-white/70">Contact {contact.brand} — we usually reply within a few hours.</p>
            <div className="mt-4 flex flex-wrap gap-2.5 text-sm">
              <a href={`mailto:${contact.email}`} className="inline-flex min-w-0 items-center gap-2 rounded-full bg-white/10 px-4 py-2 hover:bg-white/20"><Mail size={16} aria-hidden="true" /><span className="break-all">{contact.email}</span></a>
              <a href={contact.whatsappme} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 hover:bg-white/20"><MessageCircle size={16} aria-hidden="true" />WhatsApp</a>
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 hover:bg-white/20"><Phone size={16} aria-hidden="true" />{contact.phone}</a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Section({ section }: { section: LegalSection }) {
  return (
    <section id={slug(section.heading)} className="scroll-mt-28 border-b border-slate-200 py-6 first:pt-0 last:border-0">
      <h2 className="font-playfair text-xl text-slate-900 sm:text-2xl">{section.heading}</h2>
      {section.list && (
        <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-slate-700">
          {section.list.map((item) => (
            <li key={item} className="flex gap-2.5"><span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />{item}</li>
          ))}
        </ul>
      )}
      {section.paragraphs?.map((text) => <p key={text} className="mt-3 text-[15px] leading-relaxed text-slate-700">{text}</p>)}
    </section>
  );
}

export async function LegalDocPage({ doc, locale }: { doc: LegalDoc; locale: string }) {
  return (
    <LegalShell doc={doc} locale={locale} toc={doc.sections.map((s) => s.heading)}>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
        {doc.sections.map((section) => <Section key={section.heading} section={section} />)}
      </div>
    </LegalShell>
  );
}

export { slug as legalSlug };
