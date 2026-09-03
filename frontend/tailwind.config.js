/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        isa: {
          dark: '#081D35',
          navy: '#0B2545',
          slate: '#134074',
          blue: '#0066CC',
          sky: '#00A3FF',
          light: '#EEF4F8',
          subtle: '#F4F7FA',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(11, 37, 69, 0.06), 0 2px 6px -1px rgba(11, 37, 69, 0.04)',
        'soft-lg': '0 10px 30px -4px rgba(11, 37, 69, 0.1), 0 4px 12px -2px rgba(11, 37, 69, 0.05)',
        'soft-xl': '0 20px 40px -6px rgba(11, 37, 69, 0.12), 0 8px 16px -4px rgba(11, 37, 69, 0.06)',
      }
    },
  },
  plugins: [],
}
