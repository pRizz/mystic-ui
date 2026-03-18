import { css } from "styled-system/css";

import { ShimmerButton } from "@/ui/shimmer-button";

export default function ShimmerButtonDemo() {
	return (
		<div
			class={css({
				zIndex: "10",
				display: "flex",
				height: "16rem",
				alignItems: "center",
				justifyContent: "center",
			})}
		>
			<ShimmerButton class={css({ boxShadow: "2xl" })}>
				<span
					class={css({
						whiteSpace: "pre-wrap",
						textAlign: "center",
						fontSize: "sm",
						fontWeight: "medium",
						letterSpacing: "tight",
						color: "white",
						lg: { fontSize: "lg" },
					})}
				>
					Shimmer Button
				</span>
			</ShimmerButton>
		</div>
	);
}
