import React from 'react';
import { Link } from 'react-router-dom';
import MagneticButton from '../components/ui/MagneticButton';
import { FiHome, FiAlertOctagon } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center pt-24 pb-16 px-6">
      <div className="text-center space-y-8 max-w-lg">
        <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto text-[#B8976A]">
          <FiAlertOctagon className="w-9 h-9" />
        </div>
        <h1 className="font-heading text-8xl text-white/[0.1] tracking-tight font-light">
          404
        </h1>
        <div className="space-y-3">
          <h2 className="font-heading text-4xl text-[#EAEAEA] tracking-tight">
            Page Not Found
          </h2>
          <p className="text-base font-body text-[#7A7A85] font-light">
            The requested page or gallery link could not be located.
          </p>
        </div>

        <div className="pt-4">
          <Link to="/">
            <MagneticButton variant="primary" dataCursor="Home">
              <FiHome className="w-4 h-4" />
              <span>Return to Studio Home</span>
            </MagneticButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
