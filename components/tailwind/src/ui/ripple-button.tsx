import { cn } from "@/lib/utils";
import {
	type JSX,
	type ParentComponent,
	createEffect,
	createSignal,
	mergeProps,
	onCleanup,
	splitProps,
} from "solid-js";

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
			class={cn(
				"relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 bg-background px-4 py-2 text-center text-primary",
				localProps.class,
			)}
			onClick={(event) => {
				createRipple(event);
				localProps.onClick?.(event);
			}}
			ref={forwardProps.ref}
			{...forwardProps}
		>
			<div class="relative z-10">{localProps.children}</div>
			<span class="pointer-events-none absolute inset-0">
				{buttonRipples().map((ripple) => (
					<span
						key={ripple.key}
						class="absolute animate-rippling rounded-full bg-background opacity-30"
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
