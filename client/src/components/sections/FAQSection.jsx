import React, { useState } from 'react';
import { FAQS } from '../../constants/studioData';
import { FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 space-y-32">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-10">
        
        <div className="text-center mb-20 space-y-6">
          <span className="text-xs uppercase font-subheading tracking-[0.25em] text-[#B8976A] font-medium block">
            Common Questions
          </span>
          <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl text-[#EAEAEA] tracking-tight leading-tight">
            Frequently Asked <span className="text-gradient-gold italic font-light">Questions</span>
          </h1>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`bg-[#111113] border rounded-xl transition-all duration-500 overflow-hidden ${
                  isOpen ? 'border-[#B8976A]/20 shadow-lg shadow-black/20' : 'border-white/[0.06]'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-6 sm:p-8 text-left flex items-center justify-between gap-6 focus:outline-none"
                  data-cursor="Toggle"
                >
                  <span className="font-subheading text-base font-medium text-[#EAEAEA]">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-white/[0.03] flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#B8976A]' : 'text-[#7A7A85]'}`}>
                    <FiChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-8 sm:px-8 sm:pb-8 text-sm font-body text-[#7A7A85] leading-relaxed border-t border-white/[0.04] pt-6 font-light">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
