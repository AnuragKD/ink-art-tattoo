import React from 'react';

export default function NoiseBackground() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-40 bg-noise opacity-15 mix-blend-overlay"
      aria-hidden="true"
    />
  );
}
