// Server-side read of Admin → Theme (cached; the save route clears the tag).
import { unstable_cache } from "next/cache";
import connectDB from "@/lib/mongodb";
import SiteContent from "@/models/SiteContent";
import { DEFAULT_THEME, normalizeTheme } from "@/lib/themeDefaults";

export * from "@/lib/themeDefaults";
export const THEME_TAG = "site-theme";

export const getTheme = unstable_cache(
  async () => {
    try {
      await connectDB();
      const doc = await SiteContent.findOne({ key: "theme" }).lean();
      return doc?.data ? normalizeTheme(doc.data) : DEFAULT_THEME;
    } catch {
      return DEFAULT_THEME;
    }
  },
  ["site-theme"],
  { tags: [THEME_TAG], revalidate: 3600 },
);
