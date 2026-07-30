import React from 'react';
import FAQSection from '../components/sections/FAQSection';
import BookingCTASection from '../components/sections/BookingCTASection';

export default function FAQs() {
  return (
    <div className="pt-36 bg-[#080808]">
      <FAQSection />
      <div className="mt-16">
        <BookingCTASection />
      </div>
    </div>
  );
}
