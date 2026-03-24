import {
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
	animate: { scale: 1, opacity: 1, originY: 0 },
	exit: { scale: 0, opacity: 0 },
	transition: { type: "spring", stiffness: 350, damping: 40 },
} satisfies Omit<MotionComponentProps, "children">;

export const AnimatedListItem: ParentComponent = (props) => {
	return (
		<Motion.div {...animationProps} class="mx-auto w-full">
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
			{visibleItems().map((item) => (
				<AnimatedListItem key={item.key}>{item.child}</AnimatedListItem>
			))}
		</div>
	);
};
