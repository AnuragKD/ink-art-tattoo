import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TATTOO_STYLES } from '../constants/studioData';
import StyleCard from '../components/cards/StyleCard';
import BookingCTASection from '../components/sections/BookingCTASection';

export default function TattooStyles() {
  const [stylesList, setStylesList] = useState(TATTOO_STYLES);

  useEffect(() => {
    fetchStyles();
  }, []);

  const fetchStyles = async () => {
    try {
      const res = await axios.get('/api/styles');
      if (res.data && res.data.data && res.data.data.length > 0) {
        setStylesList(res.data.data);
      }
    } catch (err) {
      console.warn('Using default styles:', err);
    }
  };

  return (
    <div className="pt-36 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 space-y-20">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <span className="text-xs uppercase font-subheading tracking-[0.25em] text-[#B8976A] font-medium block">
            Technical Disciplines
          </span>
          <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl text-[#EAEAEA] tracking-tight leading-tight">
            Tattoo <span className="text-gradient-gold italic font-light">Styles</span>
          </h1>
          <p className="text-base sm:text-lg font-body text-[#7A7A85] leading-relaxed font-light">
            Detailed breakdown of our core artistic specializations. Choose your style, review placement advice, and consult with us.
          </p>
        </div>

        {/* Styles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {stylesList.map((style) => (
            <StyleCard key={style._id || style.id} style={style} />
          ))}
        </div>
      </div>

      <div className="mt-20">
        <BookingCTASection />
      </div>
    </div>
  );
}
