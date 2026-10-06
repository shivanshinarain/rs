import React, { useState } from 'react';
import ARGGameEngine from '../ARGGameEngine';
import TinyCharacters from '../Effects/TinyCharacters';
import { Sparkles, Gamepad2, Heart, Play, Disc3 } from 'lucide-react';
import { sound } from '../../utils/audioEngine';
import UniverseGameExperience from '../Games/UniverseGameExperience';
import TruthDareWheelGame from '../Games/TruthDareWheelGame';

interface World03Props {
  onNextWorld?: () => void;
}

export default function World03_ARGLoveGame({ onNextWorld }: World03Props) {
  const [isUniverseGameOpen, setIsUniverseGameOpen] = useState(false);
  const [isTruthDareOpen, setIsTruthDareOpen] = useState(false);

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

        {/* Featured Games Launcher Banners */}
        <div className="pt-4 max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* 1. Standalone Story Game */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/40 via-universe-darkBurgundy/60 to-purple-950/40 border border-rose-500/30 flex flex-col justify-between gap-4 text-left shadow-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
                <span className="text-[10px] font-serif uppercase tracking-widest text-rose-200">
                  Featured Standalone Game
                </span>
              </div>
              <h3 className="font-serif text-base text-white font-medium">
                The Story Game
              </h3>
              <p className="text-xs text-rose-200/70">
                Secret riddles, 21 glowing stars & our final proposal letter.
              </p>
            </div>
            <button
              onClick={() => {
                sound.playHeartClick();
                setIsUniverseGameOpen(true);
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-glow-red hover:scale-102 active:scale-98 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Play Story Game</span>
            </button>
          </div>

          {/* 2. Cosmic Wheel: Truth & Dare (LDR WLW Game) */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/50 via-[#1e1338]/80 to-indigo-950/50 border border-purple-500/40 flex flex-col justify-between gap-4 text-left shadow-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span className="text-[10px] font-serif uppercase tracking-widest text-purple-200">
                  Cosmic Wheel Game
                </span>
              </div>
              <h3 className="font-serif text-base text-white font-medium">
                Truth, Dare & Scenarios
              </h3>
              <p className="text-xs text-purple-200/70">
                Sweet, deep, spicy & naughty questions crafted for Shivi & Rashi.
              </p>
            </div>
            <button
              onClick={() => {
                sound.playHeartClick();
                setIsTruthDareOpen(true);
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-glow-red hover:scale-102 active:scale-98 transition-all cursor-pointer"
            >
              <Disc3 className="w-3.5 h-3.5" />
              <span>Spin Cosmic Wheel 🎡</span>
            </button>
          </div>

        </div>

        <div className="pt-2">
          <TinyCharacters pose="holding-hands" caption="every chapter brings us closer to the final question" />
        </div>
      </section>

      {/* The Complete ARG Game Engine with all 11 games & Arcade mode */}
      <ARGGameEngine />

      {/* Standalone Universe Game Modal */}
      <UniverseGameExperience
        isOpen={isUniverseGameOpen}
        onClose={() => setIsUniverseGameOpen(false)}
        isModal={true}
      />

      {/* Standalone Cosmic Truth & Dare Wheel Modal */}
      <TruthDareWheelGame
        isOpen={isTruthDareOpen}
        onClose={() => setIsTruthDareOpen(false)}
        isModal={true}
      />

      {/* Transition to World 04 */}
      {onNextWorld && (
        <div className="text-center py-10">
          <button
            onClick={() => {
              sound.playHeartClick();
              onNextWorld();
            }}
            className="px-8 py-3.5 rounded-full bg-universe-wine/30 border border-universe-wine/60 text-universe-cream hover:text-white hover:border-universe-glowingRed text-xs font-mono uppercase tracking-wider shadow-sm hover:scale-105 transition-all cursor-pointer"
          >
            Enter World 04: The Inner Sanctuary →
          </button>
        </div>
      )}

    </div>
  );
}
