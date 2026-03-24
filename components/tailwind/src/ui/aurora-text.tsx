import {
	type JSX,
	type ParentComponent,
	mergeProps,
	splitProps,
} from "solid-js";
import { cn } from "../lib/utils";

export interface AuroraTextProps extends JSX.HTMLAttributes<HTMLSpanElement> {
	colors?: string[];
	speed?: number;
}

export const AuroraText: ParentComponent<AuroraTextProps> = (props) => {
	const [_localProps, forwardProps] = splitProps(props, [
		"children",
		"class",
		"colors",
		"speed",
	]);
	const localProps = mergeProps(
		{
			colors: ["#FF0080", "#7928CA", "#0070F3", "#38bdf8"],
			speed: 1,
		},
		_localProps,
	);

	return (
		<span
			class={cn("relative inline-block", localProps.class)}
			{...forwardProps}
		>
			<span class="sr-only">{localProps.children}</span>
			<span
				aria-hidden="true"
				class="animate-aurora relative inline-block bg-[length:200%_auto] bg-clip-text text-transparent"
				style={{
					"background-image": `linear-gradient(135deg, ${localProps.colors.join(
						", ",
					)}, ${localProps.colors[0]})`,
					"-webkit-background-clip": "text",
					"-webkit-text-fill-color": "transparent",
					"animation-duration": `${10 / localProps.speed}s`,
				}}
			>
				{localProps.children}
			</span>
		</span>
	);
};
