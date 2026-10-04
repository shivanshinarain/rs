import { Sparkles, X, Lock } from 'lucide-react';
import { sound } from '../utils/audioEngine';

export interface MemoryItem {
  id: string;
  title: string;
  icon: string;
  type: 'word' | 'date' | 'symbol' | 'secret';
  value: string;
  lore: string;
}

interface MemoryPocketDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: MemoryItem[];
  totalExpected?: number;
}

export default function MemoryPocketDrawer({
  isOpen,
  onClose,
  items,
  totalExpected = 11
}: MemoryPocketDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-universe-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-gradient-to-b from-[#1c0817] via-[#10030c] to-[#080206] border-l-2 border-universe-wine/70 shadow-2xl flex flex-col p-5 sm:p-7 relative text-left animate-slideLeft">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-universe-wine/40">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-universe-crimson/20 border border-universe-glowingRed/50 flex items-center justify-center text-universe-blush">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-universe-cream font-medium">
                  Memory Pocket
                </h3>
                <p className="text-[11px] font-mono text-universe-dustyPink">
                  Collected Fragments: {items.length} / {totalExpected}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playHeartClick();
                onClose();
              }}
              className="p-2 rounded-full text-universe-lavender hover:text-white bg-universe-wine/30 transition-colors"
              title="Close Memory Pocket"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Intro quote */}
          <div className="py-3 text-xs font-serif italic text-universe-lavender/80 border-b border-universe-wine/20">
            "Every clue you uncover is tucked safely into your pocket. You will need them to unlock the final gate to our future."
          </div>

          {/* List of Collected Items */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-1">
            {items.length === 0 ? (
              <div className="text-center py-12 space-y-3 text-universe-lavender/60">
                <Lock className="w-8 h-8 mx-auto text-universe-wine" />
                <p className="font-serif text-sm">Your memory pocket is empty right now.</p>
                <p className="text-xs font-sans">Solve the puzzle chapters in our ARG journey to gather the lost memories!</p>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-3.5 rounded-2xl bg-universe-black/50 border border-universe-wine/50 hover:border-universe-glowingRed/50 transition-all space-y-1.5 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{item.icon}</span>
                      <h4 className="font-serif text-sm text-universe-cream group-hover:text-universe-blush transition-colors">
                        {item.title}
                      </h4>
                    </div>
                    <span className="text-[9px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-full bg-universe-wine/30 text-universe-dustyPink border border-universe-wine/40">
                      {item.type}
                    </span>
                  </div>

                  <div className="px-2 py-1 rounded-lg bg-universe-darkBurgundy/40 border border-universe-wine/30 text-xs font-mono text-universe-gold flex items-center justify-between">
                    <span>Key Token:</span>
                    <span className="font-bold tracking-wider">{item.value}</span>
                  </div>

                  <p className="text-[11px] font-sans text-universe-lavender/70 italic leading-snug">
                    "{item.lore}"
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Bottom Progress Bar */}
          <div className="pt-4 border-t border-universe-wine/40 space-y-2">
            <div className="flex justify-between text-[11px] font-mono text-universe-dustyPink">
              <span>ARG Journey Progress</span>
              <span>{Math.round((items.length / totalExpected) * 100)}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-universe-black overflow-hidden border border-universe-wine/40">
              <div
                className="h-full bg-gradient-to-r from-universe-crimson to-universe-glowingRed transition-all duration-500"
                style={{ width: `${Math.min(100, (items.length / totalExpected) * 100)}%` }}
              />
            </div>
            {items.length >= totalExpected && (
              <p className="text-[11px] text-center text-universe-blush font-serif animate-pulse pt-1">
                ✨ All memories gathered! The Final Lock is ready to be opened!
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
