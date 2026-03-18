import { css } from "styled-system/css";

import { ProgressiveBlur } from "@/ui/progressive-blur";

const contentRows = Array.from(
	{ length: 8 },
	(_, index) => `Content row ${index + 1}`,
);

export default function ProgressiveBlurDemo() {
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
			<div class={css({ display: "grid", gap: "3", padding: "4" })}>
				{contentRows.map((label) => (
					<div
						key={label}
						class={css({
							borderRadius: "md",
							borderWidth: "1px",
							backgroundColor: "bg.canvas",
							paddingX: "4",
							paddingY: "3",
							boxShadow: "sm",
						})}
					>
						{label}
					</div>
				))}
			</div>
			<ProgressiveBlur height="50%" position="bottom" />
		</div>
	);
}
