import mongoose, { Schema, models } from "mongoose";

/**
 * One document per editable section of the website.
 *   key = "hero" | "gallery" | "tailorMade"
 *
 * hero.items[]    -> { type:"video"|"image", src, poster, title:{en,..}, subtitle:{en,..} }
 * gallery.items[] -> { src, alt:{en,..}, caption:{en,..} }
 * tailorMade      -> { image, label, heading, desc, subtext1, subtext2, buttonPrimary, buttonSecondary, tags:[{en,..}] }
 *
 * All text is stored as { en: "...", si: "...", ... }. The admin only types
 * the English; the server fills in the other 13 languages automatically.
 */
const SiteContentSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    data: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true, minimize: false }
);

const SiteContent: any = models.SiteContent ?? mongoose.model("SiteContent", SiteContentSchema);
export default SiteContent;
