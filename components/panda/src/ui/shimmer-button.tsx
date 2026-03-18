import {
	type JSX,
	type ParentComponent,
	mergeProps,
	splitProps,
} from "solid-js";
import { css, cx } from "styled-system/css";

export interface ShimmerButtonProps
	extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	background?: string;
	borderRadius?: string;
	class?: string;
	shimmerColor?: string;
	shimmerDuration?: string;
	shimmerSize?: string;
}

export const ShimmerButton: ParentComponent<ShimmerButtonProps> = (props) => {
	const [_localProps, forwardProps] = splitProps(props, [
		"background",
		"borderRadius",
		"children",
		"class",
		"shimmerColor",
		"shimmerDuration",
		"shimmerSize",
	]);
	const localProps = mergeProps(
		{
			background: "rgba(0, 0, 0, 1)",
			borderRadius: "100px",
			shimmerColor: "#ffffff",
			shimmerDuration: "3s",
			shimmerSize: "0.05em",
		},
		_localProps,
	);

	return (
		<button
			style={{
				"--spread": "90deg",
				"--shimmer-color": localProps.shimmerColor,
				"--radius": localProps.borderRadius,
				"--speed": localProps.shimmerDuration,
				"--cut": localProps.shimmerSize,
				"--bg": localProps.background,
			}}
			class={cx(
				css({
					position: "relative",
					zIndex: "0",
					display: "flex",
					cursor: "pointer",
					alignItems: "center",
					justifyContent: "center",
					overflow: "hidden",
					whiteSpace: "nowrap",
					borderWidth: "1px",
					borderColor: "white/10",
					paddingX: "6",
					paddingY: "3",
					color: "white",
					background: "var(--bg)",
					borderRadius: "var(--radius)",
					transform: "translateZ(0)",
					transitionProperty: "transform",
					transitionDuration: "300ms",
					transitionTimingFunction: "ease-in-out",
					_dark: {
						color: "black",
					},
					_active: {
						transform: "translateY(1px)",
					},
				}),
				"group",
				localProps.class,
			)}
			{...forwardProps}
			ref={forwardProps.ref}
		>
			<div
				class={css({
					position: "absolute",
					inset: "0",
					zIndex: "-30",
					overflow: "visible",
					containerType: "size",
					filter: "blur(2px)",
				})}
			>
				<div
					class={css({
						position: "absolute",
						inset: "0",
						height: "100cqh",
						aspectRatio: "1",
						borderRadius: "0",
						mask: "none",
						animation: "shimmer-slide",
					})}
				>
					<div
						class={css({
							position: "absolute",
							inset: "-100%",
							width: "auto",
							transform: "translate(0, 0) rotate(0deg)",
							background:
								"conic-gradient(from calc(270deg - (var(--spread) * 0.5)), transparent 0, var(--shimmer-color) var(--spread), transparent var(--spread))",
							animation: "spin-around",
						})}
					/>
				</div>
			</div>
			{localProps.children}

			<div
				class={css({
					position: "absolute",
					inset: "0",
					width: "full",
					height: "full",
					borderRadius: "2xl",
					paddingX: "4",
					paddingY: "1.5",
					fontSize: "sm",
					fontWeight: "medium",
					boxShadow: "inset 0 -8px 10px #ffffff1f",
					transform: "translateZ(0)",
					transitionDuration: "300ms",
					transitionTimingFunction: "ease-in-out",
					_groupHover: {
						boxShadow: "inset 0 -6px 10px #ffffff3f",
					},
					_groupActive: {
						boxShadow: "inset 0 -10px 10px #ffffff3f",
					},
				})}
			/>

			<div
				class={css({
					position: "absolute",
					inset: "var(--cut)",
					zIndex: "-20",
					borderRadius: "var(--radius)",
					background: "var(--bg)",
				})}
			/>
		</button>
	);
};
