import Booking from '../models/Booking.js';

export const createBooking = async (req, res) => {
  try {
    const data = { ...req.body };
    if (!data.fullName && data.name) {
      data.fullName = data.name;
    }
    if (!data.name && data.fullName) {
      data.name = data.fullName;
    }
    const booking = new Booking(data);
    await booking.save();
    console.log(`✅ New Client Inquiry Saved to MongoDB: ${booking.name || booking.fullName}`);
    return res.status(201).json({
      success: true,
      message: 'Booking consultation submitted successfully',
      data: booking,
    });
  } catch (error) {
    console.error('Booking save error:', error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
    return res.json({ success: true, data: booking });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
