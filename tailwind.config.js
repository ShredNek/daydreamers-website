/** @type {import('tailwindcss').Config} */

const customColors = {
  "daydreamer-orange": "#f1b83f",
  "daydreamer-blue": "#4fdbf0",
  "daydreamer-orange-dark": "#806120",
  "daydreamer-orange-inactive": "#968b72",
  "daydreamer-blue-dark": "#205b63",
  "daydreamer-blue-inactive": "#83a2a6",
};

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: customColors,
      ringColor: customColors,
      borderColor: customColors,
      textColor: customColors,
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
