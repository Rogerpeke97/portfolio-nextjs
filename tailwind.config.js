/** @type {import('tailwindcss').Config} */ 
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "separator": "var(--separator)",
        "background": "var(--chakra-colors-chakra-body-bg)",
        "card": "var(--card)"
      },
      screens: {
        'xs': {min: '0px', max: '500px'},
        'sm': {min: '640px', max: '768px'}, 
        'smAndDown': {min: '0px', max: '768px'}, 
        'md': {min: '768px', max: '1024px'},
        'mdAndDown': {min: '0px', max: '1200px'},
        'mdAndUp': {min: '1200px', max: '9999px'},
        'lg': {min: '1024px', max: '1280px'},  
        'xl': {min: '1280px', max: '1536px'},  
        '2xl': {min: '1536px', max: '1920px'},  
        '3xl': {min: '1920px'},
        '3xlAndDown': {min: '0px', max: '1920px'},
      }
    },
  },
  plugins: [],
}
