import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        contigo: {
          orange: "#F97B4F",
          amber: "#F5C842",
          blue: "#2E6FDF",
          teal: "#3ECFAC",
          white: "#FFF8F4",
          navy: "#1E2A3A",
          slate: "#8A9BB0",
          peach: "#FDEEE6",
          coral: "#F96B3F",
        },
      },
      fontFamily: {
        nunito: ["Nunito", "system-ui", "sans-serif"],
        inter: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Courier New", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
