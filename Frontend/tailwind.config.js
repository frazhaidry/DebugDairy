/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode
        background: 'var(--background)', // Reference CSS variable
        text: 'var(--text)',
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
        },
        secondary: 'var(--secondary)',
        border: 'var(--border)',
        card: 'var(--card-bg)',
        glow: 'var(--glow)',
        // Dark mode (optional, for explicit dark utilities)
        'dark-background': 'var(--background)',
        'dark-text': 'var(--text)',
        'dark-primary': {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
        },
        'dark-secondary': 'var(--secondary)',
        'dark-border': 'var(--border)',
        'dark-card': 'var(--card-bg)',
        'dark-glow': 'var(--glow)',
      },
    },
  },
  plugins: [],
};