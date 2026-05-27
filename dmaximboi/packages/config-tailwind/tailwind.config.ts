import type { Config } from 'tailwindcss'

const config: Omit<Config, 'content'> = {
  theme: {
    extend: {
      colors: {
        bg: '#0a0704',
        bg2: '#0f0b08',
        amber: {
          DEFAULT: '#c8860a',
          light: '#f0a830',
          glow: '#ffbc4d',
        },
        coffee: {
          DEFAULT: '#3d1f0a',
          mid: '#5c3015',
        },
        cream: {
          DEFAULT: '#e8d5b0',
          dim: '#9e8a6a',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Cabinet Grotesk', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backdropBlur: {
        glass: '28px',
      },
      animation: {
        'drift': 'drift 20s ease-in-out infinite alternate',
        'breathe': 'breathe 2.5s ease-in-out infinite',
        'strip': 'strip 20s linear infinite',
        'lottery': 'lotteryScroll 6s cubic-bezier(0.34,1.56,0.64,1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'scan-down': 'scanDown 2s ease-in-out infinite',
        'spring-up': 'springUp 0.9s cubic-bezier(0.34,1.56,0.64,1) both',
        'spring-right': 'springRight 1s cubic-bezier(0.34,1.56,0.64,1) both',
        'reveal-up': 'revealUp 0.85s ease forwards',
      },
      keyframes: {
        drift: {
          from: { transform: 'translate(0,0) scale(1)' },
          to: { transform: 'translate(4%,6%) scale(1.12)' },
        },
        breathe: {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.7)' },
        },
        strip: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        float: {
          '0%,100%': { transform: 'translateX(-50%) translateY(0)' },
          '50%': { transform: 'translateX(-50%) translateY(-6px)' },
        },
        scanDown: {
          '0%': { opacity: '0', transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'scaleY(1)', transformOrigin: 'bottom' },
        },
        springUp: {
          from: { opacity: '0', transform: 'translateY(30px) scale(0.97)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        springRight: {
          from: { opacity: '0', transform: 'translateX(40px) scale(0.95)' },
          to: { opacity: '1', transform: 'translateX(0) scale(1)' },
        },
        revealUp: {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
