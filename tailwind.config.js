/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: '0.5rem', 
      },
      borderWidth: {
        '6': '6px', 
        '8': '8px',
      },
    },
  },
  plugins: [],
};
