import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: String },
    bio: { type: String, required: true },
    rate: { type: String, required: true },
    image: { type: String, required: true },
    awards: [{ type: String }],
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Artist', artistSchema);
