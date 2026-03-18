import { AnimatedCircularProgressBar } from "@/ui/animated-circular-progress-bar";

export default function AnimatedCircularProgressBarDemo() {
	return (
		<div class="flex min-h-64 items-center justify-center">
			<AnimatedCircularProgressBar
				value={65}
				gaugePrimaryColor="#0ea5e9"
				gaugeSecondaryColor="#e2e8f0"
			/>
		</div>
	);
}
