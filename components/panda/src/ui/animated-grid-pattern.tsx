import {
	type Component,
	type JSX,
	createMemo,
	createSignal,
	createUniqueId,
	mergeProps,
	onCleanup,
	onMount,
	splitProps,
} from "solid-js";
import { Motion } from "solid-motionone";
import { css, cx } from "styled-system/css";

interface Square {
	id: number;
	position: [number, number];
}

export interface AnimatedGridPatternProps
	extends JSX.SvgSVGAttributes<SVGSVGElement> {
	width?: number;
	height?: number;
	x?: number;
	y?: number;
	strokeDasharray?: number;
	numSquares?: number;
	maxOpacity?: number;
	duration?: number;
	repeatDelay?: number;
	class?: string;
}

const AnimatedSquare: Component<{
	id: number;
	getPosition: () => [number, number];
	index: number;
	maxOpacity: number;
	repeatDelay: number;
	duration: number;
	squareHeight: number;
	squareWidth: number;
}> = (props) => {
	const [iteration, setIteration] = createSignal(0);
	const [position, setPosition] = createSignal(props.getPosition());

	onMount(() => {
		const initialDelay = props.index * 100;
		const cycleDuration = (props.duration * 2 + props.repeatDelay) * 1000;

		const initialTimeout = window.setTimeout(() => {
			setIteration((currentIteration) => currentIteration + 1);
		}, initialDelay);

		const interval = window.setInterval(() => {
			setPosition(props.getPosition());
			setIteration((currentIteration) => currentIteration + 1);
		}, cycleDuration);

		onCleanup(() => {
			window.clearTimeout(initialTimeout);
			window.clearInterval(interval);
		});
	});

	return (
		<Motion.rect
			key={`${props.id}-${iteration()}`}
			initial={{ opacity: 0 }}
			animate={{ opacity: props.maxOpacity }}
			transition={{
				duration: props.duration,
				repeat: 1,
				delay: props.index * 0.1,
				repeatType: "reverse",
				repeatDelay: props.repeatDelay,
			}}
			width={props.squareWidth - 1}
			height={props.squareHeight - 1}
			x={position()[0] * props.squareWidth + 1}
			y={position()[1] * props.squareHeight + 1}
			fill="currentColor"
			stroke-width="0"
		/>
	);
};

export const AnimatedGridPattern: Component<AnimatedGridPatternProps> = (
	props,
) => {
	const [_localProps, forwardProps] = splitProps(props, [
		"class",
		"width",
		"height",
		"x",
		"y",
		"strokeDasharray",
		"numSquares",
		"maxOpacity",
		"duration",
		"repeatDelay",
	]);
	const localProps = mergeProps(
		{
			width: 40,
			height: 40,
			x: -1,
			y: -1,
			strokeDasharray: 0,
			numSquares: 50,
			maxOpacity: 0.5,
			duration: 4,
			repeatDelay: 0.5,
		},
		_localProps,
	);
	const id = createUniqueId();
	const [dimensions, setDimensions] = createSignal({ width: 0, height: 0 });
	let containerRef: SVGSVGElement | undefined;

	const getPosition = () =>
		[
			Math.floor((Math.random() * dimensions().width) / localProps.width),
			Math.floor((Math.random() * dimensions().height) / localProps.height),
		] as [number, number];

	const squares = createMemo<Square[]>(() =>
		Array.from({ length: localProps.numSquares }, (_, squareId) => ({
			id: squareId,
			position: getPosition(),
		})),
	);

	onMount(() => {
		if (!containerRef) {
			return;
		}

		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const nextWidth = entry.contentRect.width;
				const nextHeight = entry.contentRect.height;
				setDimensions((currentDimensions) => {
					if (
						currentDimensions.width === nextWidth &&
						currentDimensions.height === nextHeight
					) {
						return currentDimensions;
					}

					return {
						width: nextWidth,
						height: nextHeight,
					};
				});
			}
		});

		resizeObserver.observe(containerRef);
		onCleanup(() => resizeObserver.disconnect());
	});

	return (
		<svg
			ref={containerRef}
			aria-hidden="true"
			class={cx(
				css({
					pointerEvents: "none",
					position: "absolute",
					inset: "0",
					height: "full",
					width: "full",
					fill: "gray.400/30",
					stroke: "gray.400/30",
				}),
				localProps.class,
			)}
			{...forwardProps}
		>
			<defs>
				<pattern
					id={id}
					width={localProps.width}
					height={localProps.height}
					patternUnits="userSpaceOnUse"
					x={localProps.x}
					y={localProps.y}
				>
					<path
						d={`M.5 ${localProps.height}V.5H${localProps.width}`}
						fill="none"
						stroke-dasharray={localProps.strokeDasharray}
					/>
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill={`url(#${id})`} />
			<svg
				x={localProps.x}
				y={localProps.y}
				class={css({ overflow: "visible" })}
				aria-hidden="true"
			>
				{squares().map((square, index) => (
					<AnimatedSquare
						key={square.id}
						id={square.id}
						index={index}
						getPosition={getPosition}
						maxOpacity={localProps.maxOpacity}
						repeatDelay={localProps.repeatDelay}
						duration={localProps.duration}
						squareWidth={localProps.width}
						squareHeight={localProps.height}
					/>
				))}
			</svg>
		</svg>
	);
};
