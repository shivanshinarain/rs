import React, { useState } from 'react';
import { Sparkles, Heart, Star, Compass } from 'lucide-react';
import { loveStoryData } from '../data/loveStory';
import { sound } from '../utils/audioEngine';

export default function Chapter09_Birthdays({ onEasterEggUnlock }) {
  const [constellationConnected, setConstellationConnected] = useState(true);
  const [centerStarClicked, setCenterStarClicked] = useState(false);

  const data = loveStoryData.birthdays;

  const handleCenterClick = () => {
    sound.playConstellationChime();
    setCenterStarClicked(true);
    if (onEasterEggUnlock) onEasterEggUnlock('constellation-center');
  };

  return (
    <section id="chapter-9" className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 flex flex-col justify-center items-center relative z-20">
      <div className="max-w-4xl w-full text-center space-y-8 sm:space-y-10">
        
        {/* Header */}
        <div className="space-y-2 sm:space-y-3">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-universe-dustyPink font-medium px-3.5 py-1.5 rounded-full border border-universe-wine/40 bg-universe-darkBurgundy/40 inline-block">
            Chapter {data.chapterNumber} — {data.tagline}
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-universe-cream">
            {data.headline}
          </h2>
          <p className="font-serif text-lg sm:text-2xl text-universe-blush italic px-2">
            "{data.slogan}"
          </p>
        </div>

        {/* Celestial Constellation Canvas Frame */}
        <div className="relative mx-auto w-full max-w-2xl h-[300px] sm:h-[400px] md:h-[440px] rounded-3xl bg-gradient-to-b from-[#180914] via-[#0e040a] to-[#070306] border border-universe-wine/60 shadow-2xl p-4 sm:p-6 overflow-hidden select-none">
          
          {/* Subtle cosmic background glows */}
          <div className="absolute top-1/4 left-1/4 w-32 sm:w-44 h-32 sm:h-44 rounded-full bg-universe-wine/25 blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-36 sm:w-52 h-36 sm:h-52 rounded-full bg-universe-crimson/20 blur-3xl pointer-events-none" />

          {/* SVG Constellation Lines */}
          <svg className="w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Scorpio constellation lines (Left - Rashi) */}
            <g stroke="#f5b8c6" strokeWidth="1.6" opacity="0.6" strokeDasharray="3 3">
              <line x1="120" y1="180" x2="160" y2="150" />
              <line x1="160" y1="150" x2="200" y2="170" />
              <line x1="200" y1="170" x2="210" y2="230" />
              <line x1="210" y1="230" x2="180" y2="280" />
              <line x1="180" y1="280" x2="140" y2="290" />
            </g>

            {/* Virgo constellation lines (Right - Shivi) */}
            <g stroke="#d8cbe4" strokeWidth="1.6" opacity="0.6" strokeDasharray="3 3">
              <line x1="480" y1="170" x2="440" y2="140" />
              <line x1="440" y1="140" x2="400" y2="160" />
              <line x1="400" y1="160" x2="390" y2="220" />
              <line x1="390" y1="220" x2="420" y2="270" />
              <line x1="420" y1="270" x2="460" y2="280" />
            </g>

            {/* Connecting Heart Constellation (Red Thread in the Sky) */}
            {constellationConnected && (
              <g>
                <path
                  d="M 300 130 
                     C 220 50, 160 170, 300 320 
                     C 440 170, 380 50, 300 130 Z"
                  stroke="#ff285e"
                  strokeWidth="2.5"
                  fill="rgba(255, 40, 94, 0.05)"
                  filter="url(#starGlow)"
                  className="animate-pulse-slow"
                />
              </g>
            )}

            {/* Scorpio Stars */}
            <circle cx="120" cy="180" r="4" fill="#f5b8c6" filter="url(#starGlow)" />
            <circle cx="160" cy="150" r="5" fill="#ffffff" filter="url(#starGlow)" />
            <circle cx="200" cy="170" r="4" fill="#f5b8c6" filter="url(#starGlow)" />
            <circle cx="210" cy="230" r="6" fill="#f5cb68" filter="url(#starGlow)" />
            <circle cx="180" cy="280" r="4" fill="#f5b8c6" filter="url(#starGlow)" />
            <circle cx="140" cy="290" r="3.5" fill="#f5b8c6" filter="url(#starGlow)" />

            {/* Virgo Stars */}
            <circle cx="480" cy="170" r="4" fill="#d8cbe4" filter="url(#starGlow)" />
            <circle cx="440" cy="140" r="5" fill="#ffffff" filter="url(#starGlow)" />
            <circle cx="400" cy="160" r="4" fill="#d8cbe4" filter="url(#starGlow)" />
            <circle cx="390" cy="220" r="6" fill="#f5cb68" filter="url(#starGlow)" />
            <circle cx="420" cy="270" r="4" fill="#d8cbe4" filter="url(#starGlow)" />
            <circle cx="460" cy="280" r="3.5" fill="#d8cbe4" filter="url(#starGlow)" />

            {/* Central Heart Star (Easter Egg Trigger) */}
            <g
              onClick={handleCenterClick}
              className="cursor-pointer touch-manipulation"
              title="Click the heart star of destiny"
            >
              <circle cx="300" cy="210" r="10" fill="#ffffff" filter="url(#starGlow)" className="animate-ping opacity-60" />
              <circle cx="300" cy="210" r="7" fill="#ff285e" filter="url(#starGlow)" />
              <circle cx="300" cy="210" r="3.5" fill="#ffffff" />
            </g>
          </svg>

          {/* Left Tag: Rashi */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 text-left">
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-universe-blush">
              {data.rashi.sign}
            </span>
            <h4 className="font-serif text-base sm:text-xl text-universe-cream font-medium">
              {data.rashi.name}
            </h4>
            <p className="text-[10px] sm:text-xs text-universe-dustyPink font-mono">{data.rashi.date}</p>
          </div>

          {/* Right Tag: Shivi */}
          <div className="absolute top-4 sm:top-6 right-4 sm:right-6 text-right">
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-universe-lavender">
              {data.shivi.sign}
            </span>
            <h4 className="font-serif text-base sm:text-xl text-universe-cream font-medium">
              {data.shivi.name}
            </h4>
            <p className="text-[10px] sm:text-xs text-universe-lavender font-mono">{data.shivi.date}</p>
          </div>

          {/* Bottom Center Indicator */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
            <span className="text-[9px] sm:text-[11px] text-universe-blush uppercase tracking-widest bg-universe-black/80 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-universe-wine/50">
              {centerStarClicked ? '✨ Cosmic Soulmates 99.9% ✨' : 'Tap glowing center star ♡'}
            </span>
          </div>
        </div>

        {/* Character Compatibility Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-left">
          <div className="p-5 sm:p-6 rounded-3xl bg-universe-darkBurgundy/40 border border-universe-wine/40 space-y-1.5 sm:space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="font-serif text-lg sm:text-xl text-universe-blush">{data.rashi.name}'s Constellation</h4>
              <span className="text-xs font-mono text-universe-dustyPink">{data.rashi.sign}</span>
            </div>
            <p className="text-xs text-universe-lavender">{data.rashi.constellation}</p>
            <p className="text-xs sm:text-sm text-universe-cream/80 leading-relaxed pt-1 font-sans">
              {data.rashi.character}
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-universe-darkBurgundy/40 border border-universe-wine/40 space-y-1.5 sm:space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="font-serif text-lg sm:text-xl text-universe-lavender">{data.shivi.name}'s Constellation</h4>
              <span className="text-xs font-mono text-universe-lavender">{data.shivi.sign}</span>
            </div>
            <p className="text-xs text-universe-dustyPink">{data.shivi.constellation}</p>
            <p className="text-xs sm:text-sm text-universe-cream/80 leading-relaxed pt-1 font-sans">
              {data.shivi.character}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
