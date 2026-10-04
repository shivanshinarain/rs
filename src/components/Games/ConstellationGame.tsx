import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Star, Sparkles, Heart } from 'lucide-react';
import { sound } from '../../utils/audioEngine';

interface ConstellationGameProps {
  onSolve: (answer: string) => void;
}

interface StarNode {
  id: number;
  x: number;
  y: number;
  label: string;
}

// Coordinates forming the letter "R"
const STAR_NODES: StarNode[] = [
  { id: 1, x: 30, y: 80, label: 'Star 1' },
  { id: 2, x: 30, y: 50, label: 'Star 2' },
  { id: 3, x: 30, y: 20, label: 'Star 3' },
  { id: 4, x: 70, y: 20, label: 'Star 4' },
  { id: 5, x: 70, y: 50, label: 'Star 5' },
  { id: 6, x: 70, y: 80, label: 'Star 6' }
];

export default function ConstellationGame({ onSolve }: ConstellationGameProps) {
  const [activeStarIds, setActiveStarIds] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);

  const handleStarClick = (star: StarNode) => {
    if (completed) return;
    sound.playConstellationChime();

    if (!activeStarIds.includes(star.id)) {
      const next = [...activeStarIds, star.id];
      setActiveStarIds(next);

      if (next.length === STAR_NODES.length) {
        sound.playMatchSound();
        setCompleted(true);
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#ffd166', '#f5b8c6', '#ffffff']
        });
        setTimeout(() => {
          onSolve('R');
        }, 1800);
      }
    }
  };

  const handleReset = () => {
    sound.playHeartClick();
    setActiveStarIds([]);
  };

  return (
    <div className="relative max-w-sm mx-auto w-full p-4 rounded-3xl bg-gradient-to-b from-[#130718] via-[#09030d] to-[#040106] border-2 border-universe-wine/60 shadow-2xl text-center space-y-4 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-universe-wine/30">
        <span className="text-universe-gold font-semibold flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 fill-current" />
          Celestial Star Alignment
        </span>
        <button
          onClick={handleReset}
          className="text-[11px] text-universe-dustyPink hover:text-white"
        >
          Reset Stars
        </button>
      </div>

      <p className="text-xs font-serif text-universe-blush italic">
        Ignite the celestial stars to trace Rashi's constellation in the heavens:
      </p>

      {/* Sky Canvas Area */}
      <div className="relative h-64 sm:h-72 w-full rounded-2xl bg-black/80 border border-universe-wine/50 overflow-hidden my-2">
        
        {/* Subtle background star dust */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-950/20 via-transparent to-transparent pointer-events-none" />

        {/* Drawn Constellation SVG Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {activeStarIds.map((id, idx) => {
            if (idx === 0) return null;
            const prev = STAR_NODES.find((s) => s.id === activeStarIds[idx - 1]);
            const curr = STAR_NODES.find((s) => s.id === id);
            if (!prev || !curr) return null;

            return (
              <line
                key={`${prev.id}-${curr.id}`}
                x1={`${prev.x}%`}
                y1={`${prev.y}%`}
                x2={`${curr.x}%`}
                y2={`${curr.y}%`}
                stroke="#ffd166"
                strokeWidth="2.5"
                strokeDasharray="4 2"
                className="shadow-glow-gold"
              />
            );
          })}
        </svg>

        {/* Interactive Stars */}
        {STAR_NODES.map((star) => {
          const isLit = activeStarIds.includes(star.id);

          return (
            <button
              key={star.id}
              onClick={() => handleStarClick(star)}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              className={`absolute w-10 h-10 rounded-full flex items-center justify-center transition-all touch-manipulation ${
                isLit
                  ? 'bg-universe-gold text-black shadow-glow-gold scale-120 animate-pulse'
                  : 'bg-universe-wine/30 text-universe-lavender/50 hover:text-white hover:border-universe-gold border border-universe-wine/50 hover:scale-110'
              }`}
            >
              <Star className="w-5 h-5 fill-current" />
            </button>
          );
        })}

        {/* Central Beating Heart when completed */}
        {completed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-xs animate-fadeIn">
            <Heart className="w-12 h-12 text-universe-glowingRed fill-universe-glowingRed shadow-glow-red animate-bounce" />
            <span className="font-serif text-lg text-universe-gold font-bold pt-1">
              Constellation "R" Ignited!
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono text-universe-dustyPink pt-1">
        <span>Lit Stars: {activeStarIds.length} / {STAR_NODES.length}</span>
        <span>Spells "R" for Rashi ♡</span>
      </div>

    </div>
  );
}
