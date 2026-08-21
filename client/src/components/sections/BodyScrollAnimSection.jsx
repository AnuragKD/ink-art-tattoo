import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight, FiMessageCircle, FiShield, FiFeather, FiCpu, FiPhone, FiInstagram, FiFacebook } from 'react-icons/fi';
import { STUDIO_INFO } from '../../constants/studioData';
import MagneticButton from '../ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

// ─── Vite glob import — resolves hashed asset URLs through Vite's pipeline ───
const frameModules = import.meta.glob(
  '../../assets/body-scroll-frames/img_*.jpg',
  { eager: true, import: 'default' }
);

// Sort keys so frames are in order: img_00001 → img_00051
// Start sequence from the 5th image (img_00005) per user request
const FRAME_URLS = Object.keys(frameModules)
  .sort()
  .map((key) => frameModules[key])
  .slice(4);

const TOTAL_FRAMES = FRAME_URLS.length;

// ─── WhatsApp URL ─────────────────────────────────────────────────────────────
const whatsappMessage = encodeURIComponent(
  'Hello Ink Art Tattoo Studio! I would like to inquire about a custom tattoo design.'
);
const whatsappUrl = `https://wa.me/${STUDIO_INFO.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

// ─── Scroll phase timings ─────────────────────────────────────────────────────
// Phase 1 — Hero:     fade OUT  0→12 %
// Phase 2 — Intro:    fade IN 18→28 %  · hold 28→30 %  · fade OUT 30→40 %
// Phase 3 — Features: fade IN 30→40 %  (crossfades with intro)  · hold 40→52 %  · fade OUT 52→62 %
// All transitions use 10 % windows — identical feel to the fade-in.
const HERO_FADE_START = '0% top';
const HERO_FADE_END = '12% top';
const INTRO_FADE_IN_S = '18% top';
const INTRO_FADE_IN_E = '28% top';
const INTRO_FADE_OUT_S = '30% top';   // intro starts fading out here
const INTRO_FADE_OUT_E = '30% top';   // fully gone here
const FEAT_FADE_IN_START = '30% top';   // features start fading in at same moment
const FEAT_FADE_IN_END = '40% top';   // fully visible when intro is fully gone
const FEAT_FADE_OUT_START = '52% top';
const FEAT_FADE_OUT_END = '62% top';



// ─── Feature card data ────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: FiShield,
    title: 'Medical Safety',
    description: 'Single-use EO sterilized needles and sealed barrier films opened in your presence.',
  },
  {
    icon: FiFeather,
    title: 'Bespoke Design',
    description: 'Custom-sculpted artwork tailored to your anatomy, skin tone, and vision.',
  },
  {
    icon: FiCpu,
    title: 'Precision Craft',
    description: '1RL single-needle detail and smooth shading techniques perfected over a decade.',
  },
];

export default function BodyScrollAnimSection() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const canvasRef = useRef(null);
  const heroContentRef = useRef(null);  // hero text children (entry animation)
  const heroOverlayRef = useRef(null);  // entire hero block (scroll fade-out)
  const introOverlayRef = useRef(null);  // intro text block (scroll fade-in → fade-out)
  const featOverlayRef = useRef(null);  // features block  (scroll fade-in → fade-out)
  const frameIdxRef = useRef(0);
  const imagesRef = useRef([]);
  const ctxRef = useRef(null);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // ─── Draw helpers ────────────────────────────────────────────────────────────
  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    const images = imagesRef.current;
    if (!canvas || !ctxRef.current || !images[index]?.complete) return;

    const ctx = ctxRef.current;
    const img = images[index];
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;
    if (!iw || !ih) return;

    // Cover-fit: fills canvas while preserving aspect ratio
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const ox = (cw - dw) / 2;
    const oy = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, ox, oy, dw, dh);
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctxRef.current = canvas.getContext('2d');
    drawFrame(frameIdxRef.current);
  };

  // ─── Preload all frames ───────────────────────────────────────────────────────
  useEffect(() => {
    let loaded = 0;
    const images = [];
    imagesRef.current = images;

    FRAME_URLS.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = img.onerror = () => {
        loaded++;
        const progressPct = Math.round((loaded / TOTAL_FRAMES) * 100);
        setLoadProgress(progressPct);
        if (loaded === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };
      images.push(img);
    });
  }, []);

  // ─── On load: paint frame 0 + hero text entry animation ─────────────────────
  useEffect(() => {
    if (!isLoaded) return;

    const t = setTimeout(() => {
      resizeCanvas();

      // Stagger hero text elements into view
      if (heroContentRef.current) {
        gsap.fromTo(
          heroContentRef.current.children,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.4, stagger: 0.2, ease: 'power3.out' }
        );
      }
    }, 50);

    return () => clearTimeout(t);
  }, [isLoaded]);

  // ─── GSAP ScrollTrigger: frames + layered text transitions ────────────────────
  useEffect(() => {
    if (!isLoaded) return;

    const setup = setTimeout(() => {
      resizeCanvas();
      ScrollTrigger.refresh();

      const ctx = gsap.context(() => {
        const proxy = { frame: 0 };

        // ── 1. Hero text: fade out ────────────────────────────────────────────
        gsap.to(heroOverlayRef.current, {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: HERO_FADE_START,
            end: HERO_FADE_END,
            scrub: true,
          },
        });

        // ── 2. Intro text: single timeline owns full lifecycle ─────────────────
        //    Scroll span: 18 %→40 % = 22 units total
        //    fade-in: 10 u (18→28), hold: 2 u (28→30), fade-out: 10 u (30→40)
        const introTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: INTRO_FADE_IN_S,   // '18% top'
            end: INTRO_FADE_OUT_E,  // '40% top'
            scrub: true,
          },
        });
        introTl
          .fromTo(
            introOverlayRef.current,
            { opacity: 0, y: 24, immediateRender: false },
            { opacity: 1, y: 0, ease: 'power2.out', duration: 10 }
          )
          .to(introOverlayRef.current, { opacity: 1, duration: 2 })       // hold
          .to(introOverlayRef.current, { opacity: 0, ease: 'power2.in', duration: 10 }); // fade out

        // ── 3. Features: single timeline owns full lifecycle ──────────────────
        //    Scroll span: 30 %→62 % = 32 units total
        //    fade-in: 10 u (30→40), hold: 12 u (40→52), fade-out: 10 u (52→62)
        const featTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: FEAT_FADE_IN_START,  // '30% top'
            end: FEAT_FADE_OUT_END,   // '62% top'
            scrub: true,
          },
        });
        featTl
          .fromTo(
            featOverlayRef.current,
            { opacity: 0, y: 16, immediateRender: false },
            { opacity: 1, y: 0, ease: 'power2.out', duration: 10 }
          )
          .to(featOverlayRef.current, { opacity: 1, duration: 12 })       // hold
          .to(featOverlayRef.current, { opacity: 0, ease: 'power2.in', duration: 10 }); // fade out

        // ── 4. Frame scrub across entire section height ────────────────────────
        gsap.to(proxy, {
          frame: TOTAL_FRAMES - 1,
          snap: 'frame',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
            onUpdate: () => {
              const idx = Math.round(proxy.frame);
              if (idx !== frameIdxRef.current) {
                frameIdxRef.current = idx;
                drawFrame(idx);
              }
            },
          },
        });
      }, sectionRef);

      // Cleanup: revert context on unmount / effect re-run
      return () => ctx.revert();

    }, 200);

    return () => clearTimeout(setup);
  }, [isLoaded]);

  // ─── Window resize handler ─────────────────────────────────────────────────────
  useEffect(() => {
    const onResize = () => {
      resizeCanvas();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isLoaded]);

  return (
    <section
      ref={sectionRef}
      id="scroll-anim-section"
      className="relative"
      style={{ height: `calc(100vh + ${TOTAL_FRAMES * 18}px)` }}
    >
      {/* ── Sticky viewport: stays pinned while parent section scrolls ─────── */}
      <div
        ref={stickyRef}
        className="sticky top-0 left-0 w-full overflow-hidden bg-[#080808]"
        style={{ height: '100vh' }}
      >

        {/* ── Canvas ─────────────────────────────────────────────────────────── */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{
            display: isLoaded ? 'block' : 'none',
            filter: 'brightness(0.9)',
          }}
        />

        {/* ── Gradient overlays — always visible over canvas ─────────────────── */}
        {isLoaded && (
          <>
            {/* Linear: dark bottom, semi-dark mid, lighter top */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/30 to-[#080808]/40 z-10 pointer-events-none" />
            {/* Radial: vignette from edges */}
            <div className="absolute inset-0 bg-radial from-transparent via-[#080808]/30 to-[#080808] z-10 pointer-events-none" />
          </>
        )}



        {/* ════════════════════════════════════════════════════════════════════
            PHASE 1 — Hero overlay
            Appears on load with entry animation, fades out as scroll begins.
            Layout + styling identical to the original HeroSection.
        ════════════════════════════════════════════════════════════════════ */}
        <div
          ref={heroOverlayRef}
          className="absolute inset-0 z-20 flex flex-col justify-between pt-32 pb-16 select-none text-[#EAEAEA]"
          style={{ opacity: isLoaded ? 1 : 0 }}
        >
          {/* Left Vertical Element — Phone Number (White, fades out with hero) */}
          <div className="hidden lg:flex absolute left-6 sm:left-8 lg:left-12 top-1/2 -translate-y-1/2 flex-col items-center gap-4 text-white z-30 pointer-events-auto">
            <a
              href={`tel:${STUDIO_INFO.contact.phone}`}
              className="text-white hover:text-white/80 transition-colors duration-300 p-1"
              data-cursor="Call"
              aria-label="Call studio"
            >
              <FiPhone className="w-4 h-4 text-white" />
            </a>
            <div className="w-[1px] h-8 bg-white/30" />
            <a
              href={`tel:${STUDIO_INFO.contact.phone}`}
              className="font-subheading text-[11px] uppercase tracking-[0.25em] text-white hover:text-white/80 transition-colors duration-300 whitespace-nowrap [writing-mode:vertical-rl] rotate-180"
              data-cursor="Call"
            >
              {STUDIO_INFO.contact.phone}
            </a>
          </div>

          {/* Right Vertical Element — Social Media (White, fades out with hero) */}
          <div className="hidden lg:flex absolute right-6 sm:right-8 lg:right-12 top-1/2 -translate-y-1/2 flex-col items-center gap-5 text-white z-30 pointer-events-auto">
            <a
              href={STUDIO_INFO.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-white/80 transition-colors duration-300 p-1"
              data-cursor="Instagram"
              aria-label="Instagram"
            >
              <FiInstagram className="w-4 h-4 text-white" />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-white/80 transition-colors duration-300 p-1"
              data-cursor="WhatsApp"
              aria-label="WhatsApp"
            >
              <FiMessageCircle className="w-4 h-4 text-white" />
            </a>
            <a
              href={STUDIO_INFO.socials.facebook}
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-white/80 transition-colors duration-300 p-1"
              data-cursor="Facebook"
              aria-label="Facebook"
            >
              <FiFacebook className="w-4 h-4 text-white" />
            </a>
            <div className="w-[1px] h-8 bg-white/30" />
            <span className="font-subheading text-[10px] uppercase tracking-[0.25em] text-white/80 [writing-mode:vertical-rl]">
              Follow Us
            </span>
          </div>

          {/* Hero text + CTAs — centred */}
          <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-10 my-auto py-5 flex flex-col items-center text-center">
            <div ref={heroContentRef} className="max-w-4xl space-y-8 flex flex-col items-center">

              <span className="text-xs uppercase font-subheading tracking-[0.3em] text-[#B8976A] font-medium block">
                Nileshwaram · Kasaragod
              </span>

              <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-8xl tracking-tight text-[#EAEAEA] leading-[1.05] font-normal">
                Precision ink for the
                <br />
                <span className="italic font-light text-gradient-gold">discerning collector.</span>
              </h1>

              {/* CTA buttons */}
              <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  <MagneticButton variant="primary" dataCursor="WhatsApp">
                    <FiMessageCircle className="w-4 h-4" />
                    <span>Book Consultation</span>
                  </MagneticButton>
                </a>
                <Link to="/styles">
                  <MagneticButton variant="secondary" dataCursor="Explore">
                    <span>Explore Styles</span>
                    <FiArrowRight className="w-4 h-4" />
                  </MagneticButton>
                </Link>
              </div>

            </div>
          </div>

          {/* Scroll indicator — bottom */}
          <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-10 flex items-center justify-center pt-8">
            <div className="flex flex-col items-center gap-3 text-xs font-subheading tracking-widest text-[#7A7A85]">
              <span className="uppercase text-[11px]">Scroll</span>
              <div className="w-[1px] h-8 bg-gradient-to-b from-[#B8976A] to-transparent animate-pulse" />
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            PHASE 2 — Intro text overlay
            Starts invisible (opacity:0). GSAP fades it IN then OUT during scroll.
            Content: "Sanctuary of Fine Art / Where artistry meets / permanent craft."
            Positioned bottom-left to feel editorial and distinct from the centred hero.
        ════════════════════════════════════════════════════════════════════ */}
        <div
          ref={introOverlayRef}
          className="absolute inset-0 z-20 flex flex-col justify-end pb-20 select-none pointer-events-none"
          style={{ opacity: 0 }}   // GSAP fully controls opacity
        >
          <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-10">
            <div className="max-w-xl space-y-5">

              {/* Eyebrow label */}
              <span className="text-xs uppercase font-subheading tracking-[0.25em] text-[#B8976A] font-medium block">
                Sanctuary of Fine Art
              </span>

              {/* Main heading */}
              <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[#EAEAEA] tracking-tight leading-[1.1]">
                Where artistry meets
                <br />
                <span className="text-gradient-gold italic font-light">permanent craft.</span>
              </h2>

              {/* Body paragraph — same as IntroSection */}
              <p className="text-sm sm:text-base font-body text-[#7A7A85] leading-relaxed font-light max-w-md pt-1">
                Founded in 2014, Ink Art Tattoo Studio elevated body art into a private atelier experience.
                We work strictly by appointment, providing a serene, unhurried space for artistic creation.
              </p>

              {/* Discover link */}
              <Link
                to="/about"
                className="inline-flex items-center gap-2 font-subheading text-xs uppercase tracking-widest text-[#B8976A] hover:text-[#D4B88A] transition-colors duration-300 pointer-events-auto"
                data-cursor="Read"
              >
                <span>Discover Our Ethos</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </Link>

            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            PHASE 3 — Features overlay
            Appears on the RIGHT side, bottom-right corner.
            Fades IN after intro text exits, fades OUT near section end.
            Three feature cards: Medical Safety · Bespoke Design · Precision Craft
        ════════════════════════════════════════════════════════════════════ */}
        <div
          ref={featOverlayRef}
          className="absolute inset-0 z-20 flex flex-col justify-end pb-16 sm:pb-20 select-none pointer-events-none"
          style={{ opacity: 0 }}
        >
          <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-10 flex justify-end">
            <div className="w-full max-w-sm space-y-6">

              {FEATURES.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="flex items-start gap-4 group">
                    {/* Icon badge */}
                    <div className="shrink-0 w-9 h-9 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-[#B8976A] mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    {/* Text */}
                    <div className="space-y-1">
                      <h3 className="font-subheading text-md font-medium text-[#EAEAEA] leading-snug">
                        {feature.title}
                      </h3>
                      <p className="text-sm font-body text-[#7A7A85] leading-relaxed font-light">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
