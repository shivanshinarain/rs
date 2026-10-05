import React from 'react';
import RoomForYou from '../World04/RoomForYou';
import TheMirror from '../World04/TheMirror';
import IfYouReallyKnowMe from '../World04/IfYouReallyKnowMe';
import TheThingsWeLearned from '../World04/TheThingsWeLearned';
import Chapter08_OpenWhen from '../Chapter08_OpenWhen';
import Chapter07_TheApology from '../Chapter07_TheApology';
import Chapter10_Scrapbook from '../Chapter10_Scrapbook';
import TinyCharacters from '../Effects/TinyCharacters';
import { sound } from '../../utils/audioEngine';

interface World04Props {
  onEasterEggUnlock?: (id: string) => void;
  onNextWorld?: () => void;
}

export default function World04_InnerSanctuary({ onEasterEggUnlock, onNextWorld }: World04Props) {
  return (
    <div className="relative w-full space-y-16 sm:space-y-24">
      
      {/* World Intro */}
      <section className="text-center pt-8 px-4 space-y-3">
        <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-universe-dustyPink px-3.5 py-1.5 rounded-full border border-universe-wine/40 bg-universe-darkBurgundy/40 inline-block">
          WORLD 04 — THE INNER SANCTUARY
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-universe-cream">
          Our Private Haven
        </h1>
        <p className="font-serif italic text-sm sm:text-base text-universe-blush max-w-lg mx-auto">
          "The letters, the room built in my imagination, the things we learned through tears, and the quiet truth in the mirror."
        </p>

        <div className="pt-2">
          <TinyCharacters pose="holding-hands" caption="safe in each other's quiet thoughts" />
        </div>
      </section>

      {/* The Room I Made For You */}
      <RoomForYou />

      {/* The Mirror */}
      <TheMirror />


      {/* If You Really Know Me... (Personal Trivia Quiz) */}
      <IfYouReallyKnowMe />

      {/* Open When Digital Emergency Letters */}
      <Chapter08_OpenWhen />

      {/* Chapter 07: The Apology & Coma Hospital Letter */}
      <Chapter07_TheApology onEasterEggUnlock={onEasterEggUnlock} />

      {/* The Things We Learned */}
      <TheThingsWeLearned />

      {/* Chapter 10: Scrapbook */}
      <Chapter10_Scrapbook onEasterEggUnlock={onEasterEggUnlock} />

      {/* Transition to World 05 */}
      {onNextWorld && (
        <div className="text-center py-10">
          <button
            onClick={() => {
              sound.playHeartClick();
              onNextWorld();
            }}
            className="px-8 py-3.5 rounded-full bg-universe-wine/30 border border-universe-wine/60 text-universe-cream hover:text-white hover:border-universe-glowingRed text-xs font-mono uppercase tracking-wider shadow-sm hover:scale-105 transition-all"
          >
            Enter World 05: Birthday & Proposal →
          </button>
        </div>
      )}

    </div>
  );
}
