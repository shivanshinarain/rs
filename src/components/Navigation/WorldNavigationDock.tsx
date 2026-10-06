import React from 'react';
import {
  Compass,
  Sparkles,
  Gamepad2,
  Home,
  Gift,
  Volume2,
  VolumeX,
  Lock,
  BookOpen,
  Music,
  Mic
} from 'lucide-react';
import { sound } from '../../utils/audioEngine';

export type WorldId =
  | 'ALL_CHAPTERS'
  | 'WORLD_01_BEFORE_US'
  | 'WORLD_02_LITTLE_UNIVERSE'
  | 'WORLD_03_ARG_GAME'
  | 'WORLD_04_SANCTUARY'
  | 'WORLD_05_BIRTHDAY';

interface WorldNavigationDockProps {
  currentWorld: WorldId;
  onSelectWorld: (world: WorldId) => void;
  onLockUniverse: () => void;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
  onOpenUniverseGame?: () => void;
  onOpenTaylorSwift?: () => void;
  onOpenVoiceNotes?: () => void;
}

const WORLDS = [
  { id: 'ALL_CHAPTERS', label: '📖 All 14 Chapters', shortLabel: '📖 Chapters', icon: BookOpen },
  { id: 'WORLD_01_BEFORE_US', label: '01. Before Us', shortLabel: '01. Before', icon: Compass },
  { id: 'WORLD_02_LITTLE_UNIVERSE', label: '02. Little Universe', shortLabel: '02. Us', icon: Sparkles },
  { id: 'WORLD_03_ARG_GAME', label: '03. ARG Game', shortLabel: '03. ARG', icon: Gamepad2 },
  { id: 'WORLD_04_SANCTUARY', label: '04. Sanctuary', shortLabel: '04. Room', icon: Home },
  { id: 'WORLD_05_BIRTHDAY', label: '05. Birthday & Forever', shortLabel: '05. Forever', icon: Gift }
];

export default function WorldNavigationDock({
  currentWorld,
  onSelectWorld,
  onLockUniverse,
  isPlayingAudio,
  onToggleAudio,
  onOpenUniverseGame,
  onOpenTaylorSwift,
  onOpenVoiceNotes
}: WorldNavigationDockProps) {
  return (
    <div className="sticky top-16 z-30 flex justify-center py-2 px-3 sm:px-4 bg-universe-black/75 backdrop-blur-md border-b border-universe-wine/30 select-none">
      <div className="flex items-center gap-1 sm:gap-2 p-1.5 rounded-full bg-universe-darkBurgundy/70 border border-universe-wine/70 shadow-2xl max-w-full overflow-x-auto">
        
        {/* World Selectors */}
        {WORLDS.map((w) => {
          const Icon = w.icon;
          const isActive = currentWorld === w.id;

          return (
            <button
              key={w.id}
              onClick={() => {
                sound.playHeartClick();
                onSelectWorld(w.id as WorldId);
              }}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap touch-manipulation cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-universe-crimson to-universe-glowingRed text-white shadow-glow-red font-semibold scale-102'
                  : 'text-universe-lavender/70 hover:text-universe-cream hover:bg-universe-wine/20'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{w.label}</span>
              <span className="inline sm:hidden">{w.shortLabel}</span>
            </button>
          );
        })}

        {/* Universe Game Launcher */}
        {onOpenUniverseGame && (
          <button
            onClick={() => {
              sound.playHeartClick();
              onOpenUniverseGame();
            }}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/40 text-rose-200 hover:text-white hover:scale-105 cursor-pointer touch-manipulation"
            title="Play 'A Universe Called Us' Story Game"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span className="hidden sm:inline">Story Game ♡</span>
            <span className="inline sm:hidden">Game ♡</span>
          </button>
        )}

        {/* Taylor Swift: Paper Rings Direct Access */}
        {onOpenTaylorSwift && (
          <button
            onClick={() => {
              sound.playHeartClick();
              onOpenTaylorSwift();
            }}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap bg-gradient-to-r from-rose-950/70 to-purple-950/70 hover:from-rose-900 hover:to-purple-900 border border-rose-500/50 text-rose-100 hover:text-white hover:scale-105 cursor-pointer touch-manipulation shadow-glow-red/20"
            title="Play Taylor Swift — Paper Rings (Chapter 11)"
          >
            <Music className="w-3.5 h-3.5 text-rose-300 animate-pulse" />
            <span className="hidden sm:inline">Paper Rings 🎵</span>
            <span className="inline sm:hidden">Music 🎵</span>
          </button>
        )}

        {/* Voice Notes Direct Access */}
        {onOpenVoiceNotes && (
          <button
            onClick={() => {
              sound.playHeartClick();
              onOpenVoiceNotes();
            }}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/50 text-purple-200 hover:text-white hover:scale-105 cursor-pointer touch-manipulation shadow-glow-red/20"
            title="Listen to all Voice Notes from Shivi & Rashi (Chapter 12)"
          >
            <Mic className="w-3.5 h-3.5 text-rose-300 animate-pulse" />
            <span className="hidden sm:inline">Voice Notes 🎙️</span>
            <span className="inline sm:hidden">Notes 🎙️</span>
          </button>
        )}

      </div>
    </div>
  );
}
