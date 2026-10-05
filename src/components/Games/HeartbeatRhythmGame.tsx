import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/audioEngine';

interface HeartbeatRhythmGameProps {
  onSolve: (answer: string) => void;
}

export default function HeartbeatRhythmGame({ onSolve }: HeartbeatRhythmGameProps) {
  const [kissCount, setKissCount] = useState(0);
  const [pulseActive, setPulseActive] = useState(false);
  const [feedback, setFeedback] = useState<string>('Tap the pulsing heart to deliver her 3-4 kisses!');

  const handleTapKiss = () => {
    sound.playHeartClick();
    setPulseActive(true);
    setTimeout(() => setPulseActive(false), 200);

    const next = kissCount + 1;
    setKissCount(next);

    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ff285e', '#f5b8c6', '#ffffff']
    });

    const compliments = [
      "Kiss #1: Delivered on cheek! 💋",
      "Kiss #2: Delivered on forehead! ♡",
      "Kiss #3: 'Bas teen-char, aur zyada nahi' 🥰",
      "Kiss #4: Perfect! All 4 kisses delivered to Shivi! 💖"
    ];

    setFeedback(compliments[Math.min(next - 1, compliments.length - 1)]);

    if (next >= 4) {
      sound.playMatchSound();
      setTimeout(() => {
        onSolve('3-4');
      }, 1600);
    }
  };

  return (
    <div className="relative max-w-sm mx-auto w-full p-4 rounded-3xl bg-gradient-to-b from-[#1e0716] via-[#10030d] to-[#060105] border-2 border-universe-wine/60 shadow-2xl text-center space-y-4 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-center text-xs font-mono pb-2 border-b border-universe-wine/30">
        <span className="text-universe-dustyPink font-semibold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-universe-blush" />
          Heartbeat Rhythm Tap
        </span>
      </div>

      <p className="font-handwritten text-sm sm:text-base text-universe-blush min-h-[24px]">
        {feedback}
      </p>

      {/* Pulsing Visual Heart Target */}
      <div className="relative w-36 h-36 mx-auto flex items-center justify-center my-2">
        {/* Concentric expanding ripples */}
        <div className="absolute inset-0 rounded-full bg-universe-glowingRed/10 border border-universe-glowingRed/30 animate-ping" />
        <div className="absolute inset-4 rounded-full bg-universe-wine/20 border border-universe-blush/40 animate-pulse" />

        {/* Center Heart */}
        <div
          className={`w-20 h-20 rounded-full bg-gradient-to-r from-universe-crimson to-universe-glowingRed flex items-center justify-center shadow-glow-red transition-transform duration-100 ${
            pulseActive ? 'scale-125' : 'scale-100'
          }`}
        >
          <Heart className="w-10 h-10 text-white fill-white animate-pulse" />
        </div>
      </div>

      {/* Big Tap Kiss Button */}
      <div className="space-y-2">
        <button
          onClick={handleTapKiss}
          disabled={kissCount >= 4}
          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-universe-crimson via-universe-glowingRed to-universe-crimson text-white font-serif text-sm uppercase tracking-widest font-semibold shadow-glow-red hover:scale-105 active:scale-95 disabled:opacity-50 transition-all touch-manipulation flex items-center justify-center gap-2"
        >
          <span>Tap to Kiss Shivi 💋</span>
          <span className="font-mono text-xs">({kissCount} / 4)</span>
        </button>

        {kissCount >= 4 && (
          <div className="text-xs text-universe-gold font-mono flex items-center justify-center gap-1 animate-fadeIn">
            <CheckCircle2 className="w-3.5 h-3.5 text-universe-glowingRed" />
            <span>Demand fulfilled: Exactly 3-4 kisses granted!</span>
          </div>
        )}
      </div>

    </div>
  );
}
