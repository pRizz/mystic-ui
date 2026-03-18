import { TbArrowRight } from "solid-icons/tb";
import {
	type Component,
	type JSX,
	type ParentComponent,
	splitProps,
} from "solid-js";
import { css, cx } from "styled-system/css";

export interface BentoGridProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export const BentoGrid: ParentComponent<BentoGridProps> = (props) => {
	const [localProps, forwardProps] = splitProps(props, ["class", "children"]);

	return (
		<div
			class={cx(
				css({
					display: "grid",
					width: "full",
					gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
					gridAutoRows: "22rem",
					gap: "4",
				}),
				localProps.class,
			)}
			{...forwardProps}
		>
			{localProps.children}
		</div>
	);
};

export interface BentoCardProps {
	name: string;
	class?: string;
	background: JSX.Element;
	Icon: Component<{ class: string }>;
	description: string;
	href: string;
	cta: string;
}

export const BentoCard: Component<BentoCardProps> = (props) => {
	return (
		<div
			class={cx(
				css({
					position: "relative",
					gridColumn: "span 3 / span 3",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					overflow: "hidden",
					borderRadius: "xl",
					backgroundColor: "white",
					boxShadow:
						"0 0 0 1px rgba(0,0,0,.03),0 2px 4px rgba(0,0,0,.05),0 12px 24px rgba(0,0,0,.05)",
					transform: "translateZ(0)",
					_dark: {
						backgroundColor: "black",
						borderWidth: "1px",
						borderColor: "white/10",
						boxShadow: "0 -20px 80px -20px #ffffff1f inset",
					},
				}),
				"group",
				props.class,
			)}
		>
			<div>{props.background}</div>
			<div class={css({ padding: "4" })}>
				<div
					class={css({
						pointerEvents: "none",
						zIndex: "10",
						display: "flex",
						transform: "translateZ(0)",
						flexDirection: "column",
						gap: "1",
						transitionDuration: "300ms",
						_groupHover: {
							transform: "translateY(-2.5rem)",
						},
					})}
				>
					<props.Icon
						class={css({
							width: "12",
							height: "12",
							transformOrigin: "left",
							transform: "translateZ(0)",
							color: "neutral.700",
							transitionDuration: "300ms",
							transitionTimingFunction: "ease-in-out",
							_groupHover: {
								transform: "scale(0.75)",
							},
						})}
					/>
					<h3
						class={css({
							fontSize: "xl",
							fontWeight: "semibold",
							color: "neutral.700",
							_dark: { color: "neutral.300" },
						})}
					>
						{props.name}
					</h3>
					<p class={css({ maxWidth: "lg", color: "neutral.400" })}>
						{props.description}
					</p>
				</div>
				<div
					class={css({
						pointerEvents: "none",
						display: "flex",
						width: "full",
						transform: "translateY(0)",
						flexDirection: "row",
						alignItems: "center",
						transitionDuration: "300ms",
						hideFrom: "lg",
					})}
				>
					<a
						href={props.href}
						class={css({
							pointerEvents: "auto",
							display: "inline-flex",
							alignItems: "center",
							padding: "0",
							fontSize: "sm",
							fontWeight: "medium",
						})}
					>
						{props.cta}
						<TbArrowRight
							class={css({ marginLeft: "2", width: "4", height: "4" })}
						/>
					</a>
				</div>
			</div>
			<div
				class={css({
					pointerEvents: "none",
					position: "absolute",
					bottom: "0",
					display: "flex",
					width: "full",
					transform: "translateY(2.5rem)",
					flexDirection: "row",
					alignItems: "center",
					padding: "4",
					opacity: "0",
					transitionDuration: "300ms",
					hideBelow: "lg",
					_groupHover: {
						transform: "translateY(0)",
						opacity: "1",
					},
				})}
			>
				<a
					href={props.href}
					class={css({
						pointerEvents: "auto",
						display: "inline-flex",
						alignItems: "center",
						padding: "0",
						fontSize: "sm",
						fontWeight: "medium",
					})}
				>
					{props.cta}
					<TbArrowRight
						class={css({ marginLeft: "2", width: "4", height: "4" })}
					/>
				</a>
			</div>
			<div
				class={css({
					pointerEvents: "none",
					position: "absolute",
					inset: "0",
					transform: "translateZ(0)",
					transitionDuration: "300ms",
					_groupHover: {
						backgroundColor: "black/3",
						_dark: {
							backgroundColor: "neutral.800/10",
						},
					},
				})}
			/>
		</div>
	);
};
