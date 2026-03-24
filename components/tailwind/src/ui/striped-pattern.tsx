import { cn } from "../lib/utils";
import type { Component, JSX } from "solid-js";
import { createUniqueId, mergeProps, splitProps } from "solid-js";

export interface StripedPatternProps
	extends JSX.SvgSVGAttributes<SVGSVGElement> {
	direction?: "left" | "right";
}

export const StripedPattern: Component<StripedPatternProps> = (props) => {
	const [_localProps, forwardProps] = splitProps(props, [
		"class",
		"direction",
		"height",
		"width",
	]);
	const localProps = mergeProps(
		{
			direction: "left" as const,
			width: 10,
			height: 10,
		},
		_localProps,
	);
	const id = createUniqueId();
	const width = () => Number(localProps.width);
	const height = () => Number(localProps.height);

	return (
		<svg
			aria-hidden="true"
			class={cn(
				"pointer-events-none absolute inset-0 z-10 h-full w-full stroke-[0.5]",
				localProps.class,
			)}
			xmlns="http://www.w3.org/2000/svg"
			{...forwardProps}
		>
			<defs>
				<pattern
					id={id}
					width={width()}
					height={height()}
					patternUnits="userSpaceOnUse"
				>
					{localProps.direction === "left" ? (
						<>
							<line
								x1="0"
								y1={height()}
								x2={width()}
								y2="0"
								stroke="currentColor"
							/>
							<line
								x1={-width()}
								y1={height()}
								x2="0"
								y2="0"
								stroke="currentColor"
							/>
							<line
								x1={width()}
								y1={height()}
								x2={width() * 2}
								y2="0"
								stroke="currentColor"
							/>
						</>
					) : (
						<>
							<line
								x1="0"
								y1="0"
								x2={width()}
								y2={height()}
								stroke="currentColor"
							/>
							<line
								x1={-width()}
								y1="0"
								x2="0"
								y2={height()}
								stroke="currentColor"
							/>
							<line
								x1={width()}
								y1="0"
								x2={width() * 2}
								y2={height()}
								stroke="currentColor"
							/>
						</>
					)}
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill={`url(#${id})`} />
		</svg>
	);
};
