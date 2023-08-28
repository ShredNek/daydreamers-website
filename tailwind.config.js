/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "daydreamer-orange": "#f1b83f",
        "daydreamer-blue": "#4fdbf0",
      },
      ringColor: {
        "daydreamer-orange": "#f1b83f",
        "daydreamer-blue": "#4fdbf0",
      },
    },
  },
  plugins: [],
};
