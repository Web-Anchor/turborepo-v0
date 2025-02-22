import type { Config } from 'tailwindcss';
import sharedConfig from '@repo/tailwind-config';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}', // Include UI package for shared styles
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'dark-gray': '#111827',
        abyss: '#070F2B',
        indigo: '#1B1A55',
        steel: '#535C91',
        lavender: '#9290C3',
      },
    },
  },
  plugins: [],
  presets: [sharedConfig],
} satisfies Config;
