import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FiCalendar, FiUsers, FiImage, FiLogOut, FiFeather, FiInstagram } from 'react-icons/fi';

export default function Dashboard() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [galleryCount, setGalleryCount] = useState(0);
  const [artistCount, setArtistCount] = useState(1);
  const [styleCount, setStyleCount] = useState(4);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [bookingsRes, galleryRes, artistsRes, stylesRes] = await Promise.allSettled([
        axios.get('/api/bookings'),
        axios.get('/api/gallery'),
        axios.get('/api/artists'),
        axios.get('/api/styles'),
      ]);

      if (bookingsRes.status === 'fulfilled' && bookingsRes.value.data?.data) {
        setBookings(bookingsRes.value.data.data);
      }
      if (galleryRes.status === 'fulfilled' && galleryRes.value.data?.data) {
        setGalleryCount(galleryRes.value.data.data.length);
      }
      if (artistsRes.status === 'fulfilled' && artistsRes.value.data?.data) {
        setArtistCount(artistsRes.value.data.data.length);
      }
      if (stylesRes.status === 'fulfilled' && stylesRes.value.data?.data) {
        setStyleCount(stylesRes.value.data.data.length);
      }
    } catch (err) {
      console.warn('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`/api/bookings/${id}`, { status: newStatus });
      setBookings(bookings.map((b) => ((b._id || b.id) === id ? { ...b, status: newStatus } : b)));
    } catch (err) {
      setBookings(bookings.map((b) => ((b._id || b.id) === id ? { ...b, status: newStatus } : b)));
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#EAEAEA] pt-28 pb-20 px-6 sm:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Admin Navigation Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-white/[0.06] pb-8">
          <div>
            <span className="text-xs uppercase font-subheading tracking-[0.25em] text-[#B8976A] font-medium block">
              Ink Art Atelier Portal
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl text-[#EAEAEA] tracking-tight">
              Studio <span className="text-gradient-gold italic font-light">CMS Dashboard</span>
            </h1>
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            <Link to="/admin/bookings" className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] hover:text-[#EAEAEA] transition-colors">
              Enquiries
            </Link>
            <Link to="/admin/artists" className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] hover:text-[#EAEAEA] transition-colors">
              Artist Profile
            </Link>
            <Link to="/admin/styles" className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] hover:text-[#EAEAEA] transition-colors">
              Tattoo Styles
            </Link>
            <Link to="/admin/gallery" className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] hover:text-[#EAEAEA] transition-colors">
              Gallery
            </Link>
            <Link to="/admin/instagram" className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] hover:text-[#EAEAEA] transition-colors">
              Instagram Feed
            </Link>
            <Link to="/admin/settings" className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] hover:text-[#EAEAEA] transition-colors">
              Site Images
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 font-subheading text-xs uppercase tracking-wider bg-white/[0.04] border border-white/[0.06] text-[#EAEAEA] px-5 py-2.5 rounded-full hover:border-[#B8976A]/30 hover:text-[#B8976A] transition-all duration-300"
            >
              <FiLogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-7 space-y-3 shadow-xl">
            <div className="flex items-center justify-between text-[#B8976A]">
              <span className="font-subheading text-xs uppercase tracking-wider text-[#7A7A85]">Client Enquiries</span>
              <FiCalendar className="w-5 h-5" />
            </div>
            <span className="font-heading text-4xl text-[#EAEAEA] block font-light">{bookings.length}</span>
          </div>

          <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-7 space-y-3 shadow-xl">
            <div className="flex items-center justify-between text-[#D4B88A]">
              <span className="font-subheading text-xs uppercase tracking-wider text-[#7A7A85]">Tattoo Styles</span>
              <FiFeather className="w-5 h-5" />
            </div>
            <span className="font-heading text-4xl text-[#EAEAEA] block font-light">{styleCount}</span>
          </div>

          <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-7 space-y-3 shadow-xl">
            <div className="flex items-center justify-between text-[#34D399]">
              <span className="font-subheading text-xs uppercase tracking-wider text-[#7A7A85]">Gallery Artworks</span>
              <FiImage className="w-5 h-5" />
            </div>
            <span className="font-heading text-4xl text-[#EAEAEA] block font-light">{galleryCount}</span>
          </div>

          <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-7 space-y-3 shadow-xl">
            <div className="flex items-center justify-between text-[#B8976A]">
              <span className="font-subheading text-xs uppercase tracking-wider text-[#7A7A85]">Master Artists</span>
              <FiUsers className="w-5 h-5" />
            </div>
            <span className="font-heading text-4xl text-[#EAEAEA] block font-light">{artistCount}</span>
          </div>
        </div>

        {/* Bookings Queue */}
        <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <h2 className="font-heading text-2xl text-[#EAEAEA]">Recent Client Consultation Enquiries</h2>
            <Link to="/admin/bookings" className="text-xs font-subheading uppercase text-[#B8976A] hover:text-[#D4B88A] transition-colors">
              View All Queue →
            </Link>
          </div>

          {loading ? (
            <div className="py-12 text-center text-[#7A7A85] font-subheading text-sm">
              Loading recent client enquiries...
            </div>
          ) : bookings.length === 0 ? (
            <div className="py-12 text-center text-[#7A7A85] font-body text-sm font-light">
              No client enquiries yet. Submissions from the website Contact desk will appear here in real-time.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-body">
                <thead className="bg-[#18181B] text-[#7A7A85] font-subheading uppercase text-xs tracking-wider border-b border-white/[0.06]">
                  <tr>
                    <th className="p-4 rounded-l-xl">Client</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Style</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right rounded-r-xl">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {bookings.slice(0, 5).map((b) => {
                    const bookingId = b._id || b.id;
                    return (
                      <tr key={bookingId} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 font-medium text-[#EAEAEA]">
                          {b.name}
                          {b.message && (
                            <p className="text-xs text-[#7A7A85] font-light mt-1 max-w-xs truncate">{b.message}</p>
                          )}
                        </td>
                        <td className="p-4 text-xs font-subheading text-[#7A7A85]">
                          <span className="text-[#EAEAEA] block">{b.phone}</span>
                          <span>{b.email}</span>
                        </td>
                        <td className="p-4 text-xs font-subheading text-[#D4B88A]">{b.style || 'Custom'}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-[11px] font-subheading uppercase font-medium ${
                            b.status === 'Confirmed'
                              ? 'bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/20'
                              : 'bg-[#B8976A]/10 text-[#B8976A] border border-[#B8976A]/20'
                          }`}>
                            {b.status || 'Pending'}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => updateStatus(bookingId, 'Confirmed')}
                            className="px-3.5 py-1.5 bg-[#B8976A] text-[#080808] text-xs font-subheading font-medium rounded-full hover:bg-[#D4B88A] transition-colors"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => updateStatus(bookingId, 'Cancelled')}
                            className="px-3.5 py-1.5 bg-white/[0.03] text-[#7A7A85] border border-white/[0.06] text-xs font-subheading rounded-full hover:text-[#EAEAEA] transition-colors"
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
