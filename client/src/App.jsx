import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import LenisProvider from './components/common/LenisProvider';
import NoiseBackground from './components/ui/NoiseBackground';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AppRoutes from './routes/AppRoutes';

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <LenisProvider>
      <div className="min-h-screen bg-[#080808] text-[#EAEAEA] selection:bg-[#B8976A]/30 selection:text-white relative">
        <NoiseBackground />
        
        {!isAdminRoute && <Header />}
        
        <main className="relative z-10">
          <AppRoutes />
        </main>

        {!isAdminRoute && <Footer />}
      </div>
    </LenisProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
