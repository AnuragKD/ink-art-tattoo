import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiUser, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import MagneticButton from '../../components/ui/MagneticButton';
import axios from 'axios';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post('/api/auth/login', { username, password });
      if (res.data && res.data.token) {
        localStorage.setItem('adminToken', res.data.token);
        navigate('/admin/dashboard');
      } else {
        setError('Login failed. Invalid response from server.');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid username or password. Access denied.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden select-none">
      
      {/* Fixed Studio Logo Background Watermark */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden opacity-[0.035] select-none">
        <img
          src="/white-logo.png"
          alt="Ink Art Studio Background Logo"
          className="w-[600px] sm:w-[850px] max-w-full object-contain"
        />
      </div>

      {/* Ambient Stage Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] bg-[#B8976A]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full bg-[#111113]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-6 sm:p-10 space-y-8 shadow-2xl relative z-10">
        
        {/* Portal Header with Studio Logo */}
        <div className="text-center space-y-3">
          <img
            src="/white-logo.png"
            alt="Ink Art Studio Logo"
            className="h-16 sm:h-20 w-auto object-contain mx-auto transition-transform duration-300 hover:scale-105"
          />
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl text-[#EAEAEA] tracking-tight">Staff Portal</h1>
            <p className="text-xs font-subheading text-[#7A7A85] uppercase tracking-widest mt-1">Ink Art Studio Management</p>
          </div>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="bg-[#B8976A]/10 border border-[#B8976A]/30 p-3.5 text-xs text-[#D4B88A] rounded-xl font-subheading flex items-center gap-2.5 shadow-md animate-fade-in">
            <FiAlertCircle className="w-4 h-4 shrink-0 text-[#B8976A]" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium block">
              Username
            </label>
            <div className="relative">
              <FiUser className="absolute left-4 top-4 text-[#7A7A85] w-4 h-4" />
              <input
                type="text"
                required
                placeholder="Enter username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#18181B] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3.5 text-[#EAEAEA] placeholder-[#555] focus:border-[#B8976A]/60 focus:outline-none text-sm font-body transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium block">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-4 top-4 text-[#7A7A85] w-4 h-4" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#18181B] border border-white/[0.08] rounded-xl pl-11 pr-11 py-3.5 text-[#EAEAEA] placeholder-[#555] focus:border-[#B8976A]/60 focus:outline-none text-sm font-body transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-[#7A7A85] hover:text-[#EAEAEA] transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
              </button>
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
