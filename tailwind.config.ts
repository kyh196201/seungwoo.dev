import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        fadeInUp: 'fadeInUp 0.35s linear',
      },

      keyframes: {
        fadeInUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },

      borderColor: {
        primary: '#dee2e6',
      },

      maxWidth: {
        '1/2': '50%',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
