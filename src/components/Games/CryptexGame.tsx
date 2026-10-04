import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ChevronUp, ChevronDown, Lock, Unlock, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audioEngine';

interface CryptexGameProps {
  onSolve: (answer: string) => void;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const TARGET_WORD = 'FOREVER';
const HINT_NUMBERS = [6, 15, 18, 5, 22, 5, 18];

export default function CryptexGame({ onSolve }: CryptexGameProps) {
  // Start with randomized or near letters
  const [dialIndices, setDialIndices] = useState<number[]>([
    2,  // C (instead of F)
    10, // K (instead of O)
    14, // O (instead of R)
    0,  // A (instead of E)
    18, // S (instead of V)
    1,  // B (instead of E)
    13  // N (instead of R)
  ]);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const rotateDial = (dialIdx: number, direction: 'up' | 'down') => {
    if (isUnlocked) return;
    sound.playCassetteClick();

    setDialIndices((prev) => {
      const next = [...prev];
      if (direction === 'up') {
        next[dialIdx] = (next[dialIdx] + 1) % 26;
      } else {
        next[dialIdx] = (next[dialIdx] - 1 + 26) % 26;
      }

      // Check if matches FOREVER
      const currentWord = next.map((i) => ALPHABET[i]).join('');
      if (currentWord === TARGET_WORD) {
        sound.playMatchSound();
        setIsUnlocked(true);
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ffd166', '#ff285e', '#ffffff']
        });
        setTimeout(() => {
          onSolve('FOREVER');
        }, 1800);
      }

      return next;
    });
  };

  const handleAutoAlign = () => {
    sound.playMatchSound();
    const solvedIndices = TARGET_WORD.split('').map((char) => ALPHABET.indexOf(char));
    setDialIndices(solvedIndices);
    setIsUnlocked(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffd166', '#ff285e', '#ffffff']
    });
    setTimeout(() => {
      onSolve('FOREVER');
    }, 1500);
  };

  return (
    <div className="relative max-w-md mx-auto w-full p-4 rounded-3xl bg-gradient-to-b from-[#1c0c08] via-[#0f0503] to-[#050201] border-2 border-amber-900/60 shadow-2xl text-center space-y-4 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-mono text-amber-400 pb-2 border-b border-amber-950/60">
        <span className="flex items-center gap-1.5">
          {isUnlocked ? <Unlock className="w-4 h-4 text-universe-gold" /> : <Lock className="w-4 h-4 text-amber-500" />}
          Mechanical Cryptex Lock
        </span>
        <span className="text-[11px] text-amber-200/70">
          Timestamp Cipher: 03:42
        </span>
      </div>

      {/* Clue Coordinates */}
      <div className="p-2.5 rounded-xl bg-black/60 border border-amber-900/40 text-[11px] font-mono text-amber-300/90 flex justify-center gap-2">
        {HINT_NUMBERS.map((num, i) => (
          <span key={i} className="px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-800/40">
            {num}
          </span>
        ))}
      </div>

      <p className="text-xs font-serif text-amber-200/80 italic">
        Rotate each brass ring to match the alphabetical coordinate numbers:
      </p>

      {/* Cryptex Wheels Assembly */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 py-3 px-2 bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-amber-950/40 rounded-2xl border border-amber-700/40 shadow-inner">
        {dialIndices.map((letterIdx, i) => {
          const letter = ALPHABET[letterIdx];
          const isCorrect = letter === TARGET_WORD[i];

          return (
            <div key={i} className="flex flex-col items-center">
              {/* Up Button */}
              <button
                onClick={() => rotateDial(i, 'up')}
                disabled={isUnlocked}
                className="p-1 text-amber-400/70 hover:text-universe-gold hover:scale-110 active:scale-95 transition-all touch-manipulation"
              >
                <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Dial Letter Ring */}
              <div
                className={`w-9 h-12 sm:w-11 sm:h-14 rounded-xl flex items-center justify-center font-serif text-lg sm:text-xl font-bold border-2 transition-all shadow-md ${
                  isCorrect
                    ? 'bg-gradient-to-b from-amber-600 via-universe-gold to-amber-600 text-black border-amber-300 shadow-glow-gold'
                    : 'bg-gradient-to-b from-[#2a130a] via-[#1c0c05] to-[#2a130a] text-amber-200 border-amber-800/60'
                }`}
              >
                {letter}
              </div>

              {/* Down Button */}
              <button
                onClick={() => rotateDial(i, 'down')}
                disabled={isUnlocked}
                className="p-1 text-amber-400/70 hover:text-universe-gold hover:scale-110 active:scale-95 transition-all touch-manipulation"
              >
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Unlocked Message */}
      {isUnlocked ? (
        <div className="p-3 rounded-xl bg-amber-950/50 border border-universe-gold/60 text-xs font-serif text-universe-gold animate-fadeIn">
          ✨ The cylinder clicks open! The scroll reads: "Every second on call was bringing us closer to forever."
        </div>
      ) : (
        <div className="pt-1">
          <button
            onClick={handleAutoAlign}
            className="text-[11px] font-mono text-amber-400/60 hover:text-amber-300 underline underline-offset-2"
          >
            Auto-align Cryptex to 6-15-18-5-22-5-18
          </button>
        </div>
      )}

    </div>
  );
}
