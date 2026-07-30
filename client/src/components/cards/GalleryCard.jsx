import React from 'react';

export default function GalleryCard({ item, onOpenLightbox, aspectClassName }) {
  return (
    <div
      onClick={() => onOpenLightbox(item)}
      className="group relative bg-[#111113] border border-white/[0.06] rounded-xl overflow-hidden cursor-pointer hover:border-[#B8976A]/30 transition-all duration-500 shadow-lg h-full"
      data-cursor="Inspect"
    >
      <div className={`relative overflow-hidden bg-[#18181B] ${aspectClassName || 'aspect-[3/4]'}`}>
        <img
          src={item.image}
          alt={item.category || 'Tattoo Art'}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          loading="lazy"
        />
        
        {/* Bottom Gradient Shade on Hover */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#080808]/90 via-[#080808]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
          <span className="font-heading text-2xl text-[#EAEAEA] tracking-wide font-light">
            {item.category}
          </span>
        </div>
      </div>
    </div>
  );
}
