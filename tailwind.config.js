/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', 'sans-serif'],
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        syne: ['Syne', 'sans-serif'],
      },
      colors: {
        surface: {
          DEFAULT: '#141414',
          1: '#1a1a1a',
          2: '#202020',
          3: '#2a2a2a',
        },
        primary: {
          DEFAULT: '#22c55e',
          50: '#f0fdf4',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
        },
        gold: {
          DEFAULT: '#f59e0b',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
