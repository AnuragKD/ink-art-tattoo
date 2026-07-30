import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function MagneticButton({ 
  children, 
  className = '', 
  onClick, 
  dataCursor,
  variant = 'primary',
  type = 'button',
  disabled = false
}) {
  const buttonRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button || disabled) return;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * 0.25,
        y: y * 0.25,
        duration: 0.5,
        ease: 'power2.out',
      });

      if (textRef.current) {
        gsap.to(textRef.current, {
          x: x * 0.12,
          y: y * 0.12,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.4)',
      });

      if (textRef.current) {
        gsap.to(textRef.current, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.4)',
        });
      }
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [disabled]);

  const baseStyles = "relative inline-flex items-center justify-center font-subheading font-medium tracking-wide text-sm px-8 sm:px-10 py-3.5 sm:py-4 transition-all duration-500 overflow-hidden group select-none cursor-pointer rounded-full";
  
  const variantStyles = {
    primary: "bg-[#B8976A] text-[#080808] hover:bg-[#D4B88A] hover:shadow-lg hover:shadow-[#B8976A]/10",
    secondary: "bg-transparent text-[#EAEAEA] border border-white/[0.1] hover:border-[#B8976A]/40 hover:bg-white/[0.03]",
    gold: "bg-gradient-to-r from-[#D4B88A] to-[#B8976A] text-[#080808] hover:brightness-110 font-semibold",
    ghost: "bg-transparent text-[#7A7A85] hover:text-[#EAEAEA] border border-transparent hover:border-white/[0.06]"
  };

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-cursor={dataCursor}
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${className}`}
    >
      <span ref={textRef} className="relative z-10 flex items-center gap-2.5">
        {children}
      </span>
    </button>
  );
}
