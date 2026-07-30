import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import TattooStyles from '../pages/TattooStyles';
import Gallery from '../pages/Gallery';
import FAQs from '../pages/FAQs';
import Contact from '../pages/Contact';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import Terms from '../pages/Terms';
import NotFound from '../pages/NotFound';

import AdminLogin from '../pages/admin/AdminLogin';
import Dashboard from '../pages/admin/Dashboard';
import ManageBookings from '../pages/admin/ManageBookings';
import ManageArtists from '../pages/admin/ManageArtists';
import ManageGallery from '../pages/admin/ManageGallery';
import ManageStyles from '../pages/admin/ManageStyles';
import ManageSettings from '../pages/admin/ManageSettings';
import ManageInstagram from '../pages/admin/ManageInstagram';

const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/artists" element={<Navigate to="/about" replace />} />
      <Route path="/artists/:id" element={<Navigate to="/about" replace />} />
      <Route path="/styles" element={<TattooStyles />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/booking" element={<Navigate to="/contact" replace />} />
      <Route path="/reviews" element={<Navigate to="/contact" replace />} />
      <Route path="/faqs" element={<FAQs />} />
      <Route path="/blog" element={<Navigate to="/contact" replace />} />
      <Route path="/blog/:slug" element={<Navigate to="/contact" replace />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<Terms />} />

      {/* Staff Admin Portal */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedAdminRoute>
            <Dashboard />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/bookings"
        element={
          <ProtectedAdminRoute>
            <ManageBookings />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/artists"
        element={
          <ProtectedAdminRoute>
            <ManageArtists />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/styles"
        element={
          <ProtectedAdminRoute>
            <ManageStyles />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/gallery"
        element={
          <ProtectedAdminRoute>
            <ManageGallery />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/instagram"
        element={
          <ProtectedAdminRoute>
            <ManageInstagram />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <ProtectedAdminRoute>
            <ManageSettings />
          </ProtectedAdminRoute>
        }
      />

      {/* 404 Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
