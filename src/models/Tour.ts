import mongoose, { Schema, models } from "mongoose";

const TourSchema = new Schema(
  {
    tourId: { type: String, required: true, unique: true, trim: true },
    price: { type: Number, required: true },
    pricePerPerson: { type: Number },
    additionalPersonPrice: { type: Number },
    minimumPeople: { type: Number, default: 2 },
    maxPeople: { type: Number },
    minAge: { type: Number },
    image: { type: String },
    gallery: [{ type: String }],
    duration: { type: Number },
    tourType: { type: String },
    featured: { type: Boolean, default: false },
    translations: { type: Map, of: Schema.Types.Mixed },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  {
    strict: false,
    timestamps: true,
  }
);

TourSchema.index({ status: 1 });

const Tour: any = models.Tour ?? mongoose.model("Tour", TourSchema);
export default Tour;
