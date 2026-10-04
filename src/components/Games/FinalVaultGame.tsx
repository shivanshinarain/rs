import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Lock, Unlock, KeyRound, Sparkles, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/audioEngine';

interface FinalVaultGameProps {
  onSolve: (answer: string) => void;
}

const VAULT_KEYS = [
  { id: 1, name: 'MOTU', icon: '🧸' },
  { id: 2, name: 'INTERVAL', icon: '🎞️' },
  { id: 3, name: 'FOREVER', icon: '⏱️' },
  { id: 4, name: 'PERMANENT', icon: '💍' },
  { id: 5, name: 'WIFEYY', icon: '💌' }
];

export default function FinalVaultGame({ onSolve }: FinalVaultGameProps) {
  const [insertedKeys, setInsertedKeys] = useState<number[]>([1, 2, 3]); // Some already inserted for immersion
  const [vaultUnlocked, setVaultUnlocked] = useState(false);

  const handleInsertKey = (keyId: number) => {
    if (insertedKeys.includes(keyId)) return;
    sound.playCassetteClick();
    const next = [...insertedKeys, keyId];
    setInsertedKeys(next);
  };

  const handleTurnMasterKey = () => {
    sound.playDoorOpen();
    setVaultUnlocked(true);
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ffd166', '#ff285e', '#ffffff']
    });
    setTimeout(() => {
      onSolve('RINGS');
    }, 1800);
  };

  const allKeysInserted = insertedKeys.length >= VAULT_KEYS.length;

  return (
    <div className="relative max-w-md mx-auto w-full p-5 rounded-3xl bg-gradient-to-b from-[#220c1c] via-[#12040f] to-[#070106] border-2 border-universe-gold shadow-glow-gold text-center space-y-5 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-universe-gold/30">
        <span className="text-universe-gold font-semibold flex items-center gap-1.5">
          {vaultUnlocked ? <Unlock className="w-4 h-4 text-universe-gold" /> : <Lock className="w-4 h-4 text-universe-gold" />}
          The Grand Meta-Vault of Us
        </span>
        <span className="text-universe-blush">
          Keys: {insertedKeys.length} / 5 Slotted
        </span>
      </div>

      <p className="text-xs font-serif text-universe-cream italic">
        Slot in all 5 memory keys gathered across your journey to unlock the sanctuary:
      </p>

      {/* 5 Physical Key Slots */}
      <div className="grid grid-cols-5 gap-2 my-2">
        {VAULT_KEYS.map((k) => {
          const isInserted = insertedKeys.includes(k.id);

          return (
            <button
              key={k.id}
              onClick={() => handleInsertKey(k.id)}
              disabled={isInserted || vaultUnlocked}
              className={`p-2.5 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all ${
                isInserted
                  ? 'bg-gradient-to-b from-amber-700/60 to-universe-darkBurgundy border-universe-gold shadow-glow-gold text-universe-gold scale-105'
                  : 'bg-universe-black/70 border-universe-wine/50 text-universe-lavender/40 hover:border-universe-gold/70'
              }`}
            >
              <span className="text-xl">{k.icon}</span>
              <span className="text-[9px] font-mono font-bold truncate max-w-full">
                {k.name}
              </span>
              <span className="text-[8px] font-mono text-universe-dustyPink">
                {isInserted ? 'LOCKED' : 'INSERT'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Insert Remaining Keys helper */}
      {!allKeysInserted && (
        <button
          onClick={() => {
            sound.playCassetteClick();
            setInsertedKeys(VAULT_KEYS.map((k) => k.id));
          }}
          className="text-[11px] font-mono text-universe-gold hover:underline"
        >
          Insert all collected memory keys into slots
        </button>
      )}

      {/* Master Riddle & Turn Key Action */}
      <div className="p-3.5 rounded-2xl bg-universe-black/70 border border-universe-gold/40 text-xs text-universe-cream space-y-2">
        <p className="font-serif italic text-universe-blush">
          "I like shiny things, but I'd marry you with PAPER [ _______ ]!"
        </p>

        <button
          onClick={handleTurnMasterKey}
          disabled={!allKeysInserted || vaultUnlocked}
          className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-amber-500 via-universe-gold to-amber-500 text-black font-serif text-xs uppercase tracking-widest font-bold shadow-glow-gold hover:scale-105 active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
        >
          <span>Turn Golden Master Key: "PAPER RINGS"</span>
          <Sparkles className="w-4 h-4" />
        </button>
      </div>

      {vaultUnlocked && (
        <div className="text-xs font-serif text-universe-gold animate-fadeIn">
          👑 The final vault opens! Transitioning into our universe climax...
        </div>
      )}

    </div>
  );
}
