/** @type {import('tailwindcss').Config} */

const { addDynamicIconSelectors } = require('@iconify/tailwind');
const {
  iconsPlugin,
  getIconCollections,
} = require('@egoist/tailwindcss-icons');

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./src/*.{html,ts}"
  ],
  theme: {
    extend: {
      screens:{
        '3xl': '1600px',
        '4xl': '1800px'
      }
    },
  },
  plugins: [
    addDynamicIconSelectors(),
    iconsPlugin({
      collections: getIconCollections(['material-symbols', 'ic']),
    }),
  ],
}

