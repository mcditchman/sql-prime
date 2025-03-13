/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sqlprime-highlight': 'var(--sqlprime-highlight)',
        'sqlprime-lowlight': 'var(--sqlprime-lowlight)',
        'sqlprime-neutral': 'var(--sqlprime-neutral)',
        'plan-scan': 'var(--plan-scan)',
        'plan-seek': 'var(--plan-seek)',
        'plan-join': 'var(--plan-join)',
        'plan-sort': 'var(--plan-sort)',
        'plan-aggregate': 'var(--plan-aggregate)',
      },
    },
  },
  plugins: [],
}