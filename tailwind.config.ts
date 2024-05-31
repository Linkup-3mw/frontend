import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        mb: '360px',
      },
      colors: {
        'main-black': '#171717',
        'main-blue': '#97BAFE',
        'blue-50': '#E4EEFF',
        'blue-100': '#BFD4FF',
        'blue-400': '#688AF2',
        'blue-600': '#6268D9',
        'main-yellow': '#FAEC23',
        'yellow-200': 'FCF697',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
export default config;
