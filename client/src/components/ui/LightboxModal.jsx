import React from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

export default function LightboxModal({ item, onClose }) {
  if (!item) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-[#080808]/95 backdrop-blur-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-5xl w-full bg-[#111113] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl shadow-black/80 flex items-center justify-center"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 w-11 h-11 rounded-full bg-[#080808]/80 backdrop-blur-md border border-white/[0.12] text-[#EAEAEA] hover:text-[#B8976A] hover:border-[#B8976A]/40 flex items-center justify-center transition-all duration-300 shadow-xl"
            data-cursor="Close"
          >
            <FiX className="w-5 h-5" />
          </button>

          {/* Full Size Image Container (No Extra Padding) */}
          <div className="relative w-full bg-[#080808] flex items-center justify-center overflow-hidden max-h-[88vh]">
            <img
              src={item.image}
              alt={item.category || item.title}
              className="max-h-[88vh] w-auto max-w-full object-contain"
            />

            {/* Style Label Positioned Right Bottom in Image */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#080808]/90 via-[#080808]/40 to-transparent pointer-events-none flex items-end justify-end p-5">
              <span className="font-heading text-xl sm:text-2xl text-[#EAEAEA] tracking-wide font-light bg-[#080808]/70 backdrop-blur-md px-5 py-2 rounded-full border border-white/[0.1]">
                {item.category || item.title}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
