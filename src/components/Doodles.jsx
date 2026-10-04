import React from 'react';

/**
 * Hand-drawn SVG doodles for romantic aesthetic annotations
 */

export function HeartDoodle({ className = "w-6 h-6 text-universe-blush" }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={`inline-block ${className}`}>
      <path
        d="M20 32C19 31 6 22 6 13C6 8 10 5 15 5C17.5 5 19.5 6.5 20 8C20.5 6.5 22.5 5 25 5C30 5 34 8 34 13C34 22 21 31 20 32Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="60"
        className="animate-pulse"
      />
      <path
        d="M24 10C27 10 29 12 29 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function StarDoodle({ className = "w-5 h-5 text-universe-gold" }) {
  return (
    <svg viewBox="0 0 30 30" fill="none" className={`inline-block ${className}`}>
      <path
        d="M15 2L17.5 11.5L27 15L17.5 18.5L15 28L12.5 18.5L3 15L12.5 11.5L15 2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="15" cy="15" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function ArrowDoodle({ className = "w-8 h-8 text-universe-dustyPink" }) {
  return (
    <svg viewBox="0 0 60 40" fill="none" className={`inline-block ${className}`}>
      <path
        d="M5 25C15 15 35 12 50 20M50 20L42 12M50 20L44 28"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function KissDoodle({ count = 3, className = "text-universe-glowingRed" }) {
  return (
    <span className={`inline-flex items-center gap-1 font-handwritten text-lg ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 150}ms` }}>
          💋
        </span>
      ))}
    </span>
  );
}

export function CuteAnnotation({ text, className = "", arrowDirection = "down" }) {
  return (
    <div className={`inline-flex flex-col items-center select-none pointer-events-none ${className}`}>
      <span className="font-handwritten text-sm md:text-base text-universe-blush whitespace-nowrap drop-shadow">
        {text}
      </span>
      {arrowDirection === 'down' ? (
        <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
          <path d="M12 2C11 8 10 12 12 15M12 15L7 10M12 15L17 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="text-universe-blush" />
        </svg>
      ) : (
        <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
          <path d="M12 16C13 10 14 6 12 3M12 3L7 8M12 3L17 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="text-universe-blush" />
        </svg>
      )}
    </div>
  );
}
