/** @type {import('tailwindcss').Config} */

export default {
	content: ['./index.html', './src/**/*.vue'],
	future: { hoverOnlyWhenSupported: true },
	theme: {
		extend: {
			screens: {
				support: { raw: '(hover: hover)' }, // Check if the device supports hover
			},

			spacing: {
				inherit: 'inherit',
			},
		},
	},
};
