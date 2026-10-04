import mongoose, { Schema, models } from "mongoose";

const PageViewSchema = new Schema(
  {
    path: { type: String, index: true },
    locale: String,
    visitor: { type: String, index: true }, // random id from the browser, no personal data
    referrer: String,
    device: String, // mobile | tablet | desktop
    country: String,
    createdAt: { type: Date, default: Date.now, index: true },
  },
  { versionKey: false }
);
// raw rows are deleted automatically after 400 days
PageViewSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 400 });

const PageView: any = models.PageView ?? mongoose.model("PageView", PageViewSchema);
export default PageView;
