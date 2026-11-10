import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
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
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        navy: {
          900: '#060e1a',
          800: '#0a1628',
          700: '#0d1f3c',
          600: '#112540',
        },
        cyan: {
          DEFAULT: '#00d4ff',
          dim: 'rgba(0,212,255,0.15)',
        },
        gold: {
          DEFAULT: '#f0c040',
          dim: 'rgba(240,192,64,0.15)',
        },
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        playfair: ['Playfair Display', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        'cyan-glow': '0 0 20px rgba(0,212,255,0.25)',
        'gold-glow': '0 0 20px rgba(240,192,64,0.25)',
        'card-navy': '0 4px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
