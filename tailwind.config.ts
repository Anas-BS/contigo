import type { Config } from 'tailwindcss';

/**
 * Contigo design tokens.
 * Warm paper surfaces, ink typography, one signature colour (ember, from the logo)
 * and a small set of functional colours. See DESIGN_SYSTEM.md.
 */
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // Class names are also produced by helpers in lib/ (e.g. heatmap tones).
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: '#1C1B18',
          900: '#1C1B18',
          800: '#2B2925',
          700: '#45423B',
          600: '#5A564D',
          500: '#6B665C',
        },
        paper: {
          DEFAULT: '#F4F0E8',
          raised: '#FBFAF6',
          sunken: '#ECE6DA',
        },
        line: {
          DEFAULT: '#E0D9CB',
          strong: '#C9C0AE',
          // Form control boundaries: at least 3:1 on paper and raised surfaces (WCAG 1.4.11).
          control: '#8F8778',
        },
        ember: {
          50: '#FDF1EB',
          100: '#FADDCF',
          300: '#F6A07D',
          500: '#F97B4F',
          600: '#E0612F',
          700: '#B4441C',
          800: '#8C3414',
        },
        positive: { DEFAULT: '#2D6A4F', soft: '#E1EEE5' },
        caution: { DEFAULT: '#85590A', soft: '#F5EACB' },
        critical: { DEFAULT: '#A3261B', soft: '#F6E0DB' },
        info: { DEFAULT: '#2B4C7E', soft: '#E2E8F2' },
        heat: {
          green: '#CCE3D1',
          amber: '#F1E0A9',
          orange: '#F4C9AC',
          red: '#EBB1A8',
        },
        viz: {
          ink: '#1C1B18',
          ember: '#E0612F',
          teal: '#2F6F68',
          ochre: '#B7832B',
          slate: '#7A8699',
          grid: '#E0D9CB',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.02em' }],
        'display-sm': ['1.75rem', { lineHeight: '2.125rem', letterSpacing: '-0.01em' }],
        'display-md': ['2.25rem', { lineHeight: '2.625rem', letterSpacing: '-0.015em' }],
        'display-lg': ['3rem', { lineHeight: '3.25rem', letterSpacing: '-0.02em' }],
        'display-xl': ['4rem', { lineHeight: '4.125rem', letterSpacing: '-0.025em' }],
      },
      borderRadius: {
        none: '0',
        sm: '3px',
        DEFAULT: '6px',
        md: '6px',
        lg: '10px',
        full: '9999px',
      },
      boxShadow: {
        none: 'none',
        hairline: '0 1px 0 rgba(28,27,24,0.04)',
        overlay: '0 1px 0 rgba(28,27,24,0.04), 0 16px 40px -12px rgba(28,27,24,0.28)',
      },
      maxWidth: {
        prose: '62ch',
        page: '1200px',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
      },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'slide-in-right': { from: { transform: 'translateX(16px)', opacity: '0' }, to: { transform: 'none', opacity: '1' } },
        'rise-in': { from: { transform: 'translateY(6px)', opacity: '0' }, to: { transform: 'none', opacity: '1' } },
        spin: { to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        'fade-in': 'fade-in 160ms cubic-bezier(0.2,0,0,1)',
        'slide-in-right': 'slide-in-right 200ms cubic-bezier(0.2,0,0,1)',
        'rise-in': 'rise-in 180ms cubic-bezier(0.2,0,0,1)',
        spin: 'spin 700ms linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
