import mongoose from 'mongoose';

const styleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String, required: true },
    recommendedPlacement: { type: String },
    recommendedSize: { type: String },
    averageDuration: { type: String },
    suitableArtist: { type: String },
    image: { type: String, required: true },
    painLevel: { type: String },
    careComplexity: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Style', styleSchema);
