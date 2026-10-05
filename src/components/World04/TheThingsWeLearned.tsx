import React, { useState } from 'react';
import { Heart, Sparkles, Feather, ShieldCheck, Quote, ChevronDown, CheckCircle2 } from 'lucide-react';
import TinyCharacters from '../Effects/TinyCharacters';
import { sound } from '../../utils/audioEngine';

interface LessonCard {
  id: number;
  pillarNumber: string;
  theme: string;
  learnedThat: string;
  howWeLearnedIt: string;
  chatProof: string;
  chatQuoteSnippet: string;
}

const LESSONS: LessonCard[] = [
  {
    id: 1,
    pillarNumber: '01',
    theme: "Space Isn't Distance — It's Breathing Room",
    learnedThat:
      "somewhere along the way, we learned that space isn't distance—it's just breathing room.",
    howWeLearnedIt:
      "We used to panic when one of us went quiet during stressful days. Over time, we learned to trust each other's silence instead of fearing it.",
    chatProof:
      'Trusting each other even in quiet hours across 800 miles.',
    chatQuoteSnippet:
      '“take your time, i\'ll be right here when you\'re back ♡”'
  },
  {
    id: 2,
    pillarNumber: '02',
    theme: 'Coming Back Without Keeping Score',
    learnedThat:
      "we learned how to come back after an argument without keeping score.",
    howWeLearnedIt:
      "Early on, arguments felt like a competition to see who was hurt more. We realized winning an argument against each other means we both lose.",
    chatProof:
      'We fight every other day, and then we love like nothing ever happened.',
    chatQuoteSnippet:
      '“let\'s not go to sleep angry ok?”'
  },
  {
    id: 3,
    pillarNumber: '03',
    theme: 'Daily Check-ins Over Grand Gestures',
    learnedThat:
      "we learned that tiny daily check-ins matter infinitely more than grand gestures.",
    howWeLearnedIt:
      "It wasn't about expensive gifts or massive declarations; it was sharing silly random photos of our day and telling each other 'eat your food properly'.",
    chatProof:
      'The quiet, continuous presence that builds a lifetime.',
    chatQuoteSnippet:
      '“did you eat? tell me honestly.”'
  },
  {
    id: 4,
    pillarNumber: '04',
    theme: 'Gentleness Heals Overthinking',
    learnedThat:
      "we learned how fear and overthinking can twist innocent words, and how gentleness heals it.",
    howWeLearnedIt:
      "Misunderstandings over text used to spiral. We learned to pause, ask 'did you mean it that way?', and default to giving each other the benefit of the doubt.",
    chatProof:
      'Choosing soft understanding instead of defensive pride.',
    chatQuoteSnippet:
      '“talk to me, what\'s going on in that cute head?”'
  }
];

export default function TheThingsWeLearned() {
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const toggleExpand = (id: number) => {
    sound.playHeartClick();
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 flex flex-col items-center justify-center select-none">
      <div className="max-w-3xl w-full text-center space-y-8 sm:space-y-12">
        
        {/* Poetic Opening */}
        <div className="space-y-3">
          <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-universe-dustyPink px-3.5 py-1.5 rounded-full border border-universe-wine/40 bg-universe-darkBurgundy/40 inline-flex items-center gap-1.5">
            <Feather className="w-3.5 h-3.5 text-universe-gold" />
            Authentic WhatsApp Mutual Growth
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl text-universe-cream">
            The Things We Learned
          </h2>

          <div className="space-y-1.5 pt-2">
            <p className="font-serif italic text-base sm:text-lg text-universe-blush/90">
              "we weren't born knowing how to love each other."
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-serif italic text-universe-lavender/70">
              <span>"we fought."</span>
              <span>•</span>
              <span>"we overthought."</span>
              <span>•</span>
              <span>"we got scared."</span>
              <span>•</span>
              <span>"we got hurt."</span>
            </div>
            <p className="font-serif text-lg sm:text-2xl text-universe-gold font-medium pt-2">
              "but through every storm, we learned."
            </p>
          </div>
        </div>

        {/* Illustrated Characters Moving Closer */}
        <div className="py-2">
          <TinyCharacters pose="apology" caption="even when we sulked, we always came back within 10 minutes" />
        </div>

        {/* 4 Interactive WhatsApp Growth Cards */}
        <div className="space-y-4 text-left">
          {LESSONS.map((card) => {
            const isExpanded = expandedId === card.id;

            return (
              <div
                key={card.id}
                onClick={() => toggleExpand(card.id)}
                className={`p-5 sm:p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${
                  isExpanded
                    ? 'bg-gradient-to-b from-[#240c1a] to-[#0d0309] border-universe-glowingRed/70 shadow-glow-wine'
                    : 'bg-universe-black/70 border-universe-wine/50 hover:border-universe-gold/60 hover:bg-universe-darkBurgundy/40'
                }`}
              >
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-universe-gold px-2.5 py-1 rounded-full bg-universe-wine/30 border border-universe-wine/50">
                      {card.pillarNumber}
                    </span>
                    <h3 className="font-serif text-base sm:text-xl text-universe-cream font-medium">
                      {card.theme}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-universe-blush">
                    <span className="text-[11px] font-mono hidden sm:inline text-universe-lavender/60">
                      {isExpanded ? 'tap to collapse' : 'tap to reflect'}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180 text-universe-gold' : 'text-universe-lavender/60'
                      }`}
                    />
                  </div>
                </div>

                {/* Always-Visible: "we learned that..." */}
                <div className="mt-3 pt-3 border-t border-universe-wine/30 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-universe-gold block">
                    we learned that...
                  </span>
                  <p className="font-serif italic text-sm sm:text-base text-universe-cream/95 leading-relaxed">
                    "{card.learnedThat}"
                  </p>
                </div>

                {/* Expandable Section: "how we learned it" & "short real proof/quote" */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-universe-wine/40 space-y-4 animate-fadeIn">
                    
                    {/* How We Learned It */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-universe-dustyPink block">
                        how we learned it:
                      </span>
                      <p className="font-sans text-xs sm:text-sm text-universe-cream/80 leading-relaxed">
                        {card.howWeLearnedIt}
                      </p>
                    </div>

                    {/* Short Real Proof / Quote From The Chat */}
                    <div className="p-4 rounded-2xl bg-universe-black/80 border border-universe-wine/60 space-y-2 relative overflow-hidden">
                      <div className="flex items-center gap-2 text-universe-gold text-[10px] font-mono uppercase tracking-wider">
                        <Quote className="w-3.5 h-3.5 text-universe-gold" />
                        <span>Real Proof from WhatsApp Chat</span>
                      </div>

                      <p className="font-serif italic text-xs sm:text-sm text-universe-blush whitespace-pre-line leading-relaxed">
                        {card.chatProof}
                      </p>

                      <div className="pt-2 border-t border-universe-wine/30 flex items-center gap-2 text-[11px] font-mono text-universe-cream/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{card.chatQuoteSnippet}</span>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Verbatim Authentic WhatsApp Narrative */}
        <div className="p-8 sm:p-10 rounded-3xl bg-universe-black/85 border border-universe-wine/80 shadow-glow-wine text-left space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-universe-crimson/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-2 text-universe-gold text-xs font-mono tracking-widest uppercase">
            <Heart className="w-3.5 h-3.5 fill-universe-crimson text-universe-crimson" />
            <span>After everything, still us</span>
          </div>

          <p className="font-serif text-sm sm:text-base md:text-lg text-universe-cream/95 leading-relaxed italic">
            “we’ve said ‘i love you’ almost three thousand times, whispered late into the quiet hours, fought, overthought, got angry, got hurt, said things we didn’t mean, and somehow found our way back to each other again and again. there were moments when fear almost won, moments where one of us was scared the other would leave, and moments where everything felt harder than it was supposed to.
          </p>

          <p className="font-serif text-sm sm:text-base md:text-lg text-universe-cream/95 leading-relaxed italic">
            but look at us now. after all those fights, all those almost-endings, all those ‘don’t leave me’s and ‘i don’t wanna lose you’s, we’re still here. still choosing each other. still learning each other. still trying to love each other in the ways that actually matter.
          </p>

          {/* REQUIRED EMOTIONAL REFLECTION CONCLUSION */}
          <div className="pt-4 border-t border-universe-wine/40 text-center">
            <p className="font-serif italic text-base sm:text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-universe-gold via-universe-blush to-universe-gold font-medium leading-relaxed drop-shadow-[0_0_20px_rgba(255,209,102,0.6)]">
              "maybe growing up together isn't about becoming perfect. maybe it's about slowly learning how to love each other better."
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
