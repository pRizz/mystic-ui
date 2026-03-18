import { AnimatedGridPattern } from "@/ui/animated-grid-pattern";

export default function AnimatedGridPatternDemo() {
	return (
		<div class="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-lg border bg-background">
			<AnimatedGridPattern class="inset-0" />
			<p class="pointer-events-none z-10 text-xl font-medium">Animated Grid</p>
		</div>
	);
}
