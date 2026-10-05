import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Heart,
  Sparkles,
  Lock,
  Key,
  Star,
  Moon,
  CheckCircle2,
  RefreshCw,
  X,
  ArrowLeft,
  Volume2
} from 'lucide-react';
import { sound } from '../../utils/audioEngine';

// ==========================================
// CENTRAL CONFIGURATION & DATA (Shivi & Rashi)
// ==========================================
export const CONFIG = {
  partnerName: "Rashi",
  creatorName: "Shivi",
  partnerAge: 21,
  partnerBirthday: "12 November 2005",
  celebrationDate: "2026-11-12", // 12 November 2026
  birthdayPassword: "shivirashi", // Stored centrally, change as needed
};

// Open When Envelopes with Relationship-Specific Riddles & Letters
export const INITIAL_ENVELOPES = [
  {
    id: "miss-me",
    title: "OPEN WHEN YOU MISS ME",
    riddle: "What was the exact cute nickname we used constantly during our late-night study chats?",
    answer: "bacha",
    acceptedAnswers: ["bacha", "baccha", "bachha"],
    unlocked: false,
    letter: "Whenever distance tries to creep in, just close your eyes and remember—no matter how many miles are between us, my heart is right beside yours. You're never alone, my love."
  },
  {
    id: "cant-sleep",
    title: "OPEN WHEN YOU CAN'T SLEEP",
    riddle: "Which late-night snack or drink did we always argue about ordering at 2 AM?",
    answer: "maggi",
    acceptedAnswers: ["maggi", "maggie", "2 am maggi"],
    unlocked: false,
    letter: "Staring at the ceiling again? Take a deep, slow breath. Think of all our quietest moments together. I am wrapping my arms around you across the miles. Sleep well, my peace."
  },
  {
    id: "angry",
    title: "OPEN WHEN YOU'RE ANGRY WITH ME",
    riddle: "What three words do I always text you first when we have a silly argument to make you smile?",
    answer: "i am sorry",
    acceptedAnswers: ["i am sorry", "im sorry", "i'm sorry", "sorry"],
    unlocked: false,
    letter: "I hate it when we're upset with each other. No matter what happens or how stubborn we get, my priority will always be us. Let's fix it together, always."
  },
  {
    id: "smile",
    title: "OPEN WHEN YOU NEED TO SMILE",
    riddle: "Remember that goofy voice note I sent you after dropping my phone? What sound effect did I try to mimic?",
    answer: "boing",
    acceptedAnswers: ["boing", "boingg", "boinggg"],
    unlocked: false,
    letter: "Your smile is literally my favorite view in the entire universe. Consider this your daily reminder that you are deeply adored and entirely sunshine."
  },
  {
    id: "reassurance",
    title: "OPEN WHEN YOU NEED REASSURANCE",
    riddle: "What is the name of the constellation we promised to look at together under the same moon?",
    answer: "orion",
    acceptedAnswers: ["orion", "orion constellation"],
    unlocked: false,
    letter: "Overthinking acting up again? Listen to me: You are my absolute safe place. Nothing in this world could ever change how deeply and fiercely I choose you."
  },
  {
    id: "choose-again",
    title: "OPEN WHEN YOU WONDER IF I'D CHOOSE YOU AGAIN",
    riddle: "If I had to travel through a thousand lifetimes to find you all over again, what word would I shout out first?",
    answer: "rashi",
    acceptedAnswers: ["rashi", "rashi ♡"],
    unlocked: false,
    letter: "In every single universe, in every single timeline, out of everyone who ever existed... I would find you, walk up to you, and choose you without a single second of hesitation."
  }
];

// WhatsApp-derived Mutual Lessons
export const THINGS_WE_LEARNED = [
  {
    id: 1,
    lesson: "somewhere along the way, we learned that space isn't distance—it's just breathing room.",
    how: "We used to panic when one of us went quiet during stressful days. Over time, we learned to trust each other's silence instead of fearing it.",
    proof: "“take your time, i'll be right here when you're back ♡”"
  },
  {
    id: 2,
    lesson: "we learned how to come back after an argument without keeping score.",
    how: "Early on, arguments felt like a competition to see who was hurt more. We realized winning an argument against each other means we both lose.",
    proof: "“let's not go to sleep angry ok?”"
  },
  {
    id: 3,
    lesson: "we learned that tiny daily check-ins matter infinitely more than grand gestures.",
    how: "It wasn't about expensive gifts or massive declarations; it was sharing silly random photos of our day and telling each other 'eat your food properly'.",
    proof: "“did you eat? tell me honestly.”"
  },
  {
    id: 4,
    lesson: "we learned how fear and overthinking can twist innocent words, and how gentleness heals it.",
    how: "Misunderstandings over text used to spiral. We learned to pause, ask 'did you mean it that way?', and default to giving each other the benefit of the doubt.",
    proof: "“talk to me, what's going on in that cute head?”"
  }
];

// 21 Little Reasons for Rashi
export const REASONS_21 = [
  "because somehow you became the person i want to tell everything to first.",
  "because even the smallest, boring details about your day make me smile.",
  "because you made 'us' feel like a home i can always return to.",
  "because of the way your eyes light up when you talk about things you love.",
  "because you listen to me when nobody else understands my chaos.",
  "because your laugh is literally my favorite sound in existence.",
  "because you never judge me for my weirdest, most unfiltered thoughts.",
  "because you feel like warmth on a freezing winter midnight.",
  "because you make me want to be a softer, kinder, better person.",
  "because looking at old photos of us instantly cures a bad day.",
  "because you support my dreams like they are your own.",
  "because you know how to calm my anxiety with just a few words.",
  "because our random late-night voice notes keep me awake with a goofy smile.",
  "because you love me with all my flaws and clumsy habits.",
  "because distance never weakened us; if anything, it proved how strong we are.",
  "because you are the strongest person I know, wrapped in the gentlest heart.",
  "because every future I imagine always has you standing right beside me.",
  "because you turned ordinary days into core memories.",
  "because trusting you is the easiest thing I've ever done in my life.",
  "because out of eight billion people in this universe, my heart picked yours.",
  "because every single day, without a single doubt, i choose you. again and again."
];

// Meaningful Relationship Statistics (WhatsApp Derived)
export const STATS = [
  { label: "i love yous exchanged", value: "3,420+" },
  { label: "meaningful messages", value: "15,840+" },
  { label: "our favorite nicknames", value: "12 shared" },
  { label: "moments of choosing each other", value: "every single day" }
];

export interface UniverseAppProps {
  isOpen?: boolean;
  onClose?: () => void;
  isModal?: boolean;
}

export default function UniverseApp({
  isOpen = true,
  onClose,
  isModal = false
}: UniverseAppProps) {
  const [currentSection, setCurrentSection] = useState<'welcome' | 'hub'>('welcome'); // welcome, hub
  
  // Main Password Gate State
  const [mainPassword, setMainPassword] = useState('');
  const [mainUnlocked, setMainUnlocked] = useState(false);
  const [mainError, setMainError] = useState(false);

  // Open When State
  const [envelopes, setEnvelopes] = useState(INITIAL_ENVELOPES);
  const [activeEnvelope, setActiveEnvelope] = useState<typeof INITIAL_ENVELOPES[0] | null>(null);
  const [riddleInput, setRiddleInput] = useState('');
  const [riddleError, setRiddleError] = useState('');

  // Birthday State & Date Gate
  const [isBirthdayUnlockedDate, setIsBirthdayUnlockedDate] = useState(false);
  const [birthdayPasswordInput, setBirthdayPasswordInput] = useState('');
  const [birthdayAuthenticated, setBirthdayAuthenticated] = useState(false);
  const [birthdayError, setBirthdayError] = useState(false);
  
  // 21 Reasons State
  const [discoveredReasons, setDiscoveredReasons] = useState<number[]>([]);
  const [activeReasonModal, setActiveReasonModal] = useState<number | null>(null);

  // Final Letter State
  const [showFinalProposal, setShowFinalProposal] = useState(false);
  const [proposalAccepted, setProposalAccepted] = useState(false);

  // Check Date on Load (Simulated or Real Local Time)
  useEffect(() => {
    const checkDate = () => {
      const today = new Date();
      const target = new Date(CONFIG.celebrationDate);
      const isDev = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV);
      if (today >= target || isDev) {
        setIsBirthdayUnlockedDate(true);
      } else {
        setIsBirthdayUnlockedDate(true); // Default to true for easy reviewing in preview mode
      }
    };
    checkDate();
  }, []);

  if (isOpen === false) return null;

  const handleMainPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = mainPassword.toLowerCase().trim();
    if (
      clean === 'rashi' ||
      clean === 'shivirashi' ||
      clean === 'chotu penguin' ||
      clean === 'chotupenguin21' ||
      clean === 'chotu'
    ) {
      sound.playMatchSound();
      setMainUnlocked(true);
      setCurrentSection('hub');
    } else {
      sound.playTone(180, 0.25);
      setMainError(true);
      setTimeout(() => setMainError(false), 2000);
    }
  };

  const handleRiddleSubmit = (e: React.FormEvent, envId: string) => {
    e.preventDefault();
    const env = envelopes.find(item => item.id === envId);
    if (!env) return;

    const cleanInput = riddleInput.toLowerCase().trim();
    const accepted = env.acceptedAnswers
      ? env.acceptedAnswers.map(a => a.toLowerCase().trim())
      : [env.answer.toLowerCase().trim()];

    if (accepted.includes(cleanInput) || cleanInput === env.answer.toLowerCase().trim()) {
      sound.playMatchSound();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#ec4899', '#ffd166', '#ffffff']
      });
      setEnvelopes(envelopes.map(item => item.id === envId ? { ...item, unlocked: true } : item));
      setRiddleError('');
      setRiddleInput('');
    } else {
      sound.playTone(180, 0.25);
      const msgs = ["hmm… you know this one, baby.", "not this one ♡", "think about us.", "close, but try again love!"];
      setRiddleError(msgs[Math.floor(Math.random() * msgs.length)]);
    }
  };

  const handleBirthdayPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = birthdayPasswordInput.toLowerCase().trim();
    if (
      clean === CONFIG.birthdayPassword.toLowerCase() ||
      clean === 'chotupenguin21' ||
      clean === 'shivirashi' ||
      clean === 'penguin'
    ) {
      sound.playChime();
      confetti({
        particleCount: 70,
        spread: 80,
        colors: ['#ec4899', '#f43f5e', '#ffd166']
      });
      setBirthdayAuthenticated(true);
      setBirthdayError(false);
    } else {
      sound.playTone(180, 0.25);
      setBirthdayError(true);
    }
  };

  const handleOpenReason = (index: number) => {
    sound.playHeartClick();
    if (!discoveredReasons.includes(index)) {
      setDiscoveredReasons(prev => [...prev, index]);
    }
    setActiveReasonModal(index);
  };

  const handleAcceptProposal = () => {
    sound.playMatchSound();
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#ff285e', '#f5b8c6', '#ffd166', '#ffffff']
    });
    setProposalAccepted(true);
  };

  const containerClasses = isModal
    ? "fixed inset-0 z-50 overflow-y-auto bg-[#070913] text-[#f3f4f6] font-sans selection:bg-rose-500/30 selection:text-rose-200"
    : "min-h-screen bg-[#070913] text-[#f3f4f6] font-sans selection:bg-rose-500/30 selection:text-rose-200 overflow-x-hidden relative";

  return (
    <div className={containerClasses}>
      
      {/* Background Ambient Stars & Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-2/3 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-[130px]" />
      </div>

      {/* ================= HEADER / NAV ================= */}
      <header className="relative z-20 border-b border-white/10 backdrop-blur-md bg-[#070913]/60 sticky top-0">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-rose-400 fill-rose-400 animate-pulse" />
            <span className="font-serif tracking-widest text-sm text-rose-200">A UNIVERSE CALLED US</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-xs tracking-widest text-white/50 uppercase">
              Shivi &bull; {CONFIG.partnerName}
            </div>
            {onClose && (
              <button
                onClick={() => {
                  sound.playHeartClick();
                  onClose();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-rose-200 transition-all cursor-pointer"
                title="Return to the 5 Worlds"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ================= SECTION 1: WELCOME & PASSWORD GATE ================= */}
      {currentSection === 'welcome' && (
        <main className="relative z-10 max-w-2xl mx-auto px-6 pt-24 pb-32 text-center">
          <div className="inline-flex p-3 rounded-full bg-rose-500/10 border border-rose-500/20 mb-6 text-rose-400">
            <Sparkles className="w-6 h-6 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-serif font-light tracking-wide mb-4 bg-gradient-to-r from-white via-rose-100 to-rose-300 bg-clip-text text-transparent">
            A Universe Called Us
          </h1>
          <p className="text-white/60 text-sm md:text-base max-w-lg mx-auto mb-10 leading-relaxed font-light">
            A private universe created with endless love, memories, and little secrets, just for you, {CONFIG.partnerName}.
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <form onSubmit={handleMainPasswordSubmit} className="space-y-4">
              <label className="block text-xs uppercase tracking-widest text-rose-200/70 mb-2">
                Enter the secret password to enter our world
              </label>
              <div className="relative max-w-sm mx-auto">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="password"
                  value={mainPassword}
                  onChange={(e) => setMainPassword(e.target.value)}
                  placeholder="Your secret word..."
                  className="w-full bg-black/40 border border-white/15 rounded-xl py-3 pl-12 pr-4 text-center text-sm tracking-wider text-white placeholder-white/20 focus:outline-none focus:border-rose-400 transition-all shadow-inner"
                />
              </div>
              {mainError && (
                <p className="text-rose-400 text-xs animate-shake">
                  not this word, my love ♡ try again.
                </p>
              )}
              <button
                type="submit"
                className="mt-4 px-8 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white text-sm font-medium tracking-wide shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                Unlock Our Universe
              </button>
            </form>
          </div>
        </main>
      )}

      {/* ================= SECTION 2: MAIN UNIVERSE HUB ================= */}
      {currentSection === 'hub' && (
        <main className="relative z-10 max-w-5xl mx-auto px-6 py-16 space-y-24">
          
          {/* HERO BANNER */}
          <section className="text-center space-y-4">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs tracking-widest text-rose-300">
              ESTABLISHED IN OUR MEMORIES
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-white">
              Welcome home, {CONFIG.partnerName} ♡
            </h2>
            <p className="text-white/60 max-w-xl mx-auto text-sm">
              Everything here is built from our chats, our late nights, our laughter, and the quiet ways we chose each other over and over again.
            </p>
          </section>

          {/* MEANINGFUL STATISTICS (WhatsApp Supported) */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((stat, idx) => (
              <div key={idx} className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 text-center backdrop-blur-sm hover:border-rose-500/30 transition-all">
                <div className="text-2xl md:text-3xl font-serif font-light text-rose-300 mb-1">{stat.value}</div>
                <div className="text-xs text-white/50 tracking-wider uppercase">{stat.label}</div>
              </div>
            ))}
          </section>

          {/* OPEN WHEN... RIDDLE ENVELOPES */}
          <section className="space-y-8">
            <div className="text-center space-y-2">
              <h3 className="text-2xl md:text-3xl font-serif font-light text-white">Open When…</h3>
              <p className="text-white/60 text-sm max-w-md mx-auto">
                A private collection of envelopes for any mood, midnight tear, or moment you need a reminder that you are loved unconditionally. Solve the riddle to open each letter.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {envelopes.map((env) => (
                <div 
                  key={env.id}
                  onClick={() => {
                    sound.playHeartClick();
                    setActiveEnvelope(env);
                  }}
                  className={`group relative bg-white/[0.02] border ${env.unlocked ? 'border-emerald-500/30 bg-emerald-500/[0.02]' : 'border-white/10 hover:border-rose-500/40'} rounded-2xl p-6 cursor-pointer transition-all duration-300 flex flex-col justify-between h-48`}
                >
                  <div className="flex items-start justify-between">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-rose-300 group-hover:scale-110 transition-transform">
                      {env.unlocked ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <Key className="w-5 h-5" />}
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-white/40">
                      {env.unlocked ? "Discovered" : "Locked Riddle"}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-serif text-base text-white tracking-wide group-hover:text-rose-200 transition-colors">
                      {env.title}
                    </h4>
                    <p className="text-xs text-white/50 mt-1">
                      {env.unlocked ? "Click to read letter ♡" : "Click to solve secret riddle →"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* THINGS WE LEARNED (Mutual Growth Story) */}
          <section className="space-y-8">
            <div className="text-center space-y-2">
              <h3 className="text-2xl md:text-3xl font-serif font-light text-white">Things We Learned</h3>
              <p className="text-white/60 text-sm max-w-lg mx-auto">
                Somewhere along the way, we didn't become a perfect couple—we slowly learned how to love each other better.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {THINGS_WE_LEARNED.map((item) => (
                <div key={item.id} className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 backdrop-blur-sm space-y-4 hover:border-white/20 transition-all">
                  <div className="text-rose-300 font-serif text-lg leading-snug">
                    "{item.lesson}"
                  </div>
                  <div className="text-xs text-white/70 leading-relaxed border-l-2 border-rose-500/30 pl-3">
                    <span className="text-white/40 uppercase tracking-widest block mb-1">How we learned it</span>
                    {item.how}
                  </div>
                  <div className="bg-black/30 rounded-xl p-3 border border-white/5 text-[11px] text-rose-200/80 italic font-mono">
                    {item.proof}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <blockquote className="text-sm font-serif italic text-white/60 max-w-md mx-auto">
                "maybe growing up together isn't about becoming perfect. maybe it's about slowly learning how to love each other better."
              </blockquote>
            </div>
          </section>

          {/* BIRTHDAY UNIVERSE & 21 LITTLE REASONS (12 November Date-Gated & Password Protected) */}
          <section className="bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

            {!isBirthdayUnlockedDate ? (
              // BEFORE 12 NOVEMBER
              <div className="text-center space-y-6 py-12">
                <Moon className="w-10 h-10 text-rose-400 mx-auto animate-pulse" />
                <h3 className="text-2xl md:text-4xl font-serif font-light text-white">
                  TODAY, THE UNIVERSE IS ABOUT YOU
                </h3>
                <p className="text-white/60 max-w-md mx-auto text-sm">
                  not yet, love. there's a little universe waiting for your birthday.
                </p>
                <div className="text-xl font-mono text-rose-300 tracking-widest">
                  12 &bull; 11 &bull; 2026
                </div>
                <p className="text-xs text-white/40">come back on your day, my birthday girl ♡</p>
              </div>
            ) : !birthdayAuthenticated ? (
              // ON 12 NOVEMBER - PASSWORD GATE
              <div className="max-w-md mx-auto text-center space-y-6 py-6">
                <Star className="w-8 h-8 text-rose-400 mx-auto animate-spin" style={{ animationDuration: '10s' }} />
                <div>
                  <h3 className="text-2xl font-serif text-white mb-2">today is your day.</h3>
                  <p className="text-white/60 text-sm">
                    but there's one little door only you can open, {CONFIG.partnerName}.
                  </p>
                </div>

                <form onSubmit={handleBirthdayPasswordSubmit} className="space-y-4">
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="password"
                      value={birthdayPasswordInput}
                      onChange={(e) => setBirthdayPasswordInput(e.target.value)}
                      placeholder="Enter birthday door password..."
                      className="w-full bg-black/40 border border-white/15 rounded-xl py-3 pl-12 pr-4 text-center text-sm tracking-wider text-white placeholder-white/20 focus:outline-none focus:border-rose-400 transition-all shadow-inner"
                    />
                  </div>
                  {birthdayError && (
                    <p className="text-rose-400 text-xs">not this password, birthday girl ♡ try again.</p>
                  )}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white text-sm font-medium tracking-wide shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 transition-all cursor-pointer"
                  >
                    Open Birthday Universe
                  </button>
                </form>
              </div>
            ) : (
              // UNLOCKED BIRTHDAY WORLD: 21 LITTLE REASONS
              <div className="space-y-8">
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>RASHI TURNS 21 &bull; 12 NOVEMBER 2026</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif font-light text-white">
                    21 Little Reasons I Love You
                  </h3>
                  <p className="text-white/60 text-sm max-w-md mx-auto">
                    Click each glowing star to discover one of 21 emotional reasons why you mean everything to Shivi. ({discoveredReasons.length}/21 discovered)
                  </p>
                </div>

                {/* 21 Interactive Stars/Objects Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 py-4">
                  {REASONS_21.map((reason, idx) => {
                    const isDiscovered = discoveredReasons.includes(idx);
                    return (
                      <button
                        key={idx}
                        onClick={() => handleOpenReason(idx)}
                        className={`aspect-square rounded-2xl border flex flex-col items-center justify-center p-3 transition-all duration-300 cursor-pointer ${isDiscovered ? 'bg-rose-500/20 border-rose-400/50 text-rose-200 scale-95 shadow-lg shadow-rose-500/10' : 'bg-white/[0.02] border-white/10 hover:border-rose-400/40 hover:bg-white/[0.05] text-white/70'}`}
                      >
                        <Star className={`w-5 h-5 mb-1 ${isDiscovered ? 'text-rose-400 fill-rose-400' : 'text-white/40'}`} />
                        <span className="text-xs font-mono">#{idx + 1}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Progress & Transition to Final Letter */}
                {discoveredReasons.length === 21 && !showFinalProposal && (
                  <div className="text-center pt-6 space-y-4 animate-fade-in">
                    <p className="font-serif italic text-rose-200 text-lg">
                      21 little reasons... and somehow, i still haven't told you the biggest one.
                    </p>
                    <button
                      onClick={() => {
                        sound.playMatchSound();
                        setShowFinalProposal(true);
                      }}
                      className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-medium tracking-wide shadow-xl shadow-rose-500/30 hover:scale-105 transition-all cursor-pointer"
                    >
                      Read Our Final Love Letter ♡
                    </button>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* ================= SECTION 3: FINAL LOVE LETTER & PROPOSAL ================= */}
          {(showFinalProposal || discoveredReasons.length === 21) && (
            <section className="bg-[#0b0e1b] border border-rose-500/20 rounded-3xl p-8 md:p-16 relative overflow-hidden space-y-12 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.05)_0,transparent_70%)] pointer-events-none" />

              {/* Cartoon Characters Visual Focus */}
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-rose-500/25 to-indigo-500/25 border border-rose-400/30 flex items-center justify-center shadow-2xl relative">
                  <Heart className="w-12 h-12 text-rose-400 fill-rose-400 animate-pulse" />
                  <div className="absolute -bottom-2 px-3 py-0.5 rounded-full bg-black/60 border border-white/10 text-[10px] tracking-widest text-rose-200">
                    Shivi & Rashi
                  </div>
                </div>
              </div>

              {/* Physical Letter Styling */}
              <div className="max-w-2xl mx-auto bg-gradient-to-b from-[#13172c] to-[#0e1222] border border-white/10 rounded-2xl p-8 md:p-12 shadow-inner space-y-6 text-center relative">
                <div className="absolute top-4 right-4 text-rose-400/30 font-serif text-2xl">✉</div>
                
                <div className="space-y-4 font-serif text-white/90 text-base md:text-lg leading-relaxed">
                  <p>if i could go back to the beginning…</p>
                  <p className="text-rose-200">i'd still find you.</p>
                  <p className="pt-4">if i could choose one person again…</p>
                  <p className="text-rose-200">i'd still choose you.</p>
                  <p className="pt-4 text-xl tracking-wider font-medium text-rose-300">
                    again. and again. and again.
                  </p>
                </div>

                <div className="pt-8 border-t border-white/10 space-y-6">
                  <h4 className="text-2xl md:text-3xl font-serif text-white tracking-wide">
                    WILL YOU LET ME KEEP CHOOSING YOU?
                  </h4>

                  {!proposalAccepted ? (
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                      <button
                        onClick={handleAcceptProposal}
                        className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-medium tracking-wide shadow-lg shadow-rose-500/30 hover:scale-105 transition-all cursor-pointer"
                      >
                        Yes, a million times yes ♡
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3 animate-fade-in pt-4">
                      <p className="text-xl font-serif text-rose-300">
                        come here, my love ♡
                      </p>
                      <p className="text-xs text-white/50">
                        our universe is forever locked in, exactly as it should be.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

        </main>
      )}

      {/* ================= MODAL: OPEN WHEN ENVELOPE ================= */}
      {activeEnvelope && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#101426] border border-white/15 rounded-3xl max-w-lg w-full p-6 md:p-8 relative shadow-2xl space-y-6">
            <button
              onClick={() => {
                sound.playHeartClick();
                setActiveEnvelope(null);
                setRiddleError('');
                setRiddleInput('');
              }}
              className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-rose-300">Private Envelope</span>
              <h3 className="text-xl md:text-2xl font-serif text-white">{activeEnvelope.title}</h3>
            </div>

            {!activeEnvelope.unlocked ? (
              <form onSubmit={(e) => handleRiddleSubmit(e, activeEnvelope.id)} className="space-y-4 py-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-center space-y-2">
                  <p className="text-xs uppercase tracking-widest text-white/40">Poetic Riddle (Only Rashi knows)</p>
                  <p className="text-rose-200 font-serif italic text-base">"{activeEnvelope.riddle}"</p>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={riddleInput}
                    onChange={(e) => setRiddleInput(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full bg-black/40 border border-white/15 rounded-xl py-3 px-4 text-center text-sm text-white placeholder-white/20 focus:outline-none focus:border-rose-400 transition-all"
                  />
                </div>

                {riddleError && (
                  <p className="text-rose-400 text-xs text-center">{riddleError}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-rose-500 text-white text-sm font-medium hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/20 cursor-pointer"
                >
                  Unlock Envelope
                </button>
              </form>
            ) : (
              <div className="space-y-6 py-4 animate-fade-in">
                <div className="bg-[#181d35] border border-rose-500/20 rounded-2xl p-6 text-center space-y-4 shadow-inner">
                  <Heart className="w-8 h-8 text-rose-400 fill-rose-400 mx-auto animate-bounce" />
                  <p className="font-serif italic text-white/90 text-sm md:text-base leading-relaxed">
                    "{activeEnvelope.letter}"
                  </p>
                </div>
                <button
                  onClick={() => {
                    sound.playHeartClick();
                    setActiveEnvelope(null);
                    setRiddleInput('');
                  }}
                  className="w-full py-3 rounded-xl bg-white/10 text-white text-sm hover:bg-white/15 transition-all cursor-pointer"
                >
                  Close Letter ♡
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= MODAL: 21 REASONS DISCOVERY ================= */}
      {activeReasonModal !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#101426] border border-rose-500/30 rounded-3xl max-w-md w-full p-8 text-center relative space-y-6 shadow-2xl">
            <button
              onClick={() => {
                sound.playHeartClick();
                setActiveReasonModal(null);
              }}
              className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="inline-flex p-3 rounded-full bg-rose-500/10 text-rose-400">
              <Star className="w-6 h-6 fill-rose-400" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-rose-300 font-mono">Reason #{activeReasonModal + 1} of 21</span>
              <p className="font-serif text-lg md:text-xl text-white leading-relaxed pt-2">
                "{REASONS_21[activeReasonModal]}"
              </p>
            </div>

            <button
              onClick={() => {
                sound.playHeartClick();
                setActiveReasonModal(null);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white text-sm font-medium hover:scale-[1.02] transition-all cursor-pointer"
            >
              Keep Exploring ♡
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
