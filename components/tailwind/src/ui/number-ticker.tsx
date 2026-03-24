import { cn } from "../lib/utils";
import { animate, inView } from "motion";
import {
	type Component,
	type JSX,
	mergeProps,
	onMount,
	splitProps,
} from "solid-js";

export interface NumberTickerProps extends JSX.HTMLAttributes<HTMLSpanElement> {
	value?: number;
	startValue?: number;
	direction?: "up" | "down";
	delay?: number;
	decimalPlaces?: number;
}

export const NumberTicker: Component<NumberTickerProps> = (props) => {
	const [_localProps, forwardProps] = splitProps(props, [
		"value",
		"startValue",
		"direction",
		"delay",
		"decimalPlaces",
		"class",
	]);
	const localProps = mergeProps(
		{
			value: 100,
			startValue: 0,
			direction: "up" as const,
			delay: 0,
			decimalPlaces: 0,
		},
		_localProps,
	);
	let ref!: HTMLSpanElement;

	const formatValue = (value: number) =>
		Intl.NumberFormat("en-US", {
			minimumFractionDigits: localProps.decimalPlaces,
			maximumFractionDigits: localProps.decimalPlaces,
		}).format(Number(value.toFixed(localProps.decimalPlaces)));

	onMount(() => {
		const initialValue =
			localProps.direction === "down"
				? localProps.value
				: localProps.startValue;
		const targetValue =
			localProps.direction === "down"
				? localProps.startValue
				: localProps.value;

		ref.textContent = formatValue(initialValue);

		inView(ref, () => {
			animate(initialValue, targetValue, {
				delay: localProps.delay,
				type: "spring",
				damping: 60,
				stiffness: 100,
				onUpdate: (latest) => {
					ref.textContent = formatValue(latest);
				},
			});
		});
	});

	return (
		<span
			class={cn(
				"inline-block tracking-wider text-black tabular-nums dark:text-white",
				localProps.class,
			)}
			{...forwardProps}
			ref={ref}
		>
			{localProps.direction === "down"
				? localProps.value
				: localProps.startValue}
		</span>
	);
};
