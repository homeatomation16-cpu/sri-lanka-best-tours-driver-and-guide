import mongoose, { Schema, models } from "mongoose";

// Booking e-mail verification. A document holds either a pending 6-digit code or, once the code
// is correct, a short-lived proof the booking API consumes. Only hashes are stored; MongoDB deletes
// expired documents, and both routes also check expiresAt themselves.
const EmailOtpSchema = new Schema(
  {
    _id: String, // sha256(lower-case e-mail)
    codeHash: String, // sha256(code) while a code is pending
    proofHash: String, // sha256(proof token) after a correct code
    purpose: String, // "booking" for a proof
    attempts: { type: Number, default: 0 },
    expiresAt: { type: Date, required: true },
  },
  { versionKey: false }
);
EmailOtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const EmailOtp: any = models.EmailOtp ?? mongoose.model("EmailOtp", EmailOtpSchema);
export default EmailOtp;
