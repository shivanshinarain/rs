import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Play, Pause, Disc3, Volume2, Sparkles, Heart, Music, Check } from 'lucide-react';
import { loveStoryData } from '../data/loveStory';
import { sound } from '../utils/audioEngine';
import { HeartDoodle, KissDoodle, CuteAnnotation } from './Doodles';

export default function Chapter11_OurMusic({ onEasterEggUnlock }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayingHook, setIsPlayingHook] = useState(false);
  const [paperRingFolded, setPaperRingFolded] = useState(false);
  const canvasRef = useRef(null);

  const track = loveStoryData.music.tracks[0];

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(223.4);
  const audioRef = useRef(null);

  const handleTogglePlay = () => {
    sound.playCassetteClick();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      sound.stopAmbientMusic();
      audio.play().catch(() => {
        sound.playPaperRingsTrack();
      });
      setIsPlaying(true);
      if (onEasterEggUnlock) {
        onEasterEggUnlock('cassette-flip');
      }
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handlePlayPaperRingsHook = () => {
    setIsPlayingHook(true);
    sound.playPaperRingsHook();
    if (onEasterEggUnlock) {
      onEasterEggUnlock('cassette-flip');
    }

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ff285e', '#f5b8c6', '#f5cb68']
    });

    setTimeout(() => {
      setIsPlayingHook(false);
    }, 4200);
  };

  const handleFoldPaperRing = () => {
    sound.playHeartClick();
    setPaperRingFolded(true);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#ffffff', '#f5b8c6', '#ff285e']
    });
  };

  // Waveform visualization animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;

      const barCount = 28;
      const barWidth = width / barCount - 2;

      for (let i = 0; i < barCount; i++) {
        let barHeight = 5;
        if (isPlaying || isPlayingHook) {
          barHeight = Math.sin(phase + i * 0.35) * 16 + 22 + Math.random() * 6;
        }

        const x = i * (barWidth + 2);
        const y = height - barHeight;

        const grad = ctx.createLinearGradient(0, y, 0, height);
        grad.addColorStop(0, '#ff285e');
        grad.addColorStop(1, '#6b1328');

        ctx.fillStyle = grad;
        ctx.fillRect(x, y, barWidth, barHeight);
      }

      phase += 0.12;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, isPlayingHook]);

  return (
    <section id="chapter-11" className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 flex flex-col justify-center items-center relative z-20">
      <div className="max-w-3xl w-full text-center space-y-8 sm:space-y-10">
        
        {/* Header */}
        <div className="space-y-2 sm:space-y-3">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-universe-dustyPink font-medium px-3.5 py-1.5 rounded-full border border-universe-wine/40 bg-universe-darkBurgundy/40 inline-block">
            Chapter 11 — {loveStoryData.music.tagline}
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-universe-cream">
            Taylor Swift: Paper Rings ♡
          </h2>
          <p className="font-sans text-xs sm:text-sm text-universe-lavender/80 max-w-lg mx-auto px-2">
            "I like shiny things, but I'd marry you with paper rings, uh-huh, that's right!"
          </p>
        </div>

        {/* Taylor Swift Paper Rings Anthem Hero Banner */}
        <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-[#2c0d23] via-[#1a0715] to-[#2c0d23] border border-universe-wine/60 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-universe-crimson to-universe-glowingRed flex items-center justify-center text-white shadow-glow-red shrink-0">
              <Music className={`w-6 h-6 sm:w-7 sm:h-7 ${isPlayingHook || isPlaying ? 'animate-bounce' : ''}`} />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-universe-blush font-mono font-bold block">
                Our Only Love Anthem • Taylor Swift
              </span>
              <h3 className="font-serif text-base sm:text-xl text-universe-cream font-semibold">
                Paper Rings (Full Track)
              </h3>
              <p className="text-xs text-universe-lavender/70">
                Permanent commitment — not temporary 🤧
              </p>
            </div>
          </div>

          <button
            onClick={handlePlayPaperRingsHook}
            disabled={isPlayingHook}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-universe-crimson hover:bg-universe-glowingRed text-white font-sans text-xs font-semibold tracking-wider uppercase shadow-glow-red transition-all active:scale-95 flex items-center justify-center gap-2 touch-manipulation shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isPlayingHook ? 'Playing Hook 🎶...' : 'Play Chorus Hook 🎵'}</span>
          </button>
        </div>

        {/* Vintage Cassette Player Chassis */}
        <div className="relative mx-auto w-full max-w-lg p-4 sm:p-8 rounded-3xl bg-gradient-to-b from-[#1f0b17] via-[#12050e] to-[#080206] border-2 border-universe-wine/70 shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-4 sm:space-y-6">
          
          {/* Cassette Tape Body */}
          <div className="relative p-3.5 sm:p-5 rounded-2xl bg-gradient-to-b from-[#2a0e20] to-[#150610] border border-universe-wine/60 shadow-inner">
            
            {/* Cassette Label Header */}
            <div className="bg-[#fcf8f5] text-[#2c1320] p-2.5 sm:p-3 rounded-xl border border-stone-300 flex justify-between items-center shadow-sm">
              <div className="text-left truncate pr-2">
                <span className="font-mono text-[9px] sm:text-[10px] text-universe-crimson uppercase tracking-widest block font-bold">
                  TAYLOR SWIFT — OUR LOVE ANTHEM
                </span>
                <p className="font-serif text-xs sm:text-sm font-semibold truncate max-w-[240px]">
                  Paper Rings (Full Track)
                </p>
              </div>
              <div className="px-2 sm:px-2.5 py-1 rounded bg-[#2c1320] text-universe-blush text-[9px] sm:text-[10px] font-mono shrink-0">
                <span>Permanent ♡</span>
              </div>
            </div>

            {/* Cassette Center Spool Window */}
            <div className="mt-3 sm:mt-4 p-3 sm:p-4 rounded-xl bg-universe-black/90 border border-universe-wine/50 flex justify-around items-center relative overflow-hidden">
              
              {/* Left Spool */}
              <div className="relative flex items-center justify-center">
                <Disc3 className={`w-12 h-12 sm:w-16 sm:h-16 text-universe-blush/80 ${isPlaying || isPlayingHook ? 'animate-spin-slow' : ''}`} />
                <div className="absolute w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#12050e] border border-universe-wine" />
              </div>

              {/* Center Tape Window & Magnetic Ribbon */}
              <div className="h-8 sm:h-10 w-16 sm:w-24 bg-[#1f0917] rounded-md border border-universe-wine/40 flex items-center justify-center relative">
                <div className="w-full h-1.5 sm:h-2 bg-[#401222] rounded" />
                <div className="absolute text-[8px] sm:text-[9px] font-mono text-universe-dustyPink">
                  {(isPlaying || isPlayingHook) ? 'PLAY ▶' : 'PAUSE ❚❚'}
                </div>
              </div>

              {/* Right Spool */}
              <div className="relative flex items-center justify-center">
                <Disc3 className={`w-12 h-12 sm:w-16 sm:h-16 text-universe-blush/80 ${isPlaying || isPlayingHook ? 'animate-spin-slow' : ''}`} />
                <div className="absolute w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#12050e] border border-universe-wine" />
              </div>
            </div>

            {/* Track Info & Lyrics Snippet */}
            <div className="mt-3 p-2.5 rounded-xl bg-black/40 border border-universe-wine/30 text-left">
              <div className="flex justify-between items-center text-[10px] sm:text-xs text-universe-dustyPink font-mono mb-1">
                <span>{track.genre}</span>
                <span>{loveStoryData.music.trackDuration}</span>
              </div>
              <p className="font-serif italic text-xs sm:text-sm text-universe-cream/90">
                "{track.lyrics}"
              </p>
            </div>
          </div>

          {/* Real-time Audio Waveform Display */}
          <div className="p-2 sm:p-3 rounded-xl bg-universe-black/60 border border-universe-wine/40">
            <canvas ref={canvasRef} width="360" height="36" className="w-full h-8 sm:h-9" />
          </div>

          {/* Audio Scrubber & Timeline */}
          <div className="px-2 space-y-1.5">
            <input
              type="range"
              min="0"
              max={duration || 223}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              aria-label="Seek Taylor Swift Paper Rings"
              className="w-full accent-universe-glowingRed cursor-pointer bg-universe-wine/40 rounded-lg h-2 touch-manipulation"
            />
            <div className="flex justify-between text-[10px] font-mono text-universe-dustyPink">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Mechanical Audio Buttons */}
          <div className="flex justify-center items-center gap-4 sm:gap-6 pt-1">
            <button
              onClick={handleTogglePlay}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-universe-crimson to-universe-glowingRed text-white flex items-center justify-center shadow-glow-red hover:scale-105 active:scale-95 transition-all touch-manipulation"
              title={isPlaying ? 'Pause Paper Rings' : 'Play Paper Rings'}
            >
              {isPlaying ? <Pause className="w-6 h-6 sm:w-7 sm:h-7 fill-white" /> : <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white ml-0.5" />}
            </button>
          </div>
          <p className="text-[10px] sm:text-xs text-universe-lavender/70 font-mono">
            {isPlaying ? 'Now Playing: Taylor Swift — Paper Rings (Full Track) 🎶' : 'Click to play Taylor Swift — Paper Rings'}
          </p>

          {/* Hidden native audio element */}
          <audio
            ref={audioRef}
            src="/assets/paper_rings.mp3"
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            preload="metadata"
          />

        </div>

        {/* Origami Paper Ring Creator */}
        <div className="max-w-md mx-auto p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-universe-darkBurgundy/40 to-universe-black/80 border border-universe-wine/40 text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-universe-blush text-sm font-semibold">
            <span>💍</span>
            <span>Fold a Paper Ring for Rashi</span>
            <span>💍</span>
          </div>

          <p className="text-xs text-universe-lavender/80 font-sans">
            "I like shiny things, but I'd marry you with paper rings, uh-huh, that's right!"
          </p>

          {!paperRingFolded ? (
            <button
              onClick={handleFoldPaperRing}
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-universe-blush/40 text-xs font-mono text-universe-cream transition-all hover:scale-105 active:scale-95 touch-manipulation"
            >
              Fold Origami Ring Now ✂️📄
            </button>
          ) : (
            <div className="p-3 rounded-2xl bg-universe-crimson/20 border border-universe-glowingRed/50 text-universe-cream text-xs space-y-1 animate-fadeIn">
              <div className="flex items-center justify-center gap-1.5 text-universe-blush font-semibold">
                <Check className="w-4 h-4 text-universe-glowingRed" />
                <span>Paper Ring Folded & Slipped on Rashi's Finger!</span>
              </div>
              <p className="font-handwritten text-base text-universe-dustyPink">
                Shivi 💍 Rashi — Permanent commitment frm my side 🤧
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
