import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiPlus, FiTrash2, FiEdit2, FiArrowLeft, FiX, FiCheckCircle, FiUploadCloud } from 'react-icons/fi';

export default function ManageStyles() {
  const [stylesList, setStylesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStyle, setEditingStyle] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    recommendedPlacement: '',
    averageDuration: '',
    suitableArtist: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    fetchStyles();
  }, []);

  const fetchStyles = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/styles');
      if (res.data && res.data.data) {
        setStylesList(res.data.data);
      }
    } catch (err) {
      console.warn('Backend error loading styles:', err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingStyle(null);
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      recommendedPlacement: '',
      averageDuration: '',
      suitableArtist: '',
    });
    setSelectedFile(null);
    setPreviewUrl('');
    setModalOpen(true);
  };

  const openEditModal = (style) => {
    setEditingStyle(style);
    setFormData({
      title: style.title || '',
      subtitle: style.subtitle || '',
      description: style.description || '',
      recommendedPlacement: style.recommendedPlacement || '',
      averageDuration: style.averageDuration || '',
      suitableArtist: style.suitableArtist || '',
    });
    setSelectedFile(null);
    setPreviewUrl(style.image || '');
    setModalOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile && !previewUrl) {
      alert('Please select a cover image for the style.');
      return;
    }

    try {
      setSubmitting(true);
      const body = new FormData();
      body.append('title', formData.title);
      body.append('subtitle', formData.subtitle);
      body.append('description', formData.description);
      body.append('recommendedPlacement', formData.recommendedPlacement);
      body.append('averageDuration', formData.averageDuration);
      body.append('suitableArtist', formData.suitableArtist);

      if (selectedFile) {
        body.append('imageFile', selectedFile);
      }

      let res;
      if (editingStyle && editingStyle._id) {
        res = await axios.put(`/api/styles/${editingStyle._id}`, body, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        res = await axios.post('/api/styles', body, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      if (res.data && res.data.data) {
        setSuccessMsg(editingStyle ? 'Tattoo style updated successfully!' : 'New tattoo style added successfully!');
        setTimeout(() => {
          setSuccessMsg('');
          setModalOpen(false);
          fetchStyles();
        }, 1500);
      }
    } catch (err) {
      console.error('Error saving style:', err);
      alert('Failed to save style. Make sure server is running.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tattoo style?')) return;

    try {
      await axios.delete(`/api/styles/${id}`);
      setStylesList(stylesList.filter((s) => (s._id || s.id) !== id));
    } catch (err) {
      console.warn('Backend delete failed, removing locally:', err);
      setStylesList(stylesList.filter((s) => (s._id || s.id) !== id));
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
              Manage <span className="text-gradient-gold italic font-light">Tattoo Styles</span>
            </h1>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2.5 bg-[#B8976A] text-[#080808] font-subheading text-xs uppercase tracking-wider px-7 py-3.5 rounded-full font-medium hover:bg-[#D4B88A] transition-all duration-500 shadow-lg shadow-[#B8976A]/10"
          >
            <FiPlus className="w-4 h-4" /> Add New Tattoo Style
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center text-[#7A7A85] font-subheading text-sm">
            Loading tattoo styles...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {stylesList.map((style) => {
              const styleId = style._id || style.id;
              return (
                <div key={styleId} className="bg-[#111113] border border-white/[0.06] rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="aspect-[16/10] bg-[#18181B] relative overflow-hidden">
                      <img src={style.image} alt={style.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6 space-y-2">
                      <span className="text-[11px] font-subheading uppercase text-[#B8976A] font-medium tracking-wider block">Signature Discipline</span>
                      <h3 className="font-heading text-3xl text-[#EAEAEA] tracking-tight">{style.title}</h3>
                      <p className="text-sm font-body text-[#7A7A85] line-clamp-3 leading-relaxed font-light">{style.description}</p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex items-center justify-between border-t border-white/[0.06] mt-4">
                    <button
                      onClick={() => openEditModal(style)}
                      className="inline-flex items-center gap-1.5 text-xs font-subheading uppercase tracking-wider text-[#B8976A] hover:text-[#D4B88A] transition-colors"
                    >
                      <FiEdit2 className="w-4 h-4" /> Edit Style
                    </button>
                    <button
                      onClick={() => handleDelete(styleId)}
                      className="p-2 text-[#7A7A85] hover:text-red-400 transition-colors"
                      title="Delete Style"
                    >
                      <FiTrash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Add / Edit Style Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#080808]/90 backdrop-blur-3xl overflow-y-auto">
          <div className="relative max-w-xl w-full bg-[#111113] border border-white/[0.06] rounded-2xl p-8 sm:p-10 space-y-6 shadow-2xl my-8">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/[0.03] border border-white/[0.06] text-[#7A7A85] hover:text-[#EAEAEA] flex items-center justify-center transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>

            <div className="space-y-1 border-b border-white/[0.06] pb-5">
              <span className="text-xs uppercase font-subheading tracking-widest text-[#B8976A] font-medium">Studio Discipline</span>
              <h2 className="font-heading text-3xl text-[#EAEAEA]">{editingStyle ? 'Edit Tattoo Style' : 'Create New Tattoo Style'}</h2>
            </div>

            {successMsg ? (
              <div className="py-10 text-center space-y-3 bg-white/[0.02] border border-[#34D399]/20 rounded-xl">
                <FiCheckCircle className="w-10 h-10 text-[#34D399] mx-auto" />
                <p className="text-sm font-subheading text-[#EAEAEA]">{successMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* File Upload */}
                <div className="space-y-2">
                  <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium block">
                    Style Cover Image *
                  </label>
                  <div className="relative border-2 border-dashed border-white/[0.1] hover:border-[#B8976A]/40 rounded-xl p-4 text-center transition-colors cursor-pointer bg-[#18181B] flex items-center gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    {previewUrl && (
                      <img src={previewUrl} alt="Cover Preview" className="w-24 aspect-[16/10] object-cover rounded-lg shrink-0" />
                    )}
                    <div className="text-left space-y-1">
                      <p className="text-xs font-subheading text-[#EAEAEA] flex items-center gap-1.5">
                        <FiUploadCloud className="w-4 h-4 text-[#B8976A]" /> Click to select or change image
                      </p>
                      <span className="text-[11px] text-[#7A7A85] block">Supports JPG, PNG, WEBP</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium">Style Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Micro-Realism & Miniature Art"
                    className="w-full bg-[#18181B] border border-white/[0.06] rounded-xl p-3.5 text-[#EAEAEA] text-sm focus:border-[#B8976A]/50 focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium">Description *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Provide a detailed breakdown of the technique, line precision, and aesthetic characteristics..."
                    className="w-full bg-[#18181B] border border-white/[0.06] rounded-xl p-3.5 text-[#EAEAEA] text-sm focus:border-[#B8976A]/50 focus:outline-none resize-none font-light leading-relaxed"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-6 py-3 rounded-full text-xs font-subheading uppercase text-[#7A7A85] hover:text-[#EAEAEA] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-[#B8976A] text-[#080808] font-subheading text-xs uppercase tracking-wider px-8 py-3.5 rounded-full font-medium hover:bg-[#D4B88A] transition-all duration-300 disabled:opacity-50"
                  >
                    {submitting ? 'Saving Style...' : 'Save & Publish Style'}
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
