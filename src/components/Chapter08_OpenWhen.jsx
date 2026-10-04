import React, { useState } from 'react';
import { Mail, Heart, Sparkles, X, Send } from 'lucide-react';
import { loveStoryData } from '../data/loveStory';
import { sound } from '../utils/audioEngine';

export default function Chapter08_OpenWhen() {
  const [activeEnvelope, setActiveEnvelope] = useState(null);
  const [openedSet, setOpenedSet] = useState(new Set());

  const handleOpen = (env) => {
    sound.playEnvelopeOpen();
    setActiveEnvelope(env);
    setOpenedSet(prev => new Set(prev).add(env.id));
  };

  return (
    <section id="chapter-8" className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 flex flex-col justify-center items-center relative z-20">
      <div className="max-w-5xl w-full text-center space-y-8 sm:space-y-10">
        
        {/* Header */}
        <div className="space-y-2 sm:space-y-3">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-universe-dustyPink font-medium px-3.5 py-1.5 rounded-full border border-universe-wine/40 bg-universe-darkBurgundy/40 inline-block">
            Chapter 08 — Digital Emergency Letters
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-universe-cream">
            Open When...
          </h2>
          <p className="font-sans text-xs sm:text-sm text-universe-lavender/80 max-w-lg mx-auto px-2">
            A private collection of envelopes for any mood, midnight tear, or moment you need a reminder that you are loved unconditionally.
          </p>
        </div>

        {/* Envelopes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 pt-2 sm:pt-4">
          {loveStoryData.openWhenEnvelopes.map((env) => {
            const hasOpened = openedSet.has(env.id);

            return (
              <div
                key={env.id}
                onClick={() => handleOpen(env)}
                className={`group relative p-4 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all duration-300 cursor-pointer text-left flex flex-col justify-between space-y-3 sm:space-y-4 hover:scale-[1.02] sm:hover:scale-105 active:scale-[0.98] touch-manipulation ${
                  hasOpened
                    ? 'bg-universe-darkBurgundy/60 border-universe-wine/70 shadow-lg'
                    : 'bg-gradient-to-b from-[#200c19] to-[#0d040a] border-universe-wine/50 hover:border-universe-glowingRed hover:shadow-glow-wine'
                }`}
              >
                {/* Envelope Stamp / Icon */}
                <div className="flex justify-between items-center">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-universe-wine/30 border border-universe-blush/30 flex items-center justify-center text-universe-blush group-hover:scale-110 transition-transform">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="font-mono text-[9px] sm:text-[10px] text-universe-dustyPink uppercase tracking-wider">
                    {hasOpened ? 'Read ♡' : 'Sealed'}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-serif text-sm sm:text-lg text-universe-cream font-medium group-hover:text-universe-blush transition-colors">
                    {env.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-universe-lavender/70 font-sans mt-1 line-clamp-2">
                    {env.preview}
                  </p>
                </div>

                {/* Action Prompt */}
                <div className="pt-2 border-t border-universe-wine/30 flex items-center justify-between text-xs text-universe-blush">
                  <span className="text-[11px] sm:text-xs">Open Envelope</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Letter Modal */}
        {activeEnvelope && (
          <div className="fixed inset-0 z-50 bg-universe-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
            <div className="max-w-lg w-full bg-gradient-to-b from-[#240e1c] via-[#160611] to-[#0c0308] border border-universe-wine/80 rounded-3xl p-5 sm:p-8 text-left space-y-4 sm:space-y-6 shadow-2xl relative max-h-[85vh] overflow-y-auto">
              <button
                onClick={() => setActiveEnvelope(null)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-universe-lavender hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-universe-crimson/20 border border-universe-glowingRed/50 flex items-center justify-center text-universe-blush shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-universe-dustyPink font-mono">
                    Personal Digital Letter
                  </span>
                  <h3 className="font-serif text-lg sm:text-2xl text-universe-cream">
                    {activeEnvelope.title}
                  </h3>
                </div>
              </div>

              {/* Letter content */}
              <div className="p-4 sm:p-6 rounded-2xl bg-universe-black/50 border border-universe-wine/40">
                <p className="font-serif italic text-sm sm:text-lg text-universe-cream/90 leading-relaxed">
                  "{activeEnvelope.message}"
                </p>
                <p className="font-handwritten text-lg sm:text-xl text-universe-blush text-right mt-3 sm:mt-4">
                  Always here for you, Shivi ♡
                </p>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    sound.playHeartClick();
                    setActiveEnvelope(null);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-universe-crimson to-universe-glowingRed text-xs uppercase tracking-widest text-white shadow-glow-red hover:scale-105 transition-all text-center touch-manipulation"
                >
                  I Feel Safe Now ♡
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
