/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B5BDB',
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#3B5BDB',
          600: '#3046C5',
          700: '#2838A8',
          800: '#1E2B8A',
          900: '#1A237E',
        },
        accent: {
          DEFAULT: '#00C896',
          50: '#ECFDF8',
          100: '#D1FAF0',
          200: '#A7F3E0',
          300: '#6EE7CE',
          400: '#34D5B5',
          500: '#00C896',
          600: '#00A77D',
          700: '#008664',
          800: '#00654B',
          900: '#004D39',
        },
        background: '#FFFFFF',
        surface: '#F9FAFB',
        textDark: '#1A1A1A',
        textLight: '#6B7280',
        border: '#E5E7EB',
        success: '#22C55E',
        error: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
