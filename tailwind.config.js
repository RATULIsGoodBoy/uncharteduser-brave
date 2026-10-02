/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          950: '#0a0a0f',
          900: '#111118',
          800: '#1a1a24',
          700: '#242430',
        },
        accent: {
          DEFAULT: '#7c83fd',
          dim: '#4a52c4',
          glow: 'rgba(124,131,253,0.15)',
        },
        owner: {
          DEFAULT: '#00d4aa',
          dim: '#008a6e',
          glow: 'rgba(0,212,170,0.15)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(124,131,253,0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(124,131,253,0.6)' },
        },
      },
    },
  },
  plugins: [],
}
