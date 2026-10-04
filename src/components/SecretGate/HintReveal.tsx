import React, { useState, useEffect } from 'react';
import { Heart, X } from 'lucide-react';
import { sound } from '../../utils/audioEngine';
import { GATE_TEXTS } from '../../config/secretGate';

interface HintRevealProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HintReveal({ isOpen, onClose }: HintRevealProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const hintLines = GATE_TEXTS.password.hintLines;

  useEffect(() => {
    if (!isOpen) return;

    sound.playHeartClick();

    // Gradually reveal each line like a soft whisper
    const timers: ReturnType<typeof setTimeout>[] = [];
    hintLines.forEach((_, idx) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => Math.max(prev, idx + 1));
        sound.playTone(520 + idx * 40, 0.4, 'sine', 0.05);
      }, (idx + 1) * 750);
      timers.push(t);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isOpen, hintLines]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn select-none">
      <div className="relative max-w-md w-full p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#180512] via-[#0d020a] to-[#040103] border border-universe-wine/60 shadow-2xl text-center space-y-6">
        
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playHeartClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full text-universe-lavender/50 hover:text-white bg-universe-wine/20 transition-colors"
          title="Close whisper"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-universe-dustyPink">
            A Gentle Whisper
          </span>
          <h4 className="font-serif text-lg text-universe-cream">
            For My Little Memory Keeper ♡
          </h4>
        </div>

        {/* Line by line reveal */}
        <div className="space-y-3.5 py-2 min-h-[140px] flex flex-col items-center justify-center">
          {hintLines.map((line, idx) => {
            const isRevealed = visibleLines > idx;
            if (!isRevealed) return null;

            return (
              <div
                key={idx}
                className="animate-fadeIn transition-opacity duration-700 font-handwritten text-base sm:text-lg text-universe-blush flex items-center justify-center gap-1.5"
              >
                {line.stars && <span className="text-universe-gold text-xs animate-pulse">✦</span>}
                <span>"{line.text}"</span>
                {line.stars && <span className="text-universe-gold text-xs animate-pulse">✦</span>}
              </div>
            );
          })}

          {visibleLines >= hintLines.length && (
            <div className="pt-2 animate-scaleUp">
              <Heart className="w-5 h-5 text-universe-glowingRed fill-universe-glowingRed mx-auto animate-pulse" />
            </div>
          )}
        </div>

        {/* Footer */}
        <button
          onClick={() => {
            sound.playHeartClick();
            onClose();
          }}
          className="px-6 py-2 rounded-full bg-universe-wine/30 hover:bg-universe-wine/50 border border-universe-wine/60 text-universe-cream text-xs font-mono tracking-wider transition-all"
        >
          i remember now ♡
        </button>

      </div>
    </div>
  );
}
