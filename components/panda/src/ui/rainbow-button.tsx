import {
	type JSX,
	type ParentComponent,
	mergeProps,
	splitProps,
} from "solid-js";
import { css, cx } from "styled-system/css";

const sizeClasses = {
	default: css({ height: "9", paddingX: "4", paddingY: "2" }),
	sm: css({
		height: "8",
		borderRadius: "xl",
		paddingX: "3",
		fontSize: "xs",
	}),
	lg: css({ height: "11", borderRadius: "xl", paddingX: "8" }),
	icon: css({ width: "9", height: "9" }),
} as const;

const variantClasses = {
	default: css({
		borderWidth: "0",
		background:
			"linear-gradient(#121213,#121213),linear-gradient(#121213 50%,rgba(18,18,19,0.6) 80%,rgba(18,18,19,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))",
		color: "colorPalette.foreground",
		_dark: {
			background:
				"linear-gradient(#fff,#fff),linear-gradient(#fff 50%,rgba(255,255,255,0.6) 80%,rgba(0,0,0,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))",
		},
	}),
	outline: css({
		borderWidth: "1px",
		borderColor: "border.default",
		borderBottomColor: "transparent",
		background:
			"linear-gradient(#ffffff,#ffffff),linear-gradient(#ffffff 50%,rgba(18,18,19,0.6) 80%,rgba(18,18,19,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))",
		color: "colorPalette.fg",
		_dark: {
			background:
				"linear-gradient(#0a0a0a,#0a0a0a),linear-gradient(#0a0a0a 50%,rgba(255,255,255,0.6) 80%,rgba(0,0,0,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))",
		},
	}),
} as const;

export interface RainbowButtonProps
	extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	size?: keyof typeof sizeClasses;
	variant?: keyof typeof variantClasses;
}

export const RainbowButton: ParentComponent<RainbowButtonProps> = (props) => {
	const [_localProps, forwardProps] = splitProps(props, [
		"children",
		"class",
		"size",
		"variant",
		"style",
	]);
	const localProps = mergeProps(
		{
			size: "default" as const,
			variant: "default" as const,
		},
		_localProps,
	);
	const style = () =>
		typeof localProps.style === "string"
			? `--color-1:hsl(0 100% 63%);--color-2:hsl(270 100% 63%);--color-3:hsl(210 100% 63%);--color-4:hsl(195 100% 63%);--color-5:hsl(90 100% 63%);${localProps.style}`
			: {
					"--color-1": "hsl(0 100% 63%)",
					"--color-2": "hsl(270 100% 63%)",
					"--color-3": "hsl(210 100% 63%)",
					"--color-4": "hsl(195 100% 63%)",
					"--color-5": "hsl(90 100% 63%)",
					...localProps.style,
				};

	return (
		<button
			data-slot="button"
			class={cx(
				css({
					position: "relative",
					display: "inline-flex",
					shrink: "0",
					cursor: "pointer",
					alignItems: "center",
					justifyContent: "center",
					gap: "2",
					whiteSpace: "nowrap",
					borderRadius: "sm",
					backgroundSize: "200%",
					backgroundClip: "padding-box,border-box,border-box",
					backgroundOrigin: "border-box",
					outline: "none",
					transitionProperty: "all",
					animation: "rainbow",
					_focusVisible: {
						ringWidth: "3px",
					},
					_disabled: {
						pointerEvents: "none",
						opacity: "0.5",
					},
					fontSize: "sm",
					fontWeight: "medium",
					_before: {
						content: '""',
						position: "absolute",
						bottom: "-20%",
						left: "50%",
						zIndex: "0",
						height: "20%",
						width: "60%",
						transform: "translateX(-50%)",
						animation: "rainbow",
						background:
							"linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))",
						filter: "blur(0.75rem)",
					},
				}),
				sizeClasses[localProps.size],
				variantClasses[localProps.variant],
				localProps.class,
			)}
			style={style()}
			{...forwardProps}
			ref={forwardProps.ref}
		>
			{localProps.children}
		</button>
	);
};
