import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, X, Sparkles, CheckCircle2, MessageCircle, RefreshCw } from 'lucide-react';
import { loveStoryData } from '../data/loveStory';
import { sound } from '../utils/audioEngine';
import { HeartDoodle, CuteAnnotation } from './Doodles';

export default function Chapter02_TinderMatch() {
  const [matched, setMatched] = useState(false);
  const [activeCard, setActiveCard] = useState('rashi'); // 'rashi' or 'shivi'
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [nopeAlert, setNopeAlert] = useState(false);

  const profile = activeCard === 'rashi' ? loveStoryData.tinder.rashi : loveStoryData.tinder.shivi;

  const handleSwipeRight = () => {
    setSwipeOffset(260);
    sound.playMatchSound();

    setTimeout(() => {
      setMatched(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff285e', '#f5b8c6', '#f5cb68', '#c21e42', '#ffffff']
      });
    }, 250);
  };

  const handleSwipeLeft = () => {
    setSwipeOffset(-50);
    setNopeAlert(true);
    sound.playTone(180, 0.2);
    setTimeout(() => {
      setSwipeOffset(0);
      setNopeAlert(false);
    }, 1200);
  };

  const resetMatch = () => {
    setMatched(false);
    setSwipeOffset(0);
    sound.playChime();
  };

  return (
    <section id="chapter-2" className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 flex flex-col justify-center items-center relative z-20">
      <div className="max-w-xl w-full text-center space-y-6 sm:space-y-8">
        
        {/* Header Tag */}
        <div className="space-y-2 sm:space-y-3 relative">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-universe-dustyPink font-medium px-3.5 py-1.5 rounded-full border border-universe-wine/40 bg-universe-darkBurgundy/40 inline-block">
            Chapter {loveStoryData.tinder.chapterNumber} — {loveStoryData.tinder.tagline}
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-universe-cream">
            {loveStoryData.tinder.headline}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-universe-lavender/80 max-w-sm mx-auto">
            {loveStoryData.tinder.subtitle}
          </p>

          <div className="hidden sm:block absolute top-0 right-2">
            <HeartDoodle className="w-8 h-8 text-universe-glowingRed/70" />
          </div>
        </div>

        {/* Tinder Interactive Card */}
        <div className="relative mx-auto w-full max-w-sm px-1">
          
          {/* Card View */}
          <div
            style={{
              transform: `translateX(${swipeOffset}px) rotate(${swipeOffset * 0.05}deg)`,
              transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
            }}
            className="relative bg-gradient-to-b from-[#1c0c16] to-[#0f050b] border border-universe-wine/60 rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-5 text-left select-none"
          >
            {/* Photo Container */}
            <div className="relative h-64 sm:h-76 rounded-2xl bg-gradient-to-br from-universe-wine/50 via-universe-darkBurgundy to-universe-black border border-universe-wine/30 overflow-hidden shadow-md">
              <img
                src={profile.image}
                alt={profile.name}
                className="w-full h-full object-cover object-top"
              />

              {/* Status Badge */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-universe-black/70 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full border border-universe-wine/40 flex items-center gap-1.5 text-[10px] sm:text-[11px] text-universe-blush shadow-md">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Online in your universe</span>
              </div>

              {/* Cute Doodle Tag on Photo */}
              <div className="absolute bottom-3 left-3 bg-universe-black/60 backdrop-blur-md px-3 py-1 rounded-xl border border-universe-wine/40">
                <span className="font-handwritten text-sm text-universe-blush">
                  {activeCard === 'rashi' ? 'my pretty girl ♡' : 'your shivi ♡'}
                </span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="pt-3 sm:pt-4 space-y-2.5 sm:space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-xl sm:text-2xl text-universe-cream font-medium">
                    {profile.name}
                  </h3>
                  <span className="font-sans text-lg sm:text-xl text-universe-lavender">{profile.age}</span>
                  {profile.verified && (
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-universe-blush fill-universe-blush/20" />
                  )}
                </div>
                <span className="text-[11px] sm:text-xs text-universe-lavender/60">{profile.distance}</span>
              </div>

              {/* Bio */}
              <p className="text-xs sm:text-sm text-universe-cream/80 leading-relaxed">
                {profile.bio}
              </p>

              {/* Prompt Box */}
              <div className="p-3 rounded-xl bg-universe-wine/20 border border-universe-wine/40">
                <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-universe-dustyPink font-medium">
                  {profile.promptQuestion}
                </p>
                <p className="text-xs font-serif italic text-universe-cream mt-0.5 sm:mt-1">
                  "{profile.promptAnswer}"
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 pt-0.5">
                {profile.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] bg-universe-darkBurgundy border border-universe-wine/40 text-universe-lavender"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Swipe Action Buttons */}
            <div className="flex justify-around items-center pt-4 sm:pt-6 pb-1">
              {/* Pass / Left */}
              <button
                onClick={handleSwipeLeft}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-rose-500/40 bg-universe-black/60 flex items-center justify-center text-rose-400 hover:scale-110 active:scale-95 transition-transform shadow-lg touch-manipulation"
                title="Pass"
                aria-label="Pass profile"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Toggle profile */}
              <button
                onClick={() => setActiveCard(prev => prev === 'rashi' ? 'shivi' : 'rashi')}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-universe-wine/50 text-[10px] sm:text-[11px] tracking-wider uppercase text-universe-lavender hover:text-universe-blush touch-manipulation"
                title="Switch card"
              >
                View {activeCard === 'rashi' ? 'Shivi' : 'Rashi'}
              </button>

              {/* Like / Right */}
              <button
                onClick={handleSwipeRight}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-universe-glowingRed bg-gradient-to-tr from-universe-crimson to-universe-glowingRed flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform shadow-glow-red touch-manipulation"
                title="Right Swipe"
                aria-label="Like profile"
              >
                <Heart className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
              </button>
            </div>

            {/* Playful Nope Warning */}
            {nopeAlert && (
              <div className="absolute inset-0 bg-universe-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 text-center rounded-3xl animate-fadeIn z-20">
                <span className="text-3xl mb-2">🙈</span>
                <p className="font-serif text-base sm:text-lg text-universe-blush font-medium">
                  Error 404: Pass Not Allowed!
                </p>
                <p className="text-xs text-universe-cream/70 mt-1 max-w-xs">
                  The universe made you for each other. Swipe right! ♡
                </p>
              </div>
            )}
          </div>

          {/* IT'S A MATCH MODAL OVERLAY */}
          {matched && (
            <div className="absolute inset-0 z-30 bg-universe-black/95 backdrop-blur-xl border border-universe-glowingRed/40 rounded-3xl p-4 sm:p-6 flex flex-col justify-center items-center text-center space-y-4 sm:space-y-5 animate-fadeIn shadow-2xl overflow-y-auto">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-universe-crimson/20 border border-universe-glowingRed flex items-center justify-center animate-bounce shrink-0">
                <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-universe-blush" />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-2xl sm:text-4xl text-glow-crimson text-universe-cream tracking-wider font-semibold">
                  {loveStoryData.tinder.matchBanner}
                </h3>
                <p className="text-xs text-universe-dustyPink px-2">
                  {loveStoryData.tinder.matchSubtext}
                </p>
              </div>

              {/* Avatar circle connection with doodle & cartoon */}
              <div className="flex items-center justify-center -space-x-3 py-1">
                <img
                  src="/assets/moment_01_tinder_match.jpg"
                  alt="Shivi"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-universe-glowingRed shadow-glow-red"
                />
                <img
                  src="/assets/shivi_rashi_cartoon.jpg"
                  alt="Rashi Cartoon"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-universe-blush shadow-glow-blush"
                />
              </div>

              {/* Chat preview */}
              <div className="w-full p-2.5 sm:p-3 rounded-xl bg-universe-wine/30 border border-universe-wine/50 text-left">
                <p className="text-[10px] text-universe-dustyPink font-mono">Shivi says:</p>
                <p className="text-xs font-serif italic text-universe-cream mt-0.5">
                  "{loveStoryData.tinder.firstMessage}"
                </p>
              </div>

              <div className="flex gap-2 sm:gap-3 w-full">
                <button
                  onClick={resetMatch}
                  className="flex-1 py-2 sm:py-2.5 rounded-xl border border-universe-wine/60 text-xs text-universe-lavender hover:bg-universe-wine/20 flex items-center justify-center gap-1 touch-manipulation"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Replay</span>
                </button>
                <button
                  onClick={() => {
                    document.getElementById('chapter-3')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-universe-crimson to-universe-glowingRed text-xs font-medium text-white shadow-glow-red hover:scale-105 transition-all touch-manipulation"
                >
                  Next Chapter →
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
