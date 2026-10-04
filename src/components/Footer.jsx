import React, { useState } from 'react';
import { Heart, MapPin, Sparkles, ArrowUp, KeyRound } from 'lucide-react';
import { loveStoryData } from '../data/loveStory';
import { sound } from '../utils/audioEngine';

export default function Footer({ onOpenVault, onEasterEggUnlock }) {
  const [copiedCoords, setCopiedCoords] = useState(false);

  const handleCoordsClick = () => {
    sound.playHeartClick();
    setCopiedCoords(true);
    if (onEasterEggUnlock) onEasterEggUnlock('coordinates');
    setTimeout(() => setCopiedCoords(false), 3000);
  };

  const scrollToTop = () => {
    sound.playHeartClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-20 py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-t from-black via-universe-darkBurgundy/40 to-transparent border-t border-universe-wine/30 text-center select-none pb-safe">
      <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Heart Beacon */}
        <div className="flex items-center justify-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-universe-wine/40 border border-universe-glowingRed/50 flex items-center justify-center animate-pulse">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-universe-glowingRed fill-universe-glowingRed" />
          </div>
        </div>

        {/* Dedication Text */}
        <div className="space-y-1.5 sm:space-y-2 px-2">
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-universe-cream">
            A Universe Called Us
          </h3>
          <p className="font-handwritten text-lg sm:text-xl text-universe-blush">
            Created with endless love by Shivi for Rashi
          </p>
          <p className="font-mono text-[10px] sm:text-xs text-universe-lavender/60">
            22 November 2025 • Through Every Lifetime
          </p>
        </div>

        {/* Interactive Coordinates of Fate (Easter Egg 10) */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-4 text-xs font-mono px-2">
          <button
            onClick={handleCoordsClick}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-universe-wine/20 border border-universe-wine/40 text-universe-lavender hover:text-universe-blush hover:border-universe-blush/40 transition-all touch-manipulation text-[11px] sm:text-xs"
            title="Coordinates of where our love story ignited"
          >
            <MapPin className="w-3.5 h-3.5 text-universe-glowingRed shrink-0" />
            <span className="truncate max-w-[240px] sm:max-w-none">
              {copiedCoords ? '📍 22°11\'N, 2025°E — Stored in Heart ♡' : 'Coordinates of Fate: 22.112025°N'}
            </span>
          </button>

          <button
            onClick={onOpenVault}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-universe-wine/20 border border-universe-wine/40 text-universe-gold hover:border-universe-gold transition-all touch-manipulation text-[11px] sm:text-xs"
          >
            <KeyRound className="w-3.5 h-3.5 shrink-0" />
            <span>Secret Vault</span>
          </button>
        </div>

        {/* Scroll To Top */}
        <div className="pt-2 sm:pt-4">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs uppercase tracking-widest text-universe-dustyPink hover:text-universe-blush transition-colors py-2 px-3 touch-manipulation"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Back to the stars</span>
          </button>
        </div>

      </div>
    </footer>
  );
}
