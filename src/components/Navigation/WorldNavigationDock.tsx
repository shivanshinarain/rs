import React from 'react';
import {
  Compass,
  Sparkles,
  Gamepad2,
  Home,
  Gift,
  Phone,
  Volume2,
  VolumeX,
  Lock
} from 'lucide-react';
import { sound } from '../../utils/audioEngine';

export type WorldId =
  | 'WORLD_01_BEFORE_US'
  | 'WORLD_02_LITTLE_UNIVERSE'
  | 'WORLD_03_ARG_GAME'
  | 'WORLD_04_SANCTUARY'
  | 'WORLD_05_BIRTHDAY';

interface WorldNavigationDockProps {
  currentWorld: WorldId;
  onSelectWorld: (world: WorldId) => void;
  onOpenPhone: () => void;
  onLockUniverse: () => void;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
}

const WORLDS = [
  { id: 'WORLD_01_BEFORE_US', label: '01. Before Us', shortLabel: '01. Before', icon: Compass },
  { id: 'WORLD_02_LITTLE_UNIVERSE', label: '02. Little Universe', shortLabel: '02. Us', icon: Sparkles },
  { id: 'WORLD_03_ARG_GAME', label: '03. ARG Game', shortLabel: '03. ARG', icon: Gamepad2 },
  { id: 'WORLD_04_SANCTUARY', label: '04. Sanctuary', shortLabel: '04. Room', icon: Home },
  { id: 'WORLD_05_BIRTHDAY', label: '05. Birthday & Forever', shortLabel: '05. B\'day', icon: Gift }
];

export default function WorldNavigationDock({
  currentWorld,
  onSelectWorld,
  onOpenPhone,
  onLockUniverse,
  isPlayingAudio,
  onToggleAudio
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
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap touch-manipulation ${
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

        <div className="w-[1px] h-5 bg-universe-wine/40 mx-1 hidden sm:block" />

        {/* Quick Phone Launcher */}
        <button
          onClick={() => {
            sound.playHeartClick();
            onOpenPhone();
          }}
          className="p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-universe-wine/40 border border-universe-wine/60 text-universe-gold hover:text-white hover:border-universe-gold text-xs font-mono flex items-center gap-1 shadow-sm transition-all whitespace-nowrap"
          title="Open Our Little Phone"
        >
          <Phone className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Our Phone</span>
        </button>

      </div>
    </div>
  );
}
