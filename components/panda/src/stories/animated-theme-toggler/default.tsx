import { css } from "styled-system/css";

import { AnimatedThemeToggler } from "@/ui/animated-theme-toggler";

export default function AnimatedThemeTogglerDemo() {
	return (
		<div
			class={css({
				display: "flex",
				minHeight: "16rem",
				alignItems: "center",
				justifyContent: "center",
			})}
		>
			<AnimatedThemeToggler
				class={css({
					borderWidth: "1px",
					borderRadius: "lg",
					padding: "3",
				})}
			/>
		</div>
	);
}
