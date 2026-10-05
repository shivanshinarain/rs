import React, { useEffect, useState } from 'react';
import { Activity, Heart } from 'lucide-react';
import { sound } from '../../utils/audioEngine';
import { WorldId } from '../Navigation/WorldNavigationDock';

interface HeartbeatManagerProps {
  currentWorld: WorldId;
}

export default function HeartbeatSoundManager({ currentWorld }: HeartbeatManagerProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    if (!isEnabled) return;

    // Modulate heartbeat BPM and intensity by world
    let bpm = 60;
    let intensity = 0.08;

    if (currentWorld === 'WORLD_01_BEFORE_US') {
      bpm = 56;
      intensity = 0.06; // soft
    } else if (currentWorld === 'WORLD_02_LITTLE_UNIVERSE') {
      bpm = 68;
      intensity = 0.09; // slightly stronger
    } else if (currentWorld === 'WORLD_03_ARG_GAME') {
      bpm = 74;
      intensity = 0.11; // puzzle excitement
    } else if (currentWorld === 'WORLD_04_SANCTUARY') {
      bpm = 62;
      intensity = 0.08; // calming
    } else if (currentWorld === 'WORLD_05_BIRTHDAY') {
      bpm = 82;
      intensity = 0.14; // fastest for proposal
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
        className={`px-3 py-1.5 rounded-full text-[10px] font-mono flex items-center gap-1.5 border transition-all ${
          isEnabled
            ? 'bg-universe-darkBurgundy/90 border-universe-crimson text-universe-blush shadow-glow-red'
            : 'bg-universe-black/60 border-universe-wine/40 text-universe-lavender/50 hover:text-universe-cream'
        }`}
        title="Toggle Ambient Heartbeat Pulse"
      >
        <Activity className={`w-3 h-3 text-universe-glowingRed ${isPulsing ? 'scale-130' : 'scale-100'} transition-transform`} />
        <span>{isEnabled ? 'Heartbeat: On' : 'Heartbeat'}</span>
      </button>
    </div>
  );
}
