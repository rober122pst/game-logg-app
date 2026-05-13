/** @type {import('tailwindcss').Config} */

import plugin from 'tailwindcss/plugin';
import { themeColors } from './theme.config';

const tailwindColors = Object.fromEntries(
  Object.entries(themeColors).map(([name, swatch]) => [
    name,
    {
      DEFAULT: `var(--color-${name})`,
      light: swatch.light,
      dark: swatch.dark,
    }
  ])
);

module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}', './screens/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        metropolis: ['Metropolis-Regular', 'sans-serif'],
        'metropolis-medium': ['Metropolis-Medium', 'sans-serif'],
        'metropolis-semi-bold': ['Metropolis-SemiBold', 'sans-serif'],
        'metropolis-bold': ['Metropolis-Bold', 'sans-serif'],
        'metropolis-light': ['Metropolis-Light', 'sans-serif'],
        'metropolis-black': ['Metropolis-Black', 'sans-serif']
      },
      colors: {
        raspberry: '#E0055D',
        mint: '#72B4A9',
        'cocoa-brown': '#E06B05',
        ...tailwindColors,
      }
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('dark', ':root:not([data-theme="light"]) &');
      addVariant('light', ':root[data-theme="light"] &');
    })
  ],
};
