import {
	type Component,
	For,
	type JSX,
	createMemo,
	mergeProps,
	splitProps,
} from "solid-js";
import { Motion } from "solid-motionone";
import { cn } from "../lib/utils";

interface LightRay {
	delay: number;
	duration: number;
	id: string;
	intensity: number;
	left: number;
	rotate: number;
	swing: number;
	width: number;
}

export interface LightRaysProps extends JSX.HTMLAttributes<HTMLDivElement> {
	blur?: number;
	color?: string;
	count?: number;
	length?: string;
	speed?: number;
}

function createRays(count: number, cycleDuration: number): LightRay[] {
	if (count <= 0) {
		return [];
	}

	return Array.from({ length: count }, (_, index) => {
		const left = 8 + Math.random() * 84;
		const rotate = -28 + Math.random() * 56;
		const width = 160 + Math.random() * 160;
		const swing = 0.8 + Math.random() * 1.8;
		const delay = Math.random() * cycleDuration;
		const duration = cycleDuration * (0.75 + Math.random() * 0.5);
		const intensity = 0.6 + Math.random() * 0.5;

		return {
			id: `${index}-${Math.round(left * 10)}`,
			left,
			rotate,
			width,
			swing,
			delay,
			duration,
			intensity,
		};
	});
}

const Ray: Component<LightRay> = (props) => {
	return (
		<Motion.div
			class="pointer-events-none absolute -top-[12%] left-[var(--ray-left)] h-[var(--light-rays-length)] w-[var(--ray-width)] origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-[color-mix(in_srgb,var(--light-rays-color)_70%,transparent)] to-transparent opacity-0 mix-blend-screen blur-[var(--light-rays-blur)]"
			style={{
				"--ray-left": `${props.left}%`,
				"--ray-width": `${props.width}px`,
			}}
			initial={{ rotate: props.rotate }}
			animate={{
				opacity: [0, props.intensity, 0],
				rotate: [
					props.rotate - props.swing,
					props.rotate + props.swing,
					props.rotate - props.swing,
				],
			}}
			transition={{
				duration: props.duration,
				repeat: Number.POSITIVE_INFINITY,
				easing: "ease-in-out",
				delay: props.delay,
				repeatDelay: props.duration * 0.1,
			}}
		/>
	);
};

export const LightRays: Component<LightRaysProps> = (props) => {
	const [_localProps, forwardProps] = splitProps(props, [
		"blur",
		"class",
		"color",
		"count",
		"length",
		"speed",
		"style",
	]);
	const localProps = mergeProps(
		{
			count: 7,
			color: "rgba(160, 210, 255, 0.2)",
			blur: 36,
			speed: 14,
			length: "70vh",
		},
		_localProps,
	);
	const cycleDuration = () => Math.max(localProps.speed, 0.1);
	const rays = createMemo(() => createRays(localProps.count, cycleDuration()));
	const style = () =>
		typeof localProps.style === "string"
			? `--light-rays-color:${localProps.color};--light-rays-blur:${localProps.blur}px;--light-rays-length:${localProps.length};${localProps.style}`
			: {
					"--light-rays-color": localProps.color,
					"--light-rays-blur": `${localProps.blur}px`,
					"--light-rays-length": localProps.length,
					...localProps.style,
				};

	return (
		<div
			class={cn(
				"pointer-events-none absolute inset-0 isolate overflow-hidden rounded-[inherit]",
				localProps.class,
			)}
			style={style()}
			{...forwardProps}
		>
			<div class="absolute inset-0 overflow-hidden">
				<div
					aria-hidden="true"
					class="absolute inset-0 opacity-60"
					style={{
						background:
							"radial-gradient(circle at 20% 15%, color-mix(in srgb, var(--light-rays-color) 45%, transparent), transparent 70%)",
					}}
				/>
				<div
					aria-hidden="true"
					class="absolute inset-0 opacity-60"
					style={{
						background:
							"radial-gradient(circle at 80% 10%, color-mix(in srgb, var(--light-rays-color) 35%, transparent), transparent 75%)",
					}}
				/>
				<For each={rays()}>{(ray) => <Ray {...ray} />}</For>
			</div>
		</div>
	);
};
