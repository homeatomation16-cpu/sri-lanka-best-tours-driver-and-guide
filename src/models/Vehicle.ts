import mongoose, { Schema, Document, models, Model } from "mongoose";

// 1. වාහනයක තිබිය යුතු දත්ත මොනවාදැයි TypeScript වලට පවසන Interface එක
export interface IVehicle extends Document {
  vehicleId: string;
  name: string;
  type?: string;
  price?: string;
  passengers?: number;
  fuel?: string;
  transmission?: string;
  image?: string;
  gallery?: string[];
  driver?: any;
  translations?: Map<string, {
    name: string;
    overview: string;
    features: string[];
    paymentPolicy: string[];
  }>;
  status: string;
  createdAt: Date;
}

const VehicleSchema = new Schema<IVehicle>({
  vehicleId: { type: String, required: true, unique: true },
  name: { type: String, required: true }, 
  type: { type: String },
  price: { type: String },
  passengers: { type: Number },
  fuel: { type: String },
  transmission: { type: String },
  image: { type: String },
  gallery: { type: [String] },
  
  // භාෂා 14ම දත්ත ගබඩා වන කොටස
  translations: {
    type: Map,
    of: new Schema({
      name: String,
      overview: String,
      features: [String],
      paymentPolicy: [String],
    }, { _id: false })
  },
  
  status: { type: String, default: "active" },
  createdAt: { type: Date, default: Date.now },
}, { 
  strict: false // Schema එකේ නැති අලුත් දත්ත වුණත් සේව් කරන්න ඉඩ දෙයි
});

// 2. Model එක ලබා ගැනීම (දැනටමත් තිබේ නම් එය පාවිච්චි කරයි, නැත්නම් අලුතින් හදයි)
// මෙහි <IVehicle> යෙදීමෙන් අර TypeScript error එක සම්පූර්ණයෙන්ම නැති වේ.
const Vehicle = (models.Vehicle as Model<IVehicle>) || mongoose.model<IVehicle>("Vehicle", VehicleSchema);

export default Vehicle;