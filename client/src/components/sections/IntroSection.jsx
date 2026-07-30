import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiShield, FiCpu, FiFeather, FiArrowRight } from 'react-icons/fi';

export default function IntroSection() {
  const [introImage, setIntroImage] = useState("https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=1000&q=80");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await axios.get('/api/settings');
      if (res.data && res.data.data && res.data.data.introSectionImage) {
        setIntroImage(res.data.data.introSectionImage);
      }
    } catch (err) {
      console.warn('Using fallback intro section image:', err);
    }
  };

  const features = [
    {
      icon: FiShield,
      title: "Medical Safety",
      description: "Single-use EO sterilized needles and sealed barrier films opened in your presence."
    },
    {
      icon: FiFeather,
      title: "Bespoke Design",
      description: "Custom-sculpted artwork tailored to your anatomy, skin tone, and vision."
    },
    {
      icon: FiCpu,
      title: "Precision Craft",
      description: "1RL single-needle detail and smooth shading techniques perfected over a decade."
    }
  ];

  return (
    <section className="section-padding bg-[#080808] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Editorial Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] bg-[#111113] border border-white/[0.06] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={introImage}
                alt="Studio Craftsmanship"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-4 max-w-xl">
              <span className="text-xs uppercase font-subheading tracking-[0.25em] text-[#B8976A] font-medium block">
                Sanctuary of Fine Art
              </span>
              <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[#EAEAEA] tracking-tight leading-[1.1]">
                Where artistry meets
                <br />
                <span className="text-gradient-gold italic font-light">permanent craft.</span>
              </h2>
            </div>

            <p className="text-base font-body text-[#7A7A85] leading-relaxed max-w-xl font-light">
              Founded in 2014, Ink Art Tattoo Studio elevated body art into a private atelier experience. We work strictly by appointment, providing a serene, unhurried space for artistic creation.
            </p>

            {/* Feature Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-white/[0.06]">
              {features.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="space-y-3">
                    <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-[#B8976A]">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h3 className="font-subheading text-sm font-medium text-[#EAEAEA]">
                      {item.title}
                    </h3>
                    <p className="text-xs font-body text-[#7A7A85] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 font-subheading text-xs uppercase tracking-widest text-[#B8976A] hover:text-[#D4B88A] transition-colors duration-300"
                data-cursor="Read"
              >
                <span>Discover Our Ethos</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
