const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    package: {
      type: String,
      default: 'Standard',
    },
    bookingDate: {
      type: String, // YYYY-MM-DD
      required: [true, 'Please select a booking date'],
    },
    timeSlot: {
      type: String, // e.g. "09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"
      required: [true, 'Please select a time slot'],
    },
    propertyType: {
      type: String,
      enum: ['Apartment', 'Villa / Independent House', 'Office / Commercial', 'Studio'],
      default: 'Apartment',
    },
    rooms: {
      type: String, // e.g. "1 BHK", "2 BHK", "3 BHK", "4+ BHK"
      default: '2 BHK',
    },
    address: {
      street: { type: String, required: true },
      area: { type: String, required: true },
      city: { type: String, default: 'Ahmedabad' },
      pincode: { type: String, required: true },
    },
    phone: {
      type: String,
      required: [true, 'Please provide contact phone number'],
    },
    instructions: {
      type: String,
      default: '',
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Booking', bookingSchema);
