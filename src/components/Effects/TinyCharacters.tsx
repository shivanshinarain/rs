import React from 'react';
import { Heart } from 'lucide-react';

export type CharacterPose =
  | 'stargazing'
  | 'whispering'
  | 'sleeping-peacefully'
  | 'fight'
  | 'apology'
  | 'holding-hands'
  | 'floating';

interface TinyCharactersProps {
  pose?: CharacterPose;
  className?: string;
  caption?: string;
}

export default function TinyCharacters({
  pose = 'holding-hands',
  className = '',
  caption
}: TinyCharactersProps) {
  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <div className="relative flex items-center justify-center gap-3">
        {/* Shivi Character (Left) */}
        <div className="relative group transition-transform duration-300 hover:scale-110">
          <svg className="w-12 h-16 sm:w-14 sm:h-18 drop-shadow-lg" viewBox="0 0 60 80" fill="none">
            {/* Shivi: Cozy oversized burgundy hoodie, silver hoops, soft messy bun */}
            <circle cx="30" cy="18" r="9" fill="#1b0813" /> {/* hair bun */}
            <circle cx="30" cy="24" r="14" fill="#ffd5cb" /> {/* face */}
            {/* Silver Hoops */}
            <circle cx="16" cy="27" r="4" stroke="#e0e7ff" strokeWidth="1.5" fill="none" />
            <circle cx="44" cy="27" r="4" stroke="#e0e7ff" strokeWidth="1.5" fill="none" />
            {/* Soft smiling eyes */}
            <path d="M 23 23 Q 26 21 28 23" stroke="#2a0d1d" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 32 23 Q 34 21 37 23" stroke="#2a0d1d" strokeWidth="1.5" strokeLinecap="round" />
            {/* Blush */}
            <circle cx="21" cy="27" r="2.5" fill="#ff708f" opacity="0.6" />
            <circle cx="39" cy="27" r="2.5" fill="#ff708f" opacity="0.6" />
            {/* Smile */}
            <path d="M 27 28 Q 30 31 33 28" stroke="#7a1934" strokeWidth="1.4" strokeLinecap="round" />
            {/* Oversized burgundy sweater/hoodie */}
            <path d="M 16 38 C 16 35, 44 35, 44 38 L 48 68 C 48 72, 12 72, 12 68 Z" fill="#4a0f21" />
            <path d="M 24 38 L 27 50 M 36 38 L 33 50" stroke="#f2b5c4" strokeWidth="1" strokeLinecap="round" opacity="0.6" /> {/* hoodie strings */}
            {/* Tiny legs */}
            <rect x="22" y="68" width="5" height="10" rx="2.5" fill="#15060f" />
            <rect x="33" y="68" width="5" height="10" rx="2.5" fill="#15060f" />
          </svg>
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-universe-blush/80">
            Shivi
          </span>
        </div>

        {/* Central Pose Reaction / Connecting Prop */}
        {pose === 'holding-hands' && (
          <div className="flex flex-col items-center">
            <Heart className="w-4 h-4 text-universe-glowingRed fill-universe-glowingRed animate-pulse" />
            <div className="w-6 h-[1.5px] bg-gradient-to-r from-universe-crimson via-universe-glowingRed to-universe-crimson" />
          </div>
        )}

        {pose === 'whispering' && (
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[10px] animate-pulse">💬</span>
            <span className="text-[8px] font-mono text-universe-gold">chotu</span>
          </div>
        )}

        {pose === 'stargazing' && (
          <div className="flex flex-col items-center">
            <span className="text-xs text-universe-gold animate-spin" style={{ animationDuration: '8s' }}>✦</span>
            <span className="text-[9px] font-serif italic text-universe-blush">our sky</span>
          </div>
        )}

        {pose === 'fight' && (
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-universe-lavender/60">...</span>
            <span className="text-[7px] font-mono text-universe-dustyPink">sulk</span>
          </div>
        )}

        {pose === 'apology' && (
          <div className="flex flex-col items-center">
            <span className="text-[10px] animate-pulse">🧸</span>
            <span className="text-[8px] font-serif italic text-universe-blush">sorry ♡</span>
          </div>
        )}

        {pose === 'sleeping-peacefully' && (
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-mono text-universe-lavender animate-pulse">z z Z</span>
            <span className="text-[10px]">🌙</span>
          </div>
        )}

        {/* Rashi Character (Right) */}
        <div className="relative group transition-transform duration-300 hover:scale-110">
          <svg className="w-12 h-16 sm:w-14 sm:h-18 drop-shadow-lg" viewBox="0 0 60 80" fill="none">
            {/* Rashi: Soft long hair, lavender hoodie, golden warmth, bright eyes */}
            <path d="M 14 18 C 14 8, 46 8, 46 18 C 48 30, 48 48, 46 56 C 44 48, 44 26, 44 24 C 44 14, 16 14, 16 24 C 16 26, 16 48, 14 56 C 12 48, 12 30, 14 18 Z" fill="#240c18" /> {/* soft hair */}
            <circle cx="30" cy="24" r="13" fill="#ffdfd6" /> {/* face */}
            {/* Gentle bright eyes */}
            <circle cx="25" cy="23" r="2" fill="#200a16" />
            <circle cx="26" cy="22" r="0.8" fill="#ffffff" />
            <circle cx="35" cy="23" r="2" fill="#200a16" />
            <circle cx="36" cy="22" r="0.8" fill="#ffffff" />
            {/* Blush */}
            <circle cx="22" cy="27" r="2.5" fill="#ff708f" opacity="0.6" />
            <circle cx="38" cy="27" r="2.5" fill="#ff708f" opacity="0.6" />
            {/* Sweet smile */}
            <path d="M 27 28 Q 30 32 33 28" stroke="#7a1934" strokeWidth="1.4" strokeLinecap="round" />
            {/* Lavender hoodie */}
            <path d="M 17 38 C 17 35, 43 35, 43 38 L 47 68 C 47 72, 13 72, 13 68 Z" fill="#4d2d47" />
            <circle cx="30" cy="46" r="3" fill="#f2b5c4" opacity="0.5" /> {/* cute emblem */}
            {/* Tiny legs */}
            <rect x="22" y="68" width="5" height="10" rx="2.5" fill="#15060f" />
            <rect x="33" y="68" width="5" height="10" rx="2.5" fill="#15060f" />
          </svg>
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-universe-blush/80">
            Rashi
          </span>
        </div>
      </div>

      {caption && (
        <span className="mt-3 text-[11px] font-serif italic text-universe-dustyPink/80 max-w-xs text-center">
          "{caption}"
        </span>
      )}
    </div>
  );
}
