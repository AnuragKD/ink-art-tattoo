import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiCheck, FiX, FiClock } from 'react-icons/fi';

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/bookings');
      if (res.data && res.data.data) {
        setBookings(res.data.data);
      }
    } catch (err) {
      console.warn('Using fallback bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`/api/bookings/${id}`, { status: newStatus });
      setBookings(bookings.map((b) => ((b._id || b.id) === id ? { ...b, status: newStatus } : b)));
    } catch (err) {
      console.warn('Update failed on backend, updating locally:', err);
      setBookings(bookings.map((b) => ((b._id || b.id) === id ? { ...b, status: newStatus } : b)));
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#EAEAEA] pt-28 pb-20 px-6 sm:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.06] pb-8 gap-6">
          <div className="space-y-2">
            <Link to="/admin/dashboard" className="text-xs font-subheading uppercase text-[#B8976A] flex items-center gap-1 hover:text-[#D4B88A] transition-colors">
              <FiArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
            <h1 className="font-heading text-4xl sm:text-5xl text-[#EAEAEA] tracking-tight">
              Manage <span className="text-gradient-gold italic font-light">Client Enquiries</span>
            </h1>
          </div>
        </div>

        {/* Table / Queue */}
        <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <h2 className="font-heading text-2xl text-[#EAEAEA]">Client Consultation Queue</h2>
            <span className="text-xs font-subheading text-[#7A7A85] uppercase tracking-wider">{bookings.length} Total Requests</span>
          </div>

          {loading ? (
            <div className="py-12 text-center text-[#7A7A85] font-subheading text-sm">
              Loading client enquiries...
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
                    <th className="p-4">Artist</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right rounded-r-xl">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {bookings.map((b) => {
                    const bookingId = b._id || b.id;
                    return (
                      <tr key={bookingId} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 font-medium text-[#EAEAEA]">
                          {b.name || b.fullName || 'Anonymous Client'}
                          {(b.message || b.notes) && (
                            <p className="text-xs text-[#7A7A85] font-light mt-1 max-w-xs truncate">{b.message || b.notes}</p>
                          )}
                        </td>
                        <td className="p-4 text-xs font-subheading text-[#7A7A85]">
                          <span className="text-[#EAEAEA] block">{b.phone}</span>
                          <span>{b.email}</span>
                        </td>
                        <td className="p-4 text-xs font-subheading text-[#D4B88A]">{b.style || 'Custom'}</td>
                        <td className="p-4 text-xs font-subheading text-[#B8976A]">{b.artist || 'Marcus Vance'}</td>
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
