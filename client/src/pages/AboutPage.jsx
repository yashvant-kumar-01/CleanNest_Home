import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Heart, Users, MapPin, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Rajesh Shah',
      role: 'Founder & Operations Lead',
      experience: '12+ Years Industry Experience',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80',
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Quality & Hygiene Standard',
      experience: 'Certified Hygiene Auditor',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80',
    },
    {
      name: 'Amit Patel',
      role: 'Specialized Cleaning Supervisor',
      experience: 'Expert in Sofa & Upholstery Care',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80',
    },
    {
      name: 'Meera Trivedi',
      role: 'Customer Care & Scheduling Lead',
      experience: 'Dedicated Booking Support',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80',
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-teal-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950/80 px-3.5 py-1.5 rounded-full border border-teal-800">
            About CleanNest Home Services
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold">
            Dedicated to a Healthier, Spotless Ahmedabad
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Learn about our journey, our values, and why thousands of families across Satellite, Bodakdev, and SG Highway choose us for their cleaning needs.
          </p>
        </div>
      </section>

      {/* Story & Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Our Story & Legacy
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
            Redefining Home Hygiene Standards in Gujarat Since 2018
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            CleanNest Home Services began with a clear realization: busy urban families in Ahmedabad deserved a professional, reliable cleaning service that brought commercial-grade steam equipment and eco-safe supplies directly to their homes.
          </p>
          <p className="text-slate-600 text-base leading-relaxed">
            What started as a small team servicing Satellite and Vastrapur has grown into a fleet of mobile cleaning units serving over 5,000 residential apartments, luxury villas, and corporate offices across Ahmedabad.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="block text-2xl font-black text-teal-700">100% Eco-Safe</span>
              <span className="text-xs text-slate-500 font-medium">Child & Pet Friendly Chemicals</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="block text-2xl font-black text-emerald-700">3-Stage Vetting</span>
              <span className="text-xs text-slate-500 font-medium">Police Verified Staff</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1000&q=80"
              alt="CleanNest Team Working in Ahmedabad Home"
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="bg-slate-50 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
            <p className="text-slate-600 text-base leading-relaxed">
              To empower homeowners in Ahmedabad with effortless, high-performance cleaning solutions that save time, improve indoor air quality, and protect household investments.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
            <p className="text-slate-600 text-base leading-relaxed">
              To be recognized as Gujarat’s most trusted home services brand by upholding unmatched quality standards, transparent pricing, and employee well-being.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership & Professional Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Meet the Experts
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">
            Our Professional Leadership Team
          </h2>
          <p className="text-slate-600 text-sm">
            Trained specialists driving excellence across operations and customer care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow text-center p-5 space-y-3"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-teal-500/30"
              />
              <div>
                <h4 className="text-base font-bold text-slate-900">{member.name}</h4>
                <p className="text-xs font-semibold text-teal-700">{member.role}</p>
                <p className="text-xs text-slate-500 mt-1">{member.experience}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service Coverage Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold">Ready for a Spotless Clean?</h3>
            <p className="text-slate-300 text-sm">
              Schedule your cleaning service online in less than 60 seconds.
            </p>
          </div>
          <Link
            to="/booking"
            className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-8 py-3.5 rounded-xl transition-colors shrink-0 shadow-lg"
          >
            Book Cleaning Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
