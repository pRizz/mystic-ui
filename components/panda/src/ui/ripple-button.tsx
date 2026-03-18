import {
	type JSX,
	type ParentComponent,
	createEffect,
	createSignal,
	mergeProps,
	onCleanup,
	splitProps,
} from "solid-js";
import { css, cx } from "styled-system/css";

interface ButtonRipple {
	key: number;
	size: number;
	x: number;
	y: number;
}

export interface RippleButtonProps
	extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	duration?: string;
	rippleColor?: string;
}

export const RippleButton: ParentComponent<RippleButtonProps> = (props) => {
	const [_localProps, forwardProps] = splitProps(props, [
		"children",
		"class",
		"duration",
		"rippleColor",
		"onClick",
	]);
	const localProps = mergeProps(
		{
			rippleColor: "#ffffff",
			duration: "600ms",
		},
		_localProps,
	);
	const [buttonRipples, setButtonRipples] = createSignal<ButtonRipple[]>([]);

	const createRipple = (event: MouseEvent) => {
		const button = event.currentTarget as HTMLButtonElement;
		const rect = button.getBoundingClientRect();
		const size = Math.max(rect.width, rect.height);
		const x = event.clientX - rect.left - size / 2;
		const y = event.clientY - rect.top - size / 2;

		setButtonRipples((previousRipples) => [
			...previousRipples,
			{
				x,
				y,
				size,
				key: Date.now(),
			},
		]);
	};

	createEffect(() => {
		const ripples = buttonRipples();
		if (ripples.length === 0) {
			return;
		}

		const latestRipple = ripples[ripples.length - 1];
		if (!latestRipple) {
			return;
		}

		const timeout = window.setTimeout(() => {
			setButtonRipples((previousRipples) =>
				previousRipples.filter((ripple) => ripple.key !== latestRipple.key),
			);
		}, Number.parseInt(localProps.duration));

		onCleanup(() => window.clearTimeout(timeout));
	});

	return (
		<button
			class={cx(
				css({
					position: "relative",
					display: "flex",
					cursor: "pointer",
					alignItems: "center",
					justifyContent: "center",
					overflow: "hidden",
					borderRadius: "lg",
					borderWidth: "2px",
					backgroundColor: "bg.default",
					paddingX: "4",
					paddingY: "2",
					textAlign: "center",
					color: "colorPalette.default",
				}),
				localProps.class,
			)}
			onClick={(event) => {
				createRipple(event);
				localProps.onClick?.(event);
			}}
			ref={forwardProps.ref}
			{...forwardProps}
		>
			<div class={css({ position: "relative", zIndex: "10" })}>
				{localProps.children}
			</div>
			<span
				class={css({
					pointerEvents: "none",
					position: "absolute",
					inset: "0",
				})}
			>
				{buttonRipples().map((ripple) => (
					<span
						key={ripple.key}
						class={css({
							position: "absolute",
							borderRadius: "full",
							animation: "rippling",
							backgroundColor: "bg.default",
							opacity: "0.3",
						})}
						style={{
							width: `${ripple.size}px`,
							height: `${ripple.size}px`,
							top: `${ripple.y}px`,
							left: `${ripple.x}px`,
							"background-color": localProps.rippleColor,
							transform: "scale(0)",
							"--duration": localProps.duration,
						}}
					/>
				))}
			</span>
		</button>
	);
};
