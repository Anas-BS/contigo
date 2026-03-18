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
        'contigo-orange': '#F97B4F',
        'contigo-amber': '#F5C842',
        'contigo-blue': '#2E6FDF',
        'contigo-teal': '#3ECFAC',
      },
    },
  },
  plugins: [],
};

export default config;
