import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Download, Check, Volume2 } from 'lucide-react';
import { ShiviAvatar, RashiAvatar, CoupleHugAnimation } from './Avatars';
import { loveStoryData } from '../data/loveStory';
import { sound } from '../utils/audioEngine';
import { HeartDoodle, StarDoodle, KissDoodle, CuteAnnotation } from './Doodles';

export default function Chapter14_TheProposal() {
  const [accepted, setAccepted] = useState(false);
  const [showFinalLetter, setShowFinalLetter] = useState(false);
  const [ticketDownloaded, setTicketDownloaded] = useState(false);

  const proposal = loveStoryData.proposal;

  const handleAcceptProposal = () => {
    sound.playProposalSwell();
    setAccepted(true);

    // Multi-stage celebratory confetti
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ff285e', '#f5b8c6', '#f5cb68', '#c21e42', '#ffffff']
    });

    setTimeout(() => {
      confetti({
        particleCount: 70,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff285e', '#f5b8c6']
      });
      confetti({
        particleCount: 70,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff285e', '#f5cb68']
      });
    }, 450);
  };

  const handleDownloadTicket = () => {
    sound.playHeartClick();
    setTicketDownloaded(true);
    setTimeout(() => setTicketDownloaded(false), 3000);
  };

  return (
    <section id="chapter-14" className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 flex flex-col justify-center items-center relative z-20">
      <div className="max-w-3xl w-full text-center space-y-8 sm:space-y-12">
        
        {/* Header */}
        <div className="space-y-2 sm:space-y-3 relative">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-universe-dustyPink font-medium px-3.5 py-1.5 rounded-full border border-universe-wine/40 bg-universe-darkBurgundy/40 inline-block">
            Chapter {proposal.chapterNumber} — {proposal.tagline}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-universe-cream text-glow-crimson font-medium">
            {proposal.recipient}
          </h2>

          <div className="hidden sm:block absolute -top-3 right-6">
            <HeartDoodle className="w-8 h-8 text-universe-glowingRed" />
          </div>
        </div>

        {/* PROPOSAL IN PROGRESS */}
        {!accepted ? (
          <div className="space-y-6 sm:space-y-10 animate-fadeIn">
            
            {/* The Two Girls Walking Together under Stars */}
            <div className="relative py-4 sm:py-8 flex items-center justify-center gap-3 sm:gap-12">
              <div className="w-20 sm:w-36 animate-float shrink-0">
                <ShiviAvatar state="reaching" />
              </div>

              {/* Glowing Red Thread Connecting Their Hands */}
              <div className="flex flex-col items-center shrink-0">
                <svg width="45" height="20" className="overflow-visible w-8 sm:w-16">
                  <line
                    x1="0"
                    y1="10"
                    x2="45"
                    y2="10"
                    stroke="#ff285e"
                    strokeWidth="3"
                    filter="drop-shadow(0 0 8px #ff285e)"
                  />
                  <circle cx="22.5" cy="10" r="3.5" fill="#ffffff" filter="drop-shadow(0 0 6px #ff285e)" />
                </svg>
                <span className="text-[9px] sm:text-[10px] text-universe-blush font-mono mt-1">Together</span>
              </div>

              <div className="w-20 sm:w-36 animate-float-delayed shrink-0">
                <RashiAvatar state="reaching" />
              </div>
            </div>

              {/* Shivi's Proposal Speech Box */}
              <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#250e1f] via-[#160613] to-[#0c0309] border-2 border-universe-wine/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-4 sm:space-y-6 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-universe-glowingRed to-transparent opacity-70" />
                
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-universe-blush font-mono font-semibold block">
                  Shivi's Words to Rashi ♡
                </span>

                <div className="space-y-3 font-serif text-lg sm:text-2xl text-universe-cream/95 leading-relaxed max-w-xl mx-auto">
                  <p className="font-semibold text-universe-blush">
                    "I want u in my life..."
                  </p>
                  <p>
                    "Not as a friend, but as a gf, as a life partner."
                  </p>
                  <p className="text-glow-crimson text-white font-medium">
                    "And meko aap hamesha saath chahiye … interval tak nhi."
                  </p>
                  <p className="font-serif italic text-universe-dustyPink text-base sm:text-xl">
                    "I genuinely like you."
                  </p>
                </div>

                <div className="pt-2 sm:pt-4 border-t border-universe-wine/40">
                  <p className="font-serif text-xl sm:text-3xl text-glow-blush text-universe-blush font-semibold px-2">
                    "Will you be my forever person — not temporary, but our permanent commitment?"
                  </p>
                </div>

                {/* The Big Proposal Button - Rashi's Response */}
                <div className="pt-3 sm:pt-6">
                  <button
                    onClick={handleAcceptProposal}
                    className="group relative w-full sm:w-auto px-7 sm:px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-universe-crimson via-universe-glowingRed to-universe-crimson text-universe-cream font-sans tracking-wider uppercase text-xs sm:text-sm md:text-base font-bold shadow-[0_0_40px_rgba(255,40,94,0.7)] hover:shadow-[0_0_70px_rgba(255,40,94,0.95)] hover:scale-105 active:scale-95 transition-all duration-300 touch-manipulation"
                  >
                    <span className="flex items-center justify-center gap-2 sm:gap-3">
                      <span>Rashi says: "Okay... then yess i'll be with u not temporary, it's permanent commitment frm my side 🤧"</span>
                      <Heart className="w-5 h-5 fill-white text-white group-hover:scale-125 transition-transform shrink-0" />
                    </span>
                  </button>
                  <p className="text-[10px] sm:text-xs text-universe-lavender/60 font-mono mt-2">
                    Click to seal our permanent commitment for eternity
                  </p>
                </div>
              </div>

          </div>
        ) : (
          /* FINAL SCENE: THE WARM HUG & CELESTIAL FOREVER */
          <div className="space-y-6 sm:space-y-10 animate-fadeIn">
            
            {/* The Animated Hug */}
            <CoupleHugAnimation className="w-full" />

            {/* Acceptance Message */}
            <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#250d1e] via-[#150611] to-[#0a0307] border-2 border-universe-glowingRed/50 shadow-glow-wine space-y-4 sm:space-y-5">
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
              <div className="p-4 sm:p-6 rounded-2xl bg-black/40 border border-universe-wine/50 max-w-xl mx-auto space-y-2 text-center">
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

              {/* Actions */}
              <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <button
                  onClick={() => setShowFinalLetter(!showFinalLetter)}
                  className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-full border border-universe-wine/70 bg-universe-wine/30 text-universe-blush text-xs uppercase tracking-widest hover:border-universe-blush transition-all touch-manipulation"
                >
                  {showFinalLetter ? 'Hide Love Letter' : 'Read Our Final Love Letter ♡'}
                </button>

                <button
                  onClick={handleDownloadTicket}
                  className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-full bg-gradient-to-r from-universe-crimson to-universe-glowingRed text-white text-xs uppercase tracking-widest shadow-glow-red hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 touch-manipulation"
                >
                  {ticketDownloaded ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                  <span>{ticketDownloaded ? 'Story Ticket Saved!' : 'Download Eternity Ticket'}</span>
                </button>
              </div>

              {/* Final Love Letter Toggle with Photos and Doodles */}
              {showFinalLetter && (
                <div className="mt-4 sm:mt-6 p-5 sm:p-8 rounded-3xl bg-universe-black/80 border border-universe-wine/50 text-left animate-fadeIn space-y-4">
                  <div className="flex justify-between items-center border-b border-universe-wine/40 pb-3">
                    <h4 className="font-serif text-lg sm:text-xl text-universe-blush">To Rashi, My Forever Person:</h4>
                    <span className="font-handwritten text-base text-universe-dustyPink">22.11.2025</span>
                  </div>

                  {/* Dual Doodle Art Side by Side */}
                  <div className="grid grid-cols-2 gap-3 py-2">
                    <div className="rounded-2xl overflow-hidden border border-universe-wine/50 shadow-md">
                      <img
                        src="/assets/shivi_rashi_doodle_couch.jpg"
                        alt="Couch Doodle"
                        className="w-full h-36 sm:h-44 object-cover"
                      />
                      <div className="p-1.5 bg-universe-darkBurgundy text-center font-handwritten text-xs text-universe-blush">
                        cozy couch cuddles doodle ♡
                      </div>
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-universe-wine/50 shadow-md">
                      <img
                        src="/assets/shivi_rashi_doodle_proposal.jpg"
                        alt="Paper Ring Proposal Doodle"
                        className="w-full h-36 sm:h-44 object-cover"
                      />
                      <div className="p-1.5 bg-universe-darkBurgundy text-center font-handwritten text-xs text-universe-blush">
                        paper ring proposal doodle ♡
                      </div>
                    </div>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-universe-cream/90 leading-relaxed">
                    Thank you for walking through every chapter of this story with me. From a single swipe on Tinder to November 22nd, 2025, to this very second — you have filled my life with light, purpose, and gentleness.
                  </p>
                  <p className="font-sans text-xs sm:text-sm text-universe-cream/90 leading-relaxed">
                    I promise to always hold your hand tight, to laugh at your silly jokes, to make you tea when you are tired, and to choose you over and over in every lifetime we get.
                  </p>

                  <div className="pt-2 flex justify-between items-center">
                    <KissDoodle count={4} />
                    <p className="font-handwritten text-xl sm:text-2xl text-universe-blush text-right">
                      With all my soul, Shivi ♡
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
