/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: '#3d6b4f',
          light: '#5a8e6e',
          pale: '#c8dece',
          dark: '#2d5a3d',
        },
        cream: '#f5f0e8',
        beige: '#ede5d4',
        brown: {
          DEFAULT: '#7a5c3e',
          light: '#c4a07a',
        },
        gold: {
          DEFAULT: '#b8965a',
          light: '#d4b07a',
        },
        forest: '#1e2a1f',
        muted: '#6b7c6e',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(160deg, rgba(30,42,31,0.6) 0%, rgba(30,42,31,0.3) 50%, rgba(61,107,79,0.2) 100%)',
        'nature-gradient': 'linear-gradient(135deg, #c8dece 0%, #3d6b4f 100%)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float 7s ease-in-out infinite',
        'leaf-fall': 'leafFall 8s linear infinite',
        'marquee': 'marquee 25s linear infinite',
        'fade-up': 'fadeUp 0.8s ease both',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0px) rotateY(-15deg)' }, '50%': { transform: 'translateY(-14px) rotateY(10deg)' } },
        leafFall: { '0%': { transform: 'translateY(-20px) rotate(0deg)', opacity: 0 }, '10%': { opacity: 0.6 }, '90%': { opacity: 0.4 }, '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: 0 } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        fadeUp: { from: { opacity: 0, transform: 'translateY(30px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '-400px 0' }, '100%': { backgroundPosition: '400px 0' } },
      },
      backdropBlur: { xs: '2px' },
      boxShadow: {
        'glass': '0 8px 32px rgba(30,42,31,0.12)',
        'glass-lg': '0 20px 60px rgba(30,42,31,0.15)',
        'product': '0 30px 80px rgba(30,42,31,0.2)',
        'gold': '0 8px 30px rgba(184,150,90,0.3)',
      },
      borderRadius: { '4xl': '2rem', '5xl': '2.5rem' },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};