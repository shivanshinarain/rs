import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, HelpCircle, Check, ArrowRight, RotateCcw } from 'lucide-react';
import { sound } from '../../utils/audioEngine';

interface QuizQuestion {
  id: number;
  question: string;
  hint: string;
  acceptedAnswers: string[];
  solvedFeedback: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What secret bird nickname became our sacred teasing title?",
    hint: "Waddles with cold feet, starts with 'P': P------",
    acceptedAnswers: ['PENGUIN', 'CHOTU PENGUIN', 'CHOTUPENGUIN', 'MY PENGUIN'],
    solvedFeedback: "you remember. ♡ nobody else in the world gets to be my penguin."
  },
  {
    id: 2,
    question: "What sacred milestone occurred on 22 November 2025?",
    hint: "The day we went from strangers to permanent commitment.",
    acceptedAnswers: ['PROPOSAL', 'BECAME A COUPLE', 'COUPLE', 'RELATIONSHIP', 'PERMANENT COMMITMENT', 'ANNIVERSARY', 'OUR DAY'],
    solvedFeedback: "you remember. ♡ the day the universe smiled and said 'finally'."
  },
  {
    id: 3,
    question: "Complete Shivi's proposal clause: 'Meko aap hamesha saath chahiye... ________ tak nhi.'",
    hint: "Bollywood movies stop at the halfway break, but we never will.",
    acceptedAnswers: ['INTERVAL', 'INTERVAL TAK NHI', 'INTERVAL TAK NAHI', 'INTERVAL TAK'],
    solvedFeedback: "you remember. ♡ not just for half the show, but for the entire lifetime."
  },
  {
    id: 4,
    question: "In your hospital coma prayer letter, what title began your message to Shivi?",
    hint: "Starts with W and ends with double Y: W-I-F-E-Y-Y",
    acceptedAnswers: ['WIFEYY', 'HEYY WIFEYY', 'MY WIFEYY', 'WIFEY'],
    solvedFeedback: "you remember. ♡ the words that held my soul when everything was dark."
  },
  {
    id: 5,
    question: "What kind of rings will we marry with, loud and proud?",
    hint: "Taylor Swift sings it: 'I like shiny things, but I'd marry you with _____ rings'",
    acceptedAnswers: ['PAPER RINGS', 'PAPER RING', 'PAPER', 'PAPER RINGS BY TAYLOR SWIFT'],
    solvedFeedback: "you remember. ♡ paper rings forever and always."
  }
];

export default function IfYouReallyKnowMe() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ status: 'correct' | 'wrong' | null; message: string }>({
    status: null,
    message: ''
  });
  const [solvedCount, setSolvedCount] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex] || QUIZ_QUESTIONS[0];
  const isFinished = currentIndex >= QUIZ_QUESTIONS.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedAnswer.trim()) return;

    const normalized = typedAnswer.trim().toUpperCase();
    const isCorrect = currentQ.acceptedAnswers.some(ans => normalized.includes(ans) || ans.includes(normalized));

    if (isCorrect) {
      sound.playMatchSound();
      confetti({
        particleCount: 50,
        spread: 60,
        colors: ['#ff285e', '#f5b8c6', '#ffd166']
      });

      setFeedback({
        status: 'correct',
        message: currentQ.solvedFeedback
      });
      setSolvedCount(prev => prev + 1);

      setTimeout(() => {
        setTypedAnswer('');
        setFeedback({ status: null, message: '' });
        setShowHint(false);
        setCurrentIndex(prev => prev + 1);
      }, 2000);
    } else {
      sound.playTone(180, 0.25);
      setFeedback({
        status: 'wrong',
        message: "close… you know me better than that. think with your heart ♡"
      });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSolvedCount(0);
    setTypedAnswer('');
    setFeedback({ status: null, message: '' });
    setShowHint(false);
  };

  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 flex flex-col items-center justify-center select-none">
      <div className="max-w-xl w-full text-center space-y-6 sm:space-y-8">
        
        {/* Header */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-universe-dustyPink px-3.5 py-1.5 rounded-full border border-universe-wine/40 bg-universe-darkBurgundy/40 inline-flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-universe-glowingRed fill-universe-glowingRed" />
            Personal Trivia
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-universe-cream">
            If You Really Know Me...
          </h2>
          <p className="font-serif italic text-xs sm:text-sm text-universe-blush">
            "No multiple choices here. Just the memories etched in our real conversations."
          </p>
        </div>

        {/* Card Arena */}
        {!isFinished ? (
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#200918] to-[#0a0308] border border-universe-wine/70 shadow-2xl space-y-5 text-left">
            
            {/* Question Progress Pill */}
            <div className="flex items-center justify-between text-[11px] font-mono text-universe-dustyPink">
              <span>Question {currentIndex + 1} of {QUIZ_QUESTIONS.length}</span>
              <span>Solved: {solvedCount} ♡</span>
            </div>

            {/* The Question */}
            <h3 className="font-serif text-base sm:text-lg text-universe-cream font-medium leading-relaxed">
              "{currentQ.question}"
            </h3>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                value={typedAnswer}
                onChange={(e) => setTypedAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full px-4 py-3 rounded-2xl bg-universe-black/80 border border-universe-wine/60 text-universe-cream text-sm font-mono focus:outline-none focus:border-universe-glowingRed transition-colors"
                autoFocus
              />

              <div className="flex items-center justify-between gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowHint(!showHint)}
                  className="text-[11px] font-mono text-universe-lavender/60 hover:text-universe-blush flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{showHint ? 'Hide Clue' : 'Need a whisper?'}</span>
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-universe-crimson hover:bg-universe-glowingRed text-white text-xs font-mono font-semibold uppercase tracking-wider shadow-glow-red hover:scale-105 active:scale-95 transition-all"
                >
                  Check ♡
                </button>
              </div>
            </form>

            {/* Hint Box */}
            {showHint && (
              <div className="p-3 rounded-xl bg-universe-darkBurgundy/40 border border-universe-wine/40 text-xs font-serif italic text-universe-blush animate-fadeIn">
                "{currentQ.hint}"
              </div>
            )}

            {/* Feedback Alert */}
            {feedback.status && (
              <div
                className={`p-3.5 rounded-xl border text-xs font-serif leading-relaxed animate-fadeIn ${
                  feedback.status === 'correct'
                    ? 'bg-emerald-950/40 border-emerald-600/60 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-700/60 text-rose-200 animate-shake'
                }`}
              >
                {feedback.message}
              </div>
            )}

          </div>
        ) : (
          /* Finished State */
          <div className="p-8 rounded-3xl bg-gradient-to-b from-[#240c1a] to-[#0c0309] border border-universe-wine/70 shadow-2xl space-y-4 text-center animate-fadeIn">
            <Sparkles className="w-10 h-10 mx-auto text-universe-gold animate-spin" style={{ animationDuration: '6s' }} />
            <h3 className="font-serif text-2xl text-universe-cream font-bold">
              "you know me better than anyone."
            </h3>
            <p className="font-serif italic text-sm text-universe-blush leading-relaxed">
              Every date, every phrase, every whisper was safe in your heart all along.
            </p>
            <button
              onClick={handleRestart}
              className="mt-4 px-6 py-2.5 rounded-full bg-universe-wine/30 border border-universe-wine/60 text-xs font-mono text-universe-cream hover:text-white flex items-center gap-1.5 mx-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Play Again</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
