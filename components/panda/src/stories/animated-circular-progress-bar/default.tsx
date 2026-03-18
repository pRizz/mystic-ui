import { css } from "styled-system/css";

import { AnimatedCircularProgressBar } from "@/ui/animated-circular-progress-bar";

export default function AnimatedCircularProgressBarDemo() {
	return (
		<div
			class={css({
				display: "flex",
				minHeight: "16rem",
				alignItems: "center",
				justifyContent: "center",
			})}
		>
			<AnimatedCircularProgressBar
				value={65}
				gaugePrimaryColor="#0ea5e9"
				gaugeSecondaryColor="#e2e8f0"
			/>
		</div>
	);
}
