import React, { useState } from 'react';
import FAQAccordion from '../components/FAQAccordion';
import { Search, HelpCircle, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const allFaqs = [
    {
      question: 'How do I book a cleaning service with CleanNest?',
      answer: 'You can easily book online by visiting our Booking page! Select your service, pick your property type, select a date and 2-hour time slot, enter your address in Ahmedabad, and confirm. Your booking ID will be generated instantly.',
    },
    {
      question: 'Do I need to provide any cleaning supplies or machinery?',
      answer: 'No, CleanNest is a 100% self-sufficient service! Our team arrives in dedicated service vehicles equipped with industrial vacuums, steam cleaners, microfiber cloths, ladders, and eco-friendly chemicals.',
    },
    {
      question: 'How long does a full home deep cleaning take?',
      answer: 'For a standard 2 to 3 BHK flat in Ahmedabad, deep cleaning takes between 4 to 5 hours with a team of 3 to 4 trained professionals. Large villas or post-construction cleans may take 6 to 7 hours.',
    },
    {
      question: 'Can I cancel or reschedule my booking?',
      answer: 'Yes! You can reschedule or cancel your pending or confirmed booking up to 4 hours prior to the scheduled slot from your Customer Dashboard without any penalty fees.',
    },
    {
      question: 'Which areas in Ahmedabad do you cover?',
      answer: 'We serve all major residential and commercial zones in Ahmedabad, including Satellite, Bodakdev, Vastrapur, SG Highway, Prahlad Nagar, Thaltej, Bopal, Navrangpura, Maninagar, Chandkheda, and Ambawadi.',
    },
    {
      question: 'How are prices calculated?',
      answer: 'Our pricing is transparent and based on standard BHK property sizes and service scope. We provide package tiers (Basic, Standard, Premium) for every service. You pay the exact agreed price after completing your walkthrough inspection.',
    },
    {
      question: 'Are your chemicals safe for pets and children?',
      answer: 'Yes! All chemicals used by CleanNest are non-toxic, eco-certified, PH-balanced formulas. They leave zero harsh chemical residue, making them 100% safe for infants, pets, and senior citizens.',
    },
    {
      question: 'What if I am unhappy with a cleaned area?',
      answer: 'Your satisfaction is guaranteed! If you notice any missed spot during your post-cleaning walkthrough inspection, our team lead will immediately re-clean the area. If you discover a spot within 24 hours, we send a re-cleaner at zero cost.',
    },
  ];

  const filteredFaqs = allFaqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-teal-950 text-white py-14 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950/80 px-3.5 py-1.5 rounded-full border border-teal-800">
            Help Center
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-300 text-base max-w-xl mx-auto">
            Find answers to common questions about booking, pricing, safety protocols, and cleaning methods in Ahmedabad.
          </p>

          {/* Search Input */}
          <div className="max-w-md mx-auto relative pt-2">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-700 bg-slate-800/90 text-white placeholder-slate-400 text-sm focus:ring-2 focus:ring-teal-400 focus:outline-hidden"
            />
          </div>
        </div>
      </section>

      {/* FAQ Accordion List */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <FAQAccordion faqs={filteredFaqs} />

        <div className="bg-slate-900 text-white p-8 rounded-3xl text-center space-y-4 border border-slate-800">
          <HelpCircle className="w-10 h-10 text-teal-400 mx-auto" />
          <h3 className="text-2xl font-bold">Still Have Questions?</h3>
          <p className="text-slate-300 text-sm max-w-md mx-auto">
            Our friendly customer support team in Ahmedabad is available Mon - Sat (8:00 AM - 8:00 PM).
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              Contact Support Team
            </Link>
            <a
              href="tel:+919879012345"
              className="inline-flex items-center space-x-2 text-sm font-bold text-teal-300 hover:text-white"
            >
              <PhoneCall className="w-4 h-4" />
              <span>+91 98790 12345</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
