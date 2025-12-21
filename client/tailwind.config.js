/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        price: ['CashFont'],
        costco: ['CostcoFont'],
        serif: ['"Times New Roman"', 'Times', 'serif'],
      },
      screens: {
        'discord': '400px',
      },
    },
  },
  plugins: [],
}

