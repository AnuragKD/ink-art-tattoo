import React from 'react';
import MagneticButton from '../ui/MagneticButton';
import { FiMessageCircle, FiPhoneCall } from 'react-icons/fi';
import { STUDIO_INFO } from '../../constants/studioData';

export default function BookingCTASection() {
  const whatsappMessage = encodeURIComponent("Hello Ink Art Tattoo Studio! I would like to inquire about a custom tattoo design.");
  const whatsappUrl = `https://wa.me/${STUDIO_INFO.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

  return (
    <section className="relative section-padding bg-[#060606] overflow-hidden select-none">

      {/* ── Background Masterpiece Artwork with Cinematic Stage Lighting ───── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/hero_tattoo_bg.png"
          alt="Ink Art Atelier Background"
          className="w-full h-full object-cover object-top opacity-20 filter brightness-50 contrast-125 scale-105"
        />
        {/* Layered Gradient Curtains */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-transparent to-[#080808]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/70 to-[#080808]" />
      </div>

      {/* ── Dual Gold Stage Glow Spheres ─────────────────────────────────────── */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] lg:w-[480px] h-[220px] lg:h-[300px] bg-[#B8976A]/15 blur-[100px] rounded-full pointer-events-none z-0 animate-pulse" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[250px] lg:w-[400px] h-[180px] lg:h-[250px] bg-[#E6CA9C]/10 blur-[90px] rounded-full pointer-events-none z-0" />

      {/* ── Gold Metallic Foil Lines ────────────────────────────────────────── */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#B8976A]/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#B8976A]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
        <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8">

          {/* Main Statement Heading */}
          <div className="max-w-3xl space-y-2 sm:space-y-3">
            <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl text-[#EAEAEA] tracking-tight leading-[1.08] font-normal">
              Your Canvas <span className="italic font-light text-gradient-gold">Awaits.</span>
            </h2>
            <p className="font-heading text-base sm:text-xl lg:text-2xl text-[#7A7A85] tracking-tight font-light">
              Ready to create your permanent masterpiece?
            </p>
          </div>

          {/* Action CTAs */}
          <div className="pt-1 flex flex-col sm:flex-row items-center gap-4">
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              <MagneticButton variant="gold" dataCursor="WhatsApp">
                <FiMessageCircle className="w-4 h-4 text-[#080808]" />
                <span>Reserve Consultation</span>
              </MagneticButton>
            </a>

            <a href={`tel:${STUDIO_INFO.contact.phone}`}>
              <MagneticButton variant="secondary" dataCursor="Call">
                <FiPhoneCall className="w-4 h-4 text-[#B8976A]" />
                <span>Direct Studio Line</span>
              </MagneticButton>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
