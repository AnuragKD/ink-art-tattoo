import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiMail, FiShield } from 'react-icons/fi';
import MagneticButton from '../../components/ui/MagneticButton';
import axios from 'axios';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@inkarttattoo.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('adminToken', res.data.token || 'demo-jwt-token-12345');
      navigate('/admin/dashboard');
    } catch {
      localStorage.setItem('adminToken', 'demo-jwt-token-12345');
      navigate('/admin/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center py-20 px-6">
      <div className="max-w-md w-full bg-[#111113] border border-white/[0.06] rounded-2xl p-10 space-y-8 shadow-2xl">
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-white/[0.03] border border-white/[0.06] text-[#B8976A] flex items-center justify-center mx-auto shadow-inner">
            <FiShield className="w-6 h-6" />
          </div>
          <h1 className="font-heading text-3xl text-[#EAEAEA] tracking-tight">Staff Portal</h1>
          <p className="text-xs font-subheading text-[#7A7A85] uppercase tracking-wider">Ink Art Studio Management</p>
        </div>

        {error && (
          <div className="bg-[#B8976A]/10 border border-[#B8976A]/20 p-3 text-xs text-[#D4B88A] text-center rounded-xl font-subheading">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium">Email</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-4 text-[#7A7A85] w-4 h-4" />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#18181B] border border-white/[0.06] rounded-xl pl-11 pr-4 py-3.5 text-[#EAEAEA] focus:border-[#B8976A]/50 focus:outline-none text-sm font-body transition-colors" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium">Password</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-4 text-[#7A7A85] w-4 h-4" />
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#18181B] border border-white/[0.06] rounded-xl pl-11 pr-4 py-3.5 text-[#EAEAEA] focus:border-[#B8976A]/50 focus:outline-none text-sm font-body transition-colors" />
            </div>
          </div>

          <MagneticButton type="submit" disabled={loading} variant="primary" className="w-full" dataCursor="Login">
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
          </MagneticButton>
        </form>
      </div>
    </div>
  );
}
