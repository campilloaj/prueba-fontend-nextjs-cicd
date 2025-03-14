const config = {
  darkMode: 'class', // Cambia a 'media' si prefieres que dependa del sistema
  theme: {
    extend: {
      colors: {
        'dark-bg': '#121212', // Puedes personalizar los colores para el modo oscuro
        'dark-text': '#eaeaea', // Color del texto en modo oscuro
      },
    },
  },
  plugins: ["@tailwindcss/postcss"],
};

export default config;
