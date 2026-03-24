import { withMysticUI } from "./src/setup/index.ts";

/** @type {import('tailwindcss').Config} */
export default withMysticUI({
	content: ["./src/**/*.{tsx,ts,jsx,js}"],
});
