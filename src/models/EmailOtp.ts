import mongoose, { Schema, models } from "mongoose";

// Booking e-mail verification codes. Only hashes are stored; MongoDB deletes expired codes.
const EmailOtpSchema = new Schema(
  {
    _id: String, // sha256(lower-case e-mail)
    codeHash: { type: String, required: true },
    attempts: { type: Number, default: 0 },
    expiresAt: { type: Date, required: true },
  },
  { versionKey: false }
);
EmailOtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const EmailOtp: any = models.EmailOtp ?? mongoose.model("EmailOtp", EmailOtpSchema);
export default EmailOtp;
