import { css } from "styled-system/css";

import { BlurFade } from "@/ui/blur-fade";

const images = [
	"https://picsum.photos/300/200?random=1",
	"https://picsum.photos/300/200?random=2",
	"https://picsum.photos/300/200?random=3",
];

export default function BlurFadeDemo() {
	return (
		<div
			class={css({
				display: "grid",
				gap: "4",
				md: {
					gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
				},
			})}
		>
			{images.map((src, index) => (
				<BlurFade key={src} delay={index * 0.15}>
					<img
						src={src}
						alt={`Sample ${index + 1}`}
						class={css({
							height: "48",
							width: "full",
							borderRadius: "lg",
							objectFit: "cover",
						})}
					/>
				</BlurFade>
			))}
		</div>
	);
}
