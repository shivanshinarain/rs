import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { sound } from '../../utils/audioEngine';

export default function PermanentRedThread() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [threadComplete, setThreadComplete] = useState(false);
  const [showThreadQuote, setShowThreadQuote] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const progress = Math.min(1, Math.max(0, window.scrollY / totalHeight));
      setScrollProgress(progress);

      if (progress > 0.95 && !threadComplete) {
        setThreadComplete(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threadComplete]);

  const handleThreadHeartClick = () => {
    sound.playHeartClick();
    setShowThreadQuote(true);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* SVG Thread Container */}
      <svg className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <filter id="crimsonThreadGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* The Animated Crimson Silk Thread Line */}
        <path
          d={`M ${15 + Math.sin(scrollProgress * Math.PI * 4) * 8} 0 
              C ${25 + Math.cos(scrollProgress * Math.PI * 2) * 10} 250, 
                ${10 + Math.sin(scrollProgress * Math.PI * 3) * 10} 500, 
                ${20 + Math.cos(scrollProgress * Math.PI * 4) * 8} 1000`}
          stroke="#ff285e"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4 2"
          opacity={0.35 + scrollProgress * 0.45}
          filter="url(#crimsonThreadGlow)"
        />
      </svg>

      {/* Floating Bottom Right Interactive Thread Heart */}
      <div className="fixed bottom-6 left-6 z-30 pointer-events-auto">
        <button
          onClick={handleThreadHeartClick}
          className="group relative w-10 h-10 rounded-full bg-universe-darkBurgundy/80 border border-universe-crimson/70 shadow-glow-red flex items-center justify-center hover:scale-110 active:scale-95 transition-all touch-manipulation"
          title="The Red Thread of Fate"
        >
          <Heart className="w-4 h-4 text-universe-glowingRed fill-universe-glowingRed animate-pulse" />
          <span
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-universe-gold border border-black"
            style={{ opacity: scrollProgress > 0.8 ? 1 : 0.4 }}
          />
        </button>
      </div>

      {/* Thread Epiphany Modal */}
      {showThreadQuote && (
        <div
          onClick={() => setShowThreadQuote(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6 text-center pointer-events-auto cursor-pointer animate-fadeIn"
        >
          <div className="max-w-md space-y-4">
            <Heart className="w-12 h-12 mx-auto text-universe-glowingRed fill-universe-glowingRed animate-pulse" />
            <h3 className="font-serif italic text-2xl sm:text-3xl text-universe-cream">
              "you were never following the thread."
            </h3>
            <p className="font-serif italic text-lg sm:text-2xl text-universe-gold">
              "you were the thread."
            </p>
            <span className="text-[10px] font-mono text-universe-lavender/60 block pt-4">
              Tap anywhere to return ♡
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
