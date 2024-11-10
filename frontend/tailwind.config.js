/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Updated to include .jsx, .tsx if needed
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        edu: ['"Edu AU VIC WA NT Pre"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
  