import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ARG_PUZZLE_CHAPTERS,
  PuzzleChapter,
  MEMORY_POCKET_INITIAL
} from '../data/ourStory';
import { sound } from '../utils/audioEngine';
import MemoryPocketDrawer, { MemoryItem } from './MemoryPocketDrawer';
import EmotionalFeedbackModal from './EmotionalFeedbackModal';
import CinematicProposalClimax from './CinematicProposalClimax';
import SwipeMatchGame from './Games/SwipeMatchGame';
import BubblePopGame from './Games/BubblePopGame';
import WhatsAppChatGame from './Games/WhatsAppChatGame';
import CryptexGame from './Games/CryptexGame';
import EmojiMemoryGame from './Games/EmojiMemoryGame';
import HeartbeatRhythmGame from './Games/HeartbeatRhythmGame';
import WordSearchGame from './Games/WordSearchGame';
import RedThreadCanvasGame from './Games/RedThreadCanvasGame';
import ConstellationGame from './Games/ConstellationGame';
import MazeDestinyGame from './Games/MazeDestinyGame';
import FinalVaultGame from './Games/FinalVaultGame';
import {
  Heart,
  HelpCircle,
  KeyRound,
  Gamepad2,
  Sparkles
} from 'lucide-react';

export default function ARGGameEngine() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [memoryPocket, setMemoryPocket] = useState<MemoryItem[]>(MEMORY_POCKET_INITIAL);
  const [isPocketOpen, setIsPocketOpen] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState<{
    isOpen: boolean;
    quote: string;
    reward: MemoryItem | null;
  }>({
    isOpen: false,
    quote: '',
    reward: null
  });
  const [climaxOpen, setClimaxOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [inputAnswer, setInputAnswer] = useState('');
  const [inputError, setInputError] = useState(false);
  const [arcadeMode, setArcadeMode] = useState(false);

  const currentChapter: PuzzleChapter = ARG_PUZZLE_CHAPTERS[activeChapterIndex] || ARG_PUZZLE_CHAPTERS[0];

  // Validation function
  const handleSolve = (userAnswer: string) => {
    if (!userAnswer) return;
    const cleanAnswer = userAnswer.trim().toUpperCase();
    const normUser = cleanAnswer.replace(/[^A-Z0-9]/g, '');
    const primaryKey = currentChapter.answerKey.toUpperCase();
    const normPrimary = primaryKey.replace(/[^A-Z0-9]/g, '');
    const alternates = (currentChapter.alternateAnswers || []).map(a => a.toUpperCase());

    const isMatch =
      cleanAnswer === primaryKey ||
      alternates.includes(cleanAnswer) ||
      (normUser.length > 0 && normUser === normPrimary) ||
      alternates.some(a => a.replace(/[^A-Z0-9]/g, '') === normUser) ||
      (normUser.length >= 3 && normPrimary.includes(normUser)) ||
      (normPrimary.length >= 3 && normUser.includes(normPrimary)) ||
      alternates.some(a => {
        const normA = a.replace(/[^A-Z0-9]/g, '');
        return normA.length >= 3 && (normUser.includes(normA) || normA.includes(normUser));
      });

    if (isMatch) {
      sound.playMatchSound();
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#ff285e', '#f5b8c6', '#ffd166', '#ffffff']
      });

      // Add to memory pocket if not already there
      const newReward: MemoryItem = {
        id: currentChapter.memoryReward.id,
        title: currentChapter.memoryReward.title,
        icon: currentChapter.memoryReward.icon,
        type: currentChapter.memoryReward.type,
        value: currentChapter.memoryReward.value,
        lore: currentChapter.memoryReward.lore
      };

      setMemoryPocket(prev => {
        if (prev.some(item => item.id === newReward.id)) return prev;
        return [...prev, newReward];
      });

      // Show emotional feedback modal
      setFeedbackModal({
        isOpen: true,
        quote: currentChapter.feedbackQuote,
        reward: newReward
      });

      setInputAnswer('');
      setInputError(false);
      setShowHint(false);
    } else {
      sound.playTone(180, 0.25);
      setInputError(true);
      setTimeout(() => setInputError(false), 1200);
    }
  };

  const handleNextChapter = () => {
    setFeedbackModal({ isOpen: false, quote: '', reward: null });

    if (activeChapterIndex < ARG_PUZZLE_CHAPTERS.length - 1) {
      setActiveChapterIndex(prev => prev + 1);
    } else {
      // Finished all 11 chapters -> trigger cinematic climax!
      setClimaxOpen(true);
    }
  };

  return (
    <section id="arg-game" className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 relative z-20 flex flex-col items-center justify-center select-none">

      {/* Floating Memory Pocket Button */}
      <div className="fixed top-20 right-4 sm:right-6 z-40">
        <button
          onClick={() => {
            sound.playHeartClick();
            setIsPocketOpen(true);
          }}
          className="group relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-universe-darkBurgundy to-universe-wine border border-universe-glowingRed/60 shadow-glow-red text-white text-xs font-mono tracking-wider hover:scale-105 active:scale-95 transition-all touch-manipulation"
        >
          <span className="w-2 h-2 rounded-full bg-universe-glowingRed animate-ping" />
          <Heart className="w-4 h-4 text-universe-glowingRed fill-universe-glowingRed" />
          <span>Pocket ({memoryPocket.length})</span>
        </button>
      </div>

      <div className="max-w-2xl w-full text-center space-y-6 sm:space-y-8">

        {/* ARG Progress Indicator & Arcade Mode Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-universe-black/50 border border-universe-wine/40">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
            {ARG_PUZZLE_CHAPTERS.map((ch, idx) => {
              const isCompleted = idx < activeChapterIndex;
              const isCurrent = idx === activeChapterIndex;
              const canAccess = arcadeMode || idx <= activeChapterIndex;

              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    if (canAccess) {
                      sound.playHeartClick();
                      setActiveChapterIndex(idx);
                    }
                  }}
                  disabled={!canAccess}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-[10px] font-mono flex items-center justify-center transition-all ${isCurrent
                      ? 'bg-universe-glowingRed text-white shadow-glow-red scale-110 font-bold border-2 border-white'
                      : isCompleted
                        ? 'bg-universe-wine text-universe-blush border border-universe-glowingRed/50 hover:scale-105'
                        : canAccess
                          ? 'bg-universe-wine/30 text-universe-cream border border-universe-wine/60 hover:border-universe-glowingRed hover:scale-105'
                          : 'bg-universe-black/50 text-universe-lavender/30 border border-universe-wine/20 opacity-40 cursor-not-allowed'
                    }`}
                  title={`Chapter ${ch.chapterNumber}: ${ch.title}`}
                >
                  {isCompleted ? '✓' : ch.chapterNumber}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => {
              sound.playHeartClick();
              setArcadeMode(!arcadeMode);
            }}
            className={`px-3 py-1.5 rounded-full text-[11px] font-mono flex items-center gap-1.5 border transition-all ${arcadeMode
                ? 'bg-amber-500/20 border-universe-gold text-universe-gold shadow-glow-gold'
                : 'bg-universe-darkBurgundy/40 border-universe-wine/50 text-universe-lavender/70 hover:text-universe-cream'
              }`}
            title="Toggle Arcade Mode to freely replay any mini-game"
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>{arcadeMode ? '🎮 Arcade: All 11 Games Open' : 'Arcade Mode'}</span>
          </button>
        </div>

        {/* Section 15: Secret Meta-Message Fragment Ribbon */}
        <div className="p-3.5 rounded-2xl bg-universe-black/60 border border-universe-wine/50 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-universe-dustyPink">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-universe-gold" />
              <span>Hidden Meta-Message ({Math.min(11, activeChapterIndex)}/11 Fragments)</span>
            </span>
            <span className="text-universe-gold/80 italic font-serif lowercase">
              "each chapter secretly leaves behind a piece..."
            </span>
          </div>

          {/* Letter Slots */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            {[
              { ch: 0, char: 'I' },
              { ch: 1, char: ' ' },
              { ch: 2, char: 'C' },
              { ch: 3, char: 'H' },
              { ch: 4, char: 'O' },
              { ch: 5, char: 'O' },
              { ch: 6, char: 'S' },
              { ch: 7, char: 'E' },
              { ch: 8, char: ' ' },
              { ch: 9, char: 'Y' },
              { ch: 10, char: 'O' },
              { ch: 10, char: 'U' }
            ].map((slot, i) => {
              const isRevealed = slot.ch < activeChapterIndex;
              const isSpace = slot.char === ' ';

              if (isSpace) {
                return (
                  <div key={i} className="w-3 sm:w-4 flex items-center justify-center text-universe-crimson text-xs">
                    {isRevealed ? '♡' : '•'}
                  </div>
                );
              }

              return (
                <div
                  key={i}
                  className={`w-6 h-7 sm:w-8 sm:h-9 rounded-lg font-mono font-bold text-xs sm:text-sm flex items-center justify-center transition-all duration-500 ${
                    isRevealed
                      ? 'bg-universe-wine/50 border border-universe-gold text-universe-gold shadow-glow-gold scale-105'
                      : 'bg-universe-black/80 border border-universe-wine/30 text-universe-lavender/30'
                  }`}
                >
                  {isRevealed ? slot.char : '✦'}
                </div>
              );
            })}
          </div>
        </div>

        {/* Chapter Header */}
        <div className="space-y-2 sm:space-y-3">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-mono text-universe-dustyPink px-3.5 py-1.5 rounded-full border border-universe-wine/40 bg-universe-darkBurgundy/40 inline-block">
            ARG Puzzle Chapter {currentChapter.chapterNumber} • {currentChapter.subtitle}
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-universe-cream">
            {currentChapter.title}
          </h2>
          <p className="font-serif italic text-xs sm:text-sm text-universe-blush max-w-lg mx-auto">
            "{currentChapter.loreIntro}"
          </p>
        </div>

        {/* Main Puzzle Card */}
        <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#200918] via-[#12040e] to-[#070205] border-2 border-universe-wine/70 shadow-2xl space-y-6 text-left">

          {/* Prompt */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-mono tracking-widest text-universe-gold flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5" />
              The Puzzle Clue:
            </span>
            <p className="font-serif text-sm sm:text-base text-universe-cream leading-relaxed">
              {currentChapter.cluePrompt}
            </p>
          </div>

          {/* DYNAMIC INTERACTIVE GAMEPLAY PER CHAPTER */}
          <div className="pt-2">
            {activeChapterIndex === 0 && <SwipeMatchGame onSolve={handleSolve} />}
            {activeChapterIndex === 1 && <BubblePopGame onSolve={handleSolve} />}
            {activeChapterIndex === 2 && <WhatsAppChatGame onSolve={handleSolve} />}
            {activeChapterIndex === 3 && <CryptexGame onSolve={handleSolve} />}
            {activeChapterIndex === 4 && <EmojiMemoryGame onSolve={handleSolve} />}
            {activeChapterIndex === 5 && <HeartbeatRhythmGame onSolve={handleSolve} />}
            {activeChapterIndex === 6 && <WordSearchGame onSolve={handleSolve} />}
            {activeChapterIndex === 7 && <RedThreadCanvasGame onSolve={handleSolve} />}
            {activeChapterIndex === 8 && <ConstellationGame onSolve={handleSolve} />}
            {activeChapterIndex === 9 && <MazeDestinyGame onSolve={handleSolve} />}
            {activeChapterIndex === 10 && <FinalVaultGame onSolve={handleSolve} />}
          </div>

          {/* Fallback Universal Text Input for Players Who Love Typing */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSolve(inputAnswer);
            }}
            className="pt-2 flex gap-2"
          >
            <input
              type="text"
              value={inputAnswer}
              onChange={(e) => setInputAnswer(e.target.value)}
              placeholder="Or type your decoded answer here..."
              className={`flex-1 px-4 py-2.5 rounded-xl bg-universe-black/70 border text-xs sm:text-sm text-universe-cream font-mono focus:outline-none transition-all ${inputError
                  ? 'border-red-500 ring-2 ring-red-500/50 animate-shake'
                  : 'border-universe-wine/60 focus:border-universe-glowingRed'
                }`}
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-universe-crimson hover:bg-universe-glowingRed text-white text-xs font-mono uppercase tracking-wider font-semibold shadow-glow-red transition-all"
            >
              Submit
            </button>
          </form>

          {/* Hint Dropdown Toggle */}
          <div className="pt-1 flex items-center justify-between text-xs font-mono">
            <button
              type="button"
              onClick={() => {
                sound.playHeartClick();
                setShowHint(!showHint);
              }}
              className="text-universe-dustyPink hover:text-universe-blush flex items-center gap-1 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showHint ? 'Hide Shivi\'s Whisper' : 'Need a whisper from Shivi? (Hint)'}</span>
            </button>
            <span className="text-[10px] text-universe-lavender/50">
              Chapter {currentChapter.id} of 11
            </span>
          </div>

          {showHint && (
            <div className="p-3 rounded-xl bg-universe-wine/20 border border-universe-wine/40 text-xs font-serif italic text-universe-blush animate-fadeIn">
              "Whisper: {currentChapter.hint}"
            </div>
          )}

        </div>

      </div>

      {/* Memory Pocket Sliding Drawer */}
      <MemoryPocketDrawer
        isOpen={isPocketOpen}
        onClose={() => setIsPocketOpen(false)}
        items={memoryPocket}
        totalExpected={11}
      />

      {/* Emotional Feedback Modal */}
      <EmotionalFeedbackModal
        isOpen={feedbackModal.isOpen}
        quote={feedbackModal.quote}
        reward={feedbackModal.reward}
        onNext={handleNextChapter}
      />

      {/* Cinematic Proposal Climax Finale */}
      <CinematicProposalClimax
        isOpen={climaxOpen}
        onClose={() => setClimaxOpen(false)}
      />

    </section>
  );
}
