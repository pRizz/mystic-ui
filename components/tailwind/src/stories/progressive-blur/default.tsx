import { ProgressiveBlur } from "@/ui/progressive-blur";

const contentRows = Array.from(
	{ length: 8 },
	(_, index) => `Content row ${index + 1}`,
);

export default function ProgressiveBlurDemo() {
	return (
		<div class="relative h-64 w-full overflow-hidden rounded-lg border bg-background">
			<div class="space-y-3 p-4">
				{contentRows.map((label) => (
					<div
						key={label}
						class="rounded-md border bg-card px-4 py-3 shadow-sm"
					>
						{label}
					</div>
				))}
			</div>
			<ProgressiveBlur height="50%" position="bottom" />
		</div>
	);
}
