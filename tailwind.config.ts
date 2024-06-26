import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import { PluginUtils } from 'tailwindcss/types/config'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        // custom colors
        link: 'hsl(var(--link))',
        date: 'hsl(var(--date))',
      },

      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        fadeInUp: 'fadeInUp 0.35s linear',
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },

      maxWidth: {
        '1/2': '50%',
      },

      zIndex: {
        '100': '100',
      },

      // https://tailwindcss.com/docs/typography-plugin#customizing-the-css
      typography: (theme: PluginUtils['theme']) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--mdx-body)', // theme('colors.foreground'),
            '--tw-prose-headings': theme('colors.foreground'),
            // '--tw-prose-lead': theme('colors.pink[700]'),
            '--tw-prose-links': 'var(--mdx-body)',
            '--tw-prose-bold': 'var(--mdx-body)',
            '--tw-prose-counters': 'var(--mdx-body)',
            // '--tw-prose-bullets': theme('colors.pink[400]'),
            '--tw-prose-hr': theme('colors.border'),
            '--tw-prose-quotes': 'var(--mdx-body)',
            '--tw-prose-quote-borders': theme('colors.border'),
            '--tw-prose-captions': 'var(--mdx-body)',
            '--tw-prose-code': 'var(--mdx-body)',
            '--tw-prose-pre-code': 'var(--mdx-body)',
            // '--tw-prose-pre-bg': theme('colors.pink[900]'),
            '--tw-prose-th-borders': theme('colors.border'),
            '--tw-prose-td-borders': theme('colors.border'),
            // https://tailwindcss.com/docs/typography-plugin#adapting-to-dark-mode
            // '--tw-prose-invert-body': theme('colors.pink[200]'),
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
}
export default config
