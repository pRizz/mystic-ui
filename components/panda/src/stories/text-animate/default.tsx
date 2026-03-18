import { css } from "styled-system/css";

import { TextAnimate } from "@/ui/text-animate";

export default function TextAnimateDemo() {
	return (
		<div
			class={css({
				display: "flex",
				minHeight: "16rem",
				alignItems: "center",
				justifyContent: "center",
			})}
		>
			<TextAnimate animation="blurInUp" by="character" once>
				Blur in by character
			</TextAnimate>
		</div>
	);
}
