import {
	For,
	type JSX,
	type JSXElement,
	type ParentComponent,
	createEffect,
	createMemo,
	createSignal,
	mergeProps,
	onCleanup,
	splitProps,
} from "solid-js";
import { Motion, type MotionComponentProps } from "solid-motionone";
import { cn } from "../lib/utils";

const animationProps = {
	initial: { scale: 0, opacity: 0 },
	animate: { scale: 1, opacity: 1 },
	exit: { scale: 0, opacity: 0 },
	transition: { duration: 0.3, easing: "ease-out" },
} satisfies Omit<MotionComponentProps, "children">;

export const AnimatedListItem: ParentComponent = (props) => {
	return (
		<Motion.div {...animationProps} class="mx-auto w-full origin-bottom">
			{props.children}
		</Motion.div>
	);
};

export interface AnimatedListProps extends JSX.HTMLAttributes<HTMLDivElement> {
	delay?: number;
}

export const AnimatedList: ParentComponent<AnimatedListProps> = (props) => {
	const [_localProps, forwardProps] = splitProps(props, [
		"children",
		"class",
		"delay",
	]);
	const localProps = mergeProps({ delay: 1000 }, _localProps);
	const [index, setIndex] = createSignal(0);
	const items = createMemo(() => {
		const rawChildren = Array.isArray(localProps.children)
			? localProps.children.flat()
			: [localProps.children];

		return rawChildren
			.filter(
				(child): child is Exclude<JSXElement, null | undefined | boolean> =>
					Boolean(child),
			)
			.map((child, itemIndex) => ({
				key: `item-${itemIndex}`,
				child,
			}));
	});

	createEffect(() => {
		if (index() >= items().length - 1) {
			return;
		}

		const timeout = window.setTimeout(() => {
			setIndex((currentIndex) => (currentIndex + 1) % items().length);
		}, localProps.delay);

		onCleanup(() => window.clearTimeout(timeout));
	});

	const visibleItems = createMemo(() =>
		items()
			.slice(0, index() + 1)
			.reverse(),
	);

	return (
		<div
			class={cn("flex flex-col items-center gap-4", localProps.class)}
			{...forwardProps}
		>
			<For each={visibleItems()}>
				{(item) => <AnimatedListItem>{item.child}</AnimatedListItem>}
			</For>
		</div>
	);
};
