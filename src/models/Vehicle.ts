import mongoose, { Schema, Document, models, Model } from "mongoose";

// 🔹 Translation Type
interface VehicleTranslation {
  name: string;
  overview: string;
  features: string[];
  paymentPolicy: string[];
}

// 🔹 Main Interface
export interface IVehicle extends Document {
  vehicleId: string;
  name: string;
  type?: string;
  price?: number;
  passengers?: number;
  fuel?: string;
  transmission?: string;
  image?: string;
  gallery?: string[];
  driver?: {
    name?: string;
    phone?: string;
  };

  translations?: Record<string, VehicleTranslation>;

  status: "active" | "inactive";
  createdAt: Date;
}

// 🔹 Schema
const VehicleSchema = new Schema<IVehicle>(
  {
    // unique: true already creates the index, so no extra index() needed
    vehicleId: { type: String, required: true, unique: true },
    name: { type: String, required: true },

    type: { type: String },
    price: { type: Number },
    passengers: { type: Number },
    fuel: { type: String },
    transmission: { type: String },

    image: { type: String },
    gallery: [{ type: String }],

    driver: {
      name: String,
      phone: String,
    },

    translations: {
      type: Object,
      default: {},
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // createdAt + updatedAt auto
  },
);

// 🔥 Indexes (performance boost)
VehicleSchema.index({ status: 1 });

const Vehicle = (models.Vehicle as Model<IVehicle>) || mongoose.model<IVehicle>("Vehicle", VehicleSchema);

export default Vehicle;
