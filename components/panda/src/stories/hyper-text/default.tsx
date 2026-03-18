import { css } from "styled-system/css";

import { HyperText } from "@/ui/hyper-text";

export default function HyperTextDemo() {
	return (
		<div
			class={css({
				display: "flex",
				minHeight: "16rem",
				alignItems: "center",
				justifyContent: "center",
			})}
		>
			<HyperText>Hover me</HyperText>
		</div>
	);
}
