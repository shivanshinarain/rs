import React, { useState } from 'react';
import { TWENTY_MOMENTS, StoryMoment, MomentCategory } from '../data/ourStory';
import { ChevronRight, X, Calendar } from 'lucide-react';
import { sound } from '../utils/audioEngine';

export default function TwentyMomentsGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeModalMoment, setActiveModalMoment] = useState<StoryMoment | null>(null);

  const categories: (MomentCategory | 'ALL')[] = [
    'ALL',
    'ROMANTIC',
    'FUNNY',
    'EMOTIONAL',
    'PUZZLE-WORTHY',
    'MILESTONES',
    'PROPOSAL-WORTHY'
  ];

  const filteredMoments = selectedCategory === 'ALL'
    ? TWENTY_MOMENTS
    : TWENTY_MOMENTS.filter(m => m.category === selectedCategory);

  const getCategoryColor = (cat: MomentCategory) => {
    switch (cat) {
      case 'ROMANTIC': return 'bg-universe-crimson/30 text-universe-blush border-universe-glowingRed/50';
      case 'FUNNY': return 'bg-amber-900/30 text-amber-200 border-amber-500/40';
      case 'EMOTIONAL': return 'bg-purple-900/30 text-purple-200 border-purple-500/40';
      case 'PUZZLE-WORTHY': return 'bg-cyan-900/30 text-cyan-200 border-cyan-500/40';
      case 'MILESTONES': return 'bg-rose-900/30 text-rose-200 border-rose-500/40';
      case 'PROPOSAL-WORTHY': return 'bg-yellow-900/30 text-yellow-200 border-yellow-500/40';
      default: return 'bg-universe-wine/30 text-universe-lavender border-universe-wine/40';
    }
  };

  return (
    <section id="twenty-moments" className="py-20 px-4 sm:px-6 relative z-20 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center space-y-3 mb-10 sm:mb-12">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-universe-dustyPink font-mono px-3.5 py-1.5 rounded-full border border-universe-wine/40 bg-universe-darkBurgundy/40 inline-block">
          The Living Archive of Us
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-universe-cream">
          20 Curated Moments of Shivi & Rashi ♡
        </h2>
        <p className="font-sans text-xs sm:text-sm text-universe-lavender/80 max-w-2xl mx-auto">
          Every inside joke, hospital tears, 3 AM whispers, kiss demands, and permanent commitments that built our universe.
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              sound.playHeartClick();
              setSelectedCategory(cat);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all touch-manipulation ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-universe-crimson to-universe-glowingRed text-white shadow-glow-red scale-105'
                : 'bg-universe-black/60 text-universe-lavender/70 border border-universe-wine/40 hover:text-universe-cream hover:border-universe-wine'
            }`}
          >
            {cat} {cat === 'ALL' ? `(${TWENTY_MOMENTS.length})` : ''}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredMoments.map((moment) => (
          <div
            key={moment.id}
            onClick={() => {
              sound.playHeartClick();
              setActiveModalMoment(moment);
            }}
            className="group relative rounded-2xl bg-gradient-to-b from-[#1c0817]/90 via-[#10040d]/90 to-[#070205]/95 border border-universe-wine/60 hover:border-universe-glowingRed/70 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-red flex flex-col justify-between cursor-pointer"
          >
            <div className="space-y-3">
              {/* Image Preview with Category Badge */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-universe-black border border-universe-wine/40">
                <img
                  src={moment.image}
                  alt={moment.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2">
                  <span className={`text-[9px] uppercase font-mono px-2 py-0.5 rounded-md border backdrop-blur-md font-semibold ${getCategoryColor(moment.category)}`}>
                    {moment.category}
                  </span>
                </div>
              </div>

              {/* Title & Date */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono text-universe-dustyPink">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-universe-blush" />
                    {moment.date}
                  </span>
                  <span>#{moment.id.toString().padStart(2, '0')}</span>
                </div>
                <h3 className="font-serif text-base text-universe-cream group-hover:text-universe-blush transition-colors line-clamp-1">
                  {moment.title}
                </h3>
                <p className="text-[11px] text-universe-dustyPink font-serif italic line-clamp-1">
                  "{moment.tagline}"
                </p>
              </div>

              {/* Excerpt */}
              <p className="text-xs text-universe-lavender/80 font-sans line-clamp-2 leading-relaxed">
                {moment.excerpt}
              </p>
            </div>

            {/* Bottom Card Footer */}
            <div className="pt-3 mt-3 border-t border-universe-wine/30 flex items-center justify-between text-xs text-universe-blush font-serif">
              <span>Read Full Memory</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Modal Detail View */}
      {activeModalMoment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-universe-black/90 backdrop-blur-md animate-fadeIn select-none">
          <div className="max-w-xl w-full rounded-3xl bg-gradient-to-b from-[#200919] via-[#12040e] to-[#070205] border-2 border-universe-wine/80 shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto space-y-5 text-left">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveModalMoment(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-universe-lavender hover:text-white bg-universe-wine/30"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Category & Date */}
            <div className="flex items-center gap-2">
              <span className={`text-[10px] uppercase font-mono px-2.5 py-1 rounded-full border ${getCategoryColor(activeModalMoment.category)}`}>
                {activeModalMoment.category}
              </span>
              <span className="text-xs font-mono text-universe-dustyPink">
                {activeModalMoment.date}
              </span>
            </div>

            {/* Title */}
            <div className="space-y-1">
              <h3 className="font-serif text-2xl sm:text-3xl text-universe-cream">
                {activeModalMoment.title}
              </h3>
              <p className="font-serif italic text-sm text-universe-blush">
                "{activeModalMoment.tagline}"
              </p>
            </div>

            {/* Illustration */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden border-2 border-universe-wine/60 shadow-lg">
              <img
                src={activeModalMoment.image}
                alt={activeModalMoment.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Story Details */}
            <div className="space-y-3 text-xs sm:text-sm text-universe-cream/90 font-sans leading-relaxed bg-universe-black/40 p-4 rounded-2xl border border-universe-wine/30">
              <p>{activeModalMoment.details}</p>
            </div>

            {/* Key Item Reward preview */}
            {activeModalMoment.unlockedItem && (
              <div className="p-3 rounded-xl bg-universe-darkBurgundy/40 border border-universe-wine/40 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{activeModalMoment.unlockedItem.icon}</span>
                  <div>
                    <span className="font-serif text-universe-cream font-medium">
                      {activeModalMoment.unlockedItem.name}
                    </span>
                    <p className="text-[10px] text-universe-lavender/70 font-sans">
                      {activeModalMoment.unlockedItem.description}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-universe-gold bg-universe-wine/30 px-2 py-0.5 rounded border border-universe-wine/40">
                  Key: {activeModalMoment.unlockedItem.keyPiece}
                </span>
              </div>
            )}

            {/* Modal Bottom button */}
            <button
              onClick={() => setActiveModalMoment(null)}
              className="w-full py-3 rounded-full bg-universe-wine/40 hover:bg-universe-wine/60 text-universe-cream text-xs font-sans uppercase tracking-wider font-semibold border border-universe-wine transition-all"
            >
              Close Memory
            </button>

          </div>
        </div>
      )}

    </section>
  );
}
