import React, { useState } from 'react';
import BirthdayWorld from '../World05/BirthdayWorld';
import Chapter09_Birthdays from '../Chapter09_Birthdays';
import Chapter11_OurMusic from '../Chapter11_OurMusic';
import Chapter14_TheProposal from '../Chapter14_TheProposal';
import TinyCharacters from '../Effects/TinyCharacters';
import { isBirthdaySessionUnlocked } from '../../config/birthdayConfig';

interface World05Props {
  onEasterEggUnlock?: (id: string) => void;
}

export default function World05_BirthdayWorld({ onEasterEggUnlock }: World05Props) {
  const [isUnlocked, setIsUnlocked] = useState(() => isBirthdaySessionUnlocked());

  return (
    <div className="relative w-full space-y-16 sm:space-y-24">
      
      {/* World Intro */}
      <section className="text-center pt-8 px-4 space-y-3">
        <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-universe-gold px-3.5 py-1.5 rounded-full border border-universe-gold/40 bg-universe-black/50 inline-block shadow-glow-gold">
          WORLD 05 — BIRTHDAY & FOREVER
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-universe-cream">
          Today & All Our Tomorrows
        </h1>
        <p className="font-serif italic text-sm sm:text-base text-universe-blush max-w-lg mx-auto">
          "Celebrating the birth of the girl who made my whole life softer, and asking for a permanent lifetime together."
        </p>

        <div className="pt-2">
          <TinyCharacters pose="holding-hands" caption="happy 21st birthday my wifeyy ♡" />
        </div>
      </section>

      {/* Birthday World: Date-Gating Countdown ('not yet, love...'), Password Gate, and 21 Little Reasons */}
      <BirthdayWorld onUnlockChange={setIsUnlocked} />

      {/* Only reveal full celebration, constellations, music, and final proposal once unlocked */}
      {isUnlocked && (
        <>
          {/* Chapter 09: Celestial Birthdays & Constellations (Scorpio & Virgo) */}
          <Chapter09_Birthdays onEasterEggUnlock={onEasterEggUnlock} />

          {/* Chapter 11: Our Music (Paper Rings) */}
          <Chapter11_OurMusic onEasterEggUnlock={onEasterEggUnlock} />

          {/* Chapter 14: The Proposal & Sacred Final Vow */}
          <Chapter14_TheProposal />
        </>
      )}

    </div>
  );
}
