import { MorphingText } from "@/ui/morphing-text";

export default function MorphingTextDemo() {
	return (
		<div class="flex min-h-64 items-center justify-center">
			<MorphingText texts={["Hello", "World"]} />
		</div>
	);
}
