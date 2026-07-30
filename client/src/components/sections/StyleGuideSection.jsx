import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import axios from 'axios';
import { TATTOO_STYLES } from '../../constants/studioData';
import StyleCard from '../cards/StyleCard';

export default function StyleGuideSection() {
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
    <section className="section-padding bg-[#080808] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-xs uppercase font-subheading tracking-[0.25em] text-[#B8976A] font-medium block">
            Artistic Disciplines
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[#EAEAEA] tracking-tight">
            Explore Our <span className="text-gradient-gold italic font-light">Styles</span>
          </h2>
          <p className="text-base font-body text-[#7A7A85] leading-relaxed font-light">
            From single-needle micro-realism to multi-session Irezumi suites. Every discipline crafted to perfection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {stylesList.slice(0, 4).map((style) => (
            <StyleCard key={style._id || style.id} style={style} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/styles"
            className="inline-flex items-center gap-2.5 font-subheading text-xs uppercase tracking-wider bg-white/[0.03] text-[#EAEAEA] px-9 py-4 rounded-full border border-white/[0.06] hover:border-[#B8976A]/30 hover:text-[#B8976A] transition-all duration-500"
            data-cursor="Styles"
          >
            <span>Explore All Tattoo Styles</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
