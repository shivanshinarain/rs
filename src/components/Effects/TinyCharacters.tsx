import React from 'react';
import { Heart } from 'lucide-react';
import { ShiviAvatar, RashiAvatar } from '../Avatars';

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
  const isReaching = pose === 'holding-hands' || pose === 'apology';
  const shiviState = isReaching
    ? 'reaching'
    : pose === 'stargazing'
    ? 'happy'
    : 'idle';
  const rashiState = isReaching
    ? 'reaching'
    : pose === 'stargazing'
    ? 'sparkle'
    : pose === 'whispering' || pose === 'fight'
    ? 'pout'
    : 'idle';

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <div className="relative flex items-center justify-center gap-2 sm:gap-4">
        {/* Shivi Character (Left) */}
        <div className="relative group transition-transform duration-300 hover:scale-105 w-16 sm:w-20 md:w-24">
          <ShiviAvatar
            state={shiviState}
            showLabel={false}
            className="w-full drop-shadow-md"
          />
          <span className="block text-center -mt-1 text-[9px] font-mono text-universe-blush/90">
            Shivi
          </span>
        </div>

        {/* Central Pose Indicator / Prop */}
        {pose === 'holding-hands' && (
          <div className="flex flex-col items-center px-1">
            <Heart className="w-4 h-4 text-universe-glowingRed fill-universe-glowingRed animate-pulse" />
            <div className="w-8 sm:w-12 h-[2px] bg-gradient-to-r from-universe-crimson via-universe-glowingRed to-universe-crimson shadow-glow-red" />
          </div>
        )}

        {pose === 'whispering' && (
          <div className="flex flex-col items-center gap-0.5 px-1 animate-bounce">
            <span className="text-xs">💬</span>
            <span className="text-[8px] font-mono text-universe-gold">"chotu"</span>
          </div>
        )}

        {pose === 'stargazing' && (
          <div className="flex flex-col items-center px-1">
            <span className="text-sm text-universe-gold animate-spin" style={{ animationDuration: '8s' }}>✦</span>
            <span className="text-[9px] font-serif italic text-universe-blush">our stars</span>
          </div>
        )}

        {pose === 'fight' && (
          <div className="flex flex-col items-center px-1">
            <span className="text-xs text-universe-lavender/60 animate-pulse">...</span>
            <span className="text-[8px] font-mono text-universe-dustyPink">sulk</span>
          </div>
        )}

        {pose === 'apology' && (
          <div className="flex flex-col items-center px-1 animate-bounce">
            <span className="text-base">🧸</span>
            <span className="text-[8px] font-serif italic text-universe-blush">sorry ♡</span>
          </div>
        )}

        {pose === 'sleeping-peacefully' && (
          <div className="flex flex-col items-center px-1">
            <span className="text-[10px] font-mono text-universe-lavender animate-pulse">z z Z</span>
            <span className="text-sm">🌙</span>
          </div>
        )}

        {pose === 'floating' && (
          <div className="flex flex-col items-center px-1 animate-pulse">
            <span className="text-xs text-universe-blush">♡</span>
          </div>
        )}

        {/* Rashi Character (Right) */}
        <div className="relative group transition-transform duration-300 hover:scale-105 w-16 sm:w-20 md:w-24">
          <RashiAvatar
            state={rashiState}
            showLabel={false}
            className="w-full drop-shadow-md"
          />
          <span className="block text-center -mt-1 text-[9px] font-mono text-universe-blush/90">
            Rashi
          </span>
        </div>
      </div>

      {caption && (
        <span className="mt-3 text-[11px] sm:text-xs font-serif italic text-universe-dustyPink/90 max-w-sm text-center px-2">
          "{caption}"
        </span>
      )}
    </div>
  );
}
