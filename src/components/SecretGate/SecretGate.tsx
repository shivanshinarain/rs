import React, { useState, useEffect, useRef } from 'react';
import { Heart, Volume2, VolumeX, Moon } from 'lucide-react';
import { sound } from '../../utils/audioEngine';
import { GATE_TEXTS, setSessionAuthorized } from '../../config/secretGate';
import PasswordScreen from './PasswordScreen';
import UnlockTransition from './UnlockTransition';
import OrbitingStarsEasterEgg from './OrbitingStarsEasterEgg';

interface SecretGateProps {
  onAuthenticated: () => void;
}

export default function SecretGate({ onAuthenticated }: SecretGateProps) {
  const [viewState, setViewState] = useState<'intro' | 'password' | 'unlocking'>('intro');
  const [introStep, setIntroStep] = useState<number>(0);
  const [isMuted, setIsMuted] = useState(false);
  const [moonClicks, setMoonClicks] = useState(0);
  const [easterEggOpen, setEasterEggOpen] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Intro step sequencing
  useEffect(() => {
    // Step 0: Dark
    // Step 1: First sentence appears
    const t1 = setTimeout(() => {
      setIntroStep(1);
    }, 1200);

    // Step 2: Second sentence appears after pause
    const t2 = setTimeout(() => {
      setIntroStep(2);
    }, 2800);

    // Step 3: Keyhole & button fade in
    const t3 = setTimeout(() => {
      setIntroStep(3);
    }, 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Ambient Starfield & Floating Hearts Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Generate stars
    const stars = Array.from({ length: 65 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.7 + 0.2,
      speed: Math.random() * 0.15 + 0.05
    }));

    // Generate faint floating hearts
    const hearts = Array.from({ length: 12 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 7 + 6,
      alpha: Math.random() * 0.2 + 0.05,
      vy: Math.random() * 0.2 + 0.1
    }));

    // Shooting star state
    let shootingStar = {
      active: true,
      x: window.innerWidth * 0.2,
      y: window.innerHeight * 0.15,
      vx: 3.5,
      vy: 1.8,
      length: 80,
      alpha: 0.9
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render gentle stars
      stars.forEach((s) => {
        s.y -= s.speed;
        if (s.y < 0) s.y = canvas.height;

        ctx.fillStyle = `rgba(255, 235, 245, ${s.alpha})`;
        ctx.fillRect(s.x, s.y, s.size, s.size);
      });

      // Render faint drifting hearts
      hearts.forEach((h) => {
        h.y -= h.vy;
        if (h.y < -20) h.y = canvas.height + 20;

        ctx.save();
        ctx.globalAlpha = h.alpha;
        ctx.font = `${h.size}px serif`;
        ctx.fillStyle = '#ff285e';
        ctx.fillText('♡', h.x, h.y);
        ctx.restore();
      });

      // Render one gentle shooting star across screen
      if (shootingStar.active) {
        ctx.save();
        const grad = ctx.createLinearGradient(
          shootingStar.x,
          shootingStar.y,
          shootingStar.x - shootingStar.vx * 12,
          shootingStar.y - shootingStar.vy * 12
        );
        grad.addColorStop(0, `rgba(255, 220, 240, ${shootingStar.alpha})`);
        grad.addColorStop(1, 'rgba(255, 220, 240, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(
          shootingStar.x - shootingStar.vx * 12,
          shootingStar.y - shootingStar.vy * 12
        );
        ctx.stroke();
        ctx.restore();

        shootingStar.x += shootingStar.vx;
        shootingStar.y += shootingStar.vy;
        shootingStar.alpha -= 0.005;

        if (shootingStar.alpha <= 0) {
          shootingStar.active = false;
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleEnterClick = () => {
    sound.playHeartClick();
    if (!isMuted) {
      sound.playChime();
    }
    setViewState('password');
  };

  const handleUnlockSuccess = () => {
    setViewState('unlocking');
  };

  const handleFinalTransitionComplete = () => {
    setSessionAuthorized();
    onAuthenticated();
  };

  const handleMoonClick = () => {
    sound.playHeartClick();
    const next = moonClicks + 1;
    setMoonClicks(next);
    if (next >= 3) {
      sound.playConstellationChime();
      setEasterEggOpen(true);
      setMoonClicks(0);
    }
  };

  const handleSoundToggle = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#040103] via-[#08020a] to-[#030104] text-white overflow-hidden select-none">
      
      {/* Background Ambience Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Subtle Moonlight Glow in Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-universe-wine/15 blur-3xl pointer-events-none" />

      {/* Top Left: Sound Control (🔊 / 🔇) */}
      <div className="absolute top-5 left-5 z-30">
        <button
          onClick={handleSoundToggle}
          className="p-2.5 rounded-full bg-universe-black/50 border border-universe-wine/40 text-universe-lavender/70 hover:text-white hover:border-universe-blush transition-colors touch-manipulation flex items-center gap-1.5 text-xs font-mono"
          title={isMuted ? "Enable sound" : "Mute sound"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-universe-blush" />}
          <span className="hidden sm:inline text-[10px] text-universe-dustyPink">
            {isMuted ? "MUTED" : "SOUND ON"}
          </span>
        </button>
      </div>

      {/* Top Right: Tiny Moon/Star Easter Egg Trigger (3 clicks) */}
      <div className="absolute top-5 right-5 z-30">
        <button
          onClick={handleMoonClick}
          className="p-2.5 rounded-full text-universe-lavender/40 hover:text-universe-gold transition-colors touch-manipulation"
          title="A quiet star"
        >
          <Moon className="w-4 h-4" />
        </button>
      </div>

      {/* VIEW 1: The First Cinematic Screen */}
      {viewState === 'intro' && (
        <div className="relative z-20 max-w-lg w-full text-center space-y-7 p-6 sm:p-8 animate-fadeIn">
          
          {/* Sentence 1: "this universe isn't for everyone." */}
          {introStep >= 1 && (
            <div className="animate-fadeIn transition-opacity duration-1000">
              <p className="font-serif italic text-xl sm:text-2xl text-universe-cream/90 font-light tracking-wide leading-relaxed">
                "{GATE_TEXTS.intro.firstLine}"
              </p>
            </div>
          )}

          {/* Sentence 2: "if you're the person i made it for… you already know the way in." */}
          {introStep >= 2 && (
            <div className="space-y-2 animate-fadeIn transition-opacity duration-1000">
              <p className="font-serif italic text-base sm:text-lg text-universe-lavender/80 font-light">
                {GATE_TEXTS.intro.secondLine}
              </p>
              <p className="font-serif italic text-lg sm:text-xl text-universe-blush font-light">
                {GATE_TEXTS.intro.thirdLine}
              </p>
            </div>
          )}

          {/* Portal Icon & Enter Button */}
          {introStep >= 3 && (
            <div className="pt-4 space-y-6 animate-scaleUp">
              
              {/* Tiny Glowing Portal / Keyhole */}
              <div className="relative mx-auto w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-universe-glowingRed/20 blur-md animate-pulse" />
                <div className="w-12 h-12 rounded-full bg-universe-darkBurgundy/80 border border-universe-glowingRed/60 flex items-center justify-center shadow-glow-red">
                  <Heart className="w-5 h-5 text-universe-glowingRed fill-universe-glowingRed/40 animate-pulse" />
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleEnterClick}
                className="group relative inline-flex items-center justify-center min-h-[48px] px-8 py-3.5 rounded-full bg-gradient-to-r from-universe-darkBurgundy via-universe-wine to-universe-darkBurgundy border border-universe-glowingRed/50 text-universe-cream font-serif text-xs uppercase tracking-[0.2em] font-medium shadow-glow-red hover:scale-105 active:scale-95 transition-all touch-manipulation"
              >
                <span>{GATE_TEXTS.intro.enterButton}</span>
              </button>

            </div>
          )}

        </div>
      )}

      {/* VIEW 2: The Secret Password Screen */}
      {viewState === 'password' && (
        <PasswordScreen
          onSuccess={handleUnlockSuccess}
        />
      )}

      {/* VIEW 3: Correct Password Unlock Transition */}
      {viewState === 'unlocking' && (
        <UnlockTransition
          onComplete={handleFinalTransitionComplete}
        />
      )}

      {/* Hidden Easter Egg Modal */}
      <OrbitingStarsEasterEgg
        isOpen={easterEggOpen}
        onClose={() => setEasterEggOpen(false)}
      />

    </div>
  );
}
