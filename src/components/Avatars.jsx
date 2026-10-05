import React from 'react';

/**
 * Custom Cartoon Girl Avatars for Shivi & Rashi
 * Supports standard, reaching, walking, and hugging states.
 */

export function ShiviAvatar({ state = 'idle', className = '', onClick, showLabel = true }) {
  const isPanic = state === 'panic';
  const isHappy = state === 'happy' || state === 'sparkle';

  return (
    <div
      onClick={onClick}
      className={`relative inline-block select-none cursor-pointer transition-transform duration-500 hover:scale-105 active:scale-95 touch-manipulation ${className}`}
      title="Shivi ♡"
    >
      <svg
        viewBox="0 0 160 220"
        className="w-full h-auto drop-shadow-[0_10px_25px_rgba(194,30,66,0.35)]"
      >
        <defs>
          <linearGradient id="shiviHair" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1f1118" />
            <stop offset="100%" stopColor="#0a0508" />
          </linearGradient>
          <linearGradient id="shiviSweater" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5c152a" />
            <stop offset="100%" stopColor="#300a15" />
          </linearGradient>
          <radialGradient id="shiviBlush" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff7a9e" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ff7a9e" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Back Hair */}
        <path
          d="M 40 70 C 20 100 25 150 45 170 C 40 130 50 90 60 75 Z"
          fill="url(#shiviHair)"
        />
        <path
          d="M 120 70 C 140 100 135 150 115 170 C 120 130 110 90 100 75 Z"
          fill="url(#shiviHair)"
        />

        {/* Body / Sweater */}
        <path
          d="M 50 130 C 50 115 110 115 110 130 L 122 200 C 122 210 38 210 38 200 Z"
          fill="url(#shiviSweater)"
        />
        {/* Sweater Collar */}
        <path
          d="M 62 124 C 70 134 90 134 98 124 C 98 136 62 136 62 124 Z"
          fill="#400b1a"
        />

        {/* Arms */}
        {state === 'reaching' ? (
          <path
            d="M 102 135 C 125 140 145 130 158 132"
            stroke="url(#shiviSweater)"
            strokeWidth="16"
            strokeLinecap="round"
            fill="none"
          />
        ) : (
          <>
            <path
              d="M 48 135 C 38 155 42 180 50 190"
              stroke="url(#shiviSweater)"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 112 135 C 122 155 118 180 110 190"
              stroke="url(#shiviSweater)"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
            />
          </>
        )}

        {/* Hands */}
        {state === 'reaching' && (
          <circle cx="158" cy="132" r="7" fill="#ffd9cc" />
        )}

        {/* Neck */}
        <rect x="74" y="112" width="12" height="15" rx="5" fill="#fcd7ce" />

        {/* Head */}
        <ellipse cx="80" cy="85" rx="34" ry="36" fill="#ffe5dc" />

        {/* Cheeks Blush */}
        <circle cx="58" cy="94" r="8" fill="url(#shiviBlush)" />
        <circle cx="102" cy="94" r="8" fill="url(#shiviBlush)" />

        {/* Eyes (Manga style, with Panic / Happy expressions) */}
        {isPanic ? (
          <g>
            <circle cx="64" cy="84" r="5" fill="#2d1520" />
            <circle cx="62" cy="82" r="1.5" fill="#ffffff" />
            <circle cx="96" cy="84" r="5" fill="#2d1520" />
            <circle cx="94" cy="82" r="1.5" fill="#ffffff" />
            {/* Sweatdrop */}
            <path d="M 106 72 C 106 67 112 65 112 70 C 112 74 106 75 106 72 Z" fill="#60a5fa" />
          </g>
        ) : isHappy ? (
          <g>
            <path d="M 59 85 Q 65 79 71 85" stroke="#2d1520" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 91 85 Q 97 79 103 85" stroke="#2d1520" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </g>
        ) : (
          <g className="animate-pulse-slow">
            <ellipse cx="64" cy="84" rx="4.5" ry="6.5" fill="#2d1520" />
            <circle cx="62.5" cy="82" r="2" fill="#ffffff" />
            <circle cx="65.5" cy="86.5" r="1" fill="#ffffff" />

            <ellipse cx="96" cy="84" rx="4.5" ry="6.5" fill="#2d1520" />
            <circle cx="94.5" cy="82" r="2" fill="#ffffff" />
            <circle cx="97.5" cy="86.5" r="1" fill="#ffffff" />
          </g>
        )}

        {/* Mouth (Soft Smile or Shocked/Panic) */}
        {isPanic ? (
          <ellipse cx="80" cy="98" rx="4" ry="5.5" fill="#7a1934" />
        ) : (
          <path
            d="M 75 97 Q 80 102 85 97"
            stroke="#993d56"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Hair Bangs & Front */}
        <path
          d="M 46 75 C 46 42 114 42 114 75 C 104 60 90 70 80 62 C 70 72 56 60 46 75 Z"
          fill="url(#shiviHair)"
        />
        <path
          d="M 46 72 C 40 85 44 110 47 115 C 49 105 52 85 54 75 Z"
          fill="url(#shiviHair)"
        />
        <path
          d="M 114 72 C 120 85 116 110 113 115 C 111 105 108 85 106 75 Z"
          fill="url(#shiviHair)"
        />

        {/* Silver Hoop Earrings */}
        <circle cx="45" cy="88" r="4.5" stroke="#e0e7ff" strokeWidth="1.8" fill="none" />
        <circle cx="115" cy="88" r="4.5" stroke="#e0e7ff" strokeWidth="1.8" fill="none" />

        {/* Star Hairpin for Shivi */}
        <polygon
          points="56,58 58,62 62,63 59,66 60,70 56,68 52,70 53,66 50,63 54,62"
          fill="#f5cb68"
        />
      </svg>
      {showLabel && (
        <div className="text-center mt-1.5 sm:mt-2">
          <span className="font-serif text-[10px] sm:text-xs md:text-sm tracking-widest text-universe-blush uppercase bg-universe-darkBurgundy/80 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-universe-wine/50">
            Shivi
          </span>
        </div>
      )}
    </div>
  );
}

export function RashiAvatar({ state = 'idle', className = '', onClick, showLabel = true }) {
  const isPout = state === 'pout';
  const isEating = state === 'eating';
  const isBonked = state === 'bonked';
  const isSparkle = state === 'sparkle' || state === 'happy';

  return (
    <div
      onClick={onClick}
      className={`relative inline-block select-none cursor-pointer transition-transform duration-500 hover:scale-105 active:scale-95 touch-manipulation ${className}`}
      title="Rashi ♡"
    >
      <svg
        viewBox="0 0 160 220"
        className="w-full h-auto drop-shadow-[0_10px_25px_rgba(245,184,198,0.35)]"
      >
        <defs>
          <linearGradient id="rashiHair" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2c1720" />
            <stop offset="100%" stopColor="#12070d" />
          </linearGradient>
          <linearGradient id="rashiSweater" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8b4be" />
            <stop offset="100%" stopColor="#c78696" />
          </linearGradient>
          <radialGradient id="rashiBlush" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff668a" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#ff668a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Wavy Back Hair for Rashi */}
        <path
          d="M 36 68 C 12 105 18 165 42 190 C 35 145 46 95 56 75 Z"
          fill="url(#rashiHair)"
        />
        <path
          d="M 124 68 C 148 105 142 165 118 190 C 125 145 114 95 104 75 Z"
          fill="url(#rashiHair)"
        />

        {/* Body / Sweater */}
        <path
          d="M 50 130 C 50 115 110 115 110 130 L 120 200 C 120 210 40 210 40 200 Z"
          fill="url(#rashiSweater)"
        />
        {/* Cute Ribbon / Collar */}
        <path
          d="M 64 126 C 72 134 88 134 96 126"
          stroke="#822038"
          strokeWidth="3"
          fill="none"
        />
        <circle cx="80" cy="132" r="3.5" fill="#ff285e" />

        {/* Arms */}
        {state === 'reaching' ? (
          <path
            d="M 58 135 C 35 140 15 130 2 132"
            stroke="url(#rashiSweater)"
            strokeWidth="16"
            strokeLinecap="round"
            fill="none"
          />
        ) : (
          <>
            <path
              d="M 48 135 C 38 155 42 180 50 190"
              stroke="url(#rashiSweater)"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 112 135 C 122 155 118 180 110 190"
              stroke="url(#rashiSweater)"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
            />
          </>
        )}

        {/* Hands */}
        {state === 'reaching' && (
          <circle cx="2" cy="132" r="7" fill="#ffd9cc" />
        )}

        {/* Neck */}
        <rect x="74" y="112" width="12" height="15" rx="5" fill="#fcd7ce" />

        {/* Head */}
        <ellipse cx="80" cy="85" rx="34" ry="36" fill="#ffe5dc" />

        {/* Cheeks Blush (Rosier when pouting / eating) */}
        <circle cx="58" cy="94" r={isPout || isEating ? 11 : 9} fill="url(#rashiBlush)" />
        <circle cx="102" cy="94" r={isPout || isEating ? 11 : 9} fill="url(#rashiBlush)" />

        {/* Puffed Hamster Cheeks for Eating */}
        {isEating && (
          <>
            <circle cx="50" cy="95" r="7" fill="#ffe5dc" />
            <circle cx="110" cy="95" r="7" fill="#ffe5dc" />
          </>
        )}

        {/* Eyes (Warm, sparkling eyes or dizzy/bonked or pout) */}
        {isBonked ? (
          <g>
            <path d="M 60 81 L 68 87 M 68 81 L 60 87" stroke="#2d1520" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M 92 81 L 100 87 M 100 81 L 92 87" stroke="#2d1520" strokeWidth="2.4" strokeLinecap="round" />
          </g>
        ) : isSparkle ? (
          <g>
            <path d="M 59 85 Q 65 79 71 85" stroke="#2d1520" strokeWidth="2.6" strokeLinecap="round" fill="none" />
            <path d="M 91 85 Q 97 79 103 85" stroke="#2d1520" strokeWidth="2.6" strokeLinecap="round" fill="none" />
          </g>
        ) : isPout ? (
          <g>
            <ellipse cx="64" cy="84" rx="4" ry="5.5" fill="#2d1520" />
            <circle cx="63" cy="82" r="1.5" fill="#ffffff" />
            <ellipse cx="96" cy="84" rx="4" ry="5.5" fill="#2d1520" />
            <circle cx="95" cy="82" r="1.5" fill="#ffffff" />
          </g>
        ) : (
          <g className="animate-pulse-slow">
            <ellipse cx="64" cy="84" rx="4.5" ry="6.5" fill="#2d1520" />
            <circle cx="62" cy="81.5" r="2.2" fill="#ffffff" />
            <circle cx="65.5" cy="86.5" r="1.2" fill="#ffffff" />

            <ellipse cx="96" cy="84" rx="4.5" ry="6.5" fill="#2d1520" />
            <circle cx="94" cy="81.5" r="2.2" fill="#ffffff" />
            <circle cx="97.5" cy="86.5" r="1.2" fill="#ffffff" />
          </g>
        )}

        {/* Mouth (Smile, Pout, Eating, Bonked) */}
        {isPout ? (
          <path
            d="M 74 100 Q 80 94 86 100"
            stroke="#b82a4d"
            strokeWidth="2.6"
            strokeLinecap="round"
            fill="none"
          />
        ) : isEating ? (
          <ellipse cx="80" cy="98" rx="4" ry="3" fill="#b82a4d" />
        ) : isBonked ? (
          <path
            d="M 74 101 Q 80 96 86 101"
            stroke="#b82a4d"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />
        ) : (
          <path
            d="M 73 96 Q 80 104 87 96"
            stroke="#b82a4d"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Beautiful Hair Bangs for Rashi */}
        <path
          d="M 44 75 C 44 38 116 38 116 75 C 105 58 92 68 80 58 C 68 68 55 58 44 75 Z"
          fill="url(#rashiHair)"
        />
        <path
          d="M 44 72 C 37 88 40 115 44 125 C 47 112 50 92 52 75 Z"
          fill="url(#rashiHair)"
        />
        <path
          d="M 116 72 C 123 88 120 115 116 125 C 113 112 110 92 108 75 Z"
          fill="url(#rashiHair)"
        />

        {/* Little Rose Flower in Hair for Rashi */}
        <g transform="translate(104, 52) scale(0.9)">
          <circle cx="0" cy="0" r="5" fill="#ff4d79" />
          <circle cx="-3" cy="-3" r="3.5" fill="#ff7a9e" />
          <circle cx="3" cy="-2" r="3.5" fill="#ff7a9e" />
          <circle cx="0" cy="3" r="3.5" fill="#ff668a" />
          <circle cx="0" cy="0" r="2" fill="#ffe066" />
        </g>

        {/* Bonked Spinning Stars on top of head */}
        {isBonked && (
          <g>
            <text x="68" y="38" fontSize="16" fill="#f5cb68" className="animate-spin" style={{ transformOrigin: '80px 38px' }}>
              ✦
            </text>
            <text x="86" y="38" fontSize="16" fill="#ff7a9e">
              ✨
            </text>
          </g>
        )}
      </svg>
      {showLabel && (
        <div className="text-center mt-1.5 sm:mt-2">
          <span className="font-serif text-[10px] sm:text-xs md:text-sm tracking-widest text-universe-blush uppercase bg-universe-darkBurgundy/80 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-universe-wine/50">
            Rashi
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * The Hug Animation: Shivi & Rashi embracing warmly with glowing heart aura!
 */
export function CoupleHugAnimation({ className = '' }) {
  return (
    <div className={`relative flex flex-col items-center justify-center select-none px-2 ${className}`}>
      {/* Radiant Glowing Aura */}
      <div className="absolute w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-universe-crimson/25 blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute w-36 sm:w-48 h-36 sm:h-48 rounded-full bg-universe-blush/20 blur-xl pointer-events-none" />

      {/* Floating Hearts Array */}
      <div className="absolute -top-8 sm:-top-12 flex gap-3 sm:gap-4 text-universe-blush animate-bounce pointer-events-none">
        <span className="text-xl sm:text-2xl animate-pulse">♡</span>
        <span className="text-2xl sm:text-3xl text-universe-glowingRed">♥</span>
        <span className="text-xl sm:text-2xl animate-pulse delay-100">♡</span>
      </div>

      <svg
        viewBox="0 0 240 220"
        className="w-56 sm:w-64 md:w-80 max-w-full h-auto drop-shadow-[0_15px_40px_rgba(255,40,94,0.4)] animate-float"
      >
        <defs>
          <linearGradient id="hugShiviHair" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1f1118" />
            <stop offset="100%" stopColor="#0a0508" />
          </linearGradient>
          <linearGradient id="hugRashiHair" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2c1720" />
            <stop offset="100%" stopColor="#12070d" />
          </linearGradient>
          <linearGradient id="hugSweaterLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5c152a" />
            <stop offset="100%" stopColor="#300a15" />
          </linearGradient>
          <linearGradient id="hugSweaterRight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8b4be" />
            <stop offset="100%" stopColor="#c78696" />
          </linearGradient>
        </defs>

        {/* Back Hair */}
        <path d="M 60 70 C 35 110 40 170 65 190 Z" fill="url(#hugShiviHair)" />
        <path d="M 180 70 C 205 110 200 170 175 190 Z" fill="url(#hugRashiHair)" />

        {/* Bodies Leaning In */}
        <path d="M 65 130 C 70 115 125 120 120 190 L 70 195 Z" fill="url(#hugSweaterLeft)" />
        <path d="M 175 130 C 170 115 115 120 120 190 L 170 195 Z" fill="url(#hugSweaterRight)" />

        {/* Heads Snuggled Together */}
        <ellipse cx="98" cy="85" rx="30" ry="32" fill="#ffe5dc" transform="rotate(8 98 85)" />
        <ellipse cx="142" cy="85" rx="30" ry="32" fill="#ffe5dc" transform="rotate(-8 142 85)" />

        {/* Hair Over Heads */}
        <path d="M 72 75 C 72 45 120 50 118 78 C 110 65 95 62 82 72 Z" fill="url(#hugShiviHair)" />
        <path d="M 168 75 C 168 45 120 50 122 78 C 130 65 145 62 158 72 Z" fill="url(#hugRashiHair)" />

        {/* Content Closed Happy Eyes (^_^) */}
        <path d="M 85 86 Q 91 80 97 86" stroke="#2d1520" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M 143 86 Q 149 80 155 86" stroke="#2d1520" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Big Sweet Blushes */}
        <circle cx="86" cy="94" r="8" fill="#ff6b8b" opacity="0.6" />
        <circle cx="154" cy="94" r="8" fill="#ff6b8b" opacity="0.6" />

        {/* Sweet Smiling Mouths */}
        <path d="M 94 98 Q 98 102 102 98" stroke="#993d56" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M 138 98 Q 142 102 146 98" stroke="#b82a4d" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Embracing Arms (Wrapping Around Each Other) */}
        <path
          d="M 85 130 C 110 135 150 145 168 152"
          stroke="url(#hugSweaterLeft)"
          strokeWidth="16"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="168" cy="152" r="8" fill="#ffd9cc" />

        <path
          d="M 155 130 C 130 135 90 145 72 152"
          stroke="url(#hugSweaterRight)"
          strokeWidth="16"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="72" cy="152" r="8" fill="#ffd9cc" />

        {/* Glowing Red Thread of Fate wrapped gently around their wrists */}
        <path
          d="M 68 150 C 90 170 150 170 172 150"
          stroke="#ff285e"
          strokeWidth="3.5"
          strokeLinecap="round"
          filter="drop-shadow(0 0 8px #ff285e)"
          fill="none"
        />
        <circle cx="120" cy="165" r="4" fill="#ffffff" filter="drop-shadow(0 0 6px #ff285e)" />

        {/* Shivi's Star & Rashi's Rose */}
        <polygon points="76,56 78,59 82,60 79,63 80,67 76,65 72,67 73,63 70,60 74,59" fill="#f5cb68" />
        <g transform="translate(164, 54) scale(0.8)">
          <circle cx="0" cy="0" r="4.5" fill="#ff4d79" />
          <circle cx="0" cy="0" r="2" fill="#ffe066" />
        </g>
      </svg>

      <div className="mt-3 sm:mt-4 flex items-center justify-center text-center px-2">
        <span className="font-handwritten text-lg sm:text-2xl md:text-3xl text-universe-blush">
          Shivi & Rashi — Wrapped in each other's warmth ♡
        </span>
      </div>
    </div>
  );
}
