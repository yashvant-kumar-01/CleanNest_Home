import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, ShieldCheck, Star, MapPin, Award, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-900/95 via-slate-900 to-slate-900 text-white py-16 lg:py-24">
      {/* Background Decorative Lighting */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-teal-800/60 backdrop-blur-xs border border-teal-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-teal-300">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              <span>Top Rated Home Cleaning Company in Ahmedabad</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Professional Cleaning Services for a{' '}
              <span className="bg-gradient-to-r from-teal-400 via-emerald-300 to-teal-200 bg-clip-text text-transparent">
                Cleaner, Healthier
              </span>{' '}
              Home.
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Experience spot-free, sanitized living with CleanNest. From full home deep cleaning to sofa shampooing and kitchen degreasing, our trained professionals serve Satellite, Bodakdev, SG Highway, and all of Ahmedabad.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <Link
                to="/booking"
                className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-slate-950 font-bold px-7 py-4 rounded-xl text-base shadow-xl shadow-teal-500/20 hover:scale-[1.02] transition-all active:scale-[0.98]"
              >
                <Calendar className="w-5 h-5" />
                <span>Book a Cleaning</span>
              </Link>

              <Link
                to="/pricing"
                className="inline-flex items-center justify-center space-x-2 bg-slate-800/90 hover:bg-slate-800 text-white font-semibold px-6 py-4 rounded-xl text-base border border-slate-700 hover:border-slate-600 transition-all"
              >
                <span>View Pricing & Packages</span>
                <ArrowRight className="w-4 h-4 text-teal-400" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-300">
                  <Star className="w-5 h-5 fill-teal-400 text-teal-400" />
                </div>
                <div>
                  <span className="block text-lg font-bold text-white">4.9 / 5.0</span>
                  <span className="text-xs text-slate-400">Customer Rating</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-300">
                  <Award className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <span className="block text-lg font-bold text-white">5,000+</span>
                  <span className="text-xs text-slate-400">Homes Cleaned</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-300">
                  <ShieldCheck className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <span className="block text-lg font-bold text-white">100%</span>
                  <span className="text-xs text-slate-400">Eco-Safe Supplies</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-500 to-emerald-500 rounded-3xl transform rotate-2 scale-102 opacity-30 blur-lg"></div>
              
              <div className="relative bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80"
                  alt="CleanNest Home Cleaning Professional in Ahmedabad"
                  className="w-full h-[400px] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                
                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-slate-950 font-black text-lg">
                      ✓
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-semibold uppercase">Instant Online Booking</p>
                      <p className="text-sm font-bold text-white">Select Slot in 60 Seconds</p>
                    </div>
                  </div>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 font-bold px-2.5 py-1 rounded-lg border border-emerald-500/30">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
