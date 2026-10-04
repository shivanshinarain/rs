import React from 'react';
import { X, Heart } from 'lucide-react';
import { sound } from '../../utils/audioEngine';

interface OrbitingStarsEasterEggProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrbitingStarsEasterEgg({ isOpen, onClose }: OrbitingStarsEasterEggProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-universe-black/90 backdrop-blur-md animate-fadeIn select-none">
      <div className="relative max-w-sm w-full p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#1b0816] via-[#10030d] to-[#070105] border border-universe-wine/60 text-center space-y-6 shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playHeartClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full text-universe-lavender/60 hover:text-white bg-universe-wine/20 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Orbiting Stars Animation Canvas / SVG */}
        <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
          {/* Outer Orbit Path */}
          <div className="absolute inset-0 rounded-full border border-universe-wine/40 border-dashed animate-spin" style={{ animationDuration: '14s' }} />

          {/* Central Mini Heart */}
          <div className="w-8 h-8 rounded-full bg-universe-crimson/30 border border-universe-glowingRed/50 flex items-center justify-center shadow-glow-red animate-pulse">
            <Heart className="w-4 h-4 text-universe-glowingRed fill-universe-glowingRed" />
          </div>

          {/* Star 1 (Shivi - Gold) */}
          <div
            className="absolute inset-0 flex items-start justify-center animate-spin"
            style={{ animationDuration: '6s' }}
          >
            <div className="w-4 h-4 -mt-2 rounded-full bg-universe-gold shadow-glow-gold flex items-center justify-center text-[10px] text-black font-bold">
              ✦
            </div>
          </div>

          {/* Star 2 (Rashi - Rose) */}
          <div
            className="absolute inset-0 flex items-end justify-center animate-spin"
            style={{ animationDuration: '6s' }}
          >
            <div className="w-4 h-4 -mb-2 rounded-full bg-universe-blush shadow-glow-blush flex items-center justify-center text-[10px] text-black font-bold">
              ✦
            </div>
          </div>
        </div>

        {/* Secret Whisper Note */}
        <div className="space-y-2">
          <p className="font-handwritten text-lg sm:text-xl text-universe-blush leading-relaxed">
            "you weren't supposed to find this yet ♡"
          </p>
          <p className="text-[11px] font-sans text-universe-lavender/70">
            Two little stars gravitationally bound, endlessly orbiting around the same heartbeat.
          </p>
        </div>

        <button
          onClick={() => {
            sound.playHeartClick();
            onClose();
          }}
          className="px-5 py-2 rounded-full bg-universe-wine/40 hover:bg-universe-wine/70 border border-universe-wine/60 text-universe-cream text-xs font-mono tracking-wider transition-all"
        >
          keep the secret 🤫♡
        </button>

      </div>
    </div>
  );
}
