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
  Cloud,
  Volume2,
  Feather,
  Flame,
  Shield,
  Key,
  Coffee,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { sound } from '../../utils/audioEngine';
import TinyCharacters from '../Effects/TinyCharacters';

export interface DiscoveryItem {
  number: number;
  type: string;
  iconName: string;
  title: string;
  lore: string;
}

const TWENTY_THREE_DISCOVERIES: DiscoveryItem[] = [
  {
    number: 1,
    type: "Smile",
    iconName: "Sparkles",
    title: "The Giggle Crinkle",
    lore: "The way your eyes crinkle when you giggle at my stupid jokes across the phone screen."
  },
  {
    number: 2,
    type: "Voice Note",
    iconName: "Volume2",
    title: "Strict Negotiations",
    lore: "How you strictly negotiate: 'bas teen-char kisses, aur zyada nahi!' before giving in with a shy laugh."
  },
  {
    number: 3,
    type: "Sleep Call",
    iconName: "Moon",
    title: "6-Hour Record",
    lore: "The quiet comfort of falling asleep on a 6-hour call with you and waking up to your soft morning breathing."
  },
  {
    number: 4,
    type: "Promise",
    iconName: "Heart",
    title: "Permanent Commitment",
    lore: "Your soft sniffling response: 'permanent commitment frm my side 🤧' that sealed my whole soul."
  },
  {
    number: 5,
    type: "Devotion",
    iconName: "Flame",
    title: "The Hospital Night",
    lore: "How you stayed strong and prayed every second when I was in the hospital, never giving up on us."
  },
  {
    number: 6,
    type: "Letter",
    iconName: "Feather",
    title: "The Wake-Up Text",
    lore: "The sweet little text that was waiting for me the moment I opened my eyes in that hospital bed."
  },
  {
    number: 7,
    type: "Cute Crime",
    iconName: "Cloud",
    title: "Oversized Hoodies",
    lore: "How you steal oversized hoodies, drown in their sleeves, and look impossibly cute."
  },
  {
    number: 8,
    type: "Magic",
    iconName: "Sparkles",
    title: "The 10-Minute Reset",
    lore: "How we can fight at 2:00 AM and be laughing by 2:10 AM because staying angry feels unnatural."
  },
  {
    number: 9,
    type: "Dialogue",
    iconName: "Heart",
    title: "Pyaar Mein Pagal",
    lore: "The way you say 'pagal kar degi ye ladki' and I reply 'ho jao na mere pyaar mein pagal ♡'."
  },
  {
    number: 10,
    type: "Voice Note",
    iconName: "Volume2",
    title: "Heyy Wifeyy",
    lore: "The quiet warmth in your voice whenever you say 'Heyy wifeyy' and the whole world calms down."
  },
  {
    number: 11,
    type: "Secret",
    iconName: "Shield",
    title: "Unfiltered Trust",
    lore: "The way you trust me with your quietest fears, your vulnerable tears, and your wildest dreams."
  },
  {
    number: 12,
    type: "Soundtrack",
    iconName: "Star",
    title: "Paper Rings Vow",
    lore: "Our shared dream of walking down the aisle with Paper Rings — 'you're the one I want!'"
  },
  {
    number: 13,
    type: "Distance",
    iconName: "Compass",
    title: "Zero Miles",
    lore: "How 800 miles feels like zero miles whenever we talk late into the night."
  },
  {
    number: 14,
    type: "Soul",
    iconName: "Star",
    title: "Pure Golden Heart",
    lore: "Your honesty, your patience, and your pure golden heart that gives without expecting anything."
  },
  {
    number: 15,
    type: "Playful",
    iconName: "Sparkles",
    title: "Roast & Blush",
    lore: "The way you roast me effortlessly with sarcasm and then immediately blush red."
  },
  {
    number: 16,
    type: "Memory",
    iconName: "Feather",
    title: "Tiny Little Details",
    lore: "How you remember the smallest details, songs, and random remarks from months ago."
  },
  {
    number: 17,
    type: "Sanctuary",
    iconName: "Shield",
    title: "My Safe Place",
    lore: "The unshakeable feeling of safety whenever I hear your voice after a chaotic day."
  },
  {
    number: 18,
    type: "Cinematic",
    iconName: "Star",
    title: "Movie Days",
    lore: "The way you make ordinary, boring days feel like a scene out of a romantic movie."
  },
  {
    number: 19,
    type: "Choice",
    iconName: "Key",
    title: "Lifetime Partner",
    lore: "How you chose me, not as a temporary companion, but as your forever person."
  },
  {
    number: 20,
    type: "Devotion",
    iconName: "Heart",
    title: "Anchor in Storms",
    lore: "Your unconditional love that never wavers through misunderstandings or bad days."
  },
  {
    number: 21,
    type: "Surprise",
    iconName: "Gift",
    title: "Delivery Joy",
    lore: "The look of pure joy on your face whenever a surprise package reaches your doorstep."
  },
  {
    number: 22,
    type: "Place",
    iconName: "Key",
    title: "You Became My Home",
    lore: "How Lucknow and every road stopped being just a city — somehow, you became a place."
  },
  {
    number: 23,
    type: "Forever",
    iconName: "Sparkles",
    title: "23 More Tomorrow",
    lore: "And if you ask me tomorrow why I love you... I'll have 23 more reasons, and then 23 more again. ♡"
  }
];

// Helper to render discovery icon
function renderDiscoveryIcon(iconName: string) {
  switch (iconName) {
    case 'Sparkles': return <Sparkles className="w-4 h-4 text-universe-gold" />;
    case 'Volume2': return <Volume2 className="w-4 h-4 text-universe-blush" />;
    case 'Moon': return <Moon className="w-4 h-4 text-universe-lavender" />;
    case 'Flame': return <Flame className="w-4 h-4 text-universe-crimson" />;
    case 'Feather': return <Feather className="w-4 h-4 text-universe-dustyPink" />;
    case 'Cloud': return <Cloud className="w-4 h-4 text-blue-300" />;
    case 'Shield': return <Shield className="w-4 h-4 text-emerald-400" />;
    case 'Star': return <Star className="w-4 h-4 text-amber-300 fill-amber-300" />;
    case 'Compass': return <Compass className="w-4 h-4 text-universe-gold" />;
    case 'Key': return <Key className="w-4 h-4 text-universe-gold" />;
    case 'Gift': return <Gift className="w-4 h-4 text-universe-crimson" />;
    default: return <Heart className="w-4 h-4 text-universe-glowingRed fill-universe-glowingRed" />;
  }
}

export default function BirthdayWorld() {
  const [litStarCount, setLitStarCount] = useState(0);
  const [countdownPhase, setCountdownPhase] = useState<'stars' | 'R' | 'heart' | 'banner'>('stars');
  const [selectedDiscovery, setSelectedDiscovery] = useState<DiscoveryItem | null>(null);
  const [openedDiscoveries, setOpenedDiscoveries] = useState<number[]>([]);
  const [showFinalProposal, setShowFinalProposal] = useState(false);
  const [finalProposalStep, setFinalProposalStep] = useState(0);

  // Birthday Countdown State
  // Configurable date: 12 November
  const targetMonth = 10; // November (0-indexed: 10 is November)
  const targetDay = 12;

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isToday: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: false });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let targetDate = new Date(currentYear, targetMonth, targetDay, 0, 0, 0);

      // Check if today is the exact birthday
      if (now.getMonth() === targetMonth && now.getDate() === targetDay) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true });
        return;
      }

      // If already passed this year, point to next year
      if (now.getTime() > targetDate.getTime()) {
        targetDate = new Date(currentYear + 1, targetMonth, targetDay, 0, 0, 0);
      }

      const diff = targetDate.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isToday: false });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

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
            particleCount: 120,
            spread: 90,
            colors: ['#f5b8c6', '#ffd166', '#ff285e', '#ffffff']
          });
        }, 3400);
      }
    }, 120);
  };

  const handleOpenDiscovery = (item: DiscoveryItem) => {
    sound.playEnvelopeOpen();
    setSelectedDiscovery(item);
    if (!openedDiscoveries.includes(item.number)) {
      setOpenedDiscoveries((prev) => [...prev, item.number]);
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
    }, 2800);

    setTimeout(() => {
      sound.playHeartbeat(0.25);
      setFinalProposalStep(3);
    }, 6000);

    setTimeout(() => {
      sound.playHeartbeat(0.28);
      setFinalProposalStep(4);
      sound.playMatchSound();
      confetti({
        particleCount: 160,
        spread: 100,
        colors: ['#ff285e', '#f5b8c6', '#ffd166', '#ffffff']
      });
    }, 10000);
  };

  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 flex flex-col items-center justify-center select-none">
      <div className="max-w-4xl w-full text-center space-y-10 sm:space-y-14">
        
        {/* Header */}
        <div className="space-y-4">
          <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-universe-gold px-4 py-1.5 rounded-full border border-universe-gold/40 bg-universe-black/60 inline-flex items-center gap-2 shadow-glow-gold">
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

        {/* SECTION 28: CINEMATIC BIRTHDAY COUNTDOWN / "YOUR DAY IS HERE" */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#220a1c] via-[#0d0309] to-[#040103] border-2 border-universe-gold/60 shadow-2xl space-y-5">
          {timeLeft.isToday ? (
            <div className="space-y-3 py-4 animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-universe-crimson/40 border border-universe-glowingRed text-xs font-mono text-universe-gold">
                <Sparkles className="w-4 h-4 text-universe-gold animate-bounce" />
                <span>Special Milestone Day</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-universe-gold via-white to-universe-blush drop-shadow-[0_0_25px_rgba(255,209,102,0.8)]">
                your day is here.
              </h3>
              <p className="font-serif italic text-base sm:text-xl text-universe-cream/95">
                Happy 23rd Birthday to my favourite person in the entire universe ♡
              </p>
            </div>
          ) : (
            <div className="space-y-4 py-2">
              <div className="flex items-center justify-center gap-2 text-universe-gold text-xs font-mono tracking-widest uppercase">
                <Clock className="w-4 h-4" />
                <span>Countdown to 12 November (Rashi Turns 23)</span>
              </div>

              {/* Countdown Digits */}
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
          )}

          {/* Interactive 23 Stars Ignition Button */}
          <div className="pt-3 border-t border-universe-wine/40 flex items-center justify-between">
            <span className="text-xs font-mono text-universe-gold">
              Ignite 23 Sacred Stars: {litStarCount} / 23
            </span>
            <button
              onClick={handleStartCountdown}
              className="px-4 py-1.5 rounded-full bg-universe-wine/40 border border-universe-gold/50 text-[11px] font-mono text-universe-gold hover:bg-universe-crimson hover:text-white transition-all shadow-sm"
            >
              Ignite 23 Stars ✨
            </button>
          </div>

          {/* 23 Stars Grid */}
          {countdownPhase === 'stars' && (
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 py-3">
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
                HAPPY 23RD BIRTHDAY RASHI! 🎉
              </div>
              <p className="font-serif italic text-sm sm:text-base text-universe-cream/90">
                May all your wishes come true, my wifeyy. Forever by your side.
              </p>
            </div>
          )}
        </div>

        {/* SECTION 27: 23 INTERACTIVE DISCOVERIES (TURNING 23) */}
        <div className="space-y-6">
          <div className="text-left space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-universe-gold" />
              <h3 className="font-serif text-xl sm:text-2xl text-universe-cream">
                23 Tiny Discoveries (For Turning 23)
              </h3>
            </div>
            <p className="font-serif italic text-xs sm:text-sm text-universe-blush">
              Not just a list of reasons — tap each object to uncover a sacred piece of you that made my whole world softer. ({openedDiscoveries.length}/23 Discovered)
            </p>
          </div>

          {/* 23 Discoveries Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5">
            {TWENTY_THREE_DISCOVERIES.map((item) => {
              const isOpened = openedDiscoveries.includes(item.number);
              return (
                <button
                  key={item.number}
                  onClick={() => handleOpenDiscovery(item)}
                  className={`p-3 rounded-2xl border text-center transition-all duration-200 hover:scale-105 active:scale-95 touch-manipulation flex flex-col items-center justify-center gap-1 min-h-[72px] ${
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
                      <CheckCircle2 className="w-3 h-3 text-white" />
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
                      Discovery #{selectedDiscovery.number} • {selectedDiscovery.type}
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

        {/* Tiny Characters Poses */}
        <div className="pt-2">
          <TinyCharacters pose="holding-hands" caption="23 today, and mine for every single tomorrow ♡" />
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

      {/* Fullscreen Final Climax Proposal Modal (Section 33) */}
      {showFinalProposal && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 text-center select-none animate-fadeIn">
          
          <div className="max-w-xl w-full space-y-6">
            
            {/* Step 1: Initial Heartbeat & Clue progression */}
            {finalProposalStep >= 1 && (
              <div className="space-y-3 animate-fadeIn">
                <p className="font-serif text-lg sm:text-2xl text-neutral-300 italic">
                  "you followed every little clue…"
                </p>
                <p className="font-serif text-base sm:text-xl text-neutral-400 italic">
                  "you found every little piece…"
                </p>
                <p className="font-serif text-base sm:text-xl text-universe-blush italic">
                  "and somehow every road led back to you."
                </p>
              </div>
            )}

            {/* Step 2: RASHI Name & Going back to beginning */}
            {finalProposalStep >= 2 && (
              <div className="space-y-4 pt-4 animate-fadeIn">
                <div className="font-serif text-5xl sm:text-7xl font-bold tracking-widest text-universe-gold drop-shadow-[0_0_40px_rgba(255,209,102,0.9)] animate-scaleUp">
                  RASHI
                </div>
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
              <div className="space-y-1.5 text-universe-gold font-serif italic text-lg sm:text-2xl animate-fadeIn">
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

                <div className="pt-2">
                  <TinyCharacters pose="holding-hands" caption="forever us, in every universe" />
                </div>

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
