import { cn } from "@/lib/utils";
import type { JSX, ParentComponent } from "solid-js";
import { Motion } from "solid-motionone";

type VariantDefinition = Record<string, unknown>;

export interface SpinningTextProps extends JSX.HTMLAttributes<HTMLDivElement> {
	children: string | string[];
	duration?: number;
	reverse?: boolean;
	radius?: number;
	transition?: Record<string, unknown>;
	variants?: {
		container?: VariantDefinition;
		item?: VariantDefinition;
	};
}

const BASE_TRANSITION = {
	repeat: Number.POSITIVE_INFINITY,
	easing: "linear",
};

const BASE_ITEM_VARIANTS = {
	initial: {
		opacity: 1,
	},
	animate: {
		opacity: 1,
	},
};

export const SpinningText: ParentComponent<SpinningTextProps> = (props) => {
	if (typeof props.children !== "string" && !Array.isArray(props.children)) {
		throw new Error("children must be a string or an array of strings");
	}

	const childText = Array.isArray(props.children)
		? props.children.every((child) => typeof child === "string")
			? props.children.join("")
			: (() => {
					throw new Error("all elements in children array must be strings");
				})()
		: props.children;
	const letters = childText.split("");
	letters.push(" ");

	const finalTransition = {
		...BASE_TRANSITION,
		...props.transition,
		duration:
			typeof props.transition?.duration === "number"
				? props.transition.duration
				: (props.duration ?? 10),
	};
	const containerVariants = {
		animate: { rotate: props.reverse ? -360 : 360 },
		...props.variants?.container,
	};
	const itemVariants = {
		...BASE_ITEM_VARIANTS,
		...props.variants?.item,
	};

	return (
		<Motion.div
			class={cn("relative", props.class)}
			style={props.style}
			initial="initial"
			animate="animate"
			variants={containerVariants}
			transition={finalTransition}
		>
			{letters.map((letter, index) => (
				<Motion.span
					aria-hidden="true"
					key={`${index}-${letter}`}
					variants={itemVariants}
					class="absolute left-1/2 top-1/2 inline-block"
					style={{
						"--index": index,
						"--total": letters.length,
						"--radius": props.radius ?? 5,
						transform: `
							translate(-50%, -50%)
							rotate(calc(360deg / var(--total) * var(--index)))
							translateY(calc(var(--radius, 5) * -1ch))
						`,
						"transform-origin": "center",
					}}
				>
					{letter}
				</Motion.span>
			))}
			<span class="sr-only">{childText}</span>
		</Motion.div>
	);
};
