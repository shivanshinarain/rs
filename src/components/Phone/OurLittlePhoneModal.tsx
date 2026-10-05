import React, { useState } from 'react';
import {
  MessageCircle,
  Phone,
  Image as ImageIcon,
  Music,
  FileText,
  Heart,
  X,
  Play,
  Pause,
  ChevronLeft,
  Volume2,
  Calendar,
  Sparkles,
  Wifi,
  Battery
} from 'lucide-react';
import { sound } from '../../utils/audioEngine';

type PhoneApp = 'HOME' | 'WHATSAPP' | 'CALLS' | 'GALLERY' | 'MUSIC' | 'NOTES' | 'US';

interface OurLittlePhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OurLittlePhoneModal({ isOpen, onClose }: OurLittlePhoneModalProps) {
  const [activeApp, setActiveApp] = useState<PhoneApp>('HOME');
  const [playingVoice, setPlayingVoice] = useState(false);
  const [voiceAudio, setVoiceAudio] = useState<HTMLAudioElement | null>(null);
  const [playingPaperRings, setPlayingPaperRings] = useState(false);

  if (!isOpen) return null;

  const handleOpenApp = (app: PhoneApp) => {
    sound.playHeartClick();
    setActiveApp(app);
  };

  const handleToggleVoice = (src: string) => {
    if (playingVoice && voiceAudio) {
      voiceAudio.pause();
      setPlayingVoice(false);
      return;
    }
    const a = new Audio(src);
    a.play().then(() => {
      setVoiceAudio(a);
      setPlayingVoice(true);
    }).catch(() => setPlayingVoice(true));
    a.onended = () => setPlayingVoice(false);
  };

  const handleToggleSong = () => {
    const isPlaying = sound.togglePaperRingsTrack();
    setPlayingPaperRings(isPlaying);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn select-none">
      
      {/* Phone Outer Chassis */}
      <div className="relative w-full max-w-[340px] sm:max-w-[360px] h-[650px] sm:h-[700px] rounded-[48px] bg-gradient-to-b from-[#1c0a15] via-[#0d040b] to-[#050204] p-3 border-4 border-universe-wine/80 shadow-[0_0_50px_rgba(255,40,94,0.3)] flex flex-col justify-between overflow-hidden">
        
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-40 w-7 h-7 rounded-full bg-universe-black/80 border border-universe-wine/60 text-universe-lavender hover:text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Screen Bezel Area */}
        <div className="relative w-full h-full rounded-[38px] bg-black border border-universe-wine/30 flex flex-col justify-between overflow-hidden">
          
          {/* Dynamic Island / Notch & Status Bar */}
          <div className="relative z-30 pt-2 px-5 flex items-center justify-between text-[11px] font-mono text-universe-lavender/70 border-b border-universe-wine/20">
            <span>03:00</span>
            {/* Notch */}
            <div className="w-24 h-4 bg-universe-black rounded-full border border-universe-wine/40 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-universe-wine" />
              <span className="w-1.5 h-1.5 rounded-full bg-universe-crimson" />
            </div>
            <div className="flex items-center gap-1.5">
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5 text-universe-gold" />
            </div>
          </div>

          {/* Subtitle Header */}
          <div className="px-4 py-1 text-center bg-universe-darkBurgundy/30 border-b border-universe-wine/20">
            <span className="text-[10px] font-serif italic text-universe-blush/80">
              our little phone ♡
            </span>
          </div>

          {/* Main App Content View */}
          <div className="flex-1 overflow-y-auto px-4 py-3 relative">
            
            {/* HOME SCREEN */}
            {activeApp === 'HOME' && (
              <div className="h-full flex flex-col justify-between py-4">
                <div className="text-center space-y-1">
                  <div className="w-16 h-16 mx-auto rounded-full p-0.5 bg-gradient-to-tr from-universe-crimson to-universe-gold shadow-glow-red overflow-hidden">
                    <img src="/assets/shivi_rashi_cartoon.jpg" alt="Us" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <h3 className="font-serif text-lg text-universe-cream">Rashi & Shivi</h3>
                  <p className="text-[10px] font-mono text-universe-gold">Permanent Since 22.11.2025</p>
                </div>

                {/* App Grid */}
                <div className="grid grid-cols-3 gap-3.5 my-auto">
                  {[
                    { id: 'WHATSAPP', name: 'WhatsApp', icon: MessageCircle, color: 'from-emerald-600 to-teal-800' },
                    { id: 'CALLS', name: 'Calls', icon: Phone, color: 'from-amber-600 to-rose-700' },
                    { id: 'GALLERY', name: 'Gallery', icon: ImageIcon, color: 'from-fuchsia-700 to-purple-900' },
                    { id: 'MUSIC', name: 'Music', icon: Music, color: 'from-rose-600 to-red-800' },
                    { id: 'NOTES', name: 'Notes', icon: FileText, color: 'from-yellow-600 to-amber-800' },
                    { id: 'US', name: 'Us ♡', icon: Heart, color: 'from-universe-crimson to-universe-glowingRed' }
                  ].map((app) => {
                    const Icon = app.icon;
                    return (
                      <button
                        key={app.id}
                        onClick={() => handleOpenApp(app.id as PhoneApp)}
                        className="flex flex-col items-center gap-1.5 group touch-manipulation"
                      >
                        <div className={`w-13 h-13 rounded-2xl bg-gradient-to-tr ${app.color} p-3 flex items-center justify-center text-white shadow-md group-hover:scale-110 active:scale-95 transition-all`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-sans text-universe-cream/90 group-hover:text-universe-blush">
                          {app.name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <p className="text-center text-[9px] font-mono text-universe-lavender/50">
                  Tap any app to explore our private world
                </p>
              </div>
            )}

            {/* APP: WHATSAPP */}
            {activeApp === 'WHATSAPP' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-universe-wine/30">
                  <button onClick={() => setActiveApp('HOME')} className="text-universe-blush">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <img src="/assets/shivi_rashi_cartoon.jpg" className="w-7 h-7 rounded-full object-cover" />
                  <div>
                    <h4 className="text-xs font-semibold text-universe-cream">Wifeyy Shivi ♡</h4>
                    <p className="text-[9px] text-emerald-400 font-mono">online • typing...</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs font-sans">
                  <div className="p-2.5 rounded-2xl rounded-tl-none bg-universe-wine/40 border border-universe-wine/50 text-universe-cream max-w-[85%]">
                    "I want u in my life... not as a friend but as a gf, as a life partner."
                    <span className="block text-[8px] font-mono text-universe-lavender/60 text-right mt-1">22 Nov</span>
                  </div>

                  <div className="p-2.5 rounded-2xl rounded-tl-none bg-universe-wine/40 border border-universe-wine/50 text-universe-cream max-w-[85%]">
                    "And meko aap hamesha saath chahiye... interval tak nhi."
                    <span className="block text-[8px] font-mono text-universe-lavender/60 text-right mt-1">22 Nov</span>
                  </div>

                  <div className="p-2.5 rounded-2xl rounded-tr-none bg-emerald-950/70 border border-emerald-800/60 text-emerald-100 max-w-[85%] ml-auto">
                    "Okay... then yess i'll be with u not temporary, it's permanent commitment frm my side 🤧"
                    <span className="block text-[8px] font-mono text-emerald-400/60 text-right mt-1">22 Nov ✓✓</span>
                  </div>

                  {/* Voice Note Attachment */}
                  <div className="p-2.5 rounded-2xl bg-universe-darkBurgundy/60 border border-universe-wine/60 text-universe-cream space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-mono text-universe-blush">
                      <span>Voice Note: "Kiss toh mil sakti hai na?"</span>
                      <span>0:14</span>
                    </div>
                    <button
                      onClick={() => handleToggleVoice('/assets/shivi_voice_note.webm')}
                      className="w-full py-1.5 rounded-xl bg-universe-crimson text-white text-[11px] font-mono flex items-center justify-center gap-1.5 shadow-sm hover:scale-102 transition-all"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{playingVoice ? 'Pause' : 'Play Voice Note'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* APP: CALLS */}
            {activeApp === 'CALLS' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-universe-wine/30">
                  <button onClick={() => setActiveApp('HOME')} className="text-universe-blush">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h4 className="text-xs font-semibold text-universe-cream">Call History with Rashi ❤️</h4>
                </div>

                <div className="space-y-2 text-xs">
                  {[
                    { type: 'Incoming', duration: '6 hrs 48 mins', time: 'Midnight Record', note: 'Fell asleep with phones beside pillows' },
                    { type: 'Outgoing', duration: '4 hrs 12 mins', time: 'Yesterday 3 AM', note: '"Kiss toh mil sakti hai na?"' },
                    { type: 'Missed', duration: 'No Answer', time: 'Nov 12', note: 'Woke up at 3:14 AM wishing you were here' },
                    { type: 'Incoming', duration: '3 hrs 55 mins', time: 'First Call', note: 'Heart beating through the chest' }
                  ].map((call, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-universe-wine/20 border border-universe-wine/40 space-y-1">
                      <div className="flex items-center justify-between font-mono text-[10px]">
                        <span className={call.type === 'Missed' ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                          {call.type === 'Missed' ? '✕ Missed Call' : '📞 ' + call.type}
                        </span>
                        <span className="text-universe-dustyPink">{call.time}</span>
                      </div>
                      <div className="flex items-center justify-between text-universe-cream">
                        <span className="font-serif italic text-xs">{call.note}</span>
                        <span className="font-mono text-[10px] text-universe-gold">{call.duration}</span>
                      </div>
                    </div>
                  ))}

                  {/* Sleepy Voice Note in Calls */}
                  <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-800/40 space-y-1.5">
                    <span className="text-[10px] font-mono text-purple-300 block">
                      Saved Audio Note: Rashi Falling Asleep on Call
                    </span>
                    <button
                      onClick={() => handleToggleVoice('/assets/rashi_sleepy_voice_note.webm')}
                      className="w-full py-1.5 rounded-xl bg-purple-900/60 border border-purple-700/60 text-purple-200 text-xs font-mono flex items-center justify-center gap-1.5"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Listen to Sleepy Rashi Voice</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* APP: GALLERY */}
            {activeApp === 'GALLERY' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-universe-wine/30">
                  <button onClick={() => setActiveApp('HOME')} className="text-universe-blush">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h4 className="text-xs font-semibold text-universe-cream">Polaroids & Doodles</h4>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { img: '/assets/shivi_rashi_cartoon.jpg', caption: 'Us Always' },
                    { img: '/assets/shivi_rashi_cartoon_sleep_call.jpg', caption: '3 AM Calls' },
                    { img: '/assets/shivi_rashi_cartoon_proposal.jpg', caption: 'Paper Rings' },
                    { img: '/assets/shivi_rashi_doodle_couch.jpg', caption: 'Couch Hugs' },
                    { img: '/assets/shivi_rashi_stickers.jpg', caption: 'Our Stickers' },
                    { img: '/assets/shivi_rashi_real.jpg', caption: 'Real Memories' }
                  ].map((p, i) => (
                    <div key={i} className="p-1.5 rounded-xl bg-universe-black/60 border border-universe-wine/40 space-y-1 text-center">
                      <img src={p.img} alt={p.caption} className="w-full h-24 object-cover rounded-lg" />
                      <span className="text-[9px] font-serif italic text-universe-blush">{p.caption}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* APP: MUSIC */}
            {activeApp === 'MUSIC' && (
              <div className="space-y-4 text-center">
                <div className="flex items-center gap-2 pb-2 border-b border-universe-wine/30 text-left">
                  <button onClick={() => setActiveApp('HOME')} className="text-universe-blush">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h4 className="text-xs font-semibold text-universe-cream">Relationship Anthem</h4>
                </div>

                {/* Spinning Vinyl Record */}
                <div className="relative w-28 h-28 mx-auto rounded-full bg-neutral-950 border-4 border-universe-wine flex items-center justify-center shadow-glow-red animate-spin" style={{ animationDuration: '10s', animationPlayState: playingPaperRings ? 'running' : 'paused' }}>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-universe-crimson to-universe-gold flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white fill-white" />
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-base text-universe-cream">Paper Rings</h3>
                  <p className="text-xs text-universe-blush font-sans">Taylor Swift</p>
                  <p className="text-[10px] font-serif italic text-universe-dustyPink mt-1">
                    "I like shiny things, but I'd marry you with paper rings ♡"
                  </p>
                </div>

                <button
                  onClick={handleToggleSong}
                  className="w-full py-2.5 rounded-full bg-gradient-to-r from-universe-crimson to-universe-glowingRed text-white text-xs font-mono font-semibold flex items-center justify-center gap-2 shadow-glow-red hover:scale-105 active:scale-95 transition-all"
                >
                  {playingPaperRings ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  <span>{playingPaperRings ? 'Pause Track' : 'Play Paper Rings'}</span>
                </button>
              </div>
            )}

            {/* APP: NOTES */}
            {activeApp === 'NOTES' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-universe-wine/30">
                  <button onClick={() => setActiveApp('HOME')} className="text-universe-blush">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h4 className="text-xs font-semibold text-universe-cream">Secret Notes for Rashi</h4>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/40 text-amber-100/90 font-serif space-y-1">
                    <span className="font-bold text-universe-gold block">Note 01: Why You</span>
                    <p className="italic text-[11px] leading-relaxed">
                      "Out of everyone in this crowded world, it was you. The girl who understands me without words. You became a place I call home."
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-universe-wine/25 border border-universe-wine/50 text-universe-cream font-serif space-y-1">
                    <span className="font-bold text-universe-blush block">Note 02: Our Two Birthdays</span>
                    <p className="italic text-[11px] leading-relaxed">
                      "12 November belongs to the girl who made my life softer. 8 September belongs to the girl who promised to love her forever."
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* APP: US */}
            {activeApp === 'US' && (
              <div className="space-y-3 text-center">
                <div className="flex items-center gap-2 pb-2 border-b border-universe-wine/30 text-left">
                  <button onClick={() => setActiveApp('HOME')} className="text-universe-blush">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h4 className="text-xs font-semibold text-universe-cream">Us in Numbers</h4>
                </div>

                <div className="p-4 rounded-2xl bg-universe-darkBurgundy/50 border border-universe-wine/50 space-y-2">
                  <span className="text-[10px] font-mono text-universe-gold uppercase tracking-wider">Since 22 November 2025</span>
                  <div className="text-2xl font-serif text-universe-cream font-bold">Forever & Always</div>
                  <p className="text-[11px] font-serif italic text-universe-blush">
                    "Interval tak nhi — poori zindagi tak."
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-left">
                  <div className="p-2.5 rounded-xl bg-universe-black/60 border border-universe-wine/40">
                    <span className="text-[9px] font-mono text-universe-lavender/70 block">Rashi's Birthday</span>
                    <span className="font-serif text-xs text-universe-cream">12 November</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-universe-black/60 border border-universe-wine/40">
                    <span className="text-[9px] font-mono text-universe-lavender/70 block">Shivi's Birthday</span>
                    <span className="font-serif text-xs text-universe-cream">8 September</span>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="p-3 flex justify-center bg-black/80 border-t border-universe-wine/20">
            <button
              onClick={() => {
                sound.playHeartClick();
                setActiveApp('HOME');
              }}
              className="w-28 h-1 rounded-full bg-universe-lavender/40 hover:bg-universe-cream hover:scale-105 transition-all"
            />
          </div>

        </div>

      </div>

    </div>
  );
}
