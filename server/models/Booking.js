import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String },
    fullName: { type: String },
    email: { type: String, default: 'N/A' },
    phone: { type: String, required: true },
    artist: { type: String, default: 'Marcus Vance' },
    style: { type: String, default: 'Custom Concept' },
    placement: { type: String, default: 'Custom Body Placement' },
    size: { type: String, default: 'Medium' },
    budget: { type: String, default: 'Custom Quote' },
    preferredDate: { type: Date },
    message: { type: String },
    notes: { type: String },
    referenceUrl: { type: String },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Deposit Paid', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
