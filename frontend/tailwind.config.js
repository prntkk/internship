/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        twitter: {
          blue: '#1DA1F2',
          dark: '#14171A',
          light: '#F7F9FA'
        }
      }
    },
  },
  plugins: [],
} 