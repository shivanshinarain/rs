import React, { useState, useRef, useEffect } from 'react';
import { Eye, EyeOff, KeyRound, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audioEngine';
import { GATE_TEXTS, verifySecretPassphrase } from '../../config/secretGate';
import HintReveal from './HintReveal';

interface PasswordScreenProps {
  onSuccess: () => void;
  onWrongAttempt?: (attemptCount: number) => void;
}

export default function PasswordScreen({ onSuccess, onWrongAttempt }: PasswordScreenProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [shake, setShake] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [wrongMessage, setWrongMessage] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [fallingStar, setFallingStar] = useState(false);
  const [showDoodle, setShowDoodle] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  // Focus input automatically upon entering this screen
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const getFeedbackMessage = (attempt: number) => {
    const { attempt1, attempt2, attempt3, randoms } = GATE_TEXTS.wrongAttempts;
    if (attempt === 1) return attempt1;
    if (attempt === 2) return attempt2;
    if (attempt === 3) return attempt3;
    const randomIdx = Math.floor(Math.random() * randoms.length);
    return randoms[randomIdx];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim() || isVerifying) return;

    setIsVerifying(true);

    const isValid = await verifySecretPassphrase(password);

    if (isValid) {
      sound.playHeartClick();
      onSuccess();
    } else {
      sound.playTone(180, 0.28, 'sine', 0.1);
      const nextAttempt = attemptCount + 1;
      setAttemptCount(nextAttempt);
      setWrongMessage(getFeedbackMessage(nextAttempt));
      setShake(true);

      // Trigger unique visual feedback per attempt
      if (nextAttempt === 1) {
        setFallingStar(true);
        setTimeout(() => setFallingStar(false), 1200);
      } else if (nextAttempt === 3) {
        setShowDoodle(true);
      }

      if (onWrongAttempt) {
        onWrongAttempt(nextAttempt);
      }

      setTimeout(() => setShake(false), 600);
      setIsVerifying(false);
    }
  };

  return (
    <div className="relative z-20 max-w-md w-full text-center space-y-6 sm:space-y-7 p-6 sm:p-8 animate-fadeIn">
      
      {/* Cinematic Quote */}
      <div className="space-y-1.5">
        <p className="font-serif italic text-xs sm:text-sm text-universe-lavender/70 tracking-wide">
          "{GATE_TEXTS.password.quoteLine1}"
        </p>
        <p className="font-serif italic text-xs sm:text-sm text-universe-blush tracking-wide">
          "{GATE_TEXTS.password.quoteLine2}"
        </p>
      </div>

      {/* Secret Prompt Header */}
      <div className="space-y-2">
        <div className="w-12 h-12 mx-auto rounded-full bg-universe-wine/30 border border-universe-glowingRed/40 flex items-center justify-center text-universe-blush shadow-glow-red animate-pulse">
          <KeyRound className="w-5 h-5" />
        </div>
        <h3 className="font-serif text-xl sm:text-2xl text-universe-cream font-light tracking-wide">
          {GATE_TEXTS.password.prompt}
        </h3>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Input Wrapper */}
        <div className={`relative transition-transform ${shake ? 'animate-shake' : ''}`}>
          <input
            ref={inputRef}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (wrongMessage) setWrongMessage(null);
            }}
            placeholder="••••••••••"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            className="w-full h-13 sm:h-14 px-5 pr-12 rounded-2xl bg-black/60 border-2 border-universe-wine/60 text-universe-cream text-center font-mono text-base tracking-widest placeholder:text-universe-lavender/30 focus:outline-none focus:border-universe-glowingRed focus:ring-2 focus:ring-universe-glowingRed/30 shadow-inner transition-all touch-manipulation"
          />

          {/* Toggle Password Visibility */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-2 rounded-xl text-universe-lavender/50 hover:text-universe-blush transition-colors touch-manipulation"
            title={showPassword ? "Hide secret" : "Show secret"}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>

          {/* Falling Star Animation on First Wrong Attempt */}
          {fallingStar && (
            <div className="absolute -top-3 right-6 pointer-events-none text-universe-gold animate-bounce">
              ✦
            </div>
          )}
        </div>

        {/* Wrong Feedback Message */}
        {wrongMessage && (
          <div className="animate-fadeIn space-y-1">
            <p className="font-handwritten text-base sm:text-lg text-universe-blush">
              {wrongMessage}
            </p>
            {showDoodle && (
              <p className="text-[11px] font-mono text-universe-dustyPink">
                (hint: two words + one date)
              </p>
            )}
          </div>
        )}

        {/* Unlock Button */}
        <button
          type="submit"
          disabled={isVerifying || !password.trim()}
          className="w-full min-h-[48px] py-3.5 px-8 rounded-full bg-gradient-to-r from-universe-crimson via-universe-glowingRed to-universe-crimson text-white font-sans text-xs uppercase tracking-widest font-semibold shadow-glow-red hover:scale-102 active:scale-98 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2 touch-manipulation"
        >
          <span>{GATE_TEXTS.password.unlockButton}</span>
          <Sparkles className="w-3.5 h-3.5" />
        </button>

      </form>

      {/* Hint Trigger Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => setShowHint(true)}
          className="font-handwritten text-sm sm:text-base text-universe-dustyPink hover:text-universe-blush transition-colors touch-manipulation underline decoration-universe-wine/50 underline-offset-4"
        >
          {GATE_TEXTS.password.hintButton}
        </button>
      </div>

      {/* Hint Whisper Modal */}
      <HintReveal
        isOpen={showHint}
        onClose={() => setShowHint(false)}
      />

    </div>
  );
}
