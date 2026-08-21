import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiEdit2, FiX, FiCheckCircle, FiUploadCloud } from 'react-icons/fi';
import AdminNavbar from '../../components/common/AdminNavbar';

export default function ManageArtists() {
  const [artistsList, setArtistsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingArtist, setEditingArtist] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Edit Form state — Only essential fields rendered on frontend Spotlight
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    specialization: '',
    experience: '',
    bio: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/artists');
      if (res.data && res.data.data) {
        setArtistsList(res.data.data);
      }
    } catch (err) {
      console.warn('Backend error loading artists:', err);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (artist) => {
    setEditingArtist(artist);
    setFormData({
      name: artist.name || '',
      role: artist.role || '',
      specialization: artist.specialization || '',
      experience: artist.experience || '',
      bio: artist.bio || '',
    });
    setSelectedFile(null);
    setPreviewUrl(artist.image || '');
    setEditModalOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingArtist) return;

    try {
      setSubmitting(true);
      const body = new FormData();
      body.append('name', formData.name);
      body.append('role', formData.role);
      body.append('specialization', formData.specialization);
      body.append('experience', formData.experience);
      body.append('bio', formData.bio);

      if (selectedFile) {
        body.append('imageFile', selectedFile);
      }

      const artistId = editingArtist._id || editingArtist.id;
      let res;
      if (editingArtist._id) {
        res = await axios.put(`/api/artists/${artistId}`, body, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        res = await axios.post('/api/artists', body, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      if (res.data && res.data.data) {
        setSuccessMsg('Master Artist Profile updated! Changes reflect on live website.');
        setTimeout(() => {
          setSuccessMsg('');
          setEditModalOpen(false);
          fetchArtists();
        }, 1500);
      }
    } catch (err) {
      console.error('Error saving artist:', err);
      alert('Failed to update artist. Make sure backend server is running.');
    } finally {
      setSubmitting(false);
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
              Resident Masters
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#EAEAEA] tracking-tight">
              Manage <span className="text-gradient-gold italic font-light">Artist Profiles</span>
            </h1>
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center text-[#7A7A85] font-subheading text-sm">
            Loading master artist profile...
          </div>
        ) : (
          <div className="max-w-4xl space-y-8">
            {artistsList.map((artist) => (
              <div key={artist._id || artist.id} className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 sm:p-10 space-y-8 shadow-xl">
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start text-center sm:text-left">
                  <div className="w-40 sm:w-44 aspect-[3/4] bg-[#18181B] border border-white/[0.06] rounded-xl overflow-hidden shrink-0 shadow-lg">
                    <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="space-y-4 flex-1">
                    <div>
                      <span className="text-xs uppercase font-subheading tracking-[0.2em] text-[#B8976A] font-medium block mb-1">
                        {artist.role || 'Resident Master Artist'}
                      </span>
                      <h2 className="font-heading text-3xl sm:text-4xl text-[#EAEAEA]">{artist.name}</h2>
                    </div>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-subheading text-[#7A7A85]">
                      <span className="bg-[#18181B] px-3 py-1.5 rounded-lg border border-white/[0.04]">
                        Exp: <strong className="text-[#EAEAEA] font-medium">{artist.experience}</strong>
                      </span>
                      <span className="bg-[#18181B] px-3 py-1.5 rounded-lg border border-white/[0.04]">
                        Specialty: <strong className="text-[#D4B88A] font-medium">{artist.specialization}</strong>
                      </span>
                    </div>

                    <p className="text-sm font-body text-[#7A7A85] leading-relaxed font-light">
                      {artist.bio}
                    </p>

                    <div className="pt-2">
                      <button
                        onClick={() => openEditModal(artist)}
                        className="inline-flex items-center gap-2 font-subheading text-xs uppercase tracking-wider bg-[#B8976A] text-[#080808] px-6 py-3 rounded-full font-medium hover:bg-[#D4B88A] transition-all duration-300 shadow-md"
                      >
                        <FiEdit2 className="w-3.5 h-3.5" />
                        <span>Edit Resident Profile</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* Edit Profile Modal — 100% Height Responsive with Internal Auto-Scrolling */}
      {editModalOpen && (
        <div data-lenis-prevent className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#111113] border border-white/[0.08] rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-auto max-h-[90vh] flex flex-col">
            
            {/* Fixed Header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 shrink-0">
              <h3 className="font-heading text-2xl text-[#EAEAEA]">Edit Master Artist Profile</h3>
              <button
                onClick={() => setEditModalOpen(false)}
                className="text-[#7A7A85] hover:text-[#EAEAEA] p-1.5 rounded-lg bg-white/[0.04] transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {successMsg ? (
              <div className="p-4 bg-white/[0.02] border border-[#34D399]/30 text-[#34D399] text-xs font-subheading rounded-xl flex items-center gap-2">
                <FiCheckCircle className="w-5 h-5 shrink-0" />
                <span>{successMsg}</span>
              </div>
            ) : (
              /* Auto-scrolling Form Container */
              <form onSubmit={handleSave} className="space-y-5 overflow-y-auto pr-1 flex-1">
                
                <div className="space-y-2">
                  <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium block">
                    Artist Avatar Image
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {previewUrl && (
                      <div className="w-20 h-24 bg-[#18181B] rounded-xl overflow-hidden shrink-0 border border-white/[0.06]">
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="relative border border-dashed border-white/[0.1] hover:border-[#B8976A]/40 rounded-xl p-4 text-center transition-colors cursor-pointer bg-[#18181B] w-full">
                      <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                      <span className="text-xs font-subheading text-[#EAEAEA] flex items-center justify-center gap-2">
                        <FiUploadCloud className="w-4 h-4 text-[#B8976A]" /> Choose New Image File
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium block">Artist Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#18181B] border border-white/[0.06] rounded-xl p-3.5 text-[#EAEAEA] text-sm focus:border-[#B8976A]/50 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium block">Studio Role *</label>
                    <input
                      type="text"
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full bg-[#18181B] border border-white/[0.06] rounded-xl p-3.5 text-[#EAEAEA] text-sm focus:border-[#B8976A]/50 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium block">Experience Label</label>
                    <input
                      type="text"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      placeholder="10+ Years Master Artisan"
                      className="w-full bg-[#18181B] border border-white/[0.06] rounded-xl p-3.5 text-[#EAEAEA] text-sm focus:border-[#B8976A]/50 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium block">Specialization Header</label>
                    <input
                      type="text"
                      required
                      value={formData.specialization}
                      onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                      placeholder="Micro-Realism & Fine Line Master"
                      className="w-full bg-[#18181B] border border-white/[0.06] rounded-xl p-3.5 text-[#EAEAEA] text-sm focus:border-[#B8976A]/50 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium block">Bio Description *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full bg-[#18181B] border border-white/[0.06] rounded-xl p-3.5 text-[#EAEAEA] text-sm focus:border-[#B8976A]/50 focus:outline-none resize-none font-light leading-relaxed"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/[0.06] shrink-0">
                  <button
                    type="button"
                    onClick={() => setEditModalOpen(false)}
                    className="px-6 py-3 rounded-full text-xs font-subheading uppercase text-[#7A7A85] hover:text-[#EAEAEA] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-[#B8976A] text-[#080808] font-subheading text-xs uppercase tracking-wider px-8 py-3.5 rounded-full font-medium hover:bg-[#D4B88A] transition-all duration-300 disabled:opacity-50"
                  >
                    {submitting ? 'Saving Profile...' : 'Save Profile Changes'}
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
