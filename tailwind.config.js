/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#12985a',   // Ana genel renk (Yeşil tonu)
        secondary: '#103e6a', // Buton rengi (Mavi tonu)
      },
    },
  },
  plugins: [],
};


