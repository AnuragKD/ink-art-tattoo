import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiPlus, FiTrash2, FiEdit2, FiArrowLeft, FiUploadCloud, FiX, FiCheckCircle, FiInstagram } from 'react-icons/fi';

export default function ManageInstagram() {
  const [feedList, setFeedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    permalink: 'https://www.instagram.com/ink_art_tattoostudio/?hl=en',
    likes: '1.8k',
    comments: '95',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/instagram');
      if (res.data && res.data.data) {
        setFeedList(res.data.data);
      }
    } catch (err) {
      console.warn('Error fetching Instagram feed:', err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingPost(null);
    setFormData({
      permalink: 'https://www.instagram.com/ink_art_tattoostudio/?hl=en',
      likes: '1.8k',
      comments: '95',
    });
    setSelectedFile(null);
    setPreviewUrl('');
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingPost(item);
    setFormData({
      permalink: item.permalink || 'https://www.instagram.com/ink_art_tattoostudio/?hl=en',
      likes: item.likes || '1.8k',
      comments: item.comments || '95',
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
      alert('Please select an Instagram post image file.');
      return;
    }

    try {
      setSubmitting(true);
      const body = new FormData();
      body.append('permalink', formData.permalink);
      body.append('likes', formData.likes);
      body.append('comments', formData.comments);

      if (selectedFile) {
        body.append('imageFile', selectedFile);
      }

      let res;
      if (editingPost && editingPost._id) {
        res = await axios.put(`/api/instagram/${editingPost._id}`, body, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        res = await axios.post('/api/instagram', body, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      if (res.data && res.data.data) {
        setSuccessMsg(editingPost ? 'Instagram feed post updated successfully!' : 'Instagram feed image uploaded successfully to Cloudinary!');
        setTimeout(() => {
          setSuccessMsg('');
          setModalOpen(false);
          fetchFeed();
        }, 1500);
      }
    } catch (err) {
      console.error('Error saving Instagram post:', err);
      alert('Failed to save post. Make sure server is running.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this Instagram feed post?')) return;

    try {
      await axios.delete(`/api/instagram/${id}`);
      setFeedList(feedList.filter((item) => (item._id || item.id) !== id));
    } catch (err) {
      console.warn('Backend delete failed, removing locally:', err);
      setFeedList(feedList.filter((item) => (item._id || item.id) !== id));
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
              Manage <span className="text-gradient-gold italic font-light">Instagram Feed</span>
            </h1>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2.5 bg-[#B8976A] text-[#080808] font-subheading text-xs uppercase tracking-wider px-7 py-3.5 rounded-full font-medium hover:bg-[#D4B88A] transition-all duration-500 shadow-lg shadow-[#B8976A]/10"
          >
            <FiPlus className="w-4 h-4" /> Add Instagram Feed Image
          </button>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="py-20 text-center text-[#7A7A85] font-subheading text-sm">
            Loading Instagram feed images...
          </div>
        ) : (
          /* Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {feedList.map((item) => {
              const itemId = item._id || item.id;
              return (
                <div key={itemId} className="bg-[#111113] border border-white/[0.06] rounded-xl p-4 space-y-4 shadow-xl flex flex-col justify-between">
                  <div className="aspect-square bg-[#18181B] rounded-lg overflow-hidden relative border border-white/[0.06]">
                    <img src={item.image} alt="Instagram Post" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-center justify-between pt-1 text-xs font-subheading text-[#7A7A85]">
                    <div className="space-y-0.5">
                      <span className="text-[#EAEAEA] font-medium block">♥ {item.likes || '1.8k'}</span>
                      <span className="text-[11px] block text-[#B8976A]">@ink_art_tattoostudio</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-2 text-[#B8976A] hover:text-[#D4B88A] transition-colors rounded-full hover:bg-white/[0.04]"
                        title="Edit Post"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(itemId)}
                        className="p-2 text-[#7A7A85] hover:text-red-400 transition-colors rounded-full hover:bg-white/[0.04]"
                        title="Delete Post"
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

      {/* Add / Edit Instagram Feed Modal */}
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
              <span className="text-xs uppercase font-subheading tracking-widest text-[#B8976A] font-medium flex items-center gap-1.5">
                <FiInstagram className="w-4 h-4" /> Instagram Feed Manager
              </span>
              <h2 className="font-heading text-3xl text-[#EAEAEA]">{editingPost ? 'Edit Instagram Feed Post' : 'Add Feed Image'}</h2>
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
                    Feed Image *
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
                        <p className="text-xs font-subheading text-[#EAEAEA]">Click to browse or drag & drop feed image</p>
                        <span className="text-[11px] font-body text-[#7A7A85] block">Supports JPG, PNG, WEBP (Max 10MB)</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium">Likes Count</label>
                    <input
                      type="text"
                      value={formData.likes}
                      onChange={(e) => setFormData({ ...formData, likes: e.target.value })}
                      placeholder="e.g. 1.8k"
                      className="w-full bg-[#18181B] border border-white/[0.06] rounded-xl p-3.5 text-[#EAEAEA] text-sm focus:border-[#B8976A]/50 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium">Comments Count</label>
                    <input
                      type="text"
                      value={formData.comments}
                      onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                      placeholder="e.g. 95"
                      className="w-full bg-[#18181B] border border-white/[0.06] rounded-xl p-3.5 text-[#EAEAEA] text-sm focus:border-[#B8976A]/50 focus:outline-none"
                    />
                  </div>
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
                    {submitting ? 'Saving Post...' : editingPost ? 'Save Post Changes' : 'Save & Publish Post'}
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
