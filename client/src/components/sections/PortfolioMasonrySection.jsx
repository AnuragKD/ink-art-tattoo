import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GALLERY_ITEMS } from '../../constants/studioData';
import GalleryCard from '../cards/GalleryCard';
import LightboxModal from '../ui/LightboxModal';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

export default function PortfolioMasonrySection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedLightboxItem, setSelectedLightboxItem] = useState(null);
  const [galleryData, setGalleryData] = useState(GALLERY_ITEMS);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await axios.get('/api/gallery');
      if (res.data && res.data.data && res.data.data.length > 0) {
        setGalleryData(res.data.data);
      }
    } catch (err) {
      console.warn('Using default gallery items:', err);
    }
  };

  const categories = ['All', 'Micro-Realism', 'Fine Line', 'Irezumi', 'Trash Polka'];

  const filteredItems = activeCategory === 'All'
    ? galleryData
    : galleryData.filter((item) => item.category === activeCategory);

  return (
    <section className="py-12 lg:py-16 bg-[#080808] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 lg:mb-10 gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-subheading tracking-[0.25em] text-[#B8976A] font-medium block">
              Studio Portfolio
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#EAEAEA] tracking-tight">
              Selected <span className="text-gradient-gold italic font-light">Works</span>
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-subheading text-xs tracking-wide px-4 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-[#B8976A] text-[#080808] font-medium'
                    : 'bg-white/[0.03] text-[#7A7A85] hover:text-[#EAEAEA] border border-white/[0.06]'
                }`}
                data-cursor="Filter"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Homepage Asymmetric Compact Gallery Grid */}
        {filteredItems.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
            
            {/* Left Big Feature Image */}
            {filteredItems[0] && (
              <div className="lg:col-span-7 flex">
                <GalleryCard
                  item={filteredItems[0]}
                  onOpenLightbox={(selected) => setSelectedLightboxItem(selected)}
                  aspectClassName="h-full min-h-[300px] lg:min-h-[420px] lg:max-h-[440px]"
                />
              </div>
            )}

            {/* Right Column: 2 Compact Stacked Images */}
            <div className="lg:col-span-5 flex flex-col gap-5 justify-between">
              {filteredItems[1] && (
                <div className="flex-1">
                  <GalleryCard
                    item={filteredItems[1]}
                    onOpenLightbox={(selected) => setSelectedLightboxItem(selected)}
                    aspectClassName="h-full min-h-[140px] lg:min-h-[198px] lg:max-h-[210px]"
                  />
                </div>
              )}

              {filteredItems[2] && (
                <div className="flex-1">
                  <GalleryCard
                    item={filteredItems[2]}
                    onOpenLightbox={(selected) => setSelectedLightboxItem(selected)}
                    aspectClassName="h-full min-h-[140px] lg:min-h-[198px] lg:max-h-[210px]"
                  />
                </div>
              )}
            </div>

          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 font-subheading text-xs uppercase tracking-wider bg-white/[0.03] text-[#EAEAEA] px-8 py-3 rounded-full border border-white/[0.06] hover:border-[#B8976A]/30 hover:text-[#B8976A] transition-all duration-500"
            data-cursor="Gallery"
          >
            <span>View Complete Gallery</span>
            <FiArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {selectedLightboxItem && (
        <LightboxModal
          item={selectedLightboxItem}
          onClose={() => setSelectedLightboxItem(null)}
        />
      )}
    </section>
  );
}
