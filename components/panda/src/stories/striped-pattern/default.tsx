import { css } from "styled-system/css";

import { StripedPattern } from "@/ui/striped-pattern";

export default function StripedPatternDemo() {
	return (
		<div
			class={css({
				position: "relative",
				height: "16rem",
				width: "full",
				overflow: "hidden",
				borderRadius: "lg",
				borderWidth: "1px",
				backgroundColor: "bg.default",
				color: "fg.muted/40",
			})}
		>
			<StripedPattern />
		</div>
	);
}
