import { css } from "styled-system/css";

import { PulsatingButton } from "@/ui/pulsating-button";

export default function PulsatingButtonDemo() {
	return (
		<div
			class={css({
				display: "flex",
				minHeight: "16rem",
				alignItems: "center",
				justifyContent: "center",
			})}
		>
			<PulsatingButton>Pulsating Button</PulsatingButton>
		</div>
	);
}
