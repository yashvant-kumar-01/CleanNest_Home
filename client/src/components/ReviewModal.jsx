import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import API from '../services/api';
import ErrorMessage from './ErrorMessage';

const ReviewModal = ({ isOpen, onClose, onReviewSubmitted, services }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [location, setLocation] = useState('Satellite, Ahmedabad');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError('Please write your review comment');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const selectedService = services?.find((s) => s._id === serviceId);
      const serviceName = selectedService ? selectedService.name : 'General Home Cleaning';

      const { data } = await API.post('/reviews', {
        rating,
        comment,
        serviceId: serviceId || null,
        serviceName,
        location,
      });

      if (onReviewSubmitted) {
        onReviewSubmitted(data.review);
      }
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-2 rounded-xl transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-2xl font-bold text-slate-900 mb-1">Write a Review</h3>
        <p className="text-sm text-slate-500 mb-6">
          Share your experience with CleanNest Home Services in Ahmedabad.
        </p>

        <ErrorMessage message={error} onClose={() => setError('')} />

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating Stars Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Overall Rating
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 text-2xl focus:outline-hidden hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 font-bold text-slate-700 text-sm">{rating} / 5 Stars</span>
            </div>
          </div>

          {/* Service Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Service Cleaning Category (Optional)
            </label>
            <select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
            >
              <option value="">General Home Cleaning</option>
              {services?.map((svc) => (
                <option key={svc._id} value={svc._id}>
                  {svc.name}
                </option>
              ))}
            </select>
          </div>

          {/* Location Area */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Your Area in Ahmedabad
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Satellite, Bodakdev, SG Highway"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
            />
          </div>

          {/* Comment Text Area */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Your Review & Experience
            </label>
            <textarea
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us what you loved about our cleaning service..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
              required
            ></textarea>
          </div>

          <div className="pt-3 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold shadow-md shadow-teal-600/20 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
