import React from 'react';
import { Link } from 'react-router-dom';
import { FiAward, FiArrowUpRight } from 'react-icons/fi';

export default function ArtistCard({ artist }) {
  return (
    <div className="group relative bg-[#111113] border border-white/[0.06] rounded-xl overflow-hidden transition-all duration-700 hover:border-[#B8976A]/20 flex flex-col h-full hover:shadow-xl hover:shadow-black/20">
      {/* Artist Portrait */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#18181B] rounded-t-xl">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-[#111113]/20 to-transparent opacity-90" />
        
        {/* Availability Badge */}
        {artist.available && (
          <div className="absolute top-4 left-4 glass-badge px-3 py-1 rounded-full flex items-center gap-1.5 text-[11px] font-subheading text-[#B8976A] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8976A] animate-pulse" />
            Accepting Bookings
          </div>
        )}

        {/* Rate Tag */}
        <div className="absolute top-4 right-4 bg-[#080808]/80 backdrop-blur-md border border-white/[0.06] px-3 py-1 rounded-full text-xs font-subheading text-[#D4B88A]">
          {artist.rate}
        </div>

        {/* Name overlay at bottom */}
        <div className="absolute bottom-5 left-6 right-6">
          <span className="text-[11px] font-subheading uppercase tracking-widest text-[#B8976A] font-medium block mb-1">
            {artist.role}
          </span>
          <h3 className="font-heading text-3xl tracking-tight text-[#EAEAEA] group-hover:text-[#D4B88A] transition-colors duration-500">
            {artist.name}
          </h3>
        </div>
      </div>

      {/* Card Info */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-2.5">
          <p className="text-xs font-subheading text-[#B8976A] font-medium tracking-wide">
            {artist.specialization}
          </p>
          <p className="text-sm font-body text-[#7A7A85] line-clamp-2 leading-relaxed">
            {artist.bio}
          </p>
        </div>

        {/* Top Award */}
        {artist.awards && artist.awards.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-[#D4B88A] font-subheading border-t border-white/[0.06] pt-4">
            <FiAward className="w-4 h-4 shrink-0 text-[#B8976A]" />
            <span className="truncate">{artist.awards[0]}</span>
          </div>
        )}

        {/* Actions */}
        <div className="pt-2 flex items-center gap-3">
          <Link
            to={`/about`}
            className="flex-1 inline-flex items-center justify-center gap-2 font-subheading text-xs tracking-wide bg-white/[0.03] text-[#EAEAEA] border border-white/[0.06] py-3 rounded-full hover:border-[#B8976A]/30 hover:text-[#B8976A] transition-all duration-300"
            data-cursor="Profile"
          >
            <span>View Profile</span>
            <FiArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href={`https://wa.me/?text=Hi%20${artist.name},%20I%20would%20like%20to%20book%20a%20session`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center font-subheading text-xs tracking-wide bg-[#B8976A] text-[#080808] px-5 py-3 rounded-full hover:bg-[#D4B88A] transition-all duration-300 font-medium"
            data-cursor="Book"
          >
            Book
          </a>
        </div>
      </div>
    </div>
  );
}
