/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Use class strategy for dark mode
  theme: {
    extend: {
      colors: {
        // SQLPrime specific colors
        'sqlprime-highlight': 'var(--sqlprime-highlight)',
        'sqlprime-lowlight': 'var(--sqlprime-lowlight)',
        'sqlprime-neutral': 'var(--sqlprime-neutral)',
        
        // Execution plan visualization colors
        'plan-scan': 'var(--plan-scan)',
        'plan-seek': 'var(--plan-seek)',
        'plan-join': 'var(--plan-join)',
        'plan-sort': 'var(--plan-sort)',
        'plan-aggregate': 'var(--plan-aggregate)',
        
        // Primary colors
        'primary-dark': 'var(--primary-dark)',
        'primary-main': 'var(--primary-main)',
        'primary-light': 'var(--primary-light)',
        
        // Secondary colors
        'secondary-light': 'var(--secondary-light)',
        'secondary-main': 'var(--secondary-main)',
        'secondary-dark': 'var(--secondary-dark)',
        
        // Accent colors
        'success': 'var(--success)',
        'warning': 'var(--warning)',
        'error': 'var(--error)',
        'info': 'var(--info)',
        
        // Text colors
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-disabled': 'var(--text-disabled)',
        'text-inverse': 'var(--text-inverse)',
        
        // Chart colors
        'chart-personal': 'var(--chart-personal)',
        'chart-corporate': 'var(--chart-corporate)',
        'chart-investment': 'var(--chart-investment)',
        'chart-accent-1': 'var(--chart-accent-1)',
        'chart-accent-2': 'var(--chart-accent-2)',
      },
      fontFamily: {
        sans: 'var(--font-family)',
      },
      fontSize: {
        'xs': 'var(--font-size-xs)',
        'sm': 'var(--font-size-sm)',
        'base': 'var(--font-size-base)',
        'lg': 'var(--font-size-lg)',
        'xl': 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
      },
      fontWeight: {
        normal: 'var(--font-weight-normal)',
        medium: 'var(--font-weight-medium)',
        semibold: 'var(--font-weight-semibold)',
        bold: 'var(--font-weight-bold)',
      },
      lineHeight: {
        tight: 'var(--line-height-tight)',
        normal: 'var(--line-height-base)',
        loose: 'var(--line-height-loose)',
      },
      spacing: {
        '1': 'var(--space-1)',
        '2': 'var(--space-2)',
        '3': 'var(--space-3)',
        '4': 'var(--space-4)',
        '5': 'var(--space-5)',
        '6': 'var(--space-6)',
        '8': 'var(--space-8)',
        '10': 'var(--space-10)',
        '12': 'var(--space-12)',
        '16': 'var(--space-16)',
      },
      borderRadius: {
        'sm': 'var(--border-radius-sm)',
        'md': 'var(--border-radius-md)',
        'lg': 'var(--border-radius-lg)',
        'xl': 'var(--border-radius-xl)',
        '2xl': 'var(--border-radius-2xl)',
        'full': 'var(--border-radius-full)',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
      },
      screens: {
        'sm': 'var(--breakpoint-sm)',
        'md': 'var(--breakpoint-md)',
        'lg': 'var(--breakpoint-lg)',
        'xl': 'var(--breakpoint-xl)',
        '2xl': 'var(--breakpoint-2xl)',
      },
      transitionDuration: {
        'fast': 'var(--transition-fast)',
        'normal': 'var(--transition-normal)',
        'slow': 'var(--transition-slow)',
      },
      transitionTimingFunction: {
        'default': 'var(--easing-default)',
      },
    },
  },
  plugins: [],
}