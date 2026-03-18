import { css } from "styled-system/css";

import { MorphingText } from "@/ui/morphing-text";

export default function MorphingTextDemo() {
	return (
		<div
			class={css({
				display: "flex",
				minHeight: "16rem",
				alignItems: "center",
				justifyContent: "center",
			})}
		>
			<MorphingText texts={["Hello", "World"]} />
		</div>
	);
}
