import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import ProtectedRoute from './components/SecretGate/ProtectedRoute';
import { revokeSession } from './config/secretGate';
import StarfieldCanvas from './components/StarfieldCanvas';
import RedThread from './components/RedThread';
import Navbar from './components/Navbar';
import RomanticCursorTrail from './components/RomanticCursorTrail';
import ARGGameEngine from './components/ARGGameEngine';
import TwentyMomentsGallery from './components/TwentyMomentsGallery';
import Chapter01_BeforeWeMet from './components/Chapter01_BeforeWeMet';
import Chapter02_TinderMatch from './components/Chapter02_TinderMatch';
import Chapter03_SpecialDate from './components/Chapter03_SpecialDate';
import Chapter04_OurUniverse from './components/Chapter04_OurUniverse';
import Chapter05_Timeline from './components/Chapter05_Timeline';
import Chapter06_ReasonsILoveYou from './components/Chapter06_ReasonsILoveYou';
import Chapter07_TheApology from './components/Chapter07_TheApology';
import Chapter08_OpenWhen from './components/Chapter08_OpenWhen';
import Chapter09_Birthdays from './components/Chapter09_Birthdays';
import Chapter10_Scrapbook from './components/Chapter10_Scrapbook';
import Chapter11_OurMusic from './components/Chapter11_OurMusic';
import Chapter12_VoiceNote from './components/Chapter12_VoiceNote';
import Chapter13_TheFuture from './components/Chapter13_TheFuture';
import Chapter14_TheProposal from './components/Chapter14_TheProposal';
import Footer from './components/Footer';
import EasterEggsModal from './components/EasterEggsModal';
import { sound } from './utils/audioEngine';
import { Sparkles, Gamepad2, BookOpen, Film } from 'lucide-react';

export type ExperienceView = 'ARG_GAME' | 'MOMENTS_ARCHIVE' | 'CINEMATIC_STORY';

export default function App() {
  return (
    <ProtectedRoute>
      <MainUniverseApp />
    </ProtectedRoute>
  );
}

function MainUniverseApp() {
  const [activeView, setActiveView] = useState<ExperienceView>('ARG_GAME');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [vaultOpen, setVaultOpen] = useState<boolean>(false);
  const [unlockedEggs, setUnlockedEggs] = useState<Set<string>>(new Set());
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [shootingStarTrigger, setShootingStarTrigger] = useState<number>(0);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Easter egg unlocking handler
  const unlockEasterEgg = (eggId: string) => {
    setUnlockedEggs((prev) => {
      if (prev.has(eggId)) return prev;
      const next = new Set(prev).add(eggId);
      
      // Show toast
      setToastMessage(`✨ Secret Unlocked! (${next.size}/10)`);
      setTimeout(() => setToastMessage(null), 4000);

      // Trigger extra shooting stars
      setShootingStarTrigger((c) => c + 1);

      return next;
    });
  };

  // Keyboard Easter Egg: typing 'L' 'O' 'V' 'E'
  useEffect(() => {
    let keyBuffer = '';
    const handleKeyDown = (e: KeyboardEvent) => {
      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > 4) keyBuffer = keyBuffer.slice(-4);

      if (keyBuffer === 'love') {
        unlockEasterEgg('love-key');
        sound.playMatchSound();
        confetti({
          particleCount: 100,
          spread: 80,
          colors: ['#ff285e', '#f5b8c6', '#f5cb68']
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleAudio = () => {
    const playing = sound.toggleAmbientMusic();
    setIsPlayingAudio(playing);
  };

  const handleLockUniverse = () => {
    sound.playHeartClick();
    revokeSession();
    window.location.reload();
  };

  return (
    <div className="relative min-h-screen bg-universe-black text-universe-cream overflow-x-hidden selection:bg-universe-crimson selection:text-white">
      
      {/* Romantic Cursor and Touch Trails */}
      <RomanticCursorTrail />

      {/* Dynamic Starfield Background Canvas */}
      <StarfieldCanvas isMobile={isMobile} shootingStarTrigger={shootingStarTrigger} />

      {/* Navigation Bar */}
      <Navbar
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={handleToggleAudio}
        onOpenVault={() => setVaultOpen(true)}
        unlockedEggsCount={unlockedEggs.size}
        onEasterEggUnlock={unlockEasterEgg}
        onLockUniverse={handleLockUniverse}
      />

      {/* Central Glowing Red Thread of Fate */}
      <RedThread />

      {/* Experience View Switcher Bar */}
      <div className="sticky top-16 z-30 flex justify-center py-2.5 px-4 bg-universe-black/70 backdrop-blur-md border-b border-universe-wine/30">
        <div className="flex items-center gap-1.5 sm:gap-2 p-1 rounded-full bg-universe-darkBurgundy/60 border border-universe-wine/60 shadow-lg max-w-full overflow-x-auto">
          <button
            onClick={() => {
              sound.playHeartClick();
              setActiveView('ARG_GAME');
            }}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap ${
              activeView === 'ARG_GAME'
                ? 'bg-gradient-to-r from-universe-crimson to-universe-glowingRed text-white shadow-glow-red font-semibold'
                : 'text-universe-lavender/70 hover:text-universe-cream'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>ARG Love Game (11 Ch)</span>
          </button>

          <button
            onClick={() => {
              sound.playHeartClick();
              setActiveView('MOMENTS_ARCHIVE');
            }}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap ${
              activeView === 'MOMENTS_ARCHIVE'
                ? 'bg-gradient-to-r from-universe-crimson to-universe-glowingRed text-white shadow-glow-red font-semibold'
                : 'text-universe-lavender/70 hover:text-universe-cream'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>20 Curated Moments</span>
          </button>

          <button
            onClick={() => {
              sound.playHeartClick();
              setActiveView('CINEMATIC_STORY');
            }}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap ${
              activeView === 'CINEMATIC_STORY'
                ? 'bg-gradient-to-r from-universe-crimson to-universe-glowingRed text-white shadow-glow-red font-semibold'
                : 'text-universe-lavender/70 hover:text-universe-cream'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Cinematic Timeline</span>
          </button>
        </div>
      </div>

      {/* Main Content Rendered According to Active Experience View */}
      <main className="relative z-10">
        {activeView === 'ARG_GAME' && (
          <ARGGameEngine />
        )}

        {activeView === 'MOMENTS_ARCHIVE' && (
          <TwentyMomentsGallery />
        )}

        {activeView === 'CINEMATIC_STORY' && (
          <>
            <Chapter01_BeforeWeMet />
            <Chapter02_TinderMatch />
            <Chapter03_SpecialDate />
            <Chapter04_OurUniverse onEasterEggUnlock={unlockEasterEgg} />
            <Chapter05_Timeline />
            <Chapter06_ReasonsILoveYou />
            <Chapter07_TheApology onEasterEggUnlock={unlockEasterEgg} />
            <Chapter08_OpenWhen />
            <Chapter09_Birthdays onEasterEggUnlock={unlockEasterEgg} />
            <Chapter10_Scrapbook onEasterEggUnlock={unlockEasterEgg} />
            <Chapter11_OurMusic onEasterEggUnlock={unlockEasterEgg} />
            <Chapter12_VoiceNote />
            <Chapter13_TheFuture />
            <Chapter14_TheProposal />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenVault={() => setVaultOpen(true)}
        onEasterEggUnlock={unlockEasterEgg}
      />

      {/* Easter Eggs Secret Vault Modal */}
      <EasterEggsModal
        isOpen={vaultOpen}
        onClose={() => setVaultOpen(false)}
        unlockedSet={unlockedEggs}
        onUnlockEgg={unlockEasterEgg}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-full bg-gradient-to-r from-universe-crimson to-universe-glowingRed text-white text-xs font-mono shadow-glow-red flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-universe-gold" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
