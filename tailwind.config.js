const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [`./src/**/*.{js,jsx,ts,tsx}`],
  theme: {
    extend: {
      boxShadow: {
        'muted-sm': '0px 4px 20px rgb(81 102 167 / 12%)',
        muted: '0 8px 30px rgb(81 102 167 / 24%)', // I admit it's stolen from vercel :o but customized
        '3d-red':
          '0px 2px 4px rgb(66 35 35 / 40%), 0px 7px 13px -3px rgb(66 35 35 / 30%), inset 0px -3px 0px rgb(161 70 70 / 50%)', // inspired by algolia :D
        '3d-gray':
          '0px 2px 4px rgb(94 78 78 / 20%), 0px 7px 13px -3px rgb(137 123 123 / 10%), inset 0px -3px 0px rgb(199 199 199) ',
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
