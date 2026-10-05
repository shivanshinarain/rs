import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Sparkles,
  Calendar,
  CheckCircle2,
  Flame,
  Bookmark
} from 'lucide-react';
import { sound } from '../../utils/audioEngine';
import TinyCharacters from '../Effects/TinyCharacters';

export type StatCategory = 'messages' | 'dates' | 'nicknames' | 'moments';

interface StatItem {
  id: string;
  category: StatCategory;
  value: string;
  label: string;
  subtext: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

const STATS_DATA: StatItem[] = [
  {
    id: 'messages-count',
    category: 'messages',
    value: '48,200+',
    label: 'WhatsApp Messages Exchanged',
    subtext: 'thousands of texts, memes, late-night confessions, and quiet check-ins that turned miles into nothing',
    icon: <MessageCircle className="w-5 h-5 text-emerald-400" />,
    highlight: true
  },
  {
    id: 'ily',
    category: 'messages',
    value: '2,940+',
    label: '"I Love You" Sent',
    subtext: 'whispered across sleepy mornings, midday breaks, and quiet moments of reassurance',
    icon: <Heart className="w-5 h-5 text-universe-crimson fill-universe-crimson" />,
    highlight: true
  },
  {
    id: 'miss-you',
    category: 'messages',
    value: '860+',
    label: '"Miss You" Reminders',
    subtext: 'every single time Lucknow and our homes felt a little too far apart',
    icon: <Sparkles className="w-5 h-5 text-universe-blush" />
  },
  {
    id: 'date-proposal',
    category: 'dates',
    value: '22 Nov 2025',
    label: 'The Day We Became Us',
    subtext: 'the night Shivi asked "interval tak nhi" and Rashi answered "permanent commitment frm my side 🤧"',
    icon: <Calendar className="w-5 h-5 text-universe-gold" />,
    highlight: true
  },
  {
    id: 'date-birthdays',
    category: 'dates',
    value: '12 Nov & 8 Sep',
    label: 'Our Celestial Birthdays',
    subtext: 'Rashi turns 21 (12 Nov 2005) & Shivi turns 23 (8 Sep 2003) — Scorpio water meets Virgo earth',
    icon: <Calendar className="w-5 h-5 text-universe-lavender" />
  },
  {
    id: 'nicknames-count',
    category: 'nicknames',
    value: '1,420+',
    label: 'Sacred Pet Names Used',
    subtext: '"Motu", "Penguin", "Chotu", "Wifeyy", "Bebu", "Meri Jaan" — our private dialect of love',
    icon: <Sparkles className="w-5 h-5 text-universe-gold" />,
    highlight: true
  },
  {
    id: 'banter-count',
    category: 'nicknames',
    value: '340+',
    label: '"Pagal Kar Degi" Banter',
    subtext: 'every time you said "pagal kar degi ye ladki 😭" and I answered "ho jao na mere pyaar mein pagal ♡"',
    icon: <Flame className="w-5 h-5 text-universe-dustyPink" />
  },
  {
    id: 'moments-count',
    category: 'moments',
    value: '20 Moments',
    label: 'Curated Story Milestones',
    subtext: 'from the Tinder right swipe to the hospital miracle, cozy blanket days, and paper rings',
    icon: <Bookmark className="w-5 h-5 text-universe-gold" />,
    highlight: true
  },
  {
    id: 'reconciliations',
    category: 'moments',
    value: '182 Times',
    label: 'Tender Apologies & Safe Space',
    subtext: '"meri galti thi baby", "i\'m sorry motu" — putting ego down within 10 minutes, 0 breakups, 1 lifetime promise',
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />
  }
];

export default function ChatStatistics() {
  const [activeTab, setActiveTab] = useState<'all' | StatCategory>('all');
  const [selectedStat, setSelectedStat] = useState<StatItem | null>(null);

  const filteredStats = activeTab === 'all'
    ? STATS_DATA
    : STATS_DATA.filter((s) => s.category === activeTab);

  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 flex flex-col items-center justify-center select-none">
      <div className="max-w-4xl w-full space-y-10 sm:space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-universe-gold px-3.5 py-1.5 rounded-full border border-universe-wine/50 bg-universe-darkBurgundy/40 inline-flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-universe-gold" />
            Actual Chat Analysis
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl text-universe-cream">
            Our Numbers
          </h2>

          <p className="font-serif italic text-sm sm:text-base text-universe-blush max-w-lg mx-auto">
            "Not just raw database rows, but the authentic relationship milestones supported by our WhatsApp journey."
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'All Numbers' },
            { id: 'messages', label: 'Messages & Words' },
            { id: 'dates', label: 'Meaningful Dates' },
            { id: 'nicknames', label: 'Nicknames & Banter' },
            { id: 'moments', label: 'Moments Chosen' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sound.playHeartClick();
                setActiveTab(tab.id as any);
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all ${
                activeTab === tab.id
                  ? 'bg-universe-crimson text-white shadow-glow-red border border-universe-glowingRed'
                  : 'bg-universe-black/50 text-universe-lavender/80 border border-universe-wine/40 hover:text-white hover:border-universe-wine'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredStats.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                sound.playChime();
                setSelectedStat(item);
              }}
              className={`group relative p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                item.highlight
                  ? 'bg-gradient-to-b from-universe-darkBurgundy/80 to-universe-black/90 border-universe-gold/40 hover:border-universe-gold shadow-glow-gold/10'
                  : 'bg-universe-black/70 border-universe-wine/50 hover:border-universe-blush/60 hover:bg-universe-darkBurgundy/50'
              } hover:-translate-y-1`}
            >
              <div className="flex items-center justify-between pb-3">
                <div className="p-2 rounded-xl bg-universe-wine/30 border border-universe-wine/40">
                  {item.icon}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-universe-lavender/60">
                  {item.category}
                </span>
              </div>

              <div className="space-y-1">
                <div className="font-serif text-2xl sm:text-3xl font-bold text-universe-cream group-hover:text-universe-gold transition-colors">
                  {item.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-universe-blush">
                  {item.label}
                </div>
                <p className="text-[11px] font-sans text-universe-lavender/70 line-clamp-2 pt-1 leading-relaxed">
                  {item.subtext}
                </p>
              </div>

              <div className="absolute bottom-2 right-3 text-[9px] font-mono text-universe-gold/40 group-hover:text-universe-gold/80 transition-colors">
                tap to reflect ✦
              </div>
            </div>
          ))}
        </div>

        {/* Tiny Characters Poses */}
        <div className="flex justify-center pt-2">
          <TinyCharacters pose="holding-hands" caption="surviving every storm, safe in each other's heart" />
        </div>

      </div>

      {/* Selected Stat Modal Popup */}
      {selectedStat && (
        <div
          onClick={() => setSelectedStat(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-universe-black/80 backdrop-blur-md animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-md w-full p-6 sm:p-8 rounded-3xl bg-universe-darkBurgundy border border-universe-gold/50 shadow-glow-gold space-y-4 text-center relative"
          >
            <div className="mx-auto w-12 h-12 rounded-full bg-universe-wine/40 border border-universe-gold/40 flex items-center justify-center">
              {selectedStat.icon}
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-universe-gold">
                Memory Milestone
              </span>
              <h3 className="font-serif text-3xl font-bold text-universe-cream">
                {selectedStat.value}
              </h3>
              <p className="text-sm font-medium text-universe-blush">
                {selectedStat.label}
              </p>
            </div>

            <p className="font-serif italic text-xs sm:text-sm text-universe-cream/90 leading-relaxed px-2">
              "{selectedStat.subtext}"
            </p>

            <button
              onClick={() => setSelectedStat(null)}
              className="mt-4 px-6 py-2 rounded-full bg-universe-crimson/80 border border-universe-glowingRed text-white text-xs font-mono uppercase tracking-wider hover:bg-universe-crimson transition-all"
            >
              Keep in Heart ♡
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
