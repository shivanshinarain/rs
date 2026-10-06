import React, { useState, useRef, useEffect } from 'react';
import {
  Heart,
  Volume2,
  VolumeX,
  Menu,
  X,
  Sparkles,
  KeyRound,
  Lock,
  Mic,
  Moon,
  Play,
  Pause,
  Disc3,
  Music,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';
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
  const [voiceNotesModalOpen, setVoiceNotesModalOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [playingVoiceNoteId, setPlayingVoiceNoteId] = useState(null);
  const [isPlayingHook, setIsPlayingHook] = useState(false);
  const voiceAudioRef = useRef(null);

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
    { num: '14', title: 'The Proposal & Sacred Vow 💍 (Love Story 🎵)', id: 'chapter-14', world: 'WORLD_05_BIRTHDAY', isFeatured: true },
  ];

  const allVoiceNotes = [
    {
      id: 'shivi',
      title: "Shivi's Love Note & Kiss Demand",
      speaker: 'Shivi',
      duration: '0:45',
      audioSrc: '/assets/shivi_voice_note.webm',
      avatar: '/assets/shivi_rashi_cartoon.jpg',
      tag: "Shivi's Voice 🎙️",
      subtitle: '"Kiss toh mil sakti hai na? Bas teen-char... Meri jaan, motu ♡"',
      chapterId: 'chapter-12',
      world: 'WORLD_05_BIRTHDAY'
    },
    {
      id: 'rashi-sleepy',
      title: "Sleepy Rashi: 'I Love You, Shivi...'",
      speaker: 'Rashi',
      duration: '1:11',
      audioSrc: '/assets/rashi_sleepy_voice_note.webm',
      avatar: '/assets/shivi_rashi_cartoon_sleep_call.jpg',
      tag: "Currently Sleeping 😴🌙",
      subtitle: '"Mujhe bohot gandi wali neend aa rahi hai... I love you, Shivi... ♡"',
      chapterId: 'chapter-12',
      world: 'WORLD_05_BIRTHDAY'
    }
  ];

  const scrollToChapter = (id, world) => {
    setMenuOpen(false);
    setVoiceNotesModalOpen(false);
    if (onNavigateToChapter) {
      onNavigateToChapter(id, world);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleVoiceNote = (note) => {
    sound.playHeartClick();
    if (playingVoiceNoteId === note.id) {
      if (voiceAudioRef.current) {
        voiceAudioRef.current.pause();
      }
      setPlayingVoiceNoteId(null);
      sound.resumePaperRingsTrack();
    } else {
      sound.pausePaperRingsTrack();
      if (voiceAudioRef.current) {
        voiceAudioRef.current.pause();
      }
      const audio = new Audio(note.audioSrc);
      voiceAudioRef.current = audio;
      setPlayingVoiceNoteId(note.id);
      audio.play().catch(() => {});
      audio.onended = () => {
        setPlayingVoiceNoteId(null);
        sound.resumePaperRingsTrack();
      };
    }
  };

  const handlePlayChorusHook = () => {
    sound.playHeartClick();
    setIsPlayingHook(true);
    sound.playPaperRingsHook();
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.2 },
      colors: ['#ffd166', '#ff285e', '#ffffff']
    });
    setTimeout(() => setIsPlayingHook(false), 4200);
  };

  const handleSendKiss = () => {
    sound.playHeartClick();
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.3 },
      colors: ['#ff285e', '#f5b8c6', '#ffffff']
    });
  };

  useEffect(() => {
    return () => {
      if (voiceAudioRef.current) {
        voiceAudioRef.current.pause();
      }
    };
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center px-2.5 sm:px-6 md:px-8 py-2 sm:py-3 bg-universe-black/85 backdrop-blur-xl border-b border-universe-wine/30 transition-all select-none">
        
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

        {/* Right Navigation Controls: Dedicated Columns for Voice Notes, Taylor Swift, Vault, and Menu */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          
          {/* SEPARATE COLUMN 1: ALL VOICE NOTES BUTTON */}
          <button
            onClick={() => {
              sound.playHeartClick();
              setVoiceNotesModalOpen(true);
            }}
            className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-full border transition-all text-xs touch-manipulation cursor-pointer ${
              playingVoiceNoteId
                ? 'bg-gradient-to-r from-purple-950/80 to-universe-crimson/80 border-rose-400 text-white shadow-glow-red animate-pulse'
                : 'bg-purple-950/40 border-purple-500/40 hover:border-purple-400 text-purple-200 hover:text-white'
            }`}
            title="Listen to all real voice notes from Shivi & Rashi"
          >
            <Mic className="w-3.5 h-3.5 text-rose-300 shrink-0" />
            <span className="font-mono text-[11px] hidden sm:inline">Voice Notes</span>
            <span className="font-mono text-[11px] inline sm:hidden">Notes</span>
            <span className="w-4 h-4 rounded-full bg-universe-crimson text-white text-[9px] font-bold flex items-center justify-center shrink-0">
              2
            </span>
          </button>

          {/* SEPARATE COLUMN 2: TAYLOR SWIFT SONG BUTTON */}
          <button
            onClick={onToggleAudio}
            className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-full border transition-all text-xs touch-manipulation cursor-pointer ${
              isPlayingAudio
                ? 'bg-gradient-to-r from-universe-crimson/50 to-rose-600/40 border-universe-glowingRed text-universe-cream shadow-glow-red'
                : 'bg-universe-darkBurgundy/50 border-universe-wine/50 text-universe-lavender hover:text-universe-blush'
            }`}
            title="Toggle Taylor Swift — Paper Rings (Our Love Anthem)"
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-universe-glowingRed animate-pulse shrink-0" />
                <span className="font-mono text-[11px] hidden sm:inline">Paper Rings 🎵</span>
                <span className="font-mono text-[11px] inline sm:hidden">Song 🎵</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 opacity-70 shrink-0" />
                <span className="font-mono text-[11px] hidden sm:inline">Paper Rings ▷</span>
                <span className="font-mono text-[11px] inline sm:hidden">Song ▷</span>
              </>
            )}
          </button>

          {/* Secret Vault Button */}
          <button
            onClick={onOpenVault}
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-full bg-universe-wine/30 border border-universe-wine/60 text-universe-gold text-xs hover:border-universe-gold transition-all touch-manipulation cursor-pointer"
            title="Secret Vault & Easter Eggs"
          >
            <KeyRound className="w-3.5 h-3.5 shrink-0" />
            <span className="font-mono text-[11px]">{unlockedEggsCount}/10</span>
          </button>

          {/* Lock Door Button */}
          {onLockUniverse && (
            <button
              onClick={onLockUniverse}
              className="p-1.5 sm:p-2 rounded-full border border-universe-wine/50 hover:bg-universe-wine/30 text-universe-lavender hover:text-universe-blush transition-all touch-manipulation cursor-pointer"
              title="Lock our secret universe door"
              aria-label="Lock secret universe door"
            >
              <Lock className="w-3.5 h-3.5 shrink-0" />
            </button>
          )}

          {/* Chapters & Navigation Full Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 sm:p-2 rounded-full border border-universe-wine/50 hover:bg-universe-wine/30 text-universe-lavender hover:text-white transition-all touch-manipulation cursor-pointer"
            title="Open Chapters & Audio Menu"
            aria-label="Open chapters and audio menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* DEDICATED QUICK VOICE NOTES POPUP MODAL */}
      {voiceNotesModalOpen && (
        <div className="fixed inset-0 z-50 bg-universe-black/90 backdrop-blur-xl flex flex-col justify-center items-center p-4 sm:p-6 animate-fadeIn select-none">
          <div className="max-w-lg w-full rounded-3xl bg-gradient-to-b from-[#220a1b] via-[#140510] to-[#070206] border-2 border-rose-500/50 shadow-2xl p-5 sm:p-7 relative max-h-[90vh] overflow-y-auto space-y-5 text-left">
            
            <button
              onClick={() => {
                if (voiceAudioRef.current) {
                  voiceAudioRef.current.pause();
                }
                setPlayingVoiceNoteId(null);
                sound.resumePaperRingsTrack();
                setVoiceNotesModalOpen(false);
              }}
              className="absolute top-5 right-5 p-2 rounded-full text-universe-lavender hover:text-white bg-universe-wine/30 cursor-pointer"
              aria-label="Close voice notes modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-universe-dustyPink px-3 py-1 rounded-full border border-universe-wine/40 bg-universe-darkBurgundy/40 inline-block">
                All Authentic Audio Recordings
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-universe-cream flex items-center gap-2">
                <span>Our Voice Notes</span>
                <span className="text-lg">🎙️♡</span>
              </h3>
              <p className="font-sans text-xs text-universe-lavender/80">
                Direct audio clips from midnight calls, sweet kiss demands, and sleepy whispers.
              </p>
            </div>

            {/* Voice Notes Cards List */}
            <div className="space-y-3.5">
              {allVoiceNotes.map((note) => {
                const isPlaying = playingVoiceNoteId === note.id;
                return (
                  <div
                    key={note.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isPlaying
                        ? 'bg-gradient-to-r from-rose-950/70 to-purple-950/70 border-rose-400 shadow-glow-red'
                        : 'bg-universe-black/60 border-universe-wine/50 hover:border-rose-400/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={note.avatar}
                          alt={note.speaker}
                          className="w-12 h-12 rounded-xl object-cover border border-rose-400/40 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-serif text-sm sm:text-base text-universe-cream font-medium truncate">
                              {note.title}
                            </h4>
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 shrink-0">
                              {note.duration}
                            </span>
                          </div>
                          <p className="font-serif italic text-xs text-universe-dustyPink truncate mt-0.5">
                            {note.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Play / Pause Toggle Button */}
                      <button
                        onClick={() => handleToggleVoiceNote(note)}
                        className="w-10 h-10 rounded-full bg-gradient-to-r from-universe-crimson to-universe-glowingRed text-white flex items-center justify-center shadow-glow-red hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
                        title={isPlaying ? 'Pause Voice Note' : 'Play Voice Note'}
                      >
                        {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                      </button>
                    </div>

                    {/* Animated sound bars when playing */}
                    {isPlaying && (
                      <div className="mt-3 pt-2 border-t border-rose-500/30 flex items-center justify-between text-xs font-mono text-rose-200">
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                          Playing original voice recording...
                        </span>
                        <div className="flex items-center gap-1 h-4">
                          <span className="w-1 h-3 bg-rose-400 rounded-full animate-bounce" />
                          <span className="w-1 h-4 bg-universe-blush rounded-full animate-bounce [animation-delay:0.15s]" />
                          <span className="w-1 h-2 bg-amber-300 rounded-full animate-bounce [animation-delay:0.3s]" />
                          <span className="w-1 h-3 bg-rose-400 rounded-full animate-bounce [animation-delay:0.45s]" />
                        </div>
                      </div>
                    )}

                    {/* Quick Link to Chapter 12 */}
                    <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-universe-dustyPink">
                      <button
                        onClick={() => scrollToChapter(note.chapterId, note.world)}
                        className="hover:text-white underline underline-offset-2 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Open in Chapter 12</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>

                      <button
                        onClick={handleSendKiss}
                        className="px-2.5 py-1 rounded-full bg-universe-wine/30 hover:bg-universe-crimson/40 border border-universe-wine/50 text-universe-cream text-[10px] cursor-pointer active:scale-95 transition-all"
                      >
                        {note.id === 'shivi' ? 'Send 3-4 Kisses 💋' : 'Forehead Kiss 🌙'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* View Full Chapter 12 Button */}
            <button
              onClick={() => scrollToChapter('chapter-12', 'WORLD_05_BIRTHDAY')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-900/60 to-purple-900/60 border border-rose-500/40 text-rose-100 hover:text-white text-xs font-mono flex items-center justify-center gap-2 hover:scale-[1.01] transition-all cursor-pointer"
            >
              <span>🎙️ View Chapter 12: Voices From Our Hearts (Full Interactive Mode)</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* FULL MULTI-COLUMN CHAPTERS & AUDIO DRAWER OVERLAY */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-universe-black/95 backdrop-blur-2xl flex flex-col justify-center items-center p-3 sm:p-6 animate-fadeIn select-none overflow-y-auto">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 sm:p-3 rounded-full text-universe-lavender hover:text-white bg-universe-wine/30 touch-manipulation cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="max-w-6xl w-full text-center space-y-4 max-h-[92vh] overflow-y-auto py-6 px-2 sm:px-4">
            
            {/* Header */}
            <div>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.3em] text-universe-dustyPink">
                Table of Memories & Audio Anthems
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-universe-cream">
                Journey Through Our Stars ♡
              </h2>
            </div>

            {/* Continuous Story Mode Quick Switch */}
            <button
              onClick={() => scrollToChapter('chapter-1', 'ALL_CHAPTERS')}
              className="w-full max-w-xl mx-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-900/60 via-universe-darkBurgundy/80 to-purple-900/60 border border-rose-500/50 hover:border-rose-400 text-rose-200 hover:text-white text-xs font-mono flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] transition-all cursor-pointer touch-manipulation"
            >
              <BookOpen className="w-4 h-4 text-rose-300" />
              <span className="font-semibold">View All 14 Chapters in Sequence (Story Mode)</span>
              <span>→</span>
            </button>

            {/* 3 DISTINCT COLUMNS: VOICE NOTES, TAYLOR SWIFT SONG, AND CHAPTERS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 text-left pt-2">
              
              {/* COLUMN 1: OUR REAL VOICE NOTES (lg:col-span-4) */}
              <div className="lg:col-span-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#1c0817] via-[#11040d] to-[#080206] border-2 border-rose-500/40 shadow-xl space-y-4">
                
                <div className="flex items-center justify-between border-b border-rose-500/30 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Mic className="w-4 h-4 text-rose-400 animate-pulse" />
                    <h3 className="font-serif text-base sm:text-lg text-universe-cream font-medium">
                      Our Real Voice Notes
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    2 Recordings
                  </span>
                </div>

                <p className="text-xs text-universe-lavender/80 font-sans">
                  Raw recordings straight from midnight talks, sweet kiss demands, and sleepy murmurs.
                </p>

                {/* Voice Notes Cards */}
                <div className="space-y-3">
                  {allVoiceNotes.map((note) => {
                    const isPlaying = playingVoiceNoteId === note.id;
                    return (
                      <div
                        key={note.id}
                        className={`p-3 rounded-xl border transition-all ${
                          isPlaying
                            ? 'bg-rose-950/60 border-rose-400 shadow-glow-red/30'
                            : 'bg-black/50 border-universe-wine/40 hover:border-rose-400/50'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2.5">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img
                              src={note.avatar}
                              alt={note.speaker}
                              className="w-10 h-10 rounded-lg object-cover border border-rose-400/30 shrink-0"
                            />
                            <div className="min-w-0">
                              <span className="text-[10px] font-mono text-rose-300 font-semibold block truncate">
                                {note.speaker} ({note.duration})
                              </span>
                              <h4 className="font-serif text-xs text-universe-cream truncate">
                                {note.title}
                              </h4>
                            </div>
                          </div>

                          <button
                            onClick={() => handleToggleVoiceNote(note)}
                            className="w-8 h-8 rounded-full bg-universe-crimson text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer shadow-glow-red"
                            title={isPlaying ? 'Pause' : 'Play'}
                          >
                            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white ml-0.5" />}
                          </button>
                        </div>

                        <p className="text-[10px] font-serif italic text-universe-dustyPink line-clamp-1 mt-1.5">
                          {note.subtitle}
                        </p>

                        <div className="mt-2 pt-1.5 border-t border-universe-wine/30 flex justify-between items-center text-[10px] font-mono">
                          <button
                            onClick={() => scrollToChapter(note.chapterId, note.world)}
                            className="text-rose-300 hover:text-white flex items-center gap-0.5 cursor-pointer"
                          >
                            <span>Open in Ch 12</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                          <span className="text-universe-lavender/60">
                            {note.id === 'shivi' ? '💋 "bas teen-char"' : '😴 sleeping'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Chapter 12 Link */}
                <button
                  onClick={() => scrollToChapter('chapter-12', 'WORLD_05_BIRTHDAY')}
                  className="w-full py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/40 text-rose-200 text-xs font-mono text-center block transition-all cursor-pointer"
                >
                  🎙️ Go to Chapter 12: Voices From Our Hearts →
                </button>
              </div>

              {/* COLUMN 2: TAYLOR SWIFT SONG (lg:col-span-4) */}
              <div className="lg:col-span-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#180918] via-[#0f0410] to-[#070208] border-2 border-purple-500/40 shadow-xl space-y-4 flex flex-col justify-between">
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-purple-500/30 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Music className="w-4 h-4 text-purple-300 animate-pulse" />
                      <h3 className="font-serif text-base sm:text-lg text-universe-cream font-medium">
                        Taylor Swift: Paper Rings
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-200 border border-purple-500/40">
                      Our Anthem
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/60 border border-universe-wine/50 text-center space-y-3">
                    <div className="relative inline-flex items-center justify-center mx-auto">
                      <Disc3 className={`w-16 h-16 text-rose-300/80 ${isPlayingAudio ? 'animate-spin-slow' : ''}`} />
                      <div className="absolute w-5 h-5 rounded-full bg-universe-darkBurgundy border border-universe-wine" />
                    </div>

                    <div>
                      <h4 className="font-serif text-sm text-universe-cream font-medium">
                        Paper Rings (Full Track)
                      </h4>
                      <p className="text-[11px] font-mono text-universe-dustyPink">
                        Taylor Swift • 3:42 • Pop / Romantic
                      </p>
                    </div>

                    <p className="font-serif italic text-xs text-universe-blush/90 px-2">
                      "I like shiny things, but I'd marry you with paper rings! Darling you're the one I want!"
                    </p>

                    {/* Controls */}
                    <div className="flex items-center justify-center gap-3 pt-1">
                      <button
                        onClick={onToggleAudio}
                        className="px-5 py-2 rounded-full bg-gradient-to-r from-universe-crimson to-universe-glowingRed text-white text-xs font-mono font-medium flex items-center gap-2 shadow-glow-red hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      >
                        {isPlayingAudio ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white ml-0.5" />}
                        <span>{isPlayingAudio ? 'Pause Song' : 'Play Paper Rings'}</span>
                      </button>

                      <button
                        onClick={handlePlayChorusHook}
                        disabled={isPlayingHook}
                        className="px-3.5 py-2 rounded-full bg-universe-wine/30 hover:bg-universe-wine/60 border border-rose-400/40 text-rose-200 text-xs font-mono flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                        title="Play instant bouncy chorus hook"
                      >
                        <Sparkles className="w-3 h-3 text-rose-300" />
                        <span>{isPlayingHook ? 'Hook 🎶' : 'Hook 🎵'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Chapter 11 Link */}
                <button
                  onClick={() => scrollToChapter('chapter-11', 'WORLD_05_BIRTHDAY')}
                  className="w-full py-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/40 text-purple-200 text-xs font-mono text-center block transition-all cursor-pointer"
                >
                  🎵 Go to Chapter 11: Cassette & Origami Ring →
                </button>
              </div>

              {/* COLUMN 3: ALL 14 CHAPTERS (lg:col-span-4) */}
              <div className="lg:col-span-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#180918] via-[#0d030b] to-[#060205] border-2 border-universe-wine/50 shadow-xl space-y-3">
                
                <div className="flex items-center justify-between border-b border-universe-wine/40 pb-2.5">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-universe-blush" />
                    <h3 className="font-serif text-base sm:text-lg text-universe-cream font-medium">
                      All 14 Chapters
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-universe-wine/30 text-universe-dustyPink border border-universe-wine/40">
                    Full Lore
                  </span>
                </div>

                <div className="max-h-72 lg:max-h-80 overflow-y-auto space-y-1.5 pr-1 text-left">
                  {chapters.map((ch) => (
                    <div
                      key={ch.num}
                      onClick={() => scrollToChapter(ch.id, ch.world)}
                      className={`px-3 py-2 rounded-xl border transition-all cursor-pointer flex items-center justify-between group touch-manipulation active:scale-[0.98] ${
                        ch.isFeatured
                          ? 'bg-rose-950/40 border-rose-500/40 hover:border-rose-400 text-white'
                          : 'bg-universe-darkBurgundy/30 border-universe-wine/25 hover:border-universe-glowingRed hover:bg-universe-wine/30 text-universe-cream'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`font-mono text-[11px] ${ch.isFeatured ? 'text-universe-gold font-bold' : 'text-universe-dustyPink'}`}>
                          {ch.num}
                        </span>
                        <span className="font-serif text-xs truncate group-hover:text-universe-blush transition-colors">
                          {ch.title}
                        </span>
                      </div>
                      <ChevronRight className="w-3 h-3 text-universe-wine group-hover:text-universe-blush group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </div>
                  ))}
                </div>

                <div className="pt-1 text-center">
                  <span className="text-[10px] font-mono text-universe-lavender/60">
                    Click any chapter to teleport directly
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Close / Return */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs uppercase tracking-widest text-universe-dustyPink hover:text-universe-blush py-2 px-4 touch-manipulation cursor-pointer"
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
