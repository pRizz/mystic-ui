import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
	forkOnlyComponents,
	upstreamComponentParityManifest,
} from "../packages/registry/src/parity";

type ComponentFramework = "panda" | "tailwind";

const componentFrameworks = ["panda", "tailwind"] as const satisfies readonly ComponentFramework[];

const websiteDirectory = path.dirname(fileURLToPath(import.meta.url));
const docsDirectory = path.join(websiteDirectory, "src", "content", "docs");

function createRouteSet() {
	return new Set<string>([
		"/",
		"/docs/panda",
		"/docs/panda/setup",
		"/docs/tailwind",
		"/docs/tailwind/setup",
		"/gallery",
		"/gallery/panda",
		"/gallery/tailwind",
	]);
}

function getDocIds() {
	return readdirSync(docsDirectory)
		.filter((fileName) => fileName.endsWith(".mdx"))
		.map((fileName) => fileName.replace(/\.mdx$/u, ""))
		.sort((docA, docB) => docA.localeCompare(docB));
}

function getStoryComponentIds(framework: ComponentFramework) {
	const storiesDirectory = path.join(
		websiteDirectory,
		"..",
		"components",
		framework,
		"src",
		"stories",
	);

	return new Set(
		readdirSync(storiesDirectory, { withFileTypes: true })
			.filter((entry) => entry.isDirectory())
			.map((entry) => entry.name)
			.filter((componentId) =>
				existsSync(path.join(storiesDirectory, componentId, "default.tsx")),
			),
	);
}

function getGalleryComponentIds(framework: ComponentFramework) {
	const supportedComponentIds = upstreamComponentParityManifest
		.filter((component) => component.support[framework])
		.map((component) => component.id);
	const extraComponentIds = forkOnlyComponents
		.filter((component) => component.frameworks.includes(framework))
		.map((component) => component.id);

	return Array.from(new Set([...supportedComponentIds, ...extraComponentIds])).sort(
		(componentA, componentB) => componentA.localeCompare(componentB),
	);
}

function getComponentDocsRoutes() {
	const docIds = getDocIds();

	return componentFrameworks.flatMap((framework) => {
		const storyComponentIds = getStoryComponentIds(framework);

		return docIds
			.filter((docId) => storyComponentIds.has(docId))
			.map((docId) => `/docs/${framework}/components/${docId}`);
	});
}

function getDemoRoutes() {
	return componentFrameworks.flatMap((framework) =>
		getGalleryComponentIds(framework).map(
			(componentId) => `/demos/${framework}/${componentId}`,
		),
	);
}

function getLegacyGalleryPreviewRoutes() {
	return componentFrameworks.flatMap((framework) =>
		getGalleryComponentIds(framework).map(
			(componentId) => `/gallery-preview/${framework}/${componentId}`,
		),
	);
}

export const prerenderRoutes = Array.from(
	new Set([
		...createRouteSet(),
		...getComponentDocsRoutes(),
		...getDemoRoutes(),
		...getLegacyGalleryPreviewRoutes(),
	]),
).sort((routeA, routeB) => routeA.localeCompare(routeB));
