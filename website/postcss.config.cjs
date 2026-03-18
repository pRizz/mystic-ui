module.exports = (context) => {
	const isTailwindPreview = context.file?.basename === "tailwind-preview.css";

	return {
		plugins: {
			"@pandacss/dev/postcss": {},
			...(isTailwindPreview
				? {
						autoprefixer: {},
						tailwindcss: {},
					}
				: {}),
		},
	};
};
