import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';
import { sound } from '../../utils/audioEngine';
import { GATE_TEXTS } from '../../config/secretGate';

interface UnlockTransitionProps {
  onComplete: () => void;
}

export default function UnlockTransition({ onComplete }: UnlockTransitionProps) {
  const [stage, setStage] = useState<
    'darken' | 'expandingHeart' | 'flash' | 'text1' | 'text2' | 'text3' | 'title' | 'dissolve'
  >('darken');

  const { line1, line2, line3, title, subtitle } = GATE_TEXTS.unlockSequence;

  useEffect(() => {
    // Stage 1: Darken & Heartbeat
    sound.playHeartbeat();

    const t1 = setTimeout(() => {
      setStage('expandingHeart');
    }, 600);

    // Stage 2: Heart expands & flash
    const t2 = setTimeout(() => {
      setStage('flash');
      sound.playChime();
    }, 2200);

    // Stage 3: Flash clears to text1 "oh…"
    const t3 = setTimeout(() => {
      setStage('text1');
    }, 2600);

    // Stage 4: text2 "it's you."
    const t4 = setTimeout(() => {
      setStage('text2');
      sound.playHeartClick();
    }, 4200);

    // Stage 5: text3 "come in, penguin. ♡"
    const t5 = setTimeout(() => {
      setStage('text3');
      sound.playHeartClick();
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff285e', '#f5b8c6', '#ffffff']
      });
    }, 6000);

    // Stage 6: Title "A UNIVERSE CALLED US / made for each other"
    const t6 = setTimeout(() => {
      setStage('title');
    }, 8000);

    // Stage 7: Dissolve into website
    const t7 = setTimeout(() => {
      setStage('dissolve');
    }, 10500);

    const tFinal = setTimeout(() => {
      onComplete();
    }, 11800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
      clearTimeout(tFinal);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center select-none transition-all duration-1000 ${
      stage === 'flash'
        ? 'bg-white/95'
        : stage === 'dissolve'
        ? 'opacity-0 pointer-events-none bg-black'
        : 'bg-[#040103]'
    }`}>
      
      {/* Expanding Heart Stage */}
      {stage === 'expandingHeart' && (
        <div className="relative flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-universe-glowingRed/40 blur-xl animate-ping" />
          <Heart className="w-12 h-12 text-universe-glowingRed fill-universe-glowingRed shadow-glow-red scale-150 animate-pulse transition-transform duration-1000" />
        </div>
      )}

      {/* Cinematic Text Reveal Stages */}
      {(stage === 'text1' || stage === 'text2' || stage === 'text3') && (
        <div className="relative z-10 max-w-lg w-full text-center space-y-4 px-6 animate-fadeIn">
          {stage === 'text1' && (
            <p className="font-serif italic text-3xl sm:text-4xl text-universe-cream animate-fadeIn">
              "{line1}"
            </p>
          )}

          {stage === 'text2' && (
            <div className="space-y-2 animate-fadeIn">
              <p className="font-serif italic text-2xl text-universe-lavender/60">
                "{line1}"
              </p>
              <p className="font-serif italic text-3xl sm:text-5xl text-universe-cream">
                "{line2}"
              </p>
            </div>
          )}

          {stage === 'text3' && (
            <div className="space-y-3 animate-fadeIn">
              <p className="font-serif italic text-xl text-universe-lavender/50">
                "{line2}"
              </p>
              <p className="font-serif italic text-3xl sm:text-5xl text-universe-blush font-light">
                "{line3}"
              </p>
              <div className="pt-2">
                <Heart className="w-6 h-6 text-universe-glowingRed fill-universe-glowingRed mx-auto animate-bounce" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Title Dissolve Stage */}
      {(stage === 'title' || stage === 'dissolve') && (
        <div className="relative z-10 max-w-2xl w-full text-center space-y-4 px-6 animate-scaleUp">
          <span className="text-[10px] sm:text-xs uppercase font-mono tracking-[0.35em] text-universe-dustyPink">
            The Door Has Opened
          </span>
          <h1 className="font-serif text-3xl sm:text-6xl text-universe-cream tracking-wide">
            {title}
          </h1>
          <p className="font-serif italic text-sm sm:text-lg text-universe-blush">
            {subtitle}
          </p>
        </div>
      )}

    </div>
  );
}
