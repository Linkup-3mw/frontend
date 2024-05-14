import localFont from 'next/font/local';

export const suit = localFont({
  src: [
    {
      path: '../assets/fonts/SUIT-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/SUIT-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/SUIT-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/SUIT-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
});
