import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GALLERY_ITEMS } from '../../constants/studioData';
import LightboxModal from '../ui/LightboxModal';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

export default function PortfolioMasonrySection() {
  const [selectedLightboxItem, setSelectedLightboxItem] = useState(null);
  const [galleryData, setGalleryData] = useState(GALLERY_ITEMS);
  const [activeIndex, setActiveIndex] = useState(0);

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

  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const displayData = galleryData.slice(0, 10);
  const total = displayData.length;

  // Auto-slide interval effect (advances every 3.5 seconds, pauses on hover)
  useEffect(() => {
    if (total <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3500);

    return () => clearInterval(interval);
  }, [total, isPaused]);

  const handleNext = () => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  return (
    <section className="section-padding bg-[#080808] relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 space-y-8">

        {/* Centered Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3 pb-2">
          <span className="text-xs uppercase font-subheading tracking-[0.25em] text-[#B8976A] font-medium block">
            Studio Portfolio
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#EAEAEA] tracking-tight">
            Selected <span className="text-gradient-gold italic font-light">Works</span>
          </h2>
        </div>

        {/* 3D Cover Flow Carousel Container */}
        {total > 0 ? (
          <div
            className="relative w-full py-4 sm:py-8 flex flex-col items-center justify-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >

            {/* Container-Responsive Ambient Gold Light Background Glow */}
            <div className="absolute inset-0 m-auto w-4/5 max-w-4xl h-3/4 bg-[#B8976A]/20 blur-[90px] sm:blur-[130px] rounded-full pointer-events-none z-0 animate-pulse" />
            <div className="absolute inset-0 m-auto w-1/2 max-w-xl h-1/2 bg-[#E6CA9C]/15 blur-[60px] sm:blur-[85px] rounded-full pointer-events-none z-0" />

            {/* Cards Stack — Container Responsive Aspect Box */}
            <div className="relative w-full max-w-6xl aspect-[16/12] md:aspect-[16/7] flex items-center justify-center z-10 overflow-visible">
              {displayData.map((item, index) => {
                // Shortest circular offset
                let diff = index - activeIndex;
                if (diff > total / 2) diff -= total;
                if (diff < -total / 2) diff += total;

                // Hide cards outside range: 3 cards on mobile (-1, 0, 1), 5 cards on larger screens (-2 to 2)
                const absDiff = Math.abs(diff);
                const maxRange = isMobile ? 1 : 2;
                if (absDiff > maxRange) return null;

                // Calculate 3D transforms based on percentage offset
                let xPercent = 0;
                let scale = 1;
                let zIndex = 30;
                let opacity = 1;
                let brightness = 'brightness(1)';

                if (diff === 0) {
                  // Active Center Card
                  xPercent = 0;
                  scale = 1.08;
                  zIndex = 35;
                  opacity = 1;
                  brightness = 'brightness(1)';
                } else if (diff === -1) {
                  // Left Neighbor 1
                  xPercent = isMobile ? -68 : -58;
                  scale = 0.88;
                  zIndex = 25;
                  opacity = 0.85;
                  brightness = 'brightness(0.75)';
                } else if (diff === 1) {
                  // Right Neighbor 1
                  xPercent = isMobile ? 68 : 58;
                  scale = 0.88;
                  zIndex = 25;
                  opacity = 0.85;
                  brightness = 'brightness(0.75)';
                } else if (diff === -2) {
                  // Outer Left 2
                  xPercent = -105;
                  scale = 0.72;
                  zIndex = 15;
                  opacity = 0.45;
                  brightness = 'brightness(0.5)';
                } else if (diff === 2) {
                  // Outer Right 2
                  xPercent = 105;
                  scale = 0.72;
                  zIndex = 15;
                  opacity = 0.45;
                  brightness = 'brightness(0.5)';
                }

                const isCenter = diff === 0;

                return (
                  <div
                    key={item._id || item.id || index}
                    onClick={() => {
                      if (isCenter) {
                        setSelectedLightboxItem(item);
                      } else {
                        setActiveIndex(index);
                      }
                    }}
                    className={`absolute top-1/2 left-1/2 w-[56%] md:w-[32%] lg:w-[30%] max-w-[340px] aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-out shadow-2xl border border-white/10 ${isCenter ? 'hover:border-[#B8976A]/60 hover:shadow-[#B8976A]/20' : 'hover:border-white/30'
                      }`}
                    style={{
                      transform: `translate(calc(-50% + ${xPercent}%), -50%) scale(${scale})`,
                      zIndex,
                      opacity,
                      filter: brightness,
                    }}
                    data-cursor={isCenter ? 'Inspect' : 'View'}
                  >
                    <img
                      src={item.image}
                      alt={item.title || item.category || 'Tattoo Art'}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient Overlay & Style Type Only */}
                    <div
                      className={`absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#080808]/95 via-[#080808]/50 to-transparent flex items-end p-5 sm:p-6 transition-opacity duration-300 ${isCenter ? 'opacity-100' : 'opacity-0 hover:opacity-100'
                        }`}
                    >
                      <span className="font-heading text-md md:xl sm:text-2xl text-[#EAEAEA] tracking-wide font-light">
                        {item.category}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Circular Navigation Buttons below Carousel */}
            <div className="flex items-center justify-center gap-4 pt-6 z-30">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border border-white/20 bg-white/[0.03] text-[#EAEAEA] hover:bg-[#B8976A] hover:text-[#080808] hover:border-[#B8976A] transition-all duration-300 flex items-center justify-center shadow-lg active:scale-95"
                aria-label="Previous image"
                data-cursor="Prev"
              >
                <FiArrowLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full border border-white/20 bg-white/[0.03] text-[#EAEAEA] hover:bg-[#B8976A] hover:text-[#080808] hover:border-[#B8976A] transition-all duration-300 flex items-center justify-center shadow-lg active:scale-95"
                aria-label="Next image"
                data-cursor="Next"
              >
                <FiArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Centered View All Works Action Button */}
            <div className="pt-6 text-center z-30">
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2.5 font-subheading text-xs uppercase tracking-wider bg-white/[0.03] text-[#EAEAEA] px-8 py-3.5 rounded-full border border-white/[0.08] hover:border-[#B8976A]/40 hover:text-[#B8976A] hover:bg-white/[0.06] transition-all duration-500 shadow-lg"
                data-cursor="Gallery"
              >
                <span>View All Works</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        ) : (
          <div className="text-center py-12 text-[#7A7A85] font-subheading text-sm">
            No gallery items available.
          </div>
        )}

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
