/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // The void - true darkness
        void: '#050505',
        'void-light': '#0a0a0a',

        // Stone - cold monastery walls
        stone: '#121212',
        'stone-light': '#1a1a1a',
        'stone-lighter': '#222222',

        // Parchment - aged paper tones
        parchment: '#d4cfc4',
        'parchment-dim': '#8a8580',
        'parchment-dark': '#5a5550',

        // Candlelight - the only warmth
        candle: '#c9a227',
        'candle-dim': '#a68920',
        'candle-glow': '#e8c547',

        // Blood - for sins
        blood: '#4a1515',
        'blood-light': '#6b1f1f',

        // Incense - ethereal purple
        incense: '#2d2438',
        'incense-light': '#3d3248',
      },
      fontFamily: {
        // Display - monastic capitals
        display: ['Cinzel', 'serif'],
        // Serif - body text, elegant
        serif: ['Cormorant Garamond', 'EB Garamond', 'Georgia', 'serif'],
        // Sans - UI elements only
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.6' }],
        'base': ['1rem', { lineHeight: '1.7' }],
        'lg': ['1.125rem', { lineHeight: '1.7' }],
        'xl': ['1.25rem', { lineHeight: '1.6' }],
        '2xl': ['1.5rem', { lineHeight: '1.5' }],
        '3xl': ['1.875rem', { lineHeight: '1.4' }],
        '4xl': ['2.25rem', { lineHeight: '1.3' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
      },
      letterSpacing: {
        'widest': '0.2em',
        'ultra': '0.3em',
      },
      animation: {
        'candle': 'candle 4s ease-in-out infinite',
        'smoke': 'smoke 8s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease-out',
        'rise': 'rise 1s ease-out',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        candle: {
          '0%, 100%': { opacity: '1', filter: 'blur(0px)' },
          '25%': { opacity: '0.85', filter: 'blur(0.5px)' },
          '50%': { opacity: '0.9', filter: 'blur(0.25px)' },
          '75%': { opacity: '0.95', filter: 'blur(0.5px)' },
        },
        smoke: {
          '0%, 100%': { opacity: '0.3', transform: 'translateY(0) scale(1)' },
          '50%': { opacity: '0.15', transform: 'translateY(-10px) scale(1.1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'stone-texture': `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      },
    },
  },
  plugins: [],
}
