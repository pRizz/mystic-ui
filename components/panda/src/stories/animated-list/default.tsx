import { css } from "styled-system/css";

import { AnimatedList } from "@/ui/animated-list";

const notifications = [
	"New message from Magic UI",
	"Your component build finished",
	"Parsers updated successfully",
];

export default function AnimatedListDemo() {
	return (
		<div
			class={css({
				display: "flex",
				minHeight: "16rem",
				alignItems: "center",
				justifyContent: "center",
			})}
		>
			<AnimatedList class={css({ width: "full", maxWidth: "sm" })}>
				{notifications.map((notification) => (
					<div
						key={notification}
						class={css({
							borderRadius: "lg",
							borderWidth: "1px",
							backgroundColor: "bg.default",
							paddingX: "4",
							paddingY: "3",
							boxShadow: "sm",
						})}
					>
						<p class={css({ fontSize: "sm", fontWeight: "medium" })}>
							{notification}
						</p>
					</div>
				))}
			</AnimatedList>
		</div>
	);
}
