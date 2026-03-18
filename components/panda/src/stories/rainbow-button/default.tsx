import { css } from "styled-system/css";

import { RainbowButton } from "@/ui/rainbow-button";

export default function RainbowButtonDemo() {
	return (
		<div
			class={css({
				display: "flex",
				minHeight: "16rem",
				alignItems: "center",
				justifyContent: "center",
			})}
		>
			<RainbowButton>Rainbow Button</RainbowButton>
		</div>
	);
}
