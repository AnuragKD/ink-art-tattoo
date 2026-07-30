import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ARTISTS, STUDIO_INFO } from '../../constants/studioData';
import { FiArrowRight, FiAward, FiMessageCircle } from 'react-icons/fi';

export default function FeaturedArtistsSection() {
  const [artist, setArtist] = useState(ARTISTS[0]);

  useEffect(() => {
    fetchArtist();
  }, []);

  const fetchArtist = async () => {
    try {
      const res = await axios.get('/api/artists');
      if (res.data && res.data.data && res.data.data.length > 0) {
        setArtist(res.data.data[0]);
      }
    } catch (err) {
      console.warn('Using fallback artist data:', err);
    }
  };

  return (
    <section className="section-padding bg-[#080808] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="text-xs uppercase font-subheading tracking-[0.25em] text-[#B8976A] font-medium block">
              Master Craftsmanship
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl text-[#EAEAEA] tracking-tight">
              Resident <span className="text-gradient-gold italic font-light">Master Artist</span>
            </h2>
          </div>

          <Link
            to="/about"
            className="inline-flex items-center gap-2 font-subheading text-xs uppercase tracking-wider text-[#7A7A85] hover:text-[#B8976A] transition-colors duration-300"
            data-cursor="About"
          >
            <span>Learn More About Studio</span>
            <FiArrowRight className="w-4 h-4 text-[#B8976A]" />
          </Link>
        </div>

        {/* Master Artist Spotlight Card */}
        {artist && (
          <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-8 sm:p-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center shadow-xl">
            
            {/* Portrait Image */}
            <div className="lg:col-span-5 relative aspect-[3/4] bg-[#18181B] border border-white/[0.06] rounded-2xl overflow-hidden group">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-subheading uppercase tracking-widest text-[#B8976A] font-medium block mb-1">
                  {artist.role}
                </span>
                <h3 className="font-heading text-3xl text-[#EAEAEA] tracking-tight">
                  {artist.name}
                </h3>
              </div>
            </div>

            {/* Artist Bio & Specialties */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3 border-b border-white/[0.06] pb-6">
                <span className="text-xs font-subheading text-[#B8976A] font-medium tracking-wide uppercase block">
                  {artist.experience}
                </span>
                <h4 className="font-heading text-3xl text-[#EAEAEA] tracking-tight">
                  {artist.specialization}
                </h4>
              </div>

              <p className="text-base font-body text-[#7A7A85] leading-relaxed font-light">
                {artist.bio}
              </p>

              {/* Awards */}
              {artist.awards && artist.awards.length > 0 && (
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium block">
                    Recognition & Honors
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {artist.awards.map((award, i) => (
                      <span key={i} className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] px-4 py-2 rounded-full text-xs text-[#D4B88A] font-subheading">
                        <FiAward className="w-3.5 h-3.5 text-[#B8976A]" />
                        {award}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-6 flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/${STUDIO_INFO.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 font-subheading text-xs font-medium tracking-wide bg-[#B8976A] text-[#080808] px-8 py-3.5 rounded-full hover:bg-[#D4B88A] transition-all duration-500"
                >
                  <FiMessageCircle className="w-4 h-4" />
                  <span>Enquire via WhatsApp</span>
                </a>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 font-subheading text-xs font-medium tracking-wide bg-white/[0.03] text-[#EAEAEA] border border-white/[0.06] px-8 py-3.5 rounded-full hover:border-[#B8976A]/30 hover:text-[#B8976A] transition-all duration-500"
                >
                  <span>Send Message</span>
                </Link>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
