import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import { sound } from '../../utils/audioEngine';

interface EmojiMemoryGameProps {
  onSolve: (answer: string) => void;
}

interface MemoryCard {
  id: number;
  emoji: string;
  label: string;
  matched: boolean;
}

const BASE_PAIRS = [
  { emoji: '💍', label: 'Paper Ring' },
  { emoji: '🌙', label: 'Midnight Talk' },
  { emoji: '🍕', label: 'Shared Pizza' },
  { emoji: '🤧', label: 'Permanent' },
  { emoji: '🧸', label: 'Motu Teddy' },
  { emoji: '🔒', label: 'Forever Seal' }
];

export default function EmojiMemoryGame({ onSolve }: EmojiMemoryGameProps) {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [matchesCount, setMatchesCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const initGame = () => {
    const deck: MemoryCard[] = [];
    BASE_PAIRS.forEach((pair, idx) => {
      deck.push({ id: idx * 2, emoji: pair.emoji, label: pair.label, matched: false });
      deck.push({ id: idx * 2 + 1, emoji: pair.emoji, label: pair.label, matched: false });
    });
    // Shuffle
    deck.sort(() => Math.random() - 0.5);
    setCards(deck);
    setFlippedIds([]);
    setMatchesCount(0);
    setIsCompleted(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (id: number) => {
    if (flippedIds.length === 2 || flippedIds.includes(id)) return;
    const clickedCard = cards.find((c) => c.id === id);
    if (!clickedCard || clickedCard.matched) return;

    sound.playHeartClick();

    const nextFlipped = [...flippedIds, id];
    setFlippedIds(nextFlipped);

    if (nextFlipped.length === 2) {
      const [firstId, secondId] = nextFlipped;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        // Matched!
        sound.playMatchSound();
        setCards((prev) =>
          prev.map((c) =>
            c.id === firstId || c.id === secondId ? { ...c, matched: true } : c
          )
        );
        const nextMatches = matchesCount + 1;
        setMatchesCount(nextMatches);
        setFlippedIds([]);

        if (nextMatches === BASE_PAIRS.length) {
          setIsCompleted(true);
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff285e', '#ffd166', '#ffffff']
          });
          setTimeout(() => {
            onSolve('PERMANENT');
          }, 1800);
        }
      } else {
        // Not a match
        sound.playTone(200, 0.2);
        setTimeout(() => {
          setFlippedIds([]);
        }, 900);
      }
    }
  };

  return (
    <div className="relative max-w-sm mx-auto w-full p-4 rounded-3xl bg-gradient-to-b from-[#190915] via-[#0f040c] to-[#060205] border-2 border-universe-wine/60 shadow-2xl text-center space-y-4 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-universe-wine/30">
        <span className="text-universe-dustyPink font-semibold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-universe-blush" />
          Couple Emoji Memory Match
        </span>
        <span className="text-universe-gold">
          Pairs: {matchesCount} / {BASE_PAIRS.length}
        </span>
      </div>

      <p className="text-xs font-serif text-universe-blush italic">
        Flip matching pairs of emojis to decode Rashi's secret vow:
      </p>

      {/* 4x3 Grid */}
      <div className="grid grid-cols-4 gap-2.5 my-2">
        {cards.map((card) => {
          const isFlipped = flippedIds.includes(card.id) || card.matched;

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square rounded-2xl border-2 flex items-center justify-center text-2xl transition-all duration-300 touch-manipulation ${
                isFlipped
                  ? card.matched
                    ? 'bg-universe-crimson/50 border-universe-glowingRed shadow-glow-red scale-102'
                    : 'bg-universe-wine/60 border-universe-blush text-white shadow-glow-blush'
                  : 'bg-universe-black/80 border-universe-wine/50 text-universe-lavender/30 hover:border-universe-wine'
              }`}
            >
              {isFlipped ? card.emoji : '♡'}
            </button>
          );
        })}
      </div>

      {/* Completion Banner */}
      {isCompleted ? (
        <div className="p-3 rounded-2xl bg-universe-darkBurgundy border border-universe-glowingRed text-xs font-serif text-universe-cream animate-fadeIn space-y-1">
          <span className="text-base">💍 🤧 🔒</span>
          <p className="font-semibold text-universe-gold">
            Decoded: "PERMANENT COMMITMENT"
          </p>
        </div>
      ) : (
        <button
          onClick={initGame}
          className="text-[11px] font-mono text-universe-dustyPink hover:text-white flex items-center justify-center gap-1 mx-auto"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Cards</span>
        </button>
      )}

    </div>
  );
}
