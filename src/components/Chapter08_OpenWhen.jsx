import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Heart, Sparkles, X, Lock, CheckCircle2, KeyRound } from 'lucide-react';
import { sound } from '../utils/audioEngine';

const ENVELOPES = [
  {
    id: 'miss-me',
    title: 'open when you miss me',
    preview: 'When the distance feels a little too heavy and Lucknow feels too far...',
    riddle:
      'I waddle on cold feet across the snow,\nThe sacred creature you named me long ago.\nWhen miles between us start to blur and bend,\nWhat little bird whispers love that will not end?',
    acceptedAnswers: ['penguin', 'penguins', 'my penguin', 'chotu penguin', 'bacha', 'baccha', 'bachha'],
    message:
      "Close your eyes and put your right hand on your chest. Feel that rhythm? That's me carrying you with every heartbeat. No matter the miles, you are never alone. Whisper my name, text me, or gaze at our stars — I am always thinking of you, penguin. 800 miles is just a number on a map; my heart is right next to yours."
  },
  {
    id: 'angry-with-me',
    title: "open when you're angry with me",
    preview: 'When I did something clumsy, said the wrong thing, or made you sulk...',
    riddle:
      "You pout your lips and tell me I am bad,\n'Pagal kar degi' when you are hurt or sad.\nBefore our ten-minute timer starts to expire,\nWhat three words do I always text you first when we have a silly argument to make you smile?",
    acceptedAnswers: ['i am sorry', 'im sorry', "i'm sorry", 'sorry', '3-4', '3', '4', 'teen char', 'teen-char', '3-4 kisses', 'teen char kisses', 'three or four', 'teenchar'],
    message:
      "Hey baby... pause. Unclench your jaw. Take a slow, deep breath. I know I mess up, I know I can be stupid, but my intentions are never to hurt you. Remember our 10-minute rule: we can fight, but we don't go to bed angry. 'Pagal kar degi ye ladki' — 'haan, ho jao na mere pyaar mein pagal'. Come here, motu. Let me apologize properly, hold you, and give you those teen-char kisses you pretend not to want. I'm sorry, and I love you."
  },
  {
    id: 'cant-sleep',
    title: "open when you can't sleep",
    preview: 'When 3 AM overthinking keeps your eyes open in the quiet dark...',
    riddle:
      'Which late-night snack or drink did we always argue about ordering at 2 AM?\nOr what two words sealed the promise we made,\nTo ensure our lifetime love would never fade?',
    acceptedAnswers: [
      'maggi',
      'maggie',
      '2 am maggi',
      'permanent commitment',
      'permanent',
      'permanent commitment frm my side',
      'poori zindagi',
      'interval tak nhi'
    ],
    message:
      "Look out at the night sky or the quiet ceiling. I am awake under the very same stars, thinking about your breathing. Remember how we keep each other safe through the quiet hours? Close your eyes, picture my arm pulling you close under our blanket, and let go of the noise. I've got you. Sleep softly, my angel."
  },
  {
    id: 'need-reassurance',
    title: 'open when you need reassurance',
    preview: 'When old fears whisper that things might fall apart...',
    riddle:
      'What is the name of the constellation we promised to look at together under the same moon?\nOr what sweet title did you write through your tears,\nThat brought me back to smile away your fears?',
    acceptedAnswers: ['orion', 'orion constellation', 'wifeyy', 'wifey', 'heyy wifeyy', 'heyy wifey', 'my wifeyy'],
    message:
      "Listen to me clearly, Rashi: I am not going anywhere. We didn't fight through the scary hospital night, survive the 3 AM almost-endings, and exchange thousands of 'I love you's just to let go. You are my priority. You are my safe place. You don't have to be perfect to be loved by me. You just have to be you."
  },
  {
    id: 'need-to-smile',
    title: 'open when you need to smile',
    preview: 'When the day was draining and your face forgot to light up...',
    riddle:
      'Remember that goofy voice note I sent you after dropping my phone? What sound effect did I try to mimic?\nOr what four-letter endearment sets us apart?',
    acceptedAnswers: ['boing', 'boingg', 'boinggg', 'motu', 'mota'],
    message:
      "Think of me trying to explain something serious while you look at me and smirk. Think of how you negotiate 'bas teen-char kisses!' as if kisses are rationed. Think of the silly doodles, the hospital coma text where you wrote 'permanent commitment frm my side 🤧', and how we laugh at ourselves 5 minutes after sulking. You have the prettiest laugh in the world, baby. Smile for your Shivi."
  },
  {
    id: 'why-i-stayed',
    title: 'open when you want to know why i stayed',
    preview: 'Through every fight, misunderstanding, and storm...',
    riddle:
      'I don’t want shiny diamonds, crystal or gold,\nJust folded notebook strips for my hand to hold.\nWhat humble ring from our favorite song,\nProves where both our souls truly belong?',
    acceptedAnswers: ['paper rings', 'paper ring', 'paperrings'],
    message:
      "I didn't stay because it was easy. I stayed because you are worth every difficult conversation, every tear, and every compromise. I stayed because when everything in the world feels chaotic, you are the only one who feels like home. I stayed because loving you isn't a temporary mood — it's a decision I make with my whole soul every morning."
  },
  {
    id: 'choose-you-again',
    title: 'open when you wonder if i\'d choose you again',
    preview: 'If the universe reset and gave me eight billion other choices...',
    riddle:
      'If I had to travel through a thousand lifetimes to find you all over again, what word would I shout out first?\nWhat two sacred words will I always whisper back to you?',
    acceptedAnswers: ['rashi', 'choose you', 'i choose you', 'i choose you ♡', 'choosing you', 'keep choosing you'],
    message:
      "If I had to go back to 22 November 2025... If I had to relive every single argument, every hospital scare, every late-night panic... I would still choose you. Again. And again. And again. There has never been anyone else, and there will never be anyone else. You are my one person."
  }
];

const WRONG_FEEDBACK_QUOTES = [
  'hmm… you know this one, baby.',
  'not quite, motu ♡ think about us.',
  'close your eyes and remember what we always whisper...',
  'you know this one in your heart, my love.',
  'think about our WhatsApp chats… you got this.'
];

export default function Chapter08_OpenWhen() {
  const [activeEnvelope, setActiveEnvelope] = useState(null);
  const [unlockedIds, setUnlockedIds] = useState(new Set());
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [shake, setShake] = useState(false);

  // Restore unlocked envelopes from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('aucu_unlocked_envelopes');
      if (saved) {
        setUnlockedIds(new Set(JSON.parse(saved)));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const saveUnlocked = (id) => {
    setUnlockedIds((prev) => {
      const next = new Set(prev).add(id);
      try {
        localStorage.setItem('aucu_unlocked_envelopes', JSON.stringify(Array.from(next)));
      } catch {
        // Ignore
      }
      return next;
    });
  };

  const handleCardClick = (env) => {
    sound.playHeartClick();
    setActiveEnvelope(env);
    setUserAnswer('');
    setFeedback(null);
  };

  const handleSolveAttempt = (e) => {
    e.preventDefault();
    if (!activeEnvelope) return;

    const normalizedInput = userAnswer.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!normalizedInput) return;

    const isMatch = activeEnvelope.acceptedAnswers.some((ans) => {
      const normAns = ans.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
      return normAns === normalizedInput;
    });

    if (isMatch) {
      sound.playMatchSound();
      saveUnlocked(activeEnvelope.id);
      setFeedback(null);
      confetti({
        particleCount: 80,
        spread: 70,
        colors: ['#ff285e', '#f5b8c6', '#ffd166', '#ffffff']
      });
    } else {
      sound.playTone(180, 0.25);
      setShake(true);
      setTimeout(() => setShake(false), 500);

      const randomQuote =
        WRONG_FEEDBACK_QUOTES[Math.floor(Math.random() * WRONG_FEEDBACK_QUOTES.length)];
      setFeedback(randomQuote);
    }
  };

  return (
    <section id="chapter-8" className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 flex flex-col justify-center items-center relative z-20 select-none">
      <div className="max-w-5xl w-full text-center space-y-8 sm:space-y-10">
        
        {/* Header */}
        <div className="space-y-2 sm:space-y-3">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-universe-dustyPink font-medium px-3.5 py-1.5 rounded-full border border-universe-wine/40 bg-universe-darkBurgundy/40 inline-block">
            Chapter 08 — Digital Emergency Letters
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-universe-cream">
            Open When...
          </h2>
          <p className="font-sans text-xs sm:text-sm text-universe-lavender/80 max-w-lg mx-auto px-2">
            Every letter is sealed with its own poetic riddle from our chats and memories. Solve the riddle to unlock the letter inside. ({unlockedIds.size}/{ENVELOPES.length} Discovered)
          </p>
        </div>

        {/* Envelopes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 pt-2 sm:pt-4">
          {ENVELOPES.map((env) => {
            const hasOpened = unlockedIds.has(env.id);

            return (
              <div
                key={env.id}
                onClick={() => handleCardClick(env)}
                className={`group relative p-4 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all duration-300 cursor-pointer text-left flex flex-col justify-between space-y-3 sm:space-y-4 hover:scale-[1.02] sm:hover:scale-105 active:scale-[0.98] touch-manipulation ${
                  hasOpened
                    ? 'bg-universe-darkBurgundy/70 border-universe-gold/60 shadow-glow-gold/10'
                    : 'bg-gradient-to-b from-[#200c19] to-[#0d040a] border-universe-wine/50 hover:border-universe-glowingRed hover:shadow-glow-wine'
                }`}
              >
                {/* Envelope Stamp / Icon */}
                <div className="flex justify-between items-center">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                      hasOpened
                        ? 'bg-universe-crimson/30 border border-universe-glowingRed text-universe-gold'
                        : 'bg-universe-wine/30 border border-universe-blush/30 text-universe-blush'
                    }`}
                  >
                    {hasOpened ? <CheckCircle2 className="w-5 h-5 text-universe-gold" /> : <Mail className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </div>
                  <span
                    className={`font-mono text-[9px] sm:text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      hasOpened
                        ? 'bg-universe-gold/20 text-universe-gold border border-universe-gold/40'
                        : 'bg-universe-wine/30 text-universe-dustyPink border border-universe-wine/40'
                    }`}
                  >
                    {hasOpened ? 'Unlocked ♡' : 'Sealed Riddle 🔒'}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-serif text-sm sm:text-lg text-universe-cream font-medium group-hover:text-universe-blush transition-colors">
                    {env.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-universe-lavender/70 font-sans mt-1 line-clamp-2">
                    {env.preview}
                  </p>
                </div>

                {/* Action Prompt */}
                <div className="pt-2 border-t border-universe-wine/30 flex items-center justify-between text-xs text-universe-blush">
                  <span className="text-[11px] sm:text-xs font-mono">
                    {hasOpened ? 'Read Letter' : 'Solve Riddle'}
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: Riddle Input or Unlocked Letter */}
        {activeEnvelope && (
          <div
            onClick={() => setActiveEnvelope(null)}
            className="fixed inset-0 z-50 bg-universe-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-lg w-full bg-gradient-to-b from-[#240e1c] via-[#160611] to-[#0c0308] border border-universe-wine/80 rounded-3xl p-5 sm:p-8 text-left space-y-5 shadow-2xl relative max-h-[88vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveEnvelope(null)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-universe-lavender hover:text-white"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Envelope Modal Header */}
              <div className="flex items-center gap-3 pr-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-universe-crimson/20 border border-universe-glowingRed/50 flex items-center justify-center text-universe-blush shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-universe-dustyPink font-mono">
                    {unlockedIds.has(activeEnvelope.id) ? 'Discovered Letter ♡' : 'Poetic Love Riddle'}
                  </span>
                  <h3 className="font-serif text-lg sm:text-2xl text-universe-cream">
                    {activeEnvelope.title}
                  </h3>
                </div>
              </div>

              {/* IF NOT UNLOCKED: SHOW POETIC RIDDLE SCREEN */}
              {!unlockedIds.has(activeEnvelope.id) ? (
                <div className="space-y-4">
                  
                  {/* Riddle Poem Box */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-universe-black/60 border border-universe-wine/50 space-y-3">
                    <div className="flex items-center gap-2 text-universe-gold text-xs font-mono tracking-wider uppercase">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Solve to Open</span>
                    </div>

                    <p className="font-serif italic text-sm sm:text-base text-universe-cream/95 leading-relaxed whitespace-pre-line">
                      "{activeEnvelope.riddle}"
                    </p>
                  </div>

                  {/* Answer Form */}
                  <form onSubmit={handleSolveAttempt} className="space-y-3">
                    <div className={`relative transition-transform ${shake ? 'animate-shake' : ''}`}>
                      <input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => {
                          setUserAnswer(e.target.value);
                          setFeedback(null);
                        }}
                        placeholder="type your answer here..."
                        autoFocus
                        className="w-full px-4 py-3 rounded-full bg-universe-black/80 border border-universe-wine/70 text-universe-cream text-xs sm:text-sm font-mono focus:outline-none focus:border-universe-gold placeholder:text-universe-lavender/40 transition-colors"
                      />
                    </div>

                    {/* Playful Wrong Answer Feedback (No answers revealed!) */}
                    {feedback && (
                      <div className="p-2.5 rounded-xl bg-universe-crimson/20 border border-universe-crimson/50 text-center animate-fadeIn">
                        <p className="font-serif italic text-xs sm:text-sm text-universe-blush">
                          {feedback}
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3 rounded-full bg-gradient-to-r from-universe-crimson to-universe-glowingRed text-white text-xs font-mono uppercase tracking-widest font-bold shadow-glow-red hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2"
                    >
                      <KeyRound className="w-4 h-4" />
                      <span>Unlock Letter ♡</span>
                    </button>
                  </form>

                </div>
              ) : (
                /* IF UNLOCKED: SHOW THE COMPLETE DIGITAL LOVE LETTER */
                <div className="space-y-5 animate-fadeIn">
                  
                  <div className="p-5 sm:p-7 rounded-2xl bg-gradient-to-b from-[#1d0815] to-[#0a0208] border border-universe-gold/40 shadow-inner relative overflow-hidden">
                    <div className="absolute top-2 right-3 font-mono text-[9px] text-universe-gold/60">
                      Riddle Solved ✦
                    </div>

                    <p className="font-serif italic text-sm sm:text-lg text-universe-cream/95 leading-relaxed">
                      "{activeEnvelope.message}"
                    </p>

                    <div className="pt-4 border-t border-universe-wine/30 mt-4 flex justify-between items-center">
                      <span className="text-[10px] font-mono text-universe-dustyPink">
                        Always here for you
                      </span>
                      <p className="font-handwritten text-xl sm:text-2xl text-universe-blush">
                        Your Shivi ♡
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => setActiveEnvelope(null)}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-universe-wine/40 border border-universe-wine/60 text-xs uppercase tracking-widest text-universe-cream hover:text-white transition-all text-center"
                    >
                      I Feel Safe Now ♡
                    </button>
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
