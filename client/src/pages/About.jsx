import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { STUDIO_INFO, ARTISTS } from '../constants/studioData';
import { FiShield, FiAward, FiMessageCircle } from 'react-icons/fi';
import BookingCTASection from '../components/sections/BookingCTASection';

export default function About() {
  const [masterArtist, setMasterArtist] = useState(ARTISTS[0]);
  const [studioEthosImage, setStudioEthosImage] = useState('https://images.unsplash.com/photo-1598371839696-5c5bb00bd472?auto=format&fit=crop&w=1200&q=80');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [artistRes, settingsRes] = await Promise.allSettled([
        axios.get('/api/artists'),
        axios.get('/api/settings'),
      ]);
      if (artistRes.status === 'fulfilled' && artistRes.value.data?.data?.length > 0) {
        setMasterArtist(artistRes.value.data.data[0]);
      }
      if (settingsRes.status === 'fulfilled' && settingsRes.value.data?.data?.studioEthosImage) {
        setStudioEthosImage(settingsRes.value.data.data.studioEthosImage);
      }
    } catch (err) {
      console.warn('Using fallback data:', err);
    }
  };

  return (
    <div className="pt-36 pb-0 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 space-y-32">
        
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <span className="text-xs uppercase font-subheading tracking-[0.25em] text-[#B8976A] font-medium block">
            About Our Studio & Master Artist
          </span>
          <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl text-[#EAEAEA] tracking-tight leading-tight">
            Artistry & <span className="text-gradient-gold italic font-light">Craft</span>
          </h1>
          <p className="text-base sm:text-lg font-body text-[#7A7A85] leading-relaxed font-light">
            Ink Art Tattoo Studio in Nileshwaram, Kasaragod is dedicated to high-precision, custom tattoo artistry. Discover our studio ethos, hygiene standards, and resident Master Artist.
          </p>
        </div>

        {/* Studio Philosophy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div className="relative aspect-[4/3] bg-[#111113] border border-white/[0.06] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={studioEthosImage}
              alt="Ink Art Studio Environment"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-8">
            <h2 className="font-heading text-4xl sm:text-5xl text-[#EAEAEA] tracking-tight">
              Our Studio <span className="text-gradient-gold italic font-light">Ethos</span>
            </h2>
            <p className="text-base font-body text-[#7A7A85] leading-relaxed font-light">
              We treat every tattoo as a unique body sculpture. Operating strictly by appointment and direct consultation, we provide an unhurried, comfortable atmosphere where your ideas are transformed into custom permanent art.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-white/[0.06]">
              <div>
                <span className="font-heading text-4xl text-[#B8976A] block">100%</span>
                <span className="text-xs font-subheading text-[#7A7A85] uppercase tracking-wider mt-1 block">Sterile & Hygiene Standard</span>
              </div>
              <div>
                <span className="font-heading text-4xl text-[#B8976A] block">10+ Years</span>
                <span className="text-xs font-subheading text-[#7A7A85] uppercase tracking-wider mt-1 block">Tattoo Craft Experience</span>
              </div>
            </div>
          </div>
        </div>

        {/* Master Artist Profile Section */}
        {masterArtist && (
          <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-8 sm:p-14 space-y-12 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/[0.06] pb-8 gap-6">
              <div>
                <span className="text-xs font-subheading uppercase tracking-widest text-[#B8976A] font-medium block mb-1">
                  Resident Master Artist
                </span>
                <h2 className="font-heading text-4xl sm:text-5xl text-[#EAEAEA] tracking-tight">
                  {masterArtist.name}
                </h2>
                <p className="text-xs font-subheading text-[#7A7A85] tracking-wider mt-2">
                  {masterArtist.role} • {masterArtist.experience}
                </p>
              </div>

              <a
                href={`https://wa.me/${STUDIO_INFO.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 font-subheading text-xs font-medium tracking-wide bg-[#B8976A] text-[#080808] px-8 py-3.5 rounded-full hover:bg-[#D4B88A] transition-all duration-500"
              >
                <FiMessageCircle className="w-4 h-4" />
                <span>Consult Artist on WhatsApp</span>
              </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-4 aspect-[3/4] bg-[#18181B] border border-white/[0.06] rounded-2xl overflow-hidden relative">
                <img
                  src={masterArtist.image}
                  alt={masterArtist.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:col-span-8 space-y-8">
                <div>
                  <h3 className="font-subheading text-xs uppercase tracking-widest text-[#B8976A] font-medium mb-2">
                    Specializations & Expertise
                  </h3>
                  <p className="font-heading text-3xl text-[#EAEAEA] tracking-tight">
                    {masterArtist.specialization}
                  </p>
                </div>

                <p className="text-base font-body text-[#7A7A85] leading-relaxed font-light">
                  {masterArtist.bio}
                </p>

                {/* Awards */}
                {/* {masterArtist.awards && masterArtist.awards.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h4 className="font-subheading text-xs uppercase tracking-widest text-[#EAEAEA] font-medium flex items-center gap-2">
                      <FiAward className="w-4 h-4 text-[#B8976A]" /> Recognition & Honors
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {masterArtist.awards.map((award, idx) => (
                        <span key={idx} className="bg-white/[0.03] border border-white/[0.06] px-4 py-2 rounded-full text-xs font-subheading text-[#D4B88A]">
                          {award}
                        </span>
                      ))}
                    </div>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        )}

        {/* Hygiene Standards */}
        <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-10 sm:p-14 space-y-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#34D399]/10 border border-[#34D399]/20 flex items-center justify-center text-[#34D399]">
              <FiShield className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-3xl sm:text-4xl text-[#EAEAEA] tracking-tight">
              Hospital-Grade Hygiene Protocol
            </h3>
          </div>
          <p className="text-base font-body text-[#7A7A85] leading-relaxed max-w-4xl font-light">
            Cleanliness and client safety are our highest priorities. All tattoo needles are single-use 316L EO sterilized cartridges opened fresh in front of you. Workstations are disinfected before and after every single tattoo session using hospital-grade sterilization protocols.
          </p>
        </div>

      </div>

      <BookingCTASection />
    </div>
  );
}
