import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { FiArrowRight, FiMessageCircle } from 'react-icons/fi';
import { STUDIO_INFO } from '../../constants/studioData';
import MagneticButton from '../ui/MagneticButton';

export default function HeroSection() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(contentRef.current.children, 
          { opacity: 0, y: 40 }, 
          { opacity: 1, y: 0, duration: 1.4, stagger: 0.2, ease: 'power3.out', delay: 0.3 }
        );
      }
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { scale: 1.15, opacity: 0 },
          { scale: 1, opacity: 0.45, duration: 2, ease: 'power2.out' }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const whatsappMessage = encodeURIComponent("Hello Ink Art Tattoo Studio! I would like to inquire about a custom tattoo design.");
  const whatsappUrl = `https://wa.me/${STUDIO_INFO.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

  return (
    <section ref={heroRef} className="relative w-full min-h-screen bg-[#080808] text-[#EAEAEA] flex flex-col justify-between pt-32 pb-16 overflow-hidden select-none">
      
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <img
          ref={imageRef}
          src="/hero_tattoo_bg.png"
          alt="Tattoo Studio Hero"
          className="w-full h-full object-cover object-center brightness-90"
        />
        {/* Soft Radial & Linear Overlays for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-[#080808]/40" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#080808]/50 to-[#080808]" />
      </div>

      {/* Main Hero Content */}
      <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-10 relative z-20 my-auto py-5 flex flex-col items-center text-center">
        <div ref={contentRef} className="max-w-4xl space-y-8 flex flex-col items-center">
          
          <span className="text-xs uppercase font-subheading tracking-[0.3em] text-[#B8976A] font-medium block">
            Nileshwaram · Kasaragod
          </span>

          <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-8xl tracking-tight text-[#EAEAEA] leading-[1.05] font-normal">
            Precision ink for the
            <br />
            <span className="italic font-light text-gradient-gold">discerning collector.</span>
          </h1>

          <p className="text-base sm:text-lg font-body text-[#7A7A85] leading-relaxed max-w-2xl font-light">
            An atelier dedicated to bespoke body architecture, single-needle micro-realism, and timeless custom tattoo craft.
          </p>

          {/* Action Link Buttons */}
          <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              <MagneticButton variant="primary" dataCursor="WhatsApp">
                <FiMessageCircle className="w-4 h-4" />
                <span>Book Consultation</span>
              </MagneticButton>
            </a>

            <Link to="/styles">
              <MagneticButton variant="secondary" dataCursor="Explore">
                <span>Explore Styles</span>
                <FiArrowRight className="w-4 h-4" />
              </MagneticButton>
            </Link>
          </div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-10 relative z-20 flex items-center justify-center pt-8">
        <div className="flex flex-col items-center gap-3 text-xs font-subheading tracking-widest text-[#7A7A85]">
          <span className="uppercase text-[11px]">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#B8976A] to-transparent animate-pulse" />
        </div>
      </div>

    </section>
  );
}
