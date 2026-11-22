import mongoose, { Schema, models, Model } from "mongoose";

/**
 * Website visitor account (optional – guests can still book). Separate from the admin login,
 * so a customer session can never reach the admin pages or APIs.
 */
export interface ICustomer {
  name: string;
  email: string;
  /** Absent for accounts created with Google sign-in only. */
  passwordHash?: string;
  googleId?: string;
  emailVerified: boolean;
  /** Raised on password change / reset, which signs out every existing session. */
  tokenVersion: number;
  verifyTokenHash?: string;
  verifyExpires?: Date;
  resetTokenHash?: string;
  resetExpires?: Date;
  lastLoginAt?: Date;
  createdAt: Date;
}

const CustomerSchema = new Schema<ICustomer>(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true, maxlength: 254 },
    passwordHash: { type: String, select: false },
    googleId: { type: String, select: false, index: { unique: true, sparse: true } },
    emailVerified: { type: Boolean, default: false },
    tokenVersion: { type: Number, default: 0 },
    verifyTokenHash: { type: String, select: false },
    verifyExpires: { type: Date, select: false },
    resetTokenHash: { type: String, select: false },
    resetExpires: { type: Date, select: false },
    lastLoginAt: Date,
  },
  { timestamps: true }
);

const Customer: Model<ICustomer> = models.Customer || mongoose.model<ICustomer>("Customer", CustomerSchema);
export default Customer;
