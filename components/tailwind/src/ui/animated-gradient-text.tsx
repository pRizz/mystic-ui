import { cn } from "../lib/utils";
import {
	type JSX,
	type ParentComponent,
	mergeProps,
	splitProps,
} from "solid-js";

export interface AnimatedGradientTextProps
	extends JSX.HTMLAttributes<HTMLSpanElement> {
	speed?: number;
	colorFrom?: string;
	colorTo?: string;
}

export const AnimatedGradientText: ParentComponent<
	AnimatedGradientTextProps
> = (props) => {
	const [_localProps, forwardProps] = splitProps(props, [
		"children",
		"class",
		"speed",
		"colorFrom",
		"colorTo",
	]);
	const localProps = mergeProps(
		{
			speed: 1,
			colorFrom: "#ffaa40",
			colorTo: "#9c40ff",
		},
		_localProps,
	);

	return (
		<span
			style={{
				"--bg-size": `${localProps.speed * 300}%`,
				"--color-from": localProps.colorFrom,
				"--color-to": localProps.colorTo,
			}}
			class={cn(
				"animate-gradient inline bg-gradient-to-r from-[var(--color-from)] via-[var(--color-to)] to-[var(--color-from)] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent",
				localProps.class,
			)}
			{...forwardProps}
		>
			{localProps.children}
		</span>
	);
};
