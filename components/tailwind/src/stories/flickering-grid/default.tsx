import { FlickeringGrid } from "@/ui/flickering-grid";

export default function FlickeringGridDemo() {
	return (
		<div class="relative h-64 w-full overflow-hidden rounded-lg border bg-background">
			<FlickeringGrid class="absolute inset-0" />
		</div>
	);
}
