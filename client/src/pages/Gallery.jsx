import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GALLERY_ITEMS } from '../constants/studioData';
import LightboxModal from '../components/ui/LightboxModal';
import BookingCTASection from '../components/sections/BookingCTASection';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedLightboxItem, setSelectedLightboxItem] = useState(null);
  const [galleryData, setGalleryData] = useState(GALLERY_ITEMS);
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/gallery');
      let items = galleryData;
      if (res.data && res.data.data && res.data.data.length > 0) {
        items = res.data.data;
        setGalleryData(items);
      }

      // Only display category tabs if at least 1 gallery artwork exists for that style
      const activeCategories = Array.from(
        new Set(items.map((i) => i.category).filter(Boolean))
      );

      setCategories(['All', ...activeCategories]);
    } catch (err) {
      console.warn('Using default gallery items:', err);
      const activeCategories = Array.from(
        new Set(galleryData.map((i) => i.category).filter(Boolean))
      );
      setCategories(['All', ...activeCategories]);
    }
  };

  const filteredItems = activeCategory === 'All'
    ? galleryData
    : galleryData.filter((item) => item.category === activeCategory);

  return (
    <div className="pt-36 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <span className="text-xs uppercase font-subheading tracking-[0.25em] text-[#B8976A] font-medium block">
            Studio Portfolio
          </span>
          <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl text-[#EAEAEA] tracking-tight leading-tight">
            Curated <span className="text-gradient-gold italic font-light">Gallery</span>
          </h1>
          <p className="text-base sm:text-lg font-body text-[#7A7A85] leading-relaxed font-light">
            High-resolution inspection of completed tattoos. Filter by your preferred style below.
          </p>

          {/* Dynamic Filter Pills — Only rendered for styles with uploaded artwork */}
          {categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2.5 pt-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-subheading text-xs tracking-wide px-6 py-2.5 rounded-full transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-[#B8976A] text-[#080808] font-medium'
                      : 'bg-white/[0.03] text-[#7A7A85] hover:text-[#EAEAEA] border border-white/[0.06]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Pinterest Column Masonry Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center text-[#7A7A85] font-subheading text-sm">
            No artwork found in this category.
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
            {filteredItems.map((item) => {
              const itemId = item._id || item.id;
              return (
                <div key={itemId} className="break-inside-avoid mb-6">
                  <div
                    onClick={() => setSelectedLightboxItem(item)}
                    className="group relative bg-[#111113] border border-white/[0.06] rounded-2xl overflow-hidden cursor-pointer hover:border-[#B8976A]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-black/60"
                    data-cursor="Inspect"
                  >
                    <div className="relative overflow-hidden bg-[#18181B]">
                      <img
                        src={item.image}
                        alt={item.category || 'Tattoo Art'}
                        className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      
                      {/* Bottom Gradient Shade on Hover */}
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#080808]/90 via-[#080808]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                        <span className="font-heading text-2xl text-[#EAEAEA] tracking-wide font-light">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {selectedLightboxItem && (
        <LightboxModal
          item={selectedLightboxItem}
          onClose={() => setSelectedLightboxItem(null)}
        />
      )}

      <div className="mt-20">
        <BookingCTASection />
      </div>
    </div>
  );
}
