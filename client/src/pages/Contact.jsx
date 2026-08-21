import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { STUDIO_INFO, TATTOO_STYLES } from '../constants/studioData';
import { FiMapPin, FiPhone, FiMail, FiClock, FiMessageCircle, FiSend, FiCheck } from 'react-icons/fi';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', style: '', message: '' });
  const [stylesList, setStylesList] = useState(TATTOO_STYLES);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/styles');
      if (res.data?.data?.length > 0) {
        setStylesList(res.data.data);
      }
    } catch (err) {
      console.warn('Using default fallback data:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await axios.post('/api/bookings', {
        name: formData.name,
        fullName: formData.name,
        phone: formData.phone,
        email: formData.email || 'N/A',
        style: formData.style || 'Custom Concept',
        placement: 'Custom Body Placement',
        message: formData.message,
        notes: formData.message,
        artist: 'Marcus Vance',
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Booking POST failed:', err);
      alert('Failed to send inquiry. Please check network connection.');
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent("Hello Ink Art Tattoo Studio! I would like to inquire about a custom tattoo design.");
  const whatsappUrl = `https://wa.me/${STUDIO_INFO.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

  return (
    <div className="pt-36 pb-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <span className="text-xs uppercase font-subheading tracking-[0.25em] text-[#B8976A] font-medium block">
            Tattoo Inquiry & Contact Desk
          </span>
          <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl text-[#EAEAEA] tracking-tight leading-tight">
            Get in <span className="text-gradient-gold italic font-light">Touch</span>
          </h1>
          <p className="text-base sm:text-lg font-body text-[#7A7A85] leading-relaxed font-light">
            Have questions about custom tattoo designs, placement, or availability? Chat with us directly on WhatsApp or send us an inquiry below.
          </p>

          {/* Featured WhatsApp Callout */}
          <div className="pt-4 flex justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-[#34D399] text-[#080808] font-subheading text-sm font-medium py-4 px-9 rounded-full hover:bg-[#6EE7B7] transition-all duration-500 shadow-lg shadow-[#34D399]/10"
            >
              <FiMessageCircle className="w-5 h-5" />
              <span>Quick Inquiry on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Info Panel */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-8 sm:p-10 space-y-8 shadow-xl">
              <h3 className="font-heading text-3xl text-[#EAEAEA] tracking-tight border-b border-white/[0.06] pb-4">
                Studio Information
              </h3>

              <div className="space-y-6 text-sm font-body">
                <div className="flex items-start gap-4 text-[#7A7A85]">
                  <FiMapPin className="w-5 h-5 text-[#B8976A] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#EAEAEA] font-medium block mb-1">Studio Location</span>
                    <span className="font-light">{STUDIO_INFO.location.address}, {STUDIO_INFO.location.city}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-[#7A7A85]">
                  <FiPhone className="w-5 h-5 text-[#B8976A] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#EAEAEA] font-medium block mb-1">Phone & WhatsApp</span>
                    <a href={`tel:${STUDIO_INFO.contact.phone}`} className="hover:text-[#EAEAEA] transition-colors font-light">{STUDIO_INFO.contact.phone}</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-[#7A7A85]">
                  <FiMail className="w-5 h-5 text-[#B8976A] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#EAEAEA] font-medium block mb-1">Email Inquiry</span>
                    <a href={`mailto:${STUDIO_INFO.contact.email}`} className="hover:text-[#EAEAEA] transition-colors font-light">{STUDIO_INFO.contact.email}</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-[#7A7A85]">
                  <FiClock className="w-5 h-5 text-[#B8976A] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#EAEAEA] font-medium block mb-1">Working Hours</span>
                    <span className="font-light">Mon — Sat: {STUDIO_INFO.hours.weekdays}</span>
                  </div>
                </div>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 bg-white/[0.03] text-[#EAEAEA] border border-white/[0.06] font-subheading text-xs uppercase tracking-wider font-medium py-4 px-6 rounded-full hover:border-[#B8976A]/30 hover:text-[#B8976A] transition-all duration-500 mt-4"
              >
                <FiMessageCircle className="w-4 h-4 text-[#34D399]" />
                Chat Directly on WhatsApp
              </a>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 bg-[#111113] border border-white/[0.06] rounded-2xl p-8 sm:p-12 space-y-8 shadow-xl">
            <h3 className="font-heading text-3xl text-[#EAEAEA] tracking-tight border-b border-white/[0.06] pb-4">
              Send a Direct Message
            </h3>

            {submitted ? (
              <div className="p-12 text-center space-y-4 bg-white/[0.02] border border-[#34D399]/20 rounded-xl">
                <FiCheck className="w-12 h-12 text-[#34D399] mx-auto" />
                <h4 className="font-heading text-2xl text-[#EAEAEA]">Inquiry Sent</h4>
                <p className="text-sm font-body text-[#7A7A85] font-light">Thank you! We will get back to you shortly on phone / WhatsApp.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium">Name *</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your Name" className="w-full bg-[#18181B] border border-white/[0.06] rounded-xl p-4 text-[#EAEAEA] focus:border-[#B8976A]/50 focus:outline-none text-sm font-body transition-colors placeholder:text-[#7A7A85]/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium">Phone / WhatsApp *</label>
                    <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 98765 43210" className="w-full bg-[#18181B] border border-white/[0.06] rounded-xl p-4 text-[#EAEAEA] focus:border-[#B8976A]/50 focus:outline-none text-sm font-body transition-colors placeholder:text-[#7A7A85]/50" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium">Email Address</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="your@email.com" className="w-full bg-[#18181B] border border-white/[0.06] rounded-xl p-4 text-[#EAEAEA] focus:border-[#B8976A]/50 focus:outline-none text-sm font-body transition-colors placeholder:text-[#7A7A85]/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium">Preferred Style</label>
                    <select value={formData.style} onChange={(e) => setFormData({ ...formData, style: e.target.value })} className="w-full bg-[#18181B] border border-white/[0.06] rounded-xl p-4 text-[#EAEAEA] focus:border-[#B8976A]/50 focus:outline-none text-sm font-body transition-colors">
                      <option value="">Select Tattoo Style (Optional)</option>
                      {stylesList.map((s) => (
                        <option key={s._id || s.id} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium">Your Tattoo Idea / Message *</label>
                  <textarea rows={5} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Describe your tattoo idea, placement, or any questions..." className="w-full bg-[#18181B] border border-white/[0.06] rounded-xl p-4 text-[#EAEAEA] focus:border-[#B8976A]/50 focus:outline-none text-sm font-body transition-colors placeholder:text-[#7A7A85]/50 resize-none" />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 font-subheading text-xs uppercase tracking-wider bg-[#B8976A] text-[#080808] px-9 py-4 rounded-full font-medium hover:bg-[#D4B88A] transition-all duration-500 disabled:opacity-50"
                >
                  <FiSend className="w-4 h-4" />
                  <span>{submitting ? 'Submitting...' : 'Submit Inquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Full-Width Interactive Google Maps Container Only at the Bottom */}
        <div className="pt-8 border-t border-white/[0.06]">
          <div className="w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl relative bg-[#111113]">
            <iframe
              title="Ink Art Tattoo Studio Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15582.476483528292!2d75.1245781!3d12.2471927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba47f6d90d79bb7%3A0xb35a39eb2ab7b068!2sNileshwar%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale contrast-125 opacity-85 hover:opacity-100 transition-opacity duration-500"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
