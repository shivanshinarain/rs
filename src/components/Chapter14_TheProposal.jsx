import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { ShiviAvatar, RashiAvatar, CoupleHugAnimation } from './Avatars';
import { loveStoryData } from '../data/loveStory';
import { sound } from '../utils/audioEngine';
import { HeartDoodle, KissDoodle } from './Doodles';
import TinyCharacters from './Effects/TinyCharacters';

export default function Chapter14_TheProposal() {
  const [accepted, setAccepted] = useState(false);

  const proposal = loveStoryData.proposal;

  const handleAcceptProposal = () => {
    sound.playProposalSwell();
    sound.playPaperRingsHook();
    setAccepted(true);

    // Multi-stage celebratory confetti fireworks
    confetti({
      particleCount: 140,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ff285e', '#f5b8c6', '#ffd166', '#c21e42', '#ffffff']
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff285e', '#f5b8c6']
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff285e', '#ffd166']
      });
    }, 450);
  };

  return (
    <section id="chapter-14" className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 flex flex-col justify-center items-center relative z-20 select-none">
      <div className="max-w-3xl w-full text-center space-y-8 sm:space-y-12">
        
        {/* Header */}
        <div className="space-y-2 sm:space-y-3 relative">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-universe-gold font-medium px-3.5 py-1.5 rounded-full border border-universe-gold/40 bg-universe-darkBurgundy/60 inline-block shadow-glow-gold">
            Chapter {proposal.chapterNumber} — The Final Letter & Sacred Vow
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-universe-cream text-glow-crimson font-medium">
            {proposal.recipient}
          </h2>

          <div className="hidden sm:block absolute -top-3 right-6">
            <HeartDoodle className="w-8 h-8 text-universe-glowingRed" />
          </div>
        </div>

        {/* PROPOSAL / FINAL LOVE LETTER IN PROGRESS */}
        {!accepted ? (
          <div className="space-y-8 sm:space-y-12 animate-fadeIn">
            
            {/* REQUIREMENT 7: CARTOON CHARACTERS CONSISTENTLY AS THE CINEMATIC VISUAL FOCUS */}
            <div className="space-y-3">
              <div className="relative py-4 sm:py-6 flex items-center justify-center gap-3 sm:gap-12">
                {/* Shivi Cartoon Character */}
                <div className="w-20 sm:w-36 animate-float shrink-0">
                  <ShiviAvatar state="reaching" />
                </div>

                {/* Glowing Red Thread Connecting Hands Under Stars */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="flex items-center gap-1 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-universe-gold animate-spin" style={{ animationDuration: '6s' }} />
                    <Heart className="w-3.5 h-3.5 text-universe-glowingRed fill-universe-glowingRed animate-pulse" />
                  </div>
                  <svg width="45" height="20" className="overflow-visible w-10 sm:w-20">
                    <line
                      x1="0"
                      y1="10"
                      x2="45"
                      y2="10"
                      stroke="#ff285e"
                      strokeWidth="3"
                      filter="drop-shadow(0 0 10px #ff285e)"
                    />
                    <circle cx="22.5" cy="10" r="4" fill="#ffffff" filter="drop-shadow(0 0 8px #ff285e)" />
                  </svg>
                  <span className="text-[9px] sm:text-[10px] text-universe-blush font-mono mt-1">
                    Fate Thread
                  </span>
                </div>

                {/* Rashi Cartoon Character */}
                <div className="w-20 sm:w-36 animate-float-delayed shrink-0">
                  <RashiAvatar state="reaching" />
                </div>
              </div>

              <div className="text-center">
                <span className="text-xs font-serif italic text-universe-blush">
                  "sitting under our sky, holding hands through every lifetime"
                </span>
              </div>
            </div>

            {/* REQUIREMENT 7: THE FINAL LOVE LETTER WITH PAPER TEXTURE, HANDWRITING STYLE, AND GLOWING EDGES */}
            <div className="relative p-6 sm:p-10 md:p-12 rounded-3xl bg-gradient-to-b from-[#2a1322] via-[#1c0a15] to-[#12050e] border-2 border-universe-gold/60 shadow-[0_0_50px_rgba(255,209,102,0.25)] space-y-6 text-left overflow-hidden">
              
              {/* Subtle Paper Texture & Watermark */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffd166_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-universe-gold/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-universe-crimson/10 rounded-full blur-3xl pointer-events-none" />

              {/* Letter Header & Wax Seal */}
              <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-universe-gold/30 pb-4 gap-2">
                <div className="flex items-center gap-3">
                  {/* Wax Seal */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-universe-crimson to-universe-wine border-2 border-universe-gold/80 flex items-center justify-center text-universe-gold font-serif font-bold text-xs shadow-glow-gold shrink-0">
                    S ♡ R
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-universe-gold block">
                      To My Forever Person
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-universe-cream font-medium">
                      My Dearest Rashi (Meri Jaan),
                    </h3>
                  </div>
                </div>

                <span className="font-mono text-xs text-universe-dustyPink">
                  22 November 2025 • Poori Zindagi Tak
                </span>
              </div>

              {/* Letter Body in Handwriting Style */}
              <div className="relative z-10 space-y-4 font-serif text-sm sm:text-base md:text-lg text-universe-cream/95 leading-relaxed italic">
                <p>
                  "If you are reading this, take a slow, quiet breath and know how deeply, completely loved you are in every second of your existence.
                </p>

                <p>
                  From that single casual right swipe on Tinder to November 22nd, 2025, to this very heartbeat — you have filled my life with light, purpose, and gentleness.
                </p>

                <p>
                  We didn't have a simple, friction-free story. We fought every other day over silly misunderstandings, we panicked through 3 AM almost-endings, and we survived that terrifying hospital night where all that kept me anchored to this world was your prayers and your sweet letter. But every storm only proved one eternal truth: there is no universe where I don't love you.
                </p>

                <p>
                  I don't need diamonds, or shiny grand gestures, or anything this world calls fancy. I just want snuggling under our cream fleece blanket, making you hot tea when you're tired, laughing at your roasts until you blush, and asking for my 3-4 kisses every single morning.
                </p>

                <p className="font-medium text-universe-gold">
                  I want you for the entire movie. Interval tak nahi — poori zindagi tak."
                </p>
              </div>

              {/* Signoff */}
              <div className="relative z-10 pt-4 border-t border-universe-wine/40 flex justify-between items-center">
                <KissDoodle count={4} />
                <div className="text-right">
                  <span className="text-[10px] font-mono text-universe-lavender/60 block">With all my soul,</span>
                  <p className="font-handwritten text-xl sm:text-2xl text-universe-blush">
                    Your Wifey, Shivi ♡
                  </p>
                </div>
              </div>

              {/* REQUIREMENT 7: LEADING INTO THE FINAL PROPOSAL: "WILL YOU LET ME KEEP CHOOSING YOU?" */}
              <div className="relative z-10 pt-6 border-t-2 border-universe-gold/40 text-center space-y-4">
                <span className="text-xs uppercase tracking-[0.25em] font-mono text-universe-gold block">
                  The Final Question
                </span>

                <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-tight drop-shadow-[0_0_35px_rgba(255,40,94,0.9)]">
                  WILL YOU LET ME KEEP CHOOSING YOU?
                </h3>

                <p className="font-serif italic text-base sm:text-xl text-universe-blush">
                  "again. and again. and again."
                </p>

                {/* Big Proposal Response Button */}
                <div className="pt-3">
                  <button
                    onClick={handleAcceptProposal}
                    className="group relative w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 rounded-full bg-gradient-to-r from-universe-crimson via-universe-glowingRed to-universe-crimson text-white font-serif text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider shadow-[0_0_40px_rgba(255,40,94,0.7)] hover:shadow-[0_0_70px_rgba(255,40,94,0.95)] hover:scale-105 active:scale-95 transition-all duration-300 touch-manipulation"
                  >
                    <span className="flex items-center justify-center gap-2 sm:gap-3">
                      <span>Yes, Forever — Permanent Commitment 💍</span>
                      <Heart className="w-5 h-5 fill-white text-white group-hover:scale-125 transition-transform shrink-0" />
                    </span>
                  </button>
                  <p className="text-[10px] sm:text-xs text-universe-lavender/60 font-mono mt-2">
                    Not temporary. Interval tak nahi poori zindagi tak.
                  </p>
                </div>
              </div>

            </div>

          </div>
        ) : (
          /* ============================================================== */
          /* FINAL SCENE: THE CELESTIAL PROPOSAL ACCEPTANCE */
          /* ============================================================== */
          <div className="space-y-6 sm:space-y-10 animate-fadeIn">
            
            {/* The Animated Couple Embrace */}
            <CoupleHugAnimation className="w-full" />

            {/* Acceptance Box */}
            <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#250d1e] via-[#150611] to-[#0a0307] border-2 border-universe-glowingRed/70 shadow-glow-wine space-y-4 sm:space-y-5">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-universe-glowingRed/20 border border-universe-glowingRed flex items-center justify-center animate-bounce">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-universe-glowingRed fill-universe-glowingRed" />
              </div>

              <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl text-universe-cream text-glow-crimson leading-tight">
                "Not temporary, it's permanent commitment frm my side 🤧"
              </h3>

              <p className="font-handwritten text-xl sm:text-3xl text-universe-blush">
                A UNIVERSE CALLED US — 22.11.2025 • Interval Tak Nahi
              </p>

              {/* LDR & Banter Pillars */}
              <div className="p-4 sm:p-6 rounded-2xl bg-black/50 border border-universe-wine/50 max-w-xl mx-auto space-y-2 text-center">
                <p className="font-serif italic text-sm sm:text-base text-universe-cream/90">
                  "We fight every other day, and then we love like nothing happened and nothing can come in between us."
                </p>
                <div className="flex flex-wrap justify-center items-center gap-2 pt-1 font-mono text-[11px] sm:text-xs text-universe-dustyPink">
                  <span className="px-3 py-1 rounded-full bg-universe-wine/30 border border-universe-wine/50">
                    Rashi: "pagal kar degi ye ladki 😭"
                  </span>
                  <span className="px-3 py-1 rounded-full bg-universe-crimson/30 border border-universe-glowingRed/40 text-universe-blush">
                    Shivi: "ho jao na mere pyaar mein pagal ♡"
                  </span>
                </div>
              </div>

              {/* Cute Characters Together */}
              <div className="pt-2">
                <TinyCharacters pose="holding-hands" caption="forever choosing each other, today and all our tomorrows ♡" />
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
