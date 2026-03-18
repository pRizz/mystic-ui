import { StripedPattern } from "@/ui/striped-pattern";

export default function StripedPatternDashedDemo() {
	return (
		<div class="relative h-64 w-full overflow-hidden rounded-lg border bg-background text-muted-foreground/40">
			<StripedPattern stroke-dasharray="4 4" />
		</div>
	);
}
