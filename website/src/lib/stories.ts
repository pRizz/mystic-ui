import { renderCodeHtml } from "./code-html";
import type { ComponentFramework } from "./docs";

const storySourceModules = {
	tailwind: import.meta.glob<string>(
		"../../../components/tailwind/src/stories/**/*.tsx?raw",
		{
			eager: true,
			import: "default",
		},
	),
	panda: import.meta.glob<string>(
		"../../../components/panda/src/stories/**/*.tsx?raw",
		{
			eager: true,
			import: "default",
		},
	),
} as const;

function getStorySourcePath(
	framework: ComponentFramework,
	component: string,
	name = "default",
) {
	return `../../../components/${framework}/src/stories/${component}/${name}.tsx?raw`;
}

export function getStorySource(
	framework: ComponentFramework,
	component: string,
	name = "default",
) {
	const source =
		storySourceModules[framework][
			getStorySourcePath(framework, component, name)
		];

	if (!source) {
		return undefined;
	}

	return {
		html: renderCodeHtml(source, "tsx"),
		source,
	};
}
