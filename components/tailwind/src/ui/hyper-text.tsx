import { cn } from "@/lib/utils";
import {
	type Accessor,
	createEffect,
	createSignal,
	mergeProps,
	onCleanup,
	onMount,
	splitProps,
} from "solid-js";
import type { JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Motion } from "solid-motionone";

type CharacterSet = string[] | readonly string[];
type MotionElementType =
	| "article"
	| "div"
	| "h1"
	| "h2"
	| "h3"
	| "h4"
	| "h5"
	| "h6"
	| "li"
	| "p"
	| "section"
	| "span";

const motionElements = {
	article: Motion.article,
	div: Motion.div,
	h1: Motion.h1,
	h2: Motion.h2,
	h3: Motion.h3,
	h4: Motion.h4,
	h5: Motion.h5,
	h6: Motion.h6,
	li: Motion.li,
	p: Motion.p,
	section: Motion.section,
	span: Motion.span,
} as const satisfies Record<MotionElementType, unknown>;

const DEFAULT_CHARACTER_SET = Object.freeze(
	"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
) as readonly string[];

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export interface HyperTextProps extends JSX.HTMLAttributes<HTMLElement> {
	children: string;
	duration?: number;
	delay?: number;
	as?: MotionElementType;
	startOnView?: boolean;
	animateOnHover?: boolean;
	characterSet?: CharacterSet;
}

export const HyperText = (props: HyperTextProps) => {
	const [_localProps, forwardProps] = splitProps(props, [
		"children",
		"class",
		"duration",
		"delay",
		"as",
		"startOnView",
		"animateOnHover",
		"characterSet",
	]);
	const localProps = mergeProps(
		{
			duration: 800,
			delay: 0,
			as: "div" as MotionElementType,
			startOnView: false,
			animateOnHover: true,
			characterSet: DEFAULT_CHARACTER_SET,
		},
		_localProps,
	);
	const letters = () => localProps.children.split("");
	const MotionComponent = motionElements[localProps.as];
	const [displayText, setDisplayText] = createSignal(letters());
	const [isAnimating, setIsAnimating] = createSignal(false);
	const [animationRun, setAnimationRun] = createSignal(0);
	let elementRef: HTMLElement | undefined;

	const triggerAnimation = () => {
		if (isAnimating()) {
			return;
		}

		setIsAnimating(true);
		setAnimationRun((currentRun) => currentRun + 1);
	};

	onMount(() => {
		let cleanup: VoidFunction | undefined;

		if (!localProps.startOnView) {
			const timeout = window.setTimeout(triggerAnimation, localProps.delay);
			cleanup = () => window.clearTimeout(timeout);
		} else if (elementRef) {
			const observer = new IntersectionObserver(
				([entry]) => {
					if (!entry?.isIntersecting) {
						return;
					}

					const timeout = window.setTimeout(triggerAnimation, localProps.delay);
					observer.disconnect();
					cleanup = () => window.clearTimeout(timeout);
				},
				{ threshold: 0.1, rootMargin: "-30% 0px -30% 0px" },
			);

			observer.observe(elementRef);
			cleanup = () => observer.disconnect();
		}

		onCleanup(() => cleanup?.());
	});

	createEffect(() => {
		const currentRun = animationRun();
		if (!currentRun) {
			return;
		}

		const maxIterations = letters().length;
		const startTime = performance.now();
		let animationFrame = 0;

		const animateText = (currentTime: number) => {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / localProps.duration, 1);
			const iteration = progress * maxIterations;

			setDisplayText(
				letters().map((letter, index) => {
					if (letter === " ") {
						return letter;
					}

					if (index <= iteration) {
						return letter;
					}

					return localProps.characterSet[
						getRandomInt(localProps.characterSet.length)
					];
				}),
			);

			if (progress < 1) {
				animationFrame = window.requestAnimationFrame(animateText);
				return;
			}

			setDisplayText(letters());
			setIsAnimating(false);
		};

		animationFrame = window.requestAnimationFrame(animateText);

		onCleanup(() => {
			window.cancelAnimationFrame(animationFrame);
		});
	});

	return (
		<Dynamic
			component={MotionComponent as Accessor<unknown>}
			ref={(node: HTMLElement) => {
				elementRef = node;
			}}
			class={cn("overflow-hidden py-2 text-4xl font-bold", localProps.class)}
			onMouseEnter={() => {
				if (!localProps.animateOnHover) {
					return;
				}

				triggerAnimation();
			}}
			{...forwardProps}
		>
			{displayText().map((letter, index) => (
				<span
					key={`${index}-${letter}`}
					class={cn("font-mono", letter === " " ? "inline-block w-3" : "")}
				>
					{letter.toUpperCase()}
				</span>
			))}
		</Dynamic>
	);
};
