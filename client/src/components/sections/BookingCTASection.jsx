import React from 'react';
import { Link } from 'react-router-dom';
import MagneticButton from '../ui/MagneticButton';
import { FiCalendar, FiMessageCircle } from 'react-icons/fi';
import { STUDIO_INFO } from '../../constants/studioData';

export default function BookingCTASection() {
  const whatsappMessage = encodeURIComponent("Hello Ink Art Tattoo Studio! I would like to inquire about a custom tattoo design.");
  const whatsappUrl = `https://wa.me/${STUDIO_INFO.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

  return (
    <section className="section-padding bg-[#080808] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10 text-center space-y-10">
        <span className="text-xs uppercase font-subheading tracking-[0.25em] text-[#B8976A] font-medium block">
          Your Canvas Awaits
        </span>

        <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl text-[#EAEAEA] tracking-tight leading-[1.08] font-normal">
          Ready to create your
          <br />
          <span className="text-gradient-gold italic font-light">permanent masterpiece?</span>
        </h2>

        <p className="max-w-lg mx-auto text-base font-body text-[#7A7A85] leading-relaxed font-light">
          Bookings with our resident master are limited to maintain exceptional quality. Reserve your private consultation today.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={whatsappUrl} target="_blank" rel="noreferrer">
            <MagneticButton variant="primary" dataCursor="WhatsApp">
              <FiMessageCircle className="w-4 h-4" />
              <span>WhatsApp Enquiry</span>
            </MagneticButton>
          </a>

          <Link to="/contact">
            <MagneticButton variant="secondary" dataCursor="Contact">
              <span>Contact Studio</span>
            </MagneticButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
