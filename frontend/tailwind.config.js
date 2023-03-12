/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        newGreen:"#0D2327",
        newPink:"#BC0780",
        newBlue:"#1F2184",
        newPurple:"#8C68CC",
        newOrange:"#F45313"
      }
    },
  },
  plugins: [],
}
