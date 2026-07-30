import React from 'react';
import { REVIEWS } from '../../constants/studioData';
import ReviewCard from '../cards/ReviewCard';
import { FiStar } from 'react-icons/fi';

export default function ReviewsSection() {
  return (
    <section className="section-padding bg-[#080808] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-[#B8976A] font-subheading text-xs font-medium tracking-wide">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="w-4 h-4 fill-current text-[#B8976A]" />
                ))}
              </div>
              <span>4.98 / 5.0 — Verified Reviews</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[#EAEAEA] tracking-tight">
              Client <span className="text-gradient-gold italic font-light">Stories</span>
            </h2>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {REVIEWS.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
