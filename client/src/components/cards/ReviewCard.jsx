import React from 'react';
import { FiStar, FiCheckCircle } from 'react-icons/fi';

export default function ReviewCard({ review }) {
  return (
    <div className="bg-[#111113] border border-white/[0.06] rounded-xl p-8 sm:p-10 flex flex-col justify-between h-full hover:border-[#B8976A]/15 transition-all duration-500">
      <div className="space-y-6">
        {/* Rating Stars */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-[#B8976A]">
            {[...Array(review.rating)].map((_, i) => (
              <FiStar key={i} className="w-4.5 h-4.5 fill-current" />
            ))}
          </div>

          {review.verified && (
            <div className="flex items-center gap-1.5 text-[11px] font-subheading text-[#34D399] bg-[#34D399]/8 px-3 py-1 rounded-full border border-[#34D399]/15">
              <FiCheckCircle className="w-3 h-3" />
              Verified
            </div>
          )}
        </div>

        {/* Quote */}
        <p className="text-[15px] font-body text-[#7A7A85] leading-relaxed">
          "{review.comment}"
        </p>
      </div>

      {/* Author */}
      <div className="pt-8 border-t border-white/[0.06] flex items-center gap-4 mt-6">
        <img
          src={review.avatar}
          alt={review.name}
          className="w-12 h-12 rounded-full object-cover border border-white/[0.06]"
        />
        <div>
          <h4 className="font-heading text-lg tracking-tight text-[#EAEAEA]">
            {review.name}
          </h4>
          <p className="text-sm font-body text-[#7A7A85]">
            {review.role} · <span className="text-[#B8976A]">{review.artist}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
