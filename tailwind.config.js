/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.vue',
    './src/layouts/**/*.vue',
    './src/views/**/*.vue',
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        primary: 'rgba(var(--color-primary), <alpha-value>)',
        success: 'rgba(var(--color-success), <alpha-value>)',
        danger: 'rgba(var(--color-danger), <alpha-value>)',
        warn: 'rgba(var(--color-warn), <alpha-value>)',
        dark: 'rgba(var(--color-dark), <alpha-value>)',
        light: 'rgba(var(--color-light), <alpha-value>)',
        'theme-bg': 'rgba(var(--color-theme-bg), <alpha-value>)',
        'theme-bg2': 'rgba(var(--color-theme-bg2), <alpha-value>)',
        'theme-color': 'rgba(var(--color-theme-color), <alpha-value>)',
        'theme-layout': 'rgba(var(--color-theme-layout), <alpha-value>)',
      },
    },
  },
  plugins: [],
}
