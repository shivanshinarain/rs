import React, { useState } from 'react';
import { ShiviAvatar, RashiAvatar } from './Avatars';
import { loveStoryData } from '../data/loveStory';
import { sound } from '../utils/audioEngine';
import { Sparkles, Heart } from 'lucide-react';

export default function Chapter01_BeforeWeMet() {
  const [closeness, setCloseness] = useState(25); // 0 (far apart) to 100 (hands touching)
  const [handsConnected, setHandsConnected] = useState(false);
  const [shiviBlushing, setShiviBlushing] = useState(false);
  const [rashiBlushing, setRashiBlushing] = useState(false);

  const handleSliderChange = (e) => {
    const val = Number(e.target.value);
    setCloseness(val);
    if (val >= 88 && !handsConnected) {
      setHandsConnected(true);
      sound.playChime();
    } else if (val < 88 && handsConnected) {
      setHandsConnected(false);
    }
  };

  const handleAvatarClick = (who) => {
    sound.playHeartClick();
    if (who === 'shivi') setShiviBlushing(true);
    if (who === 'rashi') setRashiBlushing(true);
  };

  return (
    <section id="chapter-1" className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 flex flex-col justify-center items-center relative z-20">
      <div className="max-w-4xl w-full text-center space-y-8 sm:space-y-10">
        
        {/* Header Tag */}
        <div className="space-y-2 sm:space-y-3">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-universe-dustyPink font-medium px-3.5 py-1.5 rounded-full border border-universe-wine/40 bg-universe-darkBurgundy/40 inline-block">
            Chapter {loveStoryData.beforeWeMet.chapterNumber} — {loveStoryData.beforeWeMet.tagline}
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-universe-cream">
            {loveStoryData.beforeWeMet.headline}
          </h2>
          <p className="font-serif italic text-universe-blush text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            "{loveStoryData.beforeWeMet.narrative}"
          </p>
        </div>

        {/* Interactive Avatars Space */}
        <div className="relative py-8 sm:py-12 px-3 sm:px-4 rounded-3xl bg-universe-darkBurgundy/30 border border-universe-wine/30 backdrop-blur-sm overflow-hidden">
          
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-universe-wine/20 via-transparent to-transparent pointer-events-none" />

          {/* Avatars Container */}
          <div className="relative min-h-[220px] sm:min-h-[280px] md:min-h-[300px] flex items-center justify-center overflow-hidden">
            
            {/* Shivi (Moves from Left toward Center) */}
            <div
              style={{
                transform: `translateX(calc(-${(100 - closeness) * 0.9}px - 10px))`,
                transition: 'transform 0.15s ease-out'
              }}
              className="absolute z-10 w-24 sm:w-36 md:w-44 touch-manipulation"
            >
              <ShiviAvatar
                state={closeness >= 70 ? 'reaching' : 'idle'}
                onClick={() => handleAvatarClick('shivi')}
              />
              {shiviBlushing && (
                <div className="text-[10px] sm:text-xs text-universe-blush animate-bounce mt-1">
                  "I was waiting..."
                </div>
              )}
            </div>

            {/* Glowing Red Thread Connecting Hand to Hand */}
            {closeness >= 55 && (
              <div className="absolute z-20 pointer-events-none flex items-center justify-center">
                <svg width="160" height="40" className="overflow-visible w-28 sm:w-44">
                  <path
                    d={`M 20 20 Q 80 ${handsConnected ? 20 : 35} 140 20`}
                    stroke="#ff285e"
                    strokeWidth="3"
                    fill="none"
                    filter="drop-shadow(0 0 8px #ff285e)"
                    strokeDasharray={handsConnected ? 'none' : '4 2'}
                  />
                  {handsConnected && (
                    <circle cx="80" cy="20" r="4.5" fill="#ffffff" filter="drop-shadow(0 0 8px #ff285e)" />
                  )}
                </svg>
              </div>
            )}

            {/* Rashi (Moves from Right toward Center) */}
            <div
              style={{
                transform: `translateX(calc(${(100 - closeness) * 0.9}px + 10px))`,
                transition: 'transform 0.15s ease-out'
              }}
              className="absolute z-10 w-24 sm:w-36 md:w-44 touch-manipulation"
            >
              <RashiAvatar
                state={closeness >= 70 ? 'reaching' : 'idle'}
                onClick={() => handleAvatarClick('rashi')}
              />
              {rashiBlushing && (
                <div className="text-[10px] sm:text-xs text-universe-blush animate-bounce mt-1">
                  "Our stars aligned..."
                </div>
              )}
            </div>
          </div>

          {/* Connection status notification */}
          <div className="mt-6 sm:mt-8 px-2">
            {handsConnected ? (
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-universe-crimson/30 border border-universe-glowingRed/50 text-universe-cream text-xs sm:text-sm animate-pulse">
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-universe-glowingRed fill-universe-glowingRed shrink-0" />
                <span>Destiny connected. Hands finally touching.</span>
              </div>
            ) : (
              <p className="text-xs text-universe-lavender/70">
                Drag slider below to bring Shivi & Rashi together
              </p>
            )}
          </div>

          {/* Interactive slider control */}
          <div className="max-w-xs mx-auto mt-3 px-4">
            <input
              type="range"
              min="0"
              max="100"
              value={closeness}
              onChange={handleSliderChange}
              aria-label="Bring Shivi and Rashi together"
              className="w-full accent-universe-glowingRed cursor-pointer bg-universe-darkBurgundy/80 rounded-lg h-2 touch-manipulation"
            />
            <div className="flex justify-between text-[10px] sm:text-[11px] text-universe-lavender/50 mt-1">
              <span>Parallel Worlds</span>
              <span>Our Collision ♡</span>
            </div>
          </div>
        </div>

        {/* Character Story Snippets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-left">
          <div className="p-5 sm:p-6 rounded-2xl bg-universe-darkBurgundy/40 border border-universe-wine/30">
            <h3 className="font-serif text-lg sm:text-xl text-universe-blush flex items-center gap-2">
              <span>Shivi</span>
              <span className="text-xs text-universe-lavender font-sans opacity-70">— 8 September</span>
            </h3>
            <p className="text-xs sm:text-sm text-universe-cream/80 mt-2 leading-relaxed">
              {loveStoryData.beforeWeMet.shiviDescription}
            </p>
          </div>
          <div className="p-5 sm:p-6 rounded-2xl bg-universe-darkBurgundy/40 border border-universe-wine/30">
            <h3 className="font-serif text-lg sm:text-xl text-universe-blush flex items-center gap-2">
              <span>Rashi</span>
              <span className="text-xs text-universe-lavender font-sans opacity-70">— 12 November</span>
            </h3>
            <p className="text-xs sm:text-sm text-universe-cream/80 mt-2 leading-relaxed">
              {loveStoryData.beforeWeMet.rashiDescription}
            </p>
          </div>
        </div>

        {/* Long Distance & Iconic Banter Showcase */}
        <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-[#200a1b] via-[#140612] to-[#200a1b] border border-universe-wine/50 text-center space-y-3 shadow-lg">
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-universe-dustyPink font-mono">
            Our Long Distance Reality ♡
          </span>
          <p className="font-serif italic text-base sm:text-lg text-universe-cream max-w-xl mx-auto">
            "{loveStoryData.ldrStory.quote}"
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <div className="px-4 py-2 rounded-2xl bg-universe-darkBurgundy/60 border border-universe-wine/60 text-xs sm:text-sm font-sans flex items-center gap-2">
              <span className="text-universe-dustyPink font-semibold">Rashi:</span>
              <span className="text-white italic">"pagal kar degi ye ladki 😭"</span>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-universe-crimson/30 border border-universe-glowingRed/50 text-xs sm:text-sm font-sans flex items-center gap-2">
              <span className="text-universe-blush font-semibold">Shivi:</span>
              <span className="text-white italic">"ho jao na mere pyaar mein pagal ♡"</span>
            </div>
          </div>
          <p className="text-[11px] sm:text-xs text-universe-lavender/60 font-sans">
            Nothing and nobody can ever come in between us. Interval tak nhi — poori zindagi tak.
          </p>
        </div>

      </div>
    </section>
  );
}
