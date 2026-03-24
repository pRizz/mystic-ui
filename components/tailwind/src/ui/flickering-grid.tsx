import { cn } from "../lib/utils";
import {
	type Component,
	type JSX,
	createEffect,
	createMemo,
	createSignal,
	mergeProps,
	onCleanup,
	onMount,
	splitProps,
} from "solid-js";

interface GridParameters {
	cols: number;
	dpr: number;
	rows: number;
	squares: Float32Array;
}

export interface FlickeringGridProps
	extends JSX.HTMLAttributes<HTMLDivElement> {
	color?: string;
	flickerChance?: number;
	gridGap?: number;
	height?: number;
	maxOpacity?: number;
	squareSize?: number;
	width?: number;
}

export const FlickeringGrid: Component<FlickeringGridProps> = (props) => {
	const [_localProps, forwardProps] = splitProps(props, [
		"class",
		"color",
		"flickerChance",
		"gridGap",
		"height",
		"maxOpacity",
		"squareSize",
		"width",
	]);
	const localProps = mergeProps(
		{
			squareSize: 4,
			gridGap: 6,
			flickerChance: 0.3,
			color: "rgb(0, 0, 0)",
			maxOpacity: 0.3,
		},
		_localProps,
	);

	let canvasRef: HTMLCanvasElement | undefined;
	let containerRef: HTMLDivElement | undefined;
	let context: CanvasRenderingContext2D | null = null;
	let gridParameters: GridParameters | null = null;

	const [isInView, setIsInView] = createSignal(false);
	const [canvasSize, setCanvasSize] = createSignal({ width: 0, height: 0 });

	const rgbaPrefix = createMemo(() => {
		if (typeof window === "undefined") {
			return "rgba(0, 0, 0,";
		}

		const colorCanvas = document.createElement("canvas");
		colorCanvas.width = 1;
		colorCanvas.height = 1;
		const colorContext = colorCanvas.getContext("2d");
		if (!colorContext) {
			return "rgba(255, 0, 0,";
		}

		colorContext.fillStyle = localProps.color;
		colorContext.fillRect(0, 0, 1, 1);
		const [red, green, blue] = Array.from(
			colorContext.getImageData(0, 0, 1, 1).data,
		);
		return `rgba(${red}, ${green}, ${blue},`;
	});

	const setupCanvas = (nextWidth: number, nextHeight: number) => {
		if (!canvasRef) {
			return;
		}

		const dpr = window.devicePixelRatio || 1;
		canvasRef.width = nextWidth * dpr;
		canvasRef.height = nextHeight * dpr;
		canvasRef.style.width = `${nextWidth}px`;
		canvasRef.style.height = `${nextHeight}px`;

		const cols = Math.ceil(
			nextWidth / (localProps.squareSize + localProps.gridGap),
		);
		const rows = Math.ceil(
			nextHeight / (localProps.squareSize + localProps.gridGap),
		);
		const squares = new Float32Array(cols * rows);

		for (let index = 0; index < squares.length; index += 1) {
			squares[index] = Math.random() * localProps.maxOpacity;
		}

		gridParameters = { cols, rows, squares, dpr };
	};

	const updateCanvasSize = () => {
		if (!containerRef) {
			return;
		}

		const nextWidth = localProps.width ?? containerRef.clientWidth;
		const nextHeight = localProps.height ?? containerRef.clientHeight;
		setCanvasSize({ width: nextWidth, height: nextHeight });
		setupCanvas(nextWidth, nextHeight);
	};

	const updateSquares = (squares: Float32Array, deltaTime: number) => {
		for (let index = 0; index < squares.length; index += 1) {
			if (Math.random() < localProps.flickerChance * deltaTime) {
				squares[index] = Math.random() * localProps.maxOpacity;
			}
		}
	};

	const drawGrid = () => {
		if (!canvasRef || !context || !gridParameters) {
			return;
		}

		context.clearRect(0, 0, canvasRef.width, canvasRef.height);
		context.fillStyle = "transparent";
		context.fillRect(0, 0, canvasRef.width, canvasRef.height);

		for (let column = 0; column < gridParameters.cols; column += 1) {
			for (let row = 0; row < gridParameters.rows; row += 1) {
				const opacity =
					gridParameters.squares[column * gridParameters.rows + row];
				context.fillStyle = `${rgbaPrefix()}${opacity})`;
				context.fillRect(
					column *
						(localProps.squareSize + localProps.gridGap) *
						gridParameters.dpr,
					row *
						(localProps.squareSize + localProps.gridGap) *
						gridParameters.dpr,
					localProps.squareSize * gridParameters.dpr,
					localProps.squareSize * gridParameters.dpr,
				);
			}
		}
	};

	onMount(() => {
		context = canvasRef?.getContext("2d") ?? null;
		if (!canvasRef || !containerRef || !context) {
			return;
		}

		updateCanvasSize();

		const resizeObserver = new ResizeObserver(() => {
			updateCanvasSize();
		});
		resizeObserver.observe(containerRef);

		const intersectionObserver = new IntersectionObserver(
			([entry]) => {
				setIsInView(Boolean(entry?.isIntersecting));
			},
			{ threshold: 0 },
		);
		intersectionObserver.observe(canvasRef);

		onCleanup(() => {
			resizeObserver.disconnect();
			intersectionObserver.disconnect();
		});
	});

	createEffect(() => {
		if (!isInView() || !gridParameters || !canvasRef || !context) {
			return;
		}

		let animationFrame = 0;
		let lastTime = 0;

		const animate = (time: number) => {
			if (!gridParameters || !canvasRef || !context) {
				return;
			}

			const deltaTime = (time - lastTime) / 1000;
			lastTime = time;

			updateSquares(gridParameters.squares, deltaTime);
			drawGrid();
			animationFrame = window.requestAnimationFrame(animate);
		};

		animationFrame = window.requestAnimationFrame(animate);
		onCleanup(() => window.cancelAnimationFrame(animationFrame));
	});

	return (
		<div
			ref={containerRef}
			class={cn("h-full w-full", localProps.class)}
			{...forwardProps}
		>
			<canvas
				ref={canvasRef}
				class="pointer-events-none"
				style={{
					width: `${canvasSize().width}px`,
					height: `${canvasSize().height}px`,
				}}
			/>
		</div>
	);
};
