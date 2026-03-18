import { NumberTicker } from "@/ui/number-ticker";

export default function NumberTickerDecimalDemo() {
	return (
		<p class="text-4xl md:text-6xl font-bold">
			<NumberTicker value={42.42} decimalPlaces={2} />
		</p>
	);
}
