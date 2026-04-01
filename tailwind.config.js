/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        "primary": "#227cb3", // Azul Clínico CITTO
        "primary-container": "#e0f2fe",
        "on-primary": "#ffffff",
        "secondary": "#12567a", // Azul Escuro CITTO
        "secondary-container": "#e6f1f7",
        "on-secondary-container": "#0d2d40",
        "accent": "#ee303e", // Vermelho CITTO
        "background": "#f8fbfe",
        "surface": "#ffffff",
        "surface-variant": "#eef5fb",
        "on-surface": "#0d2d40",
        "on-surface-variant": "#3a6480",
        "outline": "#cbd5e1",
        "outline-variant": "#e2e8f0"
      },
      fontFamily: {
        "headline": ["Newsreader", "serif"],
        "body": ["Manrope", "sans-serif"],
        "label": ["Manrope", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "0.75rem",
        "xl": "1rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}
