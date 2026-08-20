/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#16324F',
        forest: '#2C6E49',
        sand: '#EFE4CB',
        sanddeep: '#E4D5AF',
        paper: '#FBF8F1',
        teal: '#2E8B9E',
        clay: '#B23A2E',
        gold: '#CE9A34',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        xl2: '18px',
      },
    },
  },
  plugins: [],
}
