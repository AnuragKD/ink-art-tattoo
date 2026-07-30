import React from 'react';
import { Link } from 'react-router-dom';
import { STUDIO_INFO } from '../../constants/studioData';
import { FiInstagram, FiFacebook, FiYoutube, FiArrowUp, FiMapPin, FiPhone, FiClock } from 'react-icons/fi';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080808] text-[#EAEAEA]  relative overflow-hidden">

        {/* Top: Large Outlined Brand Watermark */}
        <div className="relative z-10 border-b border-white/[0.06]">
          <div className=" max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-16 lg:pt-20 text-center overflow-hidden">
            <h2 
              className="font-footer font-extrabold tracking-widest text-transparent uppercase whitespace-nowrap select-none opacity-20 -mb-8"
              style={{
                WebkitTextStroke: '1px rgba(255, 255, 255, 255)',
                fontSize: 'clamp(2.2rem, 7.5vw, 7rem)',
                lineHeight: 1.1
              }}
            >
              INK ART TATTOO
            </h2>
          </div>
        </div>
        <div className='relative'>
          <div className="absolute inset-0 h-full w-full overflow-hidden bg-black pointer-events-none">
            <video
              src="/footer_video-BTJK-DDj.mp4"
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
              className="h-full w-full object-cover opacity-20"
            />
          </div>
          {/* Middle: Grid Layout */}
          <div className="relative z-10">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 lg:gap-10 py-16 lg:py-20">
              
              {/* Col 1: Studio Info */}
              <div className="space-y-4">
                <img 
                  src="/white-logo.png" 
                  alt="Ink Art Tattoo Logo" 
                  className="h-10 sm:h-20 w-auto object-contain mb-1"
                />
                <span className="font-heading text-2xl tracking-tight text-[#EAEAEA] block">
                  Ink Art<span className="text-[#B8976A]">.</span>
                </span>

                <p className="text-sm font-body text-[#7A7A85] leading-relaxed max-w-xs">
                  An award-winning sanctuary for custom body art. Fusing heritage craft with sterile precision and bespoke design.
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={STUDIO_INFO.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-white/[0.04] flex items-center justify-center text-[#7A7A85] hover:text-[#EAEAEA] hover:bg-white/[0.08] transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <FiInstagram className="w-4 h-4" />
                  </a>
                  <a
                    href={STUDIO_INFO.socials.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-white/[0.04] flex items-center justify-center text-[#7A7A85] hover:text-[#EAEAEA] hover:bg-white/[0.08] transition-all duration-300"
                    aria-label="Facebook"
                  >
                    <FiFacebook className="w-4 h-4" />
                  </a>
                  <a
                    href={STUDIO_INFO.socials.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-white/[0.04] flex items-center justify-center text-[#7A7A85] hover:text-[#EAEAEA] hover:bg-white/[0.08] transition-all duration-300"
                    aria-label="YouTube"
                  >
                    <FiYoutube className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Col 2: Navigation */}
              <div className="space-y-5">
                <h4 className="font-subheading text-xs uppercase tracking-widest text-[#7A7A85] font-medium">
                  Navigation
                </h4>
                <ul className="space-y-3.5 text-[15px] font-body text-[#EAEAEA]/70">
                  <li><Link to="/about" className="hover:text-[#EAEAEA] transition-colors duration-300">About</Link></li>
                  <li><Link to="/styles" className="hover:text-[#EAEAEA] transition-colors duration-300">Tattoo Styles</Link></li>
                  <li><Link to="/gallery" className="hover:text-[#EAEAEA] transition-colors duration-300">Gallery</Link></li>
                  <li><Link to="/faqs" className="hover:text-[#EAEAEA] transition-colors duration-300">FAQs</Link></li>
                  <li><Link to="/contact" className="hover:text-[#EAEAEA] transition-colors duration-300">Contact</Link></li>
                </ul>
              </div>

              {/* Col 3: Specializations */}
              <div className="space-y-5">
                <h4 className="font-subheading text-xs uppercase tracking-widest text-[#7A7A85] font-medium">
                  Specializations
                </h4>
                <ul className="space-y-3.5 text-[15px] font-body text-[#EAEAEA]/70">
                  <li><Link to="/styles" className="hover:text-[#EAEAEA] transition-colors duration-300">Micro-Realism</Link></li>
                  <li><Link to="/styles" className="hover:text-[#EAEAEA] transition-colors duration-300">Fine Line & Geometry</Link></li>
                  <li><Link to="/styles" className="hover:text-[#EAEAEA] transition-colors duration-300">Japanese Irezumi</Link></li>
                  <li><Link to="/styles" className="hover:text-[#EAEAEA] transition-colors duration-300">Trash Polka</Link></li>
                </ul>
              </div>

              {/* Col 4: Contact */}
              <div className="space-y-5">
                <h4 className="font-subheading text-xs uppercase tracking-widest text-[#7A7A85] font-medium">
                  Visit Us
                </h4>
                <div className="space-y-4 text-sm font-body text-[#7A7A85]">
                  <p className="flex items-start gap-3">
                    <FiMapPin className="w-4 h-4 text-[#B8976A] shrink-0 mt-0.5" />
                    <span>{STUDIO_INFO.location.address}, {STUDIO_INFO.location.city}</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <FiPhone className="w-4 h-4 text-[#B8976A] shrink-0" />
                    <a href={`tel:${STUDIO_INFO.contact.phone}`} className="hover:text-[#EAEAEA] transition-colors">{STUDIO_INFO.contact.phone}</a>
                  </p>
                  <p className="flex items-start gap-3">
                    <FiClock className="w-4 h-4 text-[#B8976A] shrink-0 mt-0.5" />
                    <span>Mon — Sat: 10AM — 8PM</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom copyright bar */}
          <div className="relative z-10 border-t border-white/[0.06]">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-10 pb-10  flex flex-col sm:flex-row items-center justify-between text-sm text-[#7A7A85] gap-5">
              <p className="font-body">© {new Date().getFullYear()} Ink Art Tattoo Studio</p>

              <div className="flex items-center gap-8">
                <Link to="/privacy-policy" className="hover:text-[#EAEAEA] transition-colors duration-300">Privacy</Link>
                <Link to="/terms" className="hover:text-[#EAEAEA] transition-colors duration-300">Terms</Link>
                <Link to="/admin/login" className="text-[#7A7A85]/30 hover:text-[#7A7A85] transition-colors duration-300 text-xs">Staff</Link>
              </div>

              <button
                onClick={scrollToTop}
                data-cursor="Top"
                className="w-10 h-10 rounded-full bg-white/[0.04] flex items-center justify-center text-[#7A7A85] hover:text-[#EAEAEA] hover:bg-white/[0.08] transition-all duration-300"
                aria-label="Back to top"
              >
                <FiArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
    </footer>
  );
}
