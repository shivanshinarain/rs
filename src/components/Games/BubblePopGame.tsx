import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Volume2 } from 'lucide-react';
import { sound } from '../../utils/audioEngine';

interface BubblePopGameProps {
  onSolve: (answer: string) => void;
}

interface Bubble {
  id: number;
  word: string;
  isReal: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  popped: boolean;
}

const INITIAL_WORDS = [
  { word: "Dude", isReal: false },
  { word: "MOTU 🧸", isReal: true },
  { word: "Bro", isReal: false },
  { word: "MERI JAAN", isReal: true },
  { word: "Bestie", isReal: false },
  { word: "WIFEYY 💍", isReal: true },
  { word: "Stranger", isReal: false },
  { word: "BEBU ♡", isReal: true },
  { word: "Casual Friend", isReal: false }
];

export default function BubblePopGame({ onSolve }: BubblePopGameProps) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [collectedReal, setCollectedReal] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>('Pop the true nicknames Shivi whispers to you!');

  // Initialize bubble positions
  useEffect(() => {
    const initialized: Bubble[] = INITIAL_WORDS.map((item, idx) => ({
      id: idx,
      word: item.word,
      isReal: item.isReal,
      x: 15 + (idx % 3) * 30 + (Math.random() * 8 - 4),
      y: 20 + Math.floor(idx / 3) * 26 + (Math.random() * 8 - 4),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: item.isReal ? 65 : 55,
      popped: false
    }));
    setBubbles(initialized);

    // Gentle floating loop
    const interval = setInterval(() => {
      setBubbles((prev) =>
        prev.map((b) => {
          if (b.popped) return b;
          let newX = b.x + b.vx;
          let newY = b.y + b.vy;
          let newVx = b.vx;
          let newVy = b.vy;

          if (newX < 10 || newX > 85) newVx *= -1;
          if (newY < 10 || newY > 80) newVy *= -1;

          return { ...b, x: newX, y: newY, vx: newVx, vy: newVy };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handlePop = (bubble: Bubble) => {
    if (bubble.popped) return;

    if (bubble.isReal) {
      sound.playHeartClick();
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ff285e', '#f5b8c6', '#ffffff']
      });

      const cleanWord = bubble.word.replace(/[^\w]/g, '');
      const nextCollected = [...collectedReal, cleanWord];
      setCollectedReal(nextCollected);
      setFeedback(`"${bubble.word}" popped! That one is definitely ours ♡`);

      setBubbles((prev) =>
        prev.map((b) => (b.id === bubble.id ? { ...b, popped: true } : b))
      );

      if (nextCollected.length >= 3) {
        sound.playMatchSound();
        setFeedback("All special nicknames captured! Unlocking true name...");
        setTimeout(() => {
          onSolve('MOTU');
        }, 1500);
      }
    } else {
      sound.playTone(180, 0.2, 'square', 0.05);
      setFeedback(`"${bubble.word}"? Shivi would never call you that! 😂`);
      setBubbles((prev) =>
        prev.map((b) => (b.id === bubble.id ? { ...b, popped: true } : b))
      );
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto p-4 select-none">
      
      {/* Header and Score Tracker */}
      <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-universe-wine/30 mb-3">
        <span className="text-universe-dustyPink font-semibold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-universe-blush" />
          Bubble Popper Arena
        </span>
        <span className="text-universe-gold">
          Captured: {collectedReal.length} / 3 Nicknames
        </span>
      </div>

      <p className="font-handwritten text-sm sm:text-base text-universe-blush text-center min-h-[28px]">
        {feedback}
      </p>

      {/* Floating Arena Canvas Area */}
      <div className="relative h-72 sm:h-80 w-full rounded-3xl bg-gradient-to-b from-[#160613]/90 via-[#0a0208]/90 to-[#040103]/95 border-2 border-universe-wine/60 overflow-hidden shadow-inner my-3">
        {bubbles.map((bubble) => {
          if (bubble.popped) return null;

          return (
            <button
              key={bubble.id}
              onClick={() => handlePop(bubble)}
              style={{
                left: `${bubble.x}%`,
                top: `${bubble.y}%`,
                transform: 'translate(-50%, -50%)',
                transition: 'left 0.05s linear, top 0.05s linear'
              }}
              className={`absolute px-3.5 py-2 rounded-full border text-xs sm:text-sm font-serif shadow-lg hover:scale-115 active:scale-90 transition-transform touch-manipulation flex items-center justify-center whitespace-nowrap ${
                bubble.isReal
                  ? 'bg-gradient-to-r from-universe-darkBurgundy/90 via-universe-wine/80 to-universe-darkBurgundy/90 border-universe-blush/60 text-universe-cream shadow-glow-blush animate-pulse'
                  : 'bg-universe-black/60 border-universe-wine/30 text-universe-lavender/60 hover:text-white'
              }`}
            >
              {bubble.word}
            </button>
          );
        })}
      </div>

      {/* Progress Pills */}
      <div className="flex items-center justify-center gap-2 pt-1">
        {['MOTU', 'MERI JAAN', 'WIFEYY'].map((target, idx) => {
          const isDone = collectedReal.some((c) => c.includes(target));
          return (
            <span
              key={idx}
              className={`px-3 py-1 rounded-full text-[10px] font-mono border transition-all ${
                isDone
                  ? 'bg-universe-crimson border-universe-glowingRed text-white shadow-glow-red'
                  : 'bg-universe-black/40 border-universe-wine/40 text-universe-lavender/40'
              }`}
            >
              {isDone ? `✓ ${target}` : `? ${target}`}
            </span>
          );
        })}
      </div>

    </div>
  );
}
