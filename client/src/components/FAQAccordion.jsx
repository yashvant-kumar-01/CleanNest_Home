import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQAccordion = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`border rounded-2xl transition-all overflow-hidden ${
              isOpen
                ? 'border-teal-500 bg-white shadow-md'
                : 'border-slate-200 bg-slate-50/70 hover:bg-white'
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full p-5 text-left flex items-center justify-between focus:outline-hidden font-bold text-slate-900 text-base"
            >
              <div className="flex items-center space-x-3 pr-4">
                <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? 'text-teal-600' : 'text-slate-400'}`} />
                <span>{faq.question}</span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-slate-500 transition-transform duration-300 shrink-0 ${
                  isOpen ? 'rotate-180 text-teal-600' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3 animate-fade-in">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FAQAccordion;
