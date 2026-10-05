import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { sound } from '../../utils/audioEngine';

interface FloatingWord {
  text: string;
  x: number;
  y: number;
  opacity: number;
  scale: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  shape: 'star' | 'heart' | 'sparkle';
}

const MEMORY_WORDS = [
  'chotu ♡',
  'penguin 🐧',
  'wifeyy 💍',
  'interval tak nhi',
  'permanent commitment',
  '3-4 kisses',
  '22 november 2025',
  'paper rings',
  'our 3 AM calls',
  'my favourite human',
  'never temporary',
  'ho jao na mere pyaar mein pagal',
  'sweet text',
  'home'
];

export default function RashiEffectCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [energyLevel, setEnergyLevel] = useState(0); // 0 to 100
  const [stage, setStage] = useState<'initial' | 'awakening' | 'alive' | 'climax'>('initial');
  const [floatingWords, setFloatingWords] = useState<FloatingWord[]>([]);
  const lastMoveRef = useRef({ x: 0, y: 0, time: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Particle[] = [];

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 550;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Particle render loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background subtle cosmic fog
      const grad = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        10,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 1.5
      );
      grad.addColorStop(0, 'rgba(61, 16, 32, 0.15)');
      grad.addColorStop(1, 'rgba(7, 3, 6, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        if (p.shape === 'star') {
          // Draw star
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'heart') {
          // Draw tiny heart
          ctx.beginPath();
          const s = p.size;
          ctx.moveTo(p.x, p.y);
          ctx.bezierCurveTo(p.x - s / 2, p.y - s / 2, p.x - s, p.y + s / 3, p.x, p.y + s);
          ctx.bezierCurveTo(p.x + s, p.y + s / 3, p.x + s / 2, p.y - s / 2, p.x, p.y);
          ctx.fill();
        } else {
          // Sparkle cross
          ctx.fillRect(p.x - p.size, p.y - 0.5, p.size * 2, 1);
          ctx.fillRect(p.x - 0.5, p.y - p.size, 1, p.size * 2);
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Interaction handler: touch / mousemove
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      // Spawn particles
      const colors = ['#f5b8c6', '#ffd166', '#ff285e', '#ffffff', '#e0b0ff'];
      const shapes: ('star' | 'heart' | 'sparkle')[] = ['star', 'heart', 'sparkle'];

      for (let i = 0; i < 4; i++) {
        particles.push({
          x: x + (Math.random() - 0.5) * 20,
          y: y + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 - 0.5,
          size: Math.random() * 3 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: Math.random() * 0.02 + 0.01,
          shape: shapes[Math.floor(Math.random() * shapes.length)]
        });
      }

      // Increase energy level
      setEnergyLevel((prev) => {
        const next = Math.min(100, prev + 0.5);
        if (next > 25 && next <= 60) setStage('awakening');
        if (next > 60 && next < 95) setStage('alive');
        if (next >= 95) {
          setStage('climax');
          sound.playChime();
        }
        return next;
      });

      // Spawn floating word periodically
      const now = Date.now();
      if (now - lastMoveRef.current.time > 800) {
        lastMoveRef.current = { x, y, time: now };
        const randomWord = MEMORY_WORDS[Math.floor(Math.random() * MEMORY_WORDS.length)];
        setFloatingWords((prev) => [
          ...prev.slice(-6),
          {
            text: randomWord,
            x: Math.max(30, Math.min(canvas.width - 120, x + (Math.random() - 0.5) * 80)),
            y: Math.max(30, Math.min(canvas.height - 40, y + (Math.random() - 0.5) * 60)),
            opacity: 1,
            scale: 0.9 + Math.random() * 0.3
          }
        ]);
      }
    };

    canvas.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('touchmove', handlePointerMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handlePointerMove);
      canvas.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 flex flex-col items-center justify-center select-none overflow-hidden">
      <div className="max-w-4xl w-full text-center space-y-6 relative z-10">
        
        {/* Title */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-universe-dustyPink px-3.5 py-1.5 rounded-full border border-universe-wine/40 bg-universe-darkBurgundy/40 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-universe-gold animate-spin" style={{ animationDuration: '6s' }} />
            Interactive Phenomenon
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-universe-cream">
            The Rashi Effect
          </h2>
          <p className="font-serif italic text-sm sm:text-lg text-universe-blush">
            "do you know what happens when you enter my world?"
          </p>
        </div>

        {/* Interactive Canvas Box */}
        <div className="relative mx-auto w-full h-[400px] sm:h-[480px] rounded-3xl bg-universe-black/90 border-2 border-universe-wine/60 shadow-2xl overflow-hidden cursor-crosshair">
          
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          {/* Floating Memory Words */}
          {floatingWords.map((word, i) => (
            <div
              key={i}
              className="absolute pointer-events-none transition-all duration-1000 font-serif italic text-xs sm:text-sm text-universe-blush bg-universe-darkBurgundy/60 backdrop-blur-xs px-2.5 py-1 rounded-full border border-universe-wine/40 shadow-glow-wine"
              style={{
                left: `${word.x}px`,
                top: `${word.y}px`,
                transform: `scale(${word.scale})`,
                opacity: word.opacity
              }}
            >
              {word.text}
            </div>
          ))}

          {/* Center Constellation Forming Around Rashi's Name */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-all duration-1000"
            style={{ opacity: Math.min(1, energyLevel / 70) }}
          >
            <div className="text-4xl sm:text-7xl font-serif font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-universe-blush via-white to-universe-gold drop-shadow-[0_0_25px_rgba(242,181,196,0.8)] animate-pulse">
              R A S H I
            </div>
            
            {/* Climax Narrative Reveal */}
            {stage === 'climax' && (
              <div className="mt-4 px-4 space-y-2 text-center animate-fadeIn">
                <p className="font-serif text-sm sm:text-lg text-universe-cream leading-relaxed">
                  "everything gets a little more alive."
                </p>
                <p className="font-serif italic text-xs sm:text-base text-universe-gold">
                  "that's what you did to my life."
                </p>
                <p className="font-serif text-sm sm:text-xl text-universe-blush font-semibold">
                  "you became my favourite part of everything."
                </p>
              </div>
            )}
          </div>

          {/* Bottom Interactive Hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center pointer-events-none">
            <span className="text-[10px] font-mono tracking-wider text-universe-lavender/60 bg-universe-black/70 px-3 py-1 rounded-full border border-universe-wine/40">
              {energyLevel < 95
                ? `Touch or move your cursor across the sky (${Math.floor(energyLevel)}%)`
                : '✨ Complete: You are the light of this universe'}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
