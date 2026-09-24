import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Clock, ArrowRight, CheckCircle } from 'lucide-react';

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const handleBookNow = (e) => {
    e.stopPropagation();
    navigate(`/booking?serviceId=${service._id}`);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
      {/* Service Image & Badge */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-700">
          {service.category}
        </div>
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-slate-800 text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm flex items-center space-x-1">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{service.rating || '4.8'}</span>
          <span className="text-slate-400 font-normal">({service.totalReviews || '12'})</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1">
            {service.name}
          </h3>
          <p className="text-slate-600 text-sm mt-1.5 line-clamp-2 leading-relaxed">
            {service.shortDescription}
          </p>

          <div className="flex items-center space-x-4 mt-3 text-xs text-slate-500">
            <span className="flex items-center">
              <Clock className="w-3.5 h-3.5 text-teal-600 mr-1" />
              {service.duration}
            </span>
            <span className="flex items-center text-teal-700 font-semibold">
              <CheckCircle className="w-3.5 h-3.5 mr-1 text-teal-600" />
              Verified Team
            </span>
          </div>
        </div>

        {/* Price & Action CTA Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">Starting At</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-xl font-extrabold text-slate-900">₹{service.price?.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Link
              to={`/services/${service.slug}`}
              className="p-2 text-slate-600 hover:text-teal-700 hover:bg-teal-50 rounded-xl transition-colors"
              title="View Details"
            >
              <ArrowRight className="w-5 h-5" />
            </Link>

            <button
              onClick={handleBookNow}
              className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl shadow-xs transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
