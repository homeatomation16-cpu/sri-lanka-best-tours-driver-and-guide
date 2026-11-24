import mongoose, { Schema, models } from "mongoose";

// One document per (hashed key, time window). MongoDB deletes it when the window ends,
// so the limit is shared by every server instance.
const RateLimitSchema = new Schema(
  {
    _id: String, // sha256(key):window number — no raw IPs or e-mail addresses are stored
    count: { type: Number, default: 0 },
    expiresAt: { type: Date, required: true },
  },
  { versionKey: false }
);
RateLimitSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const RateLimit: any = models.RateLimit ?? mongoose.model("RateLimit", RateLimitSchema);
export default RateLimit;
