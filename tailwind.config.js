const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  purge: [`${__dirname}/src/**/*.{js,jsx,ts,tsx}`],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        f1red: '#E10600',
        ...colors,
      },
      fontFamily: {
        yrsa: ['Yrsa', 'ui-serif', 'serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(({ addUtilities, e, theme }) => {
      const themeColors = theme('colors');

      const decorationColors = Object.keys(themeColors).reduce((acc, key) => {
        if (typeof themeColors[key] === 'string') {
          return {
            ...acc,
            [`.decoration-${e(key)}`]: {
              'text-decoration-color': themeColors[key],
            },
          };
        }

        const variants = Object.keys(themeColors[key]);

        return {
          ...acc,
          ...variants.reduce(
            (a, variant) => ({
              ...a,
              [`.decoration-${e(key)}-${variant}`]: {
                'text-decoration-color': themeColors[key][variant],
              },
            }),
            {}
          ),
        };
      }, {});

      addUtilities(decorationColors, ['group-hover']);
    }),
  ],
};
