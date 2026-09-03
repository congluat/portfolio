/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.dev.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        console: {
          bg: '#070910',
          panel: '#0c1018',
          raised: '#121826',
          hover: '#161e2e',
          border: '#1c2534',
          line: '#141b28',
        },
        signal: {
          green: '#3ddc97',
          amber: '#ffb648',
          red: '#ff5f6d',
          blue: '#5aa9ff',
          violet: '#a78bfa',
        },
        ink: {
          DEFAULT: '#e6edf3',
          dim: '#8b98a5',
          faint: '#5b6b7f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      animation: {
        blink: 'blink 1.1s step-end infinite',
        sweep: 'sweep 9s linear infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        sweep: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.45', transform: 'scale(0.82)' },
        },
      },
    },
  },
  plugins: [],
}
