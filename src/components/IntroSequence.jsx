import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';
import { loveStoryData } from '../data/loveStory';
import { sound } from '../utils/audioEngine';

export default function IntroSequence({ onStart, isMuted, toggleMute }) {
  const [heartDrawn, setHeartDrawn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeartDrawn(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    sound.init();
    sound.playChime();
    sound.startAmbientMusic();
    onStart();
  };

  return (
    <section className="fixed inset-0 z-50 flex flex-col justify-center items-center text-center p-4 sm:p-6 bg-universe-black select-none overflow-y-auto">
      {/* Deep radial background glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-universe-darkBurgundy via-universe-black to-universe-black opacity-90" />
      <div className="absolute top-1/4 left-1/4 w-56 sm:w-80 h-56 sm:h-80 rounded-full bg-universe-wine/30 blur-[100px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-universe-crimson/20 blur-[120px] sm:blur-[160px] pointer-events-none" />

      {/* Sound toggle at top right */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
        <button
          onClick={toggleMute}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-universe-wine/50 bg-universe-darkBurgundy/60 backdrop-blur-md text-universe-lavender hover:text-universe-blush hover:border-universe-blush/40 transition-all text-[11px] sm:text-xs tracking-wider uppercase touch-manipulation"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-universe-blush animate-pulse" />}
          <span>{isMuted ? 'Muted' : 'Sound On'}</span>
        </button>
      </div>

      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center space-y-6 sm:space-y-8 animate-fadeIn my-auto py-6">
        {/* Animated Heart Trace (Glowing Red Thread Drawing a Heart) */}
        <div className="relative w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <filter id="heartGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d="M 50,30 
                 A 14,14 0 0,0 22,44 
                 C 22,65 50,85 50,85 
                 C 50,85 78,65 78,44 
                 A 14,14 0 0,0 50,30 Z"
              fill="none"
              stroke="#ff285e"
              strokeWidth="2.5"
              strokeDasharray="200"
              strokeDashoffset={heartDrawn ? '0' : '200'}
              strokeLinecap="round"
              filter="url(#heartGlow)"
              className="transition-all duration-1000 ease-in-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Heart className={`w-6 h-6 sm:w-8 sm:h-8 text-universe-blush transition-opacity duration-1000 ${heartDrawn ? 'opacity-90 animate-heartbeat' : 'opacity-0'}`} />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2 sm:space-y-3 px-2">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-universe-dustyPink font-medium flex items-center justify-center gap-1.5 sm:gap-2">
            <Sparkles className="w-3 h-3 text-universe-gold" />
            <span>Interactive Love Story</span>
            <Sparkles className="w-3 h-3 text-universe-gold" />
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-universe-cream tracking-tight text-glow-crimson font-normal leading-tight">
            {loveStoryData.intro.title}
          </h1>
          <p className="font-serif text-base sm:text-lg md:text-xl text-universe-blush italic">
            {loveStoryData.intro.dedication}
          </p>
          <p className="font-sans text-xs sm:text-sm text-universe-lavender/80 max-w-md mx-auto leading-relaxed pt-1">
            {loveStoryData.intro.subtitle}
          </p>
        </div>

        {/* Enter Button */}
        <div className="pt-2 sm:pt-4 flex flex-col items-center gap-3 sm:gap-4">
          <button
            onClick={handleEnter}
            className="group relative px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-universe-wine via-universe-crimson to-universe-glowingRed text-universe-cream font-sans tracking-widest uppercase text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-glow-red hover:shadow-[0_0_45px_rgba(255,40,94,0.7)] flex items-center gap-2.5 sm:gap-3 touch-manipulation"
          >
            <span>{loveStoryData.intro.buttonText}</span>
            <span className="group-hover:translate-x-1 transition-transform">♡</span>
          </button>
          <span className="text-[10px] sm:text-[11px] text-universe-lavender/60 tracking-wider px-2">
            {loveStoryData.intro.audioHint}
          </span>
        </div>
      </div>
    </section>
  );
}
