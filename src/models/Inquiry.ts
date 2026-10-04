import mongoose, { Schema, models, Model } from "mongoose";

/** Contact-form messages and Tailor-made tour requests, saved so nothing is lost in e-mail. */
const InquirySchema = new Schema(
  {
    type: { type: String, enum: ["contact", "tailor-made"], required: true },
    name: String,
    email: String,
    phone: String,
    message: String,
    data: Schema.Types.Mixed, // full tailor-made payload
    status: { type: String, enum: ["new", "contacted", "closed"], default: "new" },
    internalNotes: String,
  },
  { timestamps: true }
);

InquirySchema.index({ createdAt: -1 });

const Inquiry: Model<any> = (models.Inquiry as Model<any>) ?? mongoose.model("Inquiry", InquirySchema);
export default Inquiry;
