import React, { useState } from 'react';
import {
  Moon,
  Lamp,
  Heart,
  Sparkles,
  BookOpen,
  Image,
  Bed,
  Star,
  CheckCircle2,
  X
} from 'lucide-react';
import { sound } from '../../utils/audioEngine';
import SaveRashiMiniGame from '../Games/SaveRashiMiniGame';

interface RoomForYouProps {
  onEasterEggUnlock?: (id: string) => void;
}

interface RoomObject {
  id: string;
  name: string;
  icon: string;
  x: number; // percentage in room
  y: number;
  revealText: string;
  whisper: string;
}

const ROOM_OBJECTS: RoomObject[] = [
  {
    id: 'window',
    name: 'The Big Window',
    icon: '🪟',
    x: 18,
    y: 22,
    revealText: "this is where i'd put all the nights we talked until sunrise.",
    whisper: "looking out at the rain or moon, knowing you're looking at the same sky."
  },
  {
    id: 'moon',
    name: 'Crescent Moon Glow',
    icon: '🌙',
    x: 25,
    y: 12,
    revealText: "for every time the miles felt unbearable, the moon proved we share one home.",
    whisper: "shining quietly into your room and mine at the exact same moment."
  },
  {
    id: 'bed',
    name: 'Cozy Blanket Sanctuary',
    icon: '🛏️',
    x: 32,
    y: 65,
    revealText: "the place where I imagine holding you till morning.",
    whisper: "soft fleece blankets, your head against my shoulder, no alarms."
  },
  {
    id: 'teddy',
    name: 'The Motu Teddy',
    icon: '🧸',
    x: 24,
    y: 68,
    revealText: "so you always have something soft to hug when my arms aren't there yet.",
    whisper: "teasing you with 'mota' while you squeeze it tight."
  },
  {
    id: 'lamp',
    name: 'Warm Bedside Lamp',
    icon: '💡',
    x: 48,
    y: 52,
    revealText: "for the nights you couldn't sleep.",
    whisper: "a gentle golden glow that stays on until your breathing softens into sleep."
  },
  {
    id: 'hoodie',
    name: 'The Lavender Hoodie',
    icon: '🧥',
    x: 52,
    y: 62,
    revealText: "the oversized hoodie you stole and made completely yours.",
    whisper: "drowning in the soft sleeves, smelling like home and quiet mornings."
  },
  {
    id: 'ring-box',
    name: 'The Paper Ring Box',
    icon: '💍',
    x: 42,
    y: 58,
    revealText: "for promising forever without needing shiny diamonds.",
    whisper: "folded with pure love: 'I would marry you with paper rings!'"
  },
  {
    id: 'letters',
    name: 'The Letter Stash',
    icon: '💌',
    x: 72,
    y: 68,
    revealText: "for the words that outlive paper.",
    whisper: "including your hospital prayer: 'heyy wifeyy... don't leave your rashi alone like this.'"
  },
  {
    id: 'photos',
    name: 'The Polaroid String',
    icon: '📸',
    x: 70,
    y: 35,
    revealText: "proof that love travels any distance.",
    whisper: "our doodles, our smiles, our real moments framed on the wall."
  },
  {
    id: 'desk',
    name: 'The Midnight Desk',
    icon: '🕯️',
    x: 68,
    y: 58,
    revealText: "where i secretly coded this entire universe for you.",
    whisper: "every line written while missing you late at night."
  },
  {
    id: 'stars',
    name: 'The Ceiling Stars',
    icon: '✨',
    x: 50,
    y: 15,
    revealText: "for every time you made me look up.",
    whisper: "glow-in-the-dark stars arranged in the shape of 'RASHI'."
  }
];

export default function RoomForYou({ onEasterEggUnlock }: RoomForYouProps = {}) {
  const [inspectedObjects, setInspectedObjects] = useState<string[]>([]);
  const [activeObject, setActiveObject] = useState<RoomObject | null>(null);
  const [isSaveRashiOpen, setIsSaveRashiOpen] = useState(false);

  const handleInspect = (obj: RoomObject) => {
    sound.playHeartClick();
    setActiveObject(obj);
    if (!inspectedObjects.includes(obj.id)) {
      setInspectedObjects((prev) => [...prev, obj.id]);
    }
  };

  const isCompleted = inspectedObjects.length >= 6;

  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 flex flex-col items-center justify-center select-none">
      <div className="max-w-4xl w-full text-center space-y-6 sm:space-y-8">
        
        {/* Header */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-universe-dustyPink px-3.5 py-1.5 rounded-full border border-universe-wine/40 bg-universe-darkBurgundy/40 inline-flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-universe-glowingRed fill-universe-glowingRed" />
            Virtual Sanctuary
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-universe-cream">
            The Room I Made For You
          </h2>
          <p className="font-serif italic text-xs sm:text-sm text-universe-blush max-w-lg mx-auto">
            "Every object in this little bedroom holds a memory, a quiet truth, or a piece of my heart. Tap around to explore."
          </p>
        </div>

        {/* The Bedroom Virtual Frame */}
        <div className="relative mx-auto w-full h-[450px] sm:h-[550px] rounded-3xl bg-gradient-to-b from-[#1b0817] via-[#0d040c] to-[#050204] border-2 border-universe-wine/60 shadow-2xl p-4 sm:p-6 overflow-hidden">
          
          {/* Subtle Room Backdrop Drawing */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#3d1020_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Wooden Floor Line */}
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#150510] to-transparent border-t border-universe-wine/20 pointer-events-none" />

          {/* Room Hotspots */}
          {ROOM_OBJECTS.map((obj) => {
            const hasInspected = inspectedObjects.includes(obj.id);
            return (
              <button
                key={obj.id}
                onClick={() => handleInspect(obj)}
                style={{ left: `${obj.x}%`, top: `${obj.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center transition-all duration-300 touch-manipulation ${
                  hasInspected ? 'opacity-85' : 'animate-bounce'
                }`}
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-lg sm:text-xl border shadow-lg transition-transform group-hover:scale-125 group-active:scale-95 ${
                    hasInspected
                      ? 'bg-universe-darkBurgundy/80 border-universe-wine/60 shadow-glow-wine'
                      : 'bg-gradient-to-tr from-universe-crimson to-universe-glowingRed border-universe-blush shadow-glow-red'
                  }`}
                >
                  <span>{obj.icon}</span>
                </div>
                <span className="mt-1 text-[9px] sm:text-[10px] font-mono text-universe-cream/90 bg-universe-black/70 px-2 py-0.5 rounded-full border border-universe-wine/40 whitespace-nowrap shadow-sm">
                  {obj.name}
                </span>
              </button>
            );
          })}

          {/* Inspector Modal / Popover */}
          {activeObject && (
            <div className="absolute inset-x-4 bottom-4 z-30 p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#220a1c] to-[#0c0309] border border-universe-glowingRed/70 shadow-2xl animate-fadeIn space-y-2 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-universe-gold flex items-center gap-1.5">
                  <span className="text-base">{activeObject.icon}</span>
                  {activeObject.name}
                </span>
                <button
                  onClick={() => setActiveObject(null)}
                  className="w-6 h-6 rounded-full bg-universe-wine/40 text-universe-blush flex items-center justify-center hover:scale-110"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="font-serif text-sm sm:text-base text-universe-cream italic leading-relaxed">
                "{activeObject.revealText}"
              </p>
              <p className="font-sans text-xs text-universe-lavender/70">
                — {activeObject.whisper}
              </p>
            </div>
          )}

          {/* Secret Hidden Mini-Game Trigger: "pssst… save rashi ♡" */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              sound.playChime();
              setIsSaveRashiOpen(true);
            }}
            className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 cursor-pointer group flex flex-col items-center touch-manipulation hover:scale-110 active:scale-95 transition-all"
            title="pssst… click to save rashi!"
          >
            <div className="mb-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-universe-crimson to-universe-glowingRed border border-universe-blush/60 text-[9px] sm:text-[10px] font-mono text-white shadow-glow-red animate-bounce flex items-center gap-1">
              <span className="font-bold">pssst…</span>
              <span className="text-universe-gold">save rashi ♡</span>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-universe-wine/60 border-2 border-universe-blush flex items-center justify-center shadow-lg group-hover:border-universe-gold group-hover:shadow-glow-gold transition-all">
              <span className="text-xl sm:text-2xl animate-wiggle">🧸</span>
            </div>
          </div>

          {/* Progress Pill */}
          <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-universe-black/80 border border-universe-wine/40 text-[10px] font-mono text-universe-blush flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3 text-universe-gold" />
            <span>Discovered: {inspectedObjects.length} / {ROOM_OBJECTS.length} Objects</span>
          </div>

        </div>

        {/* Save Rashi Hidden Mini-Game Modal */}
        <SaveRashiMiniGame
          isOpen={isSaveRashiOpen}
          onClose={() => setIsSaveRashiOpen(false)}
          onEasterEggUnlock={onEasterEggUnlock}
        />

        {/* Climax Epilogue */}
        {isCompleted && (
          <div className="p-6 rounded-3xl bg-universe-black/70 border border-universe-wine/50 space-y-2 text-center animate-fadeIn">
            <p className="font-serif italic text-base sm:text-xl text-universe-cream">
              "i wish this room were real."
            </p>
            <p className="font-serif italic text-sm sm:text-lg text-universe-gold">
              "one day, maybe it will be."
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
