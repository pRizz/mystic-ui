import {
	type JSX,
	type ParentComponent,
	mergeProps,
	splitProps,
} from "solid-js";
import { css, cx } from "styled-system/css";

export interface PulsatingButtonProps
	extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	duration?: string;
	pulseColor?: string;
}

export const PulsatingButton: ParentComponent<PulsatingButtonProps> = (
	props,
) => {
	const [_localProps, forwardProps] = splitProps(props, [
		"children",
		"class",
		"pulseColor",
		"duration",
	]);
	const localProps = mergeProps(
		{
			pulseColor: "#808080",
			duration: "1.5s",
		},
		_localProps,
	);

	return (
		<button
			class={cx(
				css({
					position: "relative",
					display: "flex",
					cursor: "pointer",
					alignItems: "center",
					justifyContent: "center",
					borderRadius: "lg",
					backgroundColor: "colorPalette.default",
					paddingX: "4",
					paddingY: "2",
					textAlign: "center",
					color: "colorPalette.foreground",
				}),
				localProps.class,
			)}
			style={{
				"--pulse-color": localProps.pulseColor,
				"--duration": localProps.duration,
			}}
			{...forwardProps}
			ref={forwardProps.ref}
		>
			<div class={css({ position: "relative", zIndex: "10" })}>
				{localProps.children}
			</div>
			<div
				class={css({
					position: "absolute",
					left: "50%",
					top: "50%",
					width: "full",
					height: "full",
					transform: "translate(-50%, -50%)",
					animation: "pulse",
					borderRadius: "lg",
					background: "inherit",
				})}
			/>
		</button>
	);
};
