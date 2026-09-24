const Review = require('../models/Review');

// @desc    Get all approved reviews
// @route   GET /api/reviews
// @access  Public
const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ status: 'approved' })
      .populate('user', 'name')
      .populate('service', 'name slug')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a customer review
// @route   POST /api/reviews
// @access  Private
const createReview = async (req, res, next) => {
  try {
    const { rating, comment, serviceId, serviceName, location } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ message: 'Please provide rating and review comment' });
    }

    const review = await Review.create({
      user: req.user._id,
      service: serviceId || null,
      serviceName: serviceName || 'General Home Cleaning',
      location: location || 'Ahmedabad',
      rating: Number(rating),
      comment,
      status: 'approved',
    });

    const populatedReview = await Review.findById(review._id).populate('user', 'name');

    res.status(201).json({
      message: 'Thank you for your review!',
      review: populatedReview,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete review (Admin)
// @route   DELETE /api/reviews/:id
// @access  Private/Admin
const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Update review status (Admin)
// @route   PUT /api/reviews/:id/status
// @access  Private/Admin
const updateReviewStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.status = status || review.status;
    await review.save();

    res.json({ message: `Review status updated to ${review.status}`, review });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getReviews,
  createReview,
  deleteReview,
  updateReviewStatus,
};
