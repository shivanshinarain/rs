import React, { useState } from 'react';
import { Mail, Heart, Sparkles, Feather, RotateCcw, Activity, ShieldCheck, HeartHandshake } from 'lucide-react';
import { loveStoryData } from '../data/loveStory';
import { sound } from '../utils/audioEngine';
import { HeartDoodle, KissDoodle, CuteAnnotation } from './Doodles';

export default function Chapter07_TheApology({ onEasterEggUnlock }) {
  const [activeTab, setActiveTab] = useState('shivi'); // 'shivi' or 'rashi-coma'
  const [shiviLetterOpen, setShiviLetterOpen] = useState(false);
  const [comaLetterOpen, setComaLetterOpen] = useState(false);
  const [sealClicks, setSealClicks] = useState(0);

  const apologyData = loveStoryData.apologyLetter;
  const comaData = loveStoryData.comaLetter;

  const handleOpenShiviLetter = () => {
    sound.playEnvelopeOpen();
    setShiviLetterOpen(true);
  };

  const handleOpenComaLetter = () => {
    sound.playEnvelopeOpen();
    setComaLetterOpen(true);
  };

  const handleSealClick = (e) => {
    e.stopPropagation();
    sound.playHeartClick();
    const next = sealClicks + 1;
    setSealClicks(next);
    if (next >= 4 && onEasterEggUnlock) {
      onEasterEggUnlock('wax-seal');
    }
  };

  return (
    <section id="chapter-7" className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 flex flex-col justify-center items-center relative z-20">
      <div className="max-w-4xl w-full text-center space-y-8 sm:space-y-10">
        
        {/* Header */}
        <div className="space-y-2 sm:space-y-3">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-universe-dustyPink font-medium px-3.5 py-1.5 rounded-full border border-universe-wine/40 bg-universe-darkBurgundy/40 inline-block">
            Chapter 07 — The Letters of Forever
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-universe-cream">
            Vulnerability, Healing & The Miracle
          </h2>
          <p className="font-sans text-xs sm:text-sm text-universe-lavender/80 max-w-xl mx-auto px-2">
            The deepest words we ever wrote to each other — through long distance fights, tearful apologies, and the darkest hospital night where love refused to let go.
          </p>
        </div>

        {/* Tab Switcher for the Two Letters */}
        <div className="flex justify-center items-center gap-2 sm:gap-4 p-1.5 max-w-md mx-auto rounded-full bg-universe-black/60 border border-universe-wine/50">
          <button
            onClick={() => {
              sound.playHeartClick();
              setActiveTab('shivi');
            }}
            className={`flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-full text-xs font-sans font-medium transition-all duration-300 flex items-center justify-center gap-1.5 touch-manipulation ${
              activeTab === 'shivi'
                ? 'bg-gradient-to-r from-universe-crimson to-universe-glowingRed text-white shadow-glow-red'
                : 'text-universe-lavender/70 hover:text-white'
            }`}
          >
            <Feather className="w-3.5 h-3.5" />
            <span>Shivi's Letter & Apology</span>
          </button>

          <button
            onClick={() => {
              sound.playHeartClick();
              setActiveTab('rashi-coma');
            }}
            className={`flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-full text-xs font-sans font-medium transition-all duration-300 flex items-center justify-center gap-1.5 touch-manipulation ${
              activeTab === 'rashi-coma'
                ? 'bg-gradient-to-r from-purple-700 to-universe-crimson text-white shadow-glow-wine'
                : 'text-universe-lavender/70 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-universe-blush" />
            <span>Rashi's Coma Message 🩹</span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: SHIVI'S LETTER & APOLOGY */}
        {/* ============================================================== */}
        {activeTab === 'shivi' && (
          <div className="relative mx-auto w-full max-w-2xl px-1 animate-fadeIn">
            {!shiviLetterOpen ? (
              <div
                onClick={handleOpenShiviLetter}
                className="relative mx-auto w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#2a0c1a] via-[#1a0711] to-[#0c0308] border-2 border-universe-wine/80 shadow-2xl cursor-pointer group hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300 touch-manipulation"
              >
                {/* Envelope flap aesthetic */}
                <div className="absolute top-0 left-0 right-0 h-20 sm:h-28 bg-[#330e20] rounded-t-3xl border-b border-universe-wine/50 [clip-path:polygon(0_0,100%_0,50%_100%)] opacity-80 pointer-events-none" />

                <div className="relative z-10 pt-8 sm:pt-12 pb-4 sm:pb-6 flex flex-col items-center space-y-4 sm:space-y-6">
                  
                  {/* Wax Seal Stamp */}
                  <div
                    onClick={handleSealClick}
                    className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-universe-crimson via-universe-glowingRed to-universe-wine border-2 border-white/60 shadow-glow-red flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-transform touch-manipulation"
                    title="Click the wax seal..."
                  >
                    <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-full border border-universe-wine flex flex-col items-center justify-center text-center">
                      <span className="font-serif font-bold text-[11px] sm:text-xs tracking-widest text-white drop-shadow">
                        {apologyData.waxSeal}
                      </span>
                      <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white fill-white mt-0.5" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="font-serif text-lg sm:text-xl text-universe-blush italic">
                      To: {apologyData.recipient}
                    </p>
                    <p className="text-[10px] sm:text-xs uppercase tracking-widest text-universe-dustyPink font-mono">
                      Strictly For Rashi's Eyes Only • Interval Tak Nahi
                    </p>
                  </div>

                  <div className="pt-2">
                    <span className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-universe-wine/40 border border-universe-blush/40 text-[11px] sm:text-xs text-universe-cream tracking-widest uppercase flex items-center gap-2 group-hover:bg-universe-crimson transition-colors">
                      <Feather className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-universe-blush" />
                      <span>Break Seal & Read Shivi's Heart</span>
                    </span>
                  </div>

                </div>
              </div>
            ) : (
              /* OPENED LETTER ON VINTAGE PARCHMENT */
              <div className="relative mx-auto w-full parchment-texture rounded-3xl p-6 sm:p-12 text-left text-[#2a171d] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-amber-900/30 animate-fadeIn space-y-4 sm:space-y-6">
                
                {/* Top Controls */}
                <div className="flex justify-between items-center border-b border-[#a8866e]/30 pb-3 sm:pb-4">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-serif text-[#784654]">
                    <Feather className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8a223e]" />
                    <span>Written with love by Shivi</span>
                  </div>
                  <button
                    onClick={() => setShiviLetterOpen(false)}
                    className="flex items-center gap-1 text-[11px] sm:text-xs text-[#784654] hover:text-[#8a223e] uppercase tracking-wider font-sans transition-colors py-1 px-2 touch-manipulation"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Fold back</span>
                  </button>
                </div>

                {/* Salutation */}
                <h3 className="font-handwritten text-2xl sm:text-4xl text-[#5e1428] font-bold">
                  {apologyData.recipient}
                </h3>

                {/* Letter Paragraphs */}
                <div className="space-y-3 sm:space-y-4 font-handwritten text-lg sm:text-2xl text-[#2b1720] leading-relaxed">
                  {apologyData.paragraphs.map((p, idx) => (
                    <p key={idx}>
                      {p}
                    </p>
                  ))}
                </div>

                {/* Signoff */}
                <div className="pt-4 sm:pt-6 border-t border-[#a8866e]/30 space-y-1 sm:space-y-2">
                  <p className="font-handwritten text-lg sm:text-xl text-[#5e1428]">
                    {apologyData.signoff}
                  </p>
                  <p className="font-handwritten text-2xl sm:text-4xl text-[#8a223e] font-bold">
                    {apologyData.senderName}
                  </p>
                </div>

                {/* Wax Seal Ribbon at bottom of letter */}
                <div className="pt-2 sm:pt-4 flex justify-between items-center">
                  <CuteAnnotation text="interval tak nhi ♡" />
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#8a223e] text-white flex items-center justify-center font-serif text-[11px] sm:text-xs font-bold shadow-md">
                    {apologyData.waxSeal}
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: RASHI'S COMA LETTER (THE HOSPITAL NIGHT) */}
        {/* ============================================================== */}
        {activeTab === 'rashi-coma' && (
          <div className="relative mx-auto w-full max-w-2xl px-1 animate-fadeIn space-y-6">
            
            {/* ECG Heartbeat Monitor Header */}
            <div className="p-3 sm:p-4 rounded-2xl bg-[#0e0410] border border-purple-900/50 shadow-inner flex flex-col items-center space-y-2">
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-universe-blush uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-universe-glowingRed animate-ping" />
                <span>Cardiac Rhythm: Beating For Each Other</span>
                <span className="text-universe-dustyPink">• Coma Recovery Miracle</span>
              </div>

              {/* Glowing SVG ECG Line */}
              <div className="w-full h-10 sm:h-12 flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 500 60" className="w-full h-full stroke-universe-glowingRed fill-none" preserveAspectRatio="none">
                  <path
                    d="M 0 30 L 120 30 L 130 10 L 140 50 L 150 20 L 160 30 L 220 30 L 230 5 L 240 55 L 250 15 L 260 30 L 340 30 L 350 12 L 360 48 L 370 25 L 380 30 L 500 30"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    filter="drop-shadow(0 0 6px #ff285e)"
                  />
                </svg>
              </div>
            </div>

            {!comaLetterOpen ? (
              /* SEALED COMA LETTER ENVELOPE */
              <div
                onClick={handleOpenComaLetter}
                className="relative mx-auto w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#240a24] via-[#15051a] to-[#08010d] border-2 border-purple-600/60 shadow-2xl cursor-pointer group hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300 touch-manipulation"
              >
                <div className="absolute top-0 left-0 right-0 h-20 sm:h-28 bg-[#300e35] rounded-t-3xl border-b border-purple-500/40 [clip-path:polygon(0_0,100%_0,50%_100%)] opacity-80 pointer-events-none" />

                <div className="relative z-10 pt-8 sm:pt-12 pb-4 sm:pb-6 flex flex-col items-center space-y-4 sm:space-y-6">
                  
                  {/* Purple/Blush Glowing Heart Seal */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-purple-800 via-universe-crimson to-universe-blush border-2 border-white/60 shadow-glow-wine flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white fill-white animate-pulse" />
                  </div>

                  <div className="space-y-1">
                    <p className="font-serif text-lg sm:text-xl text-universe-blush italic">
                      "{comaData.title}"
                    </p>
                    <p className="text-[10px] sm:text-xs uppercase tracking-widest text-universe-lavender/80 font-mono">
                      Rashi's Exact Message to Shivi in Coma
                    </p>
                  </div>

                  <p className="text-xs text-universe-cream/70 font-sans italic max-w-xs px-2">
                    "When doctors and monitors ticked, Rashi held Shivi's hand across the silence and refused to let go."
                  </p>

                  <div className="pt-2">
                    <span className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-purple-900/50 border border-purple-400/50 text-[11px] sm:text-xs text-universe-cream tracking-widest uppercase flex items-center gap-2 group-hover:bg-universe-crimson transition-colors">
                      <HeartHandshake className="w-3.5 h-3.5 text-universe-blush" />
                      <span>Open Rashi's Hospital Letter</span>
                    </span>
                  </div>

                </div>
              </div>
            ) : (
              /* OPENED COMA LETTER DISPLAY */
              <div className="relative mx-auto w-full rounded-3xl p-6 sm:p-12 text-left bg-gradient-to-b from-[#250d24] via-[#17061a] to-[#0a020d] border-2 border-purple-500/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] animate-fadeIn space-y-5 sm:space-y-7">
                
                {/* Header */}
                <div className="flex justify-between items-center border-b border-purple-500/30 pb-3 sm:pb-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-universe-blush">
                    <ShieldCheck className="w-4 h-4 text-universe-glowingRed" />
                    <span>The Unbreakable Lifetime Promise</span>
                  </div>
                  <button
                    onClick={() => setComaLetterOpen(false)}
                    className="flex items-center gap-1 text-[11px] sm:text-xs text-universe-lavender hover:text-white uppercase tracking-wider font-sans transition-colors py-1 px-2 touch-manipulation"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Fold back</span>
                  </button>
                </div>

                {/* Subtitle & Context */}
                <div className="space-y-1">
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-universe-dustyPink font-mono block">
                    {comaData.subtitle}
                  </span>
                  <p className="text-xs text-universe-lavender/70 italic">
                    {comaData.context}
                  </p>
                </div>

                {/* Exact Letter Quote from Rashi */}
                <div className="p-5 sm:p-8 rounded-2xl bg-black/40 border border-purple-500/40 relative overflow-hidden">
                  <div className="absolute top-2 right-3 text-4xl text-purple-600/30 font-serif">❝</div>
                  <p className="font-serif italic text-base sm:text-xl text-universe-cream leading-relaxed relative z-10 whitespace-pre-line">
                    "{comaData.letterText}"
                  </p>
                </div>

                {/* Emotional Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-sans text-universe-lavender/90">
                  <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40">
                    <span className="text-universe-blush font-semibold block mb-0.5">The Vow:</span>
                    "From now on no more fights or arguments... we promised to stay together for life and we will."
                  </div>
                  <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40">
                    <span className="text-universe-blush font-semibold block mb-0.5">The Understanding:</span>
                    "No one understands me the way you do, only my Shivi truly understands me."
                  </div>
                </div>

                {/* Signoff */}
                <div className="pt-4 border-t border-purple-500/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <p className="font-handwritten text-xl sm:text-2xl text-universe-blush">
                    {comaData.signoff}
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-universe-crimson/20 border border-universe-glowingRed/40 text-[11px] text-universe-cream">
                    <Heart className="w-3 h-3 text-universe-glowingRed fill-universe-glowingRed" />
                    <span>And Shivi woke up for her Rashi.</span>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}

