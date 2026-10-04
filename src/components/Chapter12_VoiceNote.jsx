import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Mic, Moon, Play, Pause, Volume2, Sparkles, Heart, FileText, RotateCcw, Bed, Flame } from 'lucide-react';
import { loveStoryData } from '../data/loveStory';
import { sound } from '../utils/audioEngine';
import { HeartDoodle, KissDoodle, CuteAnnotation, StarDoodle } from './Doodles';

export default function Chapter12_VoiceNote() {
  const notesList = loveStoryData.voiceNotesList || [
    {
      id: 'shivi',
      title: 'Voice Note from Shivi for Rashi',
      tag: "Shivi's Love Letter 🎙️",
      subtitle: "'Kiss toh mil sakti hai na? Bas teen-char...'",
      audioSrc: '/assets/shivi_voice_note.webm',
      duration: '0:45',
      avatar: '/assets/shivi_rashi_cartoon.jpg',
      transcript: loveStoryData.voiceNote.transcript,
      actionLabel: 'Give Shivi a Kiss 💋'
    }
  ];

  const [activeId, setActiveId] = useState('shivi');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(45);
  const [kissCount, setKissCount] = useState(0);
  const [sleepyKissCount, setSleepyKissCount] = useState(0);
  const audioRef = useRef(null);

  const activeNote = notesList.find(n => n.id === activeId) || notesList[0];

  // Handle switching tabs
  const handleSelectNote = (id) => {
    if (id === activeId) return;
    sound.playHeartClick();
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    setCurrentTime(0);
    setActiveId(id);
    const target = notesList.find(n => n.id === id);
    if (target && target.duration) {
      const parts = target.duration.split(':');
      if (parts.length === 2) {
        setDuration(parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10));
      }
    }
  };

  // Real audio playback integration
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, [activeId]);

  const handleToggle = () => {
    sound.playHeartClick();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(true);
      });
    }
  };

  const handleReplay = () => {
    sound.playHeartClick();
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      setCurrentTime(0);
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(true));
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    if (audio) {
      audio.currentTime = newTime;
    }
  };

  const handleSendKiss = () => {
    sound.playHeartClick();
    const next = kissCount + 1;
    setKissCount(next);

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.75 },
      colors: ['#ff285e', '#f5b8c6', '#ffffff']
    });
  };

  const handleSendSleepyKiss = () => {
    sound.playChime();
    const next = sleepyKissCount + 1;
    setSleepyKissCount(next);

    confetti({
      particleCount: 35,
      spread: 70,
      origin: { y: 0.75 },
      colors: ['#d8cbe4', '#f5b8c6', '#f5cb68', '#ffffff']
    });
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || !isFinite(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <section id="chapter-12" className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 flex flex-col justify-center items-center relative z-20">
      
      {/* Hidden Native Audio Element */}
      <audio
        ref={audioRef}
        key={activeNote.audioSrc}
        src={activeNote.audioSrc}
        preload="auto"
      />

      <div className="max-w-2xl w-full text-center space-y-6 sm:space-y-8">
        
        {/* Header */}
        <div className="space-y-2 sm:space-y-3 relative">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-universe-dustyPink font-medium px-3.5 py-1.5 rounded-full border border-universe-wine/40 bg-universe-darkBurgundy/40 inline-block">
            Chapter 12 — Voices From Our Hearts
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-universe-cream">
            Real Words & Sleepy Whispers ♡
          </h2>
          <p className="font-sans text-xs sm:text-sm text-universe-lavender/80 max-w-md mx-auto px-2">
            Real audio recordings straight from our late-night calls, sweet demands, and half-asleep whispers in bed.
          </p>

          {/* Doodles near title */}
          <div className="hidden sm:block absolute -top-2 right-4">
            <CuteAnnotation text="shivi & rashi's real voices ♡" arrowDirection="down" />
          </div>
        </div>

        {/* Tab Switcher: Choose Between Shivi & Sleepy Rashi */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 p-1.5 rounded-2xl bg-universe-black/60 border border-universe-wine/50 max-w-lg mx-auto">
          {notesList.map((note) => {
            const isSelected = note.id === activeId;
            const isSleepy = note.id === 'rashi-sleepy';

            return (
              <button
                key={note.id}
                onClick={() => handleSelectNote(note.id)}
                className={`w-full sm:w-auto flex-1 px-4 py-2.5 rounded-xl text-left transition-all relative touch-manipulation ${
                  isSelected
                    ? 'bg-gradient-to-r from-universe-darkBurgundy to-universe-wine text-white shadow-glow-red border border-universe-glowingRed/50'
                    : 'text-universe-lavender/70 hover:text-universe-cream hover:bg-universe-wine/20 border border-transparent'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {isSleepy ? (
                      <Moon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-universe-gold' : 'text-universe-lavender'}`} />
                    ) : (
                      <Mic className={`w-4 h-4 shrink-0 ${isSelected ? 'text-universe-glowingRed' : 'text-universe-blush'}`} />
                    )}
                    <span className="font-serif text-xs sm:text-sm font-medium tracking-wide">
                      {note.id === 'shivi' ? "Shivi's Note 🎙️" : "Sleepy Rashi 😴"}
                    </span>
                  </div>

                  {isSleepy && (
                    <span className="text-[9px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-full bg-universe-crimson/40 text-universe-blush border border-universe-glowingRed/40 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-universe-glowingRed animate-ping" />
                      Sleeping
                    </span>
                  )}
                </div>

                <p className="text-[10px] text-universe-dustyPink font-mono truncate mt-0.5">
                  {note.id === 'shivi' ? '“kiss toh mil sakti hai na?” (0:45)' : '“gandi wali neend aa rahi hai...” (1:11)'}
                </p>
              </button>
            );
          })}
        </div>

        {/* Vintage Mic & Audio Player Container */}
        <div className="relative mx-auto w-full p-5 sm:p-8 rounded-3xl bg-gradient-to-b from-[#1e0a16] via-[#12040d] to-[#070205] border-2 border-universe-wine/70 shadow-2xl space-y-5">
          
          {/* Top Banner Tag for Sleepy Rashi */}
          {activeId === 'rashi-sleepy' && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-universe-wine/40 border border-universe-lavender/30 text-universe-cream text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Recorded live while she's currently sleeping in bed 🌙💤</span>
            </div>
          )}

          {/* Avatar & Visual Indicator */}
          <div className="flex items-center justify-center gap-4">
            {/* Character Cartoon Thumbnail */}
            <div className="relative">
              <img
                src={activeNote.avatar}
                alt={activeNote.title}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-universe-blush/60 shadow-glow-blush"
              />
              <span className="absolute -bottom-2 -right-1 text-sm">
                {activeId === 'shivi' ? '🎙️' : '😴'}
              </span>
            </div>

            {/* Glowing Sound Pulse Indicator */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-universe-wine/30 border-2 border-universe-blush/40 flex items-center justify-center">
              {isPlaying && (
                <div className={`absolute -inset-2 rounded-full animate-ping ${activeId === 'shivi' ? 'bg-universe-glowingRed/30' : 'bg-universe-lavender/30'}`} />
              )}
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-universe-darkBurgundy border flex items-center justify-center transition-all ${
                activeId === 'shivi' ? 'border-universe-glowingRed' : 'border-universe-lavender'
              } ${isPlaying ? 'scale-110 shadow-glow-red' : ''}`}>
                {activeId === 'shivi' ? (
                  <Mic className={`w-6 h-6 sm:w-7 sm:h-7 ${isPlaying ? 'text-universe-glowingRed animate-pulse' : 'text-universe-blush'}`} />
                ) : (
                  <Moon className={`w-6 h-6 sm:w-7 sm:h-7 ${isPlaying ? 'text-universe-gold animate-pulse' : 'text-universe-lavender'}`} />
                )}
              </div>
            </div>
          </div>

          {/* Voice Note Info */}
          <div>
            <h3 className="font-serif text-lg sm:text-xl text-universe-cream font-medium">
              {activeNote.title}
            </h3>
            <span className="text-[11px] sm:text-xs font-mono text-universe-dustyPink">
              {formatTime(currentTime)} / {formatTime(duration)} • {activeNote.subtitle}
            </span>
          </div>

          {/* Soundwave Frequency Bars Simulation */}
          <div className="flex items-center justify-center gap-1 sm:gap-1.5 h-10 sm:h-12 px-2 sm:px-4">
            {Array.from({ length: 24 }).map((_, i) => {
              const height = isPlaying
                ? Math.sin(i * 0.38 + (progressPercent * 0.15)) * 14 + 18 + Math.random() * 5
                : 5;

              return (
                <div
                  key={i}
                  style={{
                    height: `${height}px`,
                    transition: 'height 0.12s ease'
                  }}
                  className={`w-1 sm:w-1.5 rounded-full ${
                    (i / 24) * 100 <= progressPercent
                      ? activeId === 'shivi'
                        ? 'bg-universe-glowingRed shadow-glow-red'
                        : 'bg-gradient-to-t from-universe-wine to-universe-blush shadow-glow-blush'
                      : 'bg-universe-wine/50'
                  }`}
                />
              );
            })}
          </div>

          {/* Interactive Range Scrubber */}
          <div className="space-y-1 px-1">
            <input
              type="range"
              min="0"
              max={duration || (activeId === 'shivi' ? 45 : 71)}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              aria-label="Seek voice note"
              className="w-full h-1.5 bg-universe-darkBurgundy rounded-lg appearance-none cursor-pointer accent-universe-glowingRed"
            />
            <div className="flex justify-between text-[10px] font-mono text-universe-lavender/60">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Play/Pause Button Controls */}
          <div className="pt-1 flex flex-wrap justify-center items-center gap-3">
            <button
              onClick={handleToggle}
              className="flex-1 sm:flex-initial px-7 py-3 rounded-full bg-gradient-to-r from-universe-crimson to-universe-glowingRed text-universe-cream font-sans text-xs uppercase tracking-widest font-semibold shadow-glow-red hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 touch-manipulation"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
              <span>{isPlaying ? 'Pause Audio' : activeId === 'shivi' ? 'Listen to Shivi ♡' : 'Listen to Sleepy Rashi 😴♡'}</span>
            </button>
            <button
              onClick={handleReplay}
              className="p-3 rounded-full border border-universe-wine/50 text-universe-lavender hover:text-universe-blush touch-manipulation"
              title="Restart from beginning"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="p-3 rounded-full border border-universe-wine/50 text-universe-lavender hover:text-universe-blush touch-manipulation"
              title="Toggle Transcript"
            >
              <FileText className="w-4 h-4" />
            </button>
          </div>

          {/* Subtitle / Transcript Box */}
          {showTranscript && (
            <div className="p-4 sm:p-5 rounded-2xl bg-universe-black/70 border border-universe-wine/50 text-left animate-fadeIn space-y-3 relative overflow-hidden">
              <div className="flex justify-between items-center border-b border-universe-wine/40 pb-2">
                <span className="text-[10px] uppercase tracking-widest text-universe-dustyPink font-mono flex items-center gap-1.5">
                  <FileText className="w-3 h-3 text-universe-blush" />
                  Exact Voice Transcript:
                </span>
                <span className="text-[11px] text-universe-blush font-handwritten">
                  {activeId === 'shivi' ? '"bas teen-char kiss 💋"' : '"bohot gandi wali neend 😴"'}
                </span>
              </div>

              {activeId === 'shivi' ? (
                /* Shivi's Transcript */
                <p className="font-serif italic text-xs sm:text-sm text-universe-cream/95 leading-relaxed bg-universe-darkBurgundy/40 p-3 rounded-xl border border-universe-wine/30">
                  "{activeNote.transcript}"
                </p>
              ) : (
                /* Rashi's Sleepy Dialogue */
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1 text-xs">
                  {activeNote.dialogue ? (
                    activeNote.dialogue.map((item, idx) => {
                      const isRashi = item.speaker.includes('Rashi');
                      return (
                        <div
                          key={idx}
                          className={`p-2.5 rounded-xl border text-xs sm:text-sm flex flex-col gap-0.5 ${
                            isRashi
                              ? 'bg-universe-wine/25 border-universe-wine/40 text-universe-blush'
                              : 'bg-universe-darkBurgundy/40 border-universe-crimson/30 text-universe-cream'
                          }`}
                        >
                          <span className="text-[9px] font-mono uppercase tracking-wider text-universe-dustyPink font-semibold">
                            {item.speaker}
                          </span>
                          <span className="font-serif italic">"{item.text}"</span>
                        </div>
                      );
                    })
                  ) : (
                    <p className="font-serif italic text-xs sm:text-sm text-universe-cream/95 leading-relaxed bg-universe-darkBurgundy/40 p-3 rounded-xl border border-universe-wine/30">
                      "{activeNote.transcript}"
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Interactive Love Action */}
          {activeId === 'shivi' ? (
            /* Shivi Kiss Counter (Fulfilling her demand for 3-4 kisses!) */
            <div className="pt-2 p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-universe-wine/20 via-universe-darkBurgundy/60 to-universe-wine/20 border border-universe-blush/30 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-left">
                <div className="flex items-center gap-1.5 text-xs text-universe-blush font-serif font-medium">
                  <span>💋 Shivi's Kiss Demand:</span>
                  <span className="font-handwritten text-sm">"kiss toh mil sakti hai na?"</span>
                </div>
                <p className="text-[10px] text-universe-lavender/70 font-sans">
                  {kissCount >= 4
                    ? "✓ All 3-4 kisses delivered to Shivi!"
                    : `Delivered: ${kissCount} / 4 kisses`}
                </p>
              </div>

              <button
                onClick={handleSendKiss}
                className="px-4 py-2 rounded-full bg-universe-crimson/50 hover:bg-universe-crimson border border-universe-glowingRed/60 text-white font-handwritten text-sm flex items-center gap-1.5 shadow-glow-red hover:scale-105 active:scale-95 transition-all touch-manipulation whitespace-nowrap"
              >
                <span>Give Shivi a Kiss 💋</span>
                {kissCount > 0 && <span className="font-mono text-xs">({kissCount})</span>}
              </button>
            </div>
          ) : (
            /* Sleepy Rashi Forehead Kiss Action */
            <div className="pt-2 p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-universe-wine/20 via-purple-950/40 to-universe-wine/20 border border-universe-lavender/30 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-left">
                <div className="flex items-center gap-1.5 text-xs text-universe-lavender font-serif font-medium">
                  <span>🌙 Sleepy Rashi in Bed:</span>
                  <span className="font-handwritten text-sm text-universe-blush">"I love you, Shivi... ♡"</span>
                </div>
                <p className="text-[10px] text-universe-dustyPink font-sans">
                  {sleepyKissCount > 0
                    ? `✓ Tucked in with ${sleepyKissCount} forehead kiss${sleepyKissCount > 1 ? 'es' : ''} (sleeping peacefully!)`
                    : "She's sleeping... leave a soft kiss on her forehead"}
                </p>
              </div>

              <button
                onClick={handleSendSleepyKiss}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-800 to-universe-wine hover:brightness-110 border border-universe-lavender/50 text-white font-handwritten text-sm flex items-center gap-1.5 shadow-glow-blush hover:scale-105 active:scale-95 transition-all touch-manipulation whitespace-nowrap"
              >
                <span>Kiss Her Forehead 🌙💤</span>
                {sleepyKissCount > 0 && <span className="font-mono text-xs">({sleepyKissCount})</span>}
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
