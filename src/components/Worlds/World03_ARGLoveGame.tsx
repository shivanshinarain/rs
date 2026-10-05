import React from 'react';
import ARGGameEngine from '../ARGGameEngine';
import TinyCharacters from '../Effects/TinyCharacters';
import { Sparkles, Gamepad2 } from 'lucide-react';
import { sound } from '../../utils/audioEngine';

interface World03Props {
  onNextWorld?: () => void;
}

export default function World03_ARGLoveGame({ onNextWorld }: World03Props) {
  return (
    <div className="relative w-full space-y-12 sm:space-y-16">
      
      {/* World Intro */}
      <section className="text-center pt-8 px-4 space-y-3">
        <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-universe-dustyPink px-3.5 py-1.5 rounded-full border border-universe-wine/40 bg-universe-darkBurgundy/40 inline-block">
          WORLD 03 — THE ARG LOVE GAME
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-universe-cream">
          11 Chapters of Us
        </h1>
        <p className="font-serif italic text-sm sm:text-base text-universe-blush max-w-lg mx-auto">
          "Solve each tactile mini-game to unlock the 11 sacred pieces of our eternal phrase: [ I &nbsp; C H O O S E &nbsp; Y O U ]."
        </p>

        <div className="pt-2">
          <TinyCharacters pose="holding-hands" caption="every chapter brings us closer to the final question" />
        </div>
      </section>

      {/* The Complete ARG Game Engine with all 11 games & Arcade mode */}
      <ARGGameEngine />

      {/* Transition to World 04 */}
      {onNextWorld && (
        <div className="text-center py-10">
          <button
            onClick={() => {
              sound.playHeartClick();
              onNextWorld();
            }}
            className="px-8 py-3.5 rounded-full bg-universe-wine/30 border border-universe-wine/60 text-universe-cream hover:text-white hover:border-universe-glowingRed text-xs font-mono uppercase tracking-wider shadow-sm hover:scale-105 transition-all"
          >
            Enter World 04: The Inner Sanctuary →
          </button>
        </div>
      )}

    </div>
  );
}
