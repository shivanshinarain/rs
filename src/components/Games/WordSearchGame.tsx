import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Check, Heart, Mail } from 'lucide-react';
import { sound } from '../../utils/audioEngine';

interface WordSearchGameProps {
  onSolve: (answer: string) => void;
}

const TARGET_WORD = 'WIFEYY';

export default function WordSearchGame({ onSolve }: WordSearchGameProps) {
  const [selectedWord, setSelectedWord] = useState<string>('');
  const [solved, setSolved] = useState(false);

  // Letter grid
  const letters = [
    ['W', 'I', 'F', 'E', 'Y', 'Y'],
    ['R', 'O', 'A', 'S', 'T', '♡'],
    ['T', 'E', 'A', 'S', 'E', '•'],
    ['H', 'A', 'M', 'E', 'S', 'H'],
    ['P', 'Y', 'A', 'A', 'R', '✨']
  ];

  const handleLetterTap = (char: string) => {
    if (solved || char === '♡' || char === '•' || char === '✨') return;
    sound.playHeartClick();

    const next = selectedWord + char;
    setSelectedWord(next);

    if (next === TARGET_WORD) {
      sound.playMatchSound();
      setSolved(true);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff285e', '#ffd166', '#ffffff']
      });
      setTimeout(() => {
        onSolve('WIFEYY');
      }, 1800);
    } else if (!TARGET_WORD.startsWith(next)) {
      sound.playTone(180, 0.2);
      setTimeout(() => setSelectedWord(''), 400);
    }
  };

  return (
    <div className="relative max-w-sm mx-auto w-full p-4 rounded-3xl bg-gradient-to-b from-[#1c0817] via-[#0f040d] to-[#050104] border-2 border-universe-wine/60 shadow-2xl text-center space-y-4 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-universe-wine/30">
        <span className="text-universe-dustyPink font-semibold flex items-center gap-1.5">
          <Mail className="w-3.5 h-3.5 text-universe-blush" />
          The Word Hunter Grid
        </span>
        <span className="text-universe-gold">
          Target: {selectedWord || 'Spell W-I-F-E-Y-Y'}
        </span>
      </div>

      <p className="text-xs font-serif text-universe-blush italic">
        Spell the sacred word that opens Rashi's hospital coma letter:
      </p>

      {/* Grid of Letters */}
      <div className="grid grid-cols-6 gap-2 my-2">
        {letters.flatMap((row, rIdx) =>
          row.map((char, cIdx) => {
            const isSpecial = char === '♡' || char === '•' || char === '✨';
            const isTargetRow = rIdx === 0;

            return (
              <button
                key={`${rIdx}-${cIdx}`}
                onClick={() => handleLetterTap(char)}
                className={`h-11 rounded-xl font-mono text-sm sm:text-base font-bold flex items-center justify-center border transition-all active:scale-90 ${
                  isTargetRow && solved
                    ? 'bg-universe-crimson border-universe-glowingRed text-white shadow-glow-red scale-105'
                    : isSpecial
                    ? 'bg-universe-wine/10 border-universe-wine/20 text-universe-lavender/30 cursor-default'
                    : 'bg-universe-black/60 border-universe-wine/40 text-universe-cream hover:border-universe-blush hover:bg-universe-wine/40'
                }`}
              >
                {char}
              </button>
            );
          })
        )}
      </div>

      {/* Progress Bar or Excerpt */}
      {solved ? (
        <div className="p-3 rounded-xl bg-universe-darkBurgundy border border-universe-glowingRed text-xs font-serif text-universe-cream animate-fadeIn space-y-1">
          <p className="font-semibold text-universe-blush">
            "Heyy wifeyy... i want you to read my message whenever you feel better..."
          </p>
          <span className="text-[10px] font-mono text-universe-dustyPink">
            Unlocked: The prayer that brought Shivi back ♡
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-between text-[11px] font-mono text-universe-dustyPink pt-1">
          <span>Letters: {selectedWord.length} / 6</span>
          <button
            onClick={() => setSelectedWord('')}
            className="text-universe-blush hover:underline"
          >
            Clear letters
          </button>
        </div>
      )}

    </div>
  );
}
