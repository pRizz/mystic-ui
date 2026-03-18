import { css } from "styled-system/css";

import { SpinningText } from "@/ui/spinning-text";

export default function SpinningTextDemo() {
	return (
		<div
			class={css({
				display: "flex",
				minHeight: "16rem",
				alignItems: "center",
				justifyContent: "center",
			})}
		>
			<SpinningText
				class={css({
					fontSize: "xs",
					textTransform: "uppercase",
					letterSpacing: "0.2em",
				})}
			>
				learn more • earn more • grow more •
			</SpinningText>
		</div>
	);
}
