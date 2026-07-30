import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    artist: { type: String, required: true },
    placement: { type: String },
    hours: { type: String },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Gallery', gallerySchema);
