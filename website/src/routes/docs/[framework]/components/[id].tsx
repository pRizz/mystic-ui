import { Meta, Title } from "@solidjs/meta";
import type { RouteDefinition, RouteSectionProps } from "@solidjs/router";
import { allDocs } from "content-collections";
import { createMemo } from "solid-js";
import { Dynamic } from "solid-js/web";
import { InstallationInstructions } from "~/components/docs/installation-instructions";
import { StoryPreview } from "~/components/docs/story-preview";
import {
	type ComponentFramework,
	getDocComponent,
	hasStoryComponent,
} from "~/lib/docs";
import { DocsPageProvider } from "~/lib/docs-page";
import { getStorySource } from "~/lib/stories";
import { useMDXComponents } from "~/tools/solid-mdx";

export const route = {
	preload: async (args) => {
		const framework = args.params.framework as ComponentFramework | undefined;
		const componentId = args.params.id;
		if (
			!framework ||
			!componentId ||
			!hasStoryComponent(framework, componentId)
		) {
			return;
		}

		await Promise.all([getStorySource(framework, componentId, "default")]);
	},
} satisfies RouteDefinition;

const MDXComponents = useMDXComponents();

export default function ComponentDocsPage(props: RouteSectionProps) {
	const framework = () => {
		const maybeFramework = props.params.framework;
		if (maybeFramework !== "tailwind" && maybeFramework !== "panda") {
			throw new Error("Invalid framework");
		}

		return maybeFramework;
	};
	const componentId = () => {
		const maybeComponentId = props.params.id;
		if (!maybeComponentId) {
			throw new Error("Component id is required");
		}

		return maybeComponentId;
	};
	const doc = createMemo(() => {
		const document = allDocs.find((doc) => doc._meta.path === componentId());
		if (!document) {
			throw new Error("Document not found");
		}
		return document;
	});
	const DocContent = createMemo(() => {
		if (!hasStoryComponent(framework(), componentId())) {
			throw new Error(
				`Component ${componentId()} is not available for ${framework()}.`,
			);
		}

		const maybeDocComponent = getDocComponent(componentId());
		if (!maybeDocComponent) {
			throw new Error("Document content not found");
		}

		return maybeDocComponent;
	});

	return (
		<>
			<Title>{doc().title} component | Mystic UI</Title>
			<Meta name="description" content={doc().description} />
			<MDXComponents.h1>{doc().title}</MDXComponents.h1>
			<MDXComponents.p textStyle="xl">{doc().description}</MDXComponents.p>
			<MDXComponents.hr />
			<StoryPreview
				framework={framework()}
				component={componentId()}
				name="default"
			/>
			<MDXComponents.hr />
			<MDXComponents.h2>Installation</MDXComponents.h2>
			<InstallationInstructions />
			<MDXComponents.hr />
			<DocsPageProvider framework={framework} componentId={componentId}>
				<Dynamic component={DocContent()} />
			</DocsPageProvider>
		</>
	);
}
