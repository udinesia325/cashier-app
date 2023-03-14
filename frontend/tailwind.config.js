/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    fontFamily: {
      sans: ['Quicksand', 'sans-serif'],
    },
    extend: {
      colors: {
        "primary": "#0ea5e9"
      }
    },
  },
  plugins: [],
}
