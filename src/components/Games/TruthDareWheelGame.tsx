import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, RotateCcw, X, Flame } from 'lucide-react';
import { sound } from '../../utils/audioEngine';

// Aapke diye hue questions aur categories ka database + cute WLW additions
export const gameData: Record<string, Array<{ type: string; text: string }>> = {
  truth: [
    { type: 'spicy', text: "Have you ever accidentally sent a sext to the wrong person?" },
    { type: 'naughty', text: "Who would you like to sext right now? ...Why don’t you do it?" },
    { type: 'deep', text: "When did you first realize you were attracted to me?" },
    { type: 'sweet', text: "What’s your favorite body part of mine?" },
    { type: 'fantasy', text: "What’s your biggest roleplay fantasy?" },
    { type: 'romantic', text: "What’s your most romantic memory of us?" },
    { type: 'funny', text: "What’s the weirdest thing anyone has ever said to you during sex?" },
    { type: 'extreme', text: "Have you ever faked an orgasm... with me?" },
    { type: 'cute', text: "What is the single cutest thing I do when I think nobody is watching?" },
    { type: 'sweet', text: "What was the exact moment you knew this wasn't just a crush, but forever?" },
    { type: 'romantic', text: "If you could whisper one dirty secret in my ear right now, what would it be?" }
  ],
  dare: [
    { type: 'spicy', text: "Put an ice cube in your underwear for one minute." },
    { type: 'naughty', text: "Perform a sexy belly dance or pole dance using a broom/mop." },
    { type: 'sweet', text: "Give a genuine compliment to your partner without overthinking it." },
    { type: 'fantasy', text: "Share a fantasy that your loved one has never heard before." },
    { type: 'romantic', text: "Kiss your partner passionately, like the climax of a movie (or via video call)." },
    { type: 'funny', text: "Do your best impression of someone trying way too hard on a first date." },
    { type: 'extreme', text: "Send a sexy selfie or text when they least expect it." },
    { type: 'cute', text: "Send a 15-second audio whispering why you're crazy about me in your softest voice." },
    { type: 'spicy', text: "Bite your lip on camera and tell me what you'd do to me if distance was 0 km right now." }
  ],
  situation: [
    { type: 'romantic', text: "Scenario: If suddenly at midnight I showed up at your doorstep unannounced, what would your very first reaction be?" },
    { type: 'fantasy', text: "Scenario: If we magically woke up inside our absolute dream apartment together tomorrow, what room would we check first?" },
    { type: 'deep', text: "Scenario: If distance didn't exist for just 24 hours, how would we spend every single minute?" },
    { type: 'spicy', text: "Scenario: If we were stuck in a private elevator for 3 hours right now, what would happen?" },
    { type: 'sweet', text: "Scenario: If you could replay one single day of us all over again, which one would it be?" },
    { type: 'naughty', text: "Scenario: We are sitting together at a crowded family dinner and under the table my hand slowly rests on your thigh... what do you do?" },
    { type: 'cute', text: "Scenario: It's raining cats and dogs outside, blanket is shared, hot chocolate is ready, what song are we slow-dancing to?" }
  ]
};

interface TruthDareWheelGameProps {
  isOpen?: boolean;
  onClose?: () => void;
  isModal?: boolean;
}

export default function TruthDareWheelGame({
  isOpen = true,
  onClose,
  isModal = false
}: TruthDareWheelGameProps) {
  const [gameState, setGameState] = useState<'spinning' | 'choosing-category' | 'playing'>('spinning');
  const [selectedMode, setSelectedMode] = useState<'truth' | 'dare' | 'situation' | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentCard, setCurrentCard] = useState<{ type: string; text: string } | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinAngle, setSpinAngle] = useState(0);

  if (isOpen === false) return null;

  // Wheel Spin Handler
  const spinTheWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    sound.playHeartClick();

    // Random rotation between 4 to 8 full turns plus a random offset
    const randomExtra = Math.floor(Math.random() * 360) + 1440;
    const targetAngle = spinAngle + randomExtra;
    setSpinAngle(targetAngle);

    // Audio click effect during spinning
    let clickCount = 0;
    const clickInterval = setInterval(() => {
      clickCount++;
      sound.playTone(320 + (clickCount * 12), 0.05, 'triangle', 0.04);
      if (clickCount >= 18) clearInterval(clickInterval);
    }, 140);

    setTimeout(() => {
      clearInterval(clickInterval);
      setIsSpinning(false);
      sound.playChime();
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#ec4899', '#8b5cf6', '#6366f1', '#ffffff']
      });

      // Determine result based on final angle modulo 360 (3 sections: Truth, Dare, Situation)
      const finalDeg = targetAngle % 360;
      if (finalDeg < 120) setSelectedMode('truth');
      else if (finalDeg < 240) setSelectedMode('dare');
      else setSelectedMode('situation');

      setGameState('choosing-category');
    }, 3000); // 3 seconds spin animation matching CSS transition
  };

  // Pick category and fetch random question from that category
  const handleCategorySelect = (categoryType: string) => {
    sound.playHeartClick();
    setSelectedCategory(categoryType);
    if (!selectedMode || !gameData[selectedMode]) return;

    const pool = gameData[selectedMode].filter(
      item => categoryType === 'all' || item.type === categoryType
    );
    const randomQ = pool.length > 0
      ? pool[Math.floor(Math.random() * pool.length)]
      : gameData[selectedMode][0];

    setCurrentCard(randomQ);
    setGameState('playing');
  };

  const resetGame = () => {
    sound.playHeartClick();
    setGameState('spinning');
    setSelectedMode(null);
    setSelectedCategory(null);
    setCurrentCard(null);
  };

  const content = (
    <div className="w-full flex flex-col items-center justify-center p-4 sm:p-6 font-sans select-none relative">
      {/* Optional Close Button for Modal Mode */}
      {isModal && onClose && (
        <button
          onClick={() => {
            sound.playHeartClick();
            onClose();
          }}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
          title="Close Game"
          aria-label="Close game"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Header */}
      <div className="text-center mb-8 max-w-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-mono uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>Cosmic Wheel of Desire</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wider bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
          A UNIVERSE CALLED US — LDR WLW GAME
        </h1>
        <p className="text-gray-300 text-xs sm:text-sm mt-2">
          Sweet, Deep, Spicy, Naughty & Fantasy Space for Shivi & Rashi ♡
        </p>
      </div>

      {/* STAGE 1: SPIN THE WHEEL */}
      {gameState === 'spinning' && (
        <div className="flex flex-col items-center animate-fade-in">
          <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
            {/* Wheel Pointer */}
            <div className="absolute -top-4 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-pink-500 filter drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
            
            {/* Spinning Wheel Body */}
            <div 
              className="w-full h-full rounded-full border-4 border-pink-500/40 relative overflow-hidden shadow-[0_0_35px_rgba(139,92,246,0.35)] transition-all ease-out duration-[3000ms]"
              style={{
                transform: `rotate(${spinAngle}deg)`,
                background: 'conic-gradient(#1e1b4b 0deg 120deg, #31103f 120deg 240deg, #0f172a 240deg 360deg)'
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm font-bold text-pink-300 rotate-0 -translate-y-20 tracking-wider">
                TRUTH
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm font-bold text-purple-300 rotate-[120deg] -translate-y-20 tracking-wider">
                DARE
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm font-bold text-indigo-300 rotate-[240deg] -translate-y-20 tracking-wider">
                SITUATION
              </div>
            </div>

            {/* Center Spin Button */}
            <button 
              onClick={spinTheWheel}
              disabled={isSpinning}
              className={`absolute z-10 w-24 h-24 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 text-white font-extrabold text-sm shadow-[0_0_25px_rgba(236,72,153,0.7)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center border-4 border-[#0B0F19] cursor-pointer ${isSpinning ? 'opacity-80 scale-95' : 'hover:shadow-[0_0_35px_rgba(236,72,153,0.9)]'}`}
            >
              {isSpinning ? 'SPINNING...' : 'SPIN! 🎡'}
            </button>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm mt-6 animate-pulse">
            Tap the center to spin the cosmic wheel
          </p>
        </div>
      )}

      {/* STAGE 2: CHOOSE CATEGORY */}
      {gameState === 'choosing-category' && selectedMode && (
        <div className="flex flex-col items-center bg-[#141026]/80 p-6 sm:p-8 rounded-3xl border border-pink-500/30 backdrop-blur-xl max-w-md w-full text-center shadow-2xl animate-fade-in">
          <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold mb-1">
            Wheel Landed On
          </span>
          <h2 className="text-3xl font-black text-white uppercase mb-2 tracking-wide drop-shadow-md">
            ✨ {selectedMode} ✨
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm mb-6">
            Ab apni pasand ki category chuniye:
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full">
            {['sweet', 'cute', 'funny', 'deep', 'spicy', 'romantic', 'fantasy', 'naughty', 'extreme', 'all'].map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className="py-3 px-3 rounded-xl bg-white/10 hover:bg-pink-600/30 hover:border-pink-500 border border-white/10 text-xs font-bold uppercase tracking-wider text-pink-200 hover:text-white transition-all cursor-pointer"
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={resetGame}
            className="mt-6 text-xs text-gray-400 hover:text-pink-300 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Spin wheel again</span>
          </button>
        </div>
      )}

      {/* STAGE 3: PLAYING (CARD REVEAL) */}
      {gameState === 'playing' && currentCard && (
        <div className="flex flex-col items-center max-w-lg w-full animate-fade-in">
          <div className="w-full bg-gradient-to-br from-[#1a1130]/90 to-[#100b20]/90 p-6 sm:p-8 rounded-3xl border border-pink-500/40 shadow-[0_0_50px_rgba(236,72,153,0.25)] backdrop-blur-xl text-center relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="uppercase text-[10px] tracking-widest bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full border border-pink-500/30 font-mono">
                {selectedMode} • {currentCard.type}
              </span>
              <span className="text-xs text-pink-300/70 font-mono">
                {selectedCategory}
              </span>
            </div>

            <div className="my-8 sm:my-10 px-2 sm:px-4">
              <p className="text-lg sm:text-2xl font-serif font-light text-white leading-relaxed italic">
                "{currentCard.text}"
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
              <button 
                onClick={() => handleCategorySelect(selectedCategory || 'all')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-pink-600/30 cursor-pointer"
              >
                Next Question →
              </button>
              <button 
                onClick={resetGame}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/20 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Spin Again</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
        <div className="relative w-full max-w-2xl bg-[#0B0F19] border border-pink-500/40 rounded-3xl shadow-2xl p-2 sm:p-6 my-auto">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#FFFFFF] flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      {content}
    </div>
  );
}
