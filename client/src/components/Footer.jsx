import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';

const Footer = () => {
  const serviceAreas = [
    'Satellite', 'Bodakdev', 'Vastrapur', 'SG Highway', 'Prahlad Nagar',
    'Thaltej', 'Bopal', 'Navrangpura', 'Maninagar', 'Chandkheda'
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold text-white">CleanNest</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Ahmedabad’s premier home and commercial deep cleaning service provider. Certified professionals, eco-friendly chemicals, and 100% satisfaction guaranteed.
            </p>
            <div className="pt-2 flex items-center space-x-3 text-xs text-teal-400">
              <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-400" /> Verified Cleaners</span>
              <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-emerald-400" /> Eco-Safe Chemicals</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white text-base font-bold mb-4 uppercase tracking-wider text-xs">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-teal-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-teal-400 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-teal-400 transition-colors">All Cleaning Services</Link></li>
              <li><Link to="/pricing" className="hover:text-teal-400 transition-colors">Pricing Packages</Link></li>
              <li><Link to="/booking" className="hover:text-teal-400 transition-colors">Book a Cleaning</Link></li>
              <li><Link to="/reviews" className="hover:text-teal-400 transition-colors">Customer Reviews</Link></li>
              <li><Link to="/blog" className="hover:text-teal-400 transition-colors">Cleaning Articles</Link></li>
              <li><Link to="/contact" className="hover:text-teal-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact & Hours */}
          <div>
            <h3 className="text-white text-base font-bold mb-4 uppercase tracking-wider text-xs">Contact Details</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <span className="text-slate-400">402, Titanium Heights, Opp. Karnavati Club, SG Highway, Ahmedabad, Gujarat 380015</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="text-slate-300 font-medium">+91 98790 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="text-slate-400">contact@cleannest.in</span>
              </li>
              <li className="flex items-start space-x-3 pt-2">
                <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-400">
                  <p className="font-semibold text-slate-300">Working Hours:</p>
                  <p>Mon - Sat: 8:00 AM - 8:00 PM</p>
                  <p>Sunday: 9:00 AM - 5:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Service Areas */}
          <div>
            <h3 className="text-white text-base font-bold mb-4 uppercase tracking-wider text-xs">Serving Ahmedabad Areas</h3>
            <p className="text-xs text-slate-400 mb-3">Our mobile cleaning units operate across:</p>
            <div className="flex flex-wrap gap-1.5">
              {serviceAreas.map((area) => (
                <span
                  key={area}
                  className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-md border border-slate-700 hover:border-teal-500 hover:text-teal-300 transition-colors"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CleanNest Home Services. All rights reserved. Ahmedabad, Gujarat.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-slate-400 transition-colors">Privacy Policy</span>
            <span className="hover:text-slate-400 transition-colors">Terms of Service</span>
            <span className="hover:text-slate-400 transition-colors">Refund Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
