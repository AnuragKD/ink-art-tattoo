import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 1024) return;

    document.body.classList.add('custom-cursor-active');
    setIsVisible(true);

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor], input, select, textarea');
      if (target) {
        setIsHovered(true);
        const customText = target.getAttribute('data-cursor');
        setHoverText(customText || '');
      } else {
        setIsHovered(false);
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Primary Gold Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-[#C5A059] rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: isClicking ? 0.6 : isHovered ? 0.4 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.1 }}
      />

      {/* Outer Ring / Gold Highlight */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[#C5A059]/60 pointer-events-none z-50 flex items-center justify-center text-[10px] uppercase font-bold tracking-widest text-white bg-[#C5A059]/10 backdrop-blur-[2px]"
        animate={{
          x: position.x - (isHovered ? 32 : 18),
          y: position.y - (isHovered ? 32 : 18),
          width: isHovered ? 64 : 36,
          height: isHovered ? 64 : 36,
          scale: isClicking ? 0.85 : 1,
          borderColor: isHovered ? '#C5A059' : 'rgba(197, 160, 89, 0.4)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.2 }}
      >
        {hoverText && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-1 text-center font-subheading text-[9px] text-[#E2C275]"
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
