import React, { useState } from 'react';
import { X } from 'lucide-react';

// Aapke diye hue questions aur categories ka database
export const gameData: Record<string, Array<{ type: string; text: string }>> = {
  truth: [
    { type: 'spicy', text: "Have you ever accidentally sent a sext to the wrong person?" },
    { type: 'naughty', text: "Who would you like to sext right now? ...Why don’t you do it?" },
    { type: 'deep', text: "When did you first realize you were attracted to me?" },
    { type: 'sweet', text: "What’s your favorite body part of mine?" },
    { type: 'fantasy', text: "What’s your biggest roleplay fantasy?" },
    { type: 'romantic', text: "What’s your most romantic memory of us?" },
    { type: 'funny', text: "What’s the weirdest thing anyone has ever said to you during sex?" },
    { type: 'extreme', text: "Have you ever faked an orgasm... with me?" }
  ],
  dare: [
    { type: 'spicy', text: "Put an ice cube in your underwear for one minute." },
    { type: 'naughty', text: "Perform a sexy belly dance or pole dance using a broom/mop." },
    { type: 'sweet', text: "Give a genuine compliment to your partner without overthinking it." },
    { type: 'fantasy', text: "Share a fantasy that your loved one has never heard before." },
    { type: 'romantic', text: "Kiss your partner passionately, like the climax of a movie (or via video call)." },
    { type: 'funny', text: "Do your best impression of someone trying way too hard on a first date." },
    { type: 'extreme', text: "Send a sexy selfie or text when they least expect it." }
  ],
  situation: [
    { type: 'romantic', text: "Scenario: If suddenly at midnight I showed up at your doorstep unannounced, what would your very first reaction be?" },
    { type: 'fantasy', text: "Scenario: If we magically woke up inside our absolute dream apartment together tomorrow, what room would we check first?" },
    { type: 'deep', text: "Scenario: If distance didn't exist for just 24 hours, how would we spend every single minute?" },
    { type: 'spicy', text: "Scenario: If we were stuck in a private elevator for 3 hours right now, what would happen?" },
    { type: 'sweet', text: "Scenario: If you could replay one single day of us all over again, which one would it be?" }
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
}: TruthDareWheelGameProps = {}) {
  const [gameState, setGameState] = useState<'spinning' | 'choosing-category' | 'playing'>('spinning'); // 'spinning', 'choosing-category', 'playing'
  const [selectedMode, setSelectedMode] = useState<'truth' | 'dare' | 'situation' | null>(null); // 'truth', 'dare', 'situation'
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentCard, setCurrentCard] = useState<{ type: string; text: string } | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinAngle, setSpinAngle] = useState(0);

  if (isOpen === false) return null;

  // Wheel Spin Handler
  const spinTheWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    
    // Random rotation between 4 to 8 full turns plus a random offset
    const randomExtra = Math.floor(Math.random() * 360) + 1440;
    setSpinAngle(prev => prev + randomExtra);

    setTimeout(() => {
      setIsSpinning(false);
      // Determine result based on final angle modulo 360 (3 sections: Truth, Dare, Situation)
      const finalDeg = (spinAngle + randomExtra) % 360;
      if (finalDeg < 120) setSelectedMode('truth');
      else if (finalDeg < 240) setSelectedMode('dare');
      else setSelectedMode('situation');

      setGameState('choosing-category');
    }, 3000); // 3 seconds spin animation matching CSS transition
  };

  // Pick category and fetch random question from that category
  const handleCategorySelect = (categoryType: string) => {
    setSelectedCategory(categoryType);
    if (!selectedMode || !gameData[selectedMode]) return;
    const pool = gameData[selectedMode].filter(item => categoryType === 'all' || item.type === categoryType);
    const randomQ = pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : gameData[selectedMode][0];
    setCurrentCard(randomQ);
    setGameState('playing');
  };

  const resetGame = () => {
    setGameState('spinning');
    setSelectedMode(null);
    setSelectedCategory(null);
    setCurrentCard(null);
  };

  const gameContent = (
    <div className="relative w-full flex flex-col items-center justify-center p-6 font-sans">
      {/* Optional Close Button for Modal */}
      {isModal && onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-30 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
          title="Close Game"
          aria-label="Close game"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-wider bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
          A UNIVERSE CALLED US — LDR WLW GAME
        </h1>
        <p className="text-gray-400 text-sm mt-2">Sweet, Deep, Spicy, Naughty & Fantasy Space</p>
      </div>

      {/* STAGE 1: SPIN THE WHEEL */}
      {gameState === 'spinning' && (
        <div className="flex flex-col items-center">
          <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
            {/* Wheel Pointer */}
            <div className="absolute -top-4 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-pink-500 filter drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]"></div>
            
            {/* Spinning Wheel Body */}
            <div 
              className="w-full h-full rounded-full border-4 border-pink-500/40 relative overflow-hidden shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all ease-out duration-[3000ms]"
              style={{
                transform: `rotate(${spinAngle}deg)`,
                background: 'conic-gradient(#1e1b4b 0deg 120deg, #31103f 120deg 240deg, #0f172a 240deg 360deg)'
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-pink-300 rotate-0 translate-y-[-70px]">TRUTH</div>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-purple-300 rotate-[120deg] translate-y-[-70px]">DARE</div>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-indigo-300 rotate-[240deg] translate-y-[-70px]">SITUATION</div>
            </div>

            {/* Center Spin Button */}
            <button 
              onClick={spinTheWheel}
              disabled={isSpinning}
              className="absolute z-10 w-24 h-24 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold text-sm shadow-[0_0_20px_rgba(236,72,153,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center border-4 border-[#0B0F19] cursor-pointer"
            >
              {isSpinning ? 'SPINNING...' : 'SPIN!'}
            </button>
          </div>
          <p className="text-gray-400 text-sm mt-6 animate-pulse">Tap the center to spin the cosmic wheel</p>
        </div>
      )}

      {/* STAGE 2: CHOOSE CATEGORY */}
      {gameState === 'choosing-category' && selectedMode && (
        <div className="flex flex-col items-center bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-md max-w-md w-full text-center shadow-2xl animate-fade-in">
          <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold mb-1">Wheel Landed On</span>
          <h2 className="text-3xl font-black text-white uppercase mb-6 tracking-wide drop-shadow-md">
            ✨ {selectedMode} ✨
          </h2>
          <p className="text-gray-300 text-sm mb-6">Ab apni pasand ki category chuniye:</p>
          
          <div className="grid grid-cols-2 gap-3 w-full">
            {['sweet', 'cute', 'funny', 'deep', 'spicy', 'romantic', 'fantasy', 'naughty', 'all'].map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className="py-3 px-4 rounded-xl bg-white/10 hover:bg-pink-600/30 hover:border-pink-500 border border-white/10 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STAGE 3: PLAYING (CARD REVEAL) */}
      {gameState === 'playing' && currentCard && (
        <div className="flex flex-col items-center max-w-lg w-full">
          <div className="w-full bg-gradient-to-br from-white/10 to-white/5 p-8 rounded-2xl border border-pink-500/30 shadow-[0_0_40px_rgba(236,72,153,0.15)] backdrop-blur-xl text-center relative overflow-hidden">
            <div className="absolute top-4 left-4 uppercase text-[10px] tracking-widest bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full border border-pink-500/30">
              {selectedMode} • {currentCard.type}
            </div>

            <div className="my-10">
              <p className="text-xl md:text-2xl font-medium text-white leading-relaxed">
                "{currentCard.text}"
              </p>
            </div>

            <div className="flex gap-4 justify-center mt-6">
              <button 
                onClick={() => handleCategorySelect(selectedCategory || 'all')}
                className="px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer"
              >
                Next Question
              </button>
              <button 
                onClick={resetGame}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/20 cursor-pointer"
              >
                Spin Again
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
        <div className="relative w-full max-w-2xl bg-[#0B0F19] text-[#FFFFFF] border border-pink-500/40 rounded-3xl shadow-2xl p-2 sm:p-4 my-auto">
          {gameContent}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#FFFFFF] flex flex-col items-center justify-center p-6 font-sans">
      {gameContent}
    </div>
  );
}
