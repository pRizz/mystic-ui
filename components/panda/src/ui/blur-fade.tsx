import {
	type JSX,
	type ParentComponent,
	createEffect,
	createSignal,
	mergeProps,
	onCleanup,
	onMount,
	splitProps,
} from "solid-js";
import { Motion } from "solid-motionone";
import { cx } from "styled-system/css";

type Direction = "up" | "down" | "left" | "right";

type BlurFadeVariantState = {
	filter?: string;
	opacity?: number;
	x?: number;
	y?: number;
};

export interface BlurFadeProps extends JSX.HTMLAttributes<HTMLDivElement> {
	blur?: string;
	delay?: number;
	direction?: Direction;
	duration?: number;
	inView?: boolean;
	inViewMargin?: string;
	variant?: {
		hidden: BlurFadeVariantState;
		visible: BlurFadeVariantState;
	};
}

const getAxis = (direction: Direction) =>
	direction === "left" || direction === "right" ? "x" : "y";

const getOffset = (direction: Direction, offset: number) =>
	direction === "right" || direction === "down" ? -offset : offset;

export const BlurFade: ParentComponent<BlurFadeProps> = (props) => {
	const [_localProps, forwardProps] = splitProps(props, [
		"blur",
		"children",
		"class",
		"delay",
		"direction",
		"duration",
		"inView",
		"inViewMargin",
		"variant",
	]);
	const localProps = mergeProps(
		{
			blur: "6px",
			delay: 0,
			direction: "down" as Direction,
			duration: 0.4,
			inView: false,
			inViewMargin: "-50px",
		},
		_localProps,
	);
	const [isVisible, setIsVisible] = createSignal(!localProps.inView);
	let ref: HTMLDivElement | undefined;

	const defaultVariant = () => ({
		hidden: {
			[getAxis(localProps.direction)]: getOffset(localProps.direction, 6),
			opacity: 0,
			filter: `blur(${localProps.blur})`,
		},
		visible: {
			[getAxis(localProps.direction)]: 0,
			opacity: 1,
			filter: "blur(0px)",
		},
	});
	const variants = () => localProps.variant ?? defaultVariant();

	onMount(() => {
		if (!localProps.inView || !ref) {
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry?.isIntersecting) {
					return;
				}

				setIsVisible(true);
				observer.disconnect();
			},
			{
				rootMargin: localProps.inViewMargin,
			},
		);

		observer.observe(ref);
		onCleanup(() => observer.disconnect());
	});

	createEffect(() => {
		if (!localProps.inView) {
			setIsVisible(true);
		}
	});

	return (
		<Motion.div
			ref={ref}
			initial={variants().hidden}
			animate={isVisible() ? variants().visible : variants().hidden}
			transition={{
				delay: 0.04 + localProps.delay,
				duration: localProps.duration,
				easing: "ease-out",
				filter: {
					duration: localProps.duration,
				},
			}}
			class={cx(localProps.class)}
			{...forwardProps}
		>
			{localProps.children}
		</Motion.div>
	);
};
