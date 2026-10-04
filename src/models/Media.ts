import mongoose, { Schema, models, Model } from "mongoose";

export interface IMedia {
  filename: string;
  contentType: string;
  size: number;
  data: Buffer;
  createdAt: Date;
}

const MediaSchema = new Schema<IMedia>({
  filename: String,
  contentType: { type: String, required: true },
  size: Number,
  data: { type: Buffer, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Media: Model<IMedia> =
  (models.Media as Model<IMedia>) ?? mongoose.model<IMedia>("Media", MediaSchema);

export default Media;
