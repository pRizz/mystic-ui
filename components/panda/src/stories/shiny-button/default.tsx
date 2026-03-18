import { css } from "styled-system/css";

import { ShinyButton } from "@/ui/shiny-button";

export default function ShinyButtonDemo() {
	return (
		<div
			class={css({
				display: "flex",
				minHeight: "16rem",
				alignItems: "center",
				justifyContent: "center",
			})}
		>
			<ShinyButton>Shiny Button</ShinyButton>
		</div>
	);
}
