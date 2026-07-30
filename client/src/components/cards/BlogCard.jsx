import React from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiArrowRight } from 'react-icons/fi';

export default function BlogCard({ post }) {
  return (
    <article className="group bg-[#111113] border border-white/[0.06] rounded-xl overflow-hidden hover:border-[#B8976A]/20 transition-all duration-700 flex flex-col h-full hover:shadow-xl hover:shadow-black/20">
      <div className="relative aspect-[16/9] overflow-hidden bg-[#18181B] rounded-t-xl">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 bg-[#080808]/80 backdrop-blur-md border border-white/[0.06] px-3.5 py-1 rounded-full text-[11px] font-subheading uppercase tracking-widest text-[#B8976A]">
          {post.category}
        </div>
      </div>

      <div className="p-6 sm:p-7 space-y-5 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-xs font-subheading text-[#7A7A85]">
            <span>{post.date}</span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <FiClock className="w-3.5 h-3.5 text-[#B8976A]" />
              {post.readTime}
            </span>
          </div>

          <h3 className="font-heading text-2xl tracking-tight text-[#EAEAEA] group-hover:text-[#D4B88A] transition-colors duration-500 leading-tight">
            {post.title}
          </h3>

          <p className="text-sm font-body text-[#7A7A85] line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        <div className="pt-5 border-t border-white/[0.06] flex items-center justify-between">
          <span className="text-xs font-body text-[#7A7A85]">
            By <strong className="text-[#EAEAEA] font-medium">{post.author}</strong>
          </span>

          <Link
            to={`/contact`}
            className="inline-flex items-center gap-1.5 font-subheading text-xs font-medium tracking-wide text-[#B8976A] hover:text-[#D4B88A] transition-colors duration-300"
            data-cursor="Read"
          >
            <span>Read Article</span>
            <FiArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </article>
  );
}
