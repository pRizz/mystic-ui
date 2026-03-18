import { css } from "styled-system/css";

import { AnimatedGradientText } from "@/ui/animated-gradient-text";

export default function AnimatedGradientTextDemo() {
	return (
		<div
			class={css({
				display: "flex",
				minHeight: "16rem",
				alignItems: "center",
				justifyContent: "center",
				fontSize: "4xl",
				fontWeight: "semibold",
			})}
		>
			<AnimatedGradientText>Introducing Mystic UI</AnimatedGradientText>
		</div>
	);
}
