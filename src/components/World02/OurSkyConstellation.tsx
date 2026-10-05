import React, { useState } from 'react';
import { Star, Heart, Sparkles, X, Volume2 } from 'lucide-react';
import { sound } from '../../utils/audioEngine';

interface SkyStar {
  id: number;
  label: string;
  date: string;
  memory: string;
  message: string;
  image?: string;
  // Positions in different formations (percentages)
  scatter: { x: number; y: number };
  formationR: { x: number; y: number };
  formationHeart: { x: number; y: number };
  formationUS: { x: number; y: number };
}

const SKY_STARS: SkyStar[] = [
  {
    id: 1,
    label: 'First Swipe',
    date: 'Autumn 2025',
    memory: 'The Tinder Match',
    message: 'Out of 8 billion souls, our thumbs swiped right on each other.',
    image: '/assets/shivi_rashi_cartoon.jpg',
    scatter: { x: 18, y: 35 },
    formationR: { x: 25, y: 20 },
    formationHeart: { x: 30, y: 25 },
    formationUS: { x: 20, y: 25 }
  },
  {
    id: 2,
    label: 'First 3 AM Call',
    date: 'Month 1',
    memory: 'Midnight Whispers',
    message: 'Neither of us wanted to hang up. We stayed up until the birds started chirping.',
    image: '/assets/shivi_rashi_cartoon_sleep_call.jpg',
    scatter: { x: 35, y: 65 },
    formationR: { x: 25, y: 45 },
    formationHeart: { x: 20, y: 45 },
    formationUS: { x: 20, y: 60 }
  },
  {
    id: 3,
    label: 'The Proposal',
    date: '22 November 2025',
    memory: 'Interval Tak Nhi',
    message: '"I want u in my life... poori zindagi tak." The day we became us.',
    image: '/assets/shivi_rashi_cartoon_proposal.jpg',
    scatter: { x: 55, y: 25 },
    formationR: { x: 25, y: 70 },
    formationHeart: { x: 35, y: 75 },
    formationUS: { x: 35, y: 70 }
  },
  {
    id: 4,
    label: 'The Sacred Yes',
    date: '22 November 2025',
    memory: 'Permanent Commitment 🤧',
    message: '"Okay... then yess i\'ll be with u, permanent commitment frm my side."',
    image: '/assets/shivi_rashi_doodle_proposal.jpg',
    scatter: { x: 75, y: 45 },
    formationR: { x: 45, y: 20 },
    formationHeart: { x: 50, y: 88 },
    formationUS: { x: 35, y: 25 }
  },
  {
    id: 5,
    label: 'The Kiss Demand',
    date: 'Every Single Night',
    memory: 'Bas Teen-Char',
    message: '"Kiss toh mil sakti hai na? Bas teen-char, aur zyada nahi!"',
    image: '/assets/shivi_rashi_stickers.jpg',
    scatter: { x: 42, y: 40 },
    formationR: { x: 50, y: 35 },
    formationHeart: { x: 65, y: 75 },
    formationUS: { x: 60, y: 25 }
  },
  {
    id: 6,
    label: 'Hospital Coma Letter',
    date: 'Our Darkest Night',
    memory: 'Heyy Wifeyy',
    message: '"Please don\'t leave your rashi alone like this... talk to me, tease me, roast me."',
    image: '/assets/shivi_rashi_cartoon_stargazing.jpg',
    scatter: { x: 62, y: 75 },
    formationR: { x: 40, y: 50 },
    formationHeart: { x: 80, y: 45 },
    formationUS: { x: 60, y: 50 }
  },
  {
    id: 7,
    label: 'The Awakening Text',
    date: 'The Light After Darkness',
    memory: 'The Sweet Text',
    message: 'Waking up to the prayers of the girl who refused to leave my side.',
    image: '/assets/shivi_rashi_doodle_couch.jpg',
    scatter: { x: 82, y: 20 },
    formationR: { x: 55, y: 70 },
    formationHeart: { x: 70, y: 25 },
    formationUS: { x: 75, y: 60 }
  },
  {
    id: 8,
    label: 'Paper Rings Vow',
    date: 'Forever and Beyond',
    memory: 'Our Anthem',
    message: '"I\'d marry you with paper rings! You\'re the one I want!"',
    image: '/assets/shivi_rashi_cartoon_proposal.jpg',
    scatter: { x: 25, y: 80 },
    formationR: { x: 32, y: 45 },
    formationHeart: { x: 50, y: 40 },
    formationUS: { x: 75, y: 25 }
  }
];

export default function OurSkyConstellation() {
  const [unlockedStarIds, setUnlockedStarIds] = useState<number[]>([1, 2]);
  const [selectedStar, setSelectedStar] = useState<SkyStar | null>(null);
  const [formation, setFormation] = useState<'scatter' | 'R' | 'heart' | 'US'>('scatter');

  const handleStarClick = (star: SkyStar) => {
    sound.playConstellationChime();
    setSelectedStar(star);

    setUnlockedStarIds((prev) => {
      const next = prev.includes(star.id) ? prev : [...prev, star.id];
      // Auto-morph logic as stars are unlocked
      if (next.length >= 4 && formation === 'scatter') setFormation('R');
      if (next.length >= 6 && formation === 'R') setFormation('heart');
      if (next.length >= 8) setFormation('US');
      return next;
    });
  };

  const getPosition = (star: SkyStar) => {
    if (formation === 'R') return star.formationR;
    if (formation === 'heart') return star.formationHeart;
    if (formation === 'US') return star.formationUS;
    return star.scatter;
  };

  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 flex flex-col items-center justify-center select-none">
      <div className="max-w-4xl w-full text-center space-y-6 sm:space-y-8">
        
        {/* Header */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-universe-dustyPink px-3.5 py-1.5 rounded-full border border-universe-wine/40 bg-universe-darkBurgundy/40 inline-flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-universe-gold fill-universe-gold" />
            Permanent Constellation
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-universe-cream">
            Our Sky
          </h2>
          <p className="font-serif italic text-xs sm:text-sm text-universe-blush">
            "Every star holds a memory. As you unlock them, watch how our stars align."
          </p>
        </div>

        {/* Formation Switcher Bar */}
        <div className="flex justify-center items-center gap-2 p-1.5 rounded-full bg-universe-black/60 border border-universe-wine/50 max-w-xs mx-auto">
          {[
            { id: 'scatter', label: 'Scatter' },
            { id: 'R', label: 'Constellation R' },
            { id: 'heart', label: 'Constellation ♡' },
            { id: 'US', label: 'Constellation US' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => {
                sound.playHeartClick();
                setFormation(f.id as any);
              }}
              className={`flex-1 py-1.5 px-2.5 rounded-full text-[10px] font-mono transition-all ${
                formation === f.id
                  ? 'bg-universe-crimson text-white shadow-glow-red font-bold'
                  : 'text-universe-lavender/60 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* The Constellation Sky Canvas Frame */}
        <div className="relative mx-auto w-full h-[420px] sm:h-[500px] rounded-3xl bg-gradient-to-b from-[#180816] via-[#0b030a] to-[#040103] border-2 border-universe-wine/60 shadow-2xl p-4 overflow-hidden">
          
          {/* Subtle Stardust Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffd166_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

          {/* SVG Connecting Constellation Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {SKY_STARS.map((star, i) => {
              if (i === 0) return null;
              const prev = SKY_STARS[i - 1];
              const p1 = getPosition(prev);
              const p2 = getPosition(star);
              return (
                <line
                  key={i}
                  x1={`${p1.x}%`}
                  y1={`${p1.y}%`}
                  x2={`${p2.x}%`}
                  y2={`${p2.y}%`}
                  stroke="rgba(245, 184, 198, 0.35)"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                />
              );
            })}
          </svg>

          {/* Glowing Celestial Stars */}
          {SKY_STARS.map((star) => {
            const isUnlocked = unlockedStarIds.includes(star.id);
            const pos = getPosition(star);

            return (
              <button
                key={star.id}
                onClick={() => handleStarClick(star)}
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transition: 'left 1s cubic-bezier(0.4, 0, 0.2, 1), top 1s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center touch-manipulation z-20"
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-130 group-active:scale-95 ${
                    isUnlocked
                      ? 'bg-universe-gold text-black shadow-glow-gold scale-110'
                      : 'bg-universe-wine/60 text-universe-lavender/70 border border-universe-wine/80'
                  }`}
                >
                  <Star className={`w-4 h-4 sm:w-5 sm:h-5 ${isUnlocked ? 'fill-black' : 'fill-none'}`} />
                </div>
                <span className="mt-1 text-[8px] sm:text-[9px] font-mono text-universe-cream/90 bg-universe-black/80 px-2 py-0.5 rounded-full border border-universe-wine/30 whitespace-nowrap shadow-sm group-hover:text-universe-blush">
                  {star.label}
                </span>
              </button>
            );
          })}

          {/* Star Memory Modal */}
          {selectedStar && (
            <div className="absolute inset-x-4 bottom-4 z-30 p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#220a1c] to-[#0c0309] border border-universe-gold/60 shadow-2xl animate-fadeIn space-y-2 text-left flex flex-col sm:flex-row items-center gap-4">
              {selectedStar.image && (
                <img
                  src={selectedStar.image}
                  alt={selectedStar.memory}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-universe-wine/50 shrink-0"
                />
              )}

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-universe-gold uppercase tracking-wider">
                    {selectedStar.date} • {selectedStar.memory}
                  </span>
                  <button
                    onClick={() => setSelectedStar(null)}
                    className="w-6 h-6 rounded-full bg-universe-wine/40 text-universe-blush flex items-center justify-center hover:scale-110"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="font-serif italic text-xs sm:text-sm text-universe-cream">
                  "{selectedStar.message}"
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
