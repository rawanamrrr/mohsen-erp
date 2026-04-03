import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2A2F35',
        secondary: '#C58B79',
        cream: '#F7F4EB',
        brand: '#C58B79',
      },
    },
  },
  plugins: [],
};

export default config;
