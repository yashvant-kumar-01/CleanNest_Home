const express = require('express');
const router = express.Router();
const {
  getReviews,
  createReview,
  deleteReview,
  updateReviewStatus,
} = require('../controllers/reviewController');
const { protect, admin } = require('../middleware/auth');

router.get('/', getReviews);
router.post('/', protect, createReview);
router.delete('/:id', protect, admin, deleteReview);
router.put('/:id/status', protect, admin, updateReviewStatus);

module.exports = router;
