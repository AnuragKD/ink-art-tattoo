import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiCalendar, FiUsers, FiImage, FiFeather, FiArrowRight, FiCheck, FiX } from 'react-icons/fi';
import AdminNavbar from '../../components/common/AdminNavbar';

export default function Dashboard() {
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

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`/api/bookings/${id}`, { status: newStatus });
      setBookings(bookings.map((b) => ((b._id || b.id) === id ? { ...b, status: newStatus } : b)));
    } catch (err) {
      setBookings(bookings.map((b) => ((b._id || b.id) === id ? { ...b, status: newStatus } : b)));
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#EAEAEA] select-none">
      
      {/* Shared Responsive Admin Header */}
      <AdminNavbar />

      <main className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 sm:space-y-10">
        
        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.06] pb-6">
          <div className="space-y-1">
            <span className="text-xs uppercase font-subheading tracking-[0.25em] text-[#B8976A] font-medium block">
              Studio Management
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#EAEAEA] tracking-tight">
              Atelier <span className="text-gradient-gold italic font-light">CMS Dashboard</span>
            </h1>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 sm:p-7 space-y-3 shadow-xl">
            <div className="flex items-center justify-between text-[#B8976A]">
              <span className="font-subheading text-xs uppercase tracking-wider text-[#7A7A85]">Client Enquiries</span>
              <FiCalendar className="w-5 h-5" />
            </div>
            <span className="font-heading text-3xl sm:text-4xl text-[#EAEAEA] block font-light">{bookings.length}</span>
          </div>

          <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 sm:p-7 space-y-3 shadow-xl">
            <div className="flex items-center justify-between text-[#D4B88A]">
              <span className="font-subheading text-xs uppercase tracking-wider text-[#7A7A85]">Tattoo Styles</span>
              <FiFeather className="w-5 h-5" />
            </div>
            <span className="font-heading text-3xl sm:text-4xl text-[#EAEAEA] block font-light">{styleCount}</span>
          </div>

          <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 sm:p-7 space-y-3 shadow-xl">
            <div className="flex items-center justify-between text-[#34D399]">
              <span className="font-subheading text-xs uppercase tracking-wider text-[#7A7A85]">Gallery Artworks</span>
              <FiImage className="w-5 h-5" />
            </div>
            <span className="font-heading text-3xl sm:text-4xl text-[#EAEAEA] block font-light">{galleryCount}</span>
          </div>

          <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 sm:p-7 space-y-3 shadow-xl">
            <div className="flex items-center justify-between text-[#B8976A]">
              <span className="font-subheading text-xs uppercase tracking-wider text-[#7A7A85]">Master Artists</span>
              <FiUsers className="w-5 h-5" />
            </div>
            <span className="font-heading text-3xl sm:text-4xl text-[#EAEAEA] block font-light">{artistCount}</span>
          </div>
        </div>

        {/* Bookings Queue Box */}
        <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-5 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
            <h2 className="font-heading text-xl sm:text-2xl text-[#EAEAEA]">Recent Client Consultation Enquiries</h2>
            <Link to="/admin/bookings" className="text-xs font-subheading uppercase text-[#B8976A] hover:text-[#D4B88A] transition-colors flex items-center gap-1">
              <span>View All Queue</span>
              <FiArrowRight className="w-3.5 h-3.5" />
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
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left text-sm font-body min-w-[600px]">
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
                        <td className="p-4 text-right space-x-2 whitespace-nowrap">
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

      </main>
    </div>
  );
}
