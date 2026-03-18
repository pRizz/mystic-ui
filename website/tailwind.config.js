/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/gallery-previews/tailwind/**/*.{ts,tsx}",
		"./src/routes/gallery-preview/tailwind/**/*.{ts,tsx}",
		"../components/tailwind/src/**/*.{ts,tsx}",
	],
	darkMode: "class",
	theme: {
		extend: {},
	},
	plugins: [],
};
