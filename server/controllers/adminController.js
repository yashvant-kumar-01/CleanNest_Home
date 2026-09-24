const Booking = require('../models/Booking');
const User = require('../models/User');
const Service = require('../models/Service');
const Contact = require('../models/Contact');
const Review = require('../models/Review');
const Article = require('../models/Article');

// @desc    Get admin dashboard metrics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'customer' });
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'Pending' });
    const completedBookings = await Booking.countDocuments({ status: 'Completed' });
    const totalServices = await Service.countDocuments();
    const totalEnquiries = await Contact.countDocuments();
    const totalReviews = await Review.countDocuments();
    const totalArticles = await Article.countDocuments();

    // Calculate total revenue from non-cancelled bookings
    const revenueAggregation = await Booking.aggregate([
      { $match: { status: { $in: ['Confirmed', 'In Progress', 'Completed'] } } },
      { $group: { _id: null, totalRevenue: { $sum: '$amount' } } },
    ]);

    const totalRevenue = revenueAggregation.length > 0 ? revenueAggregation[0].totalRevenue : 0;

    // Recent 5 bookings
    const recentBookings = await Booking.find()
      .populate('user', 'name email phone')
      .populate('service', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalUsers,
      totalBookings,
      pendingBookings,
      completedBookings,
      totalServices,
      totalEnquiries,
      totalReviews,
      totalArticles,
      totalRevenue,
      recentBookings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all bookings (Admin filterable)
// @route   GET /api/admin/bookings
// @access  Private/Admin
const getAllBookings = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    let query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { bookingId: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    const bookings = await Booking.find(query)
      .populate('user', 'name email phone')
      .populate('service', 'name category price image')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking status (Admin)
// @route   PUT /api/admin/bookings/:id/status
// @access  Private/Admin
const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = status || booking.status;
    await booking.save();

    const updatedBooking = await Booking.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('service', 'name');

    res.json({ message: `Booking status updated to ${booking.status}`, booking: updatedBooking });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users (Admin)
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
  getAllBookings,
  updateBookingStatus,
  getAllUsers,
};
