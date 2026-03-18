import { css } from "styled-system/css";

import { AnimatedGridPattern } from "@/ui/animated-grid-pattern";

export default function AnimatedGridPatternDemo() {
	return (
		<div
			class={css({
				position: "relative",
				display: "flex",
				height: "16rem",
				width: "full",
				alignItems: "center",
				justifyContent: "center",
				overflow: "hidden",
				borderRadius: "lg",
				borderWidth: "1px",
				backgroundColor: "bg.default",
			})}
		>
			<AnimatedGridPattern class={css({ inset: "0" })} />
			<p class={css({ zIndex: "10", fontSize: "xl", fontWeight: "medium" })}>
				Animated Grid
			</p>
		</div>
	);
}
