import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'main-black': '#171717',
        'main-blue': '#97BAFE',
        'blue-50': '#E4EEFF',
        'blue-100': '#BFD4FF',
        'blue-200': '#97BAFE',
        'blue-300': '#769EFA',
        'blue-400': '#688AF2',
        'blue-500': '#6377E9',
        'blue-600': '#6268D9',
        'main-yellow': '#FAEC23',
        'yellow-200': '#FCF697',
        'yellow-600': '#F9D91B',
        'yellow-700': '#F9C00D',
        'gray-100': '#E7E7EC',
        'gray-200': '#D0D0D8',
        'gray-300': '#B9B9C3',
        'gray-400': '#A3A3AF',
        'gray-500': '#8D8D9B',
        'gray-700': '#646472',
        'gray-800': '#51515D',
        'main-red': '#FF513F',
        'red-cancel': '#FF4163',
        'red-danger': '#FF1000',
        'main-green': '#45AD56',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
export default config;
