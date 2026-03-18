import { css } from "styled-system/css";

import { TextAnimate } from "@/ui/text-animate";

export default function TextAnimateSlideUpWordDemo() {
	return (
		<div
			class={css({
				display: "flex",
				minHeight: "16rem",
				alignItems: "center",
				justifyContent: "center",
			})}
		>
			<TextAnimate animation="slideUp" by="word">
				Slide up by word
			</TextAnimate>
		</div>
	);
}
