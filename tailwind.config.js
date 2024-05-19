/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'comfortaa':['comfortaa','sans-serif']
      },
      colors:{
        "primary":"#121520",
        "secondary":"#212b42",
        "action":"#23A9D5",
      },
    },
  },
  plugins: [],
};
