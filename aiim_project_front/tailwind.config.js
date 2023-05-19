/** @type {import('tailwindcss').Config} */
module.exports = {

    // Szukanie klas CSS, które będą używane w projekcie
    content: [
      './src/**/*.{js,jsx,ts,tsx}',
    ],
  
    darkMode: "class",
    
    // Dostosowywanie podstawowych ustawień dla projektu, takie jak kolory, czcionki, rozmiary itp
    theme: {
      extend: {
        colors: {
          black_umg: '#111E2B',        // ciemny-granat (strona szkoły)
          gold_umg: '#A58553',         // złoty (strona szkoły)
          gray_umg: '#858E99',         // szary (strona szkoły)
          yellow_umg: '#FDC529',       // zółty (logo szkoły)
          blue_umg: '#6BABF4',         // jaskrawy błękit
          light_page: '#CDD9F9',       // niebieskawy
          light_field: '#F5F1F1',      // szarawy
          light_component: '#FFFFFF',  // biały
          light_menu: '#111E2B',       // granatowy (logo szkoły)
          dark_page: '#283542',        // ciemny
          dark_field: '#232A37',       // ciemniejszy
          dark_component: '#111E2B',   // najciemniejszy
        }
      },
    },
  
    // Określenie, które warianty klas CSS powinny być generowane przez Tailwind
    // variants: {},
  
    // Lista dodatkowych wtyczek, których chce się użyć
    plugins: [],
  }