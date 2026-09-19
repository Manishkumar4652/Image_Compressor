'use client';

import React, { useEffect, useState } from 'react';

export function ScrollBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Calculate dynamic scroll transformations
  const orb1Y = scrollY * 0.2;
  const orb2Y = -scrollY * 0.12;
  const orb3Y = scrollY * 0.28;
  const rotateDeg = (scrollY * 0.04) % 360;
  const scaleFactor = 1 + Math.sin(scrollY * 0.002) * 0.12;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#f8f7fd]">
      {/* Subtle Soft Background Grid Lines */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(147, 51, 234, 0.08) 1px, transparent 0)`,
          backgroundSize: '48px 48px',
          transform: `translateY(${scrollY * 0.05}px)`
        }}
      />

      {/* Orb 1: Soft Pastel Lavender Glow */}
      <div
        className="absolute -top-32 -left-20 h-[650px] w-[650px] rounded-full opacity-60 blur-[140px] transition-transform duration-75"
        style={{
          background: 'radial-gradient(circle, rgba(216,180,254,0.7) 0%, rgba(192,132,252,0.3) 50%, transparent 100%)',
          transform: `translate3d(0, ${orb1Y}px, 0) rotate(${rotateDeg}deg) scale(${scaleFactor})`,
        }}
      />

      {/* Orb 2: Soft Cyan / Sky Blue Glow */}
      <div
        className="absolute top-1/4 -right-32 h-[550px] w-[550px] rounded-full opacity-55 blur-[130px] transition-transform duration-75"
        style={{
          background: 'radial-gradient(circle, rgba(186,230,253,0.8) 0%, rgba(125,211,252,0.35) 50%, transparent 100%)',
          transform: `translate3d(${Math.sin(scrollY * 0.0025) * 45}px, ${orb2Y}px, 0) scale(${1.8 - scaleFactor})`,
        }}
      />

      {/* Orb 3: Mint Green & Soft Rose Aura */}
      <div
        className="absolute top-2/3 left-1/4 h-[600px] w-[600px] rounded-full opacity-50 blur-[150px] transition-transform duration-75"
        style={{
          background: 'radial-gradient(circle, rgba(220,252,231,0.7) 0%, rgba(254,205,211,0.35) 55%, transparent 100%)',
          transform: `translate3d(${Math.cos(scrollY * 0.002) * 60}px, ${orb3Y}px, 0) rotate(${-rotateDeg}deg)`,
        }}
      />

      {/* Top Ambient Highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[350px] bg-gradient-to-b from-purple-100/40 via-transparent to-transparent blur-2xl pointer-events-none" />
    </div>
  );
}
