import { css } from "styled-system/css";

import { FlickeringGrid } from "@/ui/flickering-grid";

export default function FlickeringGridDemo() {
	return (
		<div
			class={css({
				position: "relative",
				height: "16rem",
				width: "full",
				overflow: "hidden",
				borderRadius: "lg",
				borderWidth: "1px",
				backgroundColor: "bg.default",
			})}
		>
			<FlickeringGrid class={css({ position: "absolute", inset: "0" })} />
		</div>
	);
}
