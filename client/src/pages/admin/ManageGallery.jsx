import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GALLERY_ITEMS, TATTOO_STYLES } from '../../constants/studioData';
import { Link } from 'react-router-dom';
import { FiPlus, FiTrash2, FiEdit2, FiArrowLeft, FiUploadCloud, FiX, FiCheckCircle } from 'react-icons/fi';

export default function ManageGallery() {
  const [galleryList, setGalleryList] = useState([]);
  const [stylesList, setStylesList] = useState(TATTOO_STYLES);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Micro-Realism',
    artist: 'Marcus Vance',
    placement: '',
    hours: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [galleryRes, stylesRes] = await Promise.allSettled([
        axios.get('/api/gallery'),
        axios.get('/api/styles'),
      ]);

      if (galleryRes.status === 'fulfilled' && galleryRes.value.data?.data?.length > 0) {
        setGalleryList(galleryRes.value.data.data);
      } else {
        setGalleryList(GALLERY_ITEMS);
      }

      if (stylesRes.status === 'fulfilled' && stylesRes.value.data?.data?.length > 0) {
        setStylesList(stylesRes.value.data.data);
      }
    } catch (err) {
      console.warn('Backend API error, using default gallery items:', err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: stylesList[0]?.title || 'Micro-Realism',
      artist: 'Marcus Vance',
      placement: '',
      hours: '',
    });
    setSelectedFile(null);
    setPreviewUrl('');
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      category: item.category || stylesList[0]?.title || 'Micro-Realism',
      artist: item.artist || 'Marcus Vance',
      placement: item.placement || '',
      hours: item.hours || '',
    });
    setSelectedFile(null);
    setPreviewUrl(item.image || '');
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
      alert('Please select an image file to upload.');
      return;
    }

    try {
      setSubmitting(true);
      const body = new FormData();
      body.append('title', formData.title || formData.category);
      body.append('category', formData.category);
      body.append('artist', formData.artist);
      body.append('placement', formData.placement || 'Custom Placement');
      body.append('hours', formData.hours || 'Custom Session');

      if (selectedFile) {
        body.append('imageFile', selectedFile);
      }

      let res;
      if (editingItem && editingItem._id) {
        res = await axios.put(`/api/gallery/${editingItem._id}`, body, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        res = await axios.post('/api/gallery', body, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      if (res.data && res.data.data) {
        setSuccessMsg(editingItem ? 'Gallery artwork updated successfully!' : 'New tattoo artwork uploaded successfully!');
        setTimeout(() => {
          setSuccessMsg('');
          setModalOpen(false);
          fetchData();
        }, 1500);
      }
    } catch (err) {
      console.error('Error saving gallery item:', err);
      alert('Failed to save artwork. Make sure server is running.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this artwork from the gallery?')) return;

    try {
      await axios.delete(`/api/gallery/${id}`);
      setGalleryList(galleryList.filter((item) => (item._id || item.id) !== id));
    } catch (err) {
      console.warn('Backend delete failed, removing from local state:', err);
      setGalleryList(galleryList.filter((item) => (item._id || item.id) !== id));
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
              Manage <span className="text-gradient-gold italic font-light">Curated Gallery</span>
            </h1>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2.5 bg-[#B8976A] text-[#080808] font-subheading text-xs uppercase tracking-wider px-7 py-3.5 rounded-full font-medium hover:bg-[#D4B88A] transition-all duration-500 shadow-lg shadow-[#B8976A]/10"
          >
            <FiPlus className="w-4 h-4" /> Upload New Artwork
          </button>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="py-20 text-center text-[#7A7A85] font-subheading text-sm">
            Loading studio gallery artwork...
          </div>
        ) : (
          /* Admin Pinterest Column Masonry Grid */
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
            {galleryList.map((item) => {
              const itemId = item._id || item.id;
              return (
                <div key={itemId} className="break-inside-avoid mb-6">
                  <div className="group relative bg-[#111113] border border-white/[0.06] rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between hover:border-[#B8976A]/30 transition-all duration-500">
                    <div className="relative overflow-hidden bg-[#18181B]">
                      <img
                        src={item.image}
                        alt={item.category || item.title}
                        className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                      />
                      
                      {/* Style Label Badge */}
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#080808]/90 via-[#080808]/40 to-transparent pointer-events-none flex items-end justify-between p-4">
                        <span className="font-subheading text-xs text-[#EAEAEA] tracking-wide font-medium bg-[#080808]/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/[0.1]">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Footer with Edit and Delete Buttons */}
                    <div className="p-4 border-t border-white/[0.04] bg-[#111113] flex items-center justify-between text-xs font-subheading">
                      <button
                        onClick={() => openEditModal(item)}
                        className="inline-flex items-center gap-1 text-[#B8976A] hover:text-[#D4B88A] transition-colors"
                      >
                        <FiEdit2 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(itemId)}
                        className="p-2 text-[#7A7A85] hover:text-red-400 transition-colors rounded-full hover:bg-white/[0.04]"
                        title="Delete Artwork"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Add / Edit Artwork Modal */}
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
              <span className="text-xs uppercase font-subheading tracking-widest text-[#B8976A] font-medium">Studio Gallery</span>
              <h2 className="font-heading text-3xl text-[#EAEAEA]">{editingItem ? 'Edit Tattoo Artwork' : 'Upload Tattoo Artwork'}</h2>
            </div>

            {successMsg ? (
              <div className="py-10 text-center space-y-3 bg-white/[0.02] border border-[#34D399]/20 rounded-xl">
                <FiCheckCircle className="w-10 h-10 text-[#34D399] mx-auto" />
                <p className="text-sm font-subheading text-[#EAEAEA]">{successMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* File Drop Area */}
                <div className="space-y-2">
                  <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium block">
                    Artwork Image *
                  </label>
                  <div className="relative border-2 border-dashed border-white/[0.1] hover:border-[#B8976A]/40 rounded-xl p-6 text-center transition-colors cursor-pointer bg-[#18181B]">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    {previewUrl ? (
                      <div className="space-y-2">
                        <img src={previewUrl} alt="Preview" className="max-h-48 mx-auto rounded-lg object-contain" />
                        <span className="text-xs text-[#B8976A] font-subheading block">Click or drag to change image</span>
                      </div>
                    ) : (
                      <div className="space-y-2 py-4">
                        <FiUploadCloud className="w-10 h-10 text-[#B8976A] mx-auto" />
                        <p className="text-xs font-subheading text-[#EAEAEA]">Click to browse or drag & drop artwork image</p>
                        <span className="text-[11px] font-body text-[#7A7A85] block">Supports JPG, PNG, WEBP (Max 10MB)</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Style Label Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-subheading uppercase tracking-wider text-[#B8976A] font-medium block">
                    Tattoo Style Label (Category) *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#18181B] border border-[#B8976A]/40 rounded-xl p-4 text-[#EAEAEA] text-sm focus:border-[#B8976A] focus:outline-none font-medium"
                  >
                    {stylesList.map((style) => (
                      <option key={style._id || style.id || style.title} value={style.title}>
                        {style.title}
                      </option>
                    ))}
                    <option value="Micro-Realism">Micro-Realism</option>
                    <option value="Fine Line">Fine Line</option>
                    <option value="Irezumi">Irezumi</option>
                    <option value="Trash Polka">Trash Polka</option>
                    <option value="Custom Art">Custom Art</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium">Artwork Title (Optional)</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Celestial Serpent (Defaults to Style Label if empty)"
                    className="w-full bg-[#18181B] border border-white/[0.06] rounded-xl p-3.5 text-[#EAEAEA] text-sm focus:border-[#B8976A]/50 focus:outline-none"
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
                    {submitting ? 'Saving Artwork...' : editingItem ? 'Save Artwork Changes' : 'Save & Publish Artwork'}
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
