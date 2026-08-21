import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

export default function StyleCard({ style }) {
  return (
    <div className="group relative bg-[#111113] border border-white/[0.06] rounded-xl overflow-hidden hover:border-[#B8976A]/20 transition-all duration-700 flex flex-col h-full hover:shadow-xl hover:shadow-black/20 ">
      {/* Cover Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#18181B] rounded-t-xl -mb-6 sm:-mb-7">
        <img
          src={style.image}
          alt={style.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-[#111113]/20 to-transparent opacity-100" />
        
        <div className="absolute bottom-5 left-6 right-6">
          {/* <span className="text-[11px] uppercase font-subheading tracking-widest text-[#B8976A] font-medium block mb-1.5">
            Signature Style
          </span> */}
          <h3 className="font-heading text-2xl sm:text-3xl tracking-tight text-[#EAEAEA] group-hover:text-[#D4B88A] transition-colors duration-500">
            {style.title}
          </h3>
        </div>
      </div>

      {/* Style Info */}
      <div className="p-6 sm:p-7 space-y-6 flex-1 flex flex-col justify-between z-2">
        <p className="text-sm font-body text-[#7A7A85] leading-relaxed mb-4">
          {style.description}
        </p>

        {/* CTA */}
        <div className="pt-4 border-t border-white/[0.06]">
          <Link
            to={`/contact?style=${style.id}`}
            className="w-fit inline-flex gap-2 items-center justify-between font-subheading text-sm tracking-wide bg-white/[0.03] text-[#EAEAEA] px-5 py-2 rounded-xl border border-white/[0.06] group-hover:border-[#B8976A]/30 group-hover:bg-[#B8976A] group-hover:text-[#080808] transition-all duration-500"
            data-cursor="Select"
          >
            <span>Enquire This Style</span>
            <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}
