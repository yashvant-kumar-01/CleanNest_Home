const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getAllBookings,
  updateBookingStatus,
  getAllUsers,
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

router.use(protect, admin);

router.get('/stats', getDashboardStats);
router.get('/bookings', getAllBookings);
router.put('/bookings/:id/status', updateBookingStatus);
router.get('/users', getAllUsers);

module.exports = router;
