import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const semanticColor = (name: string) => `rgb(var(--color-${name}) / <alpha-value>)`

export default {
  content: ['./*.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: semanticColor('canvas'),
        surface: semanticColor('surface'),
        'surface-subtle': semanticColor('surface-subtle'),
        content: semanticColor('content'),
        'content-muted': semanticColor('content-muted'),
        border: semanticColor('border'),
        brand: {
          ink: '#1D252D',
          orange: {
            DEFAULT: '#FF5200',
            hover: '#E64900',
            soft: semanticColor('brand-orange-soft'),
          },
        },
        feedback: {
          focus: '#19BFD3',
          success: '#22C55E',
          danger: '#E5484D',
        },
      },
      borderColor: {
        DEFAULT: semanticColor('border'),
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        ':root': {
          '--color-canvas': '247 248 252',
          '--color-surface': '255 255 255',
          '--color-surface-subtle': '241 243 247',
          '--color-content': '17 24 39',
          '--color-content-muted': '100 116 139',
          '--color-border': '220 226 234',
          '--color-brand-orange-soft': '255 240 232',
          colorScheme: 'light',
        },
        '.dark': {
          '--color-canvas': '11 16 32',
          '--color-surface': '20 27 45',
          '--color-surface-subtle': '27 36 56',
          '--color-content': '248 250 252',
          '--color-content-muted': '148 163 184',
          '--color-border': '42 53 77',
          '--color-brand-orange-soft': '58 29 24',
          colorScheme: 'dark',
        },
      })
    }),
  ],
} satisfies Config
