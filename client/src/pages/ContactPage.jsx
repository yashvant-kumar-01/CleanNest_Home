import React, { useState } from 'react';
import API from '../services/api';
import ErrorMessage from '../components/ErrorMessage';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Sparkles } from 'lucide-react';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      const { data } = await API.post('/contact', {
        name,
        email,
        phone,
        subject,
        message,
      });

      setSuccessMsg(data.message || 'Enquiry submitted successfully!');
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Header */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-teal-950 text-white py-14 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950/80 px-3.5 py-1.5 rounded-full border border-teal-800">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold">
            Contact CleanNest Home Services
          </h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Have a question about our cleaning packages or need a custom corporate quote in Ahmedabad? Drop us a message below.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Send Us an Enquiry</h3>
            <p className="text-sm text-slate-500 mt-1">
              Our team in Ahmedabad will respond within 2 hours.
            </p>
          </div>

          <ErrorMessage message={error} onClose={() => setError('')} />

          {successMsg && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl flex items-start space-x-3 animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-bold">Success!</p>
                <p>{successMsg}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Patel"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. rahul.patel@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +91 98790 12345"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="e.g. 3 BHK Deep Cleaning Quote"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Message / Query Details
              </label>
              <textarea
                rows="4"
                placeholder="Tell us about your cleaning requirements or property size..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 text-sm"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-xl shadow-md shadow-teal-600/20 disabled:opacity-50 transition-colors flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Submitting...' : 'Submit Enquiry'}</span>
            </button>
          </form>
        </div>

        {/* Right Column: Business Info & Ahmedabad Location Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
            <h3 className="text-xl font-bold border-b border-slate-800 pb-3">Office Info & Location</h3>

            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Ahmedabad Main Office</span>
                  <p className="text-xs text-slate-400 mt-0.5">
                    402, Titanium Heights, Opposite Karnavati Club, SG Highway, Ahmedabad, Gujarat 380015
                  </p>
                </div>
              </li>

              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-teal-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block">Helpline Number</span>
                  <p className="text-xs text-slate-400">+91 98790 12345</p>
                </div>
              </li>

              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-teal-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block">Email Support</span>
                  <p className="text-xs text-slate-400">contact@cleannest.in</p>
                </div>
              </li>

              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Service Operating Hours</span>
                  <p className="text-xs text-slate-400">Monday - Saturday: 8:00 AM - 8:00 PM</p>
                  <p className="text-xs text-slate-400">Sunday: 9:00 AM - 5:00 PM</p>
                </div>
              </li>
            </ul>

            {/* Map Location Preview Container */}
            <div className="rounded-2xl overflow-hidden border border-slate-800 h-44 bg-slate-800 relative flex items-center justify-center p-4 text-center">
              <div className="space-y-2">
                <MapPin className="w-8 h-8 text-teal-400 mx-auto animate-bounce" />
                <p className="text-xs font-bold text-white">Opp. Karnavati Club, SG Highway</p>
                <p className="text-[11px] text-slate-400">Serving Satellite, Bodakdev, Bopal & All Ahmedabad</p>
              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default ContactPage;
