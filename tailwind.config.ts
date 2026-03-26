import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'arc-bg': '#080B10',
        'arc-surface': '#0F1318',
        'arc-panel': '#141C24',
        'arc-border': '#1E2C3A',
        'arc-orange': '#E8632A',
        'arc-amber': '#D4A017',
        'arc-blue': '#3A82C4',
        'arc-teal': '#28B89A',
        'arc-red': '#C43A3A',
        'arc-text': '#C8D8E4',
        'arc-muted': '#5C7080',
        'contigo-orange': '#E8632A',
        'contigo-amber': '#D4A017',
        'contigo-blue': '#3A82C4',
        'contigo-teal': '#28B89A',
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
