import type { Config } from "tailwindcss/types";
import {
	getMysticTailwindThemeExtend,
	mysticTailwindComponentExtends,
} from "../../../components/tailwind/src/setup/shared";

export function componentTailwindConfig(component: string) {
	const extend = mysticTailwindComponentExtends[component];
	if (!extend) {
		return undefined;
	}

	return {
		theme: {
			extend,
		},
	} as Config;
}

export function tailwindConfig() {
	return {
		theme: {
			extend: getMysticTailwindThemeExtend(),
		},
	} as Config;
}
