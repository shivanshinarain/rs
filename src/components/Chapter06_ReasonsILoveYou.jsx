import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Star, Flower2, Image as ImageIcon, Heart, Sparkles, X, CheckCircle } from 'lucide-react';
import { loveStoryData } from '../data/loveStory';
import { sound } from '../utils/audioEngine';

export default function Chapter06_ReasonsILoveYou() {
  const [activeReason, setActiveReason] = useState(null);
  const [discoveredIds, setDiscoveredIds] = useState(new Set([1, 2]));
  const [activeFilter, setActiveFilter] = useState('all');

  const reasons = loveStoryData.reasonsILoveYou;

  const handleReasonClick = (item) => {
    sound.playChime();
    setActiveReason(item);

    const next = new Set(discoveredIds);
    next.add(item.id);
    setDiscoveredIds(next);

    if (next.size === reasons.length) {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#ff285e', '#f5b8c6', '#f5cb68', '#ffffff']
      });
    }
  };

  const filteredReasons = reasons.filter(r => {
    if (activeFilter === 'all') return true;
    return r.type === activeFilter;
  });

  const getReasonIcon = (type, isLarge = false) => {
    const size = isLarge ? 'w-7 h-7 sm:w-8 sm:h-8' : 'w-3.5 h-3.5 sm:w-4 sm:h-4';
    switch (type) {
      case 'star': return <Star className={`${size} text-universe-gold fill-universe-gold/40`} />;
      case 'flower': return <Flower2 className={`${size} text-universe-blush`} />;
      case 'polaroid': return <ImageIcon className={`${size} text-universe-dustyPink`} />;
      default: return <Heart className={`${size} text-universe-glowingRed fill-universe-glowingRed/40`} />;
    }
  };

  return (
    <section id="chapter-6" className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 flex flex-col justify-center items-center relative z-20">
      <div className="max-w-5xl w-full text-center space-y-8 sm:space-y-10">
        
        {/* Header */}
        <div className="space-y-2 sm:space-y-3">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-universe-dustyPink font-medium px-3.5 py-1.5 rounded-full border border-universe-wine/40 bg-universe-darkBurgundy/40 inline-block">
            Chapter 06 — 22 Reasons Why
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-universe-cream">
            Things I Love About You
          </h2>
          <p className="font-sans text-xs sm:text-sm text-universe-lavender/80 max-w-lg mx-auto px-2">
            Click each star, flower, heart, or Polaroid to uncover one of the infinite reasons my soul adores yours.
          </p>

          {/* Discovery Progress Bar */}
          <div className="max-w-xs mx-auto pt-2 space-y-1 px-4">
            <div className="flex justify-between text-xs text-universe-blush">
              <span className="font-mono text-[11px] sm:text-xs">Discovered: {discoveredIds.size} / {reasons.length}</span>
              <span className="text-[11px] sm:text-xs">{Math.round((discoveredIds.size / reasons.length) * 100)}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-universe-darkBurgundy border border-universe-wine/60 overflow-hidden">
              <div
                style={{ width: `${(discoveredIds.size / reasons.length) * 100}%` }}
                className="h-full bg-gradient-to-r from-universe-wine via-universe-crimson to-universe-glowingRed transition-all duration-500 rounded-full shadow-glow-red"
              />
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 px-2">
          {['all', 'heart', 'star', 'flower', 'polaroid'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs uppercase tracking-wider transition-all touch-manipulation ${
                activeFilter === f
                  ? 'bg-universe-crimson text-white border border-universe-glowingRed shadow-glow-red'
                  : 'bg-universe-darkBurgundy/60 border border-universe-wine/40 text-universe-lavender hover:text-universe-blush'
              }`}
            >
              {f === 'all' ? 'All (22)' : `${f}s`}
            </button>
          ))}
        </div>

        {/* 20+ Interactive Objects Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-4 pt-2 sm:pt-4">
          {filteredReasons.map((item) => {
            const isDiscovered = discoveredIds.has(item.id);

            return (
              <div
                key={item.id}
                onClick={() => handleReasonClick(item)}
                className={`relative p-3 sm:p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col items-center justify-center space-y-2 sm:space-y-3 group touch-manipulation ${
                  isDiscovered
                    ? 'bg-universe-darkBurgundy/70 border-universe-wine/70 hover:border-universe-blush hover:scale-105 shadow-md'
                    : 'bg-universe-black/50 border-universe-wine/30 hover:border-universe-glowingRed hover:scale-105 active:scale-95 hover:shadow-glow-red'
                }`}
              >
                {/* Floating Icon */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-universe-wine/30 border border-universe-blush/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getReasonIcon(item.type)}
                </div>

                <div className="text-center w-full px-1">
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-universe-dustyPink block">
                    #{item.id}
                  </span>
                  <h4 className="font-serif text-xs sm:text-sm text-universe-cream truncate">
                    {item.title}
                  </h4>
                </div>

                {isDiscovered ? (
                  <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-universe-blush shrink-0" />
                ) : (
                  <span className="text-[9px] sm:text-[10px] text-universe-lavender/50 tracking-wider">Tap to open</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Reason Modal */}
        {activeReason && (
          <div className="fixed inset-0 z-50 bg-universe-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
            <div className="max-w-md w-full bg-gradient-to-b from-[#200b17] to-[#0c0308] border border-universe-wine/80 rounded-3xl p-5 sm:p-6 text-center space-y-3 sm:space-y-4 shadow-2xl relative max-h-[85vh] overflow-y-auto">
              <button
                onClick={() => setActiveReason(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-universe-lavender hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-universe-wine/40 border border-universe-blush/40 flex items-center justify-center animate-bounce">
                {getReasonIcon(activeReason.type, true)}
              </div>

              <div className="space-y-1">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-universe-dustyPink font-mono">
                  Reason #{activeReason.id} of 22
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-universe-cream">
                  {activeReason.title}
                </h3>
              </div>

              <p className="font-serif italic text-sm sm:text-lg text-universe-blush leading-relaxed px-2 sm:px-4">
                "{activeReason.text}"
              </p>

              <button
                onClick={() => setActiveReason(null)}
                className="px-6 py-2.5 rounded-full bg-universe-crimson text-xs uppercase tracking-widest text-white hover:bg-universe-wine transition-colors shadow-glow-red touch-manipulation"
              >
                Cherish This ♡
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
