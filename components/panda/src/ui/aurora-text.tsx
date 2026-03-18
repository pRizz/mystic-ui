import { css, cx } from "styled-system/css";

import {
	type JSX,
	type ParentComponent,
	mergeProps,
	splitProps,
} from "solid-js";

export interface AuroraTextProps extends JSX.HTMLAttributes<HTMLSpanElement> {
	colors?: string[];
	speed?: number;
}

export const AuroraText: ParentComponent<AuroraTextProps> = (props) => {
	const [_localProps, forwardProps] = splitProps(props, [
		"children",
		"class",
		"colors",
		"speed",
	]);
	const localProps = mergeProps(
		{
			colors: ["#FF0080", "#7928CA", "#0070F3", "#38bdf8"],
			speed: 1,
		},
		_localProps,
	);

	return (
		<span
			class={cx(
				css({
					position: "relative",
					display: "inline-block",
				}),
				localProps.class,
			)}
			{...forwardProps}
		>
			<span
				class={css({
					position: "absolute",
					width: "1px",
					height: "1px",
					padding: "0",
					margin: "-1px",
					overflow: "hidden",
					clip: "rect(0, 0, 0, 0)",
					whiteSpace: "nowrap",
					borderWidth: "0",
				})}
			>
				{localProps.children}
			</span>
			<span
				aria-hidden="true"
				class={css({
					position: "relative",
					display: "inline-block",
					backgroundSize: "200% auto",
					backgroundClip: "text",
					color: "transparent",
					animation: "aurora",
				})}
				style={{
					"background-image": `linear-gradient(135deg, ${localProps.colors.join(
						", ",
					)}, ${localProps.colors[0]})`,
					"-webkit-background-clip": "text",
					"-webkit-text-fill-color": "transparent",
					"animation-duration": `${10 / localProps.speed}s`,
				}}
			>
				{localProps.children}
			</span>
		</span>
	);
};
