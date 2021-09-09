const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        spinner: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
      },
      animation: {
        spinner: 'spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
      },
      fontSize: {
        9: '9px',
        10: '10px',
        12: '12px',
        13: '13px',
        14: '14px',
        16: '16px',
        18: '18px',
        19: '19px',
        20: '20px',
        21: '21px',
        22: '22px',
        23: '23px',
        30: '30px',
        45: '45px',
        70: '70px',
      },
      width: {
        max: 'max-content',
      },
      height: {
        max: 'max-content',
      },
    },
    colors: {
      white: '#fff',
      black: '#171717',
      green: '#459d35',
      lightred: '#EB5757',
      red: '#D50102',
      lightgray: '#ADADAD',
      mediumgray: '#6A6A6A',
      altmediumgray: '#2A2626',
      gray: '#B8B8B8',
      darkgray: '#303030',
      altdarkgray: '#333131',
      transparent: 'transparent',
    },
    screens: {
      se: { max: '321px' },
      mob: { max: '767px' },
      device: { max: '1169px' },
      tab: { min: '768px', max: '1169px' },
      tabl: { min: '1024px', max: '1169px' },
      tabs: { min: '768px', max: '1023px' },
      hd: { min: '1170px', max: '1365px' },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.med': {
          fontFamily: 'Rubik, sans-serif',
          fontWeight: 500,
          fontStyle: 'normal',
        },
        '.reg': {
          fontFamily: 'Rubik, sans-serif',
          fontWeight: 400,
          fontStyle: 'normal',
        },
        '.roboto': {
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 500,
          fontStyle: 'normal',
        },
        '.overflow-wrap': {
          overflowWrap: 'normal',
        },
        '.back-none': {
          background: 'none',
        },
        '.tap-none': {
          WebkitTapHighlightColor: 'transparent',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    }),
  ],
};