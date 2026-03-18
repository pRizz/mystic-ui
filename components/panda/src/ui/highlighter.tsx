import { annotate } from "rough-notation";
import type { RoughAnnotation } from "rough-notation/lib/model";
import type { JSX, ParentComponent } from "solid-js";
import {
	createEffect,
	createSignal,
	onCleanup,
	onMount,
	splitProps,
} from "solid-js";
import { css, cx } from "styled-system/css";

type AnnotationAction =
	| "highlight"
	| "underline"
	| "box"
	| "circle"
	| "strike-through"
	| "crossed-off"
	| "bracket";

export interface HighlighterProps extends JSX.HTMLAttributes<HTMLSpanElement> {
	action?: AnnotationAction;
	animationDuration?: number;
	color?: string;
	iterations?: number;
	isView?: boolean;
	multiline?: boolean;
	padding?: number;
	strokeWidth?: number;
}

export const Highlighter: ParentComponent<HighlighterProps> = (props) => {
	const [_localProps, forwardProps] = splitProps(props, [
		"action",
		"animationDuration",
		"children",
		"class",
		"color",
		"iterations",
		"isView",
		"multiline",
		"padding",
		"strokeWidth",
	]);
	const localProps = {
		action: "highlight" as AnnotationAction,
		color: "#ffd1dc",
		strokeWidth: 1.5,
		animationDuration: 600,
		iterations: 2,
		padding: 2,
		multiline: true,
		isView: false,
		..._localProps,
	};
	const [isInView, setIsInView] = createSignal(!localProps.isView);
	let elementRef: HTMLSpanElement | undefined;

	onMount(() => {
		if (!localProps.isView || !elementRef) {
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry?.isIntersecting) {
					return;
				}

				setIsInView(true);
				observer.disconnect();
			},
			{
				threshold: 0.1,
				rootMargin: "-10%",
			},
		);

		observer.observe(elementRef);
		onCleanup(() => observer.disconnect());
	});

	createEffect(() => {
		const shouldShow = !localProps.isView || isInView();
		if (!shouldShow || !elementRef) {
			return;
		}

		let resizeObserver: ResizeObserver | null = null;
		let annotation: RoughAnnotation | null = null;

		annotation = annotate(elementRef, {
			type: localProps.action,
			color: localProps.color,
			strokeWidth: localProps.strokeWidth,
			animationDuration: localProps.animationDuration,
			iterations: localProps.iterations,
			padding: localProps.padding,
			multiline: localProps.multiline,
		});

		annotation.show();

		resizeObserver = new ResizeObserver(() => {
			annotation?.hide();
			annotation?.show();
		});

		resizeObserver.observe(elementRef);
		resizeObserver.observe(document.body);

		onCleanup(() => {
			annotation?.remove();
			resizeObserver?.disconnect();
		});
	});

	return (
		<span
			ref={elementRef}
			class={cx(
				css({
					position: "relative",
					display: "inline-block",
					backgroundColor: "transparent",
				}),
				localProps.class,
			)}
			{...forwardProps}
		>
			{localProps.children}
		</span>
	);
};
