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
        // Nature Palette
        primary: "#4F772D",   // Fern Green (Main buttons/links)
        secondary: "#A36628", // Terracotta (Accents)
        cream: "#FDFCF8",     // Warm Background (Not harsh white)
        stone: "#F2F0E9",     // Light Beige (Cards/Sections)
        charcoal: "#2C3333",  // Soft Black (Text)
      },
      fontFamily: {
        serif: ['var(--font-playfair)'], // For Headings
        sans: ['var(--font-lato)'],      // For Body text
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Ensure this is installed!
  ],
};
export default config;