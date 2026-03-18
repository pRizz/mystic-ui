import type { Component } from "solid-js";

export type ComponentFramework = "tailwind" | "panda";

const docModules = import.meta.glob<{ default: Component }>(
	"../content/docs/*.mdx",
	{
		eager: true,
	},
);

const storyModules = {
	tailwind: import.meta.glob<{ default: Component }>([
		"../../../components/tailwind/src/stories/**/*.tsx",
		"!../../../components/tailwind/src/stories/**/stories.tsx",
		"!../../../components/tailwind/src/stories/**/*.stories.tsx",
	]),
	panda: import.meta.glob<{ default: Component }>([
		"../../../components/panda/src/stories/**/*.tsx",
		"!../../../components/panda/src/stories/**/stories.tsx",
		"!../../../components/panda/src/stories/**/*.stories.tsx",
	]),
} as const;

function getDocPath(componentId: string) {
	return `../content/docs/${componentId}.mdx`;
}

function getStoryPath(
	framework: ComponentFramework,
	componentId: string,
	storyName = "default",
) {
	return `../../../components/${framework}/src/stories/${componentId}/${storyName}.tsx`;
}

export function getDocComponent(componentId: string) {
	return docModules[getDocPath(componentId)]?.default;
}

export function getStoryComponent(
	framework: ComponentFramework,
	componentId: string,
	storyName = "default",
) {
	return storyModules[framework][
		getStoryPath(framework, componentId, storyName)
	];
}

export function hasStoryComponent(
	framework: ComponentFramework,
	componentId: string,
	storyName = "default",
) {
	return Boolean(getStoryComponent(framework, componentId, storyName));
}
