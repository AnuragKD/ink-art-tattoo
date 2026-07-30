import mongoose from 'mongoose';

const studioSettingsSchema = new mongoose.Schema(
  {
    introSectionImage: {
      type: String,
      default: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=1000&q=80"
    },
    studioEthosImage: {
      type: String,
      default: "https://images.unsplash.com/photo-1598371839696-5c5bb00bd472?auto=format&fit=crop&w=1200&q=80"
    },
    contactBannerImage: {
      type: String,
      default: "https://images.unsplash.com/photo-1598371839696-5c5bb00bd472?auto=format&fit=crop&w=800&q=80"
    },
    ctaBannerImage: {
      type: String,
      default: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?auto=format&fit=crop&w=1600&q=80"
    },
    noticeText: {
      type: String,
      default: "By Appointment & Direct WhatsApp Consultations Only"
    }
  },
  { timestamps: true }
);

export default mongoose.model('StudioSettings', studioSettingsSchema);
