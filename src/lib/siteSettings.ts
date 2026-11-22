// Site settings edited in Admin → Site settings (contact details, social links). Stored in SiteContent
// under key "settings"; anything not saved there falls back to src/data/contact.ts (see siteSettingsDefaults.ts).
import { unstable_cache } from "next/cache";
import connectDB from "@/lib/mongodb";
import SiteContent from "@/models/SiteContent";
import { DEFAULT_SETTINGS, normalizeSettings, type SiteSettings } from "@/lib/siteSettingsDefaults";

export { DEFAULT_SETTINGS, normalizeSettings, SOCIAL_KEYS, type SiteSettings, type SocialKey } from "@/lib/siteSettingsDefaults";
export const SETTINGS_TAG = "site-settings";

/** Current settings (cached; Admin → Site settings refreshes the cache when it saves). */
export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSettings> => {
    try {
      await connectDB();
      const doc: any = await SiteContent.findOne({ key: "settings" }).lean();
      return doc?.data ? normalizeSettings(doc.data) : DEFAULT_SETTINGS;
    } catch (error) {
      console.error("getSiteSettings failed:", error);
      return DEFAULT_SETTINGS;
    }
  },
  ["site-settings"],
  { tags: [SETTINGS_TAG], revalidate: 3600 }
);
