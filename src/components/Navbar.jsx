import React, { useState } from 'react';
import { Heart, Volume2, VolumeX, Menu, X, Sparkles, KeyRound, Lock } from 'lucide-react';
import { loveStoryData } from '../data/loveStory';
import { sound } from '../utils/audioEngine';

export default function Navbar({
  isPlayingAudio,
  onToggleAudio,
  onOpenVault,
  unlockedEggsCount = 0,
  onEasterEggUnlock,
  onLockUniverse
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  const handleLogoClick = () => {
    sound.playHeartClick();
    const next = logoClicks + 1;
    setLogoClicks(next);
    if (next >= 7) {
      if (onEasterEggUnlock) onEasterEggUnlock('heart-logo');
      sound.playMatchSound();
    }
  };

  const chapters = [
    { num: '01', title: 'Before We Met', id: 'chapter-1' },
    { num: '02', title: 'Tinder Match', id: 'chapter-2' },
    { num: '03', title: '22 November 2025', id: 'chapter-3' },
    { num: '04', title: 'Our Little Universe', id: 'chapter-4' },
    { num: '05', title: 'Our Timeline', id: 'chapter-5' },
    { num: '06', title: '21 Reasons Why', id: 'chapter-6' },
    { num: '07', title: 'The Apology', id: 'chapter-7' },
    { num: '08', title: 'Open When...', id: 'chapter-8' },
    { num: '09', title: 'Our Birthdays', id: 'chapter-9' },
    { num: '10', title: 'The Scrapbook', id: 'chapter-10' },
    { num: '11', title: 'Our Music', id: 'chapter-11' },
    { num: '13', title: 'The Future', id: 'chapter-13' },
    { num: '14', title: 'The Proposal', id: 'chapter-14' },
  ];

  const scrollToChapter = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center px-3 sm:px-6 md:px-8 py-2.5 sm:py-3.5 bg-universe-black/80 backdrop-blur-lg border-b border-universe-wine/30 transition-all select-none">
        
        {/* Brand Logo & Multi-click Easter Egg */}
        <div
          onClick={handleLogoClick}
          className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group shrink min-w-0"
          title="Click 7 times for a surprise..."
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-universe-crimson/20 border border-universe-glowingRed/50 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-universe-glowingRed fill-universe-glowingRed animate-pulse" />
          </div>
          <div className="text-left truncate">
            <span className="font-serif tracking-wider sm:tracking-widest text-xs sm:text-sm uppercase text-universe-cream block font-medium truncate">
              A Universe Called Us
            </span>
            <span className="font-handwritten text-[11px] sm:text-xs text-universe-blush hidden md:block">
              Shivi & Rashi • 22.11.2025
            </span>
          </div>
        </div>

        {/* Right Navigation Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={onToggleAudio}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border transition-all text-xs touch-manipulation ${
              isPlayingAudio
                ? 'bg-universe-crimson/30 border-universe-glowingRed text-universe-cream shadow-glow-red'
                : 'bg-universe-darkBurgundy/50 border-universe-wine/40 text-universe-lavender hover:text-universe-blush'
            }`}
            title="Toggle Romantic Ambient Music"
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-universe-glowingRed animate-pulse shrink-0" />
                <span className="hidden sm:inline font-mono text-[11px]">Music ♡</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 opacity-60 shrink-0" />
                <span className="hidden sm:inline font-mono text-[11px]">Muted</span>
              </>
            )}
          </button>

          {/* Secret Vault Button */}
          <button
            onClick={onOpenVault}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-universe-wine/30 border border-universe-wine/60 text-universe-gold text-xs hover:border-universe-gold transition-all touch-manipulation"
            title="Secret Vault & Easter Eggs"
          >
            <KeyRound className="w-3.5 h-3.5 shrink-0" />
            <span className="font-mono text-[11px]">{unlockedEggsCount}/10</span>
          </button>

          {/* Lock Door Button */}
          {onLockUniverse && (
            <button
              onClick={onLockUniverse}
              className="p-1.5 sm:p-2 rounded-full border border-universe-wine/50 hover:bg-universe-wine/30 text-universe-lavender hover:text-universe-blush transition-all touch-manipulation"
              title="Lock our secret universe door"
              aria-label="Lock secret universe door"
            >
              <Lock className="w-3.5 h-3.5 shrink-0" />
            </button>
          )}

          {/* Chapters Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 sm:p-2 rounded-full border border-universe-wine/50 hover:bg-universe-wine/30 text-universe-lavender hover:text-white transition-all touch-manipulation"
            title="Open Chapters Menu"
            aria-label="Open chapters menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Chapters Overlay Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-universe-black/95 backdrop-blur-2xl flex flex-col justify-center items-center p-4 sm:p-6 animate-fadeIn select-none overflow-y-auto">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 sm:p-3 rounded-full text-universe-lavender hover:text-white bg-universe-wine/30 touch-manipulation"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="max-w-md w-full text-center space-y-4 max-h-[88vh] overflow-y-auto py-6 px-1">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.3em] text-universe-dustyPink">
              Table of Memories
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-universe-cream">
              Journey Through Our Stars
            </h2>

            <div className="pt-2 sm:pt-4 grid grid-cols-1 gap-2 text-left">
              {chapters.map((ch) => (
                <div
                  key={ch.num}
                  onClick={() => scrollToChapter(ch.id)}
                  className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-universe-darkBurgundy/40 border border-universe-wine/30 hover:border-universe-glowingRed hover:bg-universe-wine/30 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-between group touch-manipulation"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-universe-dustyPink">
                      {ch.num}
                    </span>
                    <span className="font-serif text-sm sm:text-base text-universe-cream group-hover:text-universe-blush transition-colors">
                      {ch.title}
                    </span>
                  </div>
                  <span className="text-universe-wine group-hover:text-universe-blush transition-colors text-sm">
                    ♡
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs uppercase tracking-widest text-universe-dustyPink hover:text-universe-blush py-2 px-4 touch-manipulation"
              >
                ↑ Return to Start
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
