import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPlus, FiTrash2, FiEdit2, FiX, FiCheckCircle, FiUploadCloud, FiRefreshCw } from 'react-icons/fi';
import AdminNavbar from '../../components/common/AdminNavbar';

export default function ManageStyles() {
  const [stylesList, setStylesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStyle, setEditingStyle] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Form state — Only essential fields rendered on frontend StyleCard
  const [formData, setFormData] = useState({
    title: '',
    description: '',
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

  const handleResetStyles = async () => {
    if (!window.confirm('Restore default master tattoo styles? This will update the catalog to the master styles with HD imagery.')) return;
    try {
      setLoading(true);
      const res = await axios.post('/api/styles/reset');
      if (res.data && res.data.data) {
        setStylesList(res.data.data);
      }
    } catch (err) {
      console.error('Error resetting styles:', err);
      fetchStyles();
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingStyle(null);
    setFormData({
      title: '',
      description: '',
    });
    setSelectedFile(null);
    setPreviewUrl('');
    setModalOpen(true);
  };

  const openEditModal = (style) => {
    setEditingStyle(style);
    setFormData({
      title: style.title || '',
      description: style.description || '',
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
    if (!editingStyle && !selectedFile) {
      alert('Please select an artwork image for this style.');
      return;
    }

    try {
      setSubmitting(true);
      const body = new FormData();
      body.append('title', formData.title);
      body.append('description', formData.description);

      if (selectedFile) {
        body.append('imageFile', selectedFile);
      }

      let res;
      if (editingStyle) {
        const id = editingStyle._id || editingStyle.id;
        res = await axios.put(`/api/styles/${id}`, body, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        res = await axios.post('/api/styles', body, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      if (res.data && res.data.data) {
        setSuccessMsg(editingStyle ? 'Tattoo style updated!' : 'New tattoo style added!');
        setTimeout(() => {
          setSuccessMsg('');
          setModalOpen(false);
          fetchStyles();
        }, 1500);
      }
    } catch (err) {
      console.error('Error saving style:', err);
      alert('Failed to save tattoo style. Make sure backend server is running.');
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
      console.error('Error deleting style:', err);
      setStylesList(stylesList.filter((s) => (s._id || s.id) !== id));
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
              Disciplines & Catalog
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#EAEAEA] tracking-tight">
              Manage <span className="text-gradient-gold italic font-light">Tattoo Styles</span>
            </h1>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={handleResetStyles}
              className="inline-flex items-center justify-center gap-2 font-subheading text-xs uppercase tracking-wider bg-white/[0.04] text-[#EAEAEA] border border-white/[0.08] px-5 py-3 rounded-full hover:border-[#B8976A]/40 hover:text-[#B8976A] transition-all duration-300 shadow-md"
              title="Restore 15 master styles with HD images"
            >
              <FiRefreshCw className="w-3.5 h-3.5" />
              <span>Restore Master Styles</span>
            </button>

            <button
              onClick={openAddModal}
              className="inline-flex items-center justify-center gap-2 font-subheading text-xs uppercase tracking-wider bg-[#B8976A] text-[#080808] px-6 py-3 rounded-full font-medium hover:bg-[#D4B88A] transition-all duration-300 shadow-md"
            >
              <FiPlus className="w-4 h-4" />
              <span>Add New Style</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center text-[#7A7A85] font-subheading text-sm">
            Loading tattoo styles...
          </div>
        ) : stylesList.length === 0 ? (
          <div className="py-20 text-center text-[#7A7A85] font-body text-sm font-light space-y-4">
            <p>No tattoo styles found.</p>
            <button
              onClick={handleResetStyles}
              className="inline-flex items-center gap-2 bg-[#B8976A] text-[#080808] text-xs font-subheading uppercase font-medium px-6 py-3 rounded-full"
            >
              <FiRefreshCw className="w-4 h-4" />
              <span>Seed Master Tattoo Styles</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stylesList.map((style) => {
              const styleId = style._id || style.id;
              return (
                <div key={styleId} className="bg-[#111113] border border-white/[0.06] rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between hover:border-[#B8976A]/40 transition-colors">
                  <div className="aspect-[16/9] bg-[#18181B] relative overflow-hidden">
                    <img src={style.image} alt={style.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h2 className="font-heading text-2xl text-[#EAEAEA]">{style.title}</h2>
                      <p className="text-xs font-body text-[#7A7A85] leading-relaxed font-light line-clamp-3">
                        {style.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-end">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(style)}
                          className="p-2 rounded-lg bg-white/[0.04] text-[#7A7A85] hover:text-[#B8976A] hover:bg-white/[0.08] transition-colors"
                          title="Edit Style"
                        >
                          <FiEdit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(styleId)}
                          className="p-2 rounded-lg bg-white/[0.04] text-[#7A7A85] hover:text-red-400 hover:bg-white/[0.08] transition-colors"
                          title="Delete Style"
                        >
                          <FiTrash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </main>

      {/* Add/Edit Modal — Responsive Max-Height with Internal Scroll */}
      {modalOpen && (
        <div data-lenis-prevent className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#111113] border border-white/[0.08] rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-auto max-h-[90vh] flex flex-col">
            
            {/* Fixed Header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 shrink-0">
              <h3 className="font-heading text-2xl text-[#EAEAEA]">
                {editingStyle ? 'Edit Tattoo Style' : 'Add New Tattoo Style'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
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
              <form onSubmit={handleSubmit} className="space-y-5 overflow-y-auto pr-1 flex-1">
                
                {/* Upload Image */}
                <div className="space-y-2">
                  <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium block">
                    Style Cover Image *
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {previewUrl && (
                      <div className="w-24 aspect-[16/9] bg-[#18181B] rounded-xl overflow-hidden shrink-0 border border-white/[0.06]">
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="relative border border-dashed border-white/[0.1] hover:border-[#B8976A]/40 rounded-xl p-3.5 text-center transition-colors cursor-pointer bg-[#18181B] w-full">
                      <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                      <span className="text-xs font-subheading text-[#EAEAEA] flex items-center justify-center gap-2">
                        <FiUploadCloud className="w-4 h-4 text-[#B8976A]" /> Choose Style Cover Image
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium block">Style Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Micro-Realism"
                    className="w-full bg-[#18181B] border border-white/[0.06] rounded-xl p-3.5 text-[#EAEAEA] text-sm focus:border-[#B8976A]/50 focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium block">Style Description *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Detailed breakdown of the style..."
                    className="w-full bg-[#18181B] border border-white/[0.06] rounded-xl p-3.5 text-[#EAEAEA] text-sm focus:border-[#B8976A]/50 focus:outline-none resize-none font-light leading-relaxed"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/[0.06] shrink-0">
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
                    {submitting ? 'Saving Style...' : editingStyle ? 'Save Style Changes' : 'Save & Publish Style'}
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
