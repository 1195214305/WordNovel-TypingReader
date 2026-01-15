/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef6ee',
          100: '#fde9d7',
          200: '#fad0ae',
          300: '#f7af7a',
          400: '#f38744',
          500: '#f06820',
          600: '#e14d16',
          700: '#ba3814',
          800: '#942e18',
          900: '#782816',
        },
        secondary: {
          50: '#f5f7fa',
          100: '#eaeef4',
          200: '#d0dae6',
          300: '#a8bcd1',
          400: '#7998b7',
          500: '#587ba0',
          600: '#446285',
          700: '#38506c',
          800: '#31445b',
          900: '#2d3b4d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
}
