import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Search, Send, CheckCheck, Sparkles, MessageSquare, Heart } from 'lucide-react';
import { sound } from '../../utils/audioEngine';

interface WhatsAppChatGameProps {
  onSolve: (answer: string) => void;
}

const TARGET_LETTERS = ['I', 'N', 'T', 'E', 'R', 'V', 'A', 'L'];

export default function WhatsAppChatGame({ onSolve }: WhatsAppChatGameProps) {
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<{ id: number; char: string; used: boolean }[]>([
    { id: 1, char: 'T', used: false },
    { id: 2, char: 'I', used: false },
    { id: 3, char: 'E', used: false },
    { id: 4, char: 'R', used: false },
    { id: 5, char: 'N', used: false },
    { id: 6, char: 'A', used: false },
    { id: 7, char: 'L', used: false },
    { id: 8, char: 'V', used: false },
  ]);
  const [chatSolved, setChatSolved] = useState(false);

  const handleTileClick = (tile: { id: number; char: string; used: boolean }) => {
    if (tile.used || chatSolved) return;
    sound.playHeartClick();

    const nextSelected = [...selectedLetters, tile.char];
    setSelectedLetters(nextSelected);

    setAvailableLetters((prev) =>
      prev.map((t) => (t.id === tile.id ? { ...t, used: true } : t))
    );

    // Check if matched
    if (nextSelected.length === TARGET_LETTERS.length) {
      const spelled = nextSelected.join('');
      if (spelled === 'INTERVAL') {
        sound.playMatchSound();
        setChatSolved(true);
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#25D366', '#ff285e', '#ffffff']
        });
        setTimeout(() => {
          onSolve('INTERVAL');
        }, 1800);
      } else {
        sound.playTone(180, 0.25);
        setTimeout(() => {
          setSelectedLetters([]);
          setAvailableLetters((prev) => prev.map((t) => ({ ...t, used: false })));
        }, 800);
      }
    }
  };

  const handleResetLetters = () => {
    sound.playHeartClick();
    setSelectedLetters([]);
    setAvailableLetters((prev) => prev.map((t) => ({ ...t, used: false })));
  };

  return (
    <div className="relative max-w-sm mx-auto w-full rounded-3xl bg-[#0b141a] border-2 border-emerald-900/50 shadow-2xl overflow-hidden font-sans select-none">
      
      {/* WhatsApp Header */}
      <div className="bg-[#202c33] p-3 flex items-center justify-between text-white border-b border-[#2a3942]">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <img
              src="/assets/shivi_rashi_cartoon.jpg"
              alt="Shivi"
              className="w-10 h-10 rounded-full object-cover border border-emerald-500"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-[#202c33]" />
          </div>
          <div>
            <h4 className="font-semibold text-sm leading-tight">Shivi ♡ (Wifeyy)</h4>
            <span className="text-[11px] text-emerald-400">online</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-emerald-400/80">
          <Search className="w-4 h-4" />
          <Heart className="w-4 h-4 fill-emerald-500/20 text-emerald-400" />
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="p-3.5 space-y-3 bg-[#0b141a] min-h-[220px] text-left text-xs leading-relaxed">
        
        {/* Shivi's Message 1 */}
        <div className="max-w-[85%] p-2.5 rounded-2xl rounded-tl-sm bg-[#202c33] text-gray-200 shadow-sm space-y-1">
          <p>I want u in my life, not as a friend but as a gf, as a life partner... meko aap hamesha saath chahiye...</p>
          <span className="text-[9px] text-gray-400 block text-right">03:42 AM</span>
        </div>

        {/* Shivi's Missing Word Message */}
        <div className="max-w-[85%] p-3 rounded-2xl rounded-tl-sm bg-[#202c33] text-white shadow-sm space-y-2 border border-emerald-500/40">
          <p className="font-serif">
            "...meko aap hamesha saath chahiye...
            <span className="mx-1 px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 font-mono font-bold tracking-widest border border-emerald-600">
              {selectedLetters.length > 0 ? selectedLetters.join('') : '[ ? ? ? ? ? ? ? ? ]'}
            </span>
            tak nhi."
          </p>
          <span className="text-[9px] text-emerald-400/70 block text-right flex items-center justify-end gap-1">
            <span>03:43 AM</span>
            <CheckCheck className="w-3.5 h-3.5 text-blue-400" />
          </span>
        </div>

        {/* Rashi's Solved Reply */}
        {chatSolved && (
          <div className="max-w-[85%] ml-auto p-2.5 rounded-2xl rounded-tr-sm bg-[#005c4b] text-white shadow-sm space-y-1 animate-fadeIn">
            <p className="font-handwritten text-sm">
              "Okay...then yess i'll be with u not temporary, it's permanent commitment frm my side 🤧💍"
            </p>
            <span className="text-[9px] text-emerald-200/60 block text-right">03:44 AM</span>
          </div>
        )}

      </div>

      {/* Interactive Tile Keyboard / Letter Bank */}
      <div className="p-3 bg-[#202c33] border-t border-[#2a3942] space-y-2">
        <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
          <span>Assemble Shivi's Clause:</span>
          {selectedLetters.length > 0 && !chatSolved && (
            <button
              onClick={handleResetLetters}
              className="text-emerald-400 hover:underline"
            >
              Reset Tiles
            </button>
          )}
        </div>

        {/* Tiles Row */}
        <div className="flex justify-center gap-1.5 flex-wrap">
          {availableLetters.map((tile) => (
            <button
              key={tile.id}
              onClick={() => handleTileClick(tile)}
              disabled={tile.used || chatSolved}
              className={`w-9 h-10 rounded-xl font-mono font-bold text-sm transition-all flex items-center justify-center ${
                tile.used
                  ? 'bg-gray-800 text-gray-600 opacity-40 cursor-not-allowed'
                  : 'bg-emerald-800 hover:bg-emerald-600 text-white shadow-md active:scale-90'
              }`}
            >
              {tile.char}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
