/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px) scaleY(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scaleY(1)' },
        },
      },
      animation: {
        fadeInDown: 'fadeInDown 0.3s ease-out',
      },
    },
  },
  plugins: [],
}