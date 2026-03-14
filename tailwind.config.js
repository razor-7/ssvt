/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1280px',
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: 'var(--color-navy)',
          light: 'var(--color-navy-light)',
          dark: 'var(--color-navy-dark)',
        },
        orange: {
          accent: 'var(--color-orange-accent)',
          light: 'var(--color-orange-light)',
        },
        brand: {
          bg: 'var(--color-bg)',
          surface: 'var(--color-surface)',
          text: 'var(--color-text)',
          muted: 'var(--color-text-muted)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        'section': 'var(--spacing-section)',
        'container': 'var(--spacing-container)',
      },
      animation: {
        'fade-in': 'fadeIn var(--animation-duration) var(--animation-easing) forwards',
        'slide-up': 'slideUp var(--animation-duration) var(--animation-easing) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scrollChevron: {
          '0%':   { opacity: '0', transform: 'translateY(-6px)' },
          '40%':  { opacity: '1', transform: 'translateY(0px)'  },
          '80%':  { opacity: '0', transform: 'translateY(6px)'  },
          '100%': { opacity: '0', transform: 'translateY(6px)'  },
        },
        scrollPulse: {
          '0%':   { opacity: '0.6', transform: 'scale(1)'   },
          '100%': { opacity: '0',   transform: 'scale(2.8)' },
        },
        routeLine: {
          '0%':   { transform: 'scaleY(0)', opacity: '0' },
          '30%':  { opacity: '1' },
          '100%': { transform: 'scaleY(1)', opacity: '0.5' },
        },
      },
      transitionDuration: {
        DEFAULT: 'var(--transition-duration)',
      },
    },
  },
  plugins: [],
};
