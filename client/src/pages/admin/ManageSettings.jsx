import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiUploadCloud, FiCheckCircle, FiImage } from 'react-icons/fi';

export default function ManageSettings() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Image Previews & Files
  const [previews, setPreviews] = useState({
    introSectionImage: '',
    studioEthosImage: '',
    contactBannerImage: '',
    ctaBannerImage: '',
  });

  const [files, setFiles] = useState({
    introFile: null,
    ethosFile: null,
    contactFile: null,
    ctaFile: null,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/settings');
      if (res.data && res.data.data) {
        setPreviews({
          introSectionImage: res.data.data.introSectionImage || '',
          studioEthosImage: res.data.data.studioEthosImage || '',
          contactBannerImage: res.data.data.contactBannerImage || '',
          ctaBannerImage: res.data.data.ctaBannerImage || '',
        });
      }
    } catch (err) {
      console.warn('Using default settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (field, e) => {
    const file = e.target.files[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [field]: file }));
      const fieldMap = {
        introFile: 'introSectionImage',
        ethosFile: 'studioEthosImage',
        contactFile: 'contactBannerImage',
        ctaFile: 'ctaBannerImage',
      };
      setPreviews((prev) => ({ ...prev, [fieldMap[field]]: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const body = new FormData();
      if (files.introFile) body.append('introFile', files.introFile);
      if (files.ethosFile) body.append('ethosFile', files.ethosFile);
      if (files.contactFile) body.append('contactFile', files.contactFile);
      if (files.ctaFile) body.append('ctaFile', files.ctaFile);

      const res = await axios.put('/api/settings', body, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data && res.data.data) {
        setSuccessMsg('Site banner images updated successfully! Changes are live.');
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (err) {
      console.error('Error updating site settings:', err);
      alert('Failed to update site images. Make sure backend is running.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#EAEAEA] pt-28 pb-20 px-6 sm:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.06] pb-8 gap-6">
          <div className="space-y-2">
            <Link to="/admin/dashboard" className="text-xs font-subheading uppercase text-[#B8976A] flex items-center gap-1 hover:text-[#D4B88A] transition-colors">
              <FiArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
            <h1 className="font-heading text-4xl sm:text-5xl text-[#EAEAEA] tracking-tight">
              Manage <span className="text-gradient-gold italic font-light">Site Banner Images</span>
            </h1>
          </div>
        </div>

        {successMsg && (
          <div className="p-4 bg-white/[0.02] border border-[#34D399]/30 text-[#34D399] text-xs font-subheading rounded-xl flex items-center gap-2">
            <FiCheckCircle className="w-5 h-5 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {loading ? (
          <div className="py-20 text-center text-[#7A7A85] font-subheading text-sm">
            Loading site images...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-10 max-w-5xl">
            
            {/* Grid of Site Banners */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* 1. Sanctuary of Fine Art (Homepage Intro Craftsmanship Image) */}
              <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 space-y-4 shadow-xl">
                <span className="text-xs uppercase font-subheading text-[#B8976A] tracking-wider block font-medium">Homepage: Sanctuary of Fine Art</span>
                <p className="text-[11px] text-[#7A7A85]">"Where artistry meets permanent craft" image</p>
                <div className="aspect-[4/5] bg-[#18181B] rounded-xl overflow-hidden relative border border-white/[0.06]">
                  {previews.introSectionImage ? (
                    <img src={previews.introSectionImage} alt="Sanctuary of Fine Art" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#7A7A85]"><FiImage className="w-8 h-8" /></div>
                  )}
                </div>
                <div className="relative border border-dashed border-white/[0.1] hover:border-[#B8976A]/40 rounded-xl p-3 text-center transition-colors cursor-pointer bg-[#18181B]">
                  <input type="file" accept="image/*" onChange={(e) => handleFileChange('introFile', e)} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                  <span className="text-xs font-subheading text-[#EAEAEA] flex items-center justify-center gap-1.5 py-1">
                    <FiUploadCloud className="w-4 h-4 text-[#B8976A]" /> Change Section Image
                  </span>
                </div>
              </div>

              {/* 2. Studio Ethos Image */}
              <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 space-y-4 shadow-xl">
                <span className="text-xs uppercase font-subheading text-[#B8976A] tracking-wider block font-medium">About Page Studio Ethos</span>
                <p className="text-[11px] text-[#7A7A85]">Studio environment & philosophy image</p>
                <div className="aspect-[4/5] bg-[#18181B] rounded-xl overflow-hidden relative border border-white/[0.06]">
                  {previews.studioEthosImage ? (
                    <img src={previews.studioEthosImage} alt="Studio Ethos" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#7A7A85]"><FiImage className="w-8 h-8" /></div>
                  )}
                </div>
                <div className="relative border border-dashed border-white/[0.1] hover:border-[#B8976A]/40 rounded-xl p-3 text-center transition-colors cursor-pointer bg-[#18181B]">
                  <input type="file" accept="image/*" onChange={(e) => handleFileChange('ethosFile', e)} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                  <span className="text-xs font-subheading text-[#EAEAEA] flex items-center justify-center gap-1.5 py-1">
                    <FiUploadCloud className="w-4 h-4 text-[#B8976A]" /> Change Studio Ethos Image
                  </span>
                </div>
              </div>

              {/* 3. Contact Location Image */}
              <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 space-y-4 shadow-xl">
                <span className="text-xs uppercase font-subheading text-[#B8976A] tracking-wider block font-medium">Contact Desk Location Preview</span>
                <p className="text-[11px] text-[#7A7A85]">Nileshwaram Studio Location Card Image</p>
                <div className="aspect-[16/9] bg-[#18181B] rounded-xl overflow-hidden relative border border-white/[0.06]">
                  {previews.contactBannerImage ? (
                    <img src={previews.contactBannerImage} alt="Contact Location" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#7A7A85]"><FiImage className="w-8 h-8" /></div>
                  )}
                </div>
                <div className="relative border border-dashed border-white/[0.1] hover:border-[#B8976A]/40 rounded-xl p-3 text-center transition-colors cursor-pointer bg-[#18181B]">
                  <input type="file" accept="image/*" onChange={(e) => handleFileChange('contactFile', e)} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                  <span className="text-xs font-subheading text-[#EAEAEA] flex items-center justify-center gap-1.5 py-1">
                    <FiUploadCloud className="w-4 h-4 text-[#B8976A]" /> Change Location Image
                  </span>
                </div>
              </div>

              {/* 4. Booking CTA Banner */}
              <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 space-y-4 shadow-xl">
                <span className="text-xs uppercase font-subheading text-[#B8976A] tracking-wider block font-medium">Booking CTA Section Banner</span>
                <p className="text-[11px] text-[#7A7A85]">Footer CTA background image</p>
                <div className="aspect-[16/9] bg-[#18181B] rounded-xl overflow-hidden relative border border-white/[0.06]">
                  {previews.ctaBannerImage ? (
                    <img src={previews.ctaBannerImage} alt="CTA Banner" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#7A7A85]"><FiImage className="w-8 h-8" /></div>
                  )}
                </div>
                <div className="relative border border-dashed border-white/[0.1] hover:border-[#B8976A]/40 rounded-xl p-3 text-center transition-colors cursor-pointer bg-[#18181B]">
                  <input type="file" accept="image/*" onChange={(e) => handleFileChange('ctaFile', e)} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                  <span className="text-xs font-subheading text-[#EAEAEA] flex items-center justify-center gap-1.5 py-1">
                    <FiUploadCloud className="w-4 h-4 text-[#B8976A]" /> Change CTA Banner Image
                  </span>
                </div>
              </div>

            </div>

            <div className="pt-6 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#B8976A] text-[#080808] font-subheading text-xs uppercase tracking-wider px-9 py-4 rounded-full font-medium hover:bg-[#D4B88A] transition-all duration-500 disabled:opacity-50 shadow-lg shadow-[#B8976A]/10"
              >
                {submitting ? 'Uploading to Cloudinary...' : 'Save & Publish Site Images'}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
