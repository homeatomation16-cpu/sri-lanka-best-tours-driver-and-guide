import mongoose, { Schema, model, models } from "mongoose";

const TourSchema = new Schema({
  tourId: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  image: { type: String },
  duration: { type: Number },
  tourType: { type: String },
  translations: {
    type: Map,
    of: new Schema({
      title: String,
      overview: String,
      itinerary: Array,
      included: Array,
      excluded: Array,
      vehicleInfo: Array,
    }, { _id: false })
  },
  status: { type: String, default: "active" },
  createdAt: { type: Date, default: Date.now },
});

// Next.js Hot Reload වලදී එන Schema errors වැලැක්වීමට මෙය අත්‍යවශ්‍යයි
if (models.Tour) {
  delete (mongoose as any).models.Tour;
}

const Tour = mongoose.model("Tour", TourSchema);
export default Tour;