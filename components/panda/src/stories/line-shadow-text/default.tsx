import { css } from "styled-system/css";

import { LineShadowText } from "@/ui/line-shadow-text";

export default function LineShadowTextDemo() {
	return (
		<div
			class={css({
				display: "flex",
				minHeight: "16rem",
				alignItems: "center",
				justifyContent: "center",
			})}
		>
			<LineShadowText
				class={css({
					fontSize: "4xl",
					fontWeight: "semibold",
					md: { fontSize: "6xl" },
				})}
			>
				Magic UI
			</LineShadowText>
		</div>
	);
}
