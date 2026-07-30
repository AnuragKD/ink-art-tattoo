import mongoose from 'mongoose';

const instagramFeedSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    permalink: { type: String, default: "https://www.instagram.com/ink_art_tattoostudio/?hl=en" },
    likes: { type: String, default: "1.8k" },
    comments: { type: String, default: "95" },
    caption: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('InstagramFeed', instagramFeedSchema);
