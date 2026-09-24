import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import ServiceCard from '../components/ServiceCard';
import TestimonialCard from '../components/TestimonialCard';
import FAQAccordion from '../components/FAQAccordion';
import LoadingSpinner from '../components/LoadingSpinner';
import API from '../services/api';
import {
  ShieldCheck,
  Award,
  Sparkles,
  Clock,
  CheckCircle2,
  Calendar,
  ThumbsUp,
  MapPin,
  ArrowRight,
  PhoneCall,
  Zap,
} from 'lucide-react';

const HomePage = () => {
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, reviewsRes] = await Promise.all([
          API.get('/services'),
          API.get('/reviews'),
        ]);
        setServices(servicesRes.data.slice(0, 6)); // Top 6 popular
        setReviews(reviewsRes.data.slice(0, 3)); // Top 3 reviews
      } catch (err) {
        console.error('Error fetching home page data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const whyChooseUs = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-teal-600" />,
      title: 'Background Verified Staff',
      desc: 'All our cleaning technicians undergo rigorous background checks and mandatory hygiene training.',
    },
    {
      icon: <Sparkles className="w-8 h-8 text-emerald-600" />,
      title: '100% Eco-Safe Chemicals',
      desc: 'Non-toxic, biodegradable cleaning formulas safe for toddlers, elderly family members, and house pets.',
    },
    {
      icon: <Clock className="w-8 h-8 text-teal-600" />,
      title: 'On-Time Service Guarantee',
      desc: 'Punctual arrival at your doorstep across Satellite, Bodakdev, SG Highway, and all Ahmedabad zones.',
    },
    {
      icon: <Award className="w-8 h-8 text-emerald-600" />,
      title: '100% Satisfaction or Re-Clean',
      desc: 'If you find any area missed, our team will re-clean the spot within 24 hours at zero extra charge.',
    },
  ];

  const howItWorks = [
    { step: '01', title: 'Choose Your Service', desc: 'Select from home deep clean, sofa, kitchen, or bathroom sanitization.' },
    { step: '02', title: 'Pick Date & Slot', desc: 'Choose a convenient 2-hour slot that fits your busy schedule.' },
    { step: '03', title: 'Experts At Your Doorstep', desc: 'Our team arrives equipped with vacuum, steam cleaners, and chemicals.' },
    { step: '04', title: 'Inspect & Pay', desc: 'Walk through your sparkling home and pay digitally or in cash after complete satisfaction.' },
  ];

  const homeFaqs = [
    {
      question: 'How do I book a cleaning service with CleanNest?',
      answer: 'Booking takes less than 60 seconds! Select your desired service, choose your date and time slot, provide your address in Ahmedabad, and confirm. You will receive an instant Booking ID.',
    },
    {
      question: 'Do I need to provide any cleaning supplies or equipment?',
      answer: 'Not at all! CleanNest brings industrial vacuum cleaners, single-disc scrubbing machines, microfiber towels, and eco-friendly chemicals.',
    },
    {
      question: 'How long does a full home deep cleaning take?',
      answer: 'A standard 2 to 3 BHK home deep cleaning takes approximately 4 to 5 hours with a dedicated team of 3 to 4 trained professionals.',
    },
    {
      question: 'Which areas in Ahmedabad do you serve?',
      answer: 'We cover all areas including Satellite, Bodakdev, Vastrapur, SG Highway, Prahlad Nagar, Thaltej, Bopal, Navrangpura, Maninagar, Chandkheda, and nearby localities.',
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner Component */}
      <HeroSection />

      {/* Section 1: Business Introduction & Quick Metric Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Welcome to CleanNest Home Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              Ahmedabad’s Most Trusted Professional Cleaning Partner
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Founded in Ahmedabad, CleanNest Home Services was built with a simple mission: to deliver commercial-grade cleanliness to homes and corporate offices across Gujarat. Whether you need an urgent post-renovation deep clean or regular sofa shampooing, our team combines modern equipment with meticulous detail.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/about"
                className="inline-flex items-center text-sm font-bold text-teal-700 hover:text-teal-800 space-x-1"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-center">
              <span className="text-3xl font-extrabold text-slate-900 block">5,000+</span>
              <span className="text-xs text-slate-500 font-medium">Satisfied Homes</span>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-center">
              <span className="text-3xl font-extrabold text-teal-600 block">4.9★</span>
              <span className="text-xs text-slate-500 font-medium">Average Rating</span>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-center">
              <span className="text-3xl font-extrabold text-emerald-600 block">30+</span>
              <span className="text-xs text-slate-500 font-medium">Expert Cleaners</span>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-center">
              <span className="text-3xl font-extrabold text-slate-900 block">100%</span>
              <span className="text-xs text-slate-500 font-medium">Sanitized Finish</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Popular Cleaning Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 space-y-4 md:space-y-0">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Our Expert Offerings
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              Popular Cleaning Services in Ahmedabad
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Select a specialized cleaning service tailored to your home or office needs.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors self-start md:self-auto"
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner size="lg" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </section>

      {/* Section 3: Why Choose CleanNest */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950/80 px-3.5 py-1.5 rounded-full border border-teal-800">
              The CleanNest Difference
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              Why Homeowners Trust Us Across Gujarat
            </h2>
            <p className="text-slate-400 text-sm">
              We combine hospitality-level thoroughness with non-toxic safety protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 hover:border-teal-500/50 transition-all space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-700">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200">
            Hassle-Free Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            How Your Cleaning Gets Done in 4 Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {howItWorks.map((hw, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs relative flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <span className="text-3xl font-black text-teal-600 bg-teal-50 w-12 h-12 rounded-xl flex items-center justify-center">
                  {hw.step}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{hw.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{hw.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Customer Reviews Preview */}
      <section className="bg-teal-900/5 py-16 border-y border-teal-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100 px-3 py-1 rounded-full">
                Real Customer Feedback
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                Loved by Homeowners in Ahmedabad
              </h2>
            </div>
            <Link
              to="/reviews"
              className="inline-flex items-center space-x-2 text-sm font-bold text-teal-700 hover:text-teal-800"
            >
              <span>Read All Customer Reviews</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <TestimonialCard key={rev._id} review={rev} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: FAQs & Quick Contact CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Got Questions?
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              Frequently Asked Questions
            </h2>
          </div>
          <FAQAccordion faqs={homeFaqs} />
          <div className="pt-2">
            <Link to="/faq" className="text-sm font-bold text-teal-700 hover:text-teal-800 inline-flex items-center space-x-1">
              <span>View Full FAQ Directory</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Quick Quote Banner Box */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-teal-950 text-white p-8 rounded-3xl shadow-xl border border-slate-800 space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/20 flex items-center justify-center text-teal-400">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold">Need a Customized Cleaning Quote?</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Have a large villa, commercial office space, or post-construction property in Ahmedabad? Get a custom quote tailored to your dimensions.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-3 text-sm text-slate-200">
              <PhoneCall className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Call Helpline: +91 98790 12345</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-slate-200">
              <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Coverage: All Ahmedabad Localities</span>
            </div>
          </div>

          <div className="pt-4">
            <Link
              to="/contact"
              className="block w-full text-center bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-3.5 px-6 rounded-xl transition-colors shadow-md"
            >
              Request Quick Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
