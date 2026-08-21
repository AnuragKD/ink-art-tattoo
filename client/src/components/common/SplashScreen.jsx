import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// ─── Vite glob import for all sequence frames ──────────────────────────────
const frameModules = import.meta.glob(
  '../../assets/body-scroll-frames/img_*.jpg',
  { eager: true, import: 'default' }
);

const FRAME_URLS = Object.keys(frameModules)
  .sort()
  .map((key) => frameModules[key]);

// Additional static key images to cache
const STATIC_ASSETS = [
  '/white-logo.png',
  '/01_master_full_body.webp',
  '/intro_image.webp',
];

const ALL_ASSETS = [...STATIC_ASSETS, ...FRAME_URLS];

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(() => {
    // Check if user has already opened the site previously
    return !localStorage.getItem('inkart_assets_cached');
  });

  const [loadProgress, setLoadProgress] = useState(0);
  const splashRef = useRef(null);

  useEffect(() => {
    if (!showSplash) return;

    let isMounted = true;

    const preloadAndCacheAssets = async () => {
      let loadedCount = 0;
      const totalCount = ALL_ASSETS.length;

      // Try opening CacheStorage to permanently cache sequence assets
      let cache = null;
      if ('caches' in window) {
        try {
          cache = await caches.open('inkart-assets-v1');
        } catch (e) {
          console.warn('Cache API not available:', e);
        }
      }

      await Promise.all(
        ALL_ASSETS.map(async (url) => {
          try {
            // 1. Save to CacheStorage if supported
            if (cache) {
              const cacheMatch = await cache.match(url);
              if (!cacheMatch) {
                const response = await fetch(url);
                if (response.ok) {
                  await cache.put(url, response.clone());
                }
              }
            }
            // 2. Decode into browser memory via Image
            await new Promise((resolve) => {
              const img = new Image();
              img.src = url;
              img.onload = img.onerror = () => resolve();
            });
          } catch (err) {
            console.warn(`Asset cache skip: ${url}`, err);
          } finally {
            if (isMounted) {
              loadedCount++;
              setLoadProgress(Math.round((loadedCount / totalCount) * 100));
            }
          }
        })
      );

      if (!isMounted) return;

      // Save flag to localStorage so splash screen only shows ONCE per user
      try {
        localStorage.setItem('inkart_assets_cached', 'true');
      } catch (e) {
        console.warn('localStorage error:', e);
      }

      // Smooth curtain exit animation
      setTimeout(() => {
        if (splashRef.current) {
          gsap.to(splashRef.current, {
            opacity: 0,
            yPercent: -100,
            duration: 0.9,
            ease: 'power3.inOut',
            onComplete: () => {
              setShowSplash(false);
            },
          });
        } else {
          setShowSplash(false);
        }
      }, 150);
    };

    preloadAndCacheAssets();

    return () => {
      isMounted = false;
    };
  }, [showSplash]);

  if (!showSplash) return null;

  return (
    <div
      ref={splashRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080808] text-[#EAEAEA] select-none pointer-events-auto overflow-hidden"
    >
      {/* Ambient Radial Background Glow */}
      <div className="absolute inset-0 bg-radial from-[#B8976A]/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-sm w-full">
        {/* Studio Logo */}
        <img
          src="/white-logo.png"
          alt="Ink Art Tattoo Studio"
          className="h-14 sm:h-16 w-auto object-contain mb-5 opacity-95 animate-pulse"
        />

        {/* Title */}
        <h2 className="font-heading text-3xl sm:text-4xl tracking-tight text-[#EAEAEA]">
          Ink Art<span className="text-[#B8976A]">.</span>
        </h2>

        {/* Subheading */}
        <span className="text-[10px] sm:text-xs uppercase font-subheading tracking-[0.35em] text-[#B8976A] font-medium mt-2">
          HAUTE BODY ARTISTRY & MASTER TATTOOING
        </span>

        {/* Progress Line Container */}
        <div className="w-56 sm:w-64 h-[2px] bg-white/[0.08] relative overflow-hidden rounded-full mt-8">
          <div
            className="h-full bg-gradient-to-r from-[#B8976A] via-[#E6CA9C] to-[#B8976A] transition-all duration-150 ease-out"
            style={{ width: `${loadProgress}%` }}
          />
        </div>

        {/* Digital Percentage Counter */}
        <div className="flex items-center justify-center gap-2 mt-4 font-subheading text-xs text-[#7A7A85] tracking-widest">
          <span className="uppercase text-[11px]">Initializing Atelier</span>
          <span className="text-[#B8976A] font-medium">{loadProgress}%</span>
        </div>
      </div>
    </div>
  );
}
