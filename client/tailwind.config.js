/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tealblue': '#437381',
      },
      fontFamily:{
        'serif': ['Inria Serif', 'sans-serif'],
        'JimNightshade': ['"Jim Nightshade"', 'cursive'],
      },
    },
  },
  plugins: [],
}

