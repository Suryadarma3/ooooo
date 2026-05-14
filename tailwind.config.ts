import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          primary: '#09090b',
          secondary: '#0c0c0f',
          elevated: '#111114',
          card: '#161619',
          hover: '#1c1c20',
          active: '#222226',
        },
        accent: {
          DEFAULT: '#8b5cf6',
          light: '#a78bfa',
          soft: '#c4b5fd',
          muted: 'rgba(139, 92, 246, 0.12)',
          glow: 'rgba(139, 92, 246, 0.15)',
          cyan: '#06b6d4',
          'cyan-soft': 'rgba(6, 182, 212, 0.1)',
        },
        text: {
          primary: '#fafafa',
          secondary: '#a1a1aa',
          tertiary: '#71717a',
          muted: '#52525b',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.06)',
          default: 'rgba(255, 255, 255, 0.08)',
          hover: 'rgba(255, 255, 255, 0.12)',
          active: 'rgba(139, 92, 246, 0.3)',
        },
        // Legacy colors for compatibility
        cyber: {
          black: '#09090b',
          dark: '#0c0c0f',
          panel: '#111114',
          purple: {
            DEFAULT: '#8b5cf6',
            light: '#a78bfa',
            neon: '#8b5cf6',
            glow: '#8b5cf6',
          },
          cyan: {
            DEFAULT: '#06b6d4',
            light: '#67e8f9',
            glow: '#06b6d4',
          },
          blue: {
            DEFAULT: '#3b82f6',
            electric: '#06b6d4',
            deep: '#0c0c0f',
          },
          pink: '#ec4899',
          magenta: '#8b5cf6',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-left': 'slideInLeft 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
        '4xl': '1.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

export default config
