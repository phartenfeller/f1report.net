const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: [`${__dirname}/src/**/*.{js,jsx,ts,tsx}`],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ...colors,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
