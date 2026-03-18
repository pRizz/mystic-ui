import type { ParentComponent } from "solid-js";
import { Show } from "solid-js";
import { css } from "styled-system/css";
import type { GalleryEntry } from "~/lib/component-gallery";

interface PreviewFrameProps {
	entry: GalleryEntry;
}

export const PreviewFrame: ParentComponent<PreviewFrameProps> = (props) => {
	return (
		<div
			data-gallery-preview-page=""
			data-gallery-preview-id={props.entry.id}
			data-gallery-preview-framework={props.entry.framework}
			data-capture-delay-ms={props.entry.capture.delayMs ?? 0}
			data-capture-scroll-y={props.entry.capture.scrollY ?? 0}
			data-capture-viewport-height={props.entry.capture.viewportHeight ?? 900}
			data-capture-viewport-width={props.entry.capture.viewportWidth ?? 1280}
			minHeight="screen"
			style={{
				background: props.entry.capture.background,
			}}
		>
			<div
				class={css({
					marginX: "auto",
					maxWidth: "7xl",
					px: "6",
					py: "8",
				})}
			>
				<div class={css({ display: "grid", gap: "5" })}>
					<div class={css({ display: "grid", gap: "1" })}>
						<p class={css({ color: "fg.muted", fontSize: "sm" })}>
							{props.entry.framework} preview
						</p>
						<h1 class={css({ fontSize: "2xl", fontWeight: "bold" })}>
							{props.entry.title}
						</h1>
					</div>
					<div
						data-gallery-preview-surface=""
						class={css({
							backgroundColor: "whiteAlpha.900",
							borderColor: "whiteAlpha.200",
							borderRadius: "3xl",
							borderWidth: "1px",
							boxShadow: "xl",
							minHeight: "28rem",
							overflow: "hidden",
							_dark: {
								backgroundColor: "blackAlpha.700",
								borderColor: "whiteAlpha.200",
							},
						})}
					>
						<div
							class={css({
								alignItems:
									props.entry.capture.align === "start" ? "start" : "center",
								display: "flex",
								justifyContent: "center",
								minHeight: "28rem",
								p: { base: "6", md: "8" },
							})}
						>
							{props.children}
						</div>
					</div>
					<Show when={props.entry.capture.bottomSpacerHeight}>
						<div
							style={{
								height: `${props.entry.capture.bottomSpacerHeight}px`,
							}}
						/>
					</Show>
				</div>
			</div>
		</div>
	);
};
