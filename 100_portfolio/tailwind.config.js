/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#dec9e9',
					100: '#dac3e8',
					200: '#d2b7e5',
					300: '#c19ee0',
					400: '#b185db',
					500: '#a06cd5',
					600: '#9163cb',
					700: '#815ac0',
					800: '#7251b5',
					900: '#6247aa'
				},
				white: '#FFFDFA',
				black: '#4C4E52'
			}
		},
		fontFamily: {
			'sans': ['Quicksand', 'ui-sans-serif', 'system-ui'],
			'mono': ['Braah One']
		}
	},
	plugins: [],
}
