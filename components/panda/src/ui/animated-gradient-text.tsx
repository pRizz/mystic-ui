import {
	type JSX,
	type ParentComponent,
	mergeProps,
	splitProps,
} from "solid-js";
import { css, cx } from "styled-system/css";

export interface AnimatedGradientTextProps
	extends JSX.HTMLAttributes<HTMLSpanElement> {
	speed?: number;
	colorFrom?: string;
	colorTo?: string;
}

export const AnimatedGradientText: ParentComponent<
	AnimatedGradientTextProps
> = (props) => {
	const [_localProps, forwardProps] = splitProps(props, [
		"children",
		"class",
		"speed",
		"colorFrom",
		"colorTo",
	]);
	const localProps = mergeProps(
		{
			speed: 1,
			colorFrom: "#ffaa40",
			colorTo: "#9c40ff",
		},
		_localProps,
	);

	return (
		<span
			style={{
				"--bg-size": `${localProps.speed * 300}%`,
				"--color-from": localProps.colorFrom,
				"--color-to": localProps.colorTo,
			}}
			class={cx(
				css({
					animation: "gradient 8s linear infinite",
					display: "inline",
					backgroundImage:
						"linear-gradient(to right, var(--color-from), var(--color-to), var(--color-from))",
					backgroundSize: "var(--bg-size) 100%",
					backgroundClip: "text",
					color: "transparent",
				}),
				localProps.class,
			)}
			{...forwardProps}
		>
			{localProps.children}
		</span>
	);
};
