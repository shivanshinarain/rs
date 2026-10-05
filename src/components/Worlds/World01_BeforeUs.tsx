import React, { useState, useEffect } from 'react';
import Chapter01_BeforeWeMet from '../Chapter01_BeforeWeMet';
import Chapter02_TinderMatch from '../Chapter02_TinderMatch';
import TinyCharacters from '../Effects/TinyCharacters';
import { Sparkles, Heart } from 'lucide-react';
import { sound } from '../../utils/audioEngine';

interface World01Props {
  onEasterEggUnlock?: (id: string) => void;
  onNextWorld?: () => void;
}

export default function World01_BeforeUs({ onEasterEggUnlock, onNextWorld }: World01Props) {
  const [starsConverged, setStarsConverged] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStarsConverged(true);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full space-y-16 sm:space-y-24">
      
      {/* Cinematic Universe Opening Scene */}
      <section className="min-h-[70vh] sm:min-h-[85vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden select-none">
        
        {/* Converging Cosmic Stars Visual */}
        <div className="relative w-72 sm:w-96 h-72 sm:h-96 mx-auto mb-6 flex items-center justify-center">
          {/* Star A: Shivi */}
          <div
            className={`absolute w-4 h-4 rounded-full bg-universe-crimson shadow-glow-red transition-all duration-1000 ${
              starsConverged
                ? 'translate-x-[-12px] translate-y-0 scale-125'
                : '-translate-x-32 -translate-y-24 opacity-60'
            }`}
          >
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-mono text-universe-blush whitespace-nowrap">
              Shivi ✦
            </span>
          </div>

          {/* Star B: Rashi */}
          <div
            className={`absolute w-4 h-4 rounded-full bg-universe-gold shadow-glow-gold transition-all duration-1000 ${
              starsConverged
                ? 'translate-x-[12px] translate-y-0 scale-125'
                : 'translate-x-32 translate-y-24 opacity-60'
            }`}
          >
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-mono text-universe-gold whitespace-nowrap">
              ✦ Rashi
            </span>
          </div>

          {/* Connecting Heart when converged */}
          {starsConverged && (
            <div className="absolute inset-0 flex items-center justify-center animate-fadeIn">
              <Heart className="w-8 h-8 text-universe-glowingRed fill-universe-glowingRed animate-pulse shadow-glow-red" />
            </div>
          )}
        </div>

        {/* Narrative Words */}
        <div className="space-y-3 max-w-xl mx-auto">
          <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-universe-dustyPink px-3.5 py-1.5 rounded-full border border-universe-wine/40 bg-universe-darkBurgundy/40 inline-block">
            WORLD 01 — BEFORE US
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-universe-cream font-medium">
            Out of everyone in the world…
          </h1>

          <p className="font-serif italic text-lg sm:text-2xl text-universe-gold">
            "somehow, it was you."
          </p>

          <p className="font-sans text-xs sm:text-sm text-universe-lavender/80 max-w-md mx-auto pt-2">
            Before the 3 AM whispers, before we knew each other's laughter, two souls were wandering across 8 billion people, slowly bending toward one another.
          </p>
        </div>

        {/* Recurring Cute Characters */}
        <div className="mt-8">
          <TinyCharacters pose="stargazing" caption="two stars finding each other in an infinite sky" />
        </div>
      </section>

      {/* Chapter 01: Before We Met */}
      <Chapter01_BeforeWeMet />

      {/* Chapter 02: Tinder Match */}
      <Chapter02_TinderMatch />

      {/* Transition to World 02 */}
      {onNextWorld && (
        <div className="text-center py-10">
          <button
            onClick={() => {
              sound.playHeartClick();
              onNextWorld();
            }}
            className="px-8 py-3.5 rounded-full bg-universe-wine/30 border border-universe-wine/60 text-universe-cream hover:text-white hover:border-universe-glowingRed text-xs font-mono uppercase tracking-wider shadow-sm hover:scale-105 transition-all"
          >
            Enter World 02: The Little Universe →
          </button>
        </div>
      )}

    </div>
  );
}
