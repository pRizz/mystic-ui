import { cn } from "@/lib/utils";
import type { Component, JSX } from "solid-js";
import { Motion } from "solid-motionone";

export interface ComicTextProps extends JSX.HTMLAttributes<HTMLDivElement> {
	children: string;
	fontSize?: number;
}

export const ComicText: Component<ComicTextProps> = (props) => {
	const dotColor = "#EF4444";
	const backgroundColor = "#FACC15";

	if (typeof props.children !== "string") {
		throw new Error("children must be a string");
	}

	return (
		<Motion.div
			class={cn("select-none text-center", props.class)}
			style={{
				"font-size": `${props.fontSize ?? 5}rem`,
				"font-family": "'Bangers', 'Comic Sans MS', 'Impact', sans-serif",
				"font-weight": "900",
				"-webkit-text-stroke": `${(props.fontSize ?? 5) * 0.35}px #000000`,
				transform: "skewX(-10deg)",
				"text-transform": "uppercase",
				filter: `
					drop-shadow(5px 5px 0px #000000)
					drop-shadow(3px 3px 0px ${dotColor})
				`,
				"background-color": backgroundColor,
				"background-image": `radial-gradient(circle at 1px 1px, ${dotColor} 1px, transparent 0)`,
				"background-size": "8px 8px",
				"background-clip": "text",
				"-webkit-background-clip": "text",
				"-webkit-text-fill-color": "transparent",
				...props.style,
			}}
			initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
			animate={{ opacity: 1, scale: 1, rotate: 0 }}
			transition={{
				duration: 0.6,
				easing: [0.175, 0.885, 0.32, 1.275],
				type: "spring",
			}}
		>
			{props.children}
		</Motion.div>
	);
};
