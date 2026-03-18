import { NumberTicker } from "@/ui/number-ticker";

export default function NumberTickerStartValueDemo() {
	return (
		<p class="text-4xl md:text-6xl font-bold">
			<NumberTicker value={100} startValue={25} />
		</p>
	);
}
