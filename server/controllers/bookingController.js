const Booking = require('../models/Booking');
const Service = require('../models/Service');

// Helper to generate realistic Booking ID
const generateBookingId = () => {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `CN-2026-${randomDigits}`;
};

// @desc    Check time slot availability for a date
// @route   GET /api/bookings/check-availability
// @access  Public
const checkAvailability = async (req, res, next) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ message: 'Please specify a date' });
    }

    const allSlots = ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'];
    
    // Find non-cancelled bookings for this date
    const existingBookings = await Booking.find({
      bookingDate: date,
      status: { $ne: 'Cancelled' },
    });

    const bookedSlots = existingBookings.map((b) => b.timeSlot);
    const availability = allSlots.map((slot) => ({
      timeSlot: slot,
      isAvailable: !bookedSlots.includes(slot),
    }));

    res.json({ date, availability, bookedSlots });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res, next) => {
  try {
    const {
      serviceId,
      package: selectedPackage,
      bookingDate,
      timeSlot,
      propertyType,
      rooms,
      address,
      phone,
      instructions,
      amount,
    } = req.body;

    if (!serviceId || !bookingDate || !timeSlot || !address || !phone || !amount) {
      return res.status(400).json({ message: 'Please provide all required booking details' });
    }

    // Verify service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Selected service not found' });
    }

    // Check slot availability to prevent duplicate bookings
    const slotConflict = await Booking.findOne({
      bookingDate,
      timeSlot,
      status: { $ne: 'Cancelled' },
    });

    if (slotConflict) {
      return res.status(400).json({
        message: `The time slot ${timeSlot} on ${bookingDate} is already booked. Please choose another slot.`,
      });
    }

    const bookingId = generateBookingId();

    const booking = await Booking.create({
      bookingId,
      user: req.user._id,
      service: serviceId,
      package: selectedPackage || 'Standard',
      bookingDate,
      timeSlot,
      propertyType: propertyType || 'Apartment',
      rooms: rooms || '2 BHK',
      address,
      phone,
      instructions: instructions || '',
      amount,
      status: 'Pending',
    });

    const populatedBooking = await Booking.findById(booking._id).populate('service', 'name image duration category');

    res.status(201).json({
      message: 'Booking created successfully',
      booking: populatedBooking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user's bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('service', 'name slug image category duration')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

// @desc    Get booking details by ID
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('service')
      .populate('user', 'name email phone');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Customer can only view their own booking unless admin
    if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this booking' });
    }

    res.json(booking);
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel booking (Customer)
// @route   PUT /api/bookings/:id/cancel
// @access  Private
const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }

    if (booking.status === 'Completed' || booking.status === 'In Progress') {
      return res.status(400).json({ message: 'Cannot cancel a booking that is in progress or completed' });
    }

    booking.status = 'Cancelled';
    await booking.save();

    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkAvailability,
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
};
