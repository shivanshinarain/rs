import React, { useState } from 'react';
import { Image as ImageIcon, Heart, Sparkles, X, RotateCw, Pin } from 'lucide-react';
import { loveStoryData } from '../data/loveStory';
import { sound } from '../utils/audioEngine';
import { HeartDoodle, StarDoodle, ArrowDoodle, CuteAnnotation } from './Doodles';

export default function Chapter10_Scrapbook({ onEasterEggUnlock }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [flippedCards, setFlippedCards] = useState(new Set());

  const data = loveStoryData.scrapbook;

  const handleCardClick = (mem) => {
    sound.playHeartClick();
    setSelectedPhoto(mem);
  };

  const handleFlipCard = (e, id) => {
    e.stopPropagation();
    sound.playEnvelopeOpen();
    setFlippedCards(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    if (onEasterEggUnlock) onEasterEggUnlock('polaroid-flip');
  };

  return (
    <section id="chapter-10" className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 flex flex-col justify-center items-center relative z-20">
      <div className="max-w-6xl w-full text-center space-y-8 sm:space-y-10">
        
        {/* Header */}
        <div className="space-y-2 sm:space-y-3 relative">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-universe-dustyPink font-medium px-3.5 py-1.5 rounded-full border border-universe-wine/40 bg-universe-darkBurgundy/40 inline-block">
            Chapter {data.chapterNumber} — {data.tagline}
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-universe-cream">
            {data.headline}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-universe-lavender/80 max-w-lg mx-auto px-2">
            {data.instructions}
          </p>

          {/* Doodles near header */}
          <div className="hidden sm:block absolute top-0 right-10">
            <CuteAnnotation text="our real memories ♡" arrowDirection="down" />
          </div>
        </div>

        {/* Vintage Scrapbook Board */}
        <div className="relative p-4 sm:p-10 rounded-3xl bg-gradient-to-b from-[#180812] to-[#0a0307] border-2 border-universe-wine/50 shadow-2xl film-grain overflow-hidden">
          
          {/* Decorative Stickers & Washi Tape */}
          <div className="hidden sm:block absolute top-4 left-6 px-3 py-1 bg-universe-wine/50 text-universe-blush text-[11px] font-mono rounded border border-universe-blush/30 rotate-[-8deg] pointer-events-none z-10">
            ⭐ FAVORITE MOMENTS
          </div>
          <div className="hidden sm:block absolute top-4 right-8 px-4 py-1 bg-universe-crimson/40 text-universe-cream text-[11px] font-serif rounded border border-universe-glowingRed/40 rotate-[6deg] pointer-events-none z-10">
            SHIVI ♡ RASHI
          </div>

          {/* Doodled Floating Elements */}
          <div className="absolute bottom-6 left-6 pointer-events-none opacity-80 hidden md:block">
            <HeartDoodle className="w-10 h-10 text-universe-blush/60" />
            <span className="block font-handwritten text-sm text-universe-blush mt-1">forever in love</span>
          </div>

          <div className="absolute top-1/2 right-4 pointer-events-none opacity-80 hidden md:block">
            <StarDoodle className="w-8 h-8 text-universe-gold/60" />
          </div>

          {/* Polaroids Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-2 sm:pt-6">
            {data.memories.map((mem) => {
              const isFlipped = flippedCards.has(mem.id);

              return (
                <div
                  key={mem.id}
                  onClick={() => handleCardClick(mem)}
                  style={{
                    transform: `rotate(${mem.rotation * 0.6}deg)`,
                  }}
                  className="group relative bg-[#fcf8f5] text-[#2a121d] rounded-2xl p-3.5 sm:p-4 shadow-xl hover:rotate-0 hover:scale-105 active:scale-95 hover:shadow-2xl transition-all duration-300 cursor-pointer select-none touch-manipulation max-w-xs mx-auto w-full"
                >
                  {/* Washi Tape Strip at Top */}
                  <div
                    style={{ backgroundColor: mem.tape }}
                    className="absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-4 sm:h-5 opacity-80 rounded-sm shadow-sm rotate-1 z-10"
                  />

                  {/* Photo Frame or Back Note */}
                  {!isFlipped ? (
                    <div>
                      {/* Photo Area */}
                      <div className="relative h-44 sm:h-48 rounded-xl bg-gradient-to-br from-[#2c1421] via-[#1a0812] to-[#0d0307] border border-stone-200 overflow-hidden flex items-center justify-center">
                        <img
                          src={mem.image}
                          alt={mem.caption}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        {/* Film Gloss Sheen */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                      </div>

                      {/* Polaroid Caption */}
                      <div className="pt-2.5 sm:pt-3 pb-1 text-left">
                        <p className="font-handwritten text-base sm:text-lg text-[#381624] font-semibold leading-tight line-clamp-2">
                          {mem.caption}
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* FLIPPED POLAROID BACK NOTE (EASTER EGG) */
                    <div className="h-56 sm:h-60 flex flex-col justify-between p-3 text-left bg-[#f8f1ea] rounded-xl border border-dashed border-[#8c5064]">
                      <div>
                        <span className="text-[9px] sm:text-[10px] uppercase font-mono text-universe-crimson">
                          Secret Note on Back
                        </span>
                        <p className="font-handwritten text-base sm:text-lg text-[#381624] mt-1.5 leading-relaxed">
                          "I took this mental snapshot because right then, your laugh made the whole universe quiet. I love you, motu."
                        </p>
                      </div>
                      <p className="text-[11px] sm:text-xs font-handwritten text-right text-universe-crimson font-bold">
                        — Shivi ♡
                      </p>
                    </div>
                  )}

                  {/* Flip Action Button */}
                  <div className="flex justify-between items-center pt-2 border-t border-stone-200 text-[10px] text-stone-500 font-sans">
                    <span>Tap to view</span>
                    <button
                      onClick={(e) => handleFlipCard(e, mem.id)}
                      className="hover:text-universe-crimson flex items-center gap-1 font-medium py-1 px-1.5 touch-manipulation"
                      title="Flip polaroid"
                    >
                      <RotateCw className="w-3 h-3" />
                      <span>{isFlipped ? 'Photo' : 'Flip Note'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Selected Lightbox Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 bg-universe-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
            <div className="max-w-md w-full bg-[#fdf9f5] text-[#2c1320] rounded-3xl p-5 sm:p-6 text-left shadow-2xl relative space-y-3 sm:space-y-4 max-h-[88vh] overflow-y-auto">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-stone-500 hover:text-stone-900 bg-stone-100 touch-manipulation"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-64 sm:h-72 rounded-2xl bg-gradient-to-br from-[#260e1d] to-[#0c0308] border border-stone-300 overflow-hidden flex items-center justify-center">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.caption}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#8a223e]">
                  Memory #{selectedPhoto.id}
                </span>
                <p className="font-handwritten text-xl sm:text-2xl text-[#2a111e] font-bold mt-1">
                  {selectedPhoto.caption}
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="w-full sm:w-auto px-5 py-2 rounded-full bg-universe-crimson text-white text-xs uppercase tracking-wider hover:bg-universe-wine transition-colors text-center touch-manipulation"
                >
                  Close Polaroid ♡
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
