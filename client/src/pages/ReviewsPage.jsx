import React, { useState, useEffect } from 'react';
import TestimonialCard from '../components/TestimonialCard';
import ReviewModal from '../components/ReviewModal';
import LoadingSpinner from '../components/LoadingSpinner';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Star, MessageSquarePlus, ThumbsUp, ShieldCheck } from 'lucide-react';

const ReviewsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRating, setSelectedRating] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchReviewsAndServices();
  }, []);

  const fetchReviewsAndServices = async () => {
    try {
      const [revRes, svcRes] = await Promise.all([
        API.get('/reviews'),
        API.get('/services'),
      ]);
      setReviews(revRes.data);
      setServices(svcRes.data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    if (!user) {
      navigate('/login?redirect=/reviews');
    } else {
      setModalOpen(true);
    }
  };

  const handleReviewSubmitted = (newReview) => {
    setReviews([newReview, ...reviews]);
  };

  const filteredReviews = reviews.filter((r) => {
    if (selectedRating === 'All') return true;
    return r.rating === Number(selectedRating);
  });

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '4.9';

  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-teal-950 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950/80 px-3.5 py-1.5 rounded-full border border-teal-800">
            Verified Customer Feedback
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold">
            What Homeowners in Ahmedabad Say
          </h1>
          <p className="text-slate-300 text-base max-w-xl mx-auto">
            Read authentic reviews from homeowners across Satellite, Bodakdev, SG Highway, and Vastrapur.
          </p>

          <div className="pt-4 flex items-center justify-center space-x-6">
            <div className="bg-slate-800/80 px-5 py-2.5 rounded-2xl border border-slate-700 flex items-center space-x-2">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span className="text-xl font-bold text-white">{averageRating} / 5.0</span>
              <span className="text-xs text-slate-400">({reviews.length} Total Reviews)</span>
            </div>

            <button
              onClick={handleOpenModal}
              className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-6 py-3 rounded-2xl transition-colors shadow-lg flex items-center space-x-2 text-sm"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>
      </section>

      {/* Filter Toolbar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-500 uppercase mr-2">Filter Rating:</span>
            {['All', '5', '4', '3'].map((star) => (
              <button
                key={star}
                onClick={() => setSelectedRating(star)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  selectedRating === star
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {star === 'All' ? 'All Reviews' : `${star} Stars`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <LoadingSpinner size="lg" />
        ) : filteredReviews.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80">
            <p className="text-slate-500">No reviews match your selected filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((rev) => (
              <TestimonialCard key={rev._id} review={rev} />
            ))}
          </div>
        )}
      </section>

      {/* Review Modal */}
      <ReviewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onReviewSubmitted={handleReviewSubmitted}
        services={services}
      />
    </div>
  );
};

export default ReviewsPage;
