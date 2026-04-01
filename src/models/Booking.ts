import mongoose, { Schema, model, models, Document } from "mongoose";

// Booking එකේ දත්ත වලට අදාළ Interface එක
export interface IBooking extends Document {
  name: string;
  email: string;
  phone: string;
  date: string;
  time?: string;      // අලුතින් එක් කළා
  message: string;
  notes?: string;     // අලුතින් එක් කළා
  itemName?: string;   // උදා: Tour Name හෝ Vehicle Name
  bookingType?: string; // උදා: "Tour" හෝ "Vehicle"
  status: "pending" | "confirmed" | "cancelled";
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  date: { type: String },
  time: { type: String },
  message: { type: String },
  notes: { type: String },
  itemName: { type: String },
  bookingType: { type: String },
  status: { 
    type: String, 
    enum: ["pending", "confirmed", "cancelled"], 
    default: "pending" 
  },
  createdAt: { type: Date, default: Date.now },
});

// Model එක export කිරීම
const Booking = models.Booking || model<IBooking>("Booking", BookingSchema);
export default Booking;