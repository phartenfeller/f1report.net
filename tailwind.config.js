const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [`./src/**/*.{js,jsx,ts,tsx}`],
  theme: {
    extend: {
      boxShadow: {
        'muted-sm': '0px 4px 20px rgb(81 102 167 / 12%)',
        muted: '0 8px 30px rgb(81 102 167 / 24%)', // I admit it's stolen from vercel :o but customized
      },
      colors: {
        f1red: '#E10600',
      },
      fontFamily: {
        yrsa: ['Yrsa', 'ui-serif', 'serif'],
      },
      maxWidth: {
        '4k-limit': '120rem',
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: '#2563eb',
              '&:hover': {
                color: 'rgb(30, 64, 175)',
              },
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
