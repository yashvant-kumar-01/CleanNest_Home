const express = require('express');
const router = express.Router();
const {
  createContactEnquiry,
  getEnquiries,
  updateEnquiryStatus,
} = require('../controllers/contactController');
const { protect, admin } = require('../middleware/auth');

router.post('/', createContactEnquiry);
router.get('/admin', protect, admin, getEnquiries);
router.put('/admin/:id/status', protect, admin, updateEnquiryStatus);

module.exports = router;
