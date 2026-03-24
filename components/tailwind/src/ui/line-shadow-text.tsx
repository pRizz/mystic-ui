import { type JSX, mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Motion } from "solid-motionone";
import { cn } from "../lib/utils";

const motionElements = {
	article: Motion.article,
	div: Motion.div,
	h1: Motion.h1,
	h2: Motion.h2,
	h3: Motion.h3,
	h4: Motion.h4,
	h5: Motion.h5,
	h6: Motion.h6,
	li: Motion.li,
	p: Motion.p,
	section: Motion.section,
	span: Motion.span,
} as const;

type MotionElementType = keyof typeof motionElements;

export interface LineShadowTextProps extends JSX.HTMLAttributes<HTMLElement> {
	children: string;
	shadowColor?: string;
	as?: MotionElementType;
}

export const LineShadowText = (props: LineShadowTextProps) => {
	const [_localProps, forwardProps] = splitProps(props, [
		"children",
		"shadowColor",
		"class",
		"as",
	]);
	const localProps = mergeProps(
		{ shadowColor: "black", as: "span" as MotionElementType },
		_localProps,
	);
	const MotionComponent = motionElements[localProps.as];

	return (
		<Dynamic
			component={MotionComponent}
			style={{ "--shadow-color": localProps.shadowColor }}
			class={cn(
				"after:absolute after:left-[0.04em] after:top-[0.04em] after:-z-10 after:animate-line-shadow after:bg-[linear-gradient(45deg,transparent_45%,var(--shadow-color)_45%,var(--shadow-color)_55%,transparent_0)] after:bg-[size:0.06em_0.06em] after:bg-clip-text after:text-transparent after:content-[attr(data-text)] relative z-0 inline-flex",
				localProps.class,
			)}
			data-text={localProps.children}
			{...forwardProps}
		>
			{localProps.children}
		</Dynamic>
	);
};
