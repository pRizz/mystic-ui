import { css } from "styled-system/css";

export default function MorphingTextGalleryPreview() {
	return (
		<div
			class={css({
				alignItems: "center",
				display: "flex",
				justifyContent: "center",
				minHeight: "24rem",
				width: "full",
			})}
		>
			<div class={css({ position: "relative", textAlign: "center" })}>
				<div
					class={css({
						filter: "blur(48px)",
						inset: "0",
						position: "absolute",
					})}
				>
					<div
						class={css({
							backgroundColor: "fuchsia.300/50",
							borderRadius: "full",
							height: "24",
							marginX: "auto",
							width: "64",
						})}
					/>
				</div>
				<div class={css({ position: "relative" })}>
					<p
						class={css({
							color: "fg.muted",
							fontSize: "sm",
							letterSpacing: "0.4em",
							textTransform: "uppercase",
						})}
					>
						Gallery
					</p>
					<h2
						class={css({
							color: "fg.default",
							fontSize: { base: "5xl", md: "7xl" },
							fontWeight: "black",
							letterSpacing: "tight",
							marginTop: "3",
						})}
					>
						Morphing Text
					</h2>
					<p
						class={css({
							color: "fg.muted",
							fontSize: { base: "sm", md: "lg" },
							marginTop: "4",
							maxWidth: "lg",
						})}
					>
						A static fallback keeps this panda preview reliable in both the
						embedded iframe and the committed screenshot.
					</p>
				</div>
			</div>
		</div>
	);
}
