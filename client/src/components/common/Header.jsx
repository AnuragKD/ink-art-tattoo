import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { STUDIO_INFO } from '../../constants/studioData';
import { FiMenu, FiX, FiCalendar, FiPhone } from 'react-icons/fi';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === '/') {
        const animSection = document.getElementById('scroll-anim-section');
        if (animSection) {
          const rect = animSection.getBoundingClientRect();
          setIsScrolled(rect.bottom <= 100);
        } else {
          setIsScrolled(window.scrollY > 40);
        }
      } else {
        setIsScrolled(window.scrollY > 40);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [location.pathname]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Styles', path: '/styles' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ease-out ${
          isScrolled
            ? 'bg-[#080808]/80 backdrop-blur-2xl py-4'
            : 'bg-transparent py-6 sm:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 flex items-center justify-between">
          
          {/* Studio Brand */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            data-cursor="Ink Art"
          >
            <img 
              src="/white-logo.png" 
              alt="Ink Art Tattoo Logo" 
              className="h-8 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-heading text-2xl sm:text-3xl tracking-tight text-[#EAEAEA] group-hover:text-[#B8976A] transition-colors duration-500">
              Ink Art<span className="text-[#B8976A]">.</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-10 xl:gap-12">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative font-subheading text-[13px] tracking-wide transition-colors duration-300 py-2 ${
                    isActive ? 'text-[#EAEAEA]' : 'text-[#7A7A85] hover:text-[#EAEAEA]'
                  }`}
                  data-cursor="Navigate"
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-[#B8976A] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Button */}
          <div className="hidden lg:flex items-center">
            <a
              href={`https://wa.me/${STUDIO_INFO.contact.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              data-cursor="WhatsApp"
              className="inline-flex items-center gap-2.5 font-subheading text-[13px] font-medium tracking-wide bg-[#B8976A] text-[#080808] px-7 py-3 rounded-full hover:bg-[#D4B88A] transition-all duration-500 hover:shadow-lg hover:shadow-[#B8976A]/10"
            >
              <FiCalendar className="w-4 h-4" />
              <span>Book Now</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 text-[#EAEAEA] hover:text-[#B8976A] focus:outline-none transition-colors"
            aria-label="Toggle menu"
            data-cursor="Menu"
          >
            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-30 bg-[#080808]/98 backdrop-blur-3xl lg:hidden flex flex-col justify-center items-center overflow-y-auto"
          >
            <div className="flex flex-col items-center space-y-8">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * idx, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={link.path}
                    className={`font-heading text-4xl sm:text-5xl tracking-tight block text-center ${
                      location.pathname === link.path ? 'text-[#B8976A]' : 'text-[#EAEAEA] hover:text-[#B8976A]'
                    } transition-colors duration-300`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-14 flex flex-col items-center gap-5"
            >
              <a
                href={`https://wa.me/${STUDIO_INFO.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#B8976A] text-[#080808] font-subheading text-sm font-medium py-4 px-10 rounded-full tracking-wide"
              >
                <FiCalendar className="w-4 h-4" />
                Book Now
              </a>

              <a href={`tel:${STUDIO_INFO.contact.phone}`} className="flex items-center gap-2 text-[#7A7A85] text-sm font-subheading hover:text-[#EAEAEA] transition-colors">
                <FiPhone className="w-4 h-4 text-[#B8976A]" />
                {STUDIO_INFO.contact.phone}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
