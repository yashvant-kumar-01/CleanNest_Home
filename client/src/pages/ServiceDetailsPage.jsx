import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import FAQAccordion from '../components/FAQAccordion';
import ErrorMessage from '../components/ErrorMessage';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Star,
  Calendar,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Tag,
} from 'lucide-react';

const ServiceDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await API.get(`/services/${slug}`);
        setService(data);
        if (data.packages && data.packages.length > 0) {
          setSelectedPackage(data.packages[0]);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Service not found');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  if (loading) return <LoadingSpinner fullScreen={true} />;
  if (error || !service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <ErrorMessage message={error || 'Service not found'} />
        <Link to="/services" className="inline-flex items-center space-x-2 text-teal-700 font-bold">
          <span>Back to All Services</span>
        </Link>
      </div>
    );
  }

  const handleBookSelectedPackage = () => {
    navigate(`/booking?serviceId=${service._id}&package=${encodeURIComponent(selectedPackage?.name || 'Standard')}`);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Breadcrumb Navigation */}
      <div className="bg-slate-100 border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs font-semibold text-slate-500 flex items-center space-x-2">
          <Link to="/" className="hover:text-teal-700">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/services" className="hover:text-teal-700">Services</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900">{service.name}</span>
        </div>
      </div>

      {/* Main Service Banner & Details Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Image, Description, Checklist & Process */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Header & Badges */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
                {service.category}
              </span>
              <span className="flex items-center text-xs font-bold text-amber-500 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                {service.rating} ({service.totalReviews} customer reviews)
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              {service.name}
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              {service.shortDescription}
            </p>
          </div>

          {/* Service Image Banner */}
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md h-80 sm:h-96 relative">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Full Detailed Description */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Service Overview</h3>
            <p className="text-slate-600 text-base leading-relaxed whitespace-pre-line">
              {service.description}
            </p>
          </div>

          {/* Package Selection Tiers */}
          {service.packages && service.packages.length > 0 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Select Package</span>
                <h3 className="text-2xl font-bold text-slate-900">Choose Your Package Tier</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {service.packages.map((pkg, idx) => {
                  const isSelected = selectedPackage?.name === pkg.name;
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`cursor-pointer rounded-2xl p-5 border-2 transition-all space-y-3 flex flex-col justify-between ${
                        isSelected
                          ? 'border-teal-600 bg-teal-50/50 shadow-md ring-2 ring-teal-500/20'
                          : 'border-slate-200 bg-slate-50 hover:bg-white'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 text-base">{pkg.name}</span>
                          {isSelected && (
                            <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                          )}
                        </div>
                        <span className="text-2xl font-extrabold text-slate-900 block">
                          ₹{pkg.price?.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center">
                          <Clock className="w-3.5 h-3.5 text-teal-600 mr-1" />
                          {pkg.duration}
                        </span>
                      </div>

                      <ul className="space-y-1.5 pt-2 border-t border-slate-200 text-xs text-slate-600">
                        {pkg.features?.map((feat, fidx) => (
                          <li key={fidx} className="flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-2 shrink-0"></span>
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Included vs Excluded Checklists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Included Items */}
            <div className="bg-emerald-50/60 p-6 rounded-3xl border border-emerald-200/80 space-y-4">
              <h4 className="text-lg font-bold text-emerald-900 flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>What's Included</span>
              </h4>
              <ul className="space-y-2.5 text-sm text-emerald-950">
                {service.includedItems?.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Excluded Items */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 space-y-4">
              <h4 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
                <XCircle className="w-5 h-5 text-slate-400" />
                <span>What's Not Included</span>
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-600">
                {service.excludedItems?.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-slate-400 font-bold shrink-0">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Step-by-Step Process */}
          {service.processSteps && service.processSteps.length > 0 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
              <h3 className="text-2xl font-bold text-slate-900">How We Execute This Service</h3>
              <div className="space-y-4">
                {service.processSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start space-x-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="w-9 h-9 rounded-xl bg-teal-600 text-white font-bold flex items-center justify-center text-sm shrink-0">
                      {step.stepNumber || idx + 1}
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{step.title}</h4>
                      <p className="text-slate-600 text-sm mt-1">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Service FAQs */}
          {service.faqs && service.faqs.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h3>
              <FAQAccordion faqs={service.faqs} />
            </div>
          )}

        </div>

        {/* Right Column: Sticky Booking Widget Box */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
            <div className="space-y-2 border-b border-slate-800 pb-4">
              <span className="text-xs text-teal-400 font-bold uppercase tracking-wider">Book Online</span>
              <h3 className="text-2xl font-bold">{service.name}</h3>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-extrabold text-white">
                  ₹{(selectedPackage ? selectedPackage.price : service.price)?.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-400">Starting Price</span>
              </div>
            </div>

            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Selected Package:</span>
                <span className="font-bold text-teal-300">{selectedPackage?.name || 'Standard'}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Estimated Duration:</span>
                <span className="font-semibold text-white">{selectedPackage?.duration || service.duration}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Location:</span>
                <span className="font-semibold text-white">Ahmedabad, Gujarat</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={handleBookSelectedPackage}
                className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-slate-950 font-extrabold py-4 px-6 rounded-xl transition-all shadow-lg shadow-teal-500/20 text-base flex items-center justify-center space-x-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Book This Service Now</span>
              </button>
              <p className="text-center text-xs text-slate-400">
                No upfront cancellation fee. Pay after inspection.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Background Verified Professionals</span>
              </div>
              <div className="flex items-center space-x-2">
                <Tag className="w-4 h-4 text-teal-400 shrink-0" />
                <span>100% Price Transparency</span>
              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default ServiceDetailsPage;
