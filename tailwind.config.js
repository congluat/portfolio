/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.dev.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // --- console style -------------------------------------------------
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

        // --- editorial style -----------------------------------------------
        paper: {
          DEFAULT: '#f4f1e8',
          card: '#ebe6d9',
          deep: '#e0dacb',
        },
        graphite: {
          DEFAULT: '#141312',
          dim: '#4d4842',
          faint: '#918a80',
        },
        vermilion: '#e0332a',

        // --- bento style ---------------------------------------------------
        bento: {
          bg: '#f2f2f5',
          tile: '#ffffff',
          sunk: '#e7e7ec',
          line: '#dcdce3',
          ink: '#16161a',
          dim: '#5f5f6b',
          faint: '#9797a3',
        },
        pop: {
          blue: '#2f6bff',
          teal: '#00b8a9',
          coral: '#ff5a5f',
          plum: '#7c5cff',
          sun: '#ffb400',
        },

        // --- blueprint style -----------------------------------------------
        bp: {
          bg: '#0a2340',
          deep: '#071a30',
          panel: '#0e2c4e',
          line: '#1d4670',
          grid: '#12395f',
        },
        draft: {
          DEFAULT: '#dce9f5',
          dim: '#8fb2d1',
          faint: '#5b83a8',
          mark: '#ffcf5c',
        },

        // --- ide style -----------------------------------------------------
        ide: {
          bg: '#1e1e2e',
          side: '#181825',
          crust: '#11111b',
          raised: '#313244',
          line: '#45475a',
        },
        syntax: {
          text: '#cdd6f4',
          dim: '#a6adc8',
          faint: '#6c7086',
          blue: '#89b4fa',
          green: '#a6e3a1',
          yellow: '#f9e2af',
          red: '#f38ba8',
          mauve: '#cba6f7',
          peach: '#fab387',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        brutal: '-0.045em',
      },
      animation: {
        blink: 'blink 1.1s step-end infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        marquee: 'marquee 26s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.45', transform: 'scale(0.82)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
