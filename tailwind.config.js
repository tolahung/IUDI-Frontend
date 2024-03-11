/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage:{
        'bg-card': "url('/src/images/background.jpg')"
      }
    },
  },
  plugins: [],
}

