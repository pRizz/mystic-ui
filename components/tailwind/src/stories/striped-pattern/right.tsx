import { StripedPattern } from "@/ui/striped-pattern";

export default function StripedPatternRightDemo() {
	return (
		<div class="relative h-64 w-full overflow-hidden rounded-lg border bg-background text-muted-foreground/40">
			<StripedPattern direction="right" />
		</div>
	);
}
