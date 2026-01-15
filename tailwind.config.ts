import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#18181b', 
        },
        secondary: {
          DEFAULT: '#71717a',
        },
        accent: {
          DEFAULT: '#22c55e',
        },
        success: '#22c55e',
        danger: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6',
        neutral: {
          50: '#fafafa',
          900: '#09090b',
        },
      },
    },
  },
}
