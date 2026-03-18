function createSvgDataUri(markup: string) {
	return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(markup)}`;
}

function createGradientImage(
	label: string,
	startColor: string,
	endColor: string,
) {
	return createSvgDataUri(`
		<svg xmlns="http://www.w3.org/2000/svg" width="800" height="540" viewBox="0 0 800 540" fill="none">
			<defs>
				<linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stop-color="${startColor}" />
					<stop offset="100%" stop-color="${endColor}" />
				</linearGradient>
			</defs>
			<rect width="800" height="540" rx="36" fill="url(#gradient)" />
			<circle cx="124" cy="120" r="92" fill="rgba(255,255,255,0.14)" />
			<circle cx="702" cy="88" r="56" fill="rgba(255,255,255,0.14)" />
			<circle cx="680" cy="450" r="84" fill="rgba(255,255,255,0.12)" />
			<text
				x="72"
				y="292"
				fill="white"
				font-size="64"
				font-family="Rubik, Arial, sans-serif"
				font-weight="700"
			>
				${label}
			</text>
			<text
				x="72"
				y="352"
				fill="rgba(255,255,255,0.84)"
				font-size="26"
				font-family="Rubik, Arial, sans-serif"
			>
				Mystic UI preview asset
			</text>
		</svg>
	`);
}

function createAvatar(name: string, background: string) {
	return createSvgDataUri(`
		<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" fill="none">
			<rect width="96" height="96" rx="48" fill="${background}" />
			<text
				x="50%"
				y="56%"
				text-anchor="middle"
				fill="white"
				font-size="34"
				font-family="Rubik, Arial, sans-serif"
				font-weight="700"
			>
				${name.charAt(0)}
			</text>
		</svg>
	`);
}

export const galleryPreviewImages = [
	createGradientImage("Aurora", "#7c3aed", "#0f172a"),
	createGradientImage("Nebula", "#2563eb", "#0f766e"),
	createGradientImage("Prism", "#f97316", "#be185d"),
];

export const galleryReviewCards = [
	{
		body: "The gallery page makes it much easier to browse every component.",
		img: createAvatar("Parker", "#4f46e5"),
		name: "Parker",
		username: "@parker",
	},
	{
		body: "Live previews plus committed screenshots are perfect for design reviews.",
		img: createAvatar("Sasha", "#db2777"),
		name: "Sasha",
		username: "@sasha",
	},
	{
		body: "This feels like a polished component catalog instead of a loose story list.",
		img: createAvatar("Jordan", "#0f766e"),
		name: "Jordan",
		username: "@jordan",
	},
];

export const galleryRippleLogo = createSvgDataUri(`
	<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160" fill="none">
		<rect width="160" height="160" rx="40" fill="#111827" />
		<path
			d="M47 113V47H76.7022C96.7627 47 110 59.2796 110 77.552C110 96.828 95.7784 113 75.8571 113H47Z"
			fill="url(#logoGradient)"
		/>
		<path
			d="M71.8574 63C79.866 63 85.715 69.1458 85.715 77.0194C85.715 84.893 79.866 91 71.8574 91H63V63H71.8574Z"
			fill="white"
		/>
		<defs>
			<linearGradient id="logoGradient" x1="47" y1="47" x2="116.094" y2="113.689" gradientUnits="userSpaceOnUse">
				<stop stop-color="#7C3AED" />
				<stop offset="1" stop-color="#22D3EE" />
			</linearGradient>
		</defs>
	</svg>
`);
