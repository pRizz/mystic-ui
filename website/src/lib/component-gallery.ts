import {
	type Framework,
	forkOnlyComponents,
	upstreamComponentParityManifest,
} from "@mystic-ui/registry/src/parity";
import { allDocs } from "content-collections";
import type { Component } from "solid-js";
import type { ComponentFramework } from "./docs";
import { withBasePath } from "./site-path";
import type { ThemeMode } from "./theme";

export type GalleryCategory =
	| "text"
	| "background"
	| "component"
	| "device-mock"
	| "effect";

export type GalleryThemedValue<T> = Record<ThemeMode, T>;

export interface GalleryCaptureProfile {
	align?: "center" | "start";
	background?: GalleryThemedValue<string>;
	bottomSpacerHeight?: number;
	delayMs?: number;
	scrollY?: number;
	viewportHeight?: number;
	viewportWidth?: number;
}

export interface GalleryEntry {
	category: GalleryCategory;
	capture: GalleryCaptureProfile;
	description: string;
	docsHref?: string;
	framework: ComponentFramework;
	id: string;
	isDocumented: boolean;
	isExtra: boolean;
	previewHref: string;
	screenshotPaths: GalleryThemedValue<string>;
	supportsLivePreview: boolean;
	title: string;
}

interface GalleryDocMetadata {
	category: GalleryCategory;
	description: string;
	title: string;
}

type GalleryPreviewModule = {
	default: Component;
};

function createThemeModeValue<T>(
	lightValue: T,
	darkValue: T = lightValue,
): GalleryThemedValue<T> {
	return {
		dark: darkValue,
		light: lightValue,
	};
}

const docMetadata = new Map<string, GalleryDocMetadata>(
	allDocs.map((doc) => [
		doc._meta.path,
		{
			category: doc.category,
			description: doc.description,
			title: doc.title,
		},
	]),
);

const undocumentedComponentMetadata = {
	"background-lines": {
		category: "background",
		description: "Animated SVG line trails behind marketing copy.",
		title: "Background Lines",
	},
	"blur-in": {
		category: "text",
		description: "Reveal content with a one-shot blur and fade transition.",
		title: "Blur In",
	},
	sparkles: {
		category: "effect",
		description:
			"Canvas-based particle sparkles for hero sections and headers.",
		title: "Sparkles",
	},
	starfield: {
		category: "background",
		description:
			"A starfield canvas background that animates toward the viewer.",
		title: "Starfield",
	},
} satisfies Record<string, GalleryDocMetadata>;

const captureProfileOverrides = {
	"animated-list": { delayMs: 2600 },
	"animated-theme-toggler": {
		background: createThemeModeValue("#f8fafc", "#111111"),
	},
	"background-lines": {
		align: "start",
		background: createThemeModeValue(
			"radial-gradient(circle at top, rgba(59, 130, 246, 0.14), transparent 52%), #f8fafc",
			"radial-gradient(circle at top, rgba(125, 211, 252, 0.18), transparent 52%), #050816",
		),
	},
	blur: {
		background: createThemeModeValue("#f8fafc", "#050816"),
	},
	"blur-fade": { delayMs: 500 },
	"hyper-text": { delayMs: 1400 },
	"morphing-text": { delayMs: 1600 },
	"number-ticker": { delayMs: 1800 },
	"sparkles-text": { delayMs: 800 },
	"text-reveal": {
		align: "start",
		background: createThemeModeValue(
			"linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(226, 232, 240, 1) 100%)",
			"linear-gradient(180deg, rgba(15, 23, 42, 1) 0%, rgba(2, 6, 23, 1) 100%)",
		),
		bottomSpacerHeight: 1400,
		scrollY: 1200,
	},
	"typing-animation": { delayMs: 1800 },
	"word-fade-in": { delayMs: 1200 },
	"word-pullup": { delayMs: 1200 },
	"word-rotate": { delayMs: 1200 },
} satisfies Record<string, GalleryCaptureProfile>;

const categoryTitleMap: Record<GalleryCategory, string> = {
	background: "Backgrounds",
	component: "Components",
	"device-mock": "Device mocks",
	effect: "Effects",
	text: "Text effects",
};

const parityCategoryMap = {
	background: "background",
	interactive: "component",
	media: "device-mock",
	text: "text",
	widget: "component",
} as const satisfies Record<
	(typeof upstreamComponentParityManifest)[number]["category"],
	GalleryCategory
>;

const storyPreviewModules = {
	panda: import.meta.glob<GalleryPreviewModule>([
		"../../../components/panda/src/stories/**/*.tsx",
		"!../../../components/panda/src/stories/**/stories.tsx",
		"!../../../components/panda/src/stories/**/*.stories.tsx",
	]),
	tailwind: import.meta.glob<GalleryPreviewModule>([
		"../../../components/tailwind/src/stories/**/*.tsx",
		"!../../../components/tailwind/src/stories/**/stories.tsx",
		"!../../../components/tailwind/src/stories/**/*.stories.tsx",
	]),
} as const;

const overridePreviewModules = {
	panda: import.meta.glob<GalleryPreviewModule>(
		"../gallery-previews/panda/*.tsx",
	),
	tailwind: import.meta.glob<GalleryPreviewModule>(
		"../gallery-previews/tailwind/*.tsx",
	),
} as const;

function createTitleFromId(id: string) {
	return id
		.split("-")
		.map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
		.join(" ");
}

function getDefaultCaptureProfile(id: string): GalleryCaptureProfile {
	return {
		align: "center",
		background: createThemeModeValue(
			"linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
			"linear-gradient(180deg, #020617 0%, #0f172a 100%)",
		),
		delayMs: 400,
		viewportHeight: 900,
		viewportWidth: 1280,
		...captureProfileOverrides[id],
	};
}

function getPreviewOverridePath(framework: ComponentFramework, id: string) {
	return `../gallery-previews/${framework}/${id}.tsx`;
}

function getStoryPreviewPath(framework: ComponentFramework, id: string) {
	return `../../../components/${framework}/src/stories/${id}/default.tsx`;
}

function getDocsHref(framework: ComponentFramework, id: string) {
	return docMetadata.has(id)
		? `/docs/${framework}/components/${id}`
		: undefined;
}

function getPreviewHref(framework: ComponentFramework, id: string) {
	return withBasePath(`/demos/${framework}/${id}`);
}

export function getGalleryScreenshotPath(
	framework: ComponentFramework,
	id: string,
	mode: ThemeMode,
) {
	return withBasePath(`/component-gallery/${framework}/${id}.${mode}.png`);
}

export function getGalleryScreenshotPaths(
	framework: ComponentFramework,
	id: string,
): GalleryThemedValue<string> {
	return {
		dark: getGalleryScreenshotPath(framework, id, "dark"),
		light: getGalleryScreenshotPath(framework, id, "light"),
	};
}

function getSupportRecord(framework: Framework) {
	return upstreamComponentParityManifest
		.filter((component) => component.support[framework])
		.map((component) => ({
			category: parityCategoryMap[component.category],
			id: component.id,
			isExtra: false,
		}));
}

function getForkOnlyRecord(framework: Framework) {
	return forkOnlyComponents
		.filter((component) => component.frameworks.includes(framework))
		.map((component) => ({
			category:
				undocumentedComponentMetadata[component.id]?.category ?? "component",
			id: component.id,
			isExtra: true,
		}));
}

function getGalleryMetadata(id: string, fallbackCategory: GalleryCategory) {
	const docsMetadata = docMetadata.get(id);
	if (docsMetadata) {
		return docsMetadata;
	}

	return (
		undocumentedComponentMetadata[id] ?? {
			category: fallbackCategory,
			description: `${createTitleFromId(id)} component demo.`,
			title: createTitleFromId(id),
		}
	);
}

export function getGalleryPreviewLoader(
	framework: ComponentFramework,
	id: string,
) {
	return (
		overridePreviewModules[framework][getPreviewOverridePath(framework, id)] ??
		storyPreviewModules[framework][getStoryPreviewPath(framework, id)]
	);
}

export function getGalleryEntry(
	framework: ComponentFramework,
	id: string,
): GalleryEntry | undefined {
	return getGalleryEntries(framework).find((entry) => entry.id === id);
}

export function getGalleryEntries(
	framework: ComponentFramework,
): readonly GalleryEntry[] {
	const frameworkEntries = [
		...getSupportRecord(framework),
		...getForkOnlyRecord(framework),
	];

	return frameworkEntries
		.map((entry) => {
			const metadata = getGalleryMetadata(entry.id, entry.category);
			return {
				category: metadata.category,
				capture: getDefaultCaptureProfile(entry.id),
				description: metadata.description,
				docsHref: getDocsHref(framework, entry.id),
				framework,
				id: entry.id,
				isDocumented: docMetadata.has(entry.id),
				isExtra: entry.isExtra,
				previewHref: getPreviewHref(framework, entry.id),
				screenshotPaths: getGalleryScreenshotPaths(framework, entry.id),
				supportsLivePreview: Boolean(
					getGalleryPreviewLoader(framework, entry.id),
				),
				title: metadata.title,
			} satisfies GalleryEntry;
		})
		.sort((entryA, entryB) => entryA.title.localeCompare(entryB.title));
}

export function getGalleryCategoryTitle(category: GalleryCategory) {
	return categoryTitleMap[category];
}

export function getGallerySections(framework: ComponentFramework) {
	const entries = getGalleryEntries(framework);
	const groupedEntries = new Map<GalleryCategory, GalleryEntry[]>();

	for (const entry of entries) {
		const sectionEntries = groupedEntries.get(entry.category);
		if (sectionEntries) {
			sectionEntries.push(entry);
			continue;
		}

		groupedEntries.set(entry.category, [entry]);
	}

	return (Object.keys(categoryTitleMap) as GalleryCategory[])
		.filter((category) => groupedEntries.has(category))
		.map((category) => ({
			category,
			entries: groupedEntries.get(category) ?? [],
			title: getGalleryCategoryTitle(category),
		}));
}
