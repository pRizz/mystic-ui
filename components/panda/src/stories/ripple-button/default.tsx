import { css } from "styled-system/css";

import { RippleButton } from "@/ui/ripple-button";

export default function RippleButtonDemo() {
	return (
		<div
			class={css({
				display: "flex",
				minHeight: "16rem",
				alignItems: "center",
				justifyContent: "center",
			})}
		>
			<RippleButton>Ripple Button</RippleButton>
		</div>
	);
}
