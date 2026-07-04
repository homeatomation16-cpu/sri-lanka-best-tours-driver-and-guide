import mongoose, { Schema, models, Model } from "mongoose";

export interface IBooking {
  name: string;
  email: string;
  phone: string;
  date: string;
  time?: string;
  message: string;
  notes?: string;
  itemName?: string;
  bookingType?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  date: String,
  time: String,
  message: String,
  notes: String,
  itemName: String,
  bookingType: String,
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking: Model<IBooking> =
  (models.Booking as Model<IBooking>) ??
  mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;