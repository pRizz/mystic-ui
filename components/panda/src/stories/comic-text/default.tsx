import { css } from "styled-system/css";

import { ComicText } from "@/ui/comic-text";

export default function ComicTextDemo() {
	return (
		<div
			class={css({
				display: "flex",
				minHeight: "16rem",
				alignItems: "center",
				justifyContent: "center",
			})}
		>
			<ComicText>Comic Text</ComicText>
		</div>
	);
}
