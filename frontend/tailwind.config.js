/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060913',
          900: '#0a0f20',
          850: '#0e162e',
          800: '#141e3d',
          700: '#1d2b56',
          600: '#2b3f79',
        },
        indigo: {
          950: '#141432',
          900: '#1e1b4b',
          800: '#312e81',
          700: '#3730a3',
          600: '#4338ca',
          500: '#6366f1',
          400: '#818cf8',
          300: '#a5b4fc',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
