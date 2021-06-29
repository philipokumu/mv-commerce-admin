const colors = require('tailwindcss/colors');

module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  darkMode: false,
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      black: colors.black,
      gray: colors.blueGray,
      primary: colors.purple,
      secondary: colors.amber,
      blue: colors.blue,
      green: colors.green,
      yellow: colors.amber,
      red: colors.red
    },
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        sourcesans: ['"Source Sans Pro"', 'sans-serif']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
