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
    <section className="section-padding bg-[#080808] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="space-y-3">
            <span className="text-xs uppercase font-subheading tracking-[0.25em] text-[#B8976A] font-medium block">
              Studio Portfolio
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[#EAEAEA] tracking-tight">
              Selected <span className="text-gradient-gold italic font-light">Works</span>
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-subheading text-xs tracking-wide px-5 py-2.5 rounded-full transition-all duration-300 ${
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredItems.slice(0, 3).map((item) => (
            <GalleryCard
              key={item._id || item.id}
              item={item}
              onOpenLightbox={(selected) => setSelectedLightboxItem(selected)}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2.5 font-subheading text-xs uppercase tracking-wider bg-white/[0.03] text-[#EAEAEA] px-9 py-4 rounded-full border border-white/[0.06] hover:border-[#B8976A]/30 hover:text-[#B8976A] transition-all duration-500"
            data-cursor="Gallery"
          >
            <span>View Complete Gallery</span>
            <FiArrowRight className="w-4 h-4" />
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
