import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Lock, Unlock, Sparkles, X, Heart, KeyRound, Check } from 'lucide-react';
import { loveStoryData } from '../data/loveStory';
import { sound } from '../utils/audioEngine';
import SaveRashiMiniGame from './Games/SaveRashiMiniGame';
import UniverseGameExperience from './Games/UniverseGameExperience';

export default function EasterEggsModal({ isOpen, onClose, unlockedSet = new Set(), onUnlockEgg }) {
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);
  const [vaultUnlocked, setVaultUnlocked] = useState(false);
  const [isSaveRashiOpen, setIsSaveRashiOpen] = useState(false);
  const [isUniverseGameOpen, setIsUniverseGameOpen] = useState(false);

  if (!isOpen) return null;

  const handleKeypad = (num) => {
    sound.playHeartClick();
    if (passcode.length < 4) {
      const next = passcode + num;
      setPasscode(next);
      if (next === '2211' || next === '0143' || next === '1430') {
        sound.playMatchSound();
        setVaultUnlocked(true);
        if (onUnlockEgg) onUnlockEgg('secret-code');
        confetti({
          particleCount: 70,
          spread: 80,
          colors: ['#ff285e', '#f5b8c6', '#f5cb68']
        });
      } else if (next.length === 4) {
        setPasscodeError(true);
        sound.playTone(180, 0.2);
        setTimeout(() => {
          setPasscode('');
          setPasscodeError(false);
        }, 800);
      }
    }
  };

  const handleClear = () => {
    sound.playHeartClick();
    setPasscode('');
    setPasscodeError(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-universe-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn select-none">
      <div className="max-w-2xl w-full bg-gradient-to-b from-[#200b19] via-[#130510] to-[#070206] border-2 border-universe-wine/80 rounded-3xl p-4 sm:p-8 text-left shadow-2xl relative max-h-[88vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-universe-lavender hover:text-white bg-universe-wine/20 touch-manipulation"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 sm:gap-3 border-b border-universe-wine/40 pb-3 sm:pb-4 pr-10">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-universe-crimson/20 border border-universe-glowingRed/50 flex items-center justify-center text-universe-blush shrink-0">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-universe-dustyPink">
              Secret Constellation Vault
            </span>
            <h3 className="font-serif text-lg sm:text-2xl text-universe-cream font-medium">
              Hidden Secrets ({unlockedSet.size} / 10)
            </h3>
          </div>
        </div>

        {/* Secret Keypad Section */}
        <div className="my-4 sm:my-6 p-4 sm:p-5 rounded-2xl bg-universe-black/60 border border-universe-wine/50 space-y-3 sm:space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <KeyRound className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-universe-gold shrink-0" />
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-universe-cream">
                Vault Code (Hint: 22.11)
              </span>
            </div>
            <span className="text-xs font-mono text-universe-blush">
              {vaultUnlocked ? 'UNLOCKED ★' : passcode.padEnd(4, '•')}
            </span>
          </div>

          {!vaultUnlocked ? (
            <div className="space-y-2 sm:space-y-3">
              <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto text-center font-mono">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <button
                    key={n}
                    onClick={() => handleKeypad(n.toString())}
                    className="p-3 sm:p-2.5 rounded-xl bg-universe-wine/30 border border-universe-wine/50 hover:bg-universe-crimson hover:text-white transition-all text-xs font-bold touch-manipulation active:scale-95"
                  >
                    {n}
                  </button>
                ))}
                <button
                  onClick={handleClear}
                  className="p-3 sm:p-2.5 rounded-xl bg-universe-wine/20 text-universe-lavender hover:bg-universe-wine/40 text-[10px] touch-manipulation"
                >
                  CLR
                </button>
                <button
                  onClick={() => handleKeypad('0')}
                  className="p-3 sm:p-2.5 rounded-xl bg-universe-wine/30 border border-universe-wine/50 hover:bg-universe-crimson hover:text-white transition-all text-xs font-bold touch-manipulation active:scale-95"
                >
                  0
                </button>
                <button
                  onClick={() => handleKeypad('2')}
                  className="p-3 sm:p-2.5 rounded-xl bg-universe-wine/20 text-universe-lavender hover:bg-universe-wine/40 text-[10px] touch-manipulation"
                >
                  ♡
                </button>
              </div>
              {passcodeError && (
                <p className="text-center text-xs text-rose-400 font-mono">
                  Incorrect passcode! Try our anniversary date...
                </p>
              )}
            </div>
          ) : (
            <div className="p-3.5 sm:p-4 rounded-xl bg-universe-wine/30 border border-universe-gold/60 text-left space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 text-universe-gold text-xs font-mono uppercase tracking-wider font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Midnight Vault Letter (Written at 2:22 AM)</span>
              </div>
              <p className="font-serif italic text-xs sm:text-sm text-universe-cream leading-relaxed">
                "If you unlocked this, Rashi, it means you're being your curious, adorable self. I want you to know that in every room I walk into, I look for you. In every song I hear, I think of you. You are the greatest adventure of my life. I love you endlessly."
              </p>
              <p className="font-handwritten text-lg sm:text-xl text-universe-blush text-right">— Shivi ♡</p>
            </div>
          )}
        </div>

        {/* Easter Eggs Checklist */}
        <div className="space-y-2.5 sm:space-y-3">
          <h4 className="text-[10px] sm:text-xs uppercase font-mono tracking-widest text-universe-dustyPink">
            Discoverable Secrets Checklist:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
            {loveStoryData.easterEggs.map((egg) => {
              const isFound = unlockedSet.has(egg.id);

              return (
                <div
                  key={egg.id}
                  className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all ${
                    isFound
                      ? 'bg-universe-darkBurgundy border-universe-blush/40 shadow-sm'
                      : 'bg-universe-black/40 border-universe-wine/30 opacity-70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-xs sm:text-sm text-universe-cream font-medium">
                      {egg.name}
                    </span>
                    {isFound ? (
                      <span className="px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] uppercase tracking-wider bg-emerald-950 border border-emerald-500/40 text-emerald-300">
                        Found ✓
                      </span>
                    ) : (
                      <span className="text-[9px] sm:text-[10px] text-universe-lavender/50 font-mono">
                        Locked 🔒
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-universe-lavender/70 font-sans mt-0.5 sm:mt-1">
                    {isFound ? egg.secret : `Hint: ${egg.hint}`}
                  </p>
                  {egg.id === 'save-rashi' && (
                    <button
                      onClick={() => setIsSaveRashiOpen(true)}
                      className="mt-2 w-full py-1.5 px-3 rounded-lg bg-universe-crimson/30 hover:bg-universe-crimson/60 border border-universe-glowingRed/50 text-[10px] font-mono text-universe-blush flex items-center justify-center gap-1.5 transition-all"
                    >
                      <span>Launch 'Save Rashi ♡' Mini-Game 🎮</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Secret Games Quick Launcher */}
        <div className="pt-2 border-t border-universe-wine/30">
          <button
            onClick={() => setIsUniverseGameOpen(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-950/60 via-universe-wine/40 to-pink-950/60 hover:from-rose-900/80 hover:to-pink-900/80 border border-rose-500/40 text-xs font-mono text-rose-200 flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-universe-gold animate-spin" style={{ animationDuration: '8s' }} />
            <span>Launch 'A Universe Called Us' Story Game 🌟</span>
          </button>
        </div>

        {/* Save Rashi Mini-Game */}
        <SaveRashiMiniGame
          isOpen={isSaveRashiOpen}
          onClose={() => setIsSaveRashiOpen(false)}
          onEasterEggUnlock={onUnlockEgg}
        />

        {/* Universe Game Experience */}
        <UniverseGameExperience
          isOpen={isUniverseGameOpen}
          onClose={() => setIsUniverseGameOpen(false)}
          isModal={true}
        />

      </div>
    </div>
  );
}
