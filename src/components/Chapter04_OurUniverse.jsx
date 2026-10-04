import React, { useState } from 'react';
import { Moon, Home, Coffee, Cloud, Sparkles, X, Heart } from 'lucide-react';
import { loveStoryData } from '../data/loveStory';
import { sound } from '../utils/audioEngine';
import { HeartDoodle, StarDoodle, CuteAnnotation } from './Doodles';

export default function Chapter04_OurUniverse({ onEasterEggUnlock }) {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [moonClicks, setMoonClicks] = useState(0);
  const [secretMoonUnlocked, setSecretMoonUnlocked] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleTouchMove = (e) => {
    if (!e.touches || !e.touches[0]) return;
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (touch.clientX - rect.left) / rect.width - 0.5;
    const y = (touch.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleHotspotClick = (spot) => {
    sound.playChime();
    setActiveHotspot(spot);
  };

  const handleMoonClick = (e) => {
    e.stopPropagation();
    sound.playHeartClick();
    const next = moonClicks + 1;
    setMoonClicks(next);

    if (next >= 3 && !secretMoonUnlocked) {
      setSecretMoonUnlocked(true);
      if (onEasterEggUnlock) onEasterEggUnlock('moon-clicks');
      sound.playMatchSound();
    }
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'moon': return <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-universe-gold" />;
      case 'home': return <Home className="w-4 h-4 sm:w-5 sm:h-5 text-universe-blush" />;
      case 'coffee': return <Coffee className="w-4 h-4 sm:w-5 sm:h-5 text-universe-dustyPink" />;
      case 'cloud': return <Cloud className="w-4 h-4 sm:w-5 sm:h-5 text-universe-lavender" />;
      default: return <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-universe-glowingRed" />;
    }
  };

  return (
    <section id="chapter-4" className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 flex flex-col justify-center items-center relative z-20">
      <div className="max-w-4xl w-full text-center space-y-6 sm:space-y-8">
        
        {/* Header */}
        <div className="space-y-2 sm:space-y-3 relative">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-universe-dustyPink font-medium px-3.5 py-1.5 rounded-full border border-universe-wine/40 bg-universe-darkBurgundy/40 inline-block">
            Chapter {loveStoryData.ourUniverse.chapterNumber} — {loveStoryData.ourUniverse.tagline}
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-universe-cream">
            {loveStoryData.ourUniverse.headline}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-universe-lavender/80 max-w-lg mx-auto px-2">
            {loveStoryData.ourUniverse.description}
          </p>

          <div className="hidden sm:block absolute top-0 right-4">
            <StarDoodle className="w-6 h-6 text-universe-gold/80" />
          </div>
        </div>

        {/* Parallax Floating Landscape Canvas */}
        <div
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full h-[360px] sm:h-[440px] md:h-[480px] rounded-3xl bg-gradient-to-b from-[#190914] via-[#0f040b] to-[#070306] border border-universe-wine/50 overflow-hidden shadow-2xl p-4 sm:p-6 select-none cursor-crosshair group touch-pan-y"
        >
          {/* Parallax Star Glow Background */}
          <div
            style={{
              transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
              transition: 'transform 0.15s ease-out'
            }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-10 left-12 w-36 sm:w-48 h-36 sm:h-48 bg-universe-wine/30 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-12 w-48 sm:w-64 h-48 sm:h-64 bg-universe-crimson/20 rounded-full blur-3xl" />
          </div>

          {/* Interactive Crescent Moon (Top Right) */}
          <div
            onClick={handleMoonClick}
            style={{
              transform: `translate(${mousePos.x * -25}px, ${mousePos.y * -25}px)`,
              transition: 'transform 0.15s ease-out'
            }}
            className="absolute top-6 right-6 sm:top-8 sm:right-16 cursor-pointer group/moon touch-manipulation z-20"
            title="Click the moon..."
          >
            <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-universe-gold via-amber-200 to-white shadow-glow-gold flex items-center justify-center animate-pulse-slow">
              {/* Crescent inner shadow cut */}
              <div className="absolute -top-1 -right-1 w-13 h-13 sm:w-20 sm:h-20 rounded-full bg-[#190914] opacity-90 transition-transform group-hover/moon:scale-95" />
              <Moon className="w-6 h-6 sm:w-8 sm:h-8 text-universe-gold z-10 opacity-80 group-hover/moon:opacity-100 transition-opacity" />
            </div>
            <div className="text-[9px] sm:text-[10px] text-universe-gold/80 tracking-widest uppercase mt-1 font-mono">
              The Moon {moonClicks > 0 && `(${moonClicks}/3)`}
            </div>
          </div>

          {/* Floating Dreamer Clouds */}
          <div
            style={{
              transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)`,
              transition: 'transform 0.2s ease-out'
            }}
            className="absolute top-16 left-6 sm:left-20 pointer-events-none opacity-40 animate-float"
          >
            <div className="w-28 sm:w-36 h-10 sm:h-14 bg-universe-lavender/30 rounded-full blur-md" />
          </div>

          {/* Floating Polaroid of Shivi & Rashi in Landscape (Center-Right) */}
          <div
            onClick={() => handleHotspotClick({
              id: 'bedroom',
              name: 'Cozy Blanket Sanctuary',
              icon: 'home',
              message: loveStoryData.ourUniverse.hotspots[1].message
            })}
            style={{
              transform: `translate(${mousePos.x * -18}px, ${mousePos.y * -18}px) rotate(4deg)`,
              transition: 'transform 0.2s ease-out'
            }}
            className="absolute top-28 right-24 md:right-44 z-10 cursor-pointer hidden sm:block hover:rotate-0 hover:scale-110 transition-all duration-300"
            title="Our cozy blanket memory"
          >
            <div className="w-24 h-28 bg-[#fcf8f5] p-2 rounded-lg shadow-xl text-center">
              <img
                src="/assets/shivi_rashi_cartoon.jpg"
                alt="Us"
                className="w-full h-18 object-cover rounded"
              />
              <span className="font-handwritten text-[10px] text-universe-wine block mt-1">us cozy ♡</span>
            </div>
          </div>

          {/* Floating Bedroom Silhouette (Bottom Left) */}
          <div
            style={{
              transform: `translate(${mousePos.x * -12}px, ${mousePos.y * -12}px)`,
              transition: 'transform 0.15s ease-out'
            }}
            className="absolute bottom-5 left-4 sm:left-12 text-left z-10"
          >
            <div
              onClick={() => handleHotspotClick({
                id: 'bedroom',
                name: 'Cozy Blanket Sanctuary',
                icon: 'home',
                message: loveStoryData.ourUniverse.hotspots[1].message
              })}
              className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-universe-darkBurgundy/90 border border-universe-wine/60 backdrop-blur-md max-w-[210px] sm:max-w-xs shadow-xl flex items-center gap-2 sm:gap-3 cursor-pointer hover:border-universe-blush transition-colors"
            >
              <img
                src="/assets/shivi_rashi_doodle_couch.jpg"
                alt="Cozy Doodle"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover shrink-0 border border-universe-blush/40"
              />
              <div className="truncate">
                <h4 className="font-serif text-xs sm:text-sm text-universe-cream truncate">Cozy Sanctuary</h4>
                <p className="text-[10px] sm:text-[11px] text-universe-lavender/70 truncate">Blankets & remote battles ♡</p>
              </div>
            </div>
          </div>

          {/* Hotspot Markers Floating in Space */}
          {loveStoryData.ourUniverse.hotspots.map((spot) => (
            <div
              key={spot.id}
              onClick={() => handleHotspotClick(spot)}
              style={{
                left: `${spot.x}%`,
                top: `${spot.y}%`,
                transform: `translate(-50%, -50%) translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
                transition: 'transform 0.2s ease-out'
              }}
              className="absolute z-20 cursor-pointer group/spot touch-manipulation"
            >
              <div className="relative">
                {/* Ping ring */}
                <div className="absolute -inset-1.5 sm:-inset-2 rounded-full bg-universe-glowingRed/40 animate-ping opacity-75" />
                {/* Core button */}
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-universe-darkBurgundy/90 border border-universe-blush/60 flex items-center justify-center text-universe-cream shadow-glow-blush group-hover/spot:scale-125 transition-transform duration-300">
                  {getIcon(spot.icon)}
                </div>
              </div>
              <div className="hidden sm:block opacity-0 group-hover/spot:opacity-100 transition-opacity absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 rounded-full bg-universe-black/90 border border-universe-wine/60 text-[10px] whitespace-nowrap text-universe-blush pointer-events-none">
                {spot.name}
              </div>
            </div>
          ))}

          {/* Prompt at bottom */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] sm:text-[11px] tracking-wider uppercase text-universe-lavender/50 pointer-events-none whitespace-nowrap">
            Tap any glowing celestial object
          </div>
        </div>

        {/* Hotspot Detail Modal */}
        {activeHotspot && (
          <div className="fixed inset-0 z-50 bg-universe-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
            <div className="max-w-md w-full bg-universe-darkBurgundy border border-universe-wine/70 rounded-3xl p-5 sm:p-6 text-left space-y-4 shadow-2xl relative max-h-[88vh] overflow-y-auto">
              <button
                onClick={() => setActiveHotspot(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-universe-lavender hover:text-universe-cream hover:bg-universe-wine/40"
              >
                <X className="w-5 h-5" />
              </button>

              {/* If Bedroom Hotspot, show doodle and cartoon together */}
              {activeHotspot.id === 'bedroom' && (
                <div className="grid grid-cols-2 gap-2 pb-1">
                  <div className="rounded-xl overflow-hidden border border-universe-wine/60 shadow">
                    <img
                      src="/assets/shivi_rashi_doodle_couch.jpg"
                      alt="Couch Doodle"
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-1 text-center bg-universe-black/60 text-[9px] font-handwritten text-universe-blush">
                      cozy couch cuddles doodle ♡
                    </div>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-universe-wine/60 shadow">
                    <img
                      src="/assets/shivi_rashi_cartoon.jpg"
                      alt="Cartoon Us"
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-1 text-center bg-universe-black/60 text-[9px] font-handwritten text-universe-blush">
                      in our cartoon world ♡
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-universe-wine/30 border border-universe-blush/40 flex items-center justify-center shrink-0">
                  {getIcon(activeHotspot.icon)}
                </div>
                <div>
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-universe-dustyPink">Our Sacred Place</span>
                  <h3 className="font-serif text-lg sm:text-xl text-universe-cream">{activeHotspot.name}</h3>
                </div>
              </div>

              <p className="font-serif italic text-sm sm:text-base text-universe-blush leading-relaxed">
                "{activeHotspot.message}"
              </p>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="px-5 py-2 rounded-full bg-universe-crimson text-xs uppercase tracking-wider text-universe-cream hover:bg-universe-wine transition-colors"
                >
                  Close with love ♡
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Secret Moon Easter Egg Modal */}
        {secretMoonUnlocked && (
          <div className="fixed inset-0 z-50 bg-universe-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
            <div className="max-w-md w-full bg-gradient-to-b from-[#240e1b] to-[#0c0409] border border-universe-gold/60 rounded-3xl p-5 sm:p-6 text-center space-y-4 shadow-glow-gold relative">
              <button
                onClick={() => setSecretMoonUnlocked(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-universe-lavender hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-full bg-universe-gold/20 border border-universe-gold flex items-center justify-center animate-bounce">
                <Moon className="w-6 h-6 sm:w-7 sm:h-7 text-universe-gold" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-universe-gold font-mono">Easter Egg #1 Unlocked</span>
                <h3 className="font-serif text-xl sm:text-2xl text-universe-cream">The Moon's Midnight Whisper</h3>
              </div>

              <p className="font-serif italic text-sm sm:text-base text-universe-blush leading-relaxed">
                "I looked up at the moon one late night and thought of you before I even knew your middle name. Some souls recognize each other through the light of other worlds."
              </p>
              <p className="text-xs text-universe-dustyPink font-mono">— Shivi</p>

              <button
                onClick={() => setSecretMoonUnlocked(false)}
                className="px-6 py-2.5 rounded-full bg-universe-gold text-universe-black font-semibold text-xs tracking-wider uppercase hover:bg-amber-300 transition-colors shadow-glow-gold"
              >
                Keep In My Heart ♡
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
