import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata, localizedUrl, sectionBreadcrumb, siteUrl } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { getSiteSettings } from "@/lib/siteSettings";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return pageMetadata(locale, "/contact", t("title"), t("page.heroText"), "/contact-cover.jpg");
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, nav, contact] = await Promise.all([
    getTranslations({ locale, namespace: "contact" }),
    getTranslations({ locale, namespace: "nav" }),
    getSiteSettings(),
  ]);

  // The business itself (TravelAgency, a LocalBusiness type) is described once in the root layout;
  // the contact page points at it and repeats the contact points shown on this page.
  const contactPage = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: t("title"),
    url: localizedUrl(locale, "/contact"),
    about: { "@id": `${siteUrl}/#travel-agency` },
    mainEntity: {
      "@type": "TravelAgency",
      "@id": `${siteUrl}/#travel-agency`,
      ...(contact.phone ? { telephone: contact.phone } : {}),
      ...(contact.email ? { email: contact.email } : {}),
      ...(contact.address ? { address: { "@type": "PostalAddress", streetAddress: contact.address, addressCountry: "LK" } } : {}),
      ...(contact.phone || contact.whatsapp
        ? { contactPoint: [{ "@type": "ContactPoint", contactType: "customer service", telephone: contact.whatsapp || contact.phone, areaServed: "LK", availableLanguage: ["English"] }] }
        : {}),
    },
  };

  return (
    <>
      <JsonLd data={[contactPage, sectionBreadcrumb(locale, nav("home"), nav("contact"), "/contact")]} />
      {children}
    </>
  );
}
