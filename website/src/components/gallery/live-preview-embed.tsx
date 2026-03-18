import {
	type Component,
	Show,
	createSignal,
	onCleanup,
	onMount,
} from "solid-js";
import { css } from "styled-system/css";
import type { GalleryEntry } from "~/lib/component-gallery";

interface LivePreviewEmbedProps {
	entry: GalleryEntry;
}

export const LivePreviewEmbed: Component<LivePreviewEmbedProps> = (props) => {
	const [shouldRenderIframe, setShouldRenderIframe] = createSignal(false);

	let containerRef: HTMLDivElement | undefined;

	onMount(() => {
		if (!containerRef || !props.entry.supportsLivePreview) {
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				if (!entries.some((entry) => entry.isIntersecting)) {
					return;
				}

				setShouldRenderIframe(true);
				observer.disconnect();
			},
			{
				rootMargin: "160px",
			},
		);

		observer.observe(containerRef);
		onCleanup(() => observer.disconnect());
	});

	return (
		<div
			ref={containerRef}
			class={css({
				backgroundColor: "bg.default",
				borderColor: "border.default",
				borderRadius: "2xl",
				borderWidth: "1px",
				minHeight: "20rem",
				overflow: "hidden",
			})}
		>
			<Show
				when={props.entry.supportsLivePreview}
				fallback={
					<div
						class={css({
							display: "grid",
							gap: "2",
							minHeight: "20rem",
							p: "6",
							placeItems: "center",
							textAlign: "center",
						})}
					>
						<div class={css({ display: "grid", gap: "2" })}>
							<strong>Screenshot only</strong>
							<p
								class={css({
									color: "fg.muted",
									fontSize: "sm",
									maxWidth: "sm",
								})}
							>
								This component is shown as a committed screenshot instead of a
								live embedded preview.
							</p>
						</div>
					</div>
				}
			>
				<Show
					when={shouldRenderIframe()}
					fallback={
						<div
							class={css({
								display: "grid",
								gap: "2",
								minHeight: "20rem",
								p: "6",
								placeItems: "center",
								textAlign: "center",
							})}
						>
							<div class={css({ display: "grid", gap: "2" })}>
								<strong>Preparing live preview</strong>
								<p class={css({ color: "fg.muted", fontSize: "sm" })}>
									The iframe loads as this card enters the viewport.
								</p>
							</div>
						</div>
					}
				>
					<iframe
						src={props.entry.previewHref}
						title={`${props.entry.title} live preview`}
						loading="lazy"
						class={css({
							border: "0",
							display: "block",
							height: "20rem",
							width: "full",
						})}
					/>
				</Show>
			</Show>
		</div>
	);
};
