import React, { useState, useEffect } from 'react';
import { Play, Pause, Music, Sparkles, Volume2, VolumeX, ChevronDown, ChevronUp, Disc3 } from 'lucide-react';
import { sound } from '../../utils/audioEngine';

interface TaylorSwiftMusicBarProps {
  onNavigateToChapter11?: () => void;
}

export default function TaylorSwiftMusicBar({ onNavigateToChapter11 }: TaylorSwiftMusicBarProps) {
  const [playbackState, setPlaybackState] = useState(() => sound.getPlaybackState());
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPlayingHook, setIsPlayingHook] = useState(false);

  useEffect(() => {
    const unsubscribe = sound.subscribe((state: any) => {
      setPlaybackState(state);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const formatTime = (secs: number) => {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleTogglePlay = () => {
    sound.playHeartClick();
    sound.togglePaperRingsTrack();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    sound.seekPaperRings(val);
  };

  const handlePlayChorusHook = () => {
    setIsPlayingHook(true);
    sound.playPaperRingsHook();
    setTimeout(() => setIsPlayingHook(false), 4200);
  };

  return (
    <aside aria-label="Taylor Swift Paper Rings Music Player" className="fixed bottom-4 left-4 z-40 select-none transition-all duration-300">
      {isMinimized ? (
        // Minimized floating musical heart pill
        <button
          onClick={() => {
            sound.playHeartClick();
            setIsMinimized(false);
          }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#1b0816]/95 border border-rose-500/50 text-rose-200 hover:text-white shadow-glow-red hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
          title="Open Taylor Swift — Paper Rings Player"
        >
          <Disc3 className={`w-4 h-4 text-rose-400 ${playbackState.isPlaying ? 'animate-spin-slow' : ''}`} />
          <span className="font-mono text-xs font-semibold">Paper Rings 🎵</span>
          <ChevronUp className="w-3.5 h-3.5 text-rose-300" />
        </button>
      ) : (
        // Expanded sleek floating player
        <div className="w-[320px] sm:w-[380px] p-3.5 sm:p-4 rounded-3xl bg-gradient-to-b from-[#220a1c]/95 via-[#130510]/95 to-[#090207]/98 border border-rose-500/40 shadow-2xl backdrop-blur-xl text-universe-cream space-y-2.5">
          
          {/* Top Bar: Title & Minimize Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-tr from-universe-crimson to-rose-600 flex items-center justify-center text-white shadow-glow-red shrink-0">
                <Disc3 className={`w-5 h-5 text-white ${playbackState.isPlaying ? 'animate-spin-slow' : ''}`} />
              </div>
              <div className="truncate">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-universe-gold font-bold">
                    Official Love Anthem
                  </span>
                  <span className="text-[10px] text-rose-400">♡</span>
                </div>
                <h4 className="font-serif text-xs sm:text-sm font-semibold text-white truncate">
                  Paper Rings — Taylor Swift
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {onNavigateToChapter11 && (
                <button
                  onClick={() => {
                    sound.playHeartClick();
                    onNavigateToChapter11();
                  }}
                  className="px-2 py-0.5 rounded-full bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 text-[10px] font-mono text-rose-200 transition-all cursor-pointer"
                  title="Jump to Chapter 11 Cassette Experience"
                >
                  Ch 11 ↗
                </button>
              )}

              <button
                onClick={() => setIsMinimized(true)}
                className="p-1 rounded-full text-rose-300/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Minimize player"
                aria-label="Minimize player"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Progress Slider */}
          <div className="space-y-1">
            <input
              type="range"
              min="0"
              max={playbackState.duration || 223.4}
              step="0.5"
              value={playbackState.currentTime}
              onChange={handleSeek}
              aria-label="Seek Paper Rings Track"
              className="w-full accent-rose-500 cursor-pointer bg-rose-950/60 rounded-lg h-1.5 touch-manipulation"
            />
            <div className="flex justify-between text-[10px] font-mono text-rose-300/70">
              <span>{formatTime(playbackState.currentTime)}</span>
              <span>{formatTime(playbackState.duration)}</span>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between pt-0.5">
            {/* Chorus Hook Button */}
            <button
              onClick={handlePlayChorusHook}
              disabled={isPlayingHook}
              className="px-2.5 py-1 rounded-full bg-rose-950/50 hover:bg-rose-900/60 border border-rose-500/30 text-[10px] font-mono text-rose-200 flex items-center gap-1 transition-all cursor-pointer"
              title="Play Taylor Swift Paper Rings Chorus Hook"
            >
              <Sparkles className="w-3 h-3 text-universe-gold" />
              <span>{isPlayingHook ? 'Hook 🎶' : 'Chorus Hook'}</span>
            </button>

            {/* Main Play/Pause Button */}
            <button
              onClick={handleTogglePlay}
              className="w-9 h-9 rounded-full bg-gradient-to-tr from-universe-crimson to-rose-500 text-white flex items-center justify-center shadow-glow-red hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title={playbackState.isPlaying ? 'Pause Paper Rings' : 'Play Taylor Swift — Paper Rings'}
              aria-label={playbackState.isPlaying ? 'Pause Paper Rings' : 'Play Paper Rings'}
            >
              {playbackState.isPlaying ? (
                <Pause className="w-4 h-4 fill-white" />
              ) : (
                <Play className="w-4 h-4 fill-white ml-0.5" />
              )}
            </button>

            {/* Mute / Unmute Button */}
            <button
              onClick={() => {
                sound.toggleMute();
                setPlaybackState(sound.getPlaybackState());
              }}
              className="p-1.5 rounded-full text-rose-300/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title={playbackState.isMuted ? 'Unmute Audio' : 'Mute Audio'}
              aria-label={playbackState.isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {playbackState.isMuted ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-rose-300" />
              )}
            </button>
          </div>

        </div>
      )}
    </aside>
  );
}
