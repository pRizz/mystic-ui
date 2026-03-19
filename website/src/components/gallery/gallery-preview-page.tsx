import { Meta, Title } from "@solidjs/meta";
import { type Component, Show, Suspense, createMemo, lazy } from "solid-js";
import { Dynamic } from "solid-js/web";
import { PreviewFrame } from "~/components/gallery/preview-frame";
import {
	type GalleryEntry,
	getGalleryEntry,
	getGalleryPreviewLoader,
} from "~/lib/component-gallery";
import type { ComponentFramework } from "~/lib/docs";
import { withBasePath } from "~/lib/site-path";

interface GalleryPreviewPageProps {
	componentId: string;
	framework: ComponentFramework;
}

export const GalleryPreviewPage: Component<GalleryPreviewPageProps> = (
	props,
) => {
	const entry = createMemo<GalleryEntry | undefined>(() =>
		getGalleryEntry(props.framework, props.componentId),
	);
	const PreviewComponent = createMemo(() => {
		const currentEntry = entry();
		if (!currentEntry) {
			return undefined;
		}

		const loader = getGalleryPreviewLoader(props.framework, currentEntry.id);
		return loader ? lazy(loader) : undefined;
	});

	return (
		<>
			<Title>{entry()?.title ?? "Component"} preview | Mystic UI</Title>
			<Meta
				name="description"
				content={
					entry()?.description ?? "Isolated component preview for the gallery."
				}
			/>
			<Meta name="robots" content="noindex" />
			<Show
				when={entry()}
				fallback={
					<PreviewFrame
						entry={{
							category: "component",
							capture: {},
							description:
								"The requested component preview could not be found.",
							framework: props.framework,
							id: props.componentId,
							isDocumented: false,
							isExtra: false,
							previewHref: withBasePath(
								`/demos/${props.framework}/${props.componentId}`,
							),
							screenshotPath: withBasePath(
								`/component-gallery/${props.framework}/${props.componentId}.png`,
							),
							supportsLivePreview: false,
							title: "Preview unavailable",
						}}
					>
						<p>Preview unavailable.</p>
					</PreviewFrame>
				}
			>
				{(currentEntry) => (
					<PreviewFrame entry={currentEntry()}>
						<Show
							when={PreviewComponent()}
							fallback={
								<p>Live preview is not available for this component.</p>
							}
						>
							{(Component) => (
								<Suspense
									fallback={
										<div data-gallery-preview-loading="">Loading preview…</div>
									}
								>
									<Dynamic component={Component()} />
								</Suspense>
							)}
						</Show>
					</PreviewFrame>
				)}
			</Show>
		</>
	);
};
