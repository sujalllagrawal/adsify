/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F7F5F0',
        ink: {
          DEFAULT: '#15161A',
          soft: '#4B4C52',
          faint: '#8A8B90',
        },
        line: '#E4E1D8',
        panel: '#FFFFFF',
        teal: {
          50: '#EEF5F2',
          100: '#D6E7E0',
          400: '#1F6F5C',
          500: '#0F5C4C',
          600: '#0B4A3D',
          700: '#083A30',
        },
        brass: {
          100: '#F3EAD3',
          400: '#B8944F',
          500: '#9C7B3C',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '6px',
        md: '8px',
        lg: '10px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(21,22,26,0.04)',
        lift: '0 8px 24px rgba(21,22,26,0.08)',
      },
      maxWidth: {
        content: '1240px',
      },
    },
  },
  plugins: [],
}
