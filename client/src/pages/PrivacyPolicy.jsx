import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="pt-36 pb-28 bg-[#080808]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 space-y-12 text-[#7A7A85] font-body">
        <div className="space-y-4">
          <h1 className="font-heading text-5xl sm:text-6xl text-[#EAEAEA] tracking-tight">
            Privacy <span className="text-gradient-gold italic font-light">Policy</span>
          </h1>
          <p className="text-xs font-subheading uppercase tracking-widest text-[#B8976A]">Last updated: 2024</p>
        </div>

        <section className="space-y-4 pt-6 border-t border-white/[0.06]">
          <h2 className="font-heading text-3xl text-[#EAEAEA]">1. INFORMATION WE COLLECT</h2>
          <p className="text-base leading-relaxed font-light">
            Ink Art Tattoo Studio collects personal details (Name, Phone Number, Email Address, and Tattoo Idea preferences) strictly for scheduling consultations, executing client tattoo projects, and direct WhatsApp communication.
          </p>
        </section>

        <section className="space-y-4 pt-6 border-t border-white/[0.06]">
          <h2 className="font-heading text-3xl text-[#EAEAEA]">2. DATA SECURITY & CONFIDENTIALITY</h2>
          <p className="text-base leading-relaxed font-light">
            Client reference images and project details shared with us are held strictly confidential. We do not sell or transmit client data to third-party advertising brokers.
          </p>
        </section>
      </div>
    </div>
  );
}
