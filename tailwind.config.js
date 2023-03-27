/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */

const { fontFamily } = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
	darkMode: ['class', '[data-theme="dark"]'],
	content: [
		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-inter)', ...fontFamily.sans]
			},
			colors: {
				brand: {
					100: '#eceff1',
					200: '#CBD1EF',
					300: '#AAB3EC',
					400: '#6776e6',
					500: '#4f5bb1',
					600: '#3A4481',
					700: '#242c51',
					800: '#1B223C',
					900: '#111827'
				}
			}
		}
	},
	plugins: [
		require('tailwindcss-radix'),
		require('prettier-plugin-tailwindcss'),
		plugin(({ addComponents }) => {
			addComponents({
				'.h-stack': {
					display: 'flex',
					flexDirection: 'row'
				},
				'.v-stack': {
					display: 'flex',
					flexDirection: 'column'
				},
				'.center': {
					justifyContent: 'center',
					alignItems: 'center',
					height: '100%'
				}
			})
		})
	]
}
