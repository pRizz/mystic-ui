import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import {
	getMysticTailwindThemeExtend,
	isPlainObject,
	mergePlainObjects,
} from "./shared";

type ContentEntry = string | { raw: string; extension?: string };
type PluginEntry = NonNullable<Config["plugins"]>[number];

function toPosixPath(filePath: string) {
	return filePath.split(path.sep).join(path.posix.sep);
}

const mysticPackageContentGlob = toPosixPath(
	path.join(
		path.dirname(fileURLToPath(import.meta.url)),
		"..",
		"ui/**/*.{js,jsx,ts,tsx}",
	),
);

const mysticBaseConfig: Config = {
	darkMode: "class",
	content: [mysticPackageContentGlob],
	theme: {
		extend: getMysticTailwindThemeExtend(),
	},
	plugins: [animate],
};

function mergeContentEntries(entries: ContentEntry[]) {
	const seenPaths = new Set<string>();
	const mergedEntries: ContentEntry[] = [];

	for (const entry of entries) {
		if (typeof entry !== "string") {
			mergedEntries.push(entry);
			continue;
		}

		if (seenPaths.has(entry)) {
			continue;
		}

		seenPaths.add(entry);
		mergedEntries.push(entry);
	}

	return mergedEntries;
}

function mergeContent(content: Partial<Config>["content"]): Config["content"] {
	const baseEntries: ContentEntry[] = [mysticPackageContentGlob];

	if (!content) {
		return baseEntries;
	}

	if (Array.isArray(content)) {
		return mergeContentEntries([
			...baseEntries,
			...(content as ContentEntry[]),
		]);
	}

	const contentWithFiles = content as {
		files?: ContentEntry[];
		relative?: boolean;
		extract?: Record<string, (content: string) => string[]>;
		transform?: Record<string, (content: string) => string>;
	};

	return {
		...contentWithFiles,
		files: mergeContentEntries([
			...baseEntries,
			...(contentWithFiles.files ?? []),
		]),
	};
}

function getPluginKey(plugin: PluginEntry) {
	if (plugin === animate) {
		return "__mystic_tailwindcss_animate__";
	}

	if (Array.isArray(plugin)) {
		const [handler, options] = plugin;
		if (typeof handler === "function") {
			return `tuple:${handler.name}:${JSON.stringify(options ?? null)}`;
		}
		return `tuple:${JSON.stringify(plugin)}`;
	}

	if (typeof plugin === "function") {
		return `fn:${plugin.name}:${String(plugin)}`;
	}

	return `obj:${JSON.stringify(plugin)}`;
}

function mergePlugins(plugins: Partial<Config>["plugins"]): Config["plugins"] {
	const mergedPlugins = [
		...(mysticBaseConfig.plugins ?? []),
		...(plugins ?? []),
	];
	const seenPlugins = new Set<string>();
	const dedupedPlugins: PluginEntry[] = [];

	for (const plugin of mergedPlugins) {
		const pluginKey = getPluginKey(plugin);
		if (seenPlugins.has(pluginKey)) {
			continue;
		}

		seenPlugins.add(pluginKey);
		dedupedPlugins.push(plugin);
	}

	return dedupedPlugins;
}

export function withMysticUI(config: Partial<Config> = {}): Config {
	const mergedTheme = mergePlainObjects(
		isPlainObject(mysticBaseConfig.theme) ? mysticBaseConfig.theme : {},
		isPlainObject(config.theme) ? config.theme : {},
	);
	const mergedExtend = mergePlainObjects(
		isPlainObject(mysticBaseConfig.theme?.extend)
			? mysticBaseConfig.theme.extend
			: {},
		isPlainObject(config.theme?.extend) ? config.theme.extend : {},
	);

	return {
		...mysticBaseConfig,
		...config,
		darkMode: config.darkMode ?? mysticBaseConfig.darkMode,
		content: mergeContent(config.content),
		theme: {
			...mergedTheme,
			extend: mergedExtend,
		},
		plugins: mergePlugins(config.plugins),
	};
}
