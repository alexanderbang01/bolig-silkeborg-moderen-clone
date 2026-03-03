/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f3f7f3',
          100: '#e3ede3',
          200: '#c7dcc8',
          300: '#9dc29f',
          400: '#6fa372',
          500: '#4d854f',
          600: '#3a693c',
          700: '#2f5431',
          800: '#284429',
          900: '#223825',
        },
        lake: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7dc8fb',
          400: '#38aaf5',
          500: '#0e90e6',
          600: '#0271c4',
          700: '#035a9f',
          800: '#074d83',
          900: '#0c416d',
        },
        sand: {
          50: '#fdf8f0',
          100: '#faeedd',
          200: '#f4dcba',
          300: '#ecc38d',
          400: '#e2a35e',
          500: '#d9883c',
          600: '#ca6f31',
          700: '#a8572a',
          800: '#884728',
          900: '#6e3b23',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Fraunces', 'serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        card: '0 2px 16px 0 rgba(34,56,37,0.07)',
        'card-hover': '0 8px 32px 0 rgba(34,56,37,0.13)',
      },
    },
  },
  plugins: [],
};