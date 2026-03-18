import type { JSX, ParentComponent } from "solid-js";
import { Motion, type MotionComponentProps } from "solid-motionone";
import { css, cx } from "styled-system/css";

const animationProps = {
	initial: { "--x": "100%", scale: 0.8 },
	animate: { "--x": "-100%", scale: 1 },
	transition: {
		repeat: Number.POSITIVE_INFINITY,
		repeatType: "loop",
		repeatDelay: 1,
		type: "spring",
		stiffness: 20,
		damping: 15,
		mass: 2,
		scale: {
			type: "spring",
			stiffness: 200,
			damping: 5,
			mass: 0.5,
		},
	},
} satisfies Omit<MotionComponentProps, "children">;

export interface ShinyButtonProps
	extends JSX.ButtonHTMLAttributes<HTMLButtonElement>,
		Omit<MotionComponentProps, "children"> {}

export const ShinyButton: ParentComponent<ShinyButtonProps> = (props) => {
	return (
		<Motion.button
			class={cx(
				css({
					position: "relative",
					cursor: "pointer",
					borderRadius: "lg",
					borderWidth: "1px",
					paddingX: "6",
					paddingY: "2",
					fontWeight: "medium",
					backdropFilter: "auto",
					backdropBlur: "xl",
					transitionDuration: "300ms",
					transitionTimingFunction: "ease-in-out",
					_hover: {
						boxShadow: "md",
					},
					_active: {
						transform: "scale(0.95)",
					},
					_dark: {
						background:
							"radial-gradient(circle at 50% 0%, var(--primary)/10% 0%, transparent 60%)",
						_hover: {
							boxShadow: "0 0 20px var(--primary)/10%",
						},
					},
				}),
				props.class,
			)}
			{...animationProps}
			{...props}
		>
			<span
				class={css({
					position: "relative",
					display: "block",
					width: "full",
					height: "full",
					fontSize: "sm",
					textTransform: "uppercase",
					letterSpacing: "wide",
					color: "rgb(0 0 0 / 65%)",
					_dark: {
						fontWeight: "light",
						color: "rgb(255 255 255 / 90%)",
					},
				})}
				style={{
					"mask-image":
						"linear-gradient(-75deg,var(--primary) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),var(--primary) calc(var(--x) + 100%))",
				}}
			>
				{props.children}
			</span>
			<span
				style={{
					mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
					"-webkit-mask":
						"linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
					"background-image":
						"linear-gradient(-75deg,var(--primary)/10% calc(var(--x)+20%),var(--primary)/50% calc(var(--x)+25%),var(--primary)/10% calc(var(--x)+100%))",
				}}
				class={css({
					position: "absolute",
					inset: "0",
					zIndex: "10",
					display: "block",
					borderRadius: "inherit",
					padding: "1px",
				})}
			/>
		</Motion.button>
	);
};
