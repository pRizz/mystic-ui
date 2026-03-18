import { css } from "styled-system/css";

import { AuroraText } from "@/ui/aurora-text";

export default function AuroraTextDemo() {
	return (
		<div
			class={css({
				display: "flex",
				minHeight: "16rem",
				alignItems: "center",
				justifyContent: "center",
			})}
		>
			<h2
				class={css({
					textAlign: "center",
					fontSize: "4xl",
					fontWeight: "semibold",
					letterSpacing: "tight",
					md: { fontSize: "6xl" },
				})}
			>
				<AuroraText>Aurora Text</AuroraText>
			</h2>
		</div>
	);
}
