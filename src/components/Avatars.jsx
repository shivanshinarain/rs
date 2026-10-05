import React from 'react';
import MiniCharacterAvatar from './Characters3D/MiniCharacterAvatar';
import CoupleHug3DCanvas from './Characters3D/CoupleHug3DCanvas';

/**
 * Original Stylized 3D Mobile-Game Avatars for Shivi & Rashi
 * Inspired by the polished, chunky aesthetic of premium mobile games.
 * Supports standard, reaching, walking, and hugging states.
 */

export function ShiviAvatar({ state = 'idle', className = '', onClick }) {
  return (
    <MiniCharacterAvatar
      character="shivi"
      state={state}
      className={className}
      onClick={onClick}
    />
  );
}

export function RashiAvatar({ state = 'idle', className = '', onClick }) {
  return (
    <MiniCharacterAvatar
      character="rashi"
      state={state}
      className={className}
      onClick={onClick}
    />
  );
}

export function CoupleHugAnimation({ className = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={`relative inline-flex flex-col items-center select-none cursor-pointer transition-transform duration-500 hover:scale-105 active:scale-95 touch-manipulation ${className}`}
      title="Shivi & Rashi Forever ♡"
    >
      {/* Background Glow */}
      <div className="absolute w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-universe-crimson/20 blur-2xl pointer-events-none" />

      {/* Floating Hearts Array */}
      <div className="absolute -top-4 sm:-top-8 flex gap-3 sm:gap-4 text-universe-blush animate-bounce pointer-events-none z-10">
        <span className="text-xl sm:text-2xl animate-pulse">♡</span>
        <span className="text-2xl sm:text-3xl text-universe-glowingRed">♥</span>
        <span className="text-xl sm:text-2xl animate-pulse delay-100">♡</span>
      </div>

      <CoupleHug3DCanvas className="w-64 sm:w-80 h-auto" />

      <div className="mt-2 sm:mt-3 flex items-center justify-center text-center px-2">
        <span className="font-handwritten text-lg sm:text-2xl md:text-3xl text-universe-blush">
          Shivi & Rashi — Wrapped in each other's warmth ♡
        </span>
      </div>
    </div>
  );
}

export default {
  ShiviAvatar,
  RashiAvatar,
  CoupleHugAnimation,
};
