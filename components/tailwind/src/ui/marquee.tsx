import { cn } from "../lib/utils";
import {
	For,
	type JSX,
	type ParentComponent,
	mergeProps,
	splitProps,
} from "solid-js";

export interface MarqueeProps extends JSX.HTMLAttributes<HTMLDivElement> {
	pauseOnHover?: boolean;
	repeat?: number;
	reverse?: boolean;
	vertical?: boolean;
	duration?: number;
	gap?: string;
}

export const Marquee: ParentComponent<MarqueeProps> = (props) => {
	const [_localProps, forwardProps] = splitProps(props, [
		"children",
		"class",
		"pauseOnHover",
		"repeat",
		"reverse",
		"vertical",
		"duration",
		"gap",
	]);
	const localProps = mergeProps(
		{
			reverse: false,
			pauseOnHover: false,
			vertical: false,
			repeat: 4,
			duration: 40,
			gap: "1rem",
		},
		_localProps,
	);
	return (
		<div
			class={cn(
				"group flex overflow-hidden p-2 [gap:var(--gap)]",
				localProps.vertical ? "flex-col" : "flex-row",
				localProps.class,
			)}
			style={{
				"--duration": `${localProps.duration}s`,
				"--gap": localProps.gap,
			}}
			{...forwardProps}
		>
			<For each={Array(localProps.repeat).fill(0)}>
				{() => (
					<div
						class="flex shrink-0 justify-around [gap:var(--gap)]"
						classList={{
							"animate-marquee flex-row": !localProps.vertical,
							"animate-marquee-vertical flex-col": localProps.vertical,
							"group-hover:[animation-play-state:paused]":
								localProps.pauseOnHover,
							"[animation-direction:reverse]": localProps.reverse,
						}}
					>
						{localProps.children}
					</div>
				)}
			</For>
		</div>
	);
};
