/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1220',
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          800: '#151b2a',
          900: '#0B1220',
          950: '#070B14',
        },
        gold: {
          DEFAULT: '#D9A441',
          50: '#FDF8EE',
          100: '#FBF1DC',
          200: '#F7E2B8',
          300: '#F2CE8A',
          400: '#E5B254',
          500: '#D9A441',
          600: '#B88228',
          700: '#8A5D19',
          800: '#5C3C0F',
          900: '#2E1C05',
        },
        surface: {
          light: '#FFFFFF',
          'light-subtle': '#F8FAFC',
          'light-container': '#F1F5F9',
          dark: '#0B1220',
          'dark-card': '#111827',
          'dark-border': '#1E293B',
          'dark-container': '#151B2A',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'gold-sm': '0 0 0 1px #D9A441, 0 2px 8px rgba(217, 164, 65, 0.2)',
        'gold-md': '0 0 0 1px #D9A441, 0 4px 14px rgba(217, 164, 65, 0.25)',
      },
    },
  },
  plugins: [],
}
