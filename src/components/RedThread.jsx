import React, { useEffect, useState } from 'react';

/**
 * Custom Glowing Red Thread of Fate
 * Weaves gently throughout the experience, connecting all 14 chapters.
 */
export default function RedThread({ scrollProgress = 0 }) {
  const [pulseOffset, setPulseOffset] = useState(0);

  useEffect(() => {
    let animId;
    let start = Date.now();
    const tick = () => {
      setPulseOffset(((Date.now() - start) * 0.05) % 100);
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-40 sm:w-64 md:w-96 pointer-events-none z-10 overflow-hidden opacity-30 sm:opacity-50 md:opacity-60 transition-opacity">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="threadGlow" x="-50%" y="-20%" width="200%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="threadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff285e" stopOpacity="0.1" />
            <stop offset="10%" stopColor="#ff285e" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ff4d79" stopOpacity="1" />
            <stop offset="90%" stopColor="#ff285e" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#c21e42" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* The Weaving Path */}
        <path
          d="M 50 0 
             Q 75 100 50 200 
             T 50 400 
             Q 25 500 50 600 
             T 50 800 
             Q 75 900 50 1000"
          stroke="url(#threadGrad)"
          strokeWidth="2.2"
          fill="none"
          filter="url(#threadGlow)"
          strokeDasharray="8 4"
        />

        {/* Pulsing Light Bead Traveling along Thread */}
        <circle
          cx="50"
          cy={(pulseOffset * 10) % 1000}
          r="4.5"
          fill="#ffffff"
          filter="url(#threadGlow)"
        />
        <circle
          cx="50"
          cy={(pulseOffset * 10) % 1000}
          r="8"
          fill="#ff285e"
          opacity="0.4"
          filter="url(#threadGlow)"
        />
      </svg>
    </div>
  );
}
