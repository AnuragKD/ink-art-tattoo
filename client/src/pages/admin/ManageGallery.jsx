import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPlus, FiTrash2, FiEdit2, FiUploadCloud, FiX, FiCheckCircle } from 'react-icons/fi';
import AdminNavbar from '../../components/common/AdminNavbar';

export default function ManageGallery() {
  const [galleryList, setGalleryList] = useState([]);
  const [stylesList, setStylesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Form State — Only essential fields shown on frontend
  const [category, setCategory] = useState('Realism');
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

      if (galleryRes.status === 'fulfilled' && galleryRes.value.data?.data) {
        setGalleryList(galleryRes.value.data.data);
      }

      if (stylesRes.status === 'fulfilled' && stylesRes.value.data?.data) {
        setStylesList(stylesRes.value.data.data);
      }
    } catch (err) {
      console.warn('Backend API error loading gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingItem(null);
    setCategory(stylesList.length > 0 ? stylesList[0].title : 'Realism');
    setSelectedFile(null);
    setPreviewUrl('');
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setCategory(item.category || 'Realism');
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
    if (!editingItem && !selectedFile) {
      alert('Please select an artwork image to upload.');
      return;
    }

    try {
      setSubmitting(true);
      const body = new FormData();
      body.append('category', category);
      body.append('title', category);

      if (selectedFile) {
        body.append('imageFile', selectedFile);
      }

      let res;
      if (editingItem) {
        const id = editingItem._id || editingItem.id;
        res = await axios.put(`/api/gallery/${id}`, body, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        res = await axios.post('/api/gallery', body, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      if (res.data && res.data.data) {
        setSuccessMsg(editingItem ? 'Artwork category updated!' : 'New artwork published to gallery!');
        setTimeout(() => {
          setSuccessMsg('');
          setModalOpen(false);
          fetchData();
        }, 1500);
      }
    } catch (err) {
      console.error('Error saving gallery item:', err);
      alert('Failed to save artwork. Make sure backend server is running.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this artwork from the gallery?')) return;
    try {
      await axios.delete(`/api/gallery/${id}`);
      setGalleryList(galleryList.filter((g) => (g._id || g.id) !== id));
    } catch (err) {
      console.error('Error deleting gallery item:', err);
      setGalleryList(galleryList.filter((g) => (g._id || g.id) !== id));
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
              Portfolio Catalog
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#EAEAEA] tracking-tight">
              Manage <span className="text-gradient-gold italic font-light">Gallery Artworks</span>
            </h1>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 font-subheading text-xs uppercase tracking-wider bg-[#B8976A] text-[#080808] px-6 py-3 rounded-full font-medium hover:bg-[#D4B88A] transition-all duration-300 shadow-md self-start sm:self-auto"
          >
            <FiPlus className="w-4 h-4" />
            <span>Upload New Artwork</span>
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center text-[#7A7A85] font-subheading text-sm">
            Loading gallery artworks...
          </div>
        ) : galleryList.length === 0 ? (
          <div className="py-20 text-center text-[#7A7A85] font-body text-sm font-light">
            No gallery items uploaded yet. Click "Upload New Artwork" to publish images.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {galleryList.map((item) => {
              const itemId = item._id || item.id;
              return (
                <div key={itemId} className="group bg-[#111113] border border-white/[0.06] rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between hover:border-[#B8976A]/40 transition-colors">
                  <div className="aspect-[3/4] bg-[#18181B] relative overflow-hidden">
                    <img src={item.image} alt={item.category} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 bg-[#080808]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/[0.1] text-[10px] font-subheading uppercase text-[#B8976A] font-medium tracking-wider">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-4 flex items-center justify-between border-t border-white/[0.06] bg-[#111113]">
                    <span className="font-subheading text-xs text-[#EAEAEA] font-medium truncate max-w-[120px]">
                      {item.category}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-2 rounded-lg bg-white/[0.04] text-[#7A7A85] hover:text-[#B8976A] hover:bg-white/[0.08] transition-colors"
                        title="Edit Artwork"
                      >
                        <FiEdit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(itemId)}
                        className="p-2 rounded-lg bg-white/[0.04] text-[#7A7A85] hover:text-red-400 hover:bg-white/[0.08] transition-colors"
                        title="Delete Artwork"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </main>

      {/* Upload/Edit Modal — Responsive Max-Height with Internal Scroll */}
      {modalOpen && (
        <div data-lenis-prevent className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#111113] border border-white/[0.08] rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-auto max-h-[90vh] flex flex-col">
            
            {/* Fixed Header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 shrink-0">
              <h3 className="font-heading text-2xl text-[#EAEAEA]">
                {editingItem ? 'Edit Gallery Artwork' : 'Upload New Gallery Artwork'}
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
                
                {/* Upload Image Box */}
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
                        <img src={previewUrl} alt="Preview" className="max-h-44 mx-auto rounded-lg object-contain" />
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
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#18181B] border border-[#B8976A]/40 rounded-xl p-3.5 text-[#EAEAEA] text-sm focus:border-[#B8976A] focus:outline-none font-medium"
                  >
                    {stylesList.map((style) => (
                      <option key={style._id || style.id || style.title} value={style.title}>
                        {style.title}
                      </option>
                    ))}
                    <option value="Realism">Realism</option>
                    <option value="Black & Grey">Black & Grey</option>
                    <option value="Fine Line">Fine Line</option>
                    <option value="Minimalist">Minimalist</option>
                    <option value="Traditional">Traditional</option>
                    <option value="Neo-Traditional">Neo-Traditional</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Blackwork">Blackwork</option>
                    <option value="Geometric">Geometric</option>
                    <option value="Dotwork">Dotwork</option>
                    <option value="Watercolor">Watercolor</option>
                    <option value="Lettering">Lettering</option>
                    <option value="Ornamental">Ornamental</option>
                    <option value="Tribal">Tribal</option>
                    <option value="Portrait">Portrait</option>
                  </select>
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
                    {submitting ? 'Saving Artwork...' : editingItem ? 'Save Changes' : 'Save & Publish Artwork'}
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
