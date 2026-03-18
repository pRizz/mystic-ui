import { cn } from "@/lib/utils";
import { type Component, type JSX, mergeProps, splitProps } from "solid-js";

const TAU = Math.PI * 2;

export interface AnimatedCircularProgressBarProps
	extends JSX.HTMLAttributes<HTMLDivElement> {
	max?: number;
	min?: number;
	value: number;
	gaugePrimaryColor: string;
	gaugeSecondaryColor: string;
}

export const AnimatedCircularProgressBar: Component<
	AnimatedCircularProgressBarProps
> = (props) => {
	const [localProps, forwardProps] = splitProps(props, ["class", "style"]);
	const mergedProps = mergeProps({ max: 100, min: 0 }, localProps);
	const circumference = TAU * 45;
	const percentPx = circumference / 100;
	const currentPercent = Math.round(
		((mergedProps.value - mergedProps.min) /
			(mergedProps.max - mergedProps.min)) *
			100,
	);
	const style = () =>
		typeof mergedProps.style === "string"
			? `--circle-size:100px;--circumference:${circumference};--percent-to-px:${percentPx}px;--gap-percent:5;--offset-factor:0;--transition-length:1s;--transition-step:200ms;--delay:0s;--percent-to-deg:3.6deg;transform:translateZ(0);${mergedProps.style}`
			: {
					"--circle-size": "100px",
					"--circumference": circumference,
					"--percent-to-px": `${percentPx}px`,
					"--gap-percent": "5",
					"--offset-factor": "0",
					"--transition-length": "1s",
					"--transition-step": "200ms",
					"--delay": "0s",
					"--percent-to-deg": "3.6deg",
					transform: "translateZ(0)",
					...mergedProps.style,
				};

	return (
		<div
			class={cn("relative size-40 text-2xl font-semibold", mergedProps.class)}
			style={style()}
			{...forwardProps}
		>
			<svg
				fill="none"
				class="size-full"
				stroke-width="2"
				viewBox="0 0 100 100"
				aria-hidden="true"
			>
				{currentPercent <= 90 && currentPercent >= 0 ? (
					<circle
						cx="50"
						cy="50"
						r="45"
						stroke-width="10"
						stroke-dashoffset="0"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="opacity-100"
						style={{
							stroke: mergedProps.gaugeSecondaryColor,
							"--stroke-percent": 90 - currentPercent,
							"--offset-factor-secondary": "calc(1 - var(--offset-factor))",
							"stroke-dasharray":
								"calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)",
							transform:
								"rotate(calc(1turn - 90deg - (var(--gap-percent) * var(--percent-to-deg) * var(--offset-factor-secondary)))) scaleY(-1)",
							transition: "all var(--transition-length) ease var(--delay)",
							"transform-origin":
								"calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)",
						}}
					/>
				) : null}
				<circle
					cx="50"
					cy="50"
					r="45"
					stroke-width="10"
					stroke-dashoffset="0"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="opacity-100"
					style={{
						stroke: mergedProps.gaugePrimaryColor,
						"--stroke-percent": currentPercent,
						"stroke-dasharray":
							"calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)",
						transition:
							"var(--transition-length) ease var(--delay),stroke var(--transition-length) ease var(--delay)",
						"transition-property": "stroke-dasharray,transform",
						transform:
							"rotate(calc(-90deg + var(--gap-percent) * var(--offset-factor) * var(--percent-to-deg)))",
						"transform-origin":
							"calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)",
					}}
				/>
			</svg>
			<span
				data-current-value={currentPercent}
				class="absolute inset-0 m-auto size-fit animate-in fade-in ease-linear"
				style={{
					"animation-delay": "var(--delay)",
					"animation-duration": "var(--transition-length)",
				}}
			>
				{currentPercent}
			</span>
		</div>
	);
};
