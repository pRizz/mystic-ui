import { css } from "styled-system/css";

import { LightRays } from "@/ui/light-rays";

export default function LightRaysDemo() {
	return (
		<div
			class={css({
				position: "relative",
				height: "16rem",
				width: "full",
				overflow: "hidden",
				borderRadius: "xl",
				borderWidth: "1px",
				backgroundColor: "bg.default",
			})}
		>
			<LightRays />
		</div>
	);
}
