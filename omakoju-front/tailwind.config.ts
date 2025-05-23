/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        newsreader: ["var(--font-newsreader)"],
        mono: ["var(--font-roboto-mono)"],
      },
      colors: {
        bgGreen: "#224437",
        bgGreenHover: "#1a362b",
        bgBeige: "#E8DAC0",
      },
    },
  },
  plugins: [],
};
