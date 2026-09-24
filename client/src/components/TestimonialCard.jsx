import React from 'react';
import { Star, Quote, MapPin } from 'lucide-react';

const TestimonialCard = ({ review }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
      <div className="space-y-3">
        {/* Rating Stars */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-slate-200'
                }`}
              />
            ))}
          </div>
          <Quote className="w-6 h-6 text-teal-200" />
        </div>

        {/* Review Comment */}
        <p className="text-slate-700 text-sm italic leading-relaxed">
          "{review.comment}"
        </p>
      </div>

      {/* Customer Info */}
      <div className="pt-4 border-t border-slate-100 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-600 to-emerald-500 text-white flex items-center justify-center font-bold text-sm">
          {review.user?.name ? review.user.name.charAt(0).toUpperCase() : 'C'}
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900">
            {review.user?.name || 'Happy Customer'}
          </h4>
          <div className="flex items-center text-xs text-slate-400 mt-0.5">
            <MapPin className="w-3 h-3 text-teal-600 mr-1" />
            <span>{review.location || 'Ahmedabad'}</span>
            {review.serviceName && (
              <span className="ml-2 text-teal-700 font-medium">({review.serviceName})</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
