import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Heart, Sparkles } from 'lucide-react';
import { loveStoryData } from '../data/loveStory';
import { sound } from '../utils/audioEngine';

export default function Chapter03_SpecialDate() {
  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [heartsTriggered, setHeartsTriggered] = useState(0);

  useEffect(() => {
    const startDate = new Date(loveStoryData.dates.startDateObj);

    const updateCounter = () => {
      const now = new Date();
      const diffMs = Math.abs(now - startDate);

      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
      const seconds = Math.floor((diffMs / 1000) % 60);

      setTimeTogether({ days, hours, minutes, seconds });
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCelebrateDate = () => {
    sound.playHeartClick();
    setHeartsTriggered(prev => prev + 1);
  };

  const daysInNov = 30;
  const startDayOffset = 6; // Saturday offset

  return (
    <section id="chapter-3" className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 flex flex-col justify-center items-center relative z-20">
      <div className="max-w-3xl w-full text-center space-y-8 sm:space-y-10">
        
        {/* Header */}
        <div className="space-y-2 sm:space-y-3">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-universe-dustyPink font-medium px-3.5 py-1.5 rounded-full border border-universe-wine/40 bg-universe-darkBurgundy/40 inline-block">
            Chapter {loveStoryData.specialDate.chapterNumber} — {loveStoryData.specialDate.tagline}
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-universe-cream">
            {loveStoryData.specialDate.headline}
          </h2>
          <p className="font-serif text-lg sm:text-xl md:text-2xl text-universe-blush italic px-2">
            "{loveStoryData.specialDate.quote}"
          </p>
        </div>

        {/* Cinematic Calendar & Counter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
          
          {/* Calendar Display */}
          <div className="relative mx-auto w-full max-w-sm p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-[#1b0a13] to-[#0c0408] border border-universe-wine/60 shadow-2xl overflow-hidden">
            
            {/* Calendar Header with Red Thread Binding */}
            <div className="pb-3 sm:pb-4 border-b border-universe-wine/40 flex items-center justify-between">
              <div>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-universe-dustyPink">Calendar of Us</span>
                <h3 className="font-serif text-xl sm:text-2xl text-universe-cream font-medium">November 2025</h3>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-universe-crimson/20 border border-universe-glowingRed/50 flex items-center justify-center">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-universe-blush" />
              </div>
            </div>

            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-1 text-[10px] sm:text-[11px] font-sans text-universe-lavender/60 py-2 sm:py-3 text-center uppercase tracking-wider">
              <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 sm:gap-1.5 text-center text-xs">
              {Array.from({ length: startDayOffset }).map((_, i) => (
                <div key={`empty-${i}`} className="p-1 sm:p-2 opacity-10">·</div>
              ))}
              {Array.from({ length: daysInNov }).map((_, i) => {
                const dayNum = i + 1;
                const is22nd = dayNum === 22;
                return (
                  <div
                    key={dayNum}
                    onClick={is22nd ? handleCelebrateDate : undefined}
                    className={`relative p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all cursor-pointer touch-manipulation ${
                      is22nd
                        ? 'bg-gradient-to-tr from-universe-crimson to-universe-glowingRed text-white font-bold scale-105 sm:scale-110 shadow-glow-red border border-white/80 animate-pulse'
                        : 'text-universe-cream/70 hover:bg-universe-wine/30'
                    }`}
                  >
                    <span className="text-[11px] sm:text-xs">{dayNum}</span>
                    {is22nd && (
                      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full flex items-center justify-center">
                        <Heart className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-universe-crimson fill-universe-crimson" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Encircled by Red Thread Ribbon */}
            <div className="mt-4 sm:mt-5 pt-2.5 sm:pt-3 border-t border-universe-wine/30 flex items-center justify-between text-xs text-universe-blush">
              <span className="font-serif italic text-xs">Day 1 of Our Universe</span>
              <span className="font-mono text-[10px] sm:text-[11px] text-universe-dustyPink">22.11.2025</span>
            </div>
          </div>

          {/* Time Counter & Message */}
          <div className="space-y-4 sm:space-y-6 text-left">
            <div className="p-5 sm:p-6 rounded-3xl bg-universe-darkBurgundy/40 border border-universe-wine/40 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 text-universe-dustyPink text-[10px] sm:text-xs uppercase tracking-widest font-medium">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>Every Second Written In The Stars</span>
              </div>
              <p className="font-serif text-base sm:text-lg text-universe-cream">
                We've been sharing this timeline for:
              </p>

              {/* Counter Numbers */}
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2 text-center">
                <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-universe-wine/30 border border-universe-wine/50">
                  <div className="font-serif text-xl sm:text-3xl text-universe-blush font-semibold">{timeTogether.days}</div>
                  <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-universe-lavender/60">Days</div>
                </div>
                <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-universe-wine/30 border border-universe-wine/50">
                  <div className="font-serif text-xl sm:text-3xl text-universe-blush font-semibold">{timeTogether.hours}</div>
                  <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-universe-lavender/60">Hours</div>
                </div>
                <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-universe-wine/30 border border-universe-wine/50">
                  <div className="font-serif text-xl sm:text-3xl text-universe-blush font-semibold">{timeTogether.minutes}</div>
                  <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-universe-lavender/60">Mins</div>
                </div>
                <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-universe-wine/30 border border-universe-wine/50">
                  <div className="font-serif text-xl sm:text-3xl text-universe-glowingRed font-semibold">{timeTogether.seconds}</div>
                  <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-universe-lavender/60">Secs</div>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-universe-cream/80 leading-relaxed font-sans">
              {loveStoryData.specialDate.body}
            </p>

            <button
              onClick={handleCelebrateDate}
              className="w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-full border border-universe-wine/60 hover:border-universe-blush/60 bg-universe-wine/20 text-universe-blush text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 touch-manipulation"
            >
              <Heart className="w-3.5 h-3.5 fill-universe-blush" />
              <span>Celebrate Date ({heartsTriggered} hearts sent)</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
