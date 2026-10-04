import React, { useState } from 'react';
import { Sparkles, Heart, ChevronDown, ChevronUp, Image as ImageIcon } from 'lucide-react';
import { loveStoryData } from '../data/loveStory';
import { sound } from '../utils/audioEngine';
import { HeartDoodle } from './Doodles';

export default function Chapter05_Timeline() {
  const [expandedId, setExpandedId] = useState(3); // Default expand Day One

  const toggleExpand = (id) => {
    sound.playHeartClick();
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section id="chapter-5" className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 flex flex-col justify-center items-center relative z-20">
      <div className="max-w-4xl w-full text-center space-y-8 sm:space-y-12">
        
        {/* Header */}
        <div className="space-y-2 sm:space-y-3">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-universe-dustyPink font-medium px-3.5 py-1.5 rounded-full border border-universe-wine/40 bg-universe-darkBurgundy/40 inline-block">
            Chapter 05 — Our Milestone Tree
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-universe-cream">
            The Timeline of Us
          </h2>
          <p className="font-sans text-xs sm:text-sm text-universe-lavender/80 max-w-lg mx-auto px-2">
            Woven along the red thread of fate — every milestone that brought us closer.
          </p>
        </div>

        {/* Tree Container with Central Glowing Thread */}
        <div className="relative pt-4 sm:pt-6 pb-8 sm:pb-12">
          
          {/* Vertical Glowing Line */}
          <div className="absolute left-4 sm:left-6 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-universe-wine via-universe-glowingRed to-universe-wine filter-glow-thread opacity-70" />

          {/* Timeline Nodes */}
          <div className="space-y-6 sm:space-y-10">
            {loveStoryData.timeline.map((item, index) => {
              const isEven = index % 2 === 0;
              const isExpanded = expandedId === item.id;
              const hasActualImage = item.image && item.image.startsWith('/');

              return (
                <div
                  key={item.id}
                  className={`relative flex items-center md:justify-between ${
                    isEven ? 'md:flex-row-reverse' : 'md:flex-row'
                  } flex-row pl-9 sm:pl-12 md:pl-0`}
                >
                  {/* Central Node Light Bead */}
                  <div
                    onClick={() => toggleExpand(item.id)}
                    className="absolute left-4 sm:left-6 md:left-1/2 -translate-x-1/2 z-20 cursor-pointer group touch-manipulation"
                  >
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                      isExpanded
                        ? 'bg-universe-glowingRed border-white scale-110 sm:scale-125 shadow-glow-red'
                        : 'bg-universe-darkBurgundy border-universe-wine hover:border-universe-blush group-hover:scale-110'
                    }`}>
                      <Heart className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isExpanded ? 'text-white fill-white' : 'text-universe-blush'}`} />
                    </div>
                  </div>

                  {/* Empty side for symmetry on desktop */}
                  <div className="hidden md:block w-5/12" />

                  {/* Content Card */}
                  <div className="w-full md:w-5/12 text-left">
                    <div
                      onClick={() => toggleExpand(item.id)}
                      className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all duration-300 cursor-pointer touch-manipulation ${
                        isExpanded
                          ? 'bg-gradient-to-b from-universe-darkBurgundy via-[#1d0a15] to-[#0c0409] border-universe-glowingRed/50 shadow-glow-wine'
                          : 'bg-universe-darkBurgundy/50 border-universe-wine/40 hover:border-universe-wine/80'
                      }`}
                    >
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
                        <span className="text-[10px] sm:text-[11px] font-mono text-universe-glowingRed uppercase tracking-wider">
                          {item.date}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] uppercase tracking-wider bg-universe-wine/30 border border-universe-wine/50 text-universe-blush">
                          {item.tag}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-lg sm:text-xl text-universe-cream font-medium">
                        {item.title}
                      </h3>
                      <p className="text-xs text-universe-dustyPink font-serif italic mb-2 sm:mb-3">
                        {item.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-universe-cream/80 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Expanded Section with Photo Placeholder & Details */}
                      {isExpanded && (
                        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-universe-wine/40 space-y-2.5 sm:space-y-3 animate-fadeIn">
                          {/* Photo Frame */}
                          <div className="h-36 sm:h-44 rounded-xl sm:rounded-2xl bg-universe-black/60 border border-universe-wine/50 overflow-hidden relative">
                            {hasActualImage ? (
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center p-3 text-center h-full">
                                <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6 text-universe-dustyPink mb-1" />
                                <span className="font-mono text-[11px] sm:text-xs text-universe-blush uppercase tracking-widest">
                                  {item.image}
                                </span>
                              </div>
                            )}
                            <div className="absolute bottom-2 right-2 bg-universe-black/70 px-2 py-0.5 rounded text-[9px] font-handwritten text-universe-blush">
                              memory unlocked ♡
                            </div>
                          </div>

                          <div className="flex justify-between items-center text-[10px] sm:text-[11px] text-universe-lavender/70 pt-0.5">
                            <span>Woven into destiny</span>
                            <span className="text-universe-blush flex items-center gap-1 font-handwritten text-xs">
                              <span>♡ Us Forever</span>
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Expand Toggle Chevron */}
                      <div className="mt-2 sm:mt-3 flex justify-end text-universe-lavender/50 text-xs">
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
