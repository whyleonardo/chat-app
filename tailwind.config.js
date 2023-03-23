/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class', '[data-theme="dark"]'],
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',

		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-inter)']
			},
			colors: {
				brand: {
					100: '#eceff1',
					500: '#6776e6',
					600: '#4f5bb1',
					700: '#242c51',
					900: '#111827'
				}
			}
		}
	},
	plugins: [require('tailwindcss-radix')]
}
