/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: { 'white': { DEFAULT: '#FFFFFF', 100: '#333333', 200: '#666666', 300: '#999999', 400: '#cccccc', 500: '#ffffff', 600: '#ffffff', 700: '#ffffff', 800: '#ffffff', 900: '#ffffff' }, 'cerise': { DEFAULT: '#FE0167', 100: '#330014', 200: '#650129', 300: '#98013d', 400: '#cb0152', 500: '#fe0167', 600: '#fe3485', 700: '#fe67a3', 800: '#fe9ac2', 900: '#ffcce0' }, 'coquelicot': { DEFAULT: '#FF3205', 100: '#340a00', 200: '#681300', 300: '#9c1d00', 400: '#d02600', 500: '#ff3205', 600: '#ff5c37', 700: '#ff8569', 800: '#ffad9b', 900: '#ffd6cd' }, 'black': { DEFAULT: '#000000', 100: '#000000', 200: '#000000', 300: '#000000', 400: '#000000', 500: '#000000', 600: '#333333', 700: '#666666', 800: '#999999', 900: '#cccccc' } }
        }
    },
};
