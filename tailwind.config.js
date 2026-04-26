/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(148, 163, 184, 0.08), 0 24px 80px rgba(2, 6, 23, 0.55)',
      },
      colors: {
        accent: '#22d3ee',
      },
      backgroundImage: {
        grid: 'radial-gradient(circle at center, rgba(148, 163, 184, 0.12) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
