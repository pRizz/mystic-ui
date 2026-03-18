import { css } from "styled-system/css";

import { Highlighter } from "@/ui/highlighter";

export default function HighlighterDemo() {
	return (
		<p class={css({ fontSize: "lg", lineHeight: "8" })}>
			The{" "}
			<Highlighter action="underline" color="#FF9800">
				Magic UI Highlighter
			</Highlighter>{" "}
			makes important{" "}
			<Highlighter action="highlight" color="#87CEFA">
				text stand out
			</Highlighter>{" "}
			effortlessly.
		</p>
	);
}
