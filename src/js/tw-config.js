// Tailwind config extracted from inline for organization
window.tailwind = window.tailwind || {};
window.tailwind.config = {
  theme: {
    extend: {
      colors: {
        bmw: {
          gray01: '#F6F6F6',
          gray03: '#4D4D4D',
        },
        divider: '#BBBBBB',
        inactive: '#A0A4A8',
        fieldBorder: '#E8E8E8',
        primaryBlue: '#1C69D4',
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a'
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1f2937',
          900: '#0f172a'
        }
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Ubuntu", "Cantarell", "Noto Sans", "Helvetica Neue", "Arial", "sans-serif"],
        bmw: ["BMWTypeNext Pro", "Poppins", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"]
      },
      boxShadow: {
        header: '0 1px 0 0 rgba(0,0,0,0.06)'
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        scaleIn: { '0%': { transform: 'scale(.96)', opacity: 0 }, '100%': { transform: 'scale(1)', opacity: 1 } }
      },
      animation: {
        fadeIn: 'fadeIn .35s ease-out',
        scaleIn: 'scaleIn .25s ease-out'
      }
    }
  }
};


