import { BlurFade } from "@/ui/blur-fade";

export default function BlurFadeTextDemo() {
	return (
		<div class="space-y-4">
			<BlurFade delay={0.1} inView>
				<h2 class="text-3xl font-semibold">Blur Fade</h2>
			</BlurFade>
			<BlurFade delay={0.2} inView>
				<p class="max-w-prose text-muted-foreground">
					Smoothly reveal text and media with a short blur as each item enters
					the viewport.
				</p>
			</BlurFade>
		</div>
	);
}
