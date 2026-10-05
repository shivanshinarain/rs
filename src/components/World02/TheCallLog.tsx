import React, { useState } from 'react';
import {
  Phone,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Volume2,
  Clock,
  Heart,
  Sparkles
} from 'lucide-react';
import { sound } from '../../utils/audioEngine';

interface CallRecord {
  id: number;
  type: 'incoming' | 'outgoing' | 'missed';
  contact: string;
  duration: string;
  date: string;
  tag: string;
  note: string;
  audio?: string;
}

const CALL_RECORDS: CallRecord[] = [
  {
    id: 1,
    type: 'incoming',
    contact: 'Rashi ❤️',
    duration: '6 hrs 48 mins',
    date: '23 Nov 2025 • 03:12 AM',
    tag: 'Longest Call Record',
    note: "Fell asleep with phones plugged in beside our pillows. Woke up hearing each other's quiet morning breathing.",
    audio: '/assets/rashi_sleepy_voice_note.webm'
  },
  {
    id: 2,
    type: 'outgoing',
    contact: 'Rashi ❤️',
    duration: '4 hrs 12 mins',
    date: 'Dec 02 • 02:40 AM',
    tag: 'Deep Midnight Talks',
    note: '"Kiss toh mil sakti hai na? Bas teen-char..." Shivi pleading in her softest voice.',
    audio: '/assets/shivi_voice_note.webm'
  },
  {
    id: 3,
    type: 'missed',
    contact: 'Rashi ❤️',
    duration: 'No Answer',
    date: 'Nov 12 • 03:14 AM',
    tag: 'Midnight Missed Call',
    note: 'Waking up suddenly in the dark, staring at the empty screen, wishing 800 miles were zero.'
  },
  {
    id: 4,
    type: 'incoming',
    contact: 'Rashi ❤️',
    duration: '2 hrs 18 mins',
    date: 'Nov 22 2025 • Evening',
    tag: 'The Proposal Night',
    note: '"Interval tak nhi — poori zindagi tak." The call where everything became permanent.'
  }
];

export default function TheCallLog() {
  const [activeCallId, setActiveCallId] = useState<number | null>(null);
  const [callingSimulation, setCallingSimulation] = useState(false);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [audioObj, setAudioObj] = useState<HTMLAudioElement | null>(null);

  const handlePlayVoice = (audioSrc: string) => {
    if (playingAudio === audioSrc && audioObj) {
      audioObj.pause();
      setPlayingAudio(null);
      return;
    }
    sound.playHeartClick();
    const a = new Audio(audioSrc);
    a.play().catch(() => {});
    setAudioObj(a);
    setPlayingAudio(audioSrc);
    a.onended = () => setPlayingAudio(null);
  };

  const handleSimulateCall = () => {
    sound.playHeartClick();
    setCallingSimulation(true);
    setTimeout(() => {
      sound.playHeartClick();
    }, 1500);
  };

  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 flex flex-col items-center justify-center select-none">
      <div className="max-w-3xl w-full text-center space-y-6 sm:space-y-8">
        
        {/* Narrative Intro */}
        <div className="space-y-3">
          <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-universe-dustyPink px-3.5 py-1.5 rounded-full border border-universe-wine/40 bg-universe-darkBurgundy/40 inline-flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-universe-gold" />
            LDR Calling History
          </span>
          
          <h2 className="font-serif text-2xl sm:text-4xl text-universe-cream">
            The Call Log
          </h2>

          <div className="space-y-1 max-w-md mx-auto">
            <p className="font-serif italic text-sm sm:text-base text-universe-cream/90">
              "we couldn't always be in the same place."
            </p>
            <p className="font-serif italic text-xs sm:text-sm text-universe-gold">
              "so we kept meeting here."
            </p>
          </div>
        </div>

        {/* Animated Calling Simulator Card */}
        <div className="p-5 rounded-3xl bg-gradient-to-b from-[#240c1a] to-[#0d040c] border border-universe-wine/70 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-universe-crimson to-universe-gold flex items-center justify-center shadow-glow-red">
              <img src="/assets/shivi_rashi_cartoon.jpg" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-universe-dustyPink uppercase tracking-wider block">
                {callingSimulation ? 'Connecting Screen...' : 'Direct Line'}
              </span>
              <h3 className="font-serif text-lg text-universe-cream font-medium">
                CALLING... Rashi ❤️
              </h3>
            </div>
          </div>

          <button
            onClick={handleSimulateCall}
            className={`px-5 py-2.5 rounded-full text-xs font-mono font-semibold flex items-center gap-2 transition-all ${
              callingSimulation
                ? 'bg-emerald-600 text-white shadow-lg animate-pulse'
                : 'bg-universe-crimson hover:bg-universe-glowingRed text-white shadow-glow-red hover:scale-105 active:scale-95'
            }`}
          >
            <Phone className="w-4 h-4 fill-current" />
            <span>{callingSimulation ? 'Ringing Her Heart...' : 'Simulate Call to Rashi'}</span>
          </button>
        </div>

        {/* Real Call Records List */}
        <div className="space-y-3 text-left">
          {CALL_RECORDS.map((record) => {
            const isMissed = record.type === 'missed';
            const isPlaying = playingAudio === record.audio;

            return (
              <div
                key={record.id}
                onClick={() => setActiveCallId(activeCallId === record.id ? null : record.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isMissed
                    ? 'bg-universe-black/60 border-red-900/40 hover:border-red-600/60'
                    : 'bg-universe-black/75 border-universe-wine/50 hover:border-universe-glowingRed/70'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isMissed
                        ? 'bg-red-950/60 text-red-400 border border-red-800'
                        : 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                    }`}>
                      {isMissed ? <PhoneMissed className="w-4 h-4" /> : <PhoneIncoming className="w-4 h-4" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-sm sm:text-base text-universe-cream font-medium">
                          {record.contact}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-universe-wine/30 text-universe-dustyPink">
                          {record.tag}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-universe-lavender/60">
                        {record.date}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`font-mono text-xs font-bold block ${
                      isMissed ? 'text-red-400' : 'text-universe-gold'
                    }`}>
                      {record.duration}
                    </span>
                  </div>
                </div>

                {/* Expanded Details / Voice Recording */}
                <div className="mt-3 pt-3 border-t border-universe-wine/30 text-xs font-serif text-universe-blush italic flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <p>"{record.note}"</p>

                  {record.audio && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayVoice(record.audio!);
                      }}
                      className="px-3 py-1.5 rounded-full bg-universe-crimson/80 hover:bg-universe-crimson text-white text-[11px] font-mono flex items-center gap-1.5 shadow-sm transition-transform active:scale-95 whitespace-nowrap"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{isPlaying ? 'Pause Voice' : 'Play Voice Note'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
