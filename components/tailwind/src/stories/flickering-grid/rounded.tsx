import { FlickeringGrid } from "@/ui/flickering-grid";

export default function FlickeringGridRoundedDemo() {
	return (
		<div class="relative h-64 w-full overflow-hidden rounded-3xl border bg-background">
			<FlickeringGrid class="absolute inset-0 rounded-3xl" />
		</div>
	);
}
