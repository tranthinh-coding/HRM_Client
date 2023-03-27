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
        primary: 'rgb(25,91,255)',
        success: 'rgb(70,201,58)',
        danger: 'rgb(255,71,87)',
        warn: 'rgb(255,186,0)',
        dark: 'rgb(30,30,30)',
        light: 'rgb(244,247,248)',
        'theme-bg': '#f4f7f8',
        'theme-bg2': '#eef2f5',
        'theme-color': '#2c3e50',
        'theme-layout': '#fff',
      },
    },
  },
  plugins: [],
}
