import mongoose, { Schema, models, Model } from "mongoose";

export interface IBooking {
  name: string;
  email: string;
  phone: string;
  date: string;
  time?: string;
  message: string;
  notes?: string;
  internalNotes?: string;
  itemName?: string;
  bookingType?: string;
  people: number;
  pricePerPerson?: number;
  additionalPersonPrice?: number;
  totalPrice?: number;
  paymentStatus?: "unpaid" | "deposit" | "paid";
  amountPaid?: number;
  assignedDriver?: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  history?: { action: string; at: Date }[];
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    date: String,
    time: String,
    message: String,
    notes: String,
    internalNotes: String,
    itemName: String,
    bookingType: String,
    people: { type: Number, required: true, min: 2 },
    pricePerPerson: Number,
    additionalPersonPrice: Number,
    totalPrice: Number,
    paymentStatus: { type: String, enum: ["unpaid", "deposit", "paid"], default: "unpaid" },
    amountPaid: { type: Number, default: 0 },
    assignedDriver: String,
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    history: [{ action: String, at: { type: Date, default: Date.now }, _id: false }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: false, updatedAt: true } }
);

BookingSchema.index({ createdAt: -1 });
BookingSchema.index({ email: 1 });

const Booking: Model<IBooking> =
  (models.Booking as Model<IBooking>) ?? mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
