"use client";

// Gives client components the contact details from Admin → Site settings (falls back to src/data/contact.ts).
import { createContext, useContext, type ReactNode } from "react";
import { DEFAULT_SETTINGS, type SiteSettings } from "@/lib/siteSettingsDefaults";

const Ctx = createContext<SiteSettings>(DEFAULT_SETTINGS);

export function ContactProvider({ value, children }: { value: SiteSettings; children: ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useContact = () => useContext(Ctx);
