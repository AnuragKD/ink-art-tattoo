import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocation } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }) {
  const location = useLocation();

  useEffect(() => {
    // Instantiate Lenis for smooth mouse wheel scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Synchronize Lenis scroll updates with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Named ticker callback so GSAP can properly unregister on cleanup
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Immediate scroll to top on route change
    lenis.scrollTo(0, { immediate: true });

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, [location.pathname]);

  return <>{children}</>;
}
