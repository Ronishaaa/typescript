/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    container: {
      
      center: true,
      padding: {
        lg: '5rem',
        xl: '5rem',
        '2xl': '5rem',
      },
    },
    extend: {},
  },
  plugins: [],
}

