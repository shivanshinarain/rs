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
import PermanentRedThread from './components/Effects/PermanentRedThread';
import HeartbeatSoundManager from './components/Effects/HeartbeatSoundManager';
import { sound } from './utils/audioEngine';
import { Sparkles } from 'lucide-react';

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
      />

      {/* 5 Connected Worlds Switcher Dock */}
      <WorldNavigationDock
        currentWorld={currentWorld}
        onSelectWorld={handleSwitchWorld}
        onLockUniverse={handleLockUniverse}
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={handleToggleAudio}
      />

      {/* Global Permanent Red Thread of Fate */}
      <PermanentRedThread />

      {/* Global Subtle Heartbeat Pulse System */}
      <HeartbeatSoundManager currentWorld={currentWorld} />


      {/* Main Experience Worlds */}
      <main className="relative z-10 pb-16">
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
