/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.vue'],
	future: { hoverOnlyWhenSupported: true },
	theme: {
		extend: {
			ringWidth: {
				3: '3px',
			},
			borderWidth: {
				3.5: '3.5px',
			},
			spacing: {
				inherit: 'inherit',
			},
		},
	},
};
