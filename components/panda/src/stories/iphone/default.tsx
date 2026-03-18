import { css } from "styled-system/css";

import { Iphone } from "@/ui/iphone";

export default function IphoneDemo() {
	return (
		<div class={css({ position: "relative", width: "16rem" })}>
			<Iphone />
		</div>
	);
}
