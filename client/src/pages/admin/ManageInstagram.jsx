import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPlus, FiTrash2, FiEdit2, FiUploadCloud, FiX, FiCheckCircle, FiInstagram } from 'react-icons/fi';
import AdminNavbar from '../../components/common/AdminNavbar';

export default function ManageInstagram() {
  const [feedList, setFeedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Form State — Only essential fields
  const [permalink, setPermalink] = useState('https://www.instagram.com/ink_art_tattoostudio/?hl=en');
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
    setPermalink('https://www.instagram.com/ink_art_tattoostudio/?hl=en');
    setSelectedFile(null);
    setPreviewUrl('');
    setModalOpen(true);
  };

  const openEditModal = (post) => {
    setEditingPost(post);
    setPermalink(post.permalink || 'https://www.instagram.com/ink_art_tattoostudio/?hl=en');
    setSelectedFile(null);
    setPreviewUrl(post.image || '');
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
    if (!editingPost && !selectedFile) {
      alert('Please select an image for this Instagram feed post.');
      return;
    }

    try {
      setSubmitting(true);
      const body = new FormData();
      body.append('permalink', permalink);

      if (selectedFile) {
        body.append('imageFile', selectedFile);
      }

      let res;
      if (editingPost) {
        const id = editingPost._id || editingPost.id;
        res = await axios.put(`/api/instagram/${id}`, body, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        res = await axios.post('/api/instagram', body, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      if (res.data && res.data.data) {
        setSuccessMsg(editingPost ? 'Instagram post updated!' : 'New Instagram post added to feed!');
        setTimeout(() => {
          setSuccessMsg('');
          setModalOpen(false);
          fetchFeed();
        }, 1500);
      }
    } catch (err) {
      console.error('Error saving Instagram post:', err);
      alert('Failed to save Instagram post. Make sure backend server is running.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this post from the feed?')) return;
    try {
      await axios.delete(`/api/instagram/${id}`);
      setFeedList(feedList.filter((p) => (p._id || p.id) !== id));
    } catch (err) {
      console.error('Error deleting Instagram post:', err);
      setFeedList(feedList.filter((p) => (p._id || p.id) !== id));
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
              Social Integration
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#EAEAEA] tracking-tight">
              Manage <span className="text-gradient-gold italic font-light">Instagram Feed</span>
            </h1>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 font-subheading text-xs uppercase tracking-wider bg-[#B8976A] text-[#080808] px-6 py-3 rounded-full font-medium hover:bg-[#D4B88A] transition-all duration-300 shadow-md self-start sm:self-auto"
          >
            <FiPlus className="w-4 h-4" />
            <span>Add Feed Post</span>
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center text-[#7A7A85] font-subheading text-sm">
            Loading Instagram feed posts...
          </div>
        ) : feedList.length === 0 ? (
          <div className="py-20 text-center text-[#7A7A85] font-body text-sm font-light">
            No Instagram posts added yet. Click "Add Feed Post" to feature artwork.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 gap-4">
            {feedList.map((post) => {
              const postId = post._id || post.id;
              return (
                <div key={postId} className="bg-[#111113] border border-white/[0.06] rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between hover:border-[#B8976A]/40 transition-colors">
                  <div className="aspect-square bg-[#18181B] relative overflow-hidden group">
                    <img src={post.image} alt="Instagram Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 right-3 bg-[#080808]/80 backdrop-blur-md p-2 rounded-full border border-white/[0.1] text-[#B8976A]">
                      <FiInstagram className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="p-4 flex items-center justify-between border-t border-white/[0.06] bg-[#111113]">
                    <a
                      href={post.permalink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-subheading text-[#B8976A] hover:underline flex items-center gap-1"
                    >
                      <span>View on IG ↗</span>
                    </a>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openEditModal(post)}
                        className="p-2 rounded-lg bg-white/[0.04] text-[#7A7A85] hover:text-[#B8976A] hover:bg-white/[0.08] transition-colors"
                        title="Edit Post"
                      >
                        <FiEdit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(postId)}
                        className="p-2 rounded-lg bg-white/[0.04] text-[#7A7A85] hover:text-red-400 hover:bg-white/[0.08] transition-colors"
                        title="Delete Post"
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

      {/* Add/Edit Modal — Responsive Max-Height with Internal Scroll */}
      {modalOpen && (
        <div data-lenis-prevent className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#111113] border border-white/[0.08] rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-auto max-h-[90vh] flex flex-col">
            
            {/* Fixed Header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 shrink-0">
              <h3 className="font-heading text-2xl text-[#EAEAEA]">
                {editingPost ? 'Edit Instagram Feed Post' : 'Add Instagram Feed Post'}
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
                    Feed Post Image *
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
                        <p className="text-xs font-subheading text-[#EAEAEA]">Click to browse or drag & drop image</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-subheading uppercase tracking-wider text-[#7A7A85] font-medium block">
                    Instagram Post Link (Permalink) *
                  </label>
                  <input
                    type="url"
                    required
                    value={permalink}
                    onChange={(e) => setPermalink(e.target.value)}
                    placeholder="https://www.instagram.com/p/..."
                    className="w-full bg-[#18181B] border border-white/[0.06] rounded-xl p-3.5 text-[#EAEAEA] text-sm focus:border-[#B8976A]/50 focus:outline-none"
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
                    {submitting ? 'Saving Post...' : editingPost ? 'Save Changes' : 'Save & Publish Post'}
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
