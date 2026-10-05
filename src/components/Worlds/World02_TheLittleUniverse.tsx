import React from 'react';
import RashiEffectCanvas from '../Effects/RashiEffectCanvas';
import TheCallLog from '../World02/TheCallLog';
import ChatStatistics from '../World02/ChatStatistics';
import OurSkyConstellation from '../World02/OurSkyConstellation';
import TwentyMomentsGallery from '../TwentyMomentsGallery';
import Chapter03_SpecialDate from '../Chapter03_SpecialDate';
import Chapter04_OurUniverse from '../Chapter04_OurUniverse';
import Chapter05_Timeline from '../Chapter05_Timeline';
import TinyCharacters from '../Effects/TinyCharacters';
import { sound } from '../../utils/audioEngine';

interface World02Props {
  onEasterEggUnlock?: (id: string) => void;
  onNextWorld?: () => void;
}

export default function World02_TheLittleUniverse({ onEasterEggUnlock, onNextWorld }: World02Props) {
  return (
    <div className="relative w-full space-y-16 sm:space-y-24">
      
      {/* World Intro */}
      <section className="text-center pt-8 px-4 space-y-3">
        <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-universe-dustyPink px-3.5 py-1.5 rounded-full border border-universe-wine/40 bg-universe-darkBurgundy/40 inline-block">
          WORLD 02 — THE LITTLE UNIVERSE
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-universe-cream">
          Our Shared Reality
        </h1>
        <p className="font-serif italic text-sm sm:text-base text-universe-blush max-w-lg mx-auto">
          "The dates, the midnight calls, the secret nicknames, and every single milestone that turned distance into forever."
        </p>

        <div className="pt-4">
          <TinyCharacters pose="on-phone" caption="connected by voices when the miles were too far" />
        </div>
      </section>

      {/* The Rashi Effect (Interactive Star / Heart Canvas) */}
      <RashiEffectCanvas />

      {/* Chapter 03: 22 November 2025 */}
      <Chapter03_SpecialDate />

      {/* The Call Log Visual Story */}
      <TheCallLog />

      {/* Honest Chat Statistics ("Our Numbers") */}
      <ChatStatistics />

      {/* Chapter 04: Our Little Galaxy */}
      <Chapter04_OurUniverse onEasterEggUnlock={onEasterEggUnlock} />

      {/* Our Sky Permanent Constellation */}
      <OurSkyConstellation />

      {/* Chapter 05: Milestone Timeline */}
      <Chapter05_Timeline />

      {/* 20 Curated Story Moments Archive */}
      <TwentyMomentsGallery />

      {/* Transition to World 03 */}
      {onNextWorld && (
        <div className="text-center py-10">
          <button
            onClick={() => {
              sound.playHeartClick();
              onNextWorld();
            }}
            className="px-8 py-3.5 rounded-full bg-universe-wine/30 border border-universe-wine/60 text-universe-cream hover:text-white hover:border-universe-glowingRed text-xs font-mono uppercase tracking-wider shadow-sm hover:scale-105 transition-all"
          >
            Enter World 03: The ARG Love Game →
          </button>
        </div>
      )}

    </div>
  );
}
