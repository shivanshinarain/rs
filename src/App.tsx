import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import ProtectedRoute from './components/SecretGate/ProtectedRoute';
import { revokeSession } from './config/secretGate';
import StarfieldCanvas from './components/StarfieldCanvas';
import RomanticCursorTrail from './components/RomanticCursorTrail';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EasterEggsModal from './components/EasterEggsModal';
import WorldNavigationDock, { WorldId } from './components/Navigation/WorldNavigationDock';
import World01_BeforeUs from './components/Worlds/World01_BeforeUs';
import World02_TheLittleUniverse from './components/Worlds/World02_TheLittleUniverse';
import World03_ARGLoveGame from './components/Worlds/World03_ARGLoveGame';
import World04_InnerSanctuary from './components/Worlds/World04_InnerSanctuary';
import World05_BirthdayWorld from './components/Worlds/World05_BirthdayWorld';
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
import Chapter13_TheFuture from './components/Chapter13_TheFuture';
import Chapter14_TheProposal from './components/Chapter14_TheProposal';
import TwentyMomentsGallery from './components/TwentyMomentsGallery';
import PermanentRedThread from './components/Effects/PermanentRedThread';
import HeartbeatSoundManager from './components/Effects/HeartbeatSoundManager';
import UniverseGameExperience from './components/Games/UniverseGameExperience';
import { sound } from './utils/audioEngine';
import { Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  return (
    <ProtectedRoute>
      <MainUniverseApp />
    </ProtectedRoute>
  );
}

function MainUniverseApp() {
  const [currentWorld, setCurrentWorld] = useState<WorldId>('WORLD_01_BEFORE_US');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [vaultOpen, setVaultOpen] = useState<boolean>(false);
  const [unlockedEggs, setUnlockedEggs] = useState<Set<string>>(new Set());
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [shootingStarTrigger, setShootingStarTrigger] = useState<number>(0);
  const [isUniverseGameOpen, setIsUniverseGameOpen] = useState<boolean>(false);

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
      
      setToastMessage(`✨ Secret Unlocked! (${next.size}/10)`);
      setTimeout(() => setToastMessage(null), 4000);

      setShootingStarTrigger((c) => c + 1);
      return next;
    });
  };

  // Keyboard Easter Eggs: 'love', 'chotu', 'penguin'
  useEffect(() => {
    let keyBuffer = '';
    const handleKeyDown = (e: KeyboardEvent) => {
      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > 10) keyBuffer = keyBuffer.slice(-10);

      if (keyBuffer.endsWith('love')) {
        unlockEasterEgg('love-key');
        sound.playMatchSound();
        confetti({ particleCount: 100, spread: 80, colors: ['#ff285e', '#f5b8c6', '#f5cb68'] });
      }

      if (keyBuffer.endsWith('chotu') || keyBuffer.endsWith('penguin')) {
        unlockEasterEgg('nickname-key');
        sound.playChime();
        confetti({ particleCount: 80, spread: 70, colors: ['#ffd166', '#ffffff', '#ff285e'] });
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

  const CHAPTER_TO_WORLD: Record<string, WorldId> = {
    'chapter-1': 'WORLD_01_BEFORE_US',
    'chapter-2': 'WORLD_01_BEFORE_US',
    'chapter-3': 'WORLD_02_LITTLE_UNIVERSE',
    'chapter-4': 'WORLD_02_LITTLE_UNIVERSE',
    'chapter-5': 'WORLD_02_LITTLE_UNIVERSE',
    'chapter-6': 'WORLD_02_LITTLE_UNIVERSE',
    'chapter-7': 'WORLD_04_SANCTUARY',
    'chapter-8': 'WORLD_04_SANCTUARY',
    'chapter-9': 'WORLD_05_BIRTHDAY',
    'chapter-10': 'WORLD_04_SANCTUARY',
    'chapter-11': 'WORLD_05_BIRTHDAY',
    'chapter-13': 'WORLD_05_BIRTHDAY',
    'chapter-14': 'WORLD_05_BIRTHDAY',
  };

  const handleNavigateToChapter = (chapterId: string, targetWorld?: WorldId) => {
    sound.playHeartClick();
    const world = targetWorld || CHAPTER_TO_WORLD[chapterId] || 'WORLD_05_BIRTHDAY';
    if (currentWorld !== world && currentWorld !== 'ALL_CHAPTERS') {
      setCurrentWorld(world);
    }
    setTimeout(() => {
      const el = document.getElementById(chapterId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        el.classList.add('ring-2', 'ring-rose-500/50', 'transition-all');
        setTimeout(() => el.classList.remove('ring-2', 'ring-rose-500/50'), 2500);
      }
    }, 180);
  };

  const handleSwitchWorld = (w: WorldId) => {
    setCurrentWorld(w);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        onNavigateToChapter={handleNavigateToChapter}
      />

      {/* 5 Connected Worlds Switcher Dock + Full Story Mode + Taylor Swift Direct */}
      <WorldNavigationDock
        currentWorld={currentWorld}
        onSelectWorld={handleSwitchWorld}
        onLockUniverse={handleLockUniverse}
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={handleToggleAudio}
        onOpenUniverseGame={() => setIsUniverseGameOpen(true)}
        onOpenTaylorSwift={() => handleNavigateToChapter('chapter-11', 'WORLD_05_BIRTHDAY')}
      />

      {/* Global Permanent Red Thread of Fate */}
      <PermanentRedThread />

      {/* Global Subtle Heartbeat Pulse System */}
      <HeartbeatSoundManager currentWorld={currentWorld} />


      {/* Main Experience Worlds */}
      <main className="relative z-10 pb-16">
        {/* Full Story Mode: All 14 Chapters In Sequence */}
        {currentWorld === 'ALL_CHAPTERS' && (
          <div className="space-y-16 sm:space-y-24">
            <section className="text-center pt-8 px-4 space-y-3">
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-universe-gold px-3.5 py-1.5 rounded-full border border-universe-gold/40 bg-universe-black/50 inline-block shadow-glow-gold">
                COMPLETE CHRONOLOGICAL STORY
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl text-universe-cream">
                All 14 Chapters of Us
              </h1>
              <p className="font-serif italic text-sm sm:text-base text-universe-blush max-w-lg mx-auto">
                "From our first right swipe on Tinder to the sacred paper ring vow — our complete story in one unbroken constellation."
              </p>
            </section>

            <Chapter01_BeforeWeMet />
            <Chapter02_TinderMatch />
            <Chapter03_SpecialDate />
            <Chapter04_OurUniverse onEasterEggUnlock={unlockEasterEgg} />
            <Chapter05_Timeline />
            <Chapter06_ReasonsILoveYou />
            <TwentyMomentsGallery />
            <Chapter07_TheApology onEasterEggUnlock={unlockEasterEgg} />
            <Chapter08_OpenWhen />
            <Chapter09_Birthdays onEasterEggUnlock={unlockEasterEgg} />
            <Chapter10_Scrapbook onEasterEggUnlock={unlockEasterEgg} />
            <Chapter11_OurMusic onEasterEggUnlock={unlockEasterEgg} />
            <Chapter13_TheFuture />
            <Chapter14_TheProposal />
          </div>
        )}

        {currentWorld === 'WORLD_01_BEFORE_US' && (
          <World01_BeforeUs
            onEasterEggUnlock={unlockEasterEgg}
            onNextWorld={() => handleSwitchWorld('WORLD_02_LITTLE_UNIVERSE')}
          />
        )}

        {currentWorld === 'WORLD_02_LITTLE_UNIVERSE' && (
          <World02_TheLittleUniverse
            onEasterEggUnlock={unlockEasterEgg}
            onNextWorld={() => handleSwitchWorld('WORLD_03_ARG_GAME')}
          />
        )}

        {currentWorld === 'WORLD_03_ARG_GAME' && (
          <World03_ARGLoveGame
            onNextWorld={() => handleSwitchWorld('WORLD_04_SANCTUARY')}
          />
        )}

        {currentWorld === 'WORLD_04_SANCTUARY' && (
          <World04_InnerSanctuary
            onEasterEggUnlock={unlockEasterEgg}
            onNextWorld={() => handleSwitchWorld('WORLD_05_BIRTHDAY')}
          />
        )}

        {currentWorld === 'WORLD_05_BIRTHDAY' && (
          <World05_BirthdayWorld
            onEasterEggUnlock={unlockEasterEgg}
          />
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

      {/* Universe Game Experience Modal */}
      <UniverseGameExperience
        isOpen={isUniverseGameOpen}
        onClose={() => setIsUniverseGameOpen(false)}
        isModal={true}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-20 z-50 px-4 py-2.5 rounded-full bg-gradient-to-r from-universe-crimson to-universe-glowingRed text-white text-xs font-mono shadow-glow-red flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-universe-gold" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
