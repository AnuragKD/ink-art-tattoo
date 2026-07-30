import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: 'Studio Client' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    artist: { type: String, required: true },
    comment: { type: String, required: true },
    verified: { type: Boolean, default: true },
    avatar: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Review', reviewSchema);
