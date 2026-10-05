import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, CheckCircle, Send } from 'lucide-react';
import { sound } from '../utils/audioEngine';
import TinyCharacters from './Effects/TinyCharacters';

interface CinematicProposalClimaxProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function CinematicProposalClimax({ isOpen, onClose }: CinematicProposalClimaxProps) {
  const [phase, setPhase] = useState<'darken' | 'dialogue' | 'button' | 'expanded'>('darken');
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [rashiResponse, setRashiResponse] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [foldedRing, setFoldedRing] = useState(false);

  const dialogueLines = [
    { speaker: "Shivi", text: "you followed every little clue…" },
    { speaker: "Shivi", text: "you found every little piece…" },
    { speaker: "Shivi", text: "and somehow every road led back to you." },
    { speaker: "Shivi", text: "RASHI", isName: true },
    { speaker: "Shivi", text: "if i could go back to the beginning… i'd still find you." },
    { speaker: "Shivi", text: "if i could choose one person again… i'd still choose you." },
    { speaker: "Shivi", text: "again." },
    { speaker: "Shivi", text: "and again." },
    { speaker: "Shivi", text: "and again." },
    { speaker: "Shivi", text: "WILL YOU LET ME KEEP CHOOSING YOU?", isHeading: true }
  ];

  // Sequence progression
  useEffect(() => {
    if (!isOpen) return;

    sound.playProposalSwell();

    // Darken phase
    const timer1 = setTimeout(() => {
      setPhase('dialogue');
    }, 2200);

    return () => clearTimeout(timer1);
  }, [isOpen]);

  useEffect(() => {
    if (phase !== 'dialogue') return;

    if (dialogueIndex < dialogueLines.length - 1) {
      const isShort = dialogueLines[dialogueIndex].text.length < 15;
      const delay = isShort ? 1800 : 3000;
      const timer = setTimeout(() => {
        setDialogueIndex((prev) => prev + 1);
        sound.playHeartClick();
      }, delay);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setPhase('button');
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, [phase, dialogueIndex, dialogueLines.length]);

  const handleComeHere = () => {
    sound.playPaperRingsHook();
    sound.playMatchSound();
    setPhase('expanded');

    // Massive fireworks celebration
    const end = Date.now() + 4 * 1000;
    const colors = ['#ff285e', '#f5b8c6', '#ffd166', '#d8cbe4', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleFoldRing = () => {
    sound.playHeartClick();
    setFoldedRing(true);
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#ffd166', '#ff285e', '#ffffff']
    });
  };

  const handleSubmitResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rashiResponse.trim()) return;
    sound.playMatchSound();
    setHasSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ff285e', '#f5b8c6', '#ffffff']
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black text-white p-4 select-none">
      
      {/* Background Ambience */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${
        phase === 'expanded'
          ? 'bg-gradient-to-b from-[#2a081e] via-[#150410] to-[#080206] opacity-100'
          : 'bg-[#050104] opacity-95'
      }`} />

      {/* Glowing Pulsing Red Thread Behind Everything */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <div className="w-[120vw] h-1 bg-gradient-to-r from-transparent via-universe-glowingRed to-transparent shadow-glow-red animate-pulse" />
      </div>

      {/* PHASE 1 & 2 & 3: Darkening, Heartfelt Dialogue & The "Come Here" Button */}
      {phase !== 'expanded' && (
        <div className="relative z-10 max-w-2xl w-full text-center space-y-8 p-6 sm:p-10 animate-fadeIn">
          
          {/* Glowing Red Thread Fate Emblem */}
          <div className="mx-auto w-20 h-20 rounded-full bg-universe-crimson/20 border-2 border-universe-glowingRed flex items-center justify-center shadow-glow-red animate-pulse">
            <Heart className="w-10 h-10 text-universe-glowingRed fill-universe-glowingRed" />
          </div>

          {/* Dialogue Lines Appearing Poetically */}
          {phase === 'dialogue' && (
            <div className="min-h-[160px] flex flex-col items-center justify-center space-y-4">
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-universe-dustyPink">
                {dialogueLines[dialogueIndex].speaker} Whispers:
              </span>
              {dialogueLines[dialogueIndex].isName ? (
                <div className="font-serif text-5xl sm:text-7xl font-bold tracking-widest text-universe-gold drop-shadow-[0_0_40px_rgba(255,209,102,0.9)] animate-scaleUp">
                  {dialogueLines[dialogueIndex].text}
                </div>
              ) : dialogueLines[dialogueIndex].isHeading ? (
                <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-tight drop-shadow-[0_0_30px_rgba(255,40,94,0.9)] animate-fadeIn">
                  {dialogueLines[dialogueIndex].text}
                </h3>
              ) : (
                <p className="font-serif italic text-xl sm:text-3xl text-universe-cream leading-relaxed transition-all duration-700 animate-fadeIn">
                  "{dialogueLines[dialogueIndex].text}"
                </p>
              )}
            </div>
          )}

          {phase === 'darken' && (
            <div className="space-y-3">
              <h2 className="font-serif text-2xl sm:text-4xl text-universe-cream animate-pulse">
                The Universe Is Holding Its Breath...
              </h2>
              <p className="text-xs sm:text-sm font-sans text-universe-lavender/70 font-mono">
                The final lock has turned. Listen to what comes next.
              </p>
            </div>
          )}

          {/* PHASE 3: The Glowing "Come here, my love ♡" Button */}
          {phase === 'button' && (
            <div className="space-y-6 animate-scaleUp">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-[0.25em] font-mono text-universe-gold">
                  The Final Question
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-universe-cream font-bold leading-tight drop-shadow-[0_0_30px_rgba(255,40,94,0.8)]">
                  WILL YOU LET ME KEEP CHOOSING YOU?
                </h2>
                <p className="font-serif italic text-base sm:text-xl text-universe-blush">
                  "again. and again. and again."
                </p>
              </div>

              <button
                onClick={handleComeHere}
                className="group relative inline-flex items-center justify-center px-10 py-5 rounded-full bg-gradient-to-r from-universe-crimson via-universe-glowingRed to-universe-crimson text-white font-serif text-lg sm:text-xl font-medium shadow-glow-red hover:scale-105 active:scale-95 transition-all touch-manipulation"
              >
                <span className="absolute -inset-1 rounded-full bg-universe-glowingRed/50 blur-lg group-hover:opacity-100 transition duration-300 opacity-70 animate-pulse" />
                <span className="relative flex items-center gap-3">
                  <span>come here, my love ♡</span>
                  <Sparkles className="w-5 h-5 text-universe-gold animate-bounce" />
                </span>
              </button>
            </div>
          )}

        </div>
      )}

      {/* PHASE 4: The Grand Universe Expansion */}
      {phase === 'expanded' && (
        <div className="relative z-10 max-w-4xl w-full my-8 p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#200918]/95 via-[#12040e]/95 to-[#070205]/95 border-2 border-universe-glowingRed/80 shadow-2xl space-y-8 animate-fadeIn text-center">
          
          {/* Header */}
          <div className="space-y-3">
            <span className="text-xs uppercase font-mono tracking-[0.3em] text-universe-gold bg-universe-wine/40 px-4 py-1.5 rounded-full border border-universe-gold/40 inline-block shadow-glow-gold">
              ✨ THE PROPOSAL ACCEPTED • PERMANENT COMMITMENT ✨
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-universe-cream">
              You Are My Forever, Rashi ♡
            </h1>
            <p className="font-serif italic text-sm sm:text-lg text-universe-blush max-w-xl mx-auto">
              "I like shiny things, but I'd marry you with paper rings! Darling, you're the one I want!"
            </p>

            <div className="pt-2">
              <TinyCharacters pose="holding-hands" caption="forever choosing each other, under our paper rings" />
            </div>
          </div>

          {/* Hero Cartoon Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            <div className="relative rounded-2xl overflow-hidden border-2 border-universe-wine/80 shadow-2xl group">
              <img
                src="/assets/shivi_rashi_cartoon_proposal.jpg"
                alt="Shivi proposing to Rashi"
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <span className="font-serif text-xs sm:text-sm text-universe-cream italic">
                  Balcony Proposal with Our Origami Paper Ring 💍
                </span>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border-2 border-universe-wine/80 shadow-2xl group">
              <img
                src="/assets/shivi_rashi_cartoon_airport_hug.jpg"
                alt="Airport reunion hug"
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <span className="font-serif text-xs sm:text-sm text-universe-cream italic">
                  Zero Distance Reunion: Running into Your Arms ✈️
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Origami Paper Ring Maker */}
          <div className="p-6 rounded-2xl bg-universe-black/60 border border-universe-wine/70 text-center space-y-4 max-w-lg mx-auto">
            <div className="flex items-center justify-center gap-2 text-universe-gold">
              <Sparkles className="w-5 h-5" />
              <h4 className="font-serif text-lg text-universe-cream">
                Fold Your Origami Paper Ring
              </h4>
            </div>

            <p className="text-xs font-sans text-universe-lavender/80">
              A little strip of paper folded into a circle that holds our entire lifetime together.
            </p>

            {foldedRing ? (
              <div className="space-y-3 p-4 rounded-xl bg-universe-crimson/20 border border-universe-glowingRed/50 animate-scaleUp">
                <div className="text-4xl animate-bounce">💍</div>
                <h5 className="font-serif text-base text-universe-gold">
                  Paper Ring Successfully Folded & Slipped On!
                </h5>
                <p className="text-xs text-universe-blush font-handwritten text-base">
                  "Fits perfectly on your finger forever, Motu ♡"
                </p>
              </div>
            ) : (
              <button
                onClick={handleFoldRing}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-600 via-universe-gold to-amber-600 text-black font-serif text-xs uppercase tracking-wider font-bold shadow-glow-gold hover:scale-105 active:scale-95 transition-all touch-manipulation"
              >
                📜 Fold Shivi & Rashi's Paper Ring
              </button>
            )}
          </div>

          {/* Rashi's Digital Seal of Love */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-universe-wine/30 via-universe-darkBurgundy/60 to-universe-wine/30 border border-universe-blush/40 max-w-lg mx-auto text-left space-y-3">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-universe-glowingRed fill-universe-glowingRed" />
              <h4 className="font-serif text-base text-universe-cream">
                Rashi's Digital Seal of Love
              </h4>
            </div>

            {hasSubmitted ? (
              <div className="p-4 rounded-xl bg-universe-black/50 border border-universe-glowingRed/50 text-center space-y-1">
                <CheckCircle className="w-6 h-6 text-universe-glowingRed mx-auto" />
                <p className="font-serif text-sm text-universe-cream">
                  Your message has been sealed into our universe!
                </p>
                <p className="font-handwritten text-base text-universe-blush">
                  "{rashiResponse}"
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitResponse} className="space-y-3">
                <label className="block text-xs font-mono text-universe-dustyPink">
                  Leave a sweet note or kiss for your Shivi:
                </label>
                <textarea
                  value={rashiResponse}
                  onChange={(e) => setRashiResponse(e.target.value)}
                  placeholder="e.g. I love you so much Shivi, permanent commitment from my side forever 🤧♡"
                  className="w-full h-20 p-3 rounded-xl bg-universe-black/70 border border-universe-wine/60 text-xs text-universe-cream focus:outline-none focus:border-universe-glowingRed resize-none font-sans"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full bg-universe-crimson hover:bg-universe-glowingRed text-white text-xs font-mono uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-glow-red"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Seal Our Forever</span>
                </button>
              </form>
            )}
          </div>

          {/* Close or Revisit */}
          {onClose && (
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full border border-universe-wine/60 text-universe-lavender hover:text-white text-xs font-mono uppercase tracking-wider transition-colors"
            >
              Return to Universe Explorer
            </button>
          )}

        </div>
      )}

    </div>
  );
}
