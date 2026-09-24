import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Calendar, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';

const PricingPage = () => {
  const pricingPackages = [
    {
      name: 'Basic Essential Clean',
      target: 'Ideal for 1 BHK / Studio Flats',
      price: '2,499',
      duration: '3 - 4 Hours',
      popular: false,
      features: [
        '1 Bedroom & Living Room Deep Vacuuming',
        'Basic Kitchen Counter & Appliance Wipe',
        '1 Bathroom Descaling & Disinfection',
        'Balcony Sweep & Wash',
        'Standard Eco Chemicals',
        '2 Trained Cleaners',
      ],
    },
    {
      name: 'Standard Home Deep Clean',
      target: 'Ideal for 2 - 3 BHK Apartments',
      price: '3,499',
      duration: '4 - 5 Hours',
      popular: true,
      features: [
        'Full 2 or 3 Bedrooms & Hall Deep Scrubbing',
        'Kitchen Degreasing & Chimney Exterior',
        '2 Bathrooms Scale Softening & Polishing',
        'Window Glass & Frame Dusting',
        'Ceiling Fan & Light Fixture Cleaning',
        'Floor Machine Polish',
        '3 - 4 Trained Cleaners',
      ],
    },
    {
      name: 'Premium Villa & Duplex',
      target: 'Ideal for 4+ BHK Villas & Bungalows',
      price: '5,499',
      duration: '6 - 7 Hours',
      popular: false,
      features: [
        'Entire Large Villa / Duplex Sanctuary Scrub',
        'Deep Kitchen Degreasing & Appliance Interiors',
        '3+ Bathrooms Steam Sanitization',
        'Balcony, Porch & Terrace Wash',
        'Steam Sanitization for Mattress/Sofa',
        'Dedicated Quality Supervisor',
        '4 - 5 Certified Cleaners',
      ],
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-teal-950 text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950/80 px-3.5 py-1.5 rounded-full border border-teal-800">
            Transparent Pricing Structure
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold">
            Simple, Upfront Pricing for Ahmedabad
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            No hidden fees or unexpected charges. Choose a package suited for your property layout.
          </p>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPackages.map((pkg, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 transition-all flex flex-col justify-between space-y-6 relative ${
                pkg.popular
                  ? 'bg-slate-900 text-white shadow-2xl border-2 border-teal-500 scale-102'
                  : 'bg-white text-slate-800 border border-slate-200 shadow-xs hover:shadow-lg'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-950 text-xs font-black uppercase px-4 py-1 rounded-full shadow-md">
                  Most Popular Choice
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className={`text-xl font-bold ${pkg.popular ? 'text-white' : 'text-slate-900'}`}>
                    {pkg.name}
                  </h3>
                  <p className={`text-xs mt-1 ${pkg.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                    {pkg.target}
                  </p>
                </div>

                <div className="flex items-baseline space-x-1">
                  <span className="text-4xl font-black">₹{pkg.price}</span>
                  <span className={`text-xs ${pkg.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                    / service
                  </span>
                </div>

                <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-lg ${
                  pkg.popular ? 'bg-slate-800 text-teal-300' : 'bg-slate-100 text-slate-600'
                }`}>
                  Duration: {pkg.duration}
                </span>

                <ul className="space-y-3 pt-4 border-t border-slate-200/20 text-sm">
                  {pkg.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-start space-x-3">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${pkg.popular ? 'text-teal-400' : 'text-teal-600'}`} />
                      <span className={pkg.popular ? 'text-slate-300' : 'text-slate-600'}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to={`/booking?package=${encodeURIComponent(pkg.name)}`}
                className={`block w-full text-center py-3.5 px-6 rounded-xl font-bold text-sm transition-all shadow-md ${
                  pkg.popular
                    ? 'bg-teal-500 hover:bg-teal-400 text-slate-950'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                Book This Package
              </Link>
            </div>
          ))}
        </div>

        {/* Pricing Disclaimer Note */}
        <div className="mt-12 bg-amber-50 border border-amber-200 rounded-2xl p-6 flex items-start space-x-4">
          <HelpCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-sm text-amber-900">
            <h4 className="font-bold text-base">Important Pricing Note</h4>
            <p className="leading-relaxed">
              * The prices listed above are estimated base rates for standard property dimensions in Ahmedabad. Actual prices may vary slightly based on heavy post-renovation debris, extreme hard-water buildup, or custom square footage requirements. Our team will verify all details before starting.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
