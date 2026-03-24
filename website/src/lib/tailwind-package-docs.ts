import {
	getMysticTailwindThemeExtend,
	mysticTailwindManualPackageContentGlob,
	mysticThemeCssText,
} from "../../../components/tailwind/src/setup/shared";

function indentBlock(code: string, indent: string) {
	return code
		.split("\n")
		.map((line) => (line.length > 0 ? `${indent}${line}` : line))
		.join("\n");
}

export const manualTailwindConfigSnippet = `import animate from "tailwindcss-animate";
import type { Config } from "tailwindcss";

const config = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "${mysticTailwindManualPackageContentGlob}"
  ],
  theme: {
    extend: ${indentBlock(
			JSON.stringify(getMysticTailwindThemeExtend(), null, 2),
			"    ",
		).trimStart()}
  },
  plugins: [animate]
} satisfies Config;

export default config;
`;

export const manualThemeCssSnippet = mysticThemeCssText;
