import React from 'react';
import { Heart, ArrowRight, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audioEngine';
import { MemoryItem } from './MemoryPocketDrawer';

interface EmotionalFeedbackModalProps {
  isOpen: boolean;
  quote: string;
  reward?: MemoryItem | null;
  onNext: () => void;
}

export default function EmotionalFeedbackModal({
  isOpen,
  quote,
  reward,
  onNext
}: EmotionalFeedbackModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-universe-black/85 backdrop-blur-md animate-fadeIn select-none">
      <div className="max-w-md w-full rounded-3xl bg-gradient-to-b from-[#240a1b] via-[#140410] to-[#080206] border-2 border-universe-glowingRed/60 shadow-2xl p-6 sm:p-8 text-center space-y-5 relative overflow-hidden">
        
        {/* Glowing Background Heart Halo */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-universe-glowingRed/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-universe-blush/10 rounded-full blur-2xl pointer-events-none" />

        {/* Heart Icon Badge */}
        <div className="mx-auto w-16 h-16 rounded-full bg-universe-crimson/25 border-2 border-universe-glowingRed flex items-center justify-center shadow-glow-red animate-pulse">
          <Heart className="w-8 h-8 text-universe-glowingRed fill-universe-glowingRed" />
        </div>

        {/* Emotional Feedback Statement */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-mono tracking-widest text-universe-dustyPink px-3 py-1 rounded-full bg-universe-wine/30 border border-universe-wine/50 inline-block">
            Memory Unlocked
          </span>
          <h3 className="font-serif text-xl sm:text-2xl text-universe-cream italic font-light leading-snug">
            "{quote}"
          </h3>
        </div>

        {/* Unlocked Reward Box */}
        {reward && (
          <div className="p-4 rounded-2xl bg-universe-black/60 border border-universe-wine/60 text-left space-y-2 shadow-inner">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{reward.icon}</span>
                <span className="font-serif text-sm font-medium text-universe-cream">
                  {reward.title}
                </span>
              </div>
              <span className="text-[10px] font-mono text-universe-gold bg-universe-wine/30 px-2 py-0.5 rounded-full border border-universe-wine/40 font-semibold">
                +{reward.value}
              </span>
            </div>
            <p className="text-xs font-sans text-universe-lavender/80 italic">
              "{reward.lore}"
            </p>
            <div className="text-[10px] text-universe-dustyPink font-mono flex items-center gap-1 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-universe-glowingRed" />
              <span>Safely added to your Memory Pocket</span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={() => {
            sound.playHeartClick();
            onNext();
          }}
          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-universe-crimson via-universe-glowingRed to-universe-crimson text-white font-sans text-xs uppercase tracking-widest font-semibold shadow-glow-red hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <span>Continue Journey</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}
