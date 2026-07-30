import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiEdit2, FiArrowLeft, FiAward, FiX, FiCheckCircle, FiUploadCloud } from 'react-icons/fi';

export default function ManageArtists() {
  const [artistsList, setArtistsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingArtist, setEditingArtist] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Edit Form state
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    specialization: '',
    experience: '',
    bio: '',
    rate: '',
    awards: '',
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
      rate: artist.rate || '',
      awards: Array.isArray(artist.awards) ? artist.awards.join(', ') : '',
    });
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
    try {
      setSubmitting(true);
      const body = new FormData();
      body.append('name', formData.name);
      body.append('role', formData.role);
      body.append('specialization', formData.specialization);
      body.append('experience', formData.experience);
      body.append('bio', formData.bio);
      body.append('rate', formData.rate);
      body.append('awards', formData.awards);

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
    <div className="min-h-screen bg-[#080808] text-[#EAEAEA] pt-28 pb-20 px-6 sm:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.06] pb-8 gap-6">
          <div className="space-y-2">
            <Link to="/admin/dashboard" className="text-xs font-subheading uppercase text-[#B8976A] flex items-center gap-1 hover:text-[#D4B88A] transition-colors">
              <FiArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
            <h1 className="font-heading text-4xl sm:text-5xl text-[#EAEAEA] tracking-tight">
              Manage <span className="text-gradient-gold italic font-light">Master Artist Profile</span>
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
              <div key={artist._id || artist.id} className="bg-[#111113] border border-white/[0.06] rounded-2xl p-8 sm:p-10 space-y-8 shadow-xl">
                <div className="flex flex-col sm:flex-row gap-8 items-start">
                  <div className="w-44 aspect-[3/4] bg-[#18181B] border border-white/[0.06] rounded-xl overflow-hidden shrink-0 shadow-lg">
                    <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-4 flex-1">
                    <div>
                      <span className="text-xs font-subheading uppercase text-[#B8976A] font-medium tracking-wide block mb-1">{artist.role}</span>
                      <h3 className="font-heading text-4xl text-[#EAEAEA]">{artist.name}</h3>
                      <p className="text-xs font-subheading text-[#7A7A85] tracking-wider mt-1">{artist.experience}</p>
                    </div>

                    <p className="text-sm font-body text-[#7A7A85] leading-relaxed font-light">{artist.bio}</p>

                    <div>
                      <span className="text-xs font-subheading uppercase text-[#B8976A] font-medium block mb-1">Specializations</span>
                      <p className="text-sm text-[#EAEAEA] font-body">{artist.specialization}</p>
                    </div>

                    {artist.awards && artist.awards.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-2">
                        {artist.awards.map((award, i) => (
                          <span key={i} className="inline-flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.06] px-3.5 py-1.5 rounded-full text-xs text-[#D4B88A]">
                            <FiAward className="w-3.5 h-3.5 text-[#B8976A]" /> {award}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end pt-6 border-t border-white/[0.06]">
                  <button
                    onClick={() => openEditModal(artist)}
                    className="inline-flex items-center gap-2 font-subheading text-xs uppercase tracking-wider bg-[#B8976A] text-[#080808] px-7 py-3 rounded-full font-medium hover:bg-[#D4B88A] transition-all duration-500 shadow-lg shadow-[#B8976A]/10"
                  >
                    <FiEdit2 className="w-4 h-4" /> Edit Master Artist Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Edit Profile Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#080808]/90 backdrop-blur-3xl overflow-y-auto">
          <div className="relative max-w-2xl w-full bg-[#111113] border border-white/[0.06] rounded-2xl p-8 sm:p-10 space-y-6 shadow-2xl my-8">
            <button
              onClick={() => setEditModalOpen(false)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/[0.03] border border-white/[0.06] text-[#7A7A85] hover:text-[#EAEAEA] flex items-center justify-center transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>

            <div className="space-y-1 border-b border-white/[0.06] pb-5">
              <span className="text-xs uppercase font-subheading tracking-widest text-[#B8976A] font-medium">Studio CMS</span>
              <h2 className="font-heading text-3xl text-[#EAEAEA]">Edit Master Artist Profile</h2>
            </div>

            {successMsg ? (
              <div className="py-10 text-center space-y-3 bg-white/[0.02] border border-[#34D399]/20 rounded-xl">
                <FiCheckCircle className="w-10 h-10 text-[#34D399] mx-auto" />
                <p className="text-sm font-subheading text-[#EAEAEA]">{successMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSave} className="space-y-5">
                
                {/* File Upload / Image */}
                <div className="space-y-2">
                  <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium block">
                    Artist Portrait Photo
                  </label>
                  <div className="relative border-2 border-dashed border-white/[0.1] hover:border-[#B8976A]/40 rounded-xl p-4 text-center transition-colors cursor-pointer bg-[#18181B] flex items-center gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    {previewUrl && (
                      <img src={previewUrl} alt="Portrait" className="w-20 aspect-[3/4] object-cover rounded-lg shrink-0" />
                    )}
                    <div className="text-left space-y-1">
                      <p className="text-xs font-subheading text-[#EAEAEA] flex items-center gap-1.5">
                        <FiUploadCloud className="w-4 h-4 text-[#B8976A]" /> Click to upload new portrait photo
                      </p>
                      <span className="text-[11px] text-[#7A7A85] block">Supports JPG, PNG, WEBP</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#18181B] border border-white/[0.06] rounded-xl p-3.5 text-[#EAEAEA] text-sm focus:border-[#B8976A]/50 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium">Role</label>
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
                    <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium">Experience</label>
                    <input
                      type="text"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full bg-[#18181B] border border-white/[0.06] rounded-xl p-3.5 text-[#EAEAEA] text-sm focus:border-[#B8976A]/50 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium">Rate Info</label>
                    <input
                      type="text"
                      value={formData.rate}
                      onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                      className="w-full bg-[#18181B] border border-white/[0.06] rounded-xl p-3.5 text-[#EAEAEA] text-sm focus:border-[#B8976A]/50 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium">Specialization</label>
                  <input
                    type="text"
                    required
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    className="w-full bg-[#18181B] border border-white/[0.06] rounded-xl p-3.5 text-[#EAEAEA] text-sm focus:border-[#B8976A]/50 focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium">Bio Description</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full bg-[#18181B] border border-white/[0.06] rounded-xl p-3.5 text-[#EAEAEA] text-sm focus:border-[#B8976A]/50 focus:outline-none resize-none font-light leading-relaxed"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium">Awards (Comma-separated)</label>
                  <input
                    type="text"
                    value={formData.awards}
                    onChange={(e) => setFormData({ ...formData, awards: e.target.value })}
                    placeholder="Best Micro-Realism 2023, Fine Line Artistry"
                    className="w-full bg-[#18181B] border border-white/[0.06] rounded-xl p-3.5 text-[#EAEAEA] text-sm focus:border-[#B8976A]/50 focus:outline-none"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/[0.06]">
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
