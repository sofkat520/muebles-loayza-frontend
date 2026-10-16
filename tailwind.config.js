/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        acento: '#2563eb', // azul de acento: logo, botones de link, menú activo
      },
    },
  },
  plugins: [],
}
