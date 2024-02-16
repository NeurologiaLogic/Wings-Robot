/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        "wings-golden":"background: linear-gradient(90deg, rgba(218,255,87,1) 0%, rgba(207,240,48,1) 53%, rgba(223,228,136,1) 100%)"
      }
    },
  },
  plugins: [],
}