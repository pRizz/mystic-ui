import {
	type JSX,
	type ParentComponent,
	mergeProps,
	splitProps,
} from "solid-js";
import { cn } from "../lib/utils";

export interface PulsatingButtonProps
	extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	duration?: string;
	pulseColor?: string;
}

export const PulsatingButton: ParentComponent<PulsatingButtonProps> = (
	props,
) => {
	const [_localProps, forwardProps] = splitProps(props, [
		"children",
		"class",
		"pulseColor",
		"duration",
	]);
	const localProps = mergeProps(
		{
			pulseColor: "#808080",
			duration: "1.5s",
		},
		_localProps,
	);

	return (
		<button
			class={cn(
				"relative flex cursor-pointer items-center justify-center rounded-lg bg-primary px-4 py-2 text-center text-primary-foreground",
				localProps.class,
			)}
			style={{
				"--pulse-color": localProps.pulseColor,
				"--duration": localProps.duration,
			}}
			{...forwardProps}
			ref={forwardProps.ref}
		>
			<div class="relative z-10">{localProps.children}</div>
			<div class="absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-lg bg-inherit" />
		</button>
	);
};
