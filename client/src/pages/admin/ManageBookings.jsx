import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiEye, FiCheck, FiX, FiMessageCircle, FiPhone, FiMail, FiCalendar, FiUser } from 'react-icons/fi';
import AdminNavbar from '../../components/common/AdminNavbar';

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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

  const openViewModal = (booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`/api/bookings/${id}`, { status: newStatus });
      setBookings(bookings.map((b) => ((b._id || b.id) === id ? { ...b, status: newStatus } : b)));
      if (selectedBooking && (selectedBooking._id || selectedBooking.id) === id) {
        setSelectedBooking({ ...selectedBooking, status: newStatus });
      }
    } catch (err) {
      console.warn('Update failed on backend, updating locally:', err);
      setBookings(bookings.map((b) => ((b._id || b.id) === id ? { ...b, status: newStatus } : b)));
      if (selectedBooking && (selectedBooking._id || selectedBooking.id) === id) {
        setSelectedBooking({ ...selectedBooking, status: newStatus });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#EAEAEA] select-none">
      
      {/* Shared Responsive Admin Header */}
      <AdminNavbar />

      <main className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 sm:space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.06] pb-6 gap-4">
          <div className="space-y-1">
            <span className="text-xs uppercase font-subheading tracking-[0.25em] text-[#B8976A] font-medium block">
              Client Consultations
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#EAEAEA] tracking-tight">
              Manage <span className="text-gradient-gold italic font-light">Enquiries</span>
            </h1>
          </div>
          <span className="text-xs font-subheading text-[#7A7A85] uppercase tracking-wider bg-white/[0.03] border border-white/[0.06] px-4 py-2 rounded-full self-start sm:self-auto">
            {bookings.length} Total Requests
          </span>
        </div>

        {/* Table / Queue Box */}
        <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-5 sm:p-8 space-y-6 shadow-xl">
          {loading ? (
            <div className="py-12 text-center text-[#7A7A85] font-subheading text-sm">
              Loading client enquiries...
            </div>
          ) : bookings.length === 0 ? (
            <div className="py-12 text-center text-[#7A7A85] font-body text-sm font-light">
              No client enquiries yet. Submissions from the website Contact desk will appear here in real-time.
            </div>
          ) : (
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left text-sm font-body min-w-[700px]">
                <thead className="bg-[#18181B] text-[#7A7A85] font-subheading uppercase text-xs tracking-wider border-b border-white/[0.06]">
                  <tr>
                    <th className="p-4 rounded-l-xl">Client</th>
                    <th className="p-4">Contact Details</th>
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
                      <tr key={bookingId} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="p-4 font-medium text-[#EAEAEA]">
                          <span
                            onClick={() => openViewModal(b)}
                            className="hover:text-[#B8976A] cursor-pointer transition-colors"
                          >
                            {b.name || b.fullName || 'Anonymous Client'}
                          </span>
                          {(b.message || b.notes) && (
                            <p className="text-xs text-[#7A7A85] font-light mt-1 max-w-xs truncate">{b.message || b.notes}</p>
                          )}
                        </td>
                        <td className="p-4 text-xs font-subheading text-[#7A7A85]">
                          <span className="text-[#EAEAEA] block font-medium">{b.phone}</span>
                          <span>{b.email}</span>
                        </td>
                        <td className="p-4 text-xs font-subheading text-[#D4B88A]">{b.style || 'Custom'}</td>
                        <td className="p-4 text-xs font-subheading text-[#B8976A]">{b.artist || 'Marcus Vance'}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-[11px] font-subheading uppercase font-medium ${
                            b.status === 'Confirmed'
                              ? 'bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/20'
                              : b.status === 'Cancelled'
                              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                              : 'bg-[#B8976A]/10 text-[#B8976A] border border-[#B8976A]/20'
                          }`}>
                            {b.status || 'Pending'}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => openViewModal(b)}
                            className="px-3.5 py-1.5 bg-white/[0.04] text-[#EAEAEA] border border-white/[0.08] text-xs font-subheading rounded-full hover:border-[#B8976A]/40 hover:text-[#B8976A] transition-colors inline-flex items-center gap-1.5"
                          >
                            <FiEye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>
                          <button
                            onClick={() => updateStatus(bookingId, 'Confirmed')}
                            className="px-3.5 py-1.5 bg-[#B8976A] text-[#080808] text-xs font-subheading font-medium rounded-full hover:bg-[#D4B88A] transition-colors"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => updateStatus(bookingId, 'Cancelled')}
                            className="px-3.5 py-1.5 bg-white/[0.03] text-[#7A7A85] border border-white/[0.06] text-xs font-subheading rounded-full hover:text-red-400 transition-colors"
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

      {/* View Enquiry Detail Modal */}
      {modalOpen && selectedBooking && (
        <div data-lenis-prevent className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#111113] border border-white/[0.08] rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-auto max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 shrink-0">
              <div className="space-y-1">
                <span className="text-xs uppercase font-subheading tracking-[0.2em] text-[#B8976A] block">
                  Enquiry Details
                </span>
                <h3 className="font-heading text-2xl text-[#EAEAEA]">
                  {selectedBooking.name || selectedBooking.fullName || 'Client Consultation'}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-[#7A7A85] hover:text-[#EAEAEA] p-1.5 rounded-lg bg-white/[0.04] transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body - Auto-scrolling */}
            <div className="space-y-6 overflow-y-auto pr-1 flex-1 text-sm font-body">
              
              {/* Status Badge & Actions */}
              <div className="bg-[#18181B] p-4 rounded-xl border border-white/[0.06] flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <span className="text-xs font-subheading uppercase text-[#7A7A85] block mb-1">Current Status</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-subheading uppercase font-medium inline-block ${
                    selectedBooking.status === 'Confirmed'
                      ? 'bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/20'
                      : selectedBooking.status === 'Cancelled'
                      ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                      : 'bg-[#B8976A]/10 text-[#B8976A] border border-[#B8976A]/20'
                  }`}>
                    {selectedBooking.status || 'Pending'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateStatus(selectedBooking._id || selectedBooking.id, 'Confirmed')}
                    className="px-4 py-2 bg-[#B8976A] text-[#080808] text-xs font-subheading font-medium rounded-full hover:bg-[#D4B88A] transition-colors"
                  >
                    Confirm Enquiry
                  </button>
                  <button
                    onClick={() => updateStatus(selectedBooking._id || selectedBooking.id, 'Cancelled')}
                    className="px-4 py-2 bg-white/[0.04] text-[#7A7A85] border border-white/[0.06] text-xs font-subheading rounded-full hover:text-red-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              {/* Client Contact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#18181B] p-4 rounded-xl border border-white/[0.06] space-y-1">
                  <span className="text-xs font-subheading uppercase text-[#7A7A85] flex items-center gap-1.5">
                    <FiPhone className="w-3.5 h-3.5 text-[#B8976A]" /> Phone / WhatsApp
                  </span>
                  <p className="text-base text-[#EAEAEA] font-medium">{selectedBooking.phone || 'N/A'}</p>
                  {selectedBooking.phone && (
                    <a
                      href={`https://wa.me/${selectedBooking.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-[#34D399] hover:underline font-subheading inline-flex items-center gap-1 pt-1"
                    >
                      <FiMessageCircle className="w-3.5 h-3.5" /> Direct WhatsApp Chat ↗
                    </a>
                  )}
                </div>

                <div className="bg-[#18181B] p-4 rounded-xl border border-white/[0.06] space-y-1">
                  <span className="text-xs font-subheading uppercase text-[#7A7A85] flex items-center gap-1.5">
                    <FiMail className="w-3.5 h-3.5 text-[#B8976A]" /> Email Address
                  </span>
                  <p className="text-base text-[#EAEAEA] font-medium truncate">{selectedBooking.email || 'N/A'}</p>
                </div>
              </div>

              {/* Tattoo Request Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#18181B] p-4 rounded-xl border border-white/[0.06] space-y-1">
                  <span className="text-xs font-subheading uppercase text-[#7A7A85] block">Preferred Tattoo Style</span>
                  <p className="text-base text-[#D4B88A] font-medium">{selectedBooking.style || 'Custom Style'}</p>
                </div>

                <div className="bg-[#18181B] p-4 rounded-xl border border-white/[0.06] space-y-1">
                  <span className="text-xs font-subheading uppercase text-[#7A7A85] block">Assigned Master Artist</span>
                  <p className="text-base text-[#B8976A] font-medium">{selectedBooking.artist || 'Marcus Vance'}</p>
                </div>
              </div>

              {/* Full Message / Tattoo Idea */}
              <div className="bg-[#18181B] p-4 rounded-xl border border-white/[0.06] space-y-2">
                <span className="text-xs font-subheading uppercase text-[#7A7A85] block">
                  Tattoo Idea / Client Message
                </span>
                <p className="text-sm font-body text-[#EAEAEA] leading-relaxed font-light whitespace-pre-wrap">
                  {selectedBooking.message || selectedBooking.notes || 'No message provided.'}
                </p>
              </div>

            </div>

            {/* Footer */}
            <div className="pt-4 flex items-center justify-end border-t border-white/[0.06] shrink-0">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-6 py-3 rounded-full text-xs font-subheading uppercase bg-white/[0.04] text-[#EAEAEA] border border-white/[0.08] hover:border-[#B8976A]/40 hover:text-[#B8976A] transition-colors"
              >
                Close Details
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
