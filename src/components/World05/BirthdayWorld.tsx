import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Star,
  Heart,
  Sparkles,
  Gift,
  Clock,
  Compass,
  Moon,
  Volume2,
  Feather,
  Flame,
  Shield,
  Key,
  CheckCircle2,
  Lock,
  Unlock,
  KeyRound,
  ArrowRight
} from 'lucide-react';
import { sound } from '../../utils/audioEngine';
import TinyCharacters from '../Effects/TinyCharacters';
import {
  BIRTHDAY_CONFIG,
  isBirthdayReached,
  verifyBirthdayPassword,
  isBirthdaySessionUnlocked,
  setBirthdaySessionUnlocked
} from '../../config/birthdayConfig';

export interface DiscoveryItem {
  number: number;
  type: string;
  iconName: string;
  title: string;
  lore: string;
}

// 21 Interactive Discoveries Progressing from Small Things to Choosing Her
export const TWENTY_ONE_DISCOVERIES: DiscoveryItem[] = [
  {
    number: 1,
    type: "Small Habit",
    iconName: "Sparkles",
    title: "The Giggle Crinkle",
    lore: "The way your eyes crinkle when you giggle at my stupid jokes across the screen."
  },
  {
    number: 2,
    type: "Sweet Rule",
    iconName: "Heart",
    title: "Bas Teen-Char Kisses",
    lore: "How you strictly negotiate: 'bas teen-char kisses, aur zyada nahi!' before giving in with a soft laugh."
  },
  {
    number: 3,
    type: "Cute Crime",
    iconName: "Sparkles",
    title: "The Lavender Hoodie Theft",
    lore: "How you steal my oversized hoodie, drown in its sleeves, and refuse to return it because 'it smells like you.'"
  },
  {
    number: 4,
    type: "Midnight Sweetness",
    iconName: "Moon",
    title: "3 AM Sleep Whispers",
    lore: "The sleepy murmur of 'mujhe bohot gandi wali neend aa rahi hai...' right before whispering 'I love you yaar...'"
  },
  {
    number: 5,
    type: "Attentive Care",
    iconName: "Feather",
    title: "Remembering Tiny Details",
    lore: "How you remember the smallest random things I mentioned weeks ago that even I completely forgot."
  },
  {
    number: 6,
    type: "Playful Spark",
    iconName: "Sparkles",
    title: "The Roast & Blush",
    lore: "The effortless way you roast me with sarcasm and then immediately blush red like a strawberry."
  },
  {
    number: 7,
    type: "Cozy Sanctuary",
    iconName: "Heart",
    title: "Couch & Blanket Cuddles",
    lore: "Snuggling under the cream fleece blanket, fighting for the TV remote, and resting your head against my shoulder."
  },
  {
    number: 8,
    type: "Selfless Love",
    iconName: "Star",
    title: "The Last Bite of Food",
    lore: "Always pretending you don't want the last bite of pizza or French fry just so I can have it with a grin."
  },
  {
    number: 9,
    type: "Healing Heart",
    iconName: "Sparkles",
    title: "The 10-Minute Reset",
    lore: "How we can fight at 2:00 AM and be laughing by 2:10 AM because staying angry at each other feels unnatural."
  },
  {
    number: 10,
    type: "Safe Place",
    iconName: "Shield",
    title: "Heyy Wifeyy",
    lore: "The quiet tenderness in your voice whenever you say 'Heyy wifeyy' and all the tension in my chest vanishes."
  },
  {
    number: 11,
    type: "Quiet Resilience",
    iconName: "Flame",
    title: "Strength in the Shadows",
    lore: "How brave and resilient you stayed through terrifying nights, holding onto our bond with quiet grace."
  },
  {
    number: 12,
    type: "Devotion",
    iconName: "Feather",
    title: "The Hospital Prayer Letter",
    lore: "The golden letter you wrote through tears when I was in hospital: 'we promised to stay together for life and we will... get well soon.'"
  },
  {
    number: 13,
    type: "Sacred Trust",
    iconName: "Shield",
    title: "Unfiltered Vulnerability",
    lore: "The way you trust me with your quietest tears, your deepest insecurities, and your wildest dreams."
  },
  {
    number: 14,
    type: "Childlike Joy",
    iconName: "Gift",
    title: "Surprise Delivery Sparkle",
    lore: "The radiant look of pure joy on your face whenever a surprise package reaches your doorstep in Lucknow."
  },
  {
    number: 15,
    type: "Home",
    iconName: "Compass",
    title: "Lucknow in Your Eyes",
    lore: "How Lucknow and every road stopped being just a city — somehow, you became the place I call home."
  },
  {
    number: 16,
    type: "Overcoming Distance",
    iconName: "Compass",
    title: "Zero Miles in Heart",
    lore: "How the miles between us only proved that our love is ten times stronger than any geography."
  },
  {
    number: 17,
    type: "Your Soul",
    iconName: "Star",
    title: "Pure Golden Heart",
    lore: "Your endless patience, your boundless empathy, and your gentle soul that loves without conditions or scorecards."
  },
  {
    number: 18,
    type: "Our Dream",
    iconName: "Sparkles",
    title: "Paper Rings Anthem",
    lore: "Dreaming of our wedding with Taylor Swift's Paper Rings — 'I like shiny things, but I'd marry you with paper rings, you're the one I want!'"
  },
  {
    number: 19,
    type: "Mutual Growth",
    iconName: "Heart",
    title: "Surviving Every Storm",
    lore: "Surviving the almost-endings, putting down our pride, and learning how to love each other better every single day."
  },
  {
    number: 20,
    type: "The Sacred Yes",
    iconName: "Key",
    title: "Permanent Commitment",
    lore: "Your teary, beautiful response on 22.11.2025: 'not temporary, it's permanent commitment frm my side 🤧'."
  },
  {
    number: 21,
    type: "Choosing Her",
    iconName: "Heart",
    title: "Choosing You",
    lore: "Out of 8 billion souls in this infinite universe, every morning I wake up and I choose you. And tomorrow, I will choose you again."
  }
];

function renderDiscoveryIcon(iconName: string) {
  switch (iconName) {
    case 'Sparkles':
      return <Sparkles className="w-4 h-4 text-universe-gold" />;
    case 'Moon':
      return <Moon className="w-4 h-4 text-universe-lavender" />;
    case 'Flame':
      return <Flame className="w-4 h-4 text-universe-crimson" />;
    case 'Feather':
      return <Feather className="w-4 h-4 text-universe-dustyPink" />;
    case 'Shield':
      return <Shield className="w-4 h-4 text-emerald-400" />;
    case 'Star':
      return <Star className="w-4 h-4 text-amber-300 fill-amber-300" />;
    case 'Compass':
      return <Compass className="w-4 h-4 text-universe-gold" />;
    case 'Key':
      return <Key className="w-4 h-4 text-universe-gold" />;
    case 'Gift':
      return <Gift className="w-4 h-4 text-universe-crimson" />;
    default:
      return <Heart className="w-4 h-4 text-universe-glowingRed fill-universe-glowingRed" />;
  }
}

export default function BirthdayWorld() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [testBypass, setTestBypass] = useState(false); // Testing toggle

  const [litStarCount, setLitStarCount] = useState(0);
  const [countdownPhase, setCountdownPhase] = useState<'stars' | 'R' | 'heart' | 'banner'>('stars');
  const [selectedDiscovery, setSelectedDiscovery] = useState<DiscoveryItem | null>(null);
  const [openedDiscoveries, setOpenedDiscoveries] = useState<number[]>([]);
  const [transitioningToLetter, setTransitioningToLetter] = useState(false);

  // Check if target date (12 Nov 2026) has arrived in local time
  const [dateReached, setDateReached] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Check session unlock
    if (isBirthdaySessionUnlocked()) {
      setIsUnlocked(true);
    }

    const checkDate = () => {
      const reached = isBirthdayReached();
      setDateReached(reached);

      const now = new Date();
      const target = new Date(
        BIRTHDAY_CONFIG.targetYear,
        BIRTHDAY_CONFIG.targetMonth,
        BIRTHDAY_CONFIG.targetDay,
        0,
        0,
        0
      );

      const diff = target.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    checkDate();
    const timer = setInterval(checkDate, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle password unlock on 12 Nov
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput.trim()) return;

    if (verifyBirthdayPassword(passwordInput)) {
      sound.playMatchSound();
      setIsUnlocked(true);
      setBirthdaySessionUnlocked();
      setPasswordError(null);
      confetti({
        particleCount: 100,
        spread: 80,
        colors: ['#ff285e', '#f5b8c6', '#ffd166', '#ffffff']
      });
    } else {
      sound.playTone(180, 0.25);
      setPasswordError('hmm… you know this one, baby.');
    }
  };

  // 21 Stars Ignition Countdown
  const handleStartCountdown = () => {
    sound.playHeartClick();
    setLitStarCount(0);
    setCountdownPhase('stars');

    let count = 0;
    const interval = setInterval(() => {
      count++;
      setLitStarCount(count);
      sound.playTone(300 + count * 25, 0.4, 'sine', 0.08);

      if (count >= 21) {
        clearInterval(interval);
        setTimeout(() => setCountdownPhase('R'), 800);
        setTimeout(() => setCountdownPhase('heart'), 2000);
        setTimeout(() => {
          setCountdownPhase('banner');
          sound.playMatchSound();
          confetti({
            particleCount: 120,
            spread: 90,
            colors: ['#f5b8c6', '#ffd166', '#ff285e', '#ffffff']
          });
        }, 3400);
      }
    }, 120);
  };

  // Open a Discovery
  const handleOpenDiscovery = (item: DiscoveryItem) => {
    sound.playEnvelopeOpen();
    setSelectedDiscovery(item);
    
    if (!openedDiscoveries.includes(item.number)) {
      const nextOpened = [...openedDiscoveries, item.number];
      setOpenedDiscoveries(nextOpened);

      // REQUIREMENT 6: AFTER THE 21ST REASON IS DISCOVERED, TRIGGER PAUSE & TRANSITION NATURALLY
      if (nextOpened.length === 21) {
        sound.playMatchSound();
        confetti({
          particleCount: 150,
          spread: 100,
          colors: ['#ff285e', '#ffd166', '#f5b8c6', '#ffffff']
        });

        // Trigger gentle pause and natural transition into final love letter
        setTransitioningToLetter(true);
        setTimeout(() => {
          sound.playTone(432, 1.2, 'sine', 0.15); // soft harmonic chime
          const targetEl = document.getElementById('chapter-14');
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
          setTransitioningToLetter(false);
        }, 3200);
      }
    }
  };

  const isLockedState = !dateReached && !testBypass;

  return (
    <section id="birthday-section" className="relative w-full py-16 sm:py-24 px-4 sm:px-6 flex flex-col items-center justify-center select-none">
      <div className="max-w-4xl w-full text-center space-y-10 sm:space-y-14">
        
        {/* =================================================================== */}
        {/* STATE A: LOCKED BEFORE 12 NOVEMBER 2026 */}
        {/* =================================================================== */}
        {isLockedState && (
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#220a1c] via-[#0d0309] to-[#040103] border-2 border-universe-wine/60 shadow-2xl space-y-6 max-w-2xl mx-auto animate-fadeIn">
            
            <div className="w-16 h-16 mx-auto rounded-full bg-universe-crimson/20 border-2 border-universe-glowingRed/50 flex items-center justify-center text-universe-gold shadow-glow-wine animate-pulse">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-universe-gold px-3.5 py-1.5 rounded-full border border-universe-gold/40 bg-universe-black/60 inline-flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-universe-gold" />
                12 November 2026 • Turning 21
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl text-universe-cream">
                {BIRTHDAY_CONFIG.lockedMessage}
              </h2>

              <p className="font-serif italic text-sm sm:text-base text-universe-blush max-w-md mx-auto">
                "{BIRTHDAY_CONFIG.lockedSubtext}"
              </p>
            </div>

            {/* Countdown to 12 November 2026 */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-center gap-2 text-universe-gold text-xs font-mono tracking-widest uppercase">
                <Clock className="w-4 h-4" />
                <span>Countdown to 12 November 2026 (Rashi Turns 21)</span>
              </div>

              <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
                {[
                  { label: 'Days', val: timeLeft.days },
                  { label: 'Hours', val: timeLeft.hours },
                  { label: 'Minutes', val: timeLeft.minutes },
                  { label: 'Seconds', val: timeLeft.seconds }
                ].map((slot, i) => (
                  <div key={i} className="p-3 sm:p-4 rounded-2xl bg-universe-black/80 border border-universe-wine/60 text-center">
                    <span className="font-serif text-2xl sm:text-4xl font-bold text-universe-gold block">
                      {slot.val.toString().padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-universe-lavender/60">
                      {slot.label}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] font-mono text-universe-lavender/60">
                counting down every single heartbeat until your day begins
              </p>
            </div>

            {/* Testing / Preview Date Bypass Toggle */}
            <div className="pt-4 border-t border-universe-wine/30">
              <button
                onClick={() => setTestBypass(true)}
                className="text-[11px] font-mono text-universe-gold/60 hover:text-universe-gold underline underline-offset-4 transition-colors"
                title="Preview Date Unlock for Testing"
              >
                [Preview 12 Nov: Test Password Screen]
              </button>
            </div>

          </div>
        )}

        {/* =================================================================== */}
        {/* STATE B: ON 12 NOVEMBER (OR TEST MODE) — PASSWORD SCREEN */}
        {/* =================================================================== */}
        {!isLockedState && !isUnlocked && (
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#240c1a] via-[#12040e] to-[#060205] border-2 border-universe-gold/60 shadow-glow-gold/20 space-y-6 max-w-xl mx-auto animate-scaleUp">
            
            <div className="w-16 h-16 mx-auto rounded-full bg-universe-wine/40 border border-universe-gold/60 flex items-center justify-center text-universe-gold shadow-glow-gold">
              <KeyRound className="w-8 h-8 text-universe-gold animate-bounce" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-universe-gold px-3.5 py-1.5 rounded-full border border-universe-gold/40 bg-universe-black/60 inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-universe-gold" />
                12 November Has Arrived
              </span>

              <h2 className="font-serif text-2xl sm:text-4xl text-universe-cream">
                Enter The Birthday Secret
              </h2>

              <p className="font-serif italic text-xs sm:text-sm text-universe-blush max-w-sm mx-auto">
                "some things aren't meant to be told... they're meant to be remembered."
              </p>
            </div>

            {/* Password Form */}
            <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-sm mx-auto">
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setPasswordError(null);
                }}
                placeholder="enter birthday password..."
                autoFocus
                className="w-full px-5 py-3.5 rounded-full bg-universe-black/90 border border-universe-wine/80 text-universe-cream text-center text-sm font-mono tracking-wider focus:outline-none focus:border-universe-gold transition-colors"
              />

              {passwordError && (
                <p className="text-xs font-serif italic text-universe-blush animate-fadeIn">
                  {passwordError}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-universe-crimson via-universe-glowingRed to-universe-crimson text-white text-xs font-mono uppercase tracking-widest font-bold shadow-glow-red hover:scale-105 active:scale-95 transition-all"
              >
                Unlock My 21st Universe ♡
              </button>
            </form>

            {testBypass && !dateReached && (
              <button
                onClick={() => setTestBypass(false)}
                className="text-[10px] font-mono text-universe-lavender/50 hover:text-universe-lavender underline pt-2"
              >
                ← Return to Locked Countdown
              </button>
            )}

          </div>
        )}

        {/* =================================================================== */}
        {/* STATE C: UNLOCKED 21ST BIRTHDAY CELEBRATION & 21 LITTLE REASONS */}
        {/* =================================================================== */}
        {!isLockedState && isUnlocked && (
          <div className="space-y-10 sm:space-y-14 animate-fadeIn">
            
            {/* Header */}
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-universe-gold px-4 py-1.5 rounded-full border border-universe-gold/40 bg-universe-black/60 inline-flex items-center gap-2 shadow-glow-gold">
                <Gift className="w-3.5 h-3.5 text-universe-gold" />
                12 November • Turning 21
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-universe-cream">
                {BIRTHDAY_CONFIG.unlockedTitle}
              </h2>

              <p className="font-serif italic text-sm sm:text-lg text-universe-blush max-w-lg mx-auto">
                "{BIRTHDAY_CONFIG.unlockedSubtitle}"
              </p>
            </div>

            {/* 21 STARS IGNITION CELEBRATION */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#220a1c] via-[#0d0309] to-[#040103] border-2 border-universe-gold/60 shadow-2xl space-y-5">
              <div className="space-y-3 py-2 animate-fadeIn">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-universe-crimson/40 border border-universe-glowingRed text-xs font-mono text-universe-gold">
                  <Sparkles className="w-4 h-4 text-universe-gold animate-bounce" />
                  <span>21st Birthday Milestone</span>
                </div>
                <h3 className="font-serif text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-universe-gold via-white to-universe-blush drop-shadow-[0_0_25px_rgba(255,209,102,0.8)]">
                  your day is here.
                </h3>
                <p className="font-serif italic text-base sm:text-xl text-universe-cream/95">
                  Happy 21st Birthday to my favourite person in the entire universe ♡
                </p>
              </div>

              {/* Interactive 21 Stars Ignition */}
              <div className="pt-3 border-t border-universe-wine/40 flex items-center justify-between">
                <span className="text-xs font-mono text-universe-gold">
                  Ignite 21 Sacred Stars: {litStarCount} / 21
                </span>
                <button
                  onClick={handleStartCountdown}
                  className="px-4 py-1.5 rounded-full bg-universe-wine/40 border border-universe-gold/50 text-[11px] font-mono text-universe-gold hover:bg-universe-crimson hover:text-white transition-all shadow-sm"
                >
                  Ignite 21 Stars ✨
                </button>
              </div>

              {/* 21 Stars Grid */}
              {countdownPhase === 'stars' && (
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 py-3">
                  {Array.from({ length: 21 }).map((_, i) => {
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

              {/* Morphing Formations */}
              {countdownPhase === 'R' && (
                <div className="py-6 text-6xl sm:text-8xl font-serif font-bold text-universe-gold animate-fadeIn drop-shadow-[0_0_35px_rgba(255,209,102,0.8)]">
                  R
                </div>
              )}

              {countdownPhase === 'heart' && (
                <div className="py-6 animate-fadeIn">
                  <Heart className="w-20 h-20 sm:w-28 sm:h-28 mx-auto text-universe-glowingRed fill-universe-glowingRed shadow-glow-red animate-pulse" />
                </div>
              )}

              {countdownPhase === 'banner' && (
                <div className="py-6 space-y-3 animate-fadeIn">
                  <div className="text-2xl sm:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-universe-blush via-white to-universe-gold">
                    HAPPY 21ST BIRTHDAY RASHI! 🎉
                  </div>
                  <p className="font-serif italic text-sm sm:text-base text-universe-cream/90">
                    May all your wishes come true, my wifeyy. Forever by your side.
                  </p>
                </div>
              )}
            </div>

            {/* REQUIREMENT 6: 21 LITTLE REASONS (PROGRESSING FROM SMALL THINGS TO CHOOSING HER) */}
            <div className="space-y-6">
              <div className="text-left space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-universe-gold" />
                  <h3 className="font-serif text-xl sm:text-2xl text-universe-cream">
                    21 Little Reasons (For Turning 21)
                  </h3>
                </div>
                <p className="font-serif italic text-xs sm:text-sm text-universe-blush">
                  Progressing from the tiny endearing things to choosing you forever. ({openedDiscoveries.length}/21 Discovered)
                </p>
              </div>

              {/* 21 Discoveries Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
                {TWENTY_ONE_DISCOVERIES.map((item) => {
                  const isOpened = openedDiscoveries.includes(item.number);
                  return (
                    <button
                      key={item.number}
                      onClick={() => handleOpenDiscovery(item)}
                      className={`p-3 rounded-2xl border text-center transition-all duration-200 hover:scale-105 active:scale-95 touch-manipulation flex flex-col items-center justify-center gap-1 min-h-[76px] ${
                        isOpened
                          ? 'bg-universe-crimson/90 border-universe-glowingRed text-white shadow-glow-red'
                          : 'bg-universe-black/60 border-universe-wine/50 text-universe-cream hover:border-universe-gold'
                      }`}
                      title={item.title}
                    >
                      <div className="flex items-center justify-between w-full px-1">
                        <span className="font-mono text-xs font-bold text-universe-gold">
                          #{item.number.toString().padStart(2, '0')}
                        </span>
                        {isOpened ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                        ) : (
                          renderDiscoveryIcon(item.iconName)
                        )}
                      </div>
                      <span className="text-[10px] font-sans truncate w-full text-center text-universe-cream/90 pt-0.5">
                        {item.type}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Discovery Detail Card */}
              {selectedDiscovery && (
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#240c1a] to-[#0c0309] border border-universe-glowingRed/70 shadow-2xl animate-fadeIn space-y-3 text-left relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-universe-wine/40 border border-universe-wine/60">
                        {renderDiscoveryIcon(selectedDiscovery.iconName)}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-universe-gold uppercase tracking-wider block">
                          Reason #{selectedDiscovery.number} • {selectedDiscovery.type}
                        </span>
                        <h4 className="font-serif text-lg sm:text-xl text-universe-cream font-medium">
                          {selectedDiscovery.title}
                        </h4>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedDiscovery(null)}
                      className="text-xs font-mono text-universe-lavender/60 hover:text-white px-2 py-1"
                    >
                      ✕ close
                    </button>
                  </div>

                  <p className="font-serif text-sm sm:text-base md:text-lg text-universe-cream italic leading-relaxed pt-2">
                    "{selectedDiscovery.lore}"
                  </p>
                </div>
              )}
            </div>

            {/* Transition Pause Banner when all 21 are discovered */}
            {transitioningToLetter && (
              <div className="p-6 rounded-3xl bg-universe-black/90 border-2 border-universe-gold shadow-glow-gold animate-fadeIn space-y-2">
                <Sparkles className="w-6 h-6 text-universe-gold mx-auto animate-spin" />
                <h4 className="font-serif text-xl sm:text-2xl text-universe-gold">
                  All 21 Reasons Discovered...
                </h4>
                <p className="font-serif italic text-sm sm:text-base text-universe-blush">
                  "21 reasons today, and a lifetime of choosing you tomorrow. Transitioning to our final letter..."
                </p>
              </div>
            )}

            {/* Tiny Characters Poses */}
            <div className="pt-2">
              <TinyCharacters pose="holding-hands" caption="21 today, and mine for every single tomorrow ♡" />
            </div>

            {/* Natural Transition Button to Final Love Letter */}
            <div className="pt-6">
              <button
                onClick={() => {
                  sound.playHeartClick();
                  const targetEl = document.getElementById('chapter-14');
                  if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-universe-wine/30 border border-universe-wine/60 text-universe-cream hover:text-white hover:border-universe-gold text-xs font-mono uppercase tracking-wider transition-all"
              >
                <span>Read Our Final Love Letter & Proposal</span>
                <ArrowRight className="w-4 h-4 text-universe-gold" />
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
