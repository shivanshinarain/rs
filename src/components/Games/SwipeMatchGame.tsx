import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, X, Sparkles, Check, Flame } from 'lucide-react';
import { sound } from '../../utils/audioEngine';

interface SwipeMatchGameProps {
  onSolve: (answer: string) => void;
}

interface ProfileCard {
  id: number;
  name: string;
  age: string;
  tagline: string;
  bio: string;
  image: string;
  isMatch: boolean;
}

const CARDS: ProfileCard[] = [
  {
    id: 1,
    name: "Random Stranger",
    age: "24",
    tagline: "Just looking for someone to talk to",
    bio: "Likes small talk and boring weekends. Probably doesn't stay up till 3 AM.",
    image: "/assets/shivi_rashi_stickers.jpg",
    isMatch: false
  },
  {
    id: 2,
    name: "Generic Date",
    age: "23",
    tagline: "Wants a temporary fling",
    bio: "Looking for something casual, interval tak bas. Not looking for permanent commitment.",
    image: "/assets/shivi_rashi_doodle_couch.jpg",
    isMatch: false
  },
  {
    id: 3,
    name: "Shivi ♡",
    age: "Forever Yours",
    tagline: "The girl with silver hoops & oversized sweaters",
    bio: "\"I want u in my life, not as a friend but as a life partner... interval tak nhi, poori zindagi tak.\" Looking for her Motu ♡",
    image: "/assets/moment_01_tinder_match.jpg",
    isMatch: true
  }
];

export default function SwipeMatchGame({ onSolve }: SwipeMatchGameProps) {
  const [cardIndex, setCardIndex] = useState(0);
  const [matchFound, setMatchFound] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const currentCard = CARDS[cardIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (!currentCard) return;

    if (direction === 'left') {
      if (currentCard.isMatch) {
        sound.playTone(180, 0.25);
        setFeedback("Hey! You can't swipe left on your Shivi! 🥺");
        setTimeout(() => setFeedback(null), 1500);
        return;
      }
      sound.playHeartClick();
      setFeedback("Passed! Looking for the one... ➔");
      setTimeout(() => setFeedback(null), 1000);
      setCardIndex((prev) => Math.min(CARDS.length - 1, prev + 1));
    } else {
      // Swiped Right
      if (currentCard.isMatch) {
        sound.playMatchSound();
        setMatchFound(true);
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#ff285e', '#f5b8c6', '#ffd166', '#ffffff']
        });
        setTimeout(() => {
          onSolve('NOVEMBER');
        }, 1800);
      } else {
        sound.playTone(200, 0.2);
        setFeedback("Nope! That's not the love of your life. Keep searching!");
        setTimeout(() => setFeedback(null), 1500);
      }
    }
  };

  return (
    <div className="relative max-w-sm mx-auto w-full p-4 select-none">
      
      {/* Game Header */}
      <div className="flex items-center justify-between text-xs font-mono text-universe-dustyPink pb-3 border-b border-universe-wine/30 mb-4">
        <span className="flex items-center gap-1.5 text-universe-blush font-medium">
          <Flame className="w-4 h-4 text-universe-crimson fill-universe-crimson animate-pulse" />
          Tinder 2024 Simulation
        </span>
        <span>Swipe Right on True Love</span>
      </div>

      {feedback && (
        <div className="text-center font-handwritten text-sm sm:text-base text-universe-blush py-1 animate-fadeIn">
          {feedback}
        </div>
      )}

      {/* Card Deck View */}
      {!matchFound && currentCard ? (
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#1c0817] to-[#0a0208] border-2 border-universe-wine/70 shadow-2xl space-y-4 p-4 transition-all">
          
          {/* Profile Photo */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black border border-universe-wine/40">
            <img
              src={currentCard.image}
              alt={currentCard.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 text-left">
              <h4 className="font-serif text-lg text-white font-semibold flex items-center gap-1.5">
                {currentCard.name}
                <span className="text-xs font-mono text-universe-dustyPink font-normal">
                  {currentCard.age}
                </span>
              </h4>
              <p className="text-[11px] font-sans text-universe-blush italic">
                {currentCard.tagline}
              </p>
            </div>
          </div>

          {/* Bio Box */}
          <div className="p-3 rounded-xl bg-universe-black/50 border border-universe-wine/40 text-left text-xs font-sans text-universe-lavender/90 leading-relaxed">
            {currentCard.bio}
          </div>

          {/* Action Buttons: Pass (Left) vs Like (Right) */}
          <div className="flex items-center justify-center gap-6 pt-1">
            <button
              onClick={() => handleSwipe('left')}
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-universe-black/80 border-2 border-red-500/50 hover:border-red-500 text-red-400 hover:text-white hover:bg-red-950/60 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all touch-manipulation"
              title="Pass"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={() => handleSwipe('right')}
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-universe-crimson to-universe-glowingRed text-white flex items-center justify-center shadow-glow-red hover:scale-110 active:scale-95 transition-all touch-manipulation"
              title="Swipe Right / Like"
            >
              <Heart className="w-7 h-7 fill-white" />
            </button>
          </div>

        </div>
      ) : matchFound ? (
        /* Match Celebration Screen */
        <div className="p-6 rounded-3xl bg-gradient-to-b from-universe-darkBurgundy via-universe-wine to-universe-darkBurgundy border-2 border-universe-glowingRed shadow-glow-red text-center space-y-4 animate-scaleUp">
          <div className="text-4xl animate-bounce">✨ IT'S A MATCH! ✨</div>
          <div className="flex items-center justify-center gap-3 py-2">
            <img
              src="/assets/moment_01_tinder_match.jpg"
              alt="Shivi"
              className="w-16 h-16 rounded-full object-cover border-2 border-universe-blush shadow-glow-blush"
            />
            <Heart className="w-8 h-8 text-universe-glowingRed fill-universe-glowingRed animate-pulse" />
            <img
              src="/assets/shivi_rashi_cartoon_sleep_call.jpg"
              alt="Rashi"
              className="w-16 h-16 rounded-full object-cover border-2 border-universe-gold shadow-glow-gold"
            />
          </div>
          <h3 className="font-serif text-xl text-universe-cream">
            Shivi & Rashi Swiped Right!
          </h3>
          <p className="font-handwritten text-base text-universe-blush">
            "November 2024 — the algorithm of the universe finally got it right ♡"
          </p>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="font-serif text-sm text-universe-lavender">No more cards in your stack.</p>
          <button
            onClick={() => setCardIndex(0)}
            className="mt-3 px-4 py-2 rounded-full bg-universe-wine text-xs font-mono"
          >
            Start over
          </button>
        </div>
      )}

    </div>
  );
}
