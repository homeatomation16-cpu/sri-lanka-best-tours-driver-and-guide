import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

// Next.js already sends a 404 status and a noindex robots tag for this page.
export const metadata: Metadata = { title: "Page not found" };

export default async function NotFound() {
  const nav = await getTranslations("nav");
  const links = [
    { href: "/tours", label: nav("tours") },
    { href: "/destinations", label: nav("destinations") },
    { href: "/excursions", label: nav("excursions") },
    { href: "/vehicles", label: nav("vehicles") },
    { href: "/contact", label: nav("contact") },
  ];

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center bg-[#faf7f2] px-6 py-24 text-center">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#d4a853]">404</p>
      <h1 className="font-playfair text-4xl text-slate-900 sm:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-md text-slate-600">The page you are looking for has moved or no longer exists. These pages may help you plan your Sri Lanka trip:</p>
      <nav aria-label="Popular pages" className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-full bg-[#0b2a22] px-6 py-3 text-sm font-semibold text-white">{nav("home")}</Link>
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 hover:border-[#d4a853]">
            {l.label}
          </Link>
        ))}
      </nav>
    </section>
  );
}
