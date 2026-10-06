import React, { useState } from 'react';
import { X } from 'lucide-react';

// Game database without any explicit labels
export interface GameItem {
  type: string;
  heat: number;
  text: string;
}

export const gameData: Record<'truth' | 'dare' | 'situation', GameItem[]> = {
  truth: [
    { type: 'spicy', heat: 5, text: "Have you ever accidentally sent a sext to the wrong person?" },
    { type: 'naughty', heat: 5, text: "Who would you like to sext right now? ...Why don’t you do it?" },
    { type: 'extreme', heat: 5, text: "Have you ever faked an orgasm... with me?" },
    { type: 'deep', heat: 3, text: "When did you first realize you were attracted to me?" },
    { type: 'sweet', heat: 1, text: "What’s your favorite body part of mine?" },
    { type: 'fantasy', heat: 4, text: "What’s your biggest roleplay fantasy?" },
    { type: 'romantic', heat: 2, text: "What’s your most romantic memory of us?" },
    { type: 'funny', heat: 2, text: "What’s the weirdest thing anyone has ever said to you during sex?" }
  ],
  dare: [
    { type: 'spicy', heat: 5, text: "Put an ice cube in your underwear for one minute." },
    { type: 'naughty', heat: 5, text: "Perform a sexy belly dance or pole dance using a broom/mop." },
    { type: 'extreme', heat: 5, text: "Send a spicy/sexy text or selfie right now to your partner." },
    { type: 'sweet', heat: 1, text: "Give a genuine compliment to your partner without overthinking it." },
    { type: 'fantasy', heat: 4, text: "Share a fantasy that your loved one has never heard before." },
    { type: 'romantic', heat: 3, text: "Kiss your partner passionately, like the climax of a movie (or via video call)." },
    { type: 'funny', heat: 2, text: "Do your best impression of someone trying way too hard on a first date." }
  ],
  situation: [
    { type: 'romantic', heat: 3, text: "Scenario: If suddenly at midnight I showed up at your doorstep unannounced, what would your very first reaction be?" },
    { type: 'fantasy', heat: 4, text: "Scenario: If we magically woke up inside our absolute dream apartment together tomorrow, what room would we check first?" },
    { type: 'deep', heat: 3, text: "Scenario: If distance didn't exist for just 24 hours, how would we spend every single minute?" },
    { type: 'spicy', heat: 5, text: "Scenario: If we were stuck in a private elevator for 3 hours right now, what would happen?" },
    { type: 'sweet', heat: 1, text: "Scenario: If you could replay one single day of us all over again, which one would it be?" }
  ]
};

export const heatLabels: Record<number, string> = {
  1: "🌸 Sweet & Cute",
  2: "💬 Fun & Flirty",
  3: "🌙 Deep & Romantic",
  4: "🔥 Spicy & Fantasy",
  5: "🌶️ Extreme & Naughty"
};

export interface CleanTruthDareGameProps {
  isOpen?: boolean;
  onClose?: () => void;
  isModal?: boolean;
}

export default function CleanTruthDareGame({
  isOpen = true,
  onClose,
  isModal = false
}: CleanTruthDareGameProps = {}) {
  const [gameState, setGameState] = useState<'spinning' | 'choosing-category' | 'playing'>('spinning'); 
  const [selectedMode, setSelectedMode] = useState<'truth' | 'dare' | 'situation' | null>(null); 
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentCard, setCurrentCard] = useState<GameItem | null>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [spinAngle, setSpinAngle] = useState<number>(0);

  const [heatLevel, setHeatLevel] = useState<number>(3); 
  const [isSyncMode, setIsSyncMode] = useState<boolean>(true); 

  if (isOpen === false) return null;

  const spinTheWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    
    const randomExtra = Math.floor(Math.random() * 360) + 1440;
    setSpinAngle(prev => prev + randomExtra);

    setTimeout(() => {
      setIsSpinning(false);
      const finalDeg = (spinAngle + randomExtra) % 360;
      if (finalDeg < 120) setSelectedMode('truth');
      else if (finalDeg < 240) setSelectedMode('dare');
      else setSelectedMode('situation');

      setGameState('choosing-category');
    }, 3000);
  };

  const handleCategorySelect = (catType: string) => {
    setSelectedCategory(catType);
    if (!selectedMode || !gameData[selectedMode]) return;
    
    const pool = gameData[selectedMode].filter(item => {
      const matchesCat = (catType === 'all' || item.type === catType);
      const matchesHeat = item.heat <= heatLevel;
      return matchesCat && matchesHeat;
    });

    const finalPool = pool.length > 0 ? pool : gameData[selectedMode];
    const randomQ = finalPool[Math.floor(Math.random() * finalPool.length)];
    
    setCurrentCard(randomQ);
    setGameState('playing');
  };

  const resetGame = () => {
    setGameState('spinning');
    setSelectedMode(null);
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

      {/* Top Header */}
      <div className="text-center mb-6 max-w-xl w-full">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wider bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
          A UNIVERSE CALLED US — OUR COSMIC GAME
        </h1>
        
        <div className="flex items-center justify-center gap-3 mt-4 bg-white/5 border border-white/10 py-2 px-4 rounded-full w-fit mx-auto backdrop-blur-md">
          <span className="text-xs text-gray-300">Live Sync:</span>
          <button 
            onClick={() => setIsSyncMode(!isSyncMode)}
            className={`text-xs px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${isSyncMode ? 'bg-pink-600 text-white shadow-[0_0_10px_rgba(236,72,153,0.5)]' : 'bg-white/10 text-gray-400'}`}
          >
            {isSyncMode ? '🟢 Connected (Sync Active)' : '⚪ Solo Mode'}
          </button>
        </div>
      </div>

      {/* Heat Level Slider */}
      <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md max-w-md w-full mb-6 text-center">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-pink-400 font-semibold uppercase tracking-wider">Heat Level Intensity</span>
          <span className="text-xs font-bold text-white bg-pink-500/20 px-2.5 py-0.5 rounded-md border border-pink-500/30">
            {heatLabels[heatLevel]}
          </span>
        </div>
        <input 
          type="range" 
          min="1" 
          max="5" 
          value={heatLevel} 
          onChange={(e) => setHeatLevel(Number(e.target.value))}
          className="w-full accent-pink-500 cursor-pointer bg-gray-700 h-2 rounded-lg"
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>Sweet</span>
          <span>Flirty</span>
          <span>Romantic</span>
          <span>Spicy</span>
          <span>Extreme</span>
        </div>
      </div>

      {/* STAGE 1: SPIN THE WHEEL */}
      {gameState === 'spinning' && (
        <div className="flex flex-col items-center">
          <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
            <div className="absolute -top-4 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-pink-500 filter drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]"></div>
            
            <div 
              className="w-full h-full rounded-full border-4 border-pink-500/40 relative overflow-hidden shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all ease-out duration-[3000ms]"
              style={{
                transform: `rotate(${spinAngle}deg)`,
                background: 'conic-gradient(#1e1b4b 0deg 120deg, #31103f 120deg 240deg, #0f172a 240deg 360deg)'
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-pink-300 translate-y-[-70px]">TRUTH</div>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-purple-300 rotate-[120deg] translate-y-[-70px]">DARE</div>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-indigo-300 rotate-[240deg] translate-y-[-70px]">SITUATION</div>
            </div>

            <button 
              onClick={spinTheWheel}
              disabled={isSpinning}
              className="absolute z-10 w-24 h-24 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold text-sm shadow-[0_0_20px_rgba(236,72,153,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center border-4 border-[#0B0F19] cursor-pointer"
            >
              {isSpinning ? 'SPINNING...' : 'SPIN!'}
            </button>
          </div>
          <p className="text-gray-400 text-sm mt-6 animate-pulse">
            {isSyncMode ? '🌟 Shivi & Rashi Sync Wheel Ready' : 'Tap the center to spin'}
          </p>
        </div>
      )}

      {/* STAGE 2: CHOOSE CATEGORY */}
      {gameState === 'choosing-category' && selectedMode && (
        <div className="flex flex-col items-center bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md max-w-md w-full text-center shadow-2xl">
          <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold mb-1">Wheel Landed On</span>
          <h2 className="text-3xl font-black text-white uppercase mb-4 tracking-wide">
            ✨ {selectedMode} ✨
          </h2>
          <p className="text-gray-300 text-xs mb-4">Current Heat Level filter applied: <span className="text-pink-300 font-bold">{heatLabels[heatLevel]}</span></p>
          
          <div className="grid grid-cols-2 gap-2.5 w-full">
            {['sweet', 'deep', 'romantic', 'spicy', 'naughty', 'fantasy', 'all'].map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-pink-600/30 hover:border-pink-500 border border-white/10 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STAGE 3: PLAYING */}
      {gameState === 'playing' && currentCard && selectedMode && (
        <div className="flex flex-col items-center max-w-lg w-full">
          <div className="w-full bg-gradient-to-br from-white/10 to-white/5 p-8 rounded-2xl border border-pink-500/30 shadow-[0_0_40px_rgba(236,72,153,0.15)] backdrop-blur-xl text-center relative">
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] uppercase tracking-widest bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full border border-pink-500/30">
                {selectedMode} • {currentCard.type}
              </span>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30">
                Intensity: {currentCard.heat}/5
              </span>
            </div>

            <div className="my-8">
              <p className="text-lg md:text-xl font-medium text-white leading-relaxed">
                "{currentCard.text}"
              </p>
            </div>

            <div className="flex gap-4 justify-center mt-6">
              <button 
                onClick={() => handleCategorySelect(selectedCategory)}
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

// Export aliases so existing imports continue to function without any friction
export const TruthDareWheelGame = CleanTruthDareGame;
