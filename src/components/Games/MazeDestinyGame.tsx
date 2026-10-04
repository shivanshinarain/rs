import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { DoorOpen, Lock, Sparkles, Heart } from 'lucide-react';
import { sound } from '../../utils/audioEngine';

interface MazeDestinyGameProps {
  onSolve: (answer: string) => void;
}

export default function MazeDestinyGame({ onSolve }: MazeDestinyGameProps) {
  const [fakeCorrection, setFakeCorrection] = useState(false);
  const [solved, setSolved] = useState(false);

  const handleDoorChoice = (choice: 'fake' | 'true') => {
    if (solved) return;

    if (choice === 'fake') {
      sound.playTone(220, 0.3);
      setFakeCorrection(true);
    } else {
      sound.playDoorOpen();
      setSolved(true);
      setFakeCorrection(false);
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ff285e', '#ffd166', '#ffffff']
      });
      setTimeout(() => {
        onSolve('LIFETIME');
      }, 1800);
    }
  };

  return (
    <div className="relative max-w-md mx-auto w-full p-4 rounded-3xl bg-gradient-to-b from-[#1b0816] via-[#0f040d] to-[#050104] border-2 border-universe-wine/60 shadow-2xl text-center space-y-4 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-universe-wine/30">
        <span className="text-universe-dustyPink font-semibold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-universe-blush" />
          The Doors of Destiny
        </span>
        <span className="text-universe-gold">
          Choose Shivi's True Intention
        </span>
      </div>

      <p className="text-xs font-serif text-universe-blush italic">
        Two doors stand before you in the starlight. Choose the true path:
      </p>

      {/* Gentle Whisper Popup on Red Herring Choice */}
      {fakeCorrection && (
        <div className="p-3.5 rounded-2xl bg-universe-crimson/20 border border-universe-glowingRed/50 text-xs font-serif text-universe-cream text-left animate-fadeIn space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-universe-gold font-bold">
            Shivi's Gentle Whisper:
          </span>
          <p className="italic">
            "hmm... you found an answer, but not mine. Shivi never saw you as temporary. From Day 1, you were always meant for life ♡"
          </p>
        </div>
      )}

      {/* The Two Mystical Doors */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        
        {/* Door 1: Decoy (Temporary) */}
        <button
          onClick={() => handleDoorChoice('fake')}
          disabled={solved}
          className="p-5 rounded-2xl bg-universe-black/50 border border-universe-wine/40 hover:border-universe-wine text-left space-y-3 transition-all hover:scale-102 active:scale-98 group touch-manipulation"
        >
          <div className="w-10 h-10 rounded-xl bg-universe-wine/30 border border-universe-wine/50 flex items-center justify-center text-universe-lavender/60 group-hover:text-white">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif text-sm text-universe-lavender group-hover:text-white">
              Door of the World
            </h4>
            <p className="text-[11px] font-sans text-universe-lavender/60 italic pt-0.5">
              "A casual dating phase that ends at the interval."
            </p>
          </div>
        </button>

        {/* Door 2: True Path (Lifetime) */}
        <button
          onClick={() => handleDoorChoice('true')}
          disabled={solved}
          className={`p-5 rounded-2xl text-left space-y-3 transition-all hover:scale-105 active:scale-95 group touch-manipulation border-2 ${
            solved
              ? 'bg-gradient-to-b from-universe-darkBurgundy via-universe-wine to-universe-darkBurgundy border-universe-glowingRed shadow-glow-red'
              : 'bg-gradient-to-b from-universe-wine/30 to-universe-black/70 border-universe-blush/60 hover:border-universe-glowingRed shadow-glow-blush'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-universe-crimson/40 border border-universe-glowingRed flex items-center justify-center text-universe-blush">
            <DoorOpen className="w-5 h-5 text-universe-glowingRed animate-pulse" />
          </div>
          <div>
            <h4 className="font-serif text-sm text-universe-cream font-semibold">
              Door of Forever
            </h4>
            <p className="text-[11px] font-sans text-universe-blush italic pt-0.5">
              "Lifetime partnership: Poori zindagi tak."
            </p>
          </div>
        </button>

      </div>

      {solved && (
        <div className="p-3 rounded-xl bg-universe-darkBurgundy border border-universe-glowingRed text-xs font-serif text-universe-gold animate-fadeIn">
          ✨ The golden door unlocks! "Never temporary... always lifetime."
        </div>
      )}

    </div>
  );
}
