import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Star, Heart, Sparkles, Gift, Play, RotateCcw } from 'lucide-react';
import { sound } from '../../utils/audioEngine';

const TWENTY_THREE_REASONS = [
  "The way your eyes crinkle when you giggle at my stupid jokes.",
  "How you strictly negotiate: 'bas teen-char kisses, aur zyada nahi!'",
  "The quiet comfort of falling asleep on a 6-hour call with you.",
  "Your soft sniffling response: 'permanent commitment frm my side 🤧'.",
  "How you stayed strong and prayed every second when I was in hospital.",
  "The sweet little text that was waiting for me when I opened my eyes.",
  "How you steal oversized hoodies and look impossibly cute in them.",
  "How we can fight at 2:00 AM and be laughing by 2:10 AM.",
  "The way you say 'pagal kar degi ye ladki' and I reply 'ho jao na'.",
  "The warmth in your voice when you say 'Heyy wifeyy'.",
  "The way you trust me with your quietest fears and wildest dreams.",
  "Our shared dream of walking down the aisle with Paper Rings.",
  "How 800 miles feels like zero miles whenever we talk.",
  "Your honesty, your patience, and your pure golden heart.",
  "The way you roast me effortlessly and then immediately blush.",
  "How you remember the smallest details from months ago.",
  "The feeling of safety whenever I hear your voice.",
  "The way you make ordinary days feel like a movie soundtrack.",
  "How you chose me, not as a temporary friend, but for a lifetime.",
  "Your unconditional love that never wavers through the storms.",
  "The look on your face when you receive a surprise delivery.",
  "How you became my home before I even realized it.",
  "And if you ask me tomorrow... I'll probably have 23 more. ♡"
];

export default function BirthdayWorld() {
  const [litStarCount, setLitStarCount] = useState(0);
  const [countdownPhase, setCountdownPhase] = useState<'stars' | 'R' | 'heart' | 'banner'>('stars');
  const [unlockedReasonIndex, setUnlockedReasonIndex] = useState<number | null>(null);
  const [openedReasons, setOpenedReasons] = useState<number[]>([]);
  const [showFinalProposal, setShowFinalProposal] = useState(false);
  const [finalProposalStep, setFinalProposalStep] = useState(0);

  // 23 Stars Countdown Loop
  const handleStartCountdown = () => {
    sound.playHeartClick();
    setLitStarCount(0);
    setCountdownPhase('stars');

    let count = 0;
    const interval = setInterval(() => {
      count++;
      setLitStarCount(count);
      sound.playTone(300 + count * 25, 0.4, 'sine', 0.08);

      if (count >= 23) {
        clearInterval(interval);
        setTimeout(() => setCountdownPhase('R'), 800);
        setTimeout(() => setCountdownPhase('heart'), 2000);
        setTimeout(() => {
          setCountdownPhase('banner');
          sound.playMatchSound();
          confetti({
            particleCount: 100,
            spread: 80,
            colors: ['#f5b8c6', '#ffd166', '#ff285e']
          });
        }, 3400);
      }
    }, 120);
  };

  const handleOpenReason = (idx: number) => {
    sound.playEnvelopeOpen();
    setUnlockedReasonIndex(idx);
    if (!openedReasons.includes(idx)) {
      setOpenedReasons((prev) => [...prev, idx]);
    }
  };

  // Final Proposal Transition Trigger
  const handleTriggerFinalProposal = () => {
    sound.stopAmbientMusic();
    sound.playHeartbeat(0.2);
    setShowFinalProposal(true);
    setFinalProposalStep(1);

    setTimeout(() => {
      sound.playHeartbeat(0.22);
      setFinalProposalStep(2);
    }, 3000);

    setTimeout(() => {
      sound.playHeartbeat(0.25);
      setFinalProposalStep(3);
    }, 6500);

    setTimeout(() => {
      sound.playHeartbeat(0.28);
      setFinalProposalStep(4);
      sound.playMatchSound();
      confetti({
        particleCount: 150,
        spread: 100,
        colors: ['#ff285e', '#f5b8c6', '#ffd166', '#ffffff']
      });
    }, 11000);
  };

  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 flex flex-col items-center justify-center select-none">
      <div className="max-w-4xl w-full text-center space-y-8 sm:space-y-12">
        
        {/* Header */}
        <div className="space-y-3">
          <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-universe-gold px-3.5 py-1.5 rounded-full border border-universe-gold/40 bg-universe-black/50 inline-flex items-center gap-1.5 shadow-glow-gold">
            <Gift className="w-3.5 h-3.5 text-universe-gold" />
            12 November • Turning 23
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-universe-cream">
            TODAY, THE UNIVERSE IS ABOUT YOU
          </h2>

          <p className="font-serif italic text-sm sm:text-lg text-universe-blush max-w-lg mx-auto">
            "Because 23 years ago, the sweetest, most generous soul arrived into this world."
          </p>
        </div>

        {/* Cinematic 23 Stars Countdown Arena */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#220a1c] via-[#0d0309] to-[#040103] border-2 border-universe-gold/60 shadow-2xl space-y-6">
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-universe-gold">
              Cinematic Star Countdown: {litStarCount} / 23 Lit
            </span>
            <button
              onClick={handleStartCountdown}
              className="px-4 py-1.5 rounded-full bg-universe-wine/40 border border-universe-gold/50 text-[11px] font-mono text-universe-gold hover:bg-universe-crimson hover:text-white transition-all"
            >
              Ignite 23 Stars ✨
            </button>
          </div>

          {/* 23 Stars Grid / Formation */}
          {countdownPhase === 'stars' && (
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 py-4">
              {Array.from({ length: 23 }).map((_, i) => {
                const isLit = i < litStarCount;
                return (
                  <div
                    key={i}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isLit
                        ? 'bg-universe-gold text-black shadow-glow-gold scale-110'
                        : 'bg-universe-wine/20 text-universe-lavender/40 border border-universe-wine/40'
                    }`}
                  >
                    <Star className={`w-4 h-4 sm:w-5 sm:h-5 ${isLit ? 'fill-black' : 'fill-none'}`} />
                  </div>
                );
              })}
            </div>
          )}

          {/* Formation R */}
          {countdownPhase === 'R' && (
            <div className="py-6 text-6xl sm:text-8xl font-serif font-bold text-universe-gold animate-fadeIn drop-shadow-[0_0_35px_rgba(255,209,102,0.8)]">
              R
            </div>
          )}

          {/* Formation Heart */}
          {countdownPhase === 'heart' && (
            <div className="py-6 animate-fadeIn">
              <Heart className="w-20 h-20 sm:w-28 sm:h-28 mx-auto text-universe-glowingRed fill-universe-glowingRed shadow-glow-red animate-pulse" />
            </div>
          )}

          {/* Final Birthday Banner */}
          {countdownPhase === 'banner' && (
            <div className="py-6 space-y-3 animate-fadeIn">
              <div className="text-2xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-universe-blush via-white to-universe-gold">
                HAPPY 23RD BIRTHDAY RASHI! 🎉
              </div>
              <p className="font-serif italic text-sm sm:text-base text-universe-cream/90">
                May all your wishes come true, my wifeyy. Forever by your side.
              </p>
            </div>
          )}
        </div>

        {/* "23 Little Reasons" Interactive Vault */}
        <div className="space-y-4">
          <div className="text-left">
            <h3 className="font-serif text-xl sm:text-2xl text-universe-cream">
              23 Little Reasons
            </h3>
            <p className="font-serif italic text-xs sm:text-sm text-universe-blush">
              Tap each number to reveal one of 23 reasons why I fall in love with you every single day.
            </p>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2.5">
            {TWENTY_THREE_REASONS.map((_, i) => {
              const num = (i + 1).toString().padStart(2, '0');
              const isOpened = openedReasons.includes(i);
              return (
                <button
                  key={i}
                  onClick={() => handleOpenReason(i)}
                  className={`p-3 rounded-2xl border text-center font-mono text-xs sm:text-sm transition-all hover:scale-105 active:scale-95 touch-manipulation ${
                    isOpened
                      ? 'bg-universe-crimson border-universe-glowingRed text-white shadow-glow-red'
                      : 'bg-universe-black/60 border-universe-wine/50 text-universe-cream hover:border-universe-gold'
                  }`}
                >
                  <span className="block font-bold">{num}</span>
                  <span className="text-[9px] text-universe-blush/80">{isOpened ? '✓' : '♡'}</span>
                </button>
              );
            })}
          </div>

          {/* Reason Modal Display */}
          {unlockedReasonIndex !== null && (
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#240c1a] to-[#0c0309] border border-universe-glowingRed/70 shadow-2xl animate-fadeIn space-y-2 text-left">
              <span className="text-[10px] font-mono text-universe-gold uppercase tracking-wider block">
                Reason #{unlockedReasonIndex + 1} of 23:
              </span>
              <p className="font-serif text-sm sm:text-lg text-universe-cream italic leading-relaxed">
                "{TWENTY_THREE_REASONS[unlockedReasonIndex]}"
              </p>
            </div>
          )}
        </div>

        {/* Final Proposal Transition Trigger */}
        <div className="pt-8">
          <button
            onClick={handleTriggerFinalProposal}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-universe-crimson via-universe-glowingRed to-universe-crimson text-white font-serif text-sm sm:text-base font-bold uppercase tracking-widest shadow-glow-red hover:scale-105 active:scale-95 transition-all"
          >
            💍 The Final Whisper
          </button>
        </div>

      </div>

      {/* Fullscreen Final Climax Proposal Modal (Requirement 19) */}
      {showFinalProposal && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 text-center select-none animate-fadeIn">
          
          <div className="max-w-xl w-full space-y-6">
            
            {/* Step 1: Initial Heartbeat & Birthday context */}
            {finalProposalStep >= 1 && (
              <div className="space-y-2 animate-fadeIn">
                <p className="font-serif text-lg sm:text-2xl text-neutral-300 italic">
                  "your birthday is supposed to be about you."
                </p>
                <p className="font-serif text-sm sm:text-lg text-neutral-500 italic">
                  "but there is one thing i need to tell you."
                </p>
              </div>
            )}

            {/* Step 2: Going back to the beginning */}
            {finalProposalStep >= 2 && (
              <div className="space-y-3 pt-4 animate-fadeIn">
                <p className="font-serif text-base sm:text-xl text-universe-blush italic leading-relaxed">
                  "if i could go back to the beginning… i'd still find you."
                </p>
                <p className="font-serif text-base sm:text-xl text-universe-blush italic leading-relaxed">
                  "if i could choose one person again… i'd still choose you."
                </p>
              </div>
            )}

            {/* Step 3: Again and again */}
            {finalProposalStep >= 3 && (
              <div className="space-y-1 text-universe-gold font-serif italic text-lg sm:text-2xl animate-fadeIn">
                <p>"again."</p>
                <p>"and again."</p>
                <p>"and again."</p>
              </div>
            )}

            {/* Step 4: The Ultimate Question */}
            {finalProposalStep >= 4 && (
              <div className="space-y-6 pt-6 animate-fadeIn">
                <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl text-white font-bold leading-tight drop-shadow-[0_0_30px_rgba(255,40,94,0.9)]">
                  WILL YOU LET ME KEEP CHOOSING YOU?
                </h3>

                <p className="font-serif italic text-base sm:text-xl text-universe-blush">
                  come here, my love ♡
                </p>

                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      sound.playPaperRingsTrack();
                      setShowFinalProposal(false);
                    }}
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-universe-crimson to-universe-glowingRed text-white text-xs font-mono font-bold uppercase tracking-wider shadow-glow-red hover:scale-105 transition-all"
                  >
                    Forever Yes 💍
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

    </section>
  );
}
