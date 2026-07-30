import React from 'react';
import { FiMessageSquare, FiCompass, FiShield, FiHeart } from 'react-icons/fi';

export default function ExperienceSection() {
  const steps = [
    {
      num: "01",
      icon: FiMessageSquare,
      title: "Consultation",
      description: "Submit your tattoo concept and references. Our team matches you with the master artist."
    },
    {
      num: "02",
      icon: FiCompass,
      title: "Custom Sculpting",
      description: "Your artist drafts a bespoke design tailored to your body contours and skin tone."
    },
    {
      num: "03",
      icon: FiShield,
      title: "Sterile Session",
      description: "Relax in a private booth with ergonomic seating and single-needle precision."
    },
    {
      num: "04",
      icon: FiHeart,
      title: "Aftercare",
      description: "Applied medical-grade dermal shield followed by 14-day direct aftercare monitoring."
    }
  ];

  return (
    <section className="section-padding bg-[#080808] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-xs uppercase font-subheading tracking-[0.25em] text-[#B8976A] font-medium block">
            The Atelier Journey
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[#EAEAEA] tracking-tight">
            Your <span className="text-gradient-gold italic font-light">Experience</span>
          </h2>
          <p className="text-base font-body text-[#7A7A85] leading-relaxed font-light">
            Every tattoo created at Ink Art follows a four-step journey to guarantee artistic perfection, comfort, and lifelong vibrancy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-[#111113] border border-white/[0.06] rounded-xl p-8 sm:p-10 hover:border-[#B8976A]/20 transition-all duration-500 group"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="font-heading text-4xl text-[#7A7A85]/30 group-hover:text-[#B8976A]/40 transition-colors duration-500 font-light">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-[#B8976A] group-hover:bg-[#B8976A] group-hover:text-[#080808] transition-all duration-500">
                    <IconComponent className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-subheading text-base font-medium text-[#EAEAEA] mb-3">
                  {step.title}
                </h3>
                <p className="text-sm font-body text-[#7A7A85] leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
