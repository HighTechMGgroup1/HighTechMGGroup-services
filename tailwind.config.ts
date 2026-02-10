import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B1F3A",   // Navy Blue
        accent: "#22C55E",    // Light Green
      },
    },
  },
  plugins: [],
};

export default config;
