import type { Config } from 'tailwindcss';
import sharedConfig from '@repo/tailwind-config';

// This file is required for Tailwind CSS to work properly in Next.js.
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
