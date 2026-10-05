import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { sound } from '../../utils/audioEngine';

const MIRROR_STAGES = [
  { label: 'YOU', subtext: 'a stranger with gentle eyes who suddenly became everything.' },
  { label: 'ME', subtext: 'someone who had almost forgotten how to believe in forever.' },
  { label: 'US', subtext: 'two girls talking until 4 AM across the miles, refusing to let go.' },
  { label: 'HOME', subtext: 'no longer four walls or a city... just you.' }
];

export default function TheMirror() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isReflecting, setIsReflecting] = useState(false);

  const handleMirrorTap = () => {
    sound.playConstellationChime();
    setIsReflecting(true);
    setTimeout(() => {
      setCurrentStep((prev) => (prev + 1) % (MIRROR_STAGES.length + 1));
      setIsReflecting(false);
    }, 400);
  };

  const isFinal = currentStep >= MIRROR_STAGES.length;
  const currentStage = MIRROR_STAGES[currentStep] || MIRROR_STAGES[0];

  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 flex flex-col items-center justify-center select-none">
      <div className="max-w-xl w-full text-center space-y-6 sm:space-y-8">
        
        {/* Header */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-universe-dustyPink px-3.5 py-1.5 rounded-full border border-universe-wine/40 bg-universe-darkBurgundy/40 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-universe-gold" />
            Glass & Reflection
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-universe-cream">
            The Mirror
          </h2>
          <p className="font-serif italic text-xs sm:text-sm text-universe-blush">
            "Look into the glass. Tap to reveal what is reflected."
          </p>
        </div>

        {/* The Surreal Mirror Object */}
        <div
          onClick={handleMirrorTap}
          className="relative mx-auto w-72 sm:w-80 h-96 sm:h-[420px] rounded-[60px] p-4 bg-gradient-to-b from-white/10 via-universe-wine/20 to-universe-crimson/15 backdrop-blur-md border-4 border-universe-wine/70 shadow-[0_0_50px_rgba(242,181,196,0.25)] flex flex-col items-center justify-center cursor-pointer group hover:scale-102 active:scale-98 transition-all overflow-hidden"
        >
          {/* Glass Shimmer Reflection Angle */}
          <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-45 pointer-events-none group-hover:translate-x-full transition-transform duration-1000" />

          {/* Ripple Effect */}
          {isReflecting && (
            <div className="absolute inset-0 bg-universe-blush/20 backdrop-blur-md animate-ping pointer-events-none" />
          )}

          {/* Mirror Content */}
          {!isFinal ? (
            <div className="space-y-4 px-6 text-center animate-fadeIn">
              <div className="text-4xl sm:text-6xl font-serif font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white via-universe-blush to-universe-gold drop-shadow-md">
                {currentStage.label}
              </div>
              <p className="font-serif italic text-xs sm:text-sm text-universe-cream/90 leading-relaxed">
                "{currentStage.subtext}"
              </p>
              <span className="inline-block mt-4 text-[9px] font-mono text-universe-dustyPink uppercase tracking-wider bg-universe-black/50 px-3 py-1 rounded-full border border-universe-wine/40">
                Tap glass to reflect next ({currentStep + 1} / 4)
              </span>
            </div>
          ) : (
            <div className="space-y-4 px-6 text-center animate-fadeIn">
              <Heart className="w-10 h-10 mx-auto text-universe-glowingRed fill-universe-glowingRed animate-pulse" />
              <div className="font-serif text-2xl sm:text-3xl text-universe-cream font-bold leading-snug">
                "somehow, you became a place."
              </div>
              <p className="font-serif italic text-xs sm:text-sm text-universe-gold">
                Wherever you are is where I belong.
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentStep(0);
                }}
                className="text-[10px] font-mono text-universe-dustyPink underline hover:text-white pt-2 block mx-auto"
              >
                Look again ↺
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
