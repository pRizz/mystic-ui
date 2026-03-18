import type { RegistryEntry } from "@mystic-ui/registry/src/schema";
import type { ComponentFramework } from "./docs";

const registryModules = {
	tailwind: import.meta.glob<RegistryEntry>(
		"../../../packages/registry/tailwind/*.json",
		{
			eager: true,
			import: "default",
		},
	),
	panda: import.meta.glob<RegistryEntry>(
		"../../../packages/registry/panda/*.json",
		{
			eager: true,
			import: "default",
		},
	),
} as const;

function getRegistryEntryPath(
	framework: ComponentFramework,
	componentId: string,
) {
	return `../../../packages/registry/${framework}/${componentId}.json`;
}

export function getLocalRegistryEntry(
	framework: ComponentFramework,
	componentId: string,
) {
	return registryModules[framework][
		getRegistryEntryPath(framework, componentId)
	];
}
