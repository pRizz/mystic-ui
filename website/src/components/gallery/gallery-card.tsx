import { A } from "@solidjs/router";
import { type Component, Show, createSignal } from "solid-js";
import { css } from "styled-system/css";
import type { GalleryEntry } from "~/lib/component-gallery";
import { LivePreviewEmbed } from "./live-preview-embed";

interface GalleryCardProps {
	entry: GalleryEntry;
}

const badgeClass = css({
	borderRadius: "full",
	borderWidth: "1px",
	borderColor: "border.default",
	color: "fg.muted",
	fontSize: "xs",
	fontWeight: "medium",
	px: "2.5",
	py: "1",
});

export const GalleryCard: Component<GalleryCardProps> = (props) => {
	const [screenshotLoadFailed, setScreenshotLoadFailed] = createSignal(false);

	return (
		<article
			data-gallery-card=""
			data-component-id={props.entry.id}
			data-framework={props.entry.framework}
			data-preview-href={props.entry.previewHref}
			class={css({
				backgroundColor: "bg.canvas",
				borderColor: "border.default",
				borderRadius: "3xl",
				borderWidth: "1px",
				boxShadow: "sm",
				overflow: "hidden",
			})}
		>
			<div
				class={css({
					display: "grid",
					gap: "6",
					p: { base: "5", md: "6" },
				})}
			>
				<div class={css({ display: "grid", gap: "3" })}>
					<div class={css({ display: "flex", flexWrap: "wrap", gap: "2" })}>
						<span class={badgeClass}>{props.entry.framework}</span>
						<span class={badgeClass}>
							{props.entry.isExtra ? "extra" : "documented"}
						</span>
						<Show when={!props.entry.supportsLivePreview}>
							<span class={badgeClass}>screenshot only</span>
						</Show>
					</div>
					<div class={css({ display: "grid", gap: "2" })}>
						<div
							class={css({
								alignItems: "start",
								display: "flex",
								flexWrap: "wrap",
								gap: "4",
								justifyContent: "space-between",
							})}
						>
							<div class={css({ display: "grid", gap: "1" })}>
								<h2
									class={css({
										fontSize: { base: "xl", md: "2xl" },
										fontWeight: "bold",
										lineHeight: "short",
									})}
								>
									{props.entry.title}
								</h2>
								<p
									class={css({
										color: "fg.muted",
										fontSize: "sm",
										maxWidth: "2xl",
									})}
								>
									{props.entry.description}
								</p>
							</div>
							<Show when={props.entry.docsHref}>
								<A
									href={props.entry.docsHref}
									class={css({
										color: "fg.default",
										fontSize: "sm",
										fontWeight: "medium",
										whiteSpace: "nowrap",
									})}
								>
									Docs
								</A>
							</Show>
						</div>
					</div>
				</div>

				<div
					class={css({
						display: "grid",
						gap: "6",
						gridTemplateColumns: {
							base: "1fr",
							xl: "minmax(0, 1fr) minmax(0, 1fr)",
						},
					})}
				>
					<div class={css({ display: "grid", gap: "3" })}>
						<strong>Committed screenshot</strong>
						<div
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
								when={!screenshotLoadFailed()}
								fallback={
									<div class={css({ p: "6" })}>
										<p class={css({ color: "fg.muted", fontSize: "sm" })}>
											The committed screenshot has not been generated yet.
										</p>
									</div>
								}
							>
								<img
									src={props.entry.screenshotPath}
									alt={`${props.entry.title} screenshot`}
									loading="lazy"
									onError={() => setScreenshotLoadFailed(true)}
									onLoad={() => setScreenshotLoadFailed(false)}
									class={css({
										display: "block",
										height: "20rem",
										objectFit: "cover",
										width: "full",
									})}
								/>
							</Show>
						</div>
					</div>

					<div class={css({ display: "grid", gap: "3" })}>
						<strong>Live preview</strong>
						<LivePreviewEmbed entry={props.entry} />
					</div>
				</div>
			</div>
		</article>
	);
};
