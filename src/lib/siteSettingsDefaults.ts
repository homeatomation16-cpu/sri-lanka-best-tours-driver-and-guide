// Types, defaults and validation for the site settings edited in Admin → Site settings (contact details, social links). Stored in SiteContent
// under key "settings"; anything not saved there falls back to src/data/contact.ts.
import { contact as defaults } from "@/data/contact";

export const SOCIAL_KEYS = ["facebook", "instagram", "youtube", "tripadvisor", "twitter", "linkedin"] as const;
export type SocialKey = (typeof SOCIAL_KEYS)[number];

export type SiteSettings = {
  brand: string;
  phone: string;
  whatsapp: string;
  /** wa.me link built from the WhatsApp number */
  whatsappme: string;
  email: string;
  address: string;
  /** Google Maps embed URL (footer / contact page map) */
  map: string;
  businessHours: string;
  social: Record<SocialKey, string>;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  brand: "Sri Lanka Best Tour Driver and Guide",
  phone: defaults.phone,
  whatsapp: defaults.whatsapp,
  whatsappme: defaults.whatsappme,
  email: defaults.email,
  address: defaults.address,
  map: defaults.map,
  businessHours: "",
  social: { facebook: "", instagram: "", youtube: "", tripadvisor: "", twitter: "", linkedin: "", ...defaults.social },
};

const text = (value: unknown, max = 300) => (typeof value === "string" ? value.trim().slice(0, max) : "");
const httpsUrl = (value: unknown) => {
  const v = text(value, 2000);
  if (!v) return "";
  try {
    const url = new URL(v);
    return url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
};

/** Cleans what the admin typed; empty fields fall back to the defaults. */
export function normalizeSettings(input: any): SiteSettings {
  const whatsapp = text(input?.whatsapp, 40) || DEFAULT_SETTINGS.whatsapp;
  const digits = whatsapp.replace(/[^\d]/g, "");
  return {
    brand: text(input?.brand, 120) || DEFAULT_SETTINGS.brand,
    phone: text(input?.phone, 40) || DEFAULT_SETTINGS.phone,
    whatsapp,
    whatsappme: digits ? `https://wa.me/${digits}` : DEFAULT_SETTINGS.whatsappme,
    email: (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text(input?.email, 254)) && text(input?.email, 254)) || DEFAULT_SETTINGS.email,
    address: text(input?.address, 300) || DEFAULT_SETTINGS.address,
    map: httpsUrl(input?.map) || DEFAULT_SETTINGS.map,
    businessHours: text(input?.businessHours, 120),
    social: Object.fromEntries(SOCIAL_KEYS.map((k) => [k, input?.social && k in input.social ? httpsUrl(input.social[k]) : DEFAULT_SETTINGS.social[k]])) as Record<SocialKey, string>,
  };
}
