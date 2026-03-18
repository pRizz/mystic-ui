import { css } from "styled-system/css";

import { BlurFade } from "@/ui/blur-fade";

export default function BlurFadeTextDemo() {
	return (
		<div class={css({ display: "grid", gap: "4" })}>
			<BlurFade delay={0.1} inView>
				<h2 class={css({ fontSize: "3xl", fontWeight: "semibold" })}>
					Blur Fade
				</h2>
			</BlurFade>
			<BlurFade delay={0.2} inView>
				<p class={css({ maxWidth: "prose", color: "fg.muted" })}>
					Smoothly reveal text and media with a short blur as each item enters
					the viewport.
				</p>
			</BlurFade>
		</div>
	);
}
