/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF6F0',
          200: '#F4EEE5',
          300: '#EADFCF',
          400: '#D7CBC0',
          500: '#C7B7A8',
        },
        navy: {
          900: '#0F172A',
          950: '#0A0F1D',
        },
        primary: {
          dark: '#0C111F',
          blue: '#2A3B5C',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        script: ['"Alex Brush"', '"Great Vibes"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

