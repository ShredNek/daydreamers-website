/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "daydreamer-orange": "#f1b83f",
        "daydreamer-blue": "#4fdbf0",
        "daydreamer-orange-dark": "#806120",
        "daydreamer-orange-inactive": "#968b72",
        "daydreamer-blue-dark": "#205b63",
        "daydreamer-blue-inactive": "#83a2a6",
      },
      ringColor: {
        "daydreamer-orange": "#f1b83f",
        "daydreamer-blue": "#4fdbf0",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
