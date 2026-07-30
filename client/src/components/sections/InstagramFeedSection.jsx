import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiInstagram, FiHeart, FiMessageCircle } from 'react-icons/fi';
import { STUDIO_INFO } from '../../constants/studioData';

export default function InstagramFeedSection() {
  const [posts, setPosts] = useState([
    {
      id: "ig-1",
      image: "https://images.unsplash.com/photo-1598371839696-5c5bb00bd472?auto=format&fit=crop&w=600&q=80",
      permalink: "https://www.instagram.com/ink_art_tattoostudio/?hl=en",
      likes: "1.8k",
      comments: "94"
    },
    {
      id: "ig-2",
      image: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?auto=format&fit=crop&w=600&q=80",
      permalink: "https://www.instagram.com/ink_art_tattoostudio/?hl=en",
      likes: "2.4k",
      comments: "152"
    },
    {
      id: "ig-3",
      image: "https://images.unsplash.com/photo-1550537687-c91072c4792d?auto=format&fit=crop&w=600&q=80",
      permalink: "https://www.instagram.com/ink_art_tattoostudio/?hl=en",
      likes: "1.1k",
      comments: "68"
    },
    {
      id: "ig-4",
      image: "https://images.unsplash.com/photo-1590246814884-578a37440207?auto=format&fit=crop&w=600&q=80",
      permalink: "https://www.instagram.com/ink_art_tattoostudio/?hl=en",
      likes: "3.5k",
      comments: "230"
    }
  ]);

  useEffect(() => {
    fetchInstagramFeed();
  }, []);

  const fetchInstagramFeed = async () => {
    try {
      const res = await axios.get('/api/instagram');
      if (res.data && res.data.data && res.data.data.length > 0) {
        setPosts(res.data.data);
      }
    } catch (err) {
      console.warn('Instagram API endpoint unreachable, using default feed:', err);
    }
  };

  const instagramUrl = STUDIO_INFO.socials.instagram || "https://www.instagram.com/ink_art_tattoostudio/?hl=en";

  return (
    <section className="section-padding bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
          <div className="flex items-center gap-3">
            <FiInstagram className="w-5 h-5 text-[#B8976A]" />
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="font-heading text-3xl tracking-tight text-[#EAEAEA] hover:text-[#B8976A] transition-colors"
            >
              @ink_art_tattoostudio
            </a>
          </div>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="font-subheading text-xs uppercase tracking-widest text-[#B8976A] hover:text-[#D4B88A] transition-colors duration-300"
            data-cursor="Follow"
          >
            Follow On Instagram
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink || instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square bg-[#111113] overflow-hidden rounded-xl border border-white/[0.06] hover:border-[#B8976A]/20 transition-all duration-500"
              data-cursor="View"
            >
              <img
                src={post.image}
                alt="Instagram Post"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-[#080808]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-[#EAEAEA] font-subheading text-xs">
                <span className="flex items-center gap-1.5">
                  <FiHeart className="w-4 h-4 text-[#B8976A] fill-current" />
                  {post.likes}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiMessageCircle className="w-4 h-4" />
                  {post.comments}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
