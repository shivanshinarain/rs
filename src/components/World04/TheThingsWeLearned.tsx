import React from 'react';
import { Heart, Sparkles, Shield, RefreshCw, Feather } from 'lucide-react';
import TinyCharacters from '../Effects/TinyCharacters';

export default function TheThingsWeLearned() {
  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 flex flex-col items-center justify-center select-none">
      <div className="max-w-3xl w-full text-center space-y-8 sm:space-y-12">
        
        {/* Poetic Opening */}
        <div className="space-y-3">
          <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-universe-dustyPink px-3.5 py-1.5 rounded-full border border-universe-wine/40 bg-universe-darkBurgundy/40 inline-flex items-center gap-1.5">
            <Feather className="w-3.5 h-3.5 text-universe-gold" />
            Vulnerability & Growth
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl text-universe-cream">
            The Things We Learned
          </h2>

          <div className="space-y-1.5 pt-2">
            <p className="font-serif italic text-base sm:text-lg text-universe-blush/90">
              "we weren't perfect."
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-serif italic text-universe-lavender/70">
              <span>"we fought."</span>
              <span>•</span>
              <span>"we misunderstood each other."</span>
              <span>•</span>
              <span>"we got scared."</span>
              <span>•</span>
              <span>"we got hurt."</span>
            </div>
            <p className="font-serif text-lg sm:text-2xl text-universe-gold font-medium pt-2">
              "but we learned."
            </p>
          </div>
        </div>

        {/* Illustrated Characters Moving Closer */}
        <div className="py-2">
          <TinyCharacters pose="apology" caption="even when we sulked, we always came back within 10 minutes" />
        </div>

        {/* 4 Pillars of Growth */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          
          {/* Pillar 1 */}
          <div className="p-5 rounded-2xl bg-universe-black/70 border border-universe-wine/60 space-y-2">
            <div className="flex items-center gap-2 text-universe-gold font-mono text-xs uppercase tracking-wider">
              <Shield className="w-4 h-4" />
              <span>01. Silence is Never an Answer</span>
            </div>
            <p className="font-serif text-xs sm:text-sm text-universe-cream/90 leading-relaxed">
              When distance creates doubt, a single voice note clears more air than a thousand cold texts. We learned that pulling away hurts more than speaking raw truth.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-5 rounded-2xl bg-universe-black/70 border border-universe-wine/60 space-y-2">
            <div className="flex items-center gap-2 text-universe-blush font-mono text-xs uppercase tracking-wider">
              <Heart className="w-4 h-4 text-universe-crimson fill-universe-crimson" />
              <span>02. Reassurance Over Ego</span>
            </div>
            <p className="font-serif text-xs sm:text-sm text-universe-cream/90 leading-relaxed">
              Arguments don't mean love is fading; they mean we care enough to fight for each other. Hearing "I'm not leaving, motu" dissolves any anger in seconds.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-5 rounded-2xl bg-universe-black/70 border border-universe-wine/60 space-y-2">
            <div className="flex items-center gap-2 text-universe-dustyPink font-mono text-xs uppercase tracking-wider">
              <RefreshCw className="w-4 h-4" />
              <span>03. The 10-Minute Rule</span>
            </div>
            <p className="font-serif text-xs sm:text-sm text-universe-cream/90 leading-relaxed">
              "Pagal kar degi ye ladki 😭" — "Ho jao na mere pyaar mein pagal ♡". Laughing at ourselves in the middle of a sulk is our secret superpower.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-5 rounded-2xl bg-universe-black/70 border border-universe-wine/60 space-y-2">
            <div className="flex items-center gap-2 text-universe-gold font-mono text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>04. Life Over Everything</span>
            </div>
            <p className="font-serif text-xs sm:text-sm text-universe-cream/90 leading-relaxed">
              The hospital night proved what truly matters: your hands, your sweet little text, your presence. Petty complaints vanished; only devotion stayed.
            </p>
          </div>

        </div>

        {/* Concluding Vow */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-universe-darkBurgundy/40 via-universe-wine/30 to-universe-darkBurgundy/40 border border-universe-wine/60 space-y-2">
          <p className="font-serif italic text-base sm:text-xl text-universe-cream">
            "i don't want us to become perfect."
          </p>
          <p className="font-serif italic text-base sm:text-xl text-universe-gold font-semibold">
            "i want us to become better."
          </p>
        </div>

      </div>
    </section>
  );
}
