import {
	type Component,
	For,
	type JSX,
	mergeProps,
	splitProps,
} from "solid-js";
import { css, cx } from "styled-system/css";

export interface ProgressiveBlurProps
	extends JSX.HTMLAttributes<HTMLDivElement> {
	blurLevels?: number[];
	height?: string;
	position?: "top" | "bottom" | "both";
}

function getMaskGradient(
	position: ProgressiveBlurProps["position"],
	startPercent: number,
	midPercent: number,
	endPercent: number,
) {
	if (position === "both") {
		return "linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)";
	}

	if (position === "top") {
		return `linear-gradient(to top, rgba(0,0,0,0) ${startPercent}%, rgba(0,0,0,1) ${midPercent}%, rgba(0,0,0,1) ${endPercent}%, rgba(0,0,0,0) ${endPercent + 12.5}%)`;
	}

	return `linear-gradient(to bottom, rgba(0,0,0,0) ${startPercent}%, rgba(0,0,0,1) ${midPercent}%, rgba(0,0,0,1) ${endPercent}%, rgba(0,0,0,0) ${endPercent + 12.5}%)`;
}

export const ProgressiveBlur: Component<ProgressiveBlurProps> = (props) => {
	const [_localProps, forwardProps] = splitProps(props, [
		"class",
		"height",
		"position",
		"blurLevels",
	]);
	const localProps = mergeProps(
		{
			height: "30%",
			position: "bottom" as const,
			blurLevels: [0.5, 1, 2, 4, 8, 16, 32, 64],
		},
		_localProps,
	);

	return (
		<div
			class={cx(
				css({
					pointerEvents: "none",
					position: "absolute",
					insetInline: "0",
					zIndex: "10",
				}),
				localProps.position === "top"
					? css({ top: "0" })
					: localProps.position === "bottom"
						? css({ bottom: "0" })
						: css({ insetBlock: "0" }),
				localProps.class,
			)}
			style={{
				height: localProps.position === "both" ? "100%" : localProps.height,
			}}
			{...forwardProps}
		>
			<div
				class={css({ position: "absolute", inset: "0" })}
				style={{
					"z-index": 1,
					"backdrop-filter": `blur(${localProps.blurLevels[0]}px)`,
					"-webkit-backdrop-filter": `blur(${localProps.blurLevels[0]}px)`,
					"mask-image": getMaskGradient(localProps.position, 0, 12.5, 25),
					"-webkit-mask-image": getMaskGradient(
						localProps.position,
						0,
						12.5,
						25,
					),
				}}
			/>

			<For each={Array(localProps.blurLevels.length - 2).fill(null)}>
				{(_, index) => {
					const blurIndex = index() + 1;
					const startPercent = blurIndex * 12.5;
					const midPercent = (blurIndex + 1) * 12.5;
					const endPercent = (blurIndex + 2) * 12.5;
					const gradient = getMaskGradient(
						localProps.position,
						startPercent,
						midPercent,
						endPercent,
					);

					return (
						<div
							class={css({ position: "absolute", inset: "0" })}
							style={{
								"z-index": index() + 2,
								"backdrop-filter": `blur(${localProps.blurLevels[blurIndex]}px)`,
								"-webkit-backdrop-filter": `blur(${localProps.blurLevels[blurIndex]}px)`,
								"mask-image": gradient,
								"-webkit-mask-image": gradient,
							}}
						/>
					);
				}}
			</For>

			<div
				class={css({ position: "absolute", inset: "0" })}
				style={{
					"z-index": localProps.blurLevels.length,
					"backdrop-filter": `blur(${localProps.blurLevels[localProps.blurLevels.length - 1]}px)`,
					"-webkit-backdrop-filter": `blur(${localProps.blurLevels[localProps.blurLevels.length - 1]}px)`,
					"mask-image": getMaskGradient(localProps.position, 87.5, 100, 100),
					"-webkit-mask-image": getMaskGradient(
						localProps.position,
						87.5,
						100,
						100,
					),
				}}
			/>
		</div>
	);
};
