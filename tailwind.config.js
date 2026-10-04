/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        universe: {
          black: '#070306',
          darkBurgundy: '#14050d',
          wine: '#3a0e1b',
          deepWine: '#250812',
          crimson: '#c21e42',
          glowingRed: '#ff285e',
          blush: '#f5b8c6',
          dustyPink: '#d48398',
          cream: '#fcf8f5',
          lavender: '#d8cbe4',
          gold: '#f5cb68',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        handwritten: ['"Caveat"', 'cursive'],
        display: ['"Cinzel"', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 2s infinite',
        'spin-slow': 'spin 18s linear infinite',
        'heartbeat': 'heartbeat 1.8s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.12)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.15)' },
          '70%': { transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      boxShadow: {
        'glow-red': '0 0 25px rgba(255, 40, 94, 0.45)',
        'glow-wine': '0 0 35px rgba(194, 30, 66, 0.35)',
        'glow-blush': '0 0 25px rgba(245, 184, 198, 0.3)',
        'glow-gold': '0 0 25px rgba(245, 203, 104, 0.4)',
      }
    },
  },
  plugins: [],
}
