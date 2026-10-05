import React, { useState, useRef, useEffect } from 'react';
import { Volume2, X, Play, Pause, Headphones } from 'lucide-react';
import { sound } from '../../utils/audioEngine';

interface ListenToMeProps {
  audioSrc?: string;
}

export default function ListenToMe({
  audioSrc = '/assets/shivi_voice_note.webm'
}: ListenToMeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpen = () => {
    sound.playHeartClick();
    sound.stopAmbientMusic(); // silence background music
    setIsOpen(true);
    setIsPlaying(true);

    const audio = new Audio(audioSrc);
    audioRef.current = audio;
    audio.play().catch(() => {});
    audio.onended = () => {
      setIsPlaying(false);
    };
  };

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
    setIsOpen(false);
    sound.startAmbientMusic(); // resume ambient music
  };

  const handleTogglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <>
      {/* Trigger Button in World 04 */}
      <div className="py-8 text-center">
        <button
          onClick={handleOpen}
          className="group relative px-6 py-3.5 rounded-full bg-universe-black/80 border border-universe-wine/80 shadow-glow-wine text-universe-blush font-serif italic text-sm sm:text-base hover:border-universe-glowingRed hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 mx-auto touch-manipulation"
        >
          <Headphones className="w-4 h-4 text-universe-glowingRed group-hover:animate-pulse" />
          <span>don't read this one.</span>
        </button>
      </div>

      {/* Pure Cinematic Black Screen Mode */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 select-none animate-fadeIn">
          
          {/* Close button top right */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 text-neutral-500 hover:text-white p-2 rounded-full border border-neutral-800 hover:border-neutral-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Minimalist Waveform & Text */}
          <div className="space-y-8 text-center max-w-md w-full">
            <h2 className="font-serif italic text-2xl sm:text-3xl text-neutral-200 tracking-wide">
              just listen.
            </h2>

            {/* Glowing Audio Waveform */}
            <div className="flex items-center justify-center gap-1.5 h-20">
              {[40, 65, 85, 45, 95, 100, 70, 50, 80, 60, 90, 40, 75, 55, 30].map((h, i) => (
                <span
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-universe-crimson to-universe-blush rounded-full transition-all duration-300"
                  style={{
                    height: isPlaying ? `${Math.max(12, (h * (0.6 + Math.random() * 0.4)))}%` : '12%',
                    opacity: isPlaying ? 0.9 : 0.3
                  }}
                />
              ))}
            </div>

            {/* Play/Pause Minimalist Control */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handleTogglePlay}
                className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-700 hover:border-neutral-400 flex items-center justify-center text-white transition-all hover:scale-105"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
              </button>
            </div>

            <p className="font-serif italic text-xs text-neutral-500">
              {isPlaying ? "Shivi's voice note is playing..." : "Tap play to hear her voice again."}
            </p>
          </div>

        </div>
      )}
    </>
  );
}
