import React, { useEffect, useState } from 'react';
import { Activity, Heart } from 'lucide-react';
import { sound } from '../../utils/audioEngine';
import { WorldId } from '../Navigation/WorldNavigationDock';

interface HeartbeatManagerProps {
  currentWorld: WorldId;
}

export default function HeartbeatSoundManager({ currentWorld }: HeartbeatManagerProps) {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    if (!isEnabled) return;

    // Modulate heartbeat BPM by world at 100% full volume (intensity = 1.0)
    let bpm = 68;
    const intensity = 1.0; // 100% Maximum Volume

    if (currentWorld === 'WORLD_01_BEFORE_US') {
      bpm = 60;
    } else if (currentWorld === 'WORLD_02_LITTLE_UNIVERSE') {
      bpm = 70;
    } else if (currentWorld === 'WORLD_03_ARG_GAME') {
      bpm = 76;
    } else if (currentWorld === 'WORLD_04_SANCTUARY') {
      bpm = 64;
    } else if (currentWorld === 'WORLD_05_BIRTHDAY') {
      bpm = 84;
    } else if (currentWorld === 'ALL_CHAPTERS') {
      bpm = 68;
    }

    const intervalMs = (60 / bpm) * 1000;

    const interval = setInterval(() => {
      sound.playHeartbeat(intensity);
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 240);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [isEnabled, currentWorld]);

  return (
    <div className="fixed bottom-6 right-6 z-30 flex items-center gap-2">
      <button
        onClick={() => {
          sound.playHeartClick();
          setIsEnabled(!isEnabled);
        }}
        className={`px-3 py-1.5 rounded-full text-[10px] font-mono flex items-center gap-1.5 border transition-all cursor-pointer shadow-lg ${
          isEnabled
            ? 'bg-gradient-to-r from-rose-950 to-universe-darkBurgundy border-universe-crimson text-universe-blush shadow-glow-red'
            : 'bg-universe-black/80 border-universe-wine/40 text-universe-lavender/50 hover:text-universe-cream'
        }`}
        title="Toggle Ambient Heartbeat Pulse (100% Volume)"
      >
        <Activity className={`w-3.5 h-3.5 text-universe-glowingRed ${isPulsing ? 'scale-140' : 'scale-100'} transition-transform`} />
        <span>{isEnabled ? 'Heartbeat: 100% ♡' : 'Heartbeat: Off'}</span>
      </button>
    </div>
  );
}
