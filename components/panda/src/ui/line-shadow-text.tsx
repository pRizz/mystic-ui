import type { JSX } from "solid-js";
import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Motion } from "solid-motionone";
import { css, cx } from "styled-system/css";

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
			class={cx(
				css({
					position: "relative",
					zIndex: "0",
					display: "inline-flex",
					_after: {
						position: "absolute",
						top: "0.04em",
						left: "0.04em",
						zIndex: "-10",
						content: "attr(data-text)",
						backgroundImage:
							"linear-gradient(45deg, transparent 45%, var(--shadow-color) 45%, var(--shadow-color) 55%, transparent 0)",
						backgroundSize: "0.06em 0.06em",
						backgroundClip: "text",
						color: "transparent",
						animation: "line-shadow",
					},
				}),
				localProps.class,
			)}
			data-text={localProps.children}
			{...forwardProps}
		>
			{localProps.children}
		</Dynamic>
	);
};
