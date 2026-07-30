import React from 'react';

export default function Terms() {
  return (
    <div className="pt-36 pb-28 bg-[#080808]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 space-y-12 text-[#7A7A85] font-body">
        <h1 className="font-heading text-5xl sm:text-6xl text-[#EAEAEA] tracking-tight">
          Terms of <span className="text-gradient-gold italic font-light">Service</span>
        </h1>

        <section className="space-y-4 pt-6 border-t border-white/[0.06]">
          <h2 className="font-heading text-3xl text-[#EAEAEA]">1. APPOINTMENTS & CONSULTATIONS</h2>
          <p className="text-base leading-relaxed font-light">
            All tattoo sessions are arranged via appointment or direct WhatsApp consultation. A deposit or booking confirmation secures your dedicated session time with our Master Tattoo Artist.
          </p>
        </section>

        <section className="space-y-4 pt-6 border-t border-white/[0.06]">
          <h2 className="font-heading text-3xl text-[#EAEAEA]">2. AGE & IDENTIFICATION</h2>
          <p className="text-base leading-relaxed font-light">
            You must be at least 18 years of age with valid government-issued photo identification to receive a tattoo at Ink Art Tattoo Studio.
          </p>
        </section>
      </div>
    </div>
  );
}
