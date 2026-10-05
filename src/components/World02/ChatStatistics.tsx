import React, { useState } from 'react';
import {
  Heart,
  PhoneCall,
  Clock,
  MessageCircle,
  ShieldAlert,
  Sparkles,
  Calendar,
  Volume2,
  CheckCircle2,
  Flame,
  HelpCircle
} from 'lucide-react';
import { sound } from '../../utils/audioEngine';
import TinyCharacters from '../Effects/TinyCharacters';

interface StatItem {
  id: string;
  category: 'love' | 'calls' | 'honest' | 'words';
  value: string;
  label: string;
  subtext: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

const STATS_DATA: StatItem[] = [
  {
    id: 'ily',
    category: 'love',
    value: '2,940+',
    label: '"I Love You" Sent',
    subtext: 'whispered across sleepy mornings, midday breaks, and 3 AM reassurance calls',
    icon: <Heart className="w-5 h-5 text-universe-crimson fill-universe-crimson" />,
    highlight: true
  },
  {
    id: 'calls-total',
    category: 'calls',
    value: '418+ hrs',
    label: 'Total Voice & Video Calls',
    subtext: 'keeping the line open while studying, driving, eating, or just breathing together',
    icon: <PhoneCall className="w-5 h-5 text-universe-gold" />
  },
  {
    id: 'longest-call',
    category: 'calls',
    value: '6h 48m',
    label: 'Longest Single Call',
    subtext: '23 Nov 2025 • fell asleep with phones on pillows and woke up together',
    icon: <Clock className="w-5 h-5 text-universe-blush" />,
    highlight: true
  },
  {
    id: 'voice-notes',
    category: 'calls',
    value: '380+',
    label: 'Voice Notes Saved',
    subtext: 'from "teen-char kisses" to sleepy morning groans and sweet little laughs',
    icon: <Volume2 className="w-5 h-5 text-universe-lavender" />
  },
  {
    id: 'fight-episodes',
    category: 'honest',
    value: '14 Episodes',
    label: 'Clustered Tough Talks',
    subtext: 'not 4,000 raw keyword matches — real, distinct arguments we sat through and resolved',
    icon: <Flame className="w-5 h-5 text-universe-dustyPink" />
  },
  {
    id: 'breakup-scares',
    category: 'honest',
    value: '3 Nights',
    label: 'Almost-Endings Survived',
    subtext: 'the terrifying nights when fear almost won, but we chose to fight for each other instead',
    icon: <ShieldAlert className="w-5 h-5 text-universe-crimson" />,
    highlight: true
  },
  {
    id: 'apologies',
    category: 'honest',
    value: '182 Times',
    label: 'Tender Apologies',
    subtext: '"meri galti thi baby", "i\'m sorry motu" — putting ego down within 10 minutes',
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />
  },
  {
    id: 'miss-you',
    category: 'words',
    value: '860+',
    label: '"Miss You" Reminders',
    subtext: 'every time Lucknow and our homes felt too far apart',
    icon: <MessageCircle className="w-5 h-5 text-universe-blush" />
  },
  {
    id: 'dates',
    category: 'love',
    value: '22 Nov 2025',
    label: 'The Day We Became Us',
    subtext: 'the night we crossed from "maybe" to an unbreakable lifelong promise',
    icon: <Calendar className="w-5 h-5 text-universe-gold" />,
    highlight: true
  }
];

export default function ChatStatistics() {
  const [activeTab, setActiveTab] = useState<'all' | 'love' | 'calls' | 'honest'>('all');
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
            "Not just raw keyword counts on a screen, but the true honest measures of our journey together."
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'All Numbers' },
            { id: 'love', label: 'Devotion & Dates' },
            { id: 'calls', label: 'Calls & Midnight' },
            { id: 'honest', label: 'The Honest Truth' }
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

        {/* Honest Analysis Note */}
        <div className="p-6 sm:p-8 rounded-3xl bg-universe-black/80 border border-universe-wine/60 shadow-glow-wine space-y-3 relative overflow-hidden">
          <div className="flex items-center gap-2 text-universe-gold text-xs font-mono tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Why Honest Analysis Matters</span>
          </div>

          <p className="font-serif italic text-xs sm:text-sm md:text-base text-universe-cream/90 leading-relaxed">
            "Anyone can search a WhatsApp export and count four thousand matching angry words. But love isn't raw database rows. We grouped those heated moments into the 14 actual conversation episodes where we sat down, listened to each other crying or sulking, and refused to go to sleep angry. We counted the 3 nights where fear whispered that we couldn't make it — and how every single time, we chose each other again."
          </p>

          <div className="pt-2 flex items-center justify-between border-t border-universe-wine/30 text-[11px] font-mono text-universe-lavender/70">
            <span>Verified from 2025–2026 chat history</span>
            <span className="text-universe-gold">0 permanent breakups • 1 lifetime promise</span>
          </div>
        </div>

        {/* Tiny Characters Poses */}
        <div className="flex justify-center pt-2">
          <TinyCharacters pose="sleeping-call" caption="surviving every storm, falling asleep safe together" />
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
