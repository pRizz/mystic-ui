import { css } from "styled-system/css";

import { NumberTicker } from "@/ui/number-ticker";

export default function NumberTickerStartValueDemo() {
	return (
		<p
			class={css({
				textStyle: "4xl",
				md: { textStyle: "6xl" },
				fontWeight: "bold",
			})}
		>
			<NumberTicker value={100} startValue={25} />
		</p>
	);
}
