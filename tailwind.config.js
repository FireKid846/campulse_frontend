/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // New Theme Palette
        background: '#f5f5f5', // Light Grey
        surface: '#ffffff',    // Pure White
        primary: '#002e21',    // Dark Green (Text)
        secondary: '#4b5563',  // Gray-600 (Secondary Text)
        accent: '#f9dc5c',     // Yellow
        highlight: '#bfd8fd',  // Light Blue
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
