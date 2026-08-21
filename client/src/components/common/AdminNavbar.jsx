import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiLogOut, FiMenu, FiX, FiCalendar, FiUsers, FiFeather, FiImage, FiInstagram, FiHome } from 'react-icons/fi';

export default function AdminNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: FiHome },
    { label: 'Enquiries', path: '/admin/bookings', icon: FiCalendar },
    { label: 'Artists', path: '/admin/artists', icon: FiUsers },
    { label: 'Styles', path: '/admin/styles', icon: FiFeather },
    { label: 'Gallery', path: '/admin/gallery', icon: FiImage },
    { label: 'Instagram', path: '/admin/instagram', icon: FiInstagram },
  ];

  return (
    <>
      {/* Fixed Studio Logo Background Watermark across Admin Portal */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden opacity-[0.035] select-none">
        <img
          src="/white-logo.png"
          alt="Ink Art Studio Background Logo"
          className="w-[550px] sm:w-[800px] max-w-full object-contain"
        />
      </div>

      <nav className="bg-[#111113]/90 border-b border-white/[0.08] backdrop-blur-xl sticky top-0 z-50 text-[#EAEAEA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Logo & Title */}
            <Link to="/admin/dashboard" className="flex items-center gap-3.5 group">
              <img
                src="/white-logo.png"
                alt="Ink Art Studio Logo"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div>
                <span className="text-[10px] uppercase font-subheading tracking-[0.25em] text-[#B8976A] font-medium block">
                  Staff Portal
                </span>
                <span className="font-heading text-lg sm:text-xl text-[#EAEAEA] tracking-tight font-normal">
                  Ink Art Atelier
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1.5 bg-[#18181B] p-1.5 rounded-full border border-white/[0.06]">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-subheading uppercase tracking-wider transition-all duration-300 ${
                      isActive
                        ? 'bg-[#B8976A] text-[#080808] font-medium shadow-md'
                        : 'text-[#7A7A85] hover:text-[#EAEAEA] hover:bg-white/[0.04]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Desktop Logout Button */}
            <div className="hidden lg:flex items-center">
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 font-subheading text-xs uppercase tracking-wider bg-white/[0.04] border border-white/[0.08] text-[#EAEAEA] px-5 py-2.5 rounded-full hover:border-[#B8976A]/40 hover:text-[#B8976A] transition-all duration-300"
              >
                <FiLogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#EAEAEA] hover:text-[#B8976A] transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Slide-down Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/[0.08] bg-[#0D0D0F] px-4 pt-4 pb-6 space-y-2 animate-fade-in">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-subheading uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'bg-[#B8976A]/15 text-[#B8976A] border border-[#B8976A]/30 font-medium'
                      : 'text-[#7A7A85] hover:text-[#EAEAEA] hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#B8976A]" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <div className="pt-2 border-t border-white/[0.06]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center justify-center gap-2 font-subheading text-xs uppercase tracking-wider bg-white/[0.04] border border-white/[0.08] text-[#EAEAEA] py-3 rounded-xl hover:text-[#B8976A] transition-colors"
              >
                <FiLogOut className="w-4 h-4 text-[#B8976A]" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
