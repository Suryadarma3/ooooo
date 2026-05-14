import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: '#050508',
          dark: '#0a0a12',
          panel: '#0f0f1a',
          purple: {
            DEFAULT: '#711c91',
            light: '#d14eea',
            neon: '#ea00d9',
            glow: '#cc11f0',
          },
          cyan: {
            DEFAULT: '#0abdc6',
            light: '#7df9ff',
            glow: '#00f0ff',
          },
          blue: {
            DEFAULT: '#133e7c',
            electric: '#00d4ff',
            deep: '#091833',
          },
          pink: '#ff008d',
          magenta: '#6300ff',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'typing': 'typing 1.5s steps(20, end) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', filter: 'blur(40px)' },
          '50%': { opacity: '0.8', filter: 'blur(60px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        typing: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #050508 0%, #0a0a12 50%, #091833 100%)',
        'neon-glow': 'radial-gradient(circle, rgba(113,28,145,0.3) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}

export default config
