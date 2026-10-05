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
  onLockUniverse,
  onNavigateToChapter
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
    { num: '01', title: 'Before We Met', id: 'chapter-1', world: 'WORLD_01_BEFORE_US' },
    { num: '02', title: 'Tinder Match', id: 'chapter-2', world: 'WORLD_01_BEFORE_US' },
    { num: '03', title: '22 November 2025', id: 'chapter-3', world: 'WORLD_02_LITTLE_UNIVERSE' },
    { num: '04', title: 'Our Little Universe', id: 'chapter-4', world: 'WORLD_02_LITTLE_UNIVERSE' },
    { num: '05', title: 'Our Timeline', id: 'chapter-5', world: 'WORLD_02_LITTLE_UNIVERSE' },
    { num: '06', title: '21 Reasons Why', id: 'chapter-6', world: 'WORLD_02_LITTLE_UNIVERSE' },
    { num: '07', title: 'The Apology & Coma Letter', id: 'chapter-7', world: 'WORLD_04_SANCTUARY' },
    { num: '08', title: 'Open When...', id: 'chapter-8', world: 'WORLD_04_SANCTUARY' },
    { num: '09', title: 'Celestial Birthdays', id: 'chapter-9', world: 'WORLD_05_BIRTHDAY' },
    { num: '10', title: 'The Scrapbook', id: 'chapter-10', world: 'WORLD_04_SANCTUARY' },
    { num: '11', title: 'Taylor Swift: Paper Rings 🎵', id: 'chapter-11', world: 'WORLD_05_BIRTHDAY', isFeatured: true },
    { num: '12', title: 'Voices From Our Hearts 🎙️', id: 'chapter-12', world: 'WORLD_05_BIRTHDAY', isFeatured: true },
    { num: '13', title: 'The Future (4 Doors)', id: 'chapter-13', world: 'WORLD_05_BIRTHDAY' },
    { num: '14', title: 'The Proposal & Sacred Vow 💍', id: 'chapter-14', world: 'WORLD_05_BIRTHDAY', isFeatured: true },
  ];

  const scrollToChapter = (id, world) => {
    setMenuOpen(false);
    if (onNavigateToChapter) {
      onNavigateToChapter(id, world);
      return;
    }
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
          
          {/* Taylor Swift Paper Rings Song Toggle */}
          <button
            onClick={onToggleAudio}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full border transition-all text-xs touch-manipulation cursor-pointer ${
              isPlayingAudio
                ? 'bg-gradient-to-r from-universe-crimson/40 to-rose-600/30 border-universe-glowingRed text-universe-cream shadow-glow-red'
                : 'bg-universe-darkBurgundy/50 border-universe-wine/40 text-universe-lavender hover:text-universe-blush'
            }`}
            title="Toggle Taylor Swift — Paper Rings (Our Love Anthem)"
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-universe-glowingRed animate-pulse shrink-0" />
                <span className="font-mono text-[11px]">Paper Rings 🎵</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 opacity-60 shrink-0" />
                <span className="font-mono text-[11px]">Paper Rings ▷</span>
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

            {/* Continuous Story Mode Quick Switch */}
            <button
              onClick={() => scrollToChapter('chapter-1', 'ALL_CHAPTERS')}
              className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-900/60 via-universe-darkBurgundy/80 to-purple-900/60 border border-rose-500/50 hover:border-rose-400 text-rose-200 hover:text-white text-xs font-mono flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] transition-all cursor-pointer touch-manipulation"
            >
              <span>📖</span>
              <span className="font-semibold">View All 14 Chapters in Sequence (Story Mode)</span>
              <span>→</span>
            </button>

            <div className="pt-2 sm:pt-3 grid grid-cols-1 gap-2 text-left">
              {chapters.map((ch) => (
                <div
                  key={ch.num}
                  onClick={() => scrollToChapter(ch.id, ch.world)}
                  className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border transition-all cursor-pointer flex items-center justify-between group touch-manipulation active:scale-[0.98] ${
                    ch.isFeatured
                      ? 'bg-gradient-to-r from-rose-950/60 to-purple-950/60 border-rose-500/60 hover:border-rose-400 shadow-glow-red/20'
                      : 'bg-universe-darkBurgundy/40 border-universe-wine/30 hover:border-universe-glowingRed hover:bg-universe-wine/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-xs ${ch.isFeatured ? 'text-universe-gold font-bold' : 'text-universe-dustyPink'}`}>
                      {ch.num}
                    </span>
                    <span className={`font-serif text-sm sm:text-base group-hover:text-universe-blush transition-colors ${ch.isFeatured ? 'text-white font-medium' : 'text-universe-cream'}`}>
                      {ch.title}
                    </span>
                  </div>
                  <span className={`${ch.isFeatured ? 'text-rose-400' : 'text-universe-wine'} group-hover:text-universe-blush transition-colors text-sm`}>
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
