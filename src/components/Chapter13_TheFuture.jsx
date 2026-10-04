import React, { useState } from 'react';
import { Sparkles, Heart, DoorOpen, X, Key } from 'lucide-react';
import { loveStoryData } from '../data/loveStory';
import { sound } from '../utils/audioEngine';

export default function Chapter13_TheFuture() {
  const [openDoor, setOpenDoor] = useState(null);

  const data = loveStoryData.futureDreams;

  const handleDoorClick = (door) => {
    sound.playDoorOpen();
    setOpenDoor(door);
  };

  return (
    <section id="chapter-13" className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 flex flex-col justify-center items-center relative z-20">
      <div className="max-w-5xl w-full text-center space-y-8 sm:space-y-10">
        
        {/* Header */}
        <div className="space-y-2 sm:space-y-3">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-universe-dustyPink font-medium px-3.5 py-1.5 rounded-full border border-universe-wine/40 bg-universe-darkBurgundy/40 inline-block">
            Chapter {data.chapterNumber} — {data.tagline}
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-universe-cream">
            {data.headline}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-universe-lavender/80 max-w-lg mx-auto px-2">
            {data.subtitle}
          </p>
        </div>

        {/* Floating 4 Doors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-2 sm:pt-6">
          {data.doors.map((door) => {
            return (
              <div
                key={door.id}
                onClick={() => handleDoorClick(door)}
                className="group relative h-64 sm:h-72 rounded-3xl p-5 sm:p-6 bg-gradient-to-b from-[#210c1a] via-[#140610] to-[#090206] border-2 border-universe-wine/60 shadow-xl hover:border-universe-glowingRed hover:shadow-glow-wine transition-all duration-500 cursor-pointer flex flex-col justify-between overflow-hidden touch-manipulation active:scale-[0.98]"
              >
                {/* Glowing Light Bleed through Arch Door */}
                <div className="absolute inset-x-8 top-6 bottom-0 rounded-t-full bg-gradient-to-t from-transparent via-universe-glowingRed/10 to-universe-blush/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Top Door Header */}
                <div className="flex justify-between items-center relative z-10">
                  <span className="font-mono text-[11px] sm:text-xs text-universe-dustyPink uppercase tracking-widest">
                    Door 0{door.id}
                  </span>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-universe-wine/30 border border-universe-blush/30 flex items-center justify-center text-universe-blush group-hover:scale-110 transition-transform">
                    <Key className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-universe-gold" />
                  </div>
                </div>

                {/* Door Visual Center */}
                <div className="relative z-10 flex flex-col items-center justify-center space-y-2 sm:space-y-3">
                  <span className="text-3xl sm:text-4xl group-hover:scale-125 transition-transform duration-300">
                    {door.symbol}
                  </span>
                  <h3 className="font-serif text-base sm:text-lg text-universe-cream font-medium group-hover:text-universe-blush transition-colors">
                    {door.title}
                  </h3>
                  <p className="text-xs text-universe-lavender/70 font-sans line-clamp-2 max-w-[200px]">
                    {door.teaser}
                  </p>
                </div>

                {/* Bottom Prompt */}
                <div className="relative z-10 pt-2.5 sm:pt-3 border-t border-universe-wine/30 flex items-center justify-between text-xs text-universe-blush">
                  <span className="font-sans uppercase text-[10px] tracking-wider">Unlock Tomorrow</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Door Revealed Dream Scene Modal */}
        {openDoor && (
          <div className="fixed inset-0 z-50 bg-universe-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
            <div className="max-w-lg w-full bg-gradient-to-b from-[#260e1d] via-[#160611] to-[#0b0308] border border-universe-wine/80 rounded-3xl p-5 sm:p-8 text-center space-y-4 sm:space-y-6 shadow-2xl relative max-h-[85vh] overflow-y-auto">
              <button
                onClick={() => setOpenDoor(null)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-universe-lavender hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-tr from-universe-crimson/30 to-universe-blush/30 border border-universe-blush/50 flex items-center justify-center text-3xl sm:text-4xl shadow-glow-blush animate-bounce">
                {openDoor.symbol}
              </div>

              <div className="space-y-1">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-universe-gold font-mono">
                  Vision of Our Tomorrow — Door 0{openDoor.id}
                </span>
                <h3 className="font-serif text-xl sm:text-3xl text-universe-cream">
                  {openDoor.title}
                </h3>
              </div>

              <div className="p-4 sm:p-6 rounded-2xl bg-universe-black/50 border border-universe-wine/50 text-left">
                <p className="font-serif italic text-sm sm:text-lg text-universe-cream/90 leading-relaxed">
                  "{openDoor.story}"
                </p>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => setOpenDoor(null)}
                  className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-universe-crimson to-universe-glowingRed text-xs uppercase tracking-widest text-white shadow-glow-red hover:scale-105 transition-all touch-manipulation"
                >
                  I Can't Wait For This ♡
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
