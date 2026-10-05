import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Heart,
  Sparkles,
  X,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Volume2,
  Flame,
  Award,
  Music,
  HelpCircle,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { sound } from '../../utils/audioEngine';
import { KPOP_CONFIG, KpopHero } from '../../config/kpopConfig';

interface SaveRashiMiniGameProps {
  isOpen: boolean;
  onClose: () => void;
  onEasterEggUnlock?: (id: string) => void;
}

export default function SaveRashiMiniGame({
  isOpen,
  onClose,
  onEasterEggUnlock
}: SaveRashiMiniGameProps) {
  // Game Steps: 'intro' | 'food' | 'medicine' | 'chaos' | 'kpop' | 'saved'
  const [step, setStep] = useState<'intro' | 'food' | 'medicine' | 'chaos' | 'kpop' | 'saved'>('intro');

  // Stats / Chaos State
  const [hasEaten, setHasEaten] = useState(false);
  const [hasMedicine, setHasMedicine] = useState(false);
  const [hasSquad, setHasSquad] = useState(false);

  // Cartoon Reaction Animation
  const [rashiReaction, setRashiReaction] = useState<'normal' | 'pout' | 'eating' | 'sparkle' | 'bonked'>('pout');
  const [shiviReaction, setShiviReaction] = useState<'normal' | 'panic' | 'bonking' | 'relieved'>('panic');
  const [shiviSpeech, setShiviSpeech] = useState<string>("RASHI. YOU FORGOT TO EAT AGAIN 😭");
  const [screenShake, setScreenShake] = useState(false);

  // Food Mini-Game State
  const [fedCount, setFedCount] = useState(0);
  const [foodItems, setFoodItems] = useState([
    { id: 'maggi', name: 'Cheese Maggi Bowl', icon: '🍜', yum: true },
    { id: 'fries', name: 'French Fries', icon: '🍟', yum: true },
    { id: 'chai', name: 'Garam Chai & Paratha', icon: '☕', yum: true },
    { id: 'khichdi', name: "Mom's Khichdi", icon: '🍲', yum: true }
  ]);
  const [foodBanner, setFoodBanner] = useState<string | null>(null);

  // Medicine Mini-Game State
  const [foundWater, setFoundWater] = useState(false);
  const [foundPill, setFoundPill] = useState(false);
  const [drawerStates, setDrawerStates] = useState<{ [key: string]: boolean }>({
    hoodie: false,
    bear: false,
    box: false
  });

  // K-Pop Mini-Game State
  const [selectedHero, setSelectedHero] = useState<KpopHero | null>(null);
  const [kpopChoiceOutcome, setKpopChoiceOutcome] = useState<string | null>(null);
  const [danceStep, setDanceStep] = useState(0);
  const [danceSuccess, setDanceSuccess] = useState(false);
  const [revealedLetters, setRevealedLetters] = useState<number[]>([]);
  const [secretPosterFound, setSecretPosterFound] = useState(false);
  const [squadActivated, setSquadActivated] = useState(false);

  // Secret Achievements (saved to localStorage)
  const [achievements, setAchievements] = useState<{ [key: string]: boolean }>({
    survivedPanic: false,
    sheAte: false,
    medicineTaken: false,
    squadSummoned: false
  });

  // Trigger playful cartoon bonk
  const triggerBonk = (customText = "baby eat!") => {
    sound.playHeartClick();
    setShiviReaction('bonking');
    setRashiReaction('bonked');
    setScreenShake(true);
    setTimeout(() => setScreenShake(false), 300);
    setTimeout(() => {
      setShiviReaction('panic');
      setRashiReaction('pout');
    }, 700);
  };

  // Reset mini-game state
  const handleReset = () => {
    sound.playHeartClick();
    setStep('intro');
    setHasEaten(false);
    setHasMedicine(false);
    setHasSquad(false);
    setFedCount(0);
    setFoundWater(false);
    setFoundPill(false);
    setSelectedHero(null);
    setKpopChoiceOutcome(null);
    setDanceStep(0);
    setDanceSuccess(false);
    setRevealedLetters([]);
    setSquadActivated(false);
    setRashiReaction('pout');
    setShiviReaction('panic');
    setShiviSpeech("RASHI. YOU FORGOT TO EAT AGAIN 😭");
  };

  // Food feed handler
  const handleFeedFood = (food: { name: string; icon: string }) => {
    sound.playChime();
    setRashiReaction('eating');
    setShiviSpeech(`SHE TOOK A BITE OF ${food.name}! 😭`);
    const nextCount = fedCount + 1;
    setFedCount(nextCount);

    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ffd166', '#ff285e', '#ffffff']
    });

    if (nextCount >= 2) {
      setHasEaten(true);
      setFoodBanner("SHE ATE. 😭 crisis temporarily avoided.");
      sound.playMatchSound();
      setAchievements((prev) => ({ ...prev, sheAte: true }));
      setTimeout(() => {
        setRashiReaction('sparkle');
        setShiviReaction('relieved');
        setStep('medicine');
      }, 1800);
    }
  };

  // Medicine Drawer search
  const handleSearchItem = (spot: 'hoodie' | 'bear' | 'box') => {
    sound.playHeartClick();
    setDrawerStates((prev) => ({ ...prev, [spot]: true }));

    if (spot === 'hoodie') {
      setFoundWater(true);
      sound.playChime();
    } else if (spot === 'bear') {
      setFoundPill(true);
      sound.playChime();
    } else {
      triggerBonk("that's just my paper rings!");
    }
  };

  // Deliver medicine once found
  const handleGiveMedicine = () => {
    if (!foundWater || !foundPill) return;
    sound.playMatchSound();
    setHasMedicine(true);
    setRashiReaction('sparkle');
    setShiviReaction('relieved');
    setShiviSpeech("MEDICINE TAKEN ♡ good girl.");
    setAchievements((prev) => ({ ...prev, medicineTaken: true }));

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#a855f7', '#ff285e', '#3b82f6', '#ffffff']
    });

    setTimeout(() => {
      setStep('chaos');
    }, 1800);
  };

  // Handle K-Pop Choice
  const handleKpopChoice = (option: 'eat' | 'ignore' | 'panic') => {
    sound.playHeartClick();
    if (option === 'panic') {
      triggerBonk("RASHI PLEASE.");
      setShiviSpeech("RASHI PLEASE 😭😭");
      setKpopChoiceOutcome("Cameo idol looks at Rashi: '...eat.'");
      setTimeout(() => {
        setHasSquad(true);
      }, 1000);
    } else if (option === 'eat') {
      sound.playMatchSound();
      setKpopChoiceOutcome("Cameo idol winks: 'Good job listening to your wifey ♡'");
      setHasSquad(true);
    } else {
      setKpopChoiceOutcome("Cameo idol: 'We are watching you 👀 Go take care of yourself.'");
    }
  };

  // Handle Dance Sequence
  const handleDanceBeat = (direction: number) => {
    sound.playTone(350 + direction * 80, 0.2);
    const next = danceStep + 1;
    setDanceStep(next);
    if (next >= 3) {
      sound.playMatchSound();
      setDanceSuccess(true);
      setHasSquad(true);
      confetti({ particleCount: 50, spread: 80, colors: ['#9333ea', '#ff285e'] });
    }
  };

  // Reveal letter puzzle
  const handleRevealLetter = (index: number) => {
    sound.playChime();
    if (!revealedLetters.includes(index)) {
      const next = [...revealedLetters, index];
      setRevealedLetters(next);
      if (next.length >= 8) {
        setHasSquad(true);
        sound.playMatchSound();
      }
    }
  };

  // Secret Poster Easter Egg (Req 10)
  const handleSecretPosterClick = () => {
    sound.playConstellationChime();
    setSecretPosterFound(true);
    setSquadActivated(true);
    setHasSquad(true);
    setAchievements((prev) => ({ ...prev, squadSummoned: true }));
    if (onEasterEggUnlock) onEasterEggUnlock('save-rashi');

    confetti({
      particleCount: 100,
      spread: 100,
      colors: ['#ec4899', '#9333ea', '#ffd166', '#ff285e']
    });
  };

  // Final Victory Check
  useEffect(() => {
    if (hasEaten && hasMedicine && hasSquad && step !== 'saved') {
      setTimeout(() => {
        setStep('saved');
        sound.playProposalSwell();
        setAchievements((prev) => ({
          ...prev,
          survivedPanic: true
        }));
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#ff285e', '#ffd166', '#f5b8c6', '#a855f7', '#ffffff']
        });
      }, 1200);
    }
  }, [hasEaten, hasMedicine, hasSquad, step]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-universe-black/95 backdrop-blur-xl animate-fadeIn select-none overflow-y-auto">
      <div
        className={`max-w-2xl w-full rounded-3xl bg-gradient-to-b from-[#240a1b] via-[#140410] to-[#070106] border-2 border-universe-wine/80 shadow-[0_0_60px_rgba(255,40,94,0.3)] p-5 sm:p-8 relative text-center space-y-6 my-auto max-h-[92vh] overflow-y-auto transition-transform ${
          screenShake ? 'animate-wiggle' : ''
        }`}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-universe-lavender hover:text-white bg-universe-wine/30 transition-all touch-manipulation z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* =================================================================== */}
        {/* GAME HEADER & TITLES */}
        {/* =================================================================== */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-universe-crimson/20 border border-universe-glowingRed/50 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-universe-blush shadow-glow-red">
            <ShieldAlert className="w-3.5 h-3.5 text-universe-glowingRed animate-pulse" />
            <span>Top Secret Romantic Emergency</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl text-white font-bold tracking-tight drop-shadow-[0_0_20px_rgba(255,40,94,0.8)]">
            SAVE RASHI ♡
          </h1>

          <div className="space-y-0.5 text-xs sm:text-sm font-handwritten text-universe-blush/90 italic">
            <p>she forgot to eat again.</p>
            <p>she forgot her medicine again.</p>
            <p className="text-universe-gold font-medium">
              and somehow you're the one who has to save her. 😭
            </p>
          </div>
        </div>

        {/* =================================================================== */}
        {/* RASHI'S TROUBLE / CHAOS METER */}
        {/* =================================================================== */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-black/60 border border-universe-wine/50 text-left space-y-2.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-universe-gold font-bold flex items-center gap-1.5 uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-universe-crimson animate-bounce" />
              Rashi's Current Chaos Meter
            </span>
            <span className="text-[11px] text-universe-dustyPink">
              {hasEaten && hasMedicine ? 'Chaos: Decreasing ♡' : 'Status: High Drama'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] font-mono">
            <div className={`p-2 rounded-xl border flex flex-col items-center text-center ${hasEaten ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300' : 'bg-universe-wine/20 border-universe-wine/40 text-universe-blush'}`}>
              <span>🍜 Food</span>
              <span className="font-bold">{hasEaten ? 'Eaten ♡' : 'Ignored ⚠️'}</span>
            </div>
            <div className={`p-2 rounded-xl border flex flex-col items-center text-center ${hasMedicine ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300' : 'bg-universe-wine/20 border-universe-wine/40 text-universe-blush'}`}>
              <span>💊 Medicine</span>
              <span className="font-bold">{hasMedicine ? 'Taken ♡' : 'Ignored ⚠️'}</span>
            </div>
            <div className="p-2 rounded-xl bg-purple-950/30 border border-purple-800/40 text-purple-300 flex flex-col items-center text-center">
              <span>😴 Sleep</span>
              <span className="font-bold">Questionable</span>
            </div>
            <div className={`p-2 rounded-xl border flex flex-col items-center text-center ${foundWater ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300' : 'bg-universe-wine/20 border-universe-wine/40 text-universe-lavender'}`}>
              <span>💧 Water</span>
              <span className="font-bold">{foundWater ? 'Hydrated' : 'Forgotten'}</span>
            </div>
            <div className="col-span-2 sm:col-span-1 p-2 rounded-xl bg-rose-950/40 border border-rose-500/50 text-rose-300 flex flex-col items-center text-center">
              <span>❤️ Drama</span>
              <span className="font-bold text-universe-glowingRed animate-pulse">100%</span>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* CARTOON CHARACTERS ARENA */}
        {/* =================================================================== */}
        <div className="relative py-4 px-2 flex items-center justify-around rounded-3xl bg-gradient-to-r from-purple-950/20 via-black/40 to-universe-wine/20 border border-universe-wine/40 overflow-hidden">
          
          {/* Shivi Dramatic Cartoon */}
          <div className="flex flex-col items-center group">
            {/* Shivi Speech Bubble */}
            <div className="mb-2 max-w-[170px] sm:max-w-[210px] p-2.5 rounded-2xl bg-universe-darkBurgundy border-2 border-universe-glowingRed shadow-glow-red text-[11px] sm:text-xs font-serif italic text-white animate-bounce">
              "{shiviSpeech}"
            </div>

            {/* Shivi Character SVG */}
            <div className={`relative transition-transform duration-300 ${shiviReaction === 'panic' ? 'animate-wiggle' : ''}`}>
              <svg className="w-16 h-20 sm:w-20 sm:h-24 drop-shadow-xl" viewBox="0 0 60 80" fill="none">
                <circle cx="30" cy="18" r="9" fill="#1b0813" />
                <circle cx="30" cy="24" r="14" fill="#ffd5cb" />
                <circle cx="16" cy="27" r="4" stroke="#e0e7ff" strokeWidth="1.5" fill="none" />
                <circle cx="44" cy="27" r="4" stroke="#e0e7ff" strokeWidth="1.5" fill="none" />
                {/* Panic Eyes */}
                {shiviReaction === 'panic' ? (
                  <>
                    <circle cx="24" cy="23" r="2.5" fill="#2a0d1d" />
                    <circle cx="36" cy="23" r="2.5" fill="#2a0d1d" />
                    <path d="M 27 30 Q 30 26 33 30" stroke="#7a1934" strokeWidth="1.5" fill="none" />
                  </>
                ) : (
                  <>
                    <path d="M 23 23 Q 26 21 28 23" stroke="#2a0d1d" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M 32 23 Q 34 21 37 23" stroke="#2a0d1d" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M 27 28 Q 30 31 33 28" stroke="#7a1934" strokeWidth="1.4" strokeLinecap="round" />
                  </>
                )}
                <path d="M 16 38 C 16 35, 44 35, 44 38 L 48 68 C 48 72, 12 72, 12 68 Z" fill="#4a0f21" />
                <rect x="22" y="68" width="5" height="10" rx="2.5" fill="#15060f" />
                <rect x="33" y="68" width="5" height="10" rx="2.5" fill="#15060f" />
              </svg>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-universe-blush">
                Shivi
              </span>
            </div>
          </div>

          {/* Harmless Pillow Bonk Action Indicator */}
          {rashiReaction === 'bonked' && (
            <div className="flex flex-col items-center animate-bounce z-20">
              <span className="text-3xl">☁️</span>
              <span className="text-xs font-mono font-bold text-universe-gold uppercase tracking-widest drop-shadow">
                *bonk!*
              </span>
              <span className="text-[10px] text-universe-blush italic">"baby eat!"</span>
            </div>
          )}

          {/* Rashi Cute Cartoon */}
          <div className="flex flex-col items-center">
            {/* Rashi Speech Bubble */}
            <div className="mb-2 max-w-[150px] sm:max-w-[180px] p-2 rounded-2xl bg-black/70 border border-universe-wine/60 text-[10px] sm:text-xs font-handwritten text-universe-blush">
              {rashiReaction === 'pout' && "i'm not hungry... later."}
              {rashiReaction === 'eating' && "nom nom... fine ♡"}
              {rashiReaction === 'sparkle' && "okay i feel much better!"}
              {rashiReaction === 'bonked' && "ouchie... okay fine 😭"}
            </div>

            {/* Rashi Character SVG */}
            <div className="relative">
              <svg className="w-16 h-20 sm:w-20 sm:h-24 drop-shadow-xl" viewBox="0 0 60 80" fill="none">
                <path d="M 14 18 C 14 8, 46 8, 46 18 C 48 30, 48 48, 46 56 C 44 48, 44 26, 44 24 C 44 14, 16 14, 16 24 C 16 26, 16 48, 14 56 C 12 48, 12 30, 14 18 Z" fill="#240c18" />
                <circle cx="30" cy="24" r="13" fill="#ffdfd6" />
                {/* Pouting or Eating face */}
                {rashiReaction === 'pout' ? (
                  <>
                    <path d="M 23 22 Q 26 24 28 22" stroke="#240c18" strokeWidth="1.5" />
                    <path d="M 32 22 Q 34 24 37 22" stroke="#240c18" strokeWidth="1.5" />
                    <circle cx="21" cy="26" r="2.5" fill="#ff708f" opacity="0.8" />
                    <circle cx="39" cy="26" r="2.5" fill="#ff708f" opacity="0.8" />
                    <path d="M 28 29 Q 30 26 32 29" stroke="#7a1934" strokeWidth="1.5" />
                  </>
                ) : (
                  <>
                    <circle cx="25" cy="23" r="2" fill="#200a16" />
                    <circle cx="35" cy="23" r="2" fill="#200a16" />
                    <path d="M 27 28 Q 30 32 33 28" stroke="#7a1934" strokeWidth="1.4" />
                  </>
                )}
                <path d="M 17 38 C 17 35, 43 35, 43 38 L 47 68 C 47 72, 13 72, 13 68 Z" fill="#4d2d47" />
                <circle cx="30" cy="46" r="3" fill="#f2b5c4" opacity="0.5" />
                <rect x="22" y="68" width="5" height="10" rx="2.5" fill="#15060f" />
                <rect x="33" y="68" width="5" height="10" rx="2.5" fill="#15060f" />
              </svg>

              {/* Spinning Stars on head when bonked */}
              {rashiReaction === 'bonked' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1 text-xs text-universe-gold animate-spin">
                  <span>✦</span>
                  <span>✨</span>
                  <span>✦</span>
                </div>
              )}

              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-universe-blush">
                Rashi
              </span>
            </div>
          </div>

          {/* Hidden K-Pop Poster Sticker in Background (Requirement 10) */}
          <div
            onClick={handleSecretPosterClick}
            className="absolute top-2 right-2 p-1.5 rounded-lg bg-purple-950/60 border border-purple-500/40 cursor-pointer hover:scale-125 transition-transform"
            title="A tiny glittering K-pop sticker on the wall..."
          >
            <span className="text-xs">💜✨</span>
          </div>

        </div>

        {/* =================================================================== */}
        {/* STAGE 1: THE FOOD CHALLENGE */}
        {/* =================================================================== */}
        {step === 'food' && (
          <div className="p-5 sm:p-6 rounded-3xl bg-black/60 border border-universe-wine/60 space-y-4 animate-fadeIn">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-universe-gold">
                Crisis #1: Rashi Has Not Eaten
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-universe-cream">
                Feed Rashi Her Comfort Food
              </h3>
              <p className="text-xs text-universe-lavender/80 italic font-sans">
                "i'm not hungry" — "RASHI." — "later." — "no."
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {foodItems.map((food) => (
                <button
                  key={food.id}
                  onClick={() => handleFeedFood(food)}
                  className="p-3 sm:p-4 rounded-2xl bg-universe-darkBurgundy/60 border border-universe-wine/50 hover:border-universe-gold hover:scale-105 active:scale-95 transition-all text-center space-y-1 touch-manipulation group"
                >
                  <span className="text-3xl sm:text-4xl block group-hover:scale-110 transition-transform">
                    {food.icon}
                  </span>
                  <span className="text-xs font-serif text-universe-cream block font-medium">
                    {food.name}
                  </span>
                  <span className="text-[9px] font-mono text-universe-gold/80 block">
                    Tap to feed 🥄
                  </span>
                </button>
              ))}
            </div>

            {foodBanner && (
              <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-300 font-mono text-xs animate-bounce">
                {foodBanner}
              </div>
            )}
          </div>
        )}

        {/* =================================================================== */}
        {/* STAGE 2: THE MEDICINE & WATER SEARCH */}
        {/* =================================================================== */}
        {step === 'medicine' && (
          <div className="p-5 sm:p-6 rounded-3xl bg-black/60 border border-universe-wine/60 space-y-4 animate-fadeIn">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-universe-gold">
                Crisis #2: The Medicine & Water Mystery
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-universe-cream">
                Search Rashi's Room For Her Medicine
              </h3>
              <p className="text-xs text-universe-lavender/80 italic font-sans">
                "you've said 'i'll take it later' three times, wifeyy!"
              </p>
            </div>

            {/* Room hiding spots */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <button
                onClick={() => handleSearchItem('hoodie')}
                className={`p-4 rounded-2xl border transition-all text-center space-y-2 touch-manipulation ${
                  drawerStates.hoodie
                    ? 'bg-cyan-950/50 border-cyan-400 text-cyan-200'
                    : 'bg-universe-darkBurgundy/40 border-universe-wine/50 hover:border-universe-blush'
                }`}
              >
                <span className="text-3xl block">🧥</span>
                <span className="text-xs font-serif block">Lavender Hoodie</span>
                <span className="text-[10px] font-mono block text-universe-dustyPink">
                  {drawerStates.hoodie ? '💧 Water Glass Found!' : 'Search Pockets'}
                </span>
              </button>

              <button
                onClick={() => handleSearchItem('bear')}
                className={`p-4 rounded-2xl border transition-all text-center space-y-2 touch-manipulation ${
                  drawerStates.bear
                    ? 'bg-purple-950/50 border-purple-400 text-purple-200'
                    : 'bg-universe-darkBurgundy/40 border-universe-wine/50 hover:border-universe-blush'
                }`}
              >
                <span className="text-3xl block">🧸</span>
                <span className="text-xs font-serif block">Motu Teddy</span>
                <span className="text-[10px] font-mono block text-universe-dustyPink">
                  {drawerStates.bear ? '💊 Medicine Found!' : 'Check Behind Bear'}
                </span>
              </button>

              <button
                onClick={() => handleSearchItem('box')}
                className={`p-4 rounded-2xl border transition-all text-center space-y-2 touch-manipulation ${
                  drawerStates.box
                    ? 'bg-rose-950/50 border-rose-400 text-rose-200'
                    : 'bg-universe-darkBurgundy/40 border-universe-wine/50 hover:border-universe-blush'
                }`}
              >
                <span className="text-3xl block">💍</span>
                <span className="text-xs font-serif block">Paper Ring Box</span>
                <span className="text-[10px] font-mono block text-universe-dustyPink">
                  {drawerStates.box ? 'Only Paper Rings ♡' : 'Open Box'}
                </span>
              </button>
            </div>

            {foundWater && foundPill && (
              <div className="pt-2 animate-scaleUp">
                <button
                  onClick={handleGiveMedicine}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-mono text-xs uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all"
                >
                  Give Water & Medicine to Rashi ♡
                </button>
              </div>
            )}
          </div>
        )}

        {/* =================================================================== */}
        {/* STAGE 3: MAXIMUM CHAOS & K-POP EMERGENCY LINE */}
        {/* =================================================================== */}
        {step === 'chaos' && (
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-[#250d24] to-[#0c030d] border-2 border-purple-500/70 space-y-4 animate-fadeIn">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300">
                CRITICAL EMERGENCY — DRAMA LEVEL 9000
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white">
                RASHI HAS ENTERED MAXIMUM CHAOS
              </h3>
              <p className="font-serif italic text-xs sm:text-sm text-universe-blush">
                Rashi looks at you: "okay… i need help."
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setStep('kpop')}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-serif text-sm sm:text-base font-bold uppercase tracking-wider shadow-[0_0_30px_rgba(168,85,247,0.7)] hover:scale-105 active:scale-95 transition-all touch-manipulation"
              >
                CALL THE PEOPLE WHO UNDERSTAND ME 💜
              </button>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* STAGE 3B: K-POP EMERGENCY LINE & CAMEO INTERACTIONS */}
        {/* =================================================================== */}
        {step === 'kpop' && (
          <div className="p-5 sm:p-6 rounded-3xl bg-black/70 border border-purple-500/60 space-y-5 animate-fadeIn">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300">
                The K-Pop Emergency Help Desk
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-universe-cream">
                Who Does Rashi Listen To?
              </h3>
              <p className="text-xs text-universe-lavender/80 italic font-sans">
                Choose an idol to talk sense into Rashi!
              </p>
            </div>

            {/* K-Pop Group Selection */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {KPOP_CONFIG.favoriteKpop.map((hero) => (
                <button
                  key={hero.id}
                  onClick={() => {
                    sound.playHeartClick();
                    setSelectedHero(hero);
                    setKpopChoiceOutcome(null);
                  }}
                  className={`p-3.5 rounded-2xl border transition-all text-center space-y-1.5 touch-manipulation ${
                    selectedHero?.id === hero.id
                      ? 'bg-purple-900/60 border-purple-400 shadow-glow-wine scale-105'
                      : 'bg-universe-darkBurgundy/40 border-universe-wine/40 hover:border-purple-400'
                  }`}
                >
                  <span className="text-2xl block">{hero.emoji}</span>
                  <span className="text-xs font-serif font-bold text-white block">
                    {hero.groupName}
                  </span>
                  <span className="text-[10px] font-mono text-purple-300 block truncate">
                    {hero.bias}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Cameo Interaction */}
            {selectedHero && (
              <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-600/50 space-y-3 text-left animate-fadeIn">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{selectedHero.emoji}</span>
                  <div>
                    <span className="text-xs font-serif font-bold text-white">
                      {selectedHero.groupName} Cameo
                    </span>
                    <p className="text-[10px] font-mono text-purple-300">
                      "{selectedHero.dialogue[0]}"
                    </p>
                  </div>
                </div>

                {/* Interaction 1: The Choice */}
                {selectedHero.interactionType === 'choice' && (
                  <div className="space-y-2 pt-1">
                    <p className="text-xs font-serif italic text-universe-blush">
                      What should Rashi do?
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleKpopChoice('eat')}
                        className="px-4 py-1.5 rounded-full bg-emerald-600/40 border border-emerald-400 text-xs font-mono text-white hover:bg-emerald-600"
                      >
                        Eat ♡
                      </button>
                      <button
                        onClick={() => handleKpopChoice('ignore')}
                        className="px-4 py-1.5 rounded-full bg-universe-wine/40 border border-universe-wine text-xs font-mono text-universe-lavender hover:bg-universe-wine"
                      >
                        Ignore
                      </button>
                      <button
                        onClick={() => handleKpopChoice('panic')}
                        className="px-4 py-1.5 rounded-full bg-universe-crimson/50 border border-universe-glowingRed text-xs font-mono text-white hover:bg-universe-crimson"
                      >
                        Make Shivi Panic 😭
                      </button>
                    </div>
                    {kpopChoiceOutcome && (
                      <p className="text-xs font-mono text-universe-gold pt-1">
                        {kpopChoiceOutcome}
                      </p>
                    )}
                  </div>
                )}

                {/* Interaction 2: Secret Dance */}
                {selectedHero.interactionType === 'dance' && (
                  <div className="space-y-2 pt-1 text-center">
                    <p className="text-xs font-serif italic text-universe-blush">
                      Copy the idol dance rhythm: (Step {danceStep}/3)
                    </p>
                    <div className="flex justify-center gap-2">
                      {['⬅️', '⬆️', '➡️'].map((dir, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleDanceBeat(idx)}
                          className="w-12 h-12 rounded-xl bg-purple-900/60 border border-purple-400 text-lg hover:scale-110 active:scale-95 transition-transform"
                        >
                          {dir}
                        </button>
                      ))}
                    </div>
                    {danceSuccess && (
                      <p className="text-xs font-mono text-emerald-300">
                        Rashi: "okay fine i'll eat 😭"
                      </p>
                    )}
                  </div>
                )}

                {/* Interaction 3: Hidden Message Puzzle */}
                {selectedHero.interactionType === 'puzzle' && (
                  <div className="space-y-2 pt-1">
                    <p className="text-xs font-serif italic text-universe-blush">
                      Uncover the secret message tiles:
                    </p>
                    <div className="flex flex-wrap gap-1.5 justify-center">
                      {KPOP_CONFIG.hiddenMessageLetters.map((char, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleRevealLetter(idx)}
                          className={`w-7 h-8 rounded-lg font-mono text-xs font-bold transition-all ${
                            revealedLetters.includes(idx)
                              ? 'bg-purple-600 text-white'
                              : 'bg-black/60 text-purple-400/40 border border-purple-800'
                          }`}
                        >
                          {revealedLetters.includes(idx) ? char : '?'}
                        </button>
                      ))}
                    </div>
                    {revealedLetters.length >= 8 && (
                      <p className="text-xs font-mono text-center text-universe-gold">
                        Secret Message: EAT YOUR FOOD ♡
                      </p>
                    )}
                  </div>
                )}

                {/* Interaction 4: Dance Battle / Default */}
                {selectedHero.interactionType === 'battle' && (
                  <div className="space-y-2 pt-1 text-center">
                    <p className="text-xs font-serif italic text-universe-blush">
                      Complete the rhythm battle with the cameo:
                    </p>
                    <button
                      onClick={() => {
                        sound.playMatchSound();
                        setHasSquad(true);
                      }}
                      className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-mono text-xs uppercase"
                    >
                      Win Battle: Rashi Agrees to Eat!
                    </button>
                  </div>
                )}

              </div>
            )}

            {/* Squad Summon Banner */}
            {hasSquad && (
              <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-400 text-center space-y-2 animate-scaleUp">
                <h4 className="font-serif text-lg text-universe-gold">
                  RASHI HAS SUMMONED THE SQUAD ♡
                </h4>
                <p className="text-xs text-universe-cream/90 font-serif italic">
                  "okay okay 😭 i'll eat. i'll take my medicine. i'll stop making everyone panic."
                </p>
              </div>
            )}

          </div>
        )}

        {/* =================================================================== */}
        {/* STAGE 4: FINAL RESCUE & EMOTIONAL REVELATION */}
        {/* =================================================================== */}
        {step === 'saved' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#280c20] via-[#160412] to-[#080108] border-2 border-universe-glowingRed shadow-glow-wine space-y-5 animate-scaleUp">
            
            <div className="w-16 h-16 mx-auto rounded-full bg-universe-glowingRed/20 border-2 border-universe-glowingRed flex items-center justify-center text-universe-glowingRed animate-bounce">
              <Heart className="w-8 h-8 fill-universe-glowingRed text-universe-glowingRed" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-universe-gold">
                Mission Accomplished
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold">
                ♡ RASHI SAVED ♡
              </h2>
            </div>

            {/* Dialogue */}
            <div className="p-4 rounded-2xl bg-black/50 border border-universe-wine/50 max-w-md mx-auto space-y-2 text-center text-xs sm:text-sm font-serif italic">
              <p className="text-universe-blush">Rashi: "okay… i'm safe."</p>
              <p className="text-white">Shivi: "finally."</p>
              <p className="text-universe-blush">Rashi: "you really came looking for me?"</p>
              <p className="text-universe-gold font-bold">Shivi: "always."</p>
            </div>

            {/* Emotional Connection to the Universe (Requirement 14) */}
            <div className="pt-2 border-t border-universe-wine/40 space-y-3">
              <div className="flex items-center justify-center gap-2">
                <div className="w-12 h-[2px] bg-universe-crimson" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-universe-gold">
                  Red Thread Connected
                </span>
                <div className="w-12 h-[2px] bg-universe-crimson" />
              </div>

              <p className="font-serif italic text-sm sm:text-base text-universe-cream/95 leading-relaxed max-w-lg mx-auto">
                "apparently saving you is becoming one of my favourite things. but honestly… i don't want to save you from everything. i just want to be there while you figure life out."
              </p>
            </div>

            {/* Secret Achievements Unlocked */}
            <div className="p-3.5 rounded-2xl bg-black/60 border border-universe-wine/40 space-y-2 text-left">
              <span className="text-[10px] font-mono text-universe-gold uppercase tracking-wider block">
                🏆 Secret Achievements Unlocked
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-mono">
                <div className="p-2 rounded-xl bg-universe-darkBurgundy/40 border border-universe-wine/40">
                  <span className="text-universe-blush font-bold block">♡ RASHI SURVIVED</span>
                  <span className="text-universe-lavender/70 text-[10px]">somehow, everyone survived.</span>
                </div>
                <div className="p-2 rounded-xl bg-universe-darkBurgundy/40 border border-universe-wine/40">
                  <span className="text-universe-blush font-bold block">♡ SHE ACTUALLY ATE</span>
                  <span className="text-universe-lavender/70 text-[10px]">historical event.</span>
                </div>
                <div className="p-2 rounded-xl bg-universe-darkBurgundy/40 border border-universe-wine/40">
                  <span className="text-universe-blush font-bold block">♡ MEDICINE TAKEN</span>
                  <span className="text-universe-lavender/70 text-[10px]">shivi can breathe again.</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full bg-universe-wine/40 border border-universe-wine text-xs font-mono uppercase text-universe-cream hover:text-white hover:bg-universe-wine"
              >
                Play Again 🔄
              </button>
              <button
                onClick={onClose}
                className="px-8 py-2.5 rounded-full bg-gradient-to-r from-universe-crimson to-universe-glowingRed text-white text-xs font-mono uppercase tracking-wider shadow-glow-red hover:scale-105"
              >
                Return to Universe ✦
              </button>
            </div>

          </div>
        )}

        {/* Start Game Button for Intro Screen */}
        {step === 'intro' && (
          <div className="pt-2">
            <button
              onClick={() => {
                sound.playHeartClick();
                setStep('food');
              }}
              className="px-10 py-4 rounded-full bg-gradient-to-r from-universe-crimson via-universe-glowingRed to-universe-crimson text-white font-serif text-sm sm:text-base font-bold uppercase tracking-wider shadow-[0_0_35px_rgba(255,40,94,0.7)] hover:scale-105 active:scale-95 transition-all touch-manipulation"
            >
              Start Rescue Mission 🛡️
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
